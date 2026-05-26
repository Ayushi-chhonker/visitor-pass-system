import Visitor from "../models/visitor.js"

// Add Visitor
export const addVisitor = async (req, res) => {
  try {
    const { name, phone, purpose } = req.body;

    const visitor = new Visitor({
      name,
      phone,
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