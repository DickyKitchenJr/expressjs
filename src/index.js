const express = require('express');

const app = express();

const PORT = 3001;

app.use(express.json())

const authors = [{ author: "Dicky Kitchen Jr", book: "Prey/Pray" }];

app.get('/', (req, res) =>{
    res.status(200).send(authors)
})

app.post('/', (req, res) => {
    console.log(req.body)
    authors.push(req.body)
    res.sendStatus(201)
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})