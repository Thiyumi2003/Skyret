import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import authenticateUser from "./middlewares/authentication.js";
import productRouter from "./routers/productRouter.js";
import cors from "cors"
import dotenv from "dotenv"
import orderRouter from "./routers/orderRouter.js";
import reviewRouter from "./routers/reviewRouter.js";
import mediaRouter from "./routers/mediaRouter.js";
import inquiryRouter from "./routers/inquiryRouter.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()

const app = express();


const mongodbURI = process.env.MONGO_URI

mongoose.connect(mongodbURI).then(
    ()=>{
        console.log("Connected to MongoDB");
    }
)
app.use(cors())

app.use(express.json())

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use(authenticateUser)

app.use("/api/users",userRouter)
app.use("/api/products",productRouter)
app.use("/api/orders",orderRouter)
app.use("/api/reviews",reviewRouter)
app.use("/api/media",mediaRouter)
app.use("/api/inquiries", inquiryRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, (req,res) => {
	console.log(`Server is running on port ${PORT}`);
});
