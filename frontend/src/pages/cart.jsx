import { useState } from "react"
import { addToCart, getCart, getCartTotal } from "../utils/cart"
import getFormattedPrice from "../utils/price-format"
import { Link, Navigate } from "react-router-dom"
import { FaTrash, FaMinus, FaPlus, FaShoppingCart, FaArrowRight } from "react-icons/fa"

export default function CartPage(){
    const [cart , setCart] = useState(getCart())
    const isLoggedIn = !!localStorage.getItem("token")

    if (!isLoggedIn) {
        return <Navigate to="/login" />
    }

    const updateQuantity = (product, amount) => {
        addToCart(product, amount)
        setCart(getCart())
    }

    if (cart.length === 0) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-5 animate-fadeIn">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <FaShoppingCart className="text-gray-300 text-4xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-8 text-center max-w-xs">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/products" className="px-8 py-3 bg-accent text-white rounded-xl font-bold hover:shadow-lg transition-all active:scale-95">
                    Start Shopping
                </Link>
            </div>
        )
    }

    return(
        <div className="w-full min-h-full bg-gray-50 flex flex-col p-4 lg:p-10 items-center gap-6 pb-[200px] lg:pb-32">
            <div className="w-full lg:w-[800px] flex justify-between items-end mb-4">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <FaShoppingCart className="text-accent" />
                    Shopping Cart
                </h1>
                <span className="text-gray-500 font-medium">{cart.length} {cart.length === 1 ? 'Item' : 'Items'}</span>
            </div>

            <div className="w-full lg:w-[800px] space-y-4">
                {
                    cart.map(
                        (item)=>{
                            return(
                                <div key={item.product.productId} className="bg-white group rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row p-4 items-center gap-6 transition-all hover:shadow-md">
                                        <div className="w-24 h-24 shrink-0 overflow-hidden rounded-xl border border-gray-100">
                                            <img className="w-full h-full object-cover transition-transform group-hover:scale-110" src={item.product.image}/>
                                        </div>

                                        <div className="flex-1 min-w-0 text-center md:text-left">
                                            <h1 className="text-lg font-bold text-gray-800 truncate">{item.product.name}</h1>
                                            <p className="text-xs text-gray-400 font-mono mb-2">{item.product.productId}</p>
                                            <div className="flex items-center justify-center md:justify-start gap-3">
                                                <p className="text-accent font-bold text-xl">
                                                    {getFormattedPrice(item.product.price)}
                                                </p>
                                                {
                                                    item.product.labelledPrice > item.product.price && 
                                                    <span className="text-sm text-gray-400 line-through decoration-red-400/50">
                                                        {getFormattedPrice(item.product.labelledPrice)}
                                                    </span>
                                                }
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center md:items-end gap-3 shrink-0">
                                            <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                                                <button 
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:text-red-500 hover:shadow-sm transition-all"
                                                    onClick={() => updateQuantity(item.product, -1)}
                                                >
                                                    {item.quantity === 1 ? <FaTrash size={12}/> : <FaMinus size={12}/>}
                                                </button>
                                                <span className="w-10 text-center font-bold text-gray-700">{item.quantity}</span>
                                                <button 
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:text-accent hover:shadow-sm transition-all"
                                                    onClick={() => updateQuantity(item.product, 1)}
                                                >
                                                    <FaPlus size={12}/>
                                                </button>
                                            </div>
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

            {/* Summary Bar */}
            <div className="fixed bottom-[82px] lg:bottom-6 w-[95%] lg:w-[800px] bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex p-4 items-center justify-between animate-slideUp">
                <div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Total Amount</p>
                    <p className="text-3xl font-black text-gray-800">{getFormattedPrice(getCartTotal(cart))}</p>
                </div>
                <Link to="/checkout" state={cart} className="bg-accent text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 transition-all group">
                    Checkout Now
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    )
}