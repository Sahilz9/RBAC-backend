const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["admin", "organizer", "user"],
    default: "admin",
  },
  password: { type: String, required: true, unique: true },
});

const userModel = model("authenticateUser", userSchema);

module.exports = userModel;
