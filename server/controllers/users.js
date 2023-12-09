import User from "../models/User.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

export const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, error: "Please provide an email and password" });
  }

  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ success: false, error: "Please provide a valid email" });
  }

  if (!validator.isStrongPassword(password)) {
    return res
      .status(400)
      .json({ success: false, error: "Please provide a strong password" });
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const savedUser = await new User({
      email,
      password: hashedPassword,
    }).save();

    const token = generateToken(savedUser._id);

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, error: "Please provide an email and password" });
  }

  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ success: false, error: "Please provide a valid email" });
  }

  try {
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, userExists.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    }

    const token = generateToken(userExists._id);

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
