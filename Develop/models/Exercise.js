const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    type: {
        type: String,
        required: "Type of Exercise is Required"
    },
    name: {
        type: String,
        required: "Name of Exercise is Required"
    },
    distance: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    reps: {
        type: Number,
    },
    sets: {
        type: Number,
    },
 }
})

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;