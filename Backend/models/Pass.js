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

  qrCode: {
    type: String
  },

  status: {
    type: String,
    enum: ["active", "used"],
    default: "active"
  }

}, { timestamps: true });

export default mongoose.model("Pass", passSchema);