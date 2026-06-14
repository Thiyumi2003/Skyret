import mongoose from "mongoose";
import User from "./models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const mongodbURI = process.env.MONGO_URI;

async function createAdminUser() {
    try {
        await mongoose.connect(mongodbURI);
        console.log("Connected to MongoDB");

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: "admin@gmail.com" });
        if (existingAdmin) {
            console.log("Admin user already exists!");
            await mongoose.disconnect();
            return;
        }

        // Create admin user
        const passwordHash = bcrypt.hashSync("admin123", 10);
        
        const adminUser = new User({
            email: "admin@gmail.com",
            firstName: "Admin",
            lastName: "User",
            password: passwordHash,
            isAdmin: true,
            isEmailVerified: true,
            isBlocked: false
        });

        await adminUser.save();
        console.log("✅ Admin user created successfully!");
        console.log("Email: admin@gmail.com");
        console.log("Password: admin123");

        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    } catch (error) {
        console.error("Error creating admin user:", error);
    }
}

createAdminUser();
