const User = require("../models/user");
const {error500} = require("../errors/error")

const bcryptjs = require("bcryptjs");
const passport = require("passport");
const { Strategy } = require("passport-local");

passport.use(
  new Strategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "ایمیل یا رمز عبور اشتباه است" });
        }
        const isMath = await bcryptjs.compare(password, user.password);
        if (!isMath) {
          return done(null, false, { message: "ایمیل یا رمز عبور اشتباه است" });
        }
        done(null, user);
      } catch (err) {
        //code 
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(async function (id, done) {
  const user = await User.findById(id);
  done(null, user)
});
