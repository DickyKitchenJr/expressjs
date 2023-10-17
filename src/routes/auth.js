const { Router } = require("express");
const Users = require('../database/schemas/Users');
const { hashPassword, comparePassword } = require('../utilities/helpers');

const router = Router();

router.post("/login", async (req, res) => {
  const { name, password } = req.body;
  if(!name || !password) return res.status(400).send({ message: "Name and Password required"});
  const userDB = await Users.findOne({name});
  console.log(userDB);
  if(!userDB) return res.send(401);
  const isValid = comparePassword(password, userDB.password);
   if(isValid){
    req.session.user = userDB;
    res.send(200);  
   } else {
    res.send(400)
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
