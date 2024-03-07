const { Router } = require("express");
const actuRoute = Router();
const UserControler = require("./user.controler");
const asyncHandler = require("express-async-handler");
actuRoute
  .get("/", asyncHandler(UserControler.getAllUsers))
  .post("/", asyncHandler(UserControler.createUser))
  .patch("/", asyncHandler(UserControler.updateUser))
  .delete("/", asyncHandler(UserControler.deleteUser));
module.exports = actuRoute;
