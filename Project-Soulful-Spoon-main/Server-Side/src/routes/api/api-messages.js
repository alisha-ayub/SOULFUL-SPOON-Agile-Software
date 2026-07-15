// about us messages

import express from "express";
import db from "../../db/database.js"

const router = express.Router();

//to store messages form
router.post("/send-message", async (req, res) => {
    const {name, email, message} = req.body;

    if(!name || !email || !message) {
        return res.status(400).json({error: "All fields are required"});
    }

    try {
        const query = 'INSERT INTO messages (name, email, message, date_sent) VALUES (?, ?, ?, ?)';
        const values = [name, email, message, new Date().toISOString()];

        await db.run(query, values);
        res.status(201).json({success: true, message:"Message sent successfully!"});
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({error:"Failed to save message"});
    }
});

export default router;