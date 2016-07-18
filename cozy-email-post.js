module.exports = (function(){
    "use strict";
    var http = require('http');
    var log = require("debug")("nqm:cozy-email");
    var exec = require('child_process').exec;
    var options = {
        hostname:"192.168.100.1",
        port:'9125',
        path:'/account',
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        }

    }

/*var bodyString = JSON.stringify(

    {   id: null,
        label: 'gmail',
        name: 'byod2',
        login: 'nqmbyod2@gmail.com',
        password: 'byod1234554321',
        imapServer: 'imap.gmail.com',
        imapPort: '993',
        imapSSL: true,
            imapTLS: false,
            imapLogin: '',
            smtpServer: 'smtp.gmail.com',
            smtpPort: '465',
            smtpSSL: true,
            smtpTLS: false,
            smtpLogin: '',
            smtpPassword: '',
            smtpMethod: 'PLAIN',
            accountType: 'IMAP',
            mailboxes: '',
            favoriteMailboxes: null,
            draftMailbox: '',
            sentMailbox: '',
            trashMailbox: '' }
);*/
    function cozy() {

    };
    cozy.prototype.post_account = function(email,password){
        log('email',email);
	var bodyString = JSON.stringify(
    		{id: null,
        	 label: 'gmail',
        	 name: 'byod2',
         	 login: email,
        	 password:password,
        	 imapServer: 'imap.gmail.com',
        	 imapPort: '993',
        	 imapSSL: true,
            	 imapTLS: false,
            	 imapLogin: '',
            	 smtpServer: 'smtp.gmail.com',
            	 smtpPort: '465',
            	 smtpSSL: true,
            	 smtpTLS: false,
            	 smtpLogin: '',
            	 smtpPassword: '',
            	 smtpMethod: 'PLAIN',
            	 accountType: 'IMAP',
            	 mailboxes: '',
            	 favoriteMailboxes: null,
            	 draftMailbox: '',
            	 sentMailbox: '',
            	 trashMailbox: '' }
	);	
        var req = http.request(options,function(res){
            log('new account posted');
            res.on('error',function(err){
                log('an error occour');
                log(err);
            });
	    res.on('data',function(chunk){
		log('cozy-email post data  ',chunk);
	    });
	    res.on('end',function(){
		log('posted account request end');
		var cmd = '/root/cozy-email-restart.sh'
		exec(cmd,function(error,stdout,stderr){
		    if(error){
			log('error occoured restarting cozy-email');
		    }
		    log(stdout);
		})
	    })
        });

        req.write(bodyString);
        req.end();
    }
    return cozy;
}());