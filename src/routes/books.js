const { Router } = require("express");
const Books = require('../database/schemas/Books');

const router = Router();

router.post("/", async (req, res) => {
  const { book, author, genre } = req.body;
  const bookDB = await Books.findOne({book});
  if(bookDB){
    res.status(400).send({message:"Book already exist"});
  } else {
    const newBook = await Books.create({book, author, genre});
    newBook.save();
    res.status(201).send({message:"Book added"})
  }
});

module.exports = router;