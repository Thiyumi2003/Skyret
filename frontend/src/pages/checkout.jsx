import { useState } from "react"
import { getCartTotal } from "../utils/cart"
import getFormattedPrice from "../utils/price-format"
import { useLocation, Navigate, Link } from "react-router-dom"
import CreateOrderModal from "../components/createOderModal"
import { FaArrowLeft, FaReceipt, FaBox, FaCreditCard } from "react-icons/fa"

export default function CheckoutPage(){
    const location = useLocation()
    const [cart , setCart] = useState(location.state)
    const isLoggedIn = !!localStorage.getItem("token")

    if (!isLoggedIn) {
        return <Navigate to="/login" />
    }

    if (!cart || cart.length === 0) {
        return <Navigate to="/cart" />
    }

    return(
        <div className="w-full min-h-full bg-gray-50 flex flex-col items-center py-10 px-4 md:px-0">
            <div className="w-full max-w-[800px] mb-8 flex items-center justify-between">
                <Link to="/cart" className="flex items-center gap-2 text-gray-500 hover:text-accent transition-colors font-medium">
                    <FaArrowLeft />
                    Back to Cart
                </Link>
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <FaReceipt className="text-accent" />
                    Checkout
                </h1>
                <div className="w-[100px]"></div> {/* Spacer */}
            </div>

            <div className="w-full max-w-[1000px] flex flex-col lg:flex-row gap-8 items-start">
                {/* Product List */}
                <div className="w-full lg:flex-1 space-y-4">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-4">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
                            <FaBox className="text-gray-400" />
                            Order Summary
                        </h2>
                        <div className="space-y-4">
                            {
                                cart.map(
                                    (item , index)=>{
                                        return(
                                            <div key={item.product.productId} className="flex items-center gap-4 p-2 rounded-xl hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 pb-4 last:pb-0">
                                                <img className="w-20 h-20 object-cover rounded-lg shadow-sm" src={item.product.image}/>
                                                <div className="flex-1 min-w-0">
                                                    <h1 className="text-lg font-bold text-gray-800 truncate">{item.product.name}</h1>
                                                    <p className="text-sm text-gray-400 font-medium">Qty: {item.quantity}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-accent font-bold">{getFormattedPrice(item.product.price)}</span>
                                                        {item.product.labelledPrice > item.product.price && (
                                                            <span className="text-xs text-gray-400 line-through">{getFormattedPrice(item.product.labelledPrice)}</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-black text-gray-800">
                                                        {getFormattedPrice(item.product.price * item.quantity)}
                                                    </p>
                                                </div>                           
                                            </div>
                                        )
                                    }
                                )
                            }
                        </div>
                    </div>
                </div>

                {/* Right Side: Total & Shipping Action */}
                <div className="w-full lg:w-[400px] sticky top-10">
                    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <FaCreditCard className="text-gray-400" />
                            Payment Details
                        </h2>
                        
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-gray-500">
                                <span>Subtotal</span>
                                <span>{getFormattedPrice(getCartTotal(cart))}</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Shipping</span>
                                <span className="text-green-500 font-bold uppercase text-xs">Free</span>
                            </div>
                            <div className="border-t pt-4 flex justify-between items-end">
                                <span className="text-lg font-bold text-gray-800">Total</span>
                                <div className="text-right">
                                    <p className="text-3xl font-black text-accent">{getFormattedPrice(getCartTotal(cart))}</p>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Including VAT</p>
                                </div>
                            </div>
                        </div>

                        <CreateOrderModal cart={cart}/>

                        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                            <p className="text-xs text-blue-600 leading-relaxed">
                                🛡️ <strong>Secure Checkout:</strong> Your information is protected by industry-standard encryption. By placing this order, you agree to our Terms of Service.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="h-20 lg:hidden"></div> {/* Mobile Spacer */}
        </div>
    )
}