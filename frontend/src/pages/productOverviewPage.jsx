import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import api from "../utils/api"
import toast from "react-hot-toast"
import LoadingAnimation from "../components/loadingAnimation"
import ImageSlideShow from "../components/imageSlidesShow"
import getFormattedPrice from "../utils/price-format"
import { addToCart } from "../utils/cart"
import { FaStar, FaChevronRight, FaPlus, FaPaperPlane } from "react-icons/fa"

export default function ProductOverviewPage(){
    const parameters = useParams()
    const navigate = useNavigate()
    const [product , setProduct] = useState(null)
    const [status , setStatus] = useState("loading")// loading , success , error
    const [reviews, setReviews] = useState([])
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState("")
    const isLoggedIn = !!localStorage.getItem("token")

    const fetchReviews = () => {
        api.get("/reviews/product/" + parameters.productId, { skipAuth: true }).then((res) => {
            setReviews(res.data)
        }).catch((err) => console.log(err))
    }
    
    useEffect(
        ()=>{
            api.get("/products/"+parameters.productId).then(
                (response)=>{
                    setProduct(response.data)
                    setStatus("success")
                }
            ).catch(
                (error)=>{
                    toast.error(error?.response?.data?.message || "An error occurred while fetching product details.")
                    setStatus("error")
                }
            )
            fetchReviews()
        }
        ,[]
    )

    const handleSubmitReview = (e) => {
        e.preventDefault()
        if (!isLoggedIn) {
            toast.error("Please login to submit a review!");
            navigate("/login");
            return;
        }

        api.post("/reviews", {
            productId: parameters.productId,
            rating,
            comment
        }).then(() => {
            toast.success("Hooray! Review submitted ✨")
            setComment("")
            fetchReviews()
        }).catch((err) => {
            toast.error(err.response?.data?.message || "Failed to submit review")
        })
    }

    const handleAction = (action) => {
        if (!isLoggedIn) {
            toast.error("Please login to continue!");
            navigate("/login");
            return;
        }
        
        if (action === "addToCart") {
            addToCart(product, 1);
            toast.success("Product added to cart ✨");
        } else if (action === "buyNow") {
            addToCart(product, 1);
            navigate("/cart");
        }
    }

    return(
        <div className="w-full h-full flex justify-center items-center bg-white">
            {
                status == "loading" && <LoadingAnimation/>
            }
            {
                status == "error" && <div className="w-full h-[300px] flex flex-col items-center justify-center gap-4">
                    <h1 className="text-2xl font-bold text-secondary">Product Not Found</h1>
                    <Link to="/products" className="px-6 py-2 bg-accent text-white rounded-xl font-bold transition-all hover:shadow-lg">Back to Products</Link>
                </div>
            }
            {
                status == "success" && <div className="w-full h-full flex lg:flex-row flex-col">
                        <div className="w-full lg:w-1/2 h-full flex justify-center items-center bg-[#fbfbfb] p-10">
                            <ImageSlideShow images={product.images}/>
                        </div>
                        <div className="w-full lg:w-1/2 h-full flex flex-col p-8 lg:p-16 overflow-y-auto">
                            {/* Product Info */}
                            <div className="mb-10 animate-fadeIn">
                                <div className="flex items-center gap-3 text-accent font-black text-xs tracking-[0.2em] uppercase mb-4">
                                    <span>{product.category}</span>
                                    <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
                                    <span>{product.brand}</span>
                                </div>
                                <h1 className="text-3xl lg:text-4xl font-black text-secondary leading-[1.2] mb-6">
                                    {product.name}
                                    {
                                        product.altNames.map(
                                            (alternativeName, index) => (
                                                <span key={index} className="text-gray-200 font-light italic"> | {alternativeName}</span>
                                            )
                                        )
                                    }
                                </h1>
                                <div className="flex items-center gap-6">
                                    <div className="flex text-yellow-500 gap-0.5">
                                        {[...Array(5)].map((_, i) => <FaStar key={i} size={14} />)}
                                    </div>
                                    <span className="text-xs font-bold text-gray-400 tracking-wider">({reviews.length} CUSTOMER REVIEWS)</span>
                                </div>
                            </div>

                            <div className="bg-white rounded-[40px] p-8 lg:p-12 mb-12 shadow-[0_30px_60px_rgba(0,0,0,0.03)] border border-gray-50">
                                <div className="flex items-baseline gap-4 mb-10">
                                    <span className="text-4xl font-black text-accent tracking-tighter">
                                        {getFormattedPrice(product.price)}
                                    </span>
                                    {
                                        product.labelledPrice > product.price &&
                                        <span className="text-xl text-gray-300 line-through decoration-red-400/50 decoration-2">
                                            {getFormattedPrice(product.labelledPrice)}
                                        </span>
                                    }
                                </div>
                                
                                <div className="grid grid-cols-2 gap-8 mb-12">
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] mb-2">Model Number</p>
                                        <p className="text-secondary font-bold text-base">{product.model}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] mb-2">Serial ID</p>
                                        <p className="text-secondary font-bold text-base">{product.productId}</p>
                                    </div>
                                </div>

                                <div className="mb-12">
                                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] mb-4">Description</p>
                                    <p className="text-gray-500 leading-relaxed font-medium text-base italic bg-gray-50/50 p-6 rounded-3xl border-l-[6px] border-accent">
                                        "{product.description}"
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button 
                                        className="flex-1 h-16 bg-secondary text-white font-black rounded-[20px] hover:bg-black transition-all flex items-center justify-center gap-3 active:scale-95 text-lg" 
                                        onClick={() => handleAction("addToCart")}
                                    >
                                        Add to Cart <FaPlus size={14}/>
                                    </button>
                                    <button 
                                        className="flex-1 h-16 bg-accent text-white font-black rounded-[20px] hover:shadow-[0_20px_40px_rgba(var(--accent-rgb),0.3)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 active:scale-95 text-lg" 
                                        onClick={() => handleAction("buyNow")}
                                    >
                                        Buy Now <FaChevronRight size={14}/>
                                    </button>
                                </div>
                            </div>

                            {/* Reviews Section */}
                            <div className="mt-8 border-t border-gray-100 pt-16 mb-20">
                                <div className="mb-12">
                                    <h3 className="text-3xl font-black text-secondary mb-3">Owner Feedback</h3>
                                    <p className="text-gray-400 font-medium">What people are saying about this {product.brand} product.</p>
                                </div>
                                
                                {/* Review Form */}
                                {isLoggedIn ? (
                                    <form onSubmit={handleSubmitReview} className="mb-16 p-8 lg:p-10 bg-[#f8fafc] rounded-[40px] border border-gray-100">
                                        <h4 className="text-xl font-black text-secondary mb-8">Write a Review</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Your Rating</label>
                                                <div className="flex gap-2">
                                                    {[5,4,3,2,1].map(num => (
                                                        <button 
                                                            key={num}
                                                            type="button"
                                                            onClick={() => setRating(num)}
                                                            className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${rating === num ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20' : 'bg-white border-gray-100 text-gray-400 hover:border-accent/30'}`}
                                                        >
                                                            {num} <FaStar className="inline mb-1" size={10}/>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-3 mb-8">
                                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Your Message</label>
                                            <textarea 
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                placeholder="Share your experience with this product..."
                                                className="w-full bg-white border-2 border-gray-100 p-6 rounded-[24px] h-32 outline-none focus:border-accent transition-all font-medium text-secondary resize-none"
                                                required
                                            ></textarea>
                                        </div>
                                        <button type="submit" className="w-full py-5 bg-secondary text-white rounded-2xl font-black text-lg hover:bg-black transition-all flex items-center justify-center gap-3">
                                            Publish Review <FaPaperPlane size={16}/>
                                        </button>
                                    </form>
                                ) : (
                                    <div className="mb-16 p-10 bg-accent/5 rounded-[40px] border-2 border-dashed border-accent/20 text-center">
                                        <p className="text-secondary font-black text-xl mb-4">Want to share your thoughts?</p>
                                        <p className="text-gray-500 font-medium mb-8">Only verified buyers who are logged in can leave reviews.</p>
                                        <Link to="/login" className="px-10 py-4 bg-accent text-white rounded-2xl font-black inline-flex items-center gap-3 hover:-translate-y-1 transition-all shadow-xl shadow-accent/20">
                                            Login to Review <FaChevronRight size={14}/>
                                        </Link>
                                    </div>
                                )}

                                {/* Reviews List */}
                                <div className="space-y-10">
                                    {reviews.length === 0 && (
                                        <div className="text-center py-20 bg-gray-50/50 rounded-[40px] border-2 border-dashed border-gray-100">
                                            <p className="text-gray-400 font-bold">No reviews yet. Be the first to share! 🚀</p>
                                        </div>
                                    )}
                                    {reviews.map((review) => (
                                        <div key={review._id} className="group pb-10 border-b border-gray-100 last:border-0">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <span className="block font-black text-secondary text-base mb-1">{review.userName || "Customer"}</span>
                                                    <div className="flex text-accent gap-0.5">
                                                        {[...Array(5)].map((_, i) => (
                                                            <FaStar key={i} size={12} className={i < review.rating ? 'text-accent' : 'text-gray-200'}/>
                                                        ))}
                                                    </div>
                                                </div>
                                                <span className="text-[10px] font-black text-gray-400 tracking-wider uppercase bg-gray-50 px-3 py-1.5 rounded-full">{new Date(review.date).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-gray-500 font-medium leading-[1.6] text-base bg-gray-50/30 p-6 rounded-3xl group-hover:bg-white transition-all">
                                                {review.comment}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}