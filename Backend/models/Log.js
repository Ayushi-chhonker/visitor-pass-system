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

  //time when visitor checked-in
  checkInTime: {
    type: Date,
    default: Date.now
  },

  //this is filled when visitor checks-out
  checkOutTime: {
    type: Date
  }

}, { timestamps: true });
export default mongoose.model("Log", logSchema);