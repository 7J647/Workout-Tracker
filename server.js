const express = require("express");
const mongoose = require("mongoose");
const db = require("./models");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true, useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.on("connected", () => {
    console.log("Mongoose successfully connected.");
})

connection.on("error", (err) => {
    console.log("Mongoose connection error: ", err);
});

app.get("/api/config", (req, res) => {
    res.json({
        success: true,
    });
});

app.get("/api/workouts", (req, res) => {
    db.Workout.find({}).then((foundWorkouts) => {
        res.json(foundWorkouts);
    });
});

app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body).then((newWorkout) => {
        res.json(newWorkout);
    });
});

app.get("/api/exercises", (req, res) => {
    db.Exercise.find({}).then((foundExercisess) => {
        res.json(foundExercises);
    });
});

app.post("/api/exercises", (req, res) => {
    db.Exercise.create(req.body).then((newExercise) => {
        res.json(newExercise);
    });
});

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});


// app.post("/api/workouts", ({body}, res) => {
//     User.create(body)
//       .then(dbUser => {
//         res.json(dbUser);
//       })
//       .catch(err => {
//         res.json(err);
//       });
//   });

//   app.put("/api/workouts"+ id, ({body}, res) => {
//     User.create(body)
//       .then(dbUser => {
//         res.json(dbUser);
//       })
//       .catch(err => {
//         res.json(err);
//       });
//   });

// app.get("/user", (req, res) => {
//     db.User.find({})
//       .then(dbUser => {
//         res.json(dbUser);
//       })
//       .catch(err => {
//         res.json(err);
//       });
//   });

// //   /api/workouts
  
//   app.post("/submit", ({ body }, res) => {
//     db.Note.create(body)
//       .then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
//       .then(dbUser => {
//         res.json(dbUser);
//       })
//       .catch(err => {
//         res.json(err);
//       });
//   });
  
//   app.get("/populateduser", (req, res) => {
//     // TODO
//     // =====
//     // Write the query to grab the documents from the User collection,
//     // and populate them with any associated Notes.
//     // TIP: Check the models out to see how the Notes refers to the User
//     db.User.find({})
//     .populate("notes")
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
//   });



app.listen(PORT,() => {
    console.log(`App is running on http://localhost:${PORT}`);
});