const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const mongoStore = require('connect-mongo');
require("./strategies/local");

//routes
const authorsRoutes = require("./routes/authors");
const characterRoutes = require("./routes/comicCharacters");
const authRoute = require("./routes/auth");
const booksRoute = require("./routes/books");
const MongoStore = require("connect-mongo");

require("./database/index");
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
    store: mongoStore.create({
      mongoUrl: `mongodb+srv://${process.env.MONGO}@cluster0.zb0elao.mongodb.net/`,
    }),
  })
);

app.use((req, res, next) => {
  console.log(`${req.method} at ${req.url}`);
  next();
});

app.use(passport.initialize());
app.use(passport.session());

//have auth route above middleware verifying log in so that it won't be blocked by middleware
app.use("/api/auth", authRoute);

app.use((req, res, next) => {
  console.log("inside auth check middleware");
  console.log(req.user);
  if (req.user) next();
  else res.status(401).send("not logged in");
});

app.use("/api/authors", authorsRoutes);
app.use("/api/books", booksRoute);
app.use("/api/characters", characterRoutes);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
