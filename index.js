const express = require("express");
const mongoose = require("mongoose")
const useRouter = require("./routes/user")
const {LogReqRes} = require("./Midlleware")
const {connectMongoDb} = require("./connection")

const app = express();
const port = 6000;


// Connect to MongoDB

connectMongoDb("mongodb://127.0.0.1:27017/auth").then(() => {
    console.log("MongoDB Connected")
})

// Middleware to parse JSON bodies
app.use(express.json());
app.use(LogReqRes("log.txt"))


// Route to display all users

app.use("/api/user", useRouter)

// Start the server
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
