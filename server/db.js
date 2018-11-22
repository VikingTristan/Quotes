//Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
const mongoose = require("mongoose");

const databaseUri = process.env.DB_URI || "mongodb://127.0.0.1:27017/quotes";

const options = {
    reconnectTries: Number.MAX_VALUE,
    poolSize: 10,
    useNewUrlParser: true
};

console.log("Attempting to connect to " + databaseUri);

mongoose.connect(databaseUri, options).then(() => {
    console.log("Database connection established.");
}, err => {
    console.log("Error connecting to database instance due to: ", err);
});