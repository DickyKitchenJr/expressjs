const { Router } = require("express");

const router = Router();

const characters = [
  { name: "Wolverine", team: "X-Men", id: 1 },
  { name: "Thing", team: "Fantastic Four", id: 2 },
  { name: "Deadpool", team: "unaffiliated", id: 3 },
  { name: "Dad Man", team: "unaffiliated", id: 4 },
  { name: "Spider-Man", team: "unaffiliated", id: 5 },
  { name: "Jubilee", team: "X-Men", id: 6 },
];

router.get("/", (req, res) => {
  const { team } = req.query;
  const teamExist = characters.find((exist) => exist.team === team);
  if(team && teamExist){
    const filteredCharacters = characters.filter((group) => group.team === team);
    res.status(200).send(filteredCharacters);
  }else{
    res.status(200).send(characters);
  }
});

router.get("/buildteam", (req, res) => {
  const { buildteam } = req.session;
  if (!buildteam) {
    res.status(200).send("You have not built a team");
  } else {
    res.status(200).send(buildteam);
  }
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

router.post("/buildteam/addmember", (req, res) =>{
  const { name } = req.body;
  const newMember = { name };
  const { buildteam } = req.session;
  if(buildteam){
    req.session.buildteam.members.push(newMember);
  } else {
    req.session.buildteam = {
      members: [newMember]
    }
  };
  res.sendStatus(201);
})

module.exports = router;
