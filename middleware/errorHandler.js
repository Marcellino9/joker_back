const { logEvents } = require("./logger");
const errorHandler = (error, req, res, next) => {
  logEvents(
    `${error.name} : ${error.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errorLog.log"
  );
  const status = res.statusCode ? res.statusCode : 500; //server interne error
  res.status(status);
  res.json({ message: error.message });
  next();
};
module.exports = errorHandler;
