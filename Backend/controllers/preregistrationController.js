import PreRegistration from "../models/PreRegistration.js";
import Visitor from "../models/Visitor.js";
import Appointment from "../models/Appointment.js";


// Create Pre-registration
export const createPreRegistration = async (req, res) => {

  try {

    const {
      name,
      email,
      phone,
      purpose,
      visitDate,
      hostId
    } = req.body;

    if (!name || !phone || !purpose || !visitDate || !hostId ) {
      return res.status(400).json({
        msg: "Please fill all required fields"
      });

    }

    const preRegistration = new PreRegistration({
      name,
      email,
      phone,
      purpose,
      visitDate,
      hostId
    });
    await preRegistration.save();
    return res.status(201).json({
      msg: "Pre-registration submitted successfully",
      preRegistration
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};


// Get All Pre-registrations
export const getPreRegistrations = async (req, res) => {

  try {
    const data = await PreRegistration.find();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};


// Approve Pre-registration
export const approvePreRegistration = async (req, res) => {

  try {

    const preRegistration = await PreRegistration.findById(req.params.id);

    if (!preRegistration) {

      return res.status(404).json({
        msg: "Pre-registration not found"
      });

    }

    // Update status
    preRegistration.status = "approved";

    await preRegistration.save();

    // Check if visitor already exists
    let visitor = await Visitor.findOne({

      phone: preRegistration.phone

    });

    // Create visitor if not found
    if (!visitor) {

      visitor = new Visitor({

        name: preRegistration.name,
        email: preRegistration.email,
        phone: preRegistration.phone,
        purpose: preRegistration.purpose

      });

      await visitor.save();

    }

    // Create appointment
    const appointment = new Appointment({

      visitorId: visitor._id,
      hostId: preRegistration.hostId,
      date: preRegistration.visitDate,
      status: "pending"
    });
    await appointment.save();
    return res.json({
      msg: "Pre-registration approved successfully",
      visitor,
      appointment
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};
// Reject Pre-registration
export const rejectPreRegistration = async (req, res) => {
  try {
    const preRegistration = await PreRegistration.findById(req.params.id);
    if (!preRegistration) {
      return res.status(404).json({
        msg: "Pre-registration not found"
      });
    }

    preRegistration.status = "rejected";
    await preRegistration.save();
    return res.json({
      msg: "Pre-registration rejected",
      preRegistration
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};