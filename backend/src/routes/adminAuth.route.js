const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email }).select("+passwordHash");
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials or not an admin" });
    }

    // Role check
    if (user.role !== "admin") {
      return res.status(401).json({ success: false, message: "Invalid credentials or not an admin" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials or not an admin" });
    }

    const payload = {
      userId: user._id,
      role: "admin",
    };

    const token = jwt.sign(payload, process.env.ADMIN_JWT_SECRET, { expiresIn: "1d" });

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });

  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
