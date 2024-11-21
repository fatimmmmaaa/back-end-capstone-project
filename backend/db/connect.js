import mongoose from "mongoose";


export async function connect() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDB ${conn.connections[0].name}`);

    } catch (error) {
        console.log(error);
    }
}