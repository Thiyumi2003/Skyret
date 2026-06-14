import { useEffect, useState } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { FaTrash, FaEnvelope, FaPhone, FaCalendarAlt, FaUser } from "react-icons/fa";

export default function AdminInquiriesPage() {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const response = await api.get("/inquiries");
            setInquiries(response.data);
        } catch (error) {
            toast.error("Failed to fetch messages");
        } finally {
            setLoading(false);
        }
    };

    const deleteInquiry = async (id) => {
        if (!window.confirm("Are you sure you want to delete this message?")) return;
        try {
            await api.delete(`/inquiries/${id}`);
            toast.success("Message deleted");
            setInquiries(inquiries.filter(i => i._id !== id));
        } catch (error) {
            toast.error("Failed to delete message");
        }
    };

    if (loading) return <div className="p-10 text-center font-bold text-gray-400">Loading messages...</div>;

    return (
        <div className="p-8 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black text-secondary">Customer Inquiries</h1>
                    <p className="text-gray-400 font-medium">Messages sent from the Contact Us page.</p>
                </div>
                <div className="bg-accent/10 py-2 px-4 rounded-full">
                    <span className="text-accent font-black">{inquiries.length} Total</span>
                </div>
            </div>

            {inquiries.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-100">
                    <p className="text-gray-400 font-bold">No messages received yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {inquiries.map((inquiry) => (
                        <div key={inquiry._id} className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative group">
                            <button 
                                onClick={() => deleteInquiry(inquiry._id)}
                                className="absolute top-6 right-6 p-3 bg-red-50 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                            >
                                <FaTrash size={14}/>
                            </button>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                                    <FaUser size={20}/>
                                </div>
                                <div>
                                    <h3 className="font-black text-secondary text-lg">{inquiry.firstName} {inquiry.lastName}</h3>
                                    <div className="flex items-center gap-3 text-xs font-bold text-gray-400">
                                        <FaCalendarAlt size={10}/>
                                        {new Date(inquiry.date).toLocaleDateString()} at {new Date(inquiry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-gray-500 font-medium">
                                    <FaEnvelope className="text-accent" size={14}/>
                                    <a href={`mailto:${inquiry.email}`} className="hover:text-accent transition-colors">{inquiry.email}</a>
                                </div>
                                {inquiry.phone && (
                                    <div className="flex items-center gap-3 text-gray-500 font-medium">
                                        <FaPhone className="text-accent" size={14}/>
                                        <a href={`tel:${inquiry.phone}`} className="hover:text-accent transition-colors">{inquiry.phone}</a>
                                    </div>
                                )}
                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl">
                                <p className="text-gray-600 font-medium leading-relaxed italic">
                                    "{inquiry.message}"
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}