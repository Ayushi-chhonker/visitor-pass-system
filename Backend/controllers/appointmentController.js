import Appointment from "../models/Appointment.js";
import Visitor from "../models/Visitor.js";
import sendEmail from "../utils/sendEmail.js";
import sendSMS from "../utils/sendSMS.js";

// Appointment creation
export const createAppointment = async (req, res) => {
  try {
    const { visitorId, hostId, date } = req.body;

    // Check required fields
    if (!visitorId || !hostId || !date) {
      return res.status(400).json({
        msg: "Please provide all appointment details."
      });
    }

    const newAppointment = new Appointment({
      visitorId,
      hostId,
      date
    });

    await newAppointment.save();

    // Send email notification to visitor
    const visitor = await Visitor.findById(visitorId);

    if (visitor && visitor.email) {
      await sendEmail(
        visitor.email,
        "Appointment Created",
        `Hello ${visitor.name},

Your appointment request has been created successfully.

Date: ${date}

Thank you.`
      );
    }

    return res.status(201).json({
      msg: "Appointment created successfully.",
      appointment: newAppointment
    });

  } catch (error) {
    console.error("Create Appointment Error:", error);

    return res.status(500).json({
      msg: "Unable to create appointment."
    });
  }
};

// Get All Appointments
export const getAppointments = async (req, res) => {
  try {
    const appointmentList = await Appointment.find()
      .populate("visitorId")
      .populate("hostId");

    return res.status(200).json(appointmentList);

  } catch (error) {
    console.error("Fetch Appointment Error:", error);

    return res.status(500).json({
      msg: "Unable to fetch appointments."
    });
  }
};

//Appointment approvement
export const approveAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        msg: "Appointment not found."
      });
    }

    appointment.status = "approved";

    await appointment.save();

    // Send approval email
    const visitor = await Visitor.findById(appointment.visitorId);

    if (visitor) {

  if (visitor.email) {

    await sendEmail(
      visitor.email,
      "Appointment Approved",
      `Hello ${visitor.name},

      Your appointment has been approved successfully.
      You can now visit the office.
      Thank you.`
    );

  }

  await sendSMS(

    visitor.phone,

    `Hello ${visitor.name},

Your appointment has been approved successfully.
Please carry your visitor pass while visiting.`

  );

}
    return res.status(200).json({
      msg: "Appointment approved successfully.",
      appointment
    });

  } catch (error) {
    console.error("Approve Appointment Error:", error);

    return res.status(500).json({
      msg: "Unable to approve appointment."
    });
  }
};
// Check In Visitor
export const checkInVisitor = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        msg: "Appointment not found."
      });
    }

    // Prevent duplicate check-in
    if (appointment.status === "checked-in") {
      return res.status(400).json({
        msg: "Visitor has already checked in."
      });
    }

    appointment.status = "checked-in";
    appointment.checkInTime = new Date();

    await appointment.save();

    return res.status(200).json({
      msg: "Visitor checked in successfully.",
      appointment
    });

  } catch (error) {
    console.error("Check In Error:", error);

    return res.status(500).json({
      msg: "Unable to check in visitor."
    });
  }
};


// Check Out Visitor
export const checkOutVisitor = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        msg: "Appointment not found."
      });
    }

    // Visitor must check in before checking out
    if (appointment.status !== "checked-in") {
      return res.status(400).json({
        msg: "Visitor has not checked in yet."
      });
    }

    appointment.status = "checked-out";
    appointment.checkOutTime = new Date();

    await appointment.save();

    return res.status(200).json({
      msg: "Visitor checked out successfully.",
      appointment
    });

  } catch (error) {
    console.error("Check Out Error:", error);

    return res.status(500).json({
      msg: "Unable to check out visitor."
    });
  }
};
