(function(){
  var sendBackground, load_experiment_for_location;
  sendBackground = function(type, data, callback){
    console.log('sendBackground sent: ');
    console.log(type);
    console.log(data);
    return chrome.runtime.sendMessage({
      type: type,
      data: data
    }, function(response){
      console.log('got response!');
      return callback(response);
    });
  };
  load_experiment_for_location = function(location){
    return sendBackground('load_experiment_for_location', {
      location: location
    });
  };
  load_experiment_for_location(window.location.href);
}).call(this);
