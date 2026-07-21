import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a New User
export const registerUser = async (req, res) => {
  try {
    // Get user details from the request body
    const { name, email, password, role } = req.body;

    // Check if any required field is missing
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        msg: "All fields are required."
      });
    }

    // Check whether this email is already registered or not
    const userFound = await User.findOne({ email });

    //if email registered found then give msg that email already registered
    if (userFound){
      return res.status(400).json({
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
      msg: "User registered successfully."
    });

  } catch (err) {
    //logs the error for debugging
    console.log("Error while registering user:", err);

//screen pr message return kro as a response that something went wrong
    return res.status(500).json({
      msg: "Something went wrong." });
  }
};

// Login User
//login function define here as well as export use for export this function to main file
export const loginUser = async (req, res) => {
  try {
    //login credentials read k liye
    const { email, password } = req.body;

    // Check if user has entered both fields
    if (!email || !password) {
      // if not any single field is present then return alert that please enter email and password
      return res.status(400).json({
        msg: "Please enter email and password."
      });
    }

    // Find user using email
    const user = await User.findOne({ email });

    // If email is not found
    if (!user) {
      return res.status(404).json({
        msg: "User does not exist."});
    }

    // bcrypt function Compare entered password with encrypted password so we define passwordMatched function here
    const passwordMatched = await bcrypt.compare(
      password,
      user.password);

    // If Password is incorrect
    if (!passwordMatched) {
      //return reponse msg on screen that invalid password
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
      //message comes on screen as response tat login successfull
      msg: "Login successful.",
      token: authToken,
      user: {
        //after login successfull user ki sari details show hongi like uski userId, name,email and password
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
//error find krne k liye or fir us error ko logs m show krne k liye below code
  }catch (err) {
    console.log("Login Error:", err);
//also send alert on screen in message form that unable to login
    res.status(500).json({
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
//json form m employee list response dena
    res.status(200).json(employeeList);
//for error finding
  } catch (err) {
//if any error takes place while employee list findinf then put that error in logs so that we can see where is problem inside code
    console.log(err);
// and logs m error print krne k saath saath screen pr msg show krne kro "unable to fetch employee"
    res.status(500).json({
      msg: "Unable to fetch employees."
    });
  }};