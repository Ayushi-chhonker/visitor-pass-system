import Visitor from "../models/visitor.js";
import { validateEmail, validatePhone, validateRequired} from "../utils/validators.js";


// Add a new visitor
export const createVisitor = async (req, res) => {
  try {
    const { name, phone, email, purpose } = req.body;

    // Name, phone and purpose are required for creating a visitor.
    if (!validateRequired(name, phone, purpose)) {
      return res.status(400).json({
        success: false,
        msg: "Please fill all required fields."
      });
    }

    // Check that the phone number contains a valid 10-digit number.
    if (!validatePhone(phone)) {
      return res.status(400).json({
        success: false,
        msg: "Please enter a valid 10-digit phone number."
      });
    }

    // Email is optional, so validate it only when the user provides one.
    if (email && !validateEmail(email)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid email address."
      });
    }

    // Store the uploaded photo filename instead of the complete file.
    let photoName = null;
    if (req.file) {
      photoName = req.file.filename;
    }

    // Create the visitor using the validated information.
    const visitor = new Visitor({
      name, phone, email, purpose, photo: photoName
    });

    await visitor.save();
    return res.status(201).json({
      success: true,
      msg: "Visitor added successfully.",
      visitor
    });

  } catch (err) {
    console.log("Error while adding visitor:", err);
    return res.status(500).json({
      msg: "Server Error"
    });
  }
};


// Get all visitors
export const getVisitors = async (req, res) => {
  try {
    // Retrieve all visitor records from MongoDB.
    const visitors = await Visitor.find();
    return res.status(200).json(visitors);

  } catch (err) {
    console.log("Unable to fetch visitors:", err);
    return res.status(500).json({
      msg: "Server Error"
    });
  }
};


// Delete an existing visitor
export const deleteVisitor = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the visitor using the ID and remove the record from MongoDB.
    const visitor = await Visitor.findByIdAndDelete(id);
    if (!visitor) {
      return res.status(404).json({
        success: false,
        msg: "Visitor not found."
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Visitor deleted successfully."
    });

  } catch (err) {
    console.log("Delete Visitor Error:", err);
    return res.status(500).json({
      msg: "Server Error"
    });
  }
};