import Log from "../models/Log.js";
import Pass from "../models/Pass.js";

/*
Log Controller
This controller handles:
 Visitor Check-In, Visitor Check-Out, Fetching Entry/Exit Logs
*/

// Check-In Visitor
//it handles the request of checkIn exisiting visitor 
export const checkIn = async (req, res) => {
  try {

    // Get visitor ID and pass ID from frontend
    const { visitorId, passId } = req.body;
    // Find the pass using its ID
    const pass = await Pass.findById(passId);

    // Stop if the pass does not exist
    if (!pass) {
      return res.status(404).json({
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
    // Save log into MongoDB
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
// print response on screen "server error"
    return res.status(500).json({
      msg: "Server Error"
    });
  }};

// Check-Out Visitor
//this function handles the request of checkout by visitor
export const checkOut = async (req, res) => {
  try {
    // Get log ID from URL
    const { id } = req.params;

    // Find the check-in log in storage
    const log = await Log.findById(id);

    // If log is not available
    if (!log) {
      return res.status(404).json({
        msg: "Log record not found."
      });
    }
    // Store current date and time as check-out time
    log.checkOutTime = new Date();

    // Save updated log
    await log.save();
    //if visitor check out successflly
    return res.status(200).json({
      msg: "Visitor checked out successfully.",
      log
    });

  } catch (err) {
//print error in logs for debugging
    console.log("Check-Out Error:", err);
    return res.status(500).json({
      msg: "Server Error"
    });
  }};

// Get All Logs
//this functions handles the request of get all logs of visitors
export const getLogs = async (req, res) => {
  try {

    // Fetch all logs along with visitor and pass details
    const allLogs = await Log.find()
      .populate("visitorId")
      .populate("passId");

    return res.status(200).json(allLogs);

  } catch (err) {
    console.log("Fetch Logs Error:", err);
// return response on screen that "server error"
    return res.status(500).json({
      msg: "Server Error"
    });
  }};