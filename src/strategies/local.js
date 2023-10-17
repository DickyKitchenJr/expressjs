const passport = require("passport");
const { Strategy } = require("passport-local");
const Users = require("../database/schemas/Users");
const { comparePassword } = require("../utilities/helpers");

passport.use(
  new Strategy(
    {
      usernameField: "name",
    },
    async (name, password, done) => {
      try {
        console.log(name);
        console.log(password);
        if (!name || !password) {
          return done(null, false);
        }
        const userDB = await Users.findOne({ name });
        if (!userDB) {
          console.log("name does not exist in DB");
          return done(null, false);
        }
        const isValid = comparePassword(password, userDB.password);
        if (isValid) {
          console.log("logged in successfully");
          done(null, userDB);
        } else {
          console.log("incorrect passoword");
          done(null, false);
        }
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);
