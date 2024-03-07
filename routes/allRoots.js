const express = require("express");
// const useControllers = require("../controllers/userControllers/user");
const router = express.Router();
const userRoute = require("../src/modules/user/user.route");
const actuRoute = require("../src/modules/actualite/actualite.route");
const authRouter = require("../src/modules/Auth/auth.router");
const verifyJwt = require("../middleware/verifyJwt");
// router.use("/auth", authRouter);
// router.use(verifyJwt);
router.use("/user", userRoute);
router.use("/actu", actuRoute);

module.exports = router;
