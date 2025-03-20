import { UserModel } from "../models/userModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 📌 Register User or Vendor
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role, location, phone } = req.body;

    // Validate required fields
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    // Password confirmation check
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user or vendor
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      role: role || "user",
      location,
      phone,
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

// 📌 User Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
