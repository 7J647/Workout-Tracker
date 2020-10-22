const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
      },
    exercises: [
        {
            type: {
                type: String,
                required: "Type of Exercise is Required",
                minlength: 1
                
            },
            name: {
                type: String,
                required: "Name of Exercise is Required",
                minlength: 1
            },
            distance: {
                type: Number,
            },
            duration: {
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
      ]
    },
    {
        toJSON: {
          // include any virtual properties when data is requested
          virtuals: true
        }
    });



    WorkoutSchema.virtual("totalDuration").get(function() {
        return this.exercises.reduce((total,current) =>  total + current.duration,0)
      });

    //   this.exercises.reduce((total,current)=> return total + current,0)

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;