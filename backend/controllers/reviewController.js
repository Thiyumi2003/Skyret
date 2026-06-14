import Review from "../models/review.js";

export async function createReview(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { productId, rating, comment } = req.body;

        const review = new Review({
            productId,
            email: req.user.email,
            userName: req.user.firstName + " " + req.user.lastName,
            rating,
            comment
        });

        await review.save();
        res.status(201).json({ message: "Review created successfully", review });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getReviewsByProduct(req, res) {
    try {
        const { productId } = req.params;
        const reviews = await Review.find({ productId }).sort({ date: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getAllReviews(req, res) {
    try {
        const reviews = await Review.find().sort({ date: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function deleteReview(req, res) {
    try {
        if (!req.user || !req.user.isAdmin) {
            return res.status(403).json({ message: "Forbidden: Admin only" });
        }

        const { id } = req.params;
        await Review.findByIdAndDelete(id);
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}