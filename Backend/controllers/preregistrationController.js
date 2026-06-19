import PreRegistration from "../models/PreRegistration.js";

// Create Pre-registration
export const createPreRegistration = async (req, res) => {

  try {

    const {
      name,
      email,
      phone,
      purpose,
      visitDate
    } = req.body;

    if (!name || !phone || !purpose || !visitDate) {
      return res.status(400).json({
        msg: "Please fill all required fields"
      });

    }

    const preRegistration = new PreRegistration({
      name,
      email,
      phone,
      purpose,
      visitDate

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

    preRegistration.status = "approved";
    await preRegistration.save();
    return res.json({
      msg: "Pre-registration approved",
      preRegistration
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