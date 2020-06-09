var express = require("express");

var router = express.Router();
var burger = require("../models/burger.js");

// get route -> index
router.get("/", function (req, res) {
    res.redirect("/burgers");
});

router.get("/burgers", function (req, res) {
    burger.all(function (burgerdata) {
        var hbsObject = {
            burger_data: burgerdata
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});


router.post("/burgers/create", function (req, res) {
    burger.create(req.body.burger_name, function (result) {
        // Send back the ID of the new quote
        console.log(result)
        res.redirect("/");
    });
});

router.put("/burgers/:id", function (req, res) {
    burger.update(req.params.id, function (result) {
        console.log(result)
        res.sendStatus(200)
    })

});
// post route -> back to index
//hint: burger.create


// put route -> back to index
//hint: burger.update()


module.exports = router;