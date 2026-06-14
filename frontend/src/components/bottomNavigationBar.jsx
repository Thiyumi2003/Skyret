import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { Link } from "react-router-dom";
import UserData from "./userData";

export default function BottomNavigationBar(){
    return(
        <div className="flex lg:hidden fixed bottom-0 w-full h-[80px] p-2   bg-white shadow-[0_-4px_12px_-4px_rgba(0,0,0,0.25)] justify-between">
            <Link to="/" className="h-full aspect-square  flex justify-center items-center rounded-lg text-accent shadow-2xl shadow-accent text-3xl">
                <GoHome />
            </Link>
            <Link to="/products" className="h-full aspect-square  flex justify-center items-center rounded-lg text-accent shadow-2xl shadow-accent text-3xl">
                <CiSearch />
            </Link>
            {localStorage.getItem("token") && (
                <Link to="/cart" className="h-full aspect-square  flex justify-center items-center rounded-lg text-accent shadow-2xl shadow-accent text-3xl">
                    <CiShoppingCart />
                </Link>
            )}
            <UserData className="h-full aspect-square  flex justify-center items-center rounded-lg text-accent shadow-2xl shadow-accent text-3xl"/>
        </div>
    )
}