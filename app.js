var express = require("express");
var dotenv = require("dotenv").config();
var app = express();
var bodyParser = require("body-parser");
var index =  require('./routes/index.js');
var nodemailer = require("nodemailer");
const sgMail = require('@sendgrid/mail');
app.use(express.static(__dirname + "/public")); 
app.set('view engine', "ejs");
const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', function(req,res){
    res.render("index.ejs");
});




app.post('/send', function(req,res){
    // console.log(req.body);
        // using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const output = `
<p>Incomming booking request from: ${req.body.name} </p>
<h3>Booking Details: </h3>
<ul>
    <li>Full Name: ${req.body.name}</li>
    <li>E-mail Address: ${req.body.email}</li>
    <li>Phone number: ${req.body.phone}</li>
    <li>Street: ${req.body.street}</li>
    <li>Arrival date: ${req.body.postCode}</li>
    <li>Arrival date: ${req.body.streetNumber}</li>
    <li>Arrival Date: ${req.body.arrive}</li>
    <li>Departure Date: ${req.body.depart}</li>
    <li>Special Requests: ${req.body.comments}</li>
</ul>
`;
const msg = {
  to: process.env.FROM_EMAIL_ADRESS,
  from: process.env.TO_EMAIL_ADRESS,
  subject: 'Booking request, Residence Capriolo',
  html: output,
};
sgMail.send(msg);
res.redirect('/');
});

app.listen(PORT, function() {
    console.log("Server is running on port " + PORT);
    
});
