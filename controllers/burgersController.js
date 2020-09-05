//Dependencies and router setup
var express = require("express");

var router = express.Router();
var burger = require("../models/burgers.js");

// Get route that redirects to index
router.get("/", function (req, res) {
  res.redirect("/burgers");
});

//Get route for index
router.get("/burgers", function (req, res) {
  burger.all(function (data) {
    var hbsObj = {
      burger_data: data,
    };
    console.log(hbsObj);
    res.render("index", hbsObj);
  });
});

//Post route to create burger then redirects to index
router.post("/burgers/create", function (req, res) {
  burger.create(req.body.burger_name, function (result) {
    res.redirect("/burgers");
  });
});

//Put route to update burger then redirects to index
router.put("/burgers/:id", function (req, res) {
  burger.update(req.params.id, function (result) {
    res.sendStatus(200);
  });
});

module.exports = router;
