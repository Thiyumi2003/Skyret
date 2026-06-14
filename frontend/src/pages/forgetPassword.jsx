import { useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaEnvelope, FaKey, FaArrowLeft, FaCheck } from "react-icons/fa";

export default function ForgetPassword() {
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    function sendEmail() {
        if (!email) {
            toast.error("Please enter your email address!");
            return;
        }

        setIsLoading(true);
        api.post("/users/send-otp", {
            email: email
        }).then(() => {
            setIsEmailSent(true);
            toast.success("OTP sent to your email! ✨");
        }).catch((error) => {
            toast.error(error?.response?.data?.message || "Failed to send OTP. Please try again.");
        }).finally(() => {
            setIsLoading(false);
        });
    }

    async function resetPassword() {
        if (!otp || !newPassword || !confirmPassword) {
            toast.error("Please fill in all fields!");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters!");
            return;
        }

        setIsLoading(true);
        try {
            await api.post("/users/verify-otp", {
                email: email,
                otp: otp,
                newPassword: newPassword
            });
            toast.success("Password reset successfully! 🚀");
            navigate("/login");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to reset password. Check your OTP.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-[url('/login-bg.jpg')] bg-center bg-cover relative font-sans overflow-hidden">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Home Icon */}
            <Link to="/" className="absolute top-8 left-8 p-4 bg-white/10 backdrop-blur-xl rounded-full text-white hover:bg-white/20 transition-all shadow-2xl z-50 group">
                <FaHome size={28} className="group-hover:scale-110 transition-transform" />
            </Link>

            <div className="w-[90%] lg:w-1/2 h-full flex justify-center items-center relative z-10">
                <div className="w-full max-w-[480px] bg-white/10 backdrop-blur-2xl rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-white/20 p-10 lg:p-14 transition-all animate-fadeIn">
                    
                    {!isEmailSent ? (
                        <div className="space-y-8">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-accent/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                    <FaKey size={32} className="text-accent" />
                                </div>
                                <h2 className="text-4xl font-black text-white mb-3">Forgot Password?</h2>
                                <p className="text-white/60 font-medium">Don't worry! Enter your email and we'll send you a 6-digit OTP to reset it.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-accent transition-colors">
                                        <FaEnvelope size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 outline-none focus:border-accent focus:ring-4 focus:ring-accent/20 transition-all font-medium"
                                    />
                                </div>

                                <button
                                    onClick={sendEmail}
                                    disabled={isLoading}
                                    className="w-full bg-accent hover:bg-opacity-90 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-accent/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                >
                                    {isLoading ? "Sending..." : "Send Reset Link"}
                                </button>

                                <div className="text-center">
                                    <Link to="/login" className="text-white/40 hover:text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors">
                                        <FaArrowLeft size={12} /> Back to Sign In
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-fadeIn">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-green-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                    <FaCheck size={32} className="text-green-500" />
                                </div>
                                <h2 className="text-4xl font-black text-white mb-3">OTP Sent!</h2>
                                <p className="text-white/60 font-medium">We've sent a code to <span className="text-white">{email}</span>. Enter it below with your new password.</p>
                            </div>

                            <div className="space-y-5">
                                <div className="group">
                                    <input
                                        type="text"
                                        placeholder="6-Digit OTP"
                                        maxLength={6}
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-center tracking-[0.5em] text-2xl placeholder:tracking-normal placeholder:text-sm placeholder:text-white/20 outline-none focus:border-accent transition-all font-black"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/20 outline-none focus:border-accent transition-all font-medium"
                                    />
                                    <input
                                        type="password"
                                        placeholder="Confirm New Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/20 outline-none focus:border-accent transition-all font-medium"
                                    />
                                </div>

                                <button
                                    onClick={resetPassword}
                                    disabled={isLoading}
                                    className="w-full bg-accent text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-accent/20 hover:shadow-accent/40 transition-all active:scale-95 disabled:opacity-50"
                                >
                                    {isLoading ? "Resetting..." : "Reset Password"}
                                </button>

                                <div className="flex justify-between items-center px-2">
                                    <button onClick={() => setIsEmailSent(false)} className="text-white/40 hover:text-white font-bold text-sm transition-colors">
                                        Try another email
                                    </button>
                                    <button onClick={sendEmail} className="text-accent hover:underline font-bold text-sm">
                                        Resend OTP
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}