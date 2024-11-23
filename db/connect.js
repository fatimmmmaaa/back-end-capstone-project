import mongoose from "mongoose";


export async function connect() {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to MongoDB ${conn.connections[0].name}`);
        
    } catch (e) {
        console.error(e);
        
    }
}