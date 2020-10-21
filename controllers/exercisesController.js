const express = require("express");
const router = express.Router();

const db = require("../models");


router.get("/api/exercises", (req, res) => {
    db.Exercise.find({}).then((foundExercises) => {
        res.json(foundExercises);
    }).catch(err => {
        console.log(err);
        res.json({
            error: true,
            data: null,
            message: "Failed to retrieve Exercises.",
        });
    });
});

router.get("/api/exercises/:id", (req, res) => {
    db.Exercise.findById(req.params.id)
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

router.put("/api/exercises/:id", (req, res) => {
    db.Exercise.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((updatedExercise) => {
        res.json(updatedExercise);
    }).catch(err => {
        console.log(err);
        res.json({
            error: true,
            data: null,
            message: `Failed to update Exercise with id: ${req.params.id}.`,
        });
    });
});

router.delete("/api/exercises/:id", (req, res) => {
    db.Exercise.findByIdAndDelete(req.params.id, req.body)
    .then((deletedExercise) => {
        res.json(deletedExercise);
    }).catch(err => {
        console.log(err);
        res.json({
            error: true,
            data: null,
            message: `Failed to delete Exercise with id: ${req.params.id}.`,
        });
    });
});

router.post("/api/exercises", (req, res) => {
    db.Exercise.create(req.body).then((newExercise) => {
        res.json(newExercise);
    }).catch(err => {
        console.log(err);
        res.json({
            error: true,
            data: null,
            message: "Failed to create exercise.",
        });
    });
});





module.exports = router;