﻿var express=require('express');
var nodemailer = require("nodemailer");

var app = express.createServer();
app.use(express.bodyParser());
/*------------------Routing Started ------------------------*/

app.post('/send',function(req,res){
	console.log("send");
	console.log('body: ' + JSON.stringify(req.body));
	/*smtpTransport.sendMail({// sender address
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
	});*/
	
});

/*--------------------Routing Over----------------------------*/

app.listen(3001,function(){
console.log("Express Started on Port 3001");
});

//var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
   service: "Gmail",
   auth: {
       user: "nutsuchiraruwa@gmail.com",
       pass: "nutsuchiraruwa01#"
   }
});
/*
x = 1;
user_r = 1;

function sendMail_()
{
	smtpTransport.sendMail({// sender address
	   to: "Your Name <nkaujhmono@gmail.com>", // comma separated list of receivers
	   subject: "Welcome to www.nkaujhmono.com", // Subject line
	   text: "Link for Login http://www.nkaujhmono.com/ok?x="+x+"&user="+user_r // plaintext body
	}, function(error, response){
	   if(error){
		   console.log(error);
	   }else{
		   console.log("Message sent: " + response);
	   }
	});
}


sendMail_();*/
