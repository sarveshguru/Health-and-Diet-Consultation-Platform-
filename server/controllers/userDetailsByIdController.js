<<<<<<< HEAD
const User = require("../models/User");
const UserDetails = require("../models/UserDetails");

// GET /api/user/details/:userId
exports.getUserDetailsById = async (req, res) => {
  try {
    // Get basic user info
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    // Get extended details
    const details = await UserDetails.findOne({
      userId: req.params.userId,
    }).lean();
    // Merge details into user object (details fields override user fields)
    const merged = { ...user.toObject(), ...(details || {}) };
    res.json(merged);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user details" });
  }
};
=======
const User = require("../models/User");
const UserDetails = require("../models/UserDetails");

// GET /api/user/details/:userId
exports.getUserDetailsById = async (req, res) => {
  try {
    // Get basic user info
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    // Get extended details
    const details = await UserDetails.findOne({
      userId: req.params.userId,
    }).lean();
    // Merge details into user object (details fields override user fields)
    const merged = { ...user.toObject(), ...(details || {}) };
    res.json(merged);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user details" });
  }
};
>>>>>>> origin/main
