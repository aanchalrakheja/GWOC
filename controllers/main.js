require('dotenv').config();
// require the mongoose package to connect to mongoDb database
var mongoose=require("mongoose");
var nodemailer = require('nodemailer');
var totalContributors=0;
var totalMentors=0;
var totalSupervisors=0;

const uri = process.env.db_url || "mongodb+srv://aanchal:aanchal29@cluster0.xrgu2.mongodb.net/gwoc?retryWrites=true&w=majority";

// connecting to the database
mongoose.connect(uri);

// Defining a schema for our data base- schema is a blueprint of how our data will be stored in our database, 
// it can be called as a format of storing data
var contributorsSchema=mongoose.Schema({
    name:String,
    email:String,
    contact:String,
    college:String,
    year:String,
    stream:String,
    domain:Array,
    contribution:Array,
    openSource:String,
    whyContribute:String
});
var mentorsSchema=mongoose.Schema({
    name:String,
    email:String,
    contact:String,
    college:String,
    year:String,
    stream:String,
    domain:Array,
    openSource:String,
    whyContribute:String
});
var supervisorSchema=mongoose.Schema({
    name:String,
    email:String,
    contact:String,
    college:String,
    year:String,
    stream:String,
    domain:Array,
    openSource:String,
    whyContribute:String
});

// creating a model named Todo, which takes 2 parameters, first is the name of the collection and second is the schema of the collection
var contributors=mongoose.model("contributors",contributorsSchema);
var mentors=mongoose.model("mentors",mentorsSchema);
var supervisors=mongoose.model("supervisors",supervisorSchema);

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rsuccessful101@gmail.com',
      pass: 'registered101'
    }
  });


module.exports=function(app){
    // get home page
    app.get("/",function(req,res){
        // contributors.find().count(async function(err,count)
        // {
        //     if(err)
        //     {
        //         console.log(err);
        //     }
        //     else{
        //         totalContributors=count;
        //     }
        // });
        // mentors.find().count(async function(err,count)
        // {
        //     if(err)
        //     {
        //         console.log(err);
        //     }
        //     else{
        //         totalMentors=count;
        //     }
        // });
        // supervisors.find().count(function(err,count)
        // {
        //     if(err)
        //     {
        //         console.log(err);
        //     }
        //     else{
        //         totalSupervisors=count;
        //     }
        // });
        // res.render("home",{totalContributors:totalContributors,totalMentors:totalMentors,totalSupervisors:totalSupervisors});
        res.render("home");
    });

    app.get("/team",function(req,res){
        res.render("teampage");
    });

    app.get("/event",function(req,res){
        res.render("event");
    });

    app.get("/codeofconduct",function(req,res){
        res.render("codeofconduct");
    });

    app.get("/contributors",function(req,res){
        res.render("contributors-form");
    });

    app.get("/mentors",function(req,res){
        res.render("mentors-form");
    });

    app.get("/supervisors",function(req,res){
        res.render("supervisors-form");
    });

    app.post("/contributorSuccess",function(req,res){
        console.log(req.body);
        var item1=contributors(req.body).save(function(err){
                if(err)
                {
                    throw err;
                }
                else{
                    console.log("contributor registered");
                }
            });

            var randomNo = Math.floor((Math.random()*5000)+1);

            var mailOptions = {
                from: 'rsuccessful101@gmail.com',
                to: req.body.email,
                subject: 'Successful Registration as a Contributor',
                html: `<h2>Voila!</h2> 
                <p>You have successfully been registered as a <b>CONTRIBUTOR</b> for <i>GirlScript Winter of Contributing.</i></p>
                <p>Your unique contributor clan name is <span style="color:red">CONTRIBUTOR ${req.body.name} ${randomNo}</span></p>
                <h4>HAPPY CONTRIBUTING!!</h4>`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });

        var name=req.body.name.toUpperCase();
        res.render("success",{
            post:"CONTRIBUTOR",
            name:name
        });      
    });

    app.post("/mentorSuccess",function(req,res){
        console.log(req.body);
        var item1=mentors(req.body).save(function(err){
                if(err)
                {
                    throw err;
                }
                else{
                    console.log("mentor registered");
                }
            });

            var randomNo = Math.floor((Math.random()*5000)+1);

            var mailOptions = {
                from: 'rsuccessful101@gmail.com',
                to: req.body.email,
                subject: 'Successful Registration as a Mentor',
                html: `<h2>Voila!</h2> 
                <p>You have successfully been registered as a <b>MENTOR</b> for <i>GirlScript Winter of Contributing.</i></p>
                <p>Your unique mentor clan name is <span style="color:red">MENTOR ${req.body.name} ${randomNo}</span></p>
                <h4>HAPPY CONTRIBUTING!!</h4>`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });

        var name=req.body.name.toUpperCase();
        res.render("success",{
            post:"MENTOR",
            name:name
        });
    }); 

    app.post("/supervisorSuccess",function(req,res){
        console.log(req.body);
        var item1=supervisors(req.body).save(function(err){
                if(err)
                {
                    throw err;
                }
                else{
                    console.log("supervisor registered");
                }
            });

            var randomNo = Math.floor((Math.random()*5000)+1);

            var mailOptions = {
                from: 'rsuccessful101@gmail.com',
                to: req.body.email,
                subject: 'Successful Registration as a Supervisor',
                html: `<h2>Voila!</h2> 
                <p>You have successfully been registered as a <b>SUPERVISOR</b> for <i>GirlScript Winter of Contributing.</i></p>
                <p>Your unique supervisor clan name is <span style="color:red">SUPERVISOR ${req.body.name} ${randomNo}</span></p>
                <h4>HAPPY CONTRIBUTING!!</h4>`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });

        var name=req.body.name.toUpperCase();
        res.render("success",{
            post:"SUPERVISOR",
            name:name
        });
    }); 
}