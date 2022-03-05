const express = require("express");
const res = require("express/lib/response");
const bodyParser = require("body-parser");
const cors = require("cors");
const marketCoin = require("./utils/marketCoin");

const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

//Middlewares
//TODO add auth
//app.use(auth);
app.use(bodyParser.json());
app.use(cors());

//Import Routes
const postsRoute = require("./routes/posts");
const coinsRoute = require("./routes/coins");

app.use("/posts", postsRoute);
app.use("/coins", coinsRoute);

// app.use("/posts", () => {
//   console.log("THis is a middleware running");
// });

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log("Connected to DB!")
);

//How to we start listening to the server:
app.listen(3000);
