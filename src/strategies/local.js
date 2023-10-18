const passport = require("passport");
const { Strategy } = require("passport-local");
const Users = require("../database/schemas/Users");
const { comparePassword } = require("../utilities/helpers");

passport.serializeUser((user, done) => {
  console.log(`Serializing user... ${user}`)
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  console.log(`Deserializing user... ${id}`)
  try {
    const user = await Users.findById(id);
    if(!user) throw new Error('User not found');
    done(null, user)
  } catch (error) {
    console.log(error);
    done(error, null);
  }
})

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
          console.log("incorrect password");
          done(null, false);
        }
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);
