const express = require("express");
const router = express.Router();

router.get("/getuser", (req, res) => {
  res.send(req.user);
});

module.exports = router;
