
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const AuthRouter = require("./routes/authRouter");
const permissionRoute = require('./routes/permissionRouter');


app.use("/auth", AuthRouter);
app.use('/permission', permissionRoute);

module.exports = app;






