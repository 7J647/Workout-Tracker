const express = require("express");
const router = express.Router();

const db = require("../models");

router.get("/api/workouts", (req, res) => {
    db.Exercise.find({})
    .populate("exercises")
    .then((foundWorkouts) => {
        res.json(foundWorkouts);
    }).catch(err => {
        console.log(err);
        res.json({
            error: true,
            data: null,
            message: "Failed to retrieve Workouts.",
        });
    });
});

router.get("/api/exercises/:id", (req, res) => {
    db.Exercise.findById(req.params.id)
    .populate("exercises")
    .then((foundExercise) => {
        res.json(foundExercise);
    }).catch(err => {
        console.log(err);
        res.json({
            error: true,
            data: null,
            message: `Failed to retrieve Exercise with id: ${req.params.id}.`,
        });
    });
});

router.post("/api/workouts", (req, res) => {
    db.Exercise.create(req.body).then((newWorkout) => {
        res.json(newWorkout);
    }).catch(err => {
        console.log(err);
        res.json({
            error: true,
            data: null,
            message: "Failed to create workout.",
        });
    });
});

router.put("/api/workouts/:id", (req, res) => {
    db.Exercise.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((updatedWorkout) => {
        res.json(updatedWorkout);
    }).catch(err => {
        console.log(err);
        res.json({
            error: true,
            data: null,
            message: `Failed to update Workout with id: ${req.params.id}.`,
        });
    });
});

router.delete("/api/workouts/:id", (req, res) => {
    db.Exercise.findByIdAndDelete(req.params.id, req.body)
    .then((deletedWorkout) => {
        res.json(deletedWorkout);
    }).catch(err => {
        console.log(err);
        res.json({
            error: true,
            data: null,
            message: `Failed to delete Workout with id: ${req.params.id}.`,
        });
    });
});



module.exports = router;