import PreRegistration from "../models/PreRegistration.js";
import Visitor from "../models/Visitor.js";
import Appointment from "../models/Appointment.js";

/*
Pre-Registration Controller
This controller is responsible for:

Creating a pre-registration request.
Viewing all pre-registration requests.
Approving a request and creating visitor & appointment.
Rejecting a pre-registration request.
*/


// Create Pre-Registration
export const createPreRegistration = async (req, res) => {
  try {

    // Get visitor details from frontend
    const { name,email,phone,purpose,visitDate,hostId} = req.body;

    // These fields are mandatory for submitting a request
    if (!name || !phone || !purpose || !visitDate || !hostId) {
      return res.status(400).json({
        msg: "Please fill all required fields."
      });
    }

    // Create a new pre-registration request
    const registration = new PreRegistration({name,email,phone,purpose,visitDate,hostId });

    // Save request in MongoDB
    await registration.save();
   //return response that pre=registration submitted
    return res.status(201).json({
      msg: "Pre-registration submitted successfully.",
      preRegistration: registration
    });

  } catch (err) {
// logs the error for debugging
    console.log("Create Pre-Registration Error:", err);
    return res.status(500).json({
      msg: "Server Error"
    });
  }
};

// Get All Pre-Registrations
export const getPreRegistrations = async (req, res) => {
  try {

    // Fetch all submitted pre-registration requests
    const registrations = await PreRegistration.find();
    return res.status(200).json(registrations);

  } catch (err) {
// logs the error for debugging later
    console.log("Fetch Pre-Registrations Error:", err);
    return res.status(500).json({
      msg: "Server Error"
    });
  }
};

// Approve Pre-Registration
export const approvePreRegistration = async (req, res) => {
  try {
    // Get pre-registration ID from URL
    const { id } = req.params;

    // Find the request by id
    const registration = await PreRegistration.findById(id);
   //if registration not found
    if (!registration) {
      return res.status(404).json({
        msg: "Pre-registration request not found."
      });
    }

    // Update request status
    registration.status = "approved";
    await registration.save();

    // Check whether this visitor already exists
    let visitor = await Visitor.findOne({phone: registration.phone});

    // Create visitor only if not already present
    if (!visitor) {

      visitor = new Visitor({
        name: registration.name,email: registration.email,
        phone: registration.phone,purpose: registration.purpose
      });
   // save the visitor in database
      await visitor.save();
    }

    // Create appointment for approved visitor
    const appointment = new Appointment({
      visitorId: visitor._id, hostId: registration.hostId,
      date: registration.visitDate,
      status: "pending"
    });
   // save appointment in mongodb databasse as approved
    await appointment.save();
    return res.status(200).json({
      msg: "Pre-registration approved successfully.",
      visitor,
      appointment
    });

  } catch (err) {
    console.log("Approve Pre-Registration Error:", err);
  // show error on the display
    return res.status(500).json({
      msg: "Server Error"
    });
  }
};

// Reject Pre-Registration
export const rejectPreRegistration = async (req, res) => {
  try {

    // Get pre-registration ID from URL
    const { id } = req.params;
    // Find the request by visitor id
    const registration = await PreRegistration.findById(id);

    //if registration not found then
    if (!registration) {
      return res.status(404).json({
        msg: "Pre-registration request not found."
      });
    }

    // Update request status to rejected
    registration.status = "rejected";
// save the status in mongodb
    await registration.save();

    return res.status(200).json({
      msg: "Pre-registration rejected successfully.",
      preRegistration: registration
    });

  } catch (err) {
// logs the error for debugging
    console.log("Reject Pre-Registration Error:", err);
    return res.status(500).json({
      msg: "Server Error"
    });
  }
};