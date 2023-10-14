const express = require("express");
const authorsRoutes = require('./routes/authors');
const characterRoutes = require('./routes/comicCharacters');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const authRoute = require('./routes/auth');

const app = express();

const PORT = 3001;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
  secret: "shhhhtellnobody", 
  resave: false,
  saveUninitialized: false
}))

app.use("/api/auth", authRoute);

app.use((req, res, next) =>{
  if(req.session.user) next();
  else res.status(401).send('not logged in')
})

app.use('/api/authors', authorsRoutes);
app.use('/api/characters', characterRoutes)


app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
