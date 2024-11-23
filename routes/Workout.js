import express from "express";
import Workouts from "../models/Workouts.js";

const router = express.Router();



/***
 * GET / workouts
 * @description Return all workouts
 */
router.get('/', async (req, res) => {
    const workouts = await Workouts.find()
    res.json(workouts)
}); 

router.post("/", async (req, res) => {
    const{name, powerUp} = req.body
    const newWorkout = await new Workouts({name, powerUp})
    await newWorkout.save()
    console.log(newWorkout)
    res.json(newWorkout)
})

router.post('/:id/exercise', async (req, res, next) => {
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