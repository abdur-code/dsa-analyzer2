export const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // logs the full error stack in the backend console

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    // only include stack trace in development
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  });
};
