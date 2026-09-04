import Log from "../models/Log.js";
import Pass from "../models/Pass.js";

/* Log Controller
This controller handles:  Visitor Check-In, Visitor Check-Out, Fetching Entry/Exit Logs */

// Check-In Visitor
//it handles the request of checkIn exisiting visitor 
export const checkIn = async (req, res) => {
  try {
    const { visitorId, passId } = req.body;
    const pass = await Pass.findById(passId);

    // Stop if the pass does not exist
    if (!pass) {
      return res.status(404).json({
        success: false,
        msg: "Pass not found."
      });
    }

    // A pass can be used only once for check-in
    if (pass.status === "used") {
      return res.status(400).json({
        msg: "This pass has already been used."
      });
    }

    // Create a new log entry for visitor check-in
    const entryLog = new Log({ visitorId, passId });
    await entryLog.save();

    // After successful check-in, update pass status
    pass.status = "used";
    await pass.save();

//return response to user that visitor checked in successfully
    return res.status(201).json({
      msg: "Visitor checked in successfully.",
      log: entryLog
    });

  } catch (err) {
    // Print error in terminal for debugging later
    console.log("Check-In Error:", err);
    return res.status(500).json({
      msg: "Server Error"
    });
  }};

// Check-Out Visitor
//this function handles the request of checkout by visitor
export const checkOut = async (req, res) => {
  try {
    const {id} = req.params;
    const log = await Log.findById(id);

    // If log is not available
    if (!log) {
      return res.status(404).json({
        success: false,
        msg: "Log record not found."
      });
    }
    // Store current date and time as check-out time
    log.checkOutTime = new Date();
    await log.save();

    return res.status(200).json({
      success: true,
      msg: "Visitor checked out successfully.",
      log
    });

  } catch (err){
    console.log("Check-Out Error:", err);
    return res.status(500).json({
      msg: "Server Error"
    });
  }};

// Get All Logs
//this functions handles the request of get all logs of visitors
export const getLogs = async (req, res) => {
  try {
    const allLogs = await Log.find()
      .populate("visitorId")
      .populate("passId");

    return res.status(200).json(allLogs);

  } catch (err) {
    console.log("Fetch Logs Error:", err);
    return res.status(500).json({
      msg: "Server Error"
    });
  }};