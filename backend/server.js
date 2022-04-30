const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const morgan = require("morgan");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");
const { FRONTEND_URL } = require("./consts");

dotenv.config({ path: "./.env" });
require("./config/passport")(passport);

const app = express();
connectDB();

app.use(express.json());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const router = express.Router();
router.use("/", require("./routes/default"));
router.use("/auth", require("./routes/auth"));
router.use("/user", require("./routes/user"));
router.use("/review", require("./routes/review"));
router.use("/books", require("./routes/books"));
app.use("/api/v1", router);
app.use("*", (req, res) => {
  return res.status(500).json({
    success: false,
    error: "URL DOES NOT EXIST",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
