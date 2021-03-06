(function(){
  var sendExtension, out$ = typeof exports != 'undefined' && exports || this;
  out$.sendExtension = sendExtension = function(type, data, callback){
    return chrome.runtime.sendMessage(autosurvey_extension_id, {
      type: type,
      data: data
    }, function(response){
      if (callback != null) {
        return callback(response);
      }
    });
  };
}).call(this);
