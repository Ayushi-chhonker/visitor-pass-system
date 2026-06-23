import Pass from "../models/Pass.js";
import QRCode from "qrcode";
import PDFDocument from "pdfkit";
import Appointment from "../models/Appointment.js";
import fs from "fs";


// Generate Pass
export const generatePass = async (req, res) => {

  try {

    const { visitorId, appointmentId } = req.body;

    // QR data
    const qrData = `Visitor:${visitorId},Appointment:${appointmentId}`;

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

    const pass = await Pass.findById(req.params.id)
    .populate("visitorId")
    .populate("appointmentId");


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

// Draw outer border for badge
  doc
  .rect(40, 40, 520, 700)
  .stroke();

// visitor pass
   doc .fontSize(26) .text("VISITOR PASS", 0, 60, { align: "center" });
   doc.moveDown();

   doc.fontSize(14);
  doc.text(`Name : ${pass.visitorId.name}`, 70, 130);
  doc.text(
  `Email : ${pass.visitorId.email || "Not Available"}`,
  70,
  160
);
  doc.text(
  `Phone : ${pass.visitorId.phone}`,
  70,
  190
);
  doc.text(
  `Purpose : ${pass.visitorId.purpose}`,
  70,
  220
);
doc.text(
  `Status : ${pass.status}`,
  70,
  250
);
doc.text(
  `Pass ID : ${pass._id}`,
  70,
  280
);
   doc.fontSize(12);
   doc.text("QR Code", 370, 320);
  doc.moveDown(); 
  const qrImage = pass.qrCode.replace(
  /^data:image\/png;base64,/,
  ""
);

const qrBuffer = Buffer.from(qrImage, "base64");
doc.image(qrBuffer, 340, 150, {
  width: 150,
  height: 150
});

doc.fontSize(10);
doc.text(
  "Scan this QR code for verification",
  320,
  480
);
   doc
  .fontSize(10)
  .text(
    "Please carry this pass during your visit.",
    0,
    720,
    {
      align: "center"
    }
  );

    doc.end();

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};
//verify pass
export const verifyPass = async (req, res) => {

try {
const { visitorId, appointmentId } = req.params;

const pass = await Pass.findOne({
  visitorId,
  appointmentId
})
.populate("visitorId")
.populate("appointmentId");

if (!pass) {
  return res.status(404).json({
    msg: "Pass not found"
  });
}

const appointment = await Appointment.findById(
  appointmentId
);

if (!appointment) {
  return res.status(404).json({
    msg: "Appointment not found"
  });
}

// First scan -> Check In
if (!appointment.checkInTime) {

  appointment.checkInTime = new Date();

  await appointment.save();

  return res.status(200).json({
    msg: "Visitor Checked In Successfully",
    appointment
  });
}

// Second scan -> Check Out
if (!appointment.checkOutTime) {

  appointment.checkOutTime = new Date();

  await appointment.save();

  return res.status(200).json({
    msg: "Visitor Checked Out Successfully",
    appointment
  });
}

// Third scan
return res.status(400).json({
  msg: "Visitor already checked out"
});

} catch (error) {
return res.status(500).json({
  error: error.message
});

}

};
