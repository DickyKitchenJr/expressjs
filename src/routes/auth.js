const { Router } = require("express");
const passport = require('passport');
const Users = require('../database/schemas/Users');
const { hashPassword, comparePassword } = require('../utilities/helpers');
const { addUserController } = require("../controllers/auth");

const router = Router();

// router.post("/login", async (req, res) => {
//   const { name, password } = req.body;
//   if(!name || !password) return res.status(400).send({ message: "Name and Password required"});
//   const userDB = await Users.findOne({name});
//   console.log(userDB);
//   if(!userDB) return res.send(401);
//   const isValid = comparePassword(password, userDB.password);
//    if(isValid){
//     req.session.user = userDB;
//     res.send(200);  
//    } else {
//     res.send(400)
//    }
// });

router.post('/login', passport.authenticate('local'), (req, res) =>{
  res.sendStatus(200);
})

router.post('/adduser', addUserController)

module.exports = router;
