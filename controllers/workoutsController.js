const express = require("express");
const router = express.Router();
const path = require("path");

const db = require("../models");

router.get("/exercise", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/stats", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});



router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
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
    db.Workout.create(req.body).then((newWorkout) => {
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
    db.Exercise.create(req.body)
    .then((newExercise) => db.Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: newExercise._id } }, {new: true}))
    .then((updatedWorkout) => {
        res.json(updatedWorkout);
    }).catch(err => {
        console.log(err);
        res.json({
            error: true,
            data: null,
            message: `Failed to update Workout with id: ${req.params.id}.`,
        });
    })
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