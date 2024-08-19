const eventModel = require("../model/EventModel");
const userModel = require("../model/UserMode");

const getUser = async (req, res) => {
  try {
    const user = await userModel.find();
    res.status(200).json({ user });
  } catch (error) {
    res
      .status(401)
      .json({ messgae: "Internal Server Error while fetching admin user" });
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const checkAdmin = await userModel.findById(userId);

    if (checkAdmin.role === "admin") {
      res.status(500).json({ message: "Not authorized to delete admin" });
    }

    const user = await userModel.findByIdAndDelete(userId);

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

const getUserEvents = async (req, res) => {
  try {
    const events = await eventModel.find({}).populate("userId");

    res.status(200).json({ events });
  } catch (error) {
    res.status(404).json({ message: "Error while loading user events" });
    console.log(error);
  }
};

const deleteUserEvents = async (req, res) => {
  try {
    const deleteEvents = await eventModel.findByIdAndDelete(req.params.id);
    if (deleteEvents) {
      res.status(200).json({ message: "Event deleted successfully" });
    }
  } catch (error) {
    res.status(404).json({ message: "Error while deleting an event" });
    console.log(error);
  }
};
module.exports = { getUser, deleteUser, getUserEvents, deleteUserEvents };
