import { useEffect, useState } from "react";
import api from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";

export default function UserData() {
	const [user, setUser] = useState(null);
    const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			api
				.get("/users/me", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
                    console.log(response.data)
					setUser(response.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, []);
	return (
		<>
			{user ? (
				<div className="flex h-full aspect-square lg:w-[150px]  relative rounded-lg ">
                    <img src={user.image} referrerPolicy="no-referrer" className="w-full lg:w-auto aspect-square absolute lg:static rounded-lg"/>
                    <select className=" absolute lg:static text-transparent lg:text-white text-center w-full h-full"
                        onChange={(e)=>{
                            const val = e.target.value;
                            if(val === "settings"){
                                navigate("/settings")
                            }else if(val === "my-orders"){
                                navigate("/my-orders")
                            }else if(val === "logout"){
                                localStorage.removeItem("token")
                                navigate("/login")
                            }else if(val === "admin-orders"){
                                navigate("/admin/")
                            }else if(val === "admin-products"){
                                navigate("/admin/products")
                            }else if(val === "admin-users"){
                                navigate("/admin/users")
                            }else if(val === "admin-reviews"){
                                navigate("/admin/reviews")
                            }

                            e.target.value = "default"
                        }}
                        >
                        <option value="default" className="bg-secondary" >{user.isAdmin ? "Admin" : user.firstName}</option>
                        {
                            user.isAdmin ? (
                                <>
                                    <option value="admin-orders" className="bg-secondary text-white">Orders</option>
                                    <option value="admin-products" className="bg-secondary text-white">Products</option>
                                    <option value="admin-users" className="bg-secondary text-white">Users</option>
                                    <option value="admin-reviews" className="bg-secondary text-white">Reviews</option>
                                </>
                            ) : (
                                <>
                                    <option value="settings" className="bg-secondary text-white">Settings</option>
                                    <option value="my-orders" className="bg-secondary text-white">My Orders</option>
                                </>
                            )
                        }
                        <option value="logout" className="bg-secondary text-white">Logout</option>                        
                    </select>
                </div>
			) : (
				<>
					<Link to="/login" className="h-full aspect-square  flex justify-center items-center rounded-lg text-accent shadow-2xl shadow-accent text-3xl">
						<CiUser />
					</Link>
					<Link to="/register" className="text-white text-lg font-semibold hidden  lg:block">
						Register
					</Link>
				</>
			)}
		</>
	);
}
