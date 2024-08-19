const { Router } = require("express");
const {
  getUser,
  deleteUser,
  getUserEvents,
  deleteUserEvents,
} = require("../controller/Admin");
const { isAdmin } = require("../middleware/verifyToken");

const AdminRouter = Router();

AdminRouter.get("/getuser", isAdmin, getUser);
AdminRouter.delete("/deleteuser/:id", isAdmin, deleteUser);
AdminRouter.get("/getevents", isAdmin, getUserEvents);
AdminRouter.delete("/deleteevents/:id", isAdmin, deleteUserEvents);

module.exports = AdminRouter;
