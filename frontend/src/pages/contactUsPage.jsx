import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from "react-icons/fa";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../utils/api";
import { useState } from "react";

export default function ContactUsPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        setIsLoading(true);
        try {
            await api.post("/inquiries", data);
            toast.success("Message sent! We will get back to you soon. ✨");
            e.target.reset();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#f8fafc] py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16 space-y-4">
                    <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-bold tracking-widest uppercase rounded-full">
                        Contact Us
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-secondary tracking-tight">
                        Let's Start a <span className="text-accent underline decoration-accent/30 decoration-8 underline-offset-8 italic">Conversation</span>
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
                        Have a question about a product or need technical support? 
                        Our team is usually responsive within 2 hours.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Contact Info Column */}
                    <div className="lg:col-span-5 bg-secondary rounded-[40px] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
                        {/* Abstract background shapes */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[100px] -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 blur-[80px] -ml-24 -mb-24"></div>
                        
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
                            <p className="text-white/60 mb-12 font-medium">Reach out to us through any of these channels. We're here to help.</p>
                            
                            <div className="space-y-10">
                                <div className="flex items-center gap-6 group hover:translate-x-2 transition-transform duration-300">
                                    <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-accent group-hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.4)] transition-all">
                                        <FaPhoneAlt className="text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Call Us</p>
                                        <p className="text-lg font-bold">+94 77 123 4567</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 group hover:translate-x-2 transition-transform duration-300">
                                    <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-accent transition-all">
                                        <FaEnvelope className="text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Email Us</p>
                                        <p className="text-lg font-bold">support@skyret.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 group hover:translate-x-2 transition-transform duration-300">
                                    <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-accent transition-all">
                                        <FaMapMarkerAlt className="text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Visit Us</p>
                                        <p className="text-lg font-bold leading-tight">123 Tech Avenue, Colombo 03</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 group hover:translate-x-2 transition-transform duration-300">
                                    <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-accent transition-all">
                                        <FaClock className="text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Working Hours</p>
                                        <p className="text-lg font-bold">Mon - Sat: 9 AM - 7 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="mt-16 flex gap-4 relative z-10 pt-12 border-t border-white/10">
                            {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl hover:bg-accent hover:-translate-y-1 transition-all duration-300 border border-white/10">
                                    <Icon size={20}/>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form Column */}
                    <div className="lg:col-span-7 bg-white rounded-[40px] p-8 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col">
                        <div className="mb-10">
                            <h2 className="text-3xl font-black text-secondary mb-2">Send Message</h2>
                            <p className="text-gray-400 font-medium">Use the form below to drop us a note.</p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="relative group">
                                    <input 
                                        type="text" 
                                        required 
                                        name="firstName"
                                        className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 focus:border-accent outline-none transition-all peer font-semibold text-secondary"
                                        placeholder=" "
                                    />
                                    <label className="absolute left-0 top-3 text-gray-400 font-bold transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                                        First Name
                                    </label>
                                </div>
                                <div className="relative group">
                                    <input 
                                        type="text" 
                                        required 
                                        name="lastName"
                                        className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 focus:border-accent outline-none transition-all peer font-semibold text-secondary"
                                        placeholder=" "
                                    />
                                    <label className="absolute left-0 top-3 text-gray-400 font-bold transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                                        Last Name
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="relative group">
                                    <input 
                                        type="email" 
                                        required 
                                        name="email"
                                        className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 focus:border-accent outline-none transition-all peer font-semibold text-secondary"
                                        placeholder=" "
                                    />
                                    <label className="absolute left-0 top-3 text-gray-400 font-bold transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                                        Email Address
                                    </label>
                                </div>
                                <div className="relative group">
                                    <input 
                                        type="tel" 
                                        name="phone"
                                        className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 focus:border-accent outline-none transition-all peer font-semibold text-secondary"
                                        placeholder=" "
                                    />
                                    <label className="absolute left-0 top-3 text-gray-400 font-bold transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                                        Phone (Optional)
                                    </label>
                                </div>
                            </div>

                            <div className="relative group">
                                <textarea 
                                    rows="4" 
                                    required 
                                    name="message"
                                    className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 focus:border-accent outline-none transition-all peer font-semibold text-secondary resize-none"
                                    placeholder=" "
                                ></textarea>
                                <label className="absolute left-0 top-3 text-gray-400 font-bold transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                                    How can we help?
                                </label>
                            </div>

                            <button 
                                type="submit" 
                                className="w-full bg-accent text-white py-5 rounded-2xl font-black text-lg hover:shadow-[0_15px_30px_rgba(var(--accent-rgb),0.3)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 active:scale-95"
                            >
                                Send Message <FaPaperPlane size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}