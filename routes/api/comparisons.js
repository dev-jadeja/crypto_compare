const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.send("COMPARISONS ROUTE"));

module.exports = router;
