const Database = require("../components/db.js");
const bcrypt = require("bcrypt");

module.exports = (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    Database.User.findOne({ username }, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        if (bcrypt.compareSync(password, docs.password)) {
          req.session.loggedIn = {
            loggedIn: true,
            username,
            typeOfUser: docs.type,
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
};
