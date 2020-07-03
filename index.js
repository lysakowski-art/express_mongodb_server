const connection = require("./components/connection");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Database = require("./components/db");
const session = require("express-session");
const bcrypt = require("bcrypt");
const MongoDBStore = require("connect-mongodb-session")(session);

const {
  PORT = 8000,
  SESS_NAME = "sid" /*session ID */,
  SESS_SECRET = "shhhh",
  NODE_ENV = "development",
  SESS_LIFETIME = 1000 * 60 * 10,
} = process.env; /*to nam daje wartości defaultowe*/

const IN_PROD =
  NODE_ENV === "production"; /* tutaj to się nadpisuje na production */

const app = express();

const store = new MongoDBStore({
  uri: "mongodb://127.0.0.1:27017/authDB",
  collection: "mySessions",
});

app.use(cors({ credentials: true, origin: "http://127.0.0.1:3000" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    name: SESS_NAME,
    proxy: true,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    store,
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: false,
      secure: false,
    },
  })
);

//Authorize!
app.post("/auth", (req, res) => {
  const { login, password } = req.query;
  if (login && password) {
    Database.User.findOne({ username: login }, (err, docs) => {
      if (err) {
        res.send(false);
        console.log(err);
      } else {
        if (bcrypt.compareSync(password, docs.password)) {
          req.session.loggedIn = {
            loggedIn: true,
            username: login,
            typeOfuser: docs.type,
          };
          res.send(true);
        } else {
          res.send(false);
        }
      }
    });
  } else {
    res.send(false);
  }
});

// Register
app.post("/register", (req, res) => {
  const { username, password, email, type } = req.query;
  const saltRounds = 12;
  let hash = bcrypt.hashSync(password, saltRounds);
  console.log(hash);
  if ((username, password, email, type)) {
    Database.User.findOne({ username }, (err, docs) => {
      if (!docs) {
        Database.User.create({
          username,
          password: hash,
          email,
          type,
        }).then((product) => {
          console.log(product);
          res.send(true);
        });
      } else {
        res.send(false);
      }
    });
  } else {
    res.send("exist");
  }
});

//Logout
app.get("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      }
    });
    res.send(true);
  } else {
    res.send(false);
  }
});
// Session Check

// SESSION CHECK

app.get("/temp", (req, res) => {
  if (req.session.loggedIn) {
    res.send(req.session.loggedIn);
    console.log("temp się odpala");
  } else {
    res.status(400).send(false);
  }
});

app.listen(PORT, () => {
  console.log(`server is running at Port: ${PORT}`);
});
