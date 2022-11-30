const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const mongoose = require("mongoose");
const fs = require("fs/promises");
require("dotenv").config(); //Library for .env file (security your password, key...)
const authRouter = require("./routes/api/auth");
/* const contactsRouter = require("./routes/api/contacts");
 */
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
/* app.use("/api/contacts", upload.single("avatar"), contactsRouter); */

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
