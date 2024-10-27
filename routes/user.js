const express = require("express");
const {
    handleGetAllUsers,  // Ensure this matches the controller's export
    handleGetAllusersById,
    handleRegisterNewUser,
    handleDeleteUserById,
} = require("../controller/user");

const router = express.Router();

// Get all users
router.get("/", handleGetAllUsers);  // Update here if needed

// Get user by ID
router.get("/:id", handleGetAllusersById);

// Register a new user
router.post("/", handleRegisterNewUser);

// Delete user
router.delete("/:id", handleDeleteUserById)


module.exports = router;
