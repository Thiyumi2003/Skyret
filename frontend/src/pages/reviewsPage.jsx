import { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";

export default function ReviewsPage() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/reviews")
            .then((res) => {
                setReviews(res.data);
                setLoading(false);
            })
            .catch((err) => {
                toast.error("Failed to load reviews");
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-10 text-center">Loading testimonials...</div>;

    return (
        <div className="w-full min-h-full p-6 bg-primary">
            <h1 className="text-4xl font-bold text-center mb-10 text-secondary">What Our Customers Say</h1>
            
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500">No reviews yet.</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review._id} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col">
                            <div className="flex text-yellow-500 mb-4 text-xl">
                                {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                            </div>
                            <p className="text-gray-700 italic flex-1 text-lg mb-6">"{review.comment}"</p>
                            <div className="mt-auto border-t pt-4 flex justify-between items-center">
                                <span className="font-bold text-secondary">{review.userName}</span>
                                <span className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}