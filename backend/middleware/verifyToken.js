const jwt = require("jsonwebtoken");
const userModel = require("../model/UserMode");

require("dotenv").config();

// Middleware to check the user is admin or not

const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(404).json({ message: "Invalid token" });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY, {
      expiresIn: "10h",
    });

    const user = await userModel.findById(decode.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(404).json({ message: "You are not authorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

const isUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(404).json({ message: "Invalid token" });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);

    const user = await userModel.findById(decode.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { isAdmin, isUser };
