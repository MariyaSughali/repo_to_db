const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const getInboxRoute = require("./routes/getInbox");
const getpdfRoutes = require("./routes/getpdf");

app.get("/getinbox", getInboxRoute);
app.get("/getpdf/:fileid", getpdfRoutes);

module.exports = app;
