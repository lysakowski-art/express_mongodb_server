const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://127.0.0.1:27017/authDB",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if (!error) {
      console.log("db is connected");
    } else {
      console.log("sth went wrong");
    }
  }
);

const Products = require("./db");
