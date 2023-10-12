const { Router } = require('express');

const router = Router();

const authors = [
  { author: "Dicky Kitchen Jr", book: "Prey/Pray", id: 1 },
  { author: "Stephen Mills", book: "Vampire", id: 2 },
  { author: "Gregg Hurwitz", book: "Orphan X", id: 3 },
];

router.get("/", (req, res) => {
  res.status(200).send(authors);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const authorRequested = authors.find(
    (authorSearched) => authorSearched.id === parseInt(id)
  );
  if (authorRequested) {
    res.status(200).send(authorRequested);
  } else {
    res.status(404).send({ message: "author with matching ID not found" });
  }
});

router.post("/", (req, res) => {
  console.log(req.body);
  authors.push(req.body);
  res.sendStatus(201);
});

module.exports = router;