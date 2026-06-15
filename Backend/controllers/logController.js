import Log from "../models/Log.js";
import Pass from "../models/Pass.js";


// check-in
export const checkIn = async (req, res) => {

  try {

    const { visitorId, passId } = req.body;

    // Find pass
    const pass = await Pass.findById(passId);

    if (!pass) {
      return res.status(404).json({
        msg: "Pass not found"
      });
    }

    // Check if already used
    if (pass.status === "used") {
      return res.status(400).json({
        msg: "Pass already used"
      });
    }

    // Create log
    const log = new Log({
      visitorId,
      passId
    });

    await log.save();

    // Mark pass used
    pass.status = "used";

    await pass.save();

    return res.status(201).json({
      msg: "Check-in successful",
      log
    });

  } catch (error) {

    return res.status(500).json({
      error: error.message
    });

  }
};



// CHECK-OUT
export const checkOut = async (req, res) => {

  try {

    const log = await Log.findById(req.params.id);

    if (!log) {
      return res.status(404).json({
        msg: "Log not found"
      });
    }

    log.checkOutTime = new Date();

    await log.save();

    return res.json({
      msg: "Check-out successful",
      log
    });

  } catch (error) {

    return res.status(500).json({
      error: error.message
    });

  }
};

export const getLogs = async (req, res) => {
  try {
    const logs = await Log.find()
      .populate("visitorId")
      .populate("passId");

    res.json(logs);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};