var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var index =  require('./routes/index.js');


app.use(express.static(__dirname + "/public")); 
app.set('view engine', "ejs");

app.get('/', function(req,res){
    res.render("index.ejs");
});


app.listen(3000, function() {
    console.log("Server is running on port 3000");
});
