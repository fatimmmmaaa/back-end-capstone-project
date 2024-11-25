import express from "express";
import mongoose from "mongoose";
import Workouts from "../models/Workouts.js"

const router = express.Router();


/***
 * GET / workouts
 * @description Return all workouts
 */
router.get('/', async (req, res) => {
  try {
      const workouts = await Workouts.find();
      return res.status(200).json(workouts);
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
});

// Get a single workout by ID
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




router.post('/', async (req, res) => {
  try {
    const { name, exercises, powerUp } = req.body;

    const workout = new Workouts({
        name,
        exercises,
        powerUp
    });

    const savedWorkout = await workout.save();
    return res.status(201).json(savedWorkout);
} catch (error) {
    return res.status(400).json({ message: error.message });
}
})

router.post('/:id/exercise', async (req, res) => {
    try {
      const {id} = req.params;
  
      // find the chat by the id
      const workout = await Workouts.findById(id);
      console.log(workout);
  
      // add a new message to the messages array
      workout.exercises.push(req.body)
      await workout.save()
  
      res.status(201).json(workout)
      
    } catch (e) {
      console.error(e);
    }
  });
  

export default router