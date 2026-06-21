import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//user registration
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        msg: "Please fill all required fields."
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        msg: "User is already registered with this email."
      });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();

    return res.status(201).json({
      msg: "Registration successful."
    });

  } catch (error) {
    console.error("Registration Error:", error);

    return res.status(500).json({
      msg: "Unable to register user due to an internal server error."
    });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        msg: "Email and password are required."
      });
    }

    // Find user by email
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        msg: "No account found with this email."
      });
    }
    // Compare entered password with hashed password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        msg: "Incorrect password."
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: existingUser._id,
        role: existingUser.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    // Send only required user details
    return res.status(200).json({
      msg: "Login successful.",
      token,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role
      }
    });

  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      msg: "Internal server error while logging in."
    });
  }
};

// Get all hosts (employees)
export const getHosts = async (req, res) => {

  try {

    const hosts = await User.find(
      { role: "employee" },
      "name email"
    );

    return res.json(hosts);

  } catch (error) {

    return res.status(500).json({
      error: error.message
    });

  }

};