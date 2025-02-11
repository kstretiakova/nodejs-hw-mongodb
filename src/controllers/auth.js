const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const User = require("../db/models/User.js");
const { registerUser } = require("../services/auth.js");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw createError(400, "All fields are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createError(409, "Email in use");
    }

    const user = await registerUser({ name, email, password });

    res.status(201).json({
      status: "success",
      message: "Successfully registered a user!",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register };
