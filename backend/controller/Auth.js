const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/UserMode");

require("dotenv").config();

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const checkEmail = await userModel.findOne({ email });

    if (checkEmail) {
      return res.status(409).json({ message: "User ALready Registered" });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new userModel({ username, email, password: hashPassword });

    await newUser.save();

    res.status(200).json({ message: "User registered successfully", newUser });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ message: "Internal server while registering the user" });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkUser = await userModel.findOne({ email });

    if (!checkUser) {
      return res
        .status(401)
        .json({ message: "User not found, Please register the user" });
    }

    const validPassword = await bcrypt.compare(password, checkUser.password);
    if (!validPassword) {
      return res.status(404).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: checkUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    res.status(200).json({ message: "Login successful", checkUser, token });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Internal Server error while login" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    res.status(401).json({ message: "Server error while logout" });
    console.log(error);
  }
};

const checkUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "Internal error while checking the user" });
  }
};

module.exports = { register, login, logout, checkUser };
