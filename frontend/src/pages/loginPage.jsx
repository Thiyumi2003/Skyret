import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const googleLogin = useGoogleLogin(
        {
            onSuccess: (response)=>{
                api.post("/users/google-login",{
                    token : response.access_token
                }).then((response)=>{
                    localStorage.setItem("token" , response.data.token);
                    toast.success("Login successful!");
                    if(response.data.isAdmin){
                        navigate("/admin")
                    }else{
                        navigate("/")
                    }
                }).catch(()=>{
                    toast.error("Google login failed!")
                })
            },
            onError: ()=>{
                toast.error("Google login failed!")
            }
        }
    )

    function handleLogin(){
        console.log("Email: ", email);
        console.log("Password: ", password);
        //backend localhost:3000/users/login

        axios.post(import.meta.env.VITE_API_URL+"/users/login",{
            email : email,
            password : password
        }).then((response)=>{

            console.log(response.data);
            localStorage.setItem("token" , response.data.token);
            //alert("Login successful!");
            toast.success("Login successful!");
            if(response.data.isAdmin){
                //redirect to admin dashboard
                //window.location.href = "/admin"
                
                navigate("/admin")
            }else{
                //redirect to homepage
                //window.location.href = "/"
                navigate("/")
            }

        }).catch((error)=>{
            //alert(error.response.data.message);
            toast.error(error.response.data.message)
        });
    }

	return (
		<div className="w-full h-screen flex justify-center items-center bg-[url('/login-bg.jpg')] bg-center bg-cover relative">
            <Link to="/" className="absolute top-10 left-10 p-4 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all shadow-xl">
                <FaHome size={30} />
            </Link>
			<div className="w-0 lg:w-1/2  h-full "></div>
			<div className="w-[90%] lg:w-1/2  h-full  flex justify-center items-center ">
				<div className="w-[400px] h-[500px] backdrop-blur-lg rounded-xl shadow-2xl flex flex-col justify-center items-center">
					<h1 className="text-4xl font-bold mb-8 text-secondary">Sign in</h1>
					<input
                        onChange={
                            (e)=>{
                                setEmail(e.target.value)
                            }
                        }
                        value={email}
						placeholder="Email"
						className="w-3/4 p-3 mb-6 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
					/>
					<input    
                        onChange={
                            (e)=>{
                                setPassword(e.target.value)
                            }
                        }
                        value={password}
						placeholder="Password"
						type="password"
						className="w-3/4 p-3  rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
					/>
                    <p className="mb-6 w-3/4 text-right text-white">Forget password? <Link to="/forgot-password" className="text-accent">Click here</Link></p>
                    <button onClick={handleLogin} className="w-3/4 p-3 bg-accent text-white rounded-lg ">
                        Sign in
                    </button>
                    <button onClick={googleLogin}  className="w-3/4 p-3 bg-white text-accenti rounded-lg mt-4 flex justify-center items-center gap-2" >
                      <FcGoogle /> Sign in with Google
                    </button>
                    <p className="mt-6 w-3/4 text-center text-white">Don't have an account? <Link to="/register" className="text-accent">Register</Link></p>
				</div>
			</div>
		</div>
	);
}
