import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a New User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if any required field is missing
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        msg: "All fields are required."
      });
    }

    // Check whether this email is already registered or not
    const userFound = await User.findOne({ email });

    if (userFound){
      return res.status(400).json({
        success: true,
        msg: "Email is already registered."
      });
    }

    // Encrypt the password before storing it in the database
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const user = new User({name, email, password: encryptedPassword,role });

    // Save the user in MongoDB
    await user.save();
    //return alert on screen that user succesfullly registered
    return res.status(201).json({
      success: true,
      msg: "User registered successfully."
    });

  } catch (err) {
    //logs the error for debugging
    console.log("Error while registering user:", err);
    return res.status(500).json({
      msg: "Something went wrong." });
  }
};

// Login User
//login function define here as well as export use for export this function to main file
export const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body;

    // Check if user has entered both fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        msg: "Please enter email and password."
      });
    }

    // Find user using email
    const user = await User.findOne({email});

    // If email is not found
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User does not exist."
      });
    }

    // bcrypt function Compare entered password with encrypted password so we define passwordMatched function here
    const isPasswordCorrect = await bcrypt.compare(
      password,user.password);

    // If Password is incorrect
    if (!isPasswordCorrect) {
      return res.status(401).json({
        msg: "Invalid password."
      });
    }

    // Create JWT token
    const authToken = jwt.sign(
      {id: user._id,
       role: user.role},
      process.env.JWT_SECRET,
      { expiresIn: "1d"}
    );

    // Return token and user information
    res.status(200).json({
      msg: "Login successful.",
      token: authToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  }catch (err) {
    console.log("Login Error:", err);
    res.status(500).json({
      success: false,
      msg: "Unable to login."
    });
  }};

// Get All Employees
// getHosts function define here
export const getHosts = async (req, res) => {
  try {
    // Fetch all users whose role is employee
    const employeeList = await User.find(
      { role: "employee" },
      "name email"
    );
    res.status(200).json(employeeList);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      msg: "Unable to fetch employees."
    });
  }};