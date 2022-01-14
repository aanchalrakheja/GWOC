// require the express module
var express=require("express");
const bodyparser = require('body-parser');

// fire the express function
var app=express();

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

// require the controller
var controller=require("./controllers/main");
controller(app);

// use ejs as our view engine
app.set("view engine","ejs");

// use static files
app.use(express.static("public"));

// listen to port 3000
app.listen(3000);
console.log("You are listening to port 3000");



