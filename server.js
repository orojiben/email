server = require('http').Server();
var socketIO = require('socket.io');
var io = socketIO.listen(server);

var nodemailer = require("nodemailer");

io.sockets.on('connection', function(socket){
  console.log("connect");
    socket.on('r_pass', function(data){
		smtpTransport.sendMail({// sender address
		   to: "Your Name <"+data.user_r+">", // comma separated list of receivers
		   subject: "Welcome to www.nkaujhmono.com", // Subject line
		   text: "Link for Login http://www.nkaujhmono.com/ok?x="+data.x+"&user="+data.user_r // plaintext body
		}, function(error, response){
		   if(error){
			   console.log(error);
		   }else{
			   console.log("Message sent: " + response);
			   socket_r.emit('r_pass', { value: 'ok_ok'});
		   }
		});
		
	});
});


server.listen(3001, function(){
  console.log('listening on *:3000');
  
});

var smtpTransport = nodemailer.createTransport("SMTP",{
   service: "Gmail",
   auth: {
       user: "nutsuchiraruwa@gmail.com",
       pass: "nutsuchiraruwa01#"
   }
});
//var nodemailer = require("nodemailer");


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
