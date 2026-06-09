import Visitor from "../models/visitor.js"

// Add Visitor
export const addVisitor = async (req, res) => {
  try {
    const { name, phone, email, purpose } = req.body;

    const visitor = new Visitor({
      name,
      phone,
      email,
      purpose
    });

    await visitor.save();

    return res.status(201).json(visitor);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get All Visitors
export const getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find();
    return res.json(visitors);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// Delete Visitor
export const deleteVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndDelete(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        msg: "Visitor not found"
      });
    }

    res.status(200).json({
      msg: "Visitor deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};