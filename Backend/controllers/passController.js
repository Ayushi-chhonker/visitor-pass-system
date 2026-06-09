import Pass from "../models/Pass.js";
import QRCode from "qrcode";
import PDFDocument from "pdfkit";


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
// Generate PDF Pass
export const generatePassPDF = async (req, res) => {

  try {

    const pass = await Pass.findById(req.params.id);

    if (!pass) {
      return res.status(404).json({
        msg: "Pass not found"
      });
    }

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=VisitorPass.pdf"
    );

    doc.pipe(res);

    doc.fontSize(24).text("Visitor Pass", {
      align: "center"
    });

    doc.moveDown();

    doc.fontSize(16).text(`Pass ID: ${pass._id}`);

    doc.text(`Visitor ID: ${pass.visitorId}`);

    doc.text(`Appointment ID: ${pass.appointmentId}`);

    doc.moveDown();

    doc.text("QR Code Generated Successfully");

    doc.end();

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};