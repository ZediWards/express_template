const logger = (req, res, next) => {
  const methodColors = {
    GET: "\x1b[32m%s\x1b[0m", // green
    POST: "\x1b[34m%s\x1b[0m", // blue
    PUT: "\x1b[33m%s\x1b[0m", // yellow
    DELETE: "\x1b[31m%s\x1b[0m", // red
    OPTIONS: "\x1b[35m%s\x1b[0m", // magenta
  };

  const color = methodColors[req.method] || "\x1b[0m%s\x1b[0m";

  console.log(
    color,
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
};

export default logger;
