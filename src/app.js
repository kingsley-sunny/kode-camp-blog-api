const express = require("express");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth.routes");
const postRoute = require("./routes/post.routes");
const errorHandler = require("./middlewares/errorHandler");
const CustomErrorApi = require("./helpers/customErrorApi");
const { StatusCodes } = require("http-status-codes");
require("express-async-errors");

const app = express();

app.use(express.json());
dotenv.config();

app.use("/auth", authRoute);
app.use("/posts", postRoute);

app.use((req, res, next) => {
  return next(new CustomErrorApi(`Route Not Found: ${req.originalUrl}`, StatusCodes.NOT_FOUND));
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = { app };
