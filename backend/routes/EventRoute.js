const { Router } = require("express");
const userModel = require("../model/UserMode");
const eventModel = require("../model/EventModel");

const eventRoute = Router();

eventRoute.get("/", async (req, res) => {
  try {
    const users = req.user;
    const user = await userModel.findOne(req.user);

    if (user.role === "admin") {
      const event = await eventModel.find({}).populate("userId");
      return res.status(200).json(event);
    } else {
      const events = await eventModel
        .find({ userId: user._id })
        .populate("userId");
      return res.status(200).json(events);
    }
  } catch (error) {
    console.log(error);
  }
});

eventRoute.post("/", async (req, res) => {
  try {
    const { name, description, date, capacity, price, rating } = req.body;

    const userInfo = await userModel.findOne(req.user);
    const eventinfo = await eventModel.create({
      name,
      description,
      date,
      capacity,
      price,
      rating,
      userId: userInfo._id,
    });

    res.json({ message: "Event Created" });
  } catch (error) {
    res.status(404).json({ message: "Error while creating event" });
    console.log(error);
  }
});

eventRoute.patch("/:id", async (req, res) => {
  try {
    const { name, description, date, capacity, price, rating } = req.body;

    const updateEvent = await eventModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    res.status(200).json({ message: "Event Updated" });
  } catch (error) {
    res.status(404).json({ message: "Error while updating the event" });
    console.log(error);
  }
});

eventRoute.delete("/:id", async (req, res) => {
  try {
    const deleteEvent = await eventModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event deleted" });
  } catch (error) {
    res.status(404).json({ message: "Error while deleting an event" });
    console.log(error);
  }
});

module.exports = eventRoute;
