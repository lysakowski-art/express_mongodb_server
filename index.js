const connection = require("./components/connection");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");

// routes
const login = require("./routs/login.js");
const logout = require("./routs/logout.js");
const register = require("./routs/register.js");
const temp = require("./routs/temp.js");
const config = require("./config/session.js");

const { PORT_FRONT = "http://127.0.0.1:3000", PORT = 8000 } = process.env;

const app = express();

app.use(cors({ credentials: true, origin: PORT_FRONT }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session(config));

// Authorize
app.post("/auth", login);

// Register
app.post("/register", register);

// Logout
app.get("/logout", logout);

// Session Check
app.get("/temp", temp);

app.listen(PORT, () => {
  console.log(`server is running at Port: ${PORT}`);
});
