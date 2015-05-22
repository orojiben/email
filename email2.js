var Imap = require('imap'),
    inspect = require('util').inspect;

var imap = new Imap({
  user: 'nutsuchiraruwa@gmail.com',
  password: 'nutsuchiraruwa01#',
  host: 'imap.gmail.com',
  port: 993,
  tls: true
});

function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}

function checked_email() {

imap.once('ready', function() {
  openInbox(function(err, box) {
	//console.log(box.messages.new);
    if (err)
		{
				console.log("Err");
			}
    var f = imap.seq.fetch('1:*', {
      bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)','TEXT'],
      struct: true
    });
    f.on('message', function(msg, seqno) {
      //console.log('Message #%d', seqno);
      var prefix = '(#' + seqno + ') ';
      msg.on('body', function(stream, info) {
        var buffer = '';
		var count = 0;
        stream.on('data', function(chunk) {
          buffer += chunk.toString('utf8');
		   var str_email = chunk.toString('utf8');
		  if (info.which === 'TEXT')
		  {

			 if(str_email.match("permanently:")!=null && count==0)
			 {
				 var email_fail = chunk.toString('utf8').split(":")[1].split(" ")[5].split("\n")[0];
				console.log(prefix + 'Body ==> %s ', email_fail.substring(0, email_fail.length-1));
				count++;
			 }
			//console.log(prefix + 'Body ==> %s ', chunk.toString('utf8'));
			//count++;
		  }
			
			//count++;
		  
        });
        stream.once('end', function() {
          //console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
        });
      });
      /*msg.once('attributes', function(attrs) {
        console.log(prefix + 'Attributes: %s', inspect(attrs.data, false, 8));
      });*/
      msg.once('end', function() {
        //console.log(prefix + 'Finished');
      });
    });
    f.once('error', function(err) {
      console.log('Fetch error: ' + err);
    });
    f.once('end', function() {
      console.log('Done fetching all messages!');
      imap.end();
    });
  });
});
}

function checked_email2() {
	imap.once('ready', function() {
		openInbox(function(err, box) {
		  if (err) 
			  {
				console.log("Err");
			}
		  imap.search([ 'UNSEEN', ['SINCE', 'May 20, 2010'] ], function(err, results) {
			if (err)
				{
				console.log("Err");
			}
			var f = imap.fetch(results, { bodies:  ['HEADER.FIELDS (FROM TO SUBJECT DATE)','TEXT'] });
			f.on('message', function(msg, seqno) {
			 // console.log('Message #%d', seqno);
			  var prefix = '(#' + seqno + ') ';
			  msg.on('body', function(stream, info) {
				//stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.txt'));
				var count = 0;
				stream.on('data', function(chunk) {
				   var str_email = chunk.toString('utf8');
				  if (info.which === 'TEXT')
				  {

					 if(str_email.match("permanently:")!=null && count==0)
					 {
						 var email_fail = chunk.toString('utf8').split(":")[1].split(" ")[5].split("\n")[0];
						console.log(prefix + 'Body ==> %s ', email_fail.substring(0, email_fail.length-1));
						count++;
					 }
				  }	  
				});
				
			  });
			  msg.once('end', function() {
				//console.log(prefix + 'Finished');
			  });
			});
			f.once('error', function(err) {
			  console.log('Fetch error: ' + err);
			});
			f.once('end', function() {
			  console.log('Done fetching all messages!');
			  imap.end();
			});
		  });
		});
	});
}

checked_email2();
imap.once('error', function(err) {
  console.log(err);
});

imap.once('end', function() {
  console.log('Connection ended');
});

imap.connect();