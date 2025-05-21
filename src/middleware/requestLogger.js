const morgan = require("morgan");

// Custom token for response time in milliseconds
morgan.token("response-time-ms", (req, res) => {
  return res.locals.responseTime || 0;
});

// Custom format string
const logFormat =
  ":method :url :status :response-time-ms ms - :res[content-length] :remote-addr";

// Development format with colored status
const developmentFormat = morgan("dev", {
  skip: (req, res) => res.statusCode < 400,
});

// Production format
const productionFormat = morgan(logFormat, {
  skip: (req, res) => res.statusCode < 400,
});

const requestLogger = (req, res, next) => {
  // Start timing the request
  req._startAt = process.hrtime();

  // Store the original end function
  const originalEnd = res.end;

  // Override the end function
  res.end = function (chunk, encoding) {
    // Calculate response time
    const duration = process.hrtime(req._startAt);
    const responseTime = duration[0] * 1e3 + duration[1] * 1e-6;

    // Set the response time in a local variable
    res.locals.responseTime = responseTime.toFixed(2);

    // Call the original end function
    originalEnd.call(this, chunk, encoding);
  };

  // Use appropriate format based on environment
  if (process.env.NODE_ENV === "development") {
    return developmentFormat(req, res, next);
  }
  return productionFormat(req, res, next);
};

module.exports = requestLogger;
