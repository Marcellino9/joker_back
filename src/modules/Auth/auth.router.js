const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const router = Router();
const authcontroller = require("./auth.controlers");

router
  .post("/login", asyncHandler(authcontroller.login))
  .get("/refresh", asyncHandler(authcontroller.refresh))
  .post("/logout", asyncHandler(authcontroller.logout));
module.exports = router;
