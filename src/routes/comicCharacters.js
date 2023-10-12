const { Router } = require("express");

const router = Router();

const characters = [
  { name: "Wolverine", team: "X-Men", id: 1 },
  { name: "Thing", team: "Fantastic Four", id: 2 },
  { name: "Deadpool", team: "unaffiliated", id: 3 },
];

router.get("/", (req, res) => {
  res.status(200).send(characters);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const characterRequested = characters.find(
    (characterSearched) => characterSearched.id === parseInt(id)
  );
  if (characterRequested) {
    res.status(200).send(characterRequested);
  } else {
    res.status(404).send({ message: "character with matching ID not found" });
  }
});

router.post("/", (req, res) => {
  console.log(req.body);
  characters.push(req.body);
  res.sendStatus(201);
});

module.exports = router;