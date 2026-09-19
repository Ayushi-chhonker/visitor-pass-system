import Log from "../models/Log.js";
import Pass from "../models/Pass.js";


// Check-In Visitor
export const checkIn = async (req, res) => {
  try {
    const { visitorId, passId } = req.body;

    // Find the pass used for check-in
    const pass = await Pass.findById(passId);

    // Stop if the pass does not exist
    if (!pass) {
      return res.status(404).json({
        success: false,
        msg: "Pass not found."
      });
    }

    // Make sure the pass belongs to the same visitor
    if (pass.visitorId.toString() !== visitorId) {
      return res.status(400).json({
        msg: "Visitor does not match the pass."
      });
    }

    // A pass that has already been used cannot be used again
    if (pass.status === "used") {
      return res.status(400).json({
        msg: "This pass has already been used."
      });
    }

    // Create a log entry for the visitor's entry
    const entryLog = new Log({
      visitorId, passId
    });

    await entryLog.save();

    // Mark the pass as used after successful check-in
    pass.status = "used";
    await pass.save();

    return res.status(201).json({
      msg: "Visitor checked in successfully.",
      success: true,
      log: entryLog
    });

  } catch (err) {
    console.log("Check-In Error:", err);
    return res.status(500).json({
      msg: "Server Error"
    });
  }
};


// Check-Out Visitor
export const checkOut = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the log created during check-in
    const log = await Log.findById(id);

    if (!log) {
      return res.status(404).json({
        success: false,
        msg: "Log record not found."
      });
    }

    // Prevent checkout if the visitor has already checked out
    if (log.checkOutTime) {
      return res.status(400).json({
        msg: "Visitor has already checked out."
      });
    }

    // Store the current date and time as the checkout time
    log.checkOutTime = new Date();
    await log.save();

    return res.status(200).json({
      success: true,
      msg: "Visitor checked out successfully.",
      log
    });

  } catch (err) {
    console.log("Check-Out Error:", err);
    return res.status(500).json({
      msg: "Server Error"
    });
  }
};


// Get All Logs
export const getLogs = async (req, res) => {
  try {
    // Get logs along with visitor and pass details
    const allLogs = await Log.find()
      .populate("visitorId")
      .populate("passId");

    return res.status(200).json(allLogs);

  } catch (err) {
    console.log("Fetch Logs Error:", err);
    return res.status(500).json({
      msg: "Server Error"
    });
  }
};