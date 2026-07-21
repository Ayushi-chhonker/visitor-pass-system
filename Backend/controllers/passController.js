import Pass from "../models/Pass.js";
import QRCode from "qrcode";
import PDFDocument from "pdfkit";
import Appointment from "../models/Appointment.js";

/*
Pass Controller
This controller is responsible for:
 Generating visitor passes, Creating QR codes, Downloading visitor pass as PDF, Verifying QR code at entry/exit
*/

// Generate Pass handle request of generating new pass
export const generatePass = async (req, res) => {
  try {
    // Get required details from frontend
    const { visitorId, appointmentId } = req.body;

     // Both IDs are required to generate a pass
    if (!visitorId || !appointmentId) {
    return res.status(400).json({ msg: "Visitor ID and Appointment ID are required." });
}

    // Combine visitor ID and appointment ID.
   // This information will be stored inside the QR code.
    const qrContent = `Visitor:${visitorId},Appointment:${appointmentId}`;

  // Convert the QR data into a Base64 image.
    const qrImage = await QRCode.toDataURL(qrData);

    // Create a new visitor pass and save it in MongoDB.
    const visitorPass = new Pass({
      visitorId,
      appointmentId,
      qrCode: qrCodeImage
    });
    await pass.save();
// return on screen qr pass
    return res.status(201).json(pass);

  } catch (error) {
    // Print actual error in terminal for debugging
    console.log("Generate Pass Error:", err)
    return res.status(500).json({
      error: error.message
    });
  }};


// this function handles request of get all passes
export const getPasses = async (req, res) => {
  try {
     // Fetch every generated pass from database
    const passes = await Pass.find();
    return res.json(passes);

  } catch (error) {
//if something went wrong then put that error on the screen
    return res.status(500).json({
      error: error.message
    });

  }
};
// Generate Visitor-pass pdf
export const generatePassPDF = async (req, res) => {
  try {

    // Get pass Id from the URL
    const { id } = req.params;

    // Fetch pass details along with visitor and appointment information
    const visitorPass = await Pass.findById(id)
      .populate("visitorId")
      .populate("appointmentId");

    // Stop if pass is not found
    if (!visitorPass) {
      return res.status(404).json({
        msg: "Visitor pass not found."
      });
    }

    // Create a new PDF document
    const pdf = new PDFDocument();

    // Set response headers so the browser downloads the PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition","attachment; filename=VisitorPass.pdf"
    );

    // Send PDF directly in the response
    pdf.pipe(res);

    // Draw Outer Border
    // Create a border so that the pass looks like an ID card
    pdf
      .rect(40, 40, 520, 700)
      .stroke();

    // Heading
    pdf
      .fontSize(26)
      .text("VISITOR PASS", 0, 60, {
        align: "center"
      });

    // Visitor Details
    pdf.fontSize(14);
    pdf.text(
      `Name : ${visitorPass.visitorId.name}`,
      70,130
    );

    pdf.text(
      `Email : ${visitorPass.visitorId.email || "Not Available"}`,
      70,160
    );

    pdf.text(
      `Phone : ${visitorPass.visitorId.phone}`,
      70,190
    );

    pdf.text(
      `Purpose : ${visitorPass.visitorId.purpose}`,
      70,220
    );

    pdf.text(
      `Status : ${visitorPass.status}`,
      70,250
    );

    pdf.text(
      `Pass ID : ${visitorPass._id}`,
      70, 280
    );

    // QR Code
    pdf.fontSize(12);
    pdf.text("QR Code", 385, 320);

    // QR code is stored in Base64 format.
    // Remove the extra prefix before converting it into an image.
    const qrData = visitorPass.qrCode.replace(
      /^data:image\/png;base64,/,
      ""
    );

    // Convert Base64 data into Buffer
    const qrBuffer = Buffer.from(
      qrData, "base64"
    );

    // Place QR image inside the PDF
    pdf.image(qrBuffer, 340, 150, {
      width: 150, height: 150
    });

    // Instruction below QR
    pdf
      .fontSize(10)
      .text(
        "Scan this QR code for verification.",
        320,480
      );

    // Footer
    pdf
      .fontSize(10)
      .text(
        "Please carry this pass during your visit.",
        0,720,
        {align: "center"}
      );

    // Finish PDF generation
    pdf.end();
  } catch (err) {
// show the error in logs for debugging later
    console.log("Generate PDF Error:", err);
    return res.status(500).json({
      msg: "Server Error"
    });
  }
};

// Verify Visitor Pass
export const verifyPass = async (req, res) => {
  try {

    // Get visitor ID and appointment ID from URL
    const { visitorId, appointmentId } = req.params;

    // Find the visitor pass using visitor ID and appointment ID
    const visitorPass = await Pass.findOne({
      visitorId,appointmentId
    })
      .populate("visitorId")
      .populate("appointmentId");

    // If Pass not found
    if (!visitorPass) {
      return res.status(404).json({
        msg: "Visitor pass not found."
      });
    }

    // Get appointment details
    const appointment = await Appointment.findById(appointmentId);

    // Check whether appointment exists
    if (!appointment) {
      //If not exist then return response this
      return res.status(404).json({
        msg: "Appointment not found."
      });
    }

    /*
      QR Verification Flow
      First Scan  = Check-In
      Second Scan = Check-Out
      Third Scan  = Already Checked Out
    */

    // Visitor enters the office for the first time
    if (!appointment.checkInTime) {
      appointment.checkInTime = new Date();
// save checkin time in mongodb
      await appointment.save();
//return response as successfully checked-in
      return res.status(200).json({
        msg: "Visitor checked in successfully.",
        appointment
      });
    }

    // Visitor leaves the office
    if (!appointment.checkOutTime) {
      appointment.checkOutTime = new Date();
// save heck-out time in mongodb database
      await appointment.save();
// return response on screen checkout successfully
      return res.status(200).json({
        msg: "Visitor checked out successfully.",
        appointment
      });
    }

    // QR has already been used for both check-in and check-out
    return res.status(400).json({
      msg: "Visitor has already checked out."
    });

  } catch (err) {
    // Log error for debugging
    console.log("Verify Pass Error:", err);
    return res.status(500).json({
      msg: "Server Error"
    });
  }
};