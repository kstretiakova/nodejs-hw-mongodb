const bcrypt = require("bcryptjs");
const User = require("../db/models/User.js");

const registerUser = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();
  return user;
};

module.exports = { registerUser };
