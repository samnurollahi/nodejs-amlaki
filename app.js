const path = require("path");

const express = require("express");
const dotEnv = require("dotenv");
const layoutEjs = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const rateLimit = require("express-rate-limit");

const { error500, error404 } = require("./errors/error");

//config.env
dotEnv.config({ path: "./config/config.env" });

//robot spam deleter is run
require("./robot/botSpam")

//connect db
require("./config/db");

const app = express();

//config passport
require("./config/passport");

// midd
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//limiter
const limiter = rateLimit({
  windowMs: 20 * 60 * 1000,
  max: 1_000,
  message: "شما خیلی درخواست کرده اید :(",
});
app.use(limiter);

// session
app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  })
);

//passport
app.use(passport.initialize());
app.use(passport.session());

//config flash
app.use(flash());

// view engine
app.use(layoutEjs);
app.set("view engine", "ejs");
app.set("layout", "./layout/mainLayout.ejs");
app.set("views", path.join(__dirname, "views"));

// routes
app.use("/", require("./routes/router"));
app.use("/dashboard", require("./routes/dashboard"));

//error 404
app.use("*", error404);

app.listen(process.env.PORT, (err) => {
  if(err) console.log(err)
  else console.log("start :)")
});
