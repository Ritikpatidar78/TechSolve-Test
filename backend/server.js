const express = require('express')
const cors = require("cors");
const { errorHandler } = require('./middleware/erroHandler');
const connectDB = require('./connectDB/connectDB');
require("dotenv").config();
const PORT = process.env.PORT || 4000
const app = express()

//database connect
connectDB()

//corspolicy
app.use(cors())

//create a folder static
app.use(express.static('public'));
app.use("/uploads", express.static('uploads'));

//body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//data api
app.use("/techsolvo/api", require("./Routes/RecordRouter"))

//errorhandler
app.use(errorHandler)

//lister server
app.listen(PORT, () => {
    console.log("Server Started");
})