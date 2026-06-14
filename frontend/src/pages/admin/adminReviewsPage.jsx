import { useEffect, useState } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { FaStar, FaTrash } from "react-icons/fa";

export default function AdminReviewsPage() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReviews = () => {
        setLoading(true);
        api.get("/reviews")
            .then((res) => {
                setReviews(res.data);
                setLoading(false);
            })
            .catch((err) => {
                toast.error("Failed to fetch reviews");
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            api.delete(`/reviews/${id}`)
                .then(() => {
                    toast.success("Review deleted");
                    fetchReviews();
                })
                .catch((err) => {
                    toast.error(err.response?.data?.message || "Failed to delete review");
                });
        }
    };

    if (loading) return <div className="p-5 text-white">Loading reviews...</div>;

    return (
        <div className="w-full h-full p-5 overflow-y-scroll">
            <h1 className="text-3xl font-bold text-zinc-950 ite mb-6">Manage Customer Reviews</h1>
            
            <div className="grid grid-cols-1 gap-4">
                {reviews.length === 0 ? (
                    <p className="text-white">No reviews found.</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review._id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="font-bold text-lg">{review.userName}</span>
                                    <span className="text-gray-500 text-sm">{review.email}</span>
                                    <span className="text-gray-400 text-xs">{new Date(review.date).toLocaleString()}</span>
                                </div>
                                <div className="text-sm text-gray-600 mb-2">Product ID: {review.productId}</div>
                                <div className="flex text-yellow-500 mb-2">
                                    {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                                </div>
                                <p className="text-gray-800 italic">"{review.comment}"</p>
                            </div>
                            <button 
                                onClick={() => handleDelete(review._id)}
                                className="text-red-500 hover:text-red-700 p-2 text-xl"
                                title="Delete Review"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}