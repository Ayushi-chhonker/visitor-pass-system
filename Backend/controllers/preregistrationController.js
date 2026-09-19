import PreRegistration from "../models/PreRegistration.js";
import Visitor from "../models/Visitor.js";
import Appointment from "../models/Appointment.js";


// Create a pre-registration request
export const createPreRegistration = async (req, res) => {
  try {
    const {  name,  email,  phone,purpose,visitDate,hostId} = req.body;

    // These fields are required
    if (!name || !phone || !purpose || !visitDate || !hostId) {
      return res.status(400).json({
        success: false,
        msg: "Please fill all required fields."
      });
    }

    // Create the pre-registration request
    const registration = new PreRegistration({
      name,email,phone,purpose,visitDate,hostId
    });

    await registration.save();

    return res.status(201).json({
      msg: "Pre-registration submitted successfully.",
      success:true,
      preRegistration: registration
    });

  } catch (err) {
    console.log("Create Pre-Registration Error:", err);
    return res.status(500).json({
      msg: "Server Error"
    });
  }
};


// Get all pre-registration requests
export const getPreRegistrations = async (req, res) => {
  try {
    // Get all pre-registration requests
    const registrations = await PreRegistration.find();
    return res.status(200).json(registrations);

  } catch (err) {
    console.log("Fetch Pre-Registrations Error:", err);
    return res.status(500).json({
      success: false,
      msg: "Server Error"
    });
  }
};


// Approve a pre-registration request
export const approvePreRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the pre-registration request
    const registration = await PreRegistration.findById(id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        msg: "Pre-registration request not found."
      });
    }

    // Change the request status to approved
    registration.status = "approved";
    await registration.save();

    // Check if this visitor already exists
    let visitor = await Visitor.findOne({
      phone: registration.phone
    });

    // Create a visitor if one does not already exist
    if (!visitor) {
      visitor = new Visitor({
        name: registration.name,
        email: registration.email,
        phone: registration.phone,
        purpose: registration.purpose
      });

      await visitor.save();
    }

    // Create an appointment for the visitor
    const appointment = new Appointment({
      visitorId: visitor._id,
      hostId: registration.hostId,
      date: registration.visitDate,
      status: "pending"
    });

    await appointment.save();

    return res.status(200).json({
      msg: "Pre-registration approved successfully.",
      visitor,
      appointment
    });

  } catch (err) {
    console.log("Approve Pre-Registration Error:", err);
    return res.status(500).json({
      msg: "Server Error"
    });
  }
};


// Reject a pre-registration request
export const rejectPreRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the pre-registration request
    const registration = await PreRegistration.findById(id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        msg: "Pre-registration request not found."
      });
    }

    // Change the request status to rejected
    registration.status = "rejected";
    await registration.save();

    return res.status(200).json({
      msg: "Pre-registration rejected successfully.",
      preRegistration: registration
    });

  } catch (err) {
    console.log("Reject Pre-Registration Error:", err);
    return res.status(500).json({
      msg: "Server Error"
    });
  }
};