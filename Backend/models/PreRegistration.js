import mongoose from "mongoose";

const preRegistrationSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String
  },

  phone: {
    type: String,
    required: true
  },

  purpose: {
    type: String,
    required: true
  },

  visitDate: {
    type: Date,
    required: true
  },

  hostId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
},

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }

}, { timestamps: true });

export default mongoose.model(
  "PreRegistration",
  preRegistrationSchema
);