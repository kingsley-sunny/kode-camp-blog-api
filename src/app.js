const express = require("express");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth.routes");
const taskRoute = require("./routes/tasks.routes");
const errorHandler = require("./middlewares/errorHandler");
require("express-async-errors");

const app = express();

app.use(express.json());
dotenv.config();

app.use("/auth", authRoute);
app.use("/tasks", taskRoute);

app.use("/", (req, res) => {
  res.json({ message: "Welcome to the Blog API" });
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
