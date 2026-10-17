import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import Progress from "./models/Progress.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("../frontend"))
app.use(cors());


// MongoDB connection

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error);
    });


// POST - Add progress

app.post("/progress", async (req, res) => {

    try {

        const progress = new Progress({
            studentName: req.body.studentName,
            courseName: req.body.courseName,
            completionPercentage: req.body.completionPercentage
        });

        await progress.save();

        res.status(201).json({
            message: "Progress added successfully",
            progress: progress
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to add progress",
            error: error.message
        });
    }
});


// GET - Get all progress

app.get("/progress", async (req, res) => {

    try {

        const progress = await Progress.find();

        res.status(200).json(progress);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to get progress",
            error: error.message
        });
    }
});


app.listen(5000, () => {
    console.log("Server is running on port 5000");
});