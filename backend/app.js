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



const AuthRouter = require('./routes/authRouter');


app.use('/auth', AuthRouter);


app.use(express.static(
    path.join(__dirname, "../frontend/dist")
));
app.get("/{*splat}", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../frontend/dist/index.html")
    );
});
module.exports = app;