const Database = require("../components/db.js");
const bcrypt = require("bcrypt");

module.exports = (req, res) => {
    const { username, password, email, type } = req.body;
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
  }