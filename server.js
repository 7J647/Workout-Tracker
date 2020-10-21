const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/architecture", {
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



app.listen(PORT,() => {
    console.log(`App is running on http://localhost:${PORT}`);
});