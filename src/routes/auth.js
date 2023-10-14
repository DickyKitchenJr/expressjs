const { Router } = require("express");

const router = Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    if (req.session.user) {
      res.send(req.session.user);
    } else {
      req.session.user = {
        username,
      };
      res.send(req.session);
    }
  } else {
    res.status(401).send("Username and password required");
  }
});

module.exports = router;
