const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  capacity: { type: Number, required: true },
  price: { type: Number, required: true },
  userId: [{ type: Schema.Types.ObjectId, ref: "authenticateUser" }],
  rating: { type: Number, default: 0 },
});

const eventModel = model("userEvent", eventSchema);

module.exports = eventModel;
