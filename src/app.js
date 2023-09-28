const express = require("express");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth.routes");
const postRoute = require("./routes/post.routes");
const errorHandler = require("./middlewares/errorHandler");
require("express-async-errors");

const app = express();

app.use(express.json());
dotenv.config();

app.use("/auth", authRoute);
app.use("/posts", postRoute);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
