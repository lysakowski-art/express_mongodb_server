module.exports = (req, res) => {
    if (req.session.loggedIn) {
      res.send(req.session.loggedIn);
    } else {
      res.status(400).send(false);
    }
  }