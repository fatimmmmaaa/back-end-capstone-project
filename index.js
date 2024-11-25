import express from "express";
import dotenv from "dotenv"
import morgan from "morgan";
import cors from "cors";
import { connect } from "./db/connect.js";
import workoutRouter from "./routes/Workout.js"


dotenv.config();
connect();

const app = express ();
const PORT = process.env.PORT || 4000;

// middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use ("/api/workouts", workoutRouter);

app.get('/', (req, res) => {
    res.send("Welcome to the Workout API");
});

//error handler
app.use((error, req, res, next) => {
    console.error("Error:", error.message);
    console.error(error.stack);
    res.status(500).json({ error: error.message });
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});