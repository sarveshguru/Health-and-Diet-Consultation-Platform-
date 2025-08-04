const Dietician = require("../models/Dietician");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerDietician = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await Dietician.findOne({ email });
  if (exists)
    return res.status(400).json({ message: "Dietician already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const dietician = await Dietician.create({
    name,
    email,
    password: hashedPassword,
  });
  const token = jwt.sign(
    { id: dietician._id, role: "dietician" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.status(201).json({ token, dietician });
};

exports.loginDietician = async (req, res) => {
  const { email, password } = req.body;
  const dietician = await Dietician.findOne({ email });
  if (!dietician)
    return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, dietician.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: dietician._id, role: "dietician" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.status(200).json({ token, dietician });
};

exports.getAllDieticians = async (req, res) => {
  try {
    const dieticians = await Dietician.find();
    res.json(dieticians);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dieticians" });
  }
};

exports.getDieticianProfile = async (req, res) => {
  try {
    const dietician = await Dietician.findById(req.user.id).select("-password");
    if (!dietician) {
      return res.status(404).json({ message: "Dietician not found" });
    }
    res.json(dietician);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dietician profile" });
  }
};
