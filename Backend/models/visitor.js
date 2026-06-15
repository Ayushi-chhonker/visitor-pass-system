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
  email: {
  type: String
},
  purpose: {
    type: String,
    required: true
  },
  photo: {
    type: String // (we’ll store URL later)
  }
},{ timestamps: true });

const Visitor =
  mongoose.models.Visitor || mongoose.model("Visitor", visitorSchema);

export default Visitor;