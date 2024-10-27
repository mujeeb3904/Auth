const User = require("../model/user");

// Get all users from DB
async function handleGetAllUsers(req, res) {
    try {
        const allDbUsers = await User.find({});
        return res.json(allDbUsers);
    } catch (error) {
        console.error("Error fetching all users:", error);
        return res.status(500).json({ msg: "Error fetching users" });
    }
}

// Get user by ID
async function handleGetAllusersById(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.json(user);
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        return res.status(500).json({ error: "Error fetching user" });
    }
}

// Delete user by ID
async function handleDeleteUserById(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully", user });
    } catch (error) {
        console.error("Error deleting user by ID:", error);
        return res.status(500).json({ error: "Error deleting user" });
    }
}

// Register New User
async function handleRegisterNewUser(req, res) {
    const { email, userName, password, confirmPassword, contactNumber } = req.body;

    // Validate required fields
    if (!email || !userName || !password || !confirmPassword || !contactNumber) {
        return res.status(400).json({ msg: "All fields are required!" });
    }

    // Validate email format
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email.toLowerCase())) {
        return res.status(400).json({ msg: `${email} is not a valid email address.` });
    }

    // Validate password strength
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ msg: "Password must be between 6 to 20 characters, contain at least one numeric digit, one lowercase letter, and one uppercase letter." });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ msg: "Passwords do not match." });
    }

    // Phone number validation (Pakistan format)
    const contactRegex = /^03\d{2}[- ]?\d{7}$/;
    if (!contactRegex.test(contactNumber)) {
        return res.status(400).json({ msg: "Phone number is not valid." });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already registered with this email." });
        }

        // Create new user
        const newUser = await User.create({
            userName,
            email,
            password, // Ideally, hash the password here
            contactNumber,
        });

        console.log("User created:", newUser);
        return res.status(201).json({ msg: "Registration successful!", user: newUser });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ msg: "Error creating user", error: error.message });
    }
}

// Export functions
module.exports = {
    handleGetAllUsers,
    handleGetAllusersById,
    handleRegisterNewUser,
    handleDeleteUserById,
};
