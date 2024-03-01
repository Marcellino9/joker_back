require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const corsOption = require("./configs/corsOptions");
const connectDb = require("./configs/dbC");
const mongoos = require("mongoose");
const { logEvents } = require("./middleware/logger");
const PORT = process.env.PORT || 3500;

console.log(process.env.NODE_ENV);

connectDb();

app.use(logger);

app.use(cors(corsOption));

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(errorHandler);

mongoos.connection.once("open", () => {
  console.log("connected to mongodb");
  app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
});

mongoos.connection.once("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}\t${err.code}\t${err.syscall}\t ${err.hostname}`,
    "mongoErrorLog.log"
  );
});
