const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    email: String,
    type: String,
  },
  {
    collection: "users",
  }
);

exports.User = mongoose.model("User", UserSchema);
