import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { connect } from "./db/connect.js";


dotenv.config();

const app = express ();
const PORT = process.env.PORT || 4000;

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.get('/', async (req, res) => {
    res.send("Welcome to my API")
});

//error handler
app.use((error, req, res, next) => {
    res.status(500).json({error})
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});