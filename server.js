var http = require("http");
var express = require("express");
var app = express();
var smtpTransport;

  app.get("/nodemailer",function(res,req){
	
	smtpTransport.sendMail({// sender address
	   to: "Your Name <"+req.query.user_r+">", // comma separated list of receivers
	   subject: "Welcome to www.nkaujhmono.com", // Subject line
	   text: "Link for Login http://www.nkaujhmono.com/ok?x="+req.query.x+"&user="+req.query.user_r // plaintext body
	}, function(error, response){
	   if(error){
		   console.log(error);
	   }else{
		   console.log("Message sent: " + response);
		   res.end("ok_ok");
	   }
	});

  });

http.createServer(app).listen(3001);

var nodemailer = require("nodemailer");


smtpTransport = nodemailer.createTransport("SMTP",{
   service: "Gmail",
   auth: {
       user: "nutsuchiraruwa@gmail.com",
       pass: "nutsuchiraruwa01#"
   }
});


