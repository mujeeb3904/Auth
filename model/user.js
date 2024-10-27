const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: { 
        type: String,
         required: true
         },
    email: {
         type: String, 
         required: true, 
         unique: true
         },
    password: { 
        type: String, 
        required: true 
    },
    contactNumber: { 
        type: String, 
        required: true },
});

const User = mongoose.model("User", userSchema);  // Ensure this line is correct

module.exports = User;
