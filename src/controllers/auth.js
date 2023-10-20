const Users = require('../database/schemas/Users')

const addUserController = async (req, res) => {
  const { name } = req.body;
  const userDB = await Users.findOne({ name });
  if (userDB) {
    res.status(400).send({ message: "User already exist" });
  } else {
    const password = hashPassword(req.body.password);
    console.log(password);
    const newUser = await Users.create({ name, password });
    res.status(201).send({ message: "User added" });
  }
};

module.exports = { addUserController };