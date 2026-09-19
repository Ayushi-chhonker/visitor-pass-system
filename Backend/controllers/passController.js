import Pass from "../models/Pass.js";
import QRCode from "qrcode";
import PDFDocument from "pdfkit";
import Appointment from "../models/Appointment.js";

// Generate a visitor pass
export const generatePass = async (req, res) => {
  try {
    const { visitorId, appointmentId } = req.body;

    // Both IDs are required to generate a pass
    if (!visitorId || !appointmentId) {
      return res.status(400).json({
        success: false,
        msg: "Visitor ID and Appointment ID are required."
      });
    }

    // Store visitor and appointment IDs in the QR code
    const qrContent = `Visitor:${visitorId},Appointment:${appointmentId}`;

    // Convert QR data into a Base64 image
    const qrImage = await QRCode.toDataURL(qrContent);

    // Create and save the visitor pass
    const visitorPass = new Pass({
      visitorId, appointmentId, qrCode: qrImage
    });

    await visitorPass.save();
    return res.status(201).json(visitorPass);

  } catch (error) {
    console.log("Generate Pass Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};


// Get all passes
export const getPasses = async (req, res) => {
  try {
    // Get all passes from the database
    const passes = await Pass.find();
    return res.json(passes);

  } catch (error) {
    console.log("Get Passes Error:", error);
    return res.status(500).json({
      error: error.message
    });
  }
};


// Generate visitor pass PDF
export const generatePassPDF = async (req, res) => {
  try {
    const { id } = req.params;

    // Get pass details with visitor and appointment data
    const visitorPass = await Pass.findById(id)
      .populate("visitorId")
      .populate("appointmentId");

    if (!visitorPass) {
      return res.status(404).json({
        success: false,
        msg: "Visitor pass not found."
      });
    }

    // Create a new PDF
    const pdf = new PDFDocument();

    // Tell the browser to download the PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=VisitorPass.pdf"
    );

    // Send the PDF directly in the response
    pdf.pipe(res);

    // Draw the outer border of the pass
    pdf
      .rect(40, 40, 520, 700)
      .stroke();

    // Heading
    pdf
      .fontSize(26)
      .text("VISITOR PASS", 0, 60, {
        align: "center"
      });

    // Visitor details
    pdf.fontSize(14);

    pdf.text(
      `Name : ${visitorPass.visitorId.name}`,
      70, 130
    );

    pdf.text(
      `Email : ${visitorPass.visitorId.email || "Not Available"}`,
      70, 160
    );

    pdf.text(
      `Phone : ${visitorPass.visitorId.phone}`,
      70, 190
    );

    pdf.text(
      `Purpose : ${visitorPass.visitorId.purpose}`,
      70, 220
    );

    pdf.text(
      `Status : ${visitorPass.status}`,
      70,250
    );

    pdf.text(
      `Pass ID : ${visitorPass._id}`,
      70,280
    );

    // Show QR code heading
    pdf.fontSize(12);
    pdf.text("QR Code", 385, 320);

    // Remove the Base64 prefix from the QR image
    const qrData = visitorPass.qrCode.replace(
      /^data:image\/png;base64,/,
      ""
    );

    // Convert Base64 data into a Buffer
    const qrBuffer = Buffer.from(qrData, "base64");

    // Add QR code to the PDF
    pdf.image(qrBuffer, 340, 150, {
      width: 150, height: 150
    });

    // QR code instruction
    pdf
      .fontSize(10)
      .text(
        "Scan this QR code for verification.",
        320, 480
      );

    // Footer
    pdf
      .fontSize(10)
      .text(
        "Please carry this pass during your visit.",
        0,  720,
        {
          align: "center"
        }
      );

    // Finish the PDF
    pdf.end();

  } catch (err) {
    console.log("Generate PDF Error:", err);
    return res.status(500).json({
      success: false,
      msg: "Server Error"
      
    });
  }
};


// Verify visitor pass
export const verifyPass = async (req, res) => {
  try {
    const { visitorId, appointmentId } = req.params;

    // Find the pass using visitor and appointment IDs
    const visitorPass = await Pass.findOne({
      visitorId, appointmentId
    })
      .populate("visitorId")
      .populate("appointmentId");

    if (!visitorPass) {
      return res.status(404).json({
        success: false,
        msg: "Visitor pass not found."
      });
    }

    // Get appointment details
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        msg: "Appointment not found."
      });
    }

    // First scan checks the visitor in
    if (!appointment.checkInTime) {
      appointment.checkInTime = new Date();
      appointment.status = "checked-in";

      await appointment.save();

      return res.status(200).json({
        msg: "Visitor checked in successfully.",
        success: true,
        appointment
      });
    }

    // Second scan checks the visitor out
    if (!appointment.checkOutTime) {
      appointment.checkOutTime = new Date();
      appointment.status = "checked-out";

      await appointment.save();

      return res.status(200).json({
        msg: "Visitor checked out successfully.",
        success: true,
        appointment
      });
    }

    // Both check-in and check-out are already completed
    return res.status(400).json({
      msg: "Visitor has already checked out."
    });

  } catch (err) {
    console.log("Verify Pass Error:", err);
    return res.status(500).json({
      msg: "Server Error"
    });
  }
};