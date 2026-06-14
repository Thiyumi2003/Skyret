import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate()

    function handleRegister(){
        
        if(password != confirmPassword){
            toast.error("Passwords do not match!");
            return;
        }

        axios.post(import.meta.env.VITE_API_URL+"/users/",{
            email : email,
            password : password,
            firstName : firstName,
            lastName : lastName
        }).then(()=>{

            //alert("Login successful!");
            toast.success("Registered successfully!");
        
            navigate("/login")
          

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
				<div className="w-[500px] h-[500px] backdrop-blur-lg rounded-xl shadow-2xl flex flex-col justify-center items-center">
					<h1 className="text-4xl font-bold mb-8 text-secondary">Sign Up</h1>
                    <div className="w-3/4 flex gap-4 mb-6">
                        <input
                            onChange={
                                (e)=>{
                                    setFirstName(e.target.value)
                                }
                            }
                            value={firstName}
                            placeholder="First Name"
                            className="w-1/2 p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                        <input
                            onChange={
                                (e)=>{
                                    setLastName(e.target.value)
                                }
                            }
                            value={lastName}
                            placeholder="Last Name"
                            className="w-1/2 p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>
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
                    <input    
                        onChange={
                            (e)=>{
                                setConfirmPassword(e.target.value)
                            }
                        }
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        type="password"
                        className="w-3/4 p-3 mt-6 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <button onClick={handleRegister} className="w-3/4 p-3 bg-accent text-white rounded-lg ">
                        Sign Up
                    </button>
                    <p className="mt-6 w-3/4 text-center text-white">Already have an account? <Link to="/login" className="text-accent">Login</Link></p>
				</div>
			</div>
		</div>
	);
}
