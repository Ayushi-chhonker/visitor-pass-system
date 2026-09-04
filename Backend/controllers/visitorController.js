import Visitor from "../models/visitor.js";
import { validateEmail, validatePhone, validateRequired} from "../utils/validators.js";

/*
Visitor Controller
This controller is responsible for: Adding a new visitor, Fetching all visitors, Deleting a visitor
*/

// Add a New Visitor
export const createVisitor = async (req, res) => {
  try {
    const { name, phone, email, purpose } = req.body;

    // Name, phone and purpose are compulsory
    if (!validateRequired(name, phone, purpose)) {
      return res.status(400).json({
        msg: "Please fill all required fields."
      });
    }

    // Validate phone number for correct format of phone number
    if (!validatePhone(phone)) {
      return res.status(400).json({
        msg: "Please enter a valid 10-digit phone number."
      });
    }

    // Email is optional, but if entered it must be valid
    if (email && !validateEmail(email)) {
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

    await visitor.save();
    return res.status(201).json({
      msg: "Visitor added successfully.",
      visitor
    });

  } catch (err) {
    // Log the error so it can be debugged later.
    console.log("Error while adding visitor:", err);
    return res.status(500).json({
      msg: "Server Error"
    });
  }};

// Get All Visitors
export const getVisitors = async (req, res) => {
  try {

    // Fetch every visitor stored in database
    const visitors = await Visitor.find();
    return res.status(200).json(visitors);

  } catch (err) {
    console.log("Unable to fetch visitors:", err);
    return res.status(500).json({
      msg: "Server Error"
    });
  }};

//this function handles the request of deleting the exisitng visitor
export const deleteVisitor = async (req, res) => {
  try {
    const { id } = req.params;
    const visitor = await Visitor.findByIdAndDelete(id);

    // if Visitor does not exist
    if (!visitor) {
      return res.status(404).json({
        success: false,
        msg: "Visitor not found."
      });
    }

    return res.status(200).json({
      msg: "Visitor deleted successfully."
    });

  } catch (err) {
    console.log("Delete Visitor Error:", err);
    return res.status(500).json({
      msg: "Server Error"
    });
  }};