import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check that the required registration details are provided
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        msg: "All fields are required."
      });
    }

    // Check if an account with the same email already exists
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(400).json({
        success: false,
        msg: "Email is already registered."
      });
    }

    // Password is hashed before storing it in MongoDB
    const hashedPassword = await bcrypt.hash(password, 10);

    // New users are registered as employees. Admin and security accounts are created separately.
    const user = new User({
      name,email,password: hashedPassword, role: "employee"
    });

    await user.save();
    return res.status(201).json({
      success: true,
      msg: "User registered successfully."
    });

  } catch (err) {
    console.log("Registration Error:", err);

    return res.status(500).json({
      success: false,
      msg: "Something went wrong."
    });
  }
};

//Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Both email and password are needed to authenticate the user
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        msg: "Please enter email and password."
      });
    }

    // Find the user using the email entered during login
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User does not exist."
      });
    }

    // Compare the entered password with the hashed password stored in the database
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        msg: "Invalid password."
      });
    }

    // Create a JWT containing the user's id and role. The role is used later for checking access to protected routes.
    const authToken = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {  expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      msg: "Login successful.",
      token: authToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.log("Login Error:", err);

    return res.status(500).json({
      success: false,
      msg: "Unable to login."
    });
  }
};

//Get host function
export const getHosts = async (req, res) => {
  try {

    // Only employees are shown as hosts for appointments
    const employeeList = await User.find(
      { role: "employee" },
      "name email"
    );

    return res.status(200).json(employeeList);

  } catch (err) {
    console.log("Get Hosts Error:", err);

    return res.status(500).json({
      success: false,
      msg: "Unable to fetch employees."
    });
  }
};