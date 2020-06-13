var express = require("express");
var compression = require("compression");

var PORT = process.env.PORT || 8080;
var app = express();

app.use(compression({ filter: shouldCompress }));

function shouldCompress ( req, res) {
    if (req.headers['x-no-compress']) {
        return false   
}

return compression.filter(req, res)

}
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgersController.js");

app.use(routes);

app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});