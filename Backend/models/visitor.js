import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    phone: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    required: true
  },
  photo: {
    type: String // (we’ll store URL later)
  }
},{ timestamps: true });

export default mongoose.model("Visitor", visitorSchema);