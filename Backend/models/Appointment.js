import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
     visitorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Visitor",
    required: true
  },

  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  date: {
    type: "Date",
    required: true
  },

  status: {
    type: "String",
    enum: ["pending","approved","rejected"],
    default: "pending"
  }
},{timestamps: true})

export default mongoose.model("Appointment", appointmentSchema);