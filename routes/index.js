var express = require("express");
var router = express.Router({ mergeParams: true });

router.get("/", function(req, res) {
    // get all appartments
    res.send("Hello?");
  // res.render("../views/index");
});
