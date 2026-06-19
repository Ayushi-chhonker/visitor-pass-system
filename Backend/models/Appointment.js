import mongoose from "mongoose";
import Visitor from "../models/Visitor.js";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

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
    type: Date,
    required: true
},

status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
},
checkInTime: {
  type: Date
},

checkOutTime: {
  type: Date
}
},{timestamps: true})

export default mongoose.model("Appointment", appointmentSchema);