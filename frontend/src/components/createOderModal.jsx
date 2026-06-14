import { useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";
import { FaTruck, FaUser, FaMapMarkerAlt, FaCity, FaPhoneAlt, FaRegTimesCircle, FaCheckCircle } from "react-icons/fa";

export default function CreateOrderModal(props){
    const [isModalOpen , setIsModalOpen] = useState(false)
    const [firstName , setFirstName] = useState("")
    const [lastName , setLastName] = useState("")
    const [addressLineOne , setAddressLineOne] = useState("")
    const [addressLineTwo , setAddressLineTwo] = useState("")
    const [city , setCity] = useState("")
    const [state , setState] = useState("")
    const [postalCode , setPostalCode] = useState("")
    const [phone , setPhone] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const cart = props.cart;

    async function createOder(){
        if (!firstName || !lastName || !addressLineOne || !city || !phone) {
            toast.error("Please fill in all required fields!");
            return;
        }

        try{
            setIsSubmitting(true);
            const data = {
                firstName,
                lastName,
                addressLineOne,
                addressLineTwo,
                city,
                state,
                postalCode,
                phone,
                items : []
            }

            for(let i=0; i<cart.length; i++){
                const item = cart[i]
                data.items.push(
                    {
                        productId : item.product.productId,
                        quantity : item.quantity
                    }
                )
            }

            const result = await api.post("/orders" , data)
            toast.success("Hooray! Order placed successfully ✨")
            localStorage.removeItem("cart")
            setIsModalOpen(false)
            window.location.href = "/my-orders";

        }catch(error){
            toast.error(error?.response?.data?.message || "Oops! Something went wrong.")
        } finally {
            setIsSubmitting(false);
        }
    }

    return(
        <>
        <button className="w-full bg-accent text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-accent/30 transition-all flex items-center justify-center gap-2 group" onClick={() => setIsModalOpen(true)}>
            Order Now
            <FaTruck className="group-hover:translate-x-1 transition-transform" />
        </button>

        {
            isModalOpen &&
            <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
                <div className="w-full max-w-[550px] bg-white rounded-3xl shadow-2xl overflow-hidden animate-zoomIn">
                    {/* Modal Header */}
                    <div className="bg-accent p-6 text-white flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-lg">
                                <FaTruck size={20} />
                            </div>
                            <h2 className="text-xl font-bold">Shipping Information</h2>
                        </div>
                        <button onClick={() => setIsModalOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors">
                            <FaRegTimesCircle size={24} />
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <FaUser size={10} /> First Name *
                                </label>
                                <input type="text" className="w-full border-b border-gray-200 py-2 focus:border-accent focus:outline-none transition-colors" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <FaUser size={10} /> Last Name *
                                </label>
                                <input type="text" className="w-full border-b border-gray-200 py-2 focus:border-accent focus:outline-none transition-colors" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <FaMapMarkerAlt size={10} /> Address line 1 *
                            </label>
                            <input type="text" placeholder="House/Apt No, Street name" className="w-full border-b border-gray-200 py-2 focus:border-accent focus:outline-none transition-colors" value={addressLineOne} onChange={(e) => setAddressLineOne(e.target.value)} />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <FaMapMarkerAlt size={10} /> Address line 2
                            </label>
                            <input type="text" placeholder="Area, Landmark (Optional)" className="w-full border-b border-gray-200 py-2 focus:border-accent focus:outline-none transition-colors" value={addressLineTwo} onChange={(e) => setAddressLineTwo(e.target.value)} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <FaCity size={10} /> City *
                                </label>
                                <input type="text" className="w-full border-b border-gray-200 py-2 focus:border-accent focus:outline-none transition-colors" value={city} onChange={(e) => setCity(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <FaCity size={10} /> State
                                </label>
                                <input type="text" className="w-full border-b border-gray-200 py-2 focus:border-accent focus:outline-none transition-colors" value={state} onChange={(e) => setState(e.target.value)} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Postal Code</label>
                                <input type="text" className="w-full border-b border-gray-200 py-2 focus:border-accent focus:outline-none transition-colors" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <FaPhoneAlt size={10} /> Phone *
                                </label>
                                <input type="text" className="w-full border-b border-gray-200 py-2 focus:border-accent focus:outline-none transition-colors" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="p-8 bg-gray-50 flex flex-col gap-4">
                        <button 
                            disabled={isSubmitting}
                            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all ${
                                isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-100'
                            }`}
                            onClick={createOder}
                        >
                            {isSubmitting ? (
                                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                            ) : (
                                <><FaCheckCircle /> Place Order Now</>
                            )}
                        </button>
                        <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest">All fields marked with * are required</p>
                    </div>
                </div>
            </div>
        }      
        </> 
    )
}