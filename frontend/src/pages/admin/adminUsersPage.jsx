import { useEffect, useState } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { FaUserShield, FaUserCheck, FaUserSlash, FaEnvelope, FaCalendarAlt } from "react-icons/fa";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = () => {
        setLoading(true);
        api.get("/users")
            .then((res) => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch((err) => {
                toast.error("Failed to fetch users");
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleToggleBlock = (email, currentStatus) => {
        const action = currentStatus ? "unblock" : "block";
        if (window.confirm(`Are you sure you want to ${action} this user?`)) {
            api.put(`/users/block/${email}`)
                .then((res) => {
                    toast.success(res.data.message);
                    fetchUsers();
                })
                .catch((err) => {
                    toast.error(err.response?.data?.message || `Failed to ${action} user`);
                });
        }
    };

    if (loading) return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
    );

    return (
        <div className="w-full h-full p-6 overflow-y-scroll bg-gray-50">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
                    <p className="text-gray-500 mt-1">Monitor and manage access for all registered customers</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                    <span className="text-gray-600 font-medium">Total Users: </span>
                    <span className="text-accent font-bold text-lg">{users.length}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.length === 0 ? (
                    <div className="col-span-full text-center py-10 bg-white rounded-xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-400 text-lg">No users found in the system.</p>
                    </div>
                ) : (
                    users.map((user) => (
                        <div key={user._id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="p-5">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <img 
                                                src={user.image} 
                                                alt={user.firstName} 
                                                className="w-14 h-14 rounded-full object-cover border-2 border-gray-100 shadow-sm"
                                                onError={(e) => e.target.src = "/images/default-profile.png"}
                                            />
                                            {user.isAdmin && (
                                                <div className="absolute -top-1 -right-1 bg-yellow-400 text-white p-1 rounded-full text-[10px]" title="Admin User">
                                                    <FaUserShield />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold text-gray-800 leading-tight">
                                                {user.firstName} {user.lastName}
                                            </h2>
                                            <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-1">
                                                <FaCalendarAlt />
                                                <span>Joined {new Date(user._id.getTimestamp ? user._id.getTimestamp() : Date.now()).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${user.isBlocked ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                        {user.isBlocked ? 'Blocked' : 'Active'}
                                    </div>
                                </div>
                                
                                <div className="space-y-2.5 mb-6">
                                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex justify-center items-center text-gray-400">
                                            <FaEnvelope size={14} />
                                        </div>
                                        <span className="truncate">{user.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex justify-center items-center text-gray-400 font-bold text-[10px]">
                                            VER
                                        </div>
                                        <span className={user.isEmailVerified ? 'text-green-600' : 'text-gray-400'}>
                                            {user.isEmailVerified ? 'Email Verified' : 'Email Unverified'}
                                        </span>
                                    </div>
                                </div>

                                {!user.isAdmin && (
                                    <button 
                                        onClick={() => handleToggleBlock(user.email, user.isBlocked)}
                                        className={`w-full py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-200 ${
                                            user.isBlocked 
                                            ? 'bg-green-500 hover:bg-green-600 text-white shadow-sm shadow-green-100' 
                                            : 'bg-red-50 hover:bg-red-100 text-red-600'
                                        }`}
                                    >
                                        {user.isBlocked ? (
                                            <><FaUserCheck /> Unblock User</>
                                        ) : (
                                            <><FaUserSlash /> Block User</>
                                        )}
                                    </button>
                                )}
                                {user.isAdmin && (
                                    <div className="w-full py-2.5 bg-gray-100 text-gray-400 rounded-lg font-semibold flex items-center justify-center gap-2 border border-gray-200 cursor-not-allowed">
                                        <FaUserShield /> Admin Account
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
