
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const AuthRouter = require("./routes/authRouter");

app.use("/auth", AuthRouter);

module.exports = app;
