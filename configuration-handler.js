module.exports = (function() {
  "use strict";
  var exec = require('child_process').exec;
  var log = require("debug")("nqm:configuration-handler");
  var _appServer = require("./appServer");

  var cozyLib = require('./cozy-email-post');
  var cozy = new cozyLib();

  return function(datasetId) {
    return {
      getCollection: function(doc) {
        return _appServer.getPublication("data-" + datasetId);
      },
      getKey: function(doc) {
        return doc._id;
      },
      added: function(doc) {
        log("new configuration: ", doc);
        if(doc.appId == 'wifi'){
	  var cmd = '/root/wifi.sh';
          log("new wifi configuration ",doc.appId);
          cmd += ' -ssid '+doc.key+' -pwd '+doc.value;
          log(cmd);
          exec(cmd,function(error, stdout, stderr){
            log('output is ',stdout);
          })
        }
        else if(doc.appId == 'email'){
          var account = 'bingjie';
	  var cmd = '/root/cozy-email.sh';
          log('email changes',cmd);
	  //cozy.post_account(account);
	  exec(cmd,function(error,stdout,stderr){
	    if(!error){
	        log('cozy-shell  ',cmd);
	        log(stdout);
	        cozy.post_account(doc.key,doc.value);
	    }
	    log("exec cmd error exit ",error);
	  })
        }
      },
      changed: function(doc) {
        log("configuration changed: ", doc);
      },
      removed: function(doc) {
        log("configuration removed: ", doc);
      }
    };
  };
}());