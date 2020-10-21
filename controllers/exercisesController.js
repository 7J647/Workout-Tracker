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