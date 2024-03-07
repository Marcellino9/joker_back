const { Router } = require("express");
const router = Router();
const actualiteControler = require("./actualite.controler");
const asyncHandler = require("express-async-handler");
const multer = require("multer");

const imageUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});
router
  .get("/:filename", asyncHandler(actualiteControler.getImage))
  .get("/", asyncHandler(actualiteControler.getAcu))
  .post(
    "/",
    imageUpload.single("image"),
    asyncHandler(actualiteControler.createActu)
  )
  .patch(
    "/",
    imageUpload.single("image"),
    asyncHandler(actualiteControler.updateActu)
  )
  .delete("/", asyncHandler(actualiteControler.deleteActu));
module.exports = router;
