import Visitor from "../models/visitor.js";
import {
  validateEmail,
  validatePhone,
  validateRequired
} from "../utils/validators.js";

/*
Visitor Controller
This controller is responsible for:
 Adding a new visitor, Fetching all visitors, Deleting a visitor
*/

// Add a New Visitor
//It Handles the request to register a new visitor
export const createVisitor = async (req, res) => {
  try {
    // Read visitor details received from frontend
    const { name, phone, email, purpose } = req.body;

    // Name, phone and purpose are compulsory
    if (!validateRequired(name, phone, purpose)) {
      //if all details is not fill b visitor then throw msg "fill all required details"
      return res.status(400).json({
        msg: "Please fill all required fields."
      });
    }

    // Validate phone number for correct format of phone number
    if (!validatePhone(phone)) {
      //if there is some mistake in format of phone number like digit is not 10 or anything else then throw this msg on screen
      return res.status(400).json({
        msg: "Please enter a valid 10-digit phone number."
      });
    }

    // Email is optional, but if entered it must be valid
    if (email && !validateEmail(email)) {
      //if entered email is not correct then throw msg on screen that "invalid email"
      return res.status(400).json({
        msg: "Invalid email address."
      });
    }

    // If the user uploads a photo, store only its filename.
   // Otherwise, the photo field will remain null.
    let photoName = null;
    if (req.file) {
      photoName = req.file.filename;
    }

    // Create visitor document for adding new visitor details like name,phone number,email , purpose and photo
    const visitor = new Visitor({
      name,phone,email,purpose,photo: photoName
    });

    // Save visitor details into database
    await visitor.save();
//after saving data in mongodb give alert on screen that visitor addded successfully
    return res.status(201).json({
      msg: "Visitor added successfully.",
      visitor
    });

  } catch (err) {
    // Log the error so it can be debugged later.
    console.log("Error while adding visitor:", err);
//screen pr msg response return kro that "server error"
    return res.status(500).json({
      msg: "Server Error"
    });
  }};

// Get All Visitors
// this function handles the request of get visitor
export const getVisitors = async (req, res) => {
  try {

    // Fetch every visitor stored in database
    const visitors = await Visitor.find();
// return as a response visitors in json form
    return res.status(200).json(visitors);

  } catch (err) {
// Log the error so it can be debugged later
    console.log("Unable to fetch visitors:", err);
// screen pr response return kro that "server error"
    return res.status(500).json({
      msg: "Server Error"
    });
  }};

// Delete Visitor
//this function handles the request of deleting the exisitng visitor
export const deleteVisitor = async (req, res) => {
  try {
    // Get visitor id from URL
    const { id } = req.params;

    // Delete visitor using MongoDB id and findByTdAndDelete(id) means visitor ko uski id se find kro and then delete kro
    const visitor = await Visitor.findByIdAndDelete(id);

    // if Visitor does not exist then response return krne k liye ki visitor not found on screen
    if (!visitor) {
      return res.status(404).json({
        msg: "Visitor not found."
      });
    }
// if visitor find successfully by its id then nd delete successfully then throw msg on screen that visitor deleted successfully
    return res.status(200).json({
      msg: "Visitor deleted successfully."
    });

  } catch (err) {
// Log the error so it can be debugged later
    console.log("Delete Visitor Error:", err);
    return res.status(500).json({
      msg: "Server Error"
    });
  }};