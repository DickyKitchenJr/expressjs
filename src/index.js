const express = require("express");
const authorsRoutes = require('./routes/authors');
const characterRoutes = require('./routes/comicCharacters');
const cookieParser = require("cookie-parser");

const app = express();

const PORT = 3001;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/authors', authorsRoutes);

app.use('/api/characters', characterRoutes)

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
