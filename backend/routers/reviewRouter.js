import express from "express";
import { createReview, getReviewsByProduct, getAllReviews, deleteReview } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/", createReview);
reviewRouter.get("/product/:productId", getReviewsByProduct);
reviewRouter.get("/", getAllReviews);
reviewRouter.delete("/:id", deleteReview);

export default reviewRouter;