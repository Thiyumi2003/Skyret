import Inquiry from "../models/inquiry.js";

export async function createInquiry(req, res) {
    try {
        const newInquiry = new Inquiry(req.body);
        await newInquiry.save();
        res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to send message", error: error.message });
    }
}

export async function getInquiries(req, res) {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ message: "Forbidden" });
    }
    try {
        const inquiries = await Inquiry.find().sort({ date: -1 });
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch inquiries", error: error.message });
    }
}

export async function deleteInquiry(req, res) {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ message: "Forbidden" });
    }
    try {
        await Inquiry.findByIdAndDelete(req.params.id);
        res.json({ message: "Inquiry deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete inquiry", error: error.message });
    }
}