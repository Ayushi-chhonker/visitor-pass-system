import Appointment from "../models/Appointment.js";
import Visitor from "../models/Visitor.js";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";


// Create Appointment
export const createAppointment = async (req, res) => {
  try {

    const { visitorId, hostId, date } = req.body;

    const appointment = new Appointment({
      visitorId,
      hostId,
      date
    });

    await appointment.save();

const visitor = await Visitor.findById(visitorId);

if (visitor && visitor.email) {

  await sendEmail(
    visitor.email,
    "Appointment Created",
    "Your appointment has been created successfully."
  );
}

    return res.status(201).json(appointment);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


// Get All Appointments
export const getAppointments = async (req, res) => {
  try {

    const appointments = await Appointment.find()
      .populate("visitorId")
      .populate("hostId");

    return res.json(appointments);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


// Approve Appointment
export const approveAppointment = async (req, res) => {
  try {

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ msg: "Appointment not found" });
    }

    appointment.status = "approved";

    await appointment.save();
    const visitor = await Visitor.findById(appointment.visitorId);

if (visitor && visitor.email) {
  await sendEmail(
    visitor.email,
    "Appointment Approved",
    `Hello ${visitor.name},

Your appointment has been approved successfully.

You can now visit the office.

Thank you.`
  );
}

    return res.json({
      msg: "Appointment approved",
      appointment
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};