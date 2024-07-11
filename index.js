const express = require("express");
const mongoose = require("mongoose");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

//Import Routes
const authRoute = require('./routes/routes');

//Route Middlewares
app.use('/api', authRoute);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.tmon6bh.mongodb.net/node-api?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("connected to the database");
    const port = 3000;
    app.listen(port, function () {
      console.log("Server running on localhost:" + port);
    });
  })
  .catch(() => {
    console.log("not connected to the database");
  });
