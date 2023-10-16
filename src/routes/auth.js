const { Router } = require("express");
const Users = require('../database/schemas/Users');
const { hashPassword } = require('../utilities/helpers');

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

router.post('/adduser', async (req, res) => {
  const { name } = req.body;
  const userDB = await Users.findOne({name});
  if(userDB){
    res.status(400).send({ message: "User already exist" });
  } else {
    const password = hashPassword(req.body.password);
    console.log(password);
    const newUser = await Users.create({ name, password });
    res.status(201).send({ message: "User added" });
  }
})

module.exports = router;
