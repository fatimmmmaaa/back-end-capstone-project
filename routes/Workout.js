import express from "express";
import mongoose from "mongoose";
import Workouts from "../models/Workouts.js";

const router = express.Router();


/***
 * GET / workouts
 * @description Return all workouts
 */
router.get('/:id', async (req, res) => {
  try {
    const {intensity, character} = req.query;

    let query = {};

    if (intensity) {
      query.intensity = intensity.toLowerCase();
    }

    if (character) {
      query.character = character;
    }

    const workouts = await Workouts.find(query);

    return res.status(200).json(workouts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// get a single workout by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const workout = await Workouts.findById(id);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    return res.status(200).json(workout);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});



// Create a new workout
router.post('/', async (req, res) => {
  try {
    const { name, exercises, powerUp, intensity } = req.body;

    //creates a new workout document
    const workout = new Workouts({
        name,
        exercises,
        powerUp,
        intensity
    });

    const savedWorkout = await workout.save();
    return res.status(201).json(savedWorkout);
} catch (error) {
    return res.status(400).json({ message: error.message });
}
})


//POST: add an exercise to a specific workout
router.post('/:id/exercise', async (req, res) => {
    try {
      const {id} = req.params;
  
      // find the chat by the id
      const workout = await Workouts.findById(id);
      // send a 404 if the workout is not found
      if (!workout) {
        return res.status(404).json({ message: "Workout not found" });
      }
  
      // add a new exercise to the workout's exercise array
      workout.exercises.push(req.body)
      await workout.save()
  
      return res.status(201).json(workout);
    
    } catch (e) {
      return res.status(500).json({ message: e.message }); 
    }
  });
  

export default router;