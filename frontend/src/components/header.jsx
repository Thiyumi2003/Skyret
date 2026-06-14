import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";
import UserData from "./userData";

export default function Header(){
    return(
        <header className="w-full h-[100px] bg-accent relative flex items-center justify-center shrink-0">
            <Link to="/" className="lg:w-[200px] h-full  absolute  lg:left-10 flex justify-center items-center">
                <img src="/logo.png" alt="Logo" className=" h-[60px] mr-2"/>
            </Link>
            <div className="h-full flex justify-center items-center gap-6 px-6">
                <Link to="/" className="text-white text-lg font-semibold">Home</Link>
                <Link to="/products" className="text-white text-lg font-semibold">Products</Link>
                <Link to="/contact-us" className="text-white text-lg font-semibold">Contact Us</Link>
                <Link to="/reviews" className="text-white text-lg font-semibold">Reviews</Link>
            </div>
            <div className="h-[50px] hidden lg:flex absolute right-30  justify-center items-center">
                <UserData/>
            </div>
            {localStorage.getItem("token") && (
                <Link to="/cart" className="w-[50px] h-[50px] absolute right-10 hidden lg:flex justify-center items-center">
                    <BiCart className="text-white text-3xl"/>
                </Link>
            )}
        </header>
    )
}