const router = require("express").Router();
const { db } = require('../models/workout.js');
const Workout = require("../models/workout.js");

router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .sort({ date: -1})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts", (req, res) => {
  Workout.create(req.body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  Workout.findOneAndUpdate({_id: req.params.id}, { $push: {exercises: req.body}}, {new: true})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;