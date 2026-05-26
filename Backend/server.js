import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoutes.js";
import visitorRoutes from "./routes/visitorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import passRoutes from "./routes/passRoutes.js"
import logRoutes from "./routes/logRoutes.js";

dotenv.config();

const app = express();

//middleware
app.use (express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/appointments",appointmentRoutes);
app.use("/api/passes", passRoutes);
app.use("/api/logs",logRoutes);

//test route
app.get("/",(req , res)=> {
    res.send ("API is running...");
});

//connect with mongodb
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Mongodb connected successfully"))
.catch(err => console.log("error"))

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

