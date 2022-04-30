const express = require("express");
const passport = require("passport");
const { FRONTEND_URL } = require("../consts");
const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: FRONTEND_URL,
    session: true,
  }),
  (req, res) => {
    res.redirect(FRONTEND_URL);
  }
);

router.get("/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.send("complete");
  }
});

module.exports = router;
