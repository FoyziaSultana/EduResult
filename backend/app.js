// require express
const express = require("express");
const cors = require("cors");
// app create
const app = express();

const bodyParser = require('body-parser');

// create path
const path = require("path");

//use json
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());



const AuthRouter = require("./routes/authRouter");
const permissionRoute = require('./routes/permissionRouter');
const getUserAllPermissionRouter = require("./routes/getUserAllPermissionRoute");
const roleRouter = require("./routes/roleRouter");
const rolesAssignToUser = require("./routes/userRoleAssignRouter");

app.use("/auth", AuthRouter);
app.use('/permission', permissionRoute);
app.use('/userPermission', getUserAllPermissionRouter);
app.use('/role', roleRouter);
app.use('/user', rolesAssignToUser);

module.exports = app;