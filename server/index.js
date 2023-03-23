const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const http = require("http");
const { log } = require("console");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const port = process.env.PORT || 8000;
const server = http.createServer(app);
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: "true",
    useUnifiedTopology: "true",
  })
  .then(() => {
    console.log("Connected successfully");
    server.listen(port, () => {
      console.log(`Server is running ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
