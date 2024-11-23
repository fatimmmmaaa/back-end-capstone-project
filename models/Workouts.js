import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    exercises: [
        {
            exerciseType: {type: String, required: true},
            exerciseName: {type: String, required: true},
            description: {type: String, required: true}, 
            reps: {type: Number, required: true},
            sets: {type: Number, required: true}
        }
    ],
    // intensity: {
    //     type: String,
    //     enum: ["beginner", "intermediate", "advanced"],
    //     required: true

    // }, 
    powerUp:{
        type: Number,
        required: true
    }
})

export default mongoose.model ("Workouts", workoutSchema)