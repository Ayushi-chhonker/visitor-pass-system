import mongoose from "mongoose";

const passSchema = new mongoose.Schema({

  visitorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Visitor",
    required: true
  },

  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true
  },

  // QR code image is stored as a Base64 string
  qrCode: {
    type: String
  },

  // Active means the pass can be used for entry. Used means the pass has already been used.
  status: {
    type: String,
    enum: ["active", "used"],
    default: "active"
  },

  // Stores the time when the pass was used
  usedAt: {
    type: Date,
    default: null
  }

}, { timestamps: true });
export default mongoose.model("Pass", passSchema);