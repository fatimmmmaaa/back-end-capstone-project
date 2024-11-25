import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Ensure each workout has a unique name
        trim: true 
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

    //change intensity
    intensity: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        required: true

    }, 

    powerUp:{
        type: Number,
        required: true
    },

    character: {
        type: String,
        required: true
    }
});

// index to improve search performance
workoutSchema.index({name: 1});


export default mongoose.model ("Workouts", workoutSchema);