const express = require("express");
const authorsRoutes = require("./routes/authors");
const characterRoutes = require("./routes/comicCharacters");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const authRoute = require("./routes/auth");
const booksRoute = require('./routes/books');
require('./database/index');
const app = express();
const PORT = 3001;



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "shhhhtellnobody",
    resave: false,
    saveUninitialized: false,
  })
);

//have auth route above middleware verifying log in so that it won't be blocked by middleware
app.use("/api/auth", authRoute);

//normally would have books route under middleware requiring log in, but didn't feel like logging in everytime just to test
app.use('/api/books', booksRoute);

app.use((req, res, next) => {
  if (req.session.user) next();
  else res.status(401).send("not logged in");
});

app.use("/api/authors", authorsRoutes);
app.use("/api/characters", characterRoutes);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
