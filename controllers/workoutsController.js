const express = require("express");
const router = express.Router();
const path = require("path");

const db = require("../models");

//these next 3 routes should probably be in server.js but even though it would mean 
//changing just one dot in the relative path I decided not to mess with them.

router.get("/exercise", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/stats", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});


router.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } }, {new: true})
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


//this is not a functional route based on the front end design but I kept in here for CRUD purposes
router.delete("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndDelete(req.params.id, req.body)
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