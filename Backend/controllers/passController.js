import Pass from "../models/Pass.js";
import QRCode from "qrcode";


// Generate Pass
export const generatePass = async (req, res) => {

  try {

    const { visitorId, appointmentId } = req.body;

    // QR data
    const qrData = `Visitor:${visitorId}, Appointment:${appointmentId}`;

    // Generate QR image
    const qrCodeImage = await QRCode.toDataURL(qrData);

    // Save pass
    const pass = new Pass({
      visitorId,
      appointmentId,
      qrCode: qrCodeImage
    });

    await pass.save();

    return res.status(201).json(pass);

  } catch (error) {

    return res.status(500).json({
      error: error.message
    });

  }
};


// GET ALL PASSES
export const getPasses = async (req, res) => {

  try {

    const passes = await Pass.find();

    return res.json(passes);

  } catch (error) {

    return res.status(500).json({
      error: error.message
    });

  }
};