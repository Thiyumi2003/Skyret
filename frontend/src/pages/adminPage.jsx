import { Link, Route, Routes, useNavigate } from "react-router-dom";
import AdminProductsPage from "./admin/adminProductsPage";
import AdminAddProductPage from "./admin/adminAddProductPage";
import AdminEditProductPage from "./admin/adminEditProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import AdminReviewsPage from "./admin/adminReviewsPage";
import AdminUsersPage from "./admin/adminUsersPage";
import AdminInquiriesPage from "./admin/adminInquiriesPage";
import { FaBoxOpen, FaShoppingBag, FaStar, FaUsers, FaSignOutAlt, FaCommentAlt } from "react-icons/fa";

export default function AdminPage(){
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return(
        <div className="w-full h-screen flex  items-center bg-accent">
            <div className="w-[300px] h-full text-white flex flex-col py-10">
                <div className="px-6 mb-10">
                    <h1 className="text-2xl font-bold border-b border-white/20 pb-4">Admin Panel</h1>
                </div>
                    
                <Link to="/admin/" className="flex items-center gap-3 py-3 px-6 hover:bg-white/10 transition-colors">
                    <FaShoppingBag />
                    <span>Orders</span>
                </Link>
                <Link to="/admin/products" className="flex items-center gap-3 py-3 px-6 hover:bg-white/10 transition-colors">
                    <FaBoxOpen />
                    <span>Products</span>
                </Link>
                <Link to="/admin/users" className="flex items-center gap-3 py-3 px-6 hover:bg-white/10 transition-colors">
                    <FaUsers />
                    <span>Users</span>
                </Link>
                <Link to="/admin/reviews" className="flex items-center gap-3 py-3 px-6 hover:bg-white/10 transition-colors">
                    <FaStar />
                    <span>Reviews</span>
                </Link>
                <Link to="/admin/messages" className="flex items-center gap-3 py-3 px-6 hover:bg-white/10 transition-colors">
                    <FaCommentAlt />
                    <span>Messages</span>
                </Link>

                <button 
                    onClick={handleLogout}
                    className="mt-auto mb-10 flex items-center gap-3 py-3 px-6 hover:bg-red-500/20 text-red-200 transition-colors text-left"
                >
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>
            </div>
            <div className="w-[calc(100%-300px)] h-full bg-primary border-[10px] border-accent rounded-2xl overflow-hidden">
                <Routes>
                    <Route path="/" element ={<AdminOrdersPage/>} />
                    <Route path="/products" element ={<AdminProductsPage/>} />
                    <Route path="/add-product" element ={<AdminAddProductPage/>} />
                    <Route path="/edit-product" element ={<AdminEditProductPage/>} />
                    <Route path="/users" element ={<AdminUsersPage/>} />
                    <Route path="/reviews" element ={<AdminReviewsPage/>} />
                    <Route path="/messages" element={<AdminInquiriesPage/>} />
                </Routes>
            </div>
        </div>
    )
}