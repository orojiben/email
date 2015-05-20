var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
   service: "Gmail",
   auth: {
       user: "orojiben@gmail.com",
       pass: "orojiben01"
   }
});

smtpTransport.sendMail({
   from: "My Name <orojiben@gmail.com>", // sender address
   to: "Your Name <nkuajhmono@gmail.com>", // comma separated list of receivers
   subject: "Hello ✔", // Subject line
   text: "Hello world ✔" // plaintext body
}, function(error, response){
   if(error){
       console.log(error);
   }else{
       console.log("Message sent: " + response.message);
   }
});