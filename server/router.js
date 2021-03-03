const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	// console.log("got a get request");
	res.send("this is home page ");
});

module.exports = router;
