module.exports = (req, res) => {
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
  }
