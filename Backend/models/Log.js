import mongoose from "mongoose";

const logSchema = new mongoose.Schema({

  visitorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Visitor",
    required: true
  },

  passId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pass",
    required: true
  },

  checkInTime: {
    type: Date,
    default: Date.now
  },

  checkOutTime: {
    type: Date
  }

}, { timestamps: true });

export default mongoose.model("Log", logSchema);