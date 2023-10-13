const { Router } = require("express");

const router = Router();

const authors = [
  { author: "Dicky Kitchen Jr", book: "Prey/Pray", id: 1 },
  { author: "Stephen Mills", book: "Vampire", id: 2 },
  { author: "Gregg Hurwitz", book: "Orphan X", id: 3 },
];

router.get("/", (req, res) => {
  // setting up cookies just for practice
  // verifying if user has a cookie
  const hasCookie = req.cookies;
  //if so send no cookie
  if (hasCookie) {
    res.status(200).send(authors);
    console.log("had a cookie")
    //if not send cookie
  } else {
    res.cookie("visited", true);
    res.status(200).send(authors);
    console.log("gave a cookie")
  }
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
