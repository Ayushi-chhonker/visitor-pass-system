import Visitor from "../models/visitor.js";
import {
  validateEmail,
  validatePhone,
  validateRequired
} from "../utils/validators.js";

// Create a new visitor
export const createVisitor = async (req, res) => {
  try {
    const { name, phone, email, purpose } = req.body;

    // Check required fields
    if (!validateRequired(name, phone, purpose)) {
      return res.status(400).json({
        msg: "Please fill all required fields."
      });
    }

    // Validate email only if provided
    if (email && !validateEmail(email)) {
      return res.status(400).json({
        msg: "Please enter a valid email address."
      });
    }

    // Validate phone number
    if (!validatePhone(phone)) {
      return res.status(400).json({
        msg: "Phone number should contain exactly 10 digits."
      });
    }

    // Get uploaded photo if available
    const uploadedPhoto = req.file ? req.file.filename : null;

    // Create visitor object
    const newVisitor = new Visitor({
      name,
      phone,
      email,
      purpose,
      photo: uploadedPhoto
    });

    await newVisitor.save();

    return res.status(201).json({
      msg: "Visitor added successfully.",
      visitor: newVisitor
    });

  } catch (error) {
    console.error("Create Visitor Error:", error);

    return res.status(500).json({
      msg: "Unable to create visitor."
    });
  }
};

// Get all visitors
export const getVisitors = async (req, res) => {
  try {
    const visitorList = await Visitor.find();

    return res.status(200).json(visitorList);

  } catch (error) {
    console.error("Fetch Visitor Error:", error);

    return res.status(500).json({
      msg: "Unable to fetch visitor records."
    });
  }
};

// Delete visitor
export const deleteVisitor = async (req, res) => {
  try {
    const visitorId = req.params.id;

    const deletedVisitor = await Visitor.findByIdAndDelete(visitorId);

    if (!deletedVisitor) {
      return res.status(404).json({
        msg: "Visitor record not found."
      });
    }

    return res.status(200).json({
      msg: "Visitor deleted successfully."
    });

  } catch (error) {
    console.error("Delete Visitor Error:", error);

    return res.status(500).json({
      msg: "Unable to delete visitor."
    });
  }
};
