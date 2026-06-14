import express from "express";
import { createInquiry, getInquiries, deleteInquiry } from "../controllers/inquiryController.js";

const inquiryRouter = express.Router();

inquiryRouter.post("/", createInquiry);
inquiryRouter.get("/", getInquiries);
inquiryRouter.delete("/:id", deleteInquiry);

export default inquiryRouter;