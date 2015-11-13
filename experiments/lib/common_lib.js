(function(){
  var pending_requests, sendmsg, setvar, setvars, getvar, getvars, addtolist, onpageupdate, prev_hash, onhashchanged, prev_location, onlocationchanged, once_available, filter_list, getUrlParameters, out$ = typeof exports != 'undefined' && exports || this;
  pending_requests = {};
  chrome.runtime.onMessage.addListener(function(req, sender, callback){
    var requestId, response, matching_callback;
    if (req.event === 'backgroundresponse') {
      requestId = req.requestId, response = req.response;
      matching_callback = pending_requests[requestId];
      if (matching_callback != null) {
        delete pending_requests[requestId];
        return matching_callback(response);
      }
    }
  });
  sendmsg = function(type, data, callback){
    var requestId;
    if (callback == null) {
      chrome.runtime.sendMessage({
        type: type,
        data: data
      });
      return;
    }
    requestId = Math.floor(Math.random() * 9999999).toString();
    pending_requests[requestId] = callback;
    return chrome.runtime.sendMessage({
      type: type,
      data: data,
      requestId: requestId
    });
  };
  out$.setvar = setvar = function(key, value, callback){
    var data;
    data = {};
    data[key] = value;
    return sendmsg('setvars', data, callback);
  };
  out$.setvars = setvars = function(data, callback){
    return sendmsg('setvars', data, callback);
  };
  out$.getvar = getvar = function(key, callback){
    return sendmsg('getvar', key, callback);
  };
  out$.getvars = getvars = function(keylist, callback){
    return sendmsg('getvars', keylist, callback);
  };
  out$.addtolist = addtolist = function(list, item, callback){
    var data;
    data = {
      list: list,
      item: item
    };
    return sendmsg('addtolist', data, callback);
  };
  out$.onpageupdate = onpageupdate = function(callback){
    return chrome.runtime.onMessage.addListener(function(req, sender, sendResponse){
      if (req.event === 'pageupdate') {
        console.log('onpageupdate event being called');
        return callback();
      }
    });
  };
  prev_hash = '';
  out$.onhashchanged = onhashchanged = function(callback){
    return setInterval(function(){
      var new_hash;
      new_hash = window.location.hash;
      if (new_hash !== prev_hash) {
        callback(new_hash, prev_hash);
        return prev_hash = new_hash;
      }
    }, 2000);
  };
  prev_location = '';
  out$.onlocationchanged = onlocationchanged = function(callback){
    return setInterval(function(){
      var new_location;
      new_location = window.location.href;
      if (new_location !== prev_location) {
        callback(new_location, prev_location);
        return prev_location = new_location;
      }
    }, 2000);
  };
  out$.once_available = once_available = function(selector, callback){
    var current_result;
    current_result = document.querySelectorAll(selector);
    if (current_result.length > 0) {
      return callback(current_result);
    } else {
      return setTimeout(function(){
        return once_available(selector, callback);
      }, 1000);
    }
  };
  out$.filter_list = filter_list = function(func, list){
    var x;
    return (function(){
      var i$, ref$, len$, results$ = [];
      for (i$ = 0, len$ = (ref$ = list).length; i$ < len$; ++i$) {
        x = ref$[i$];
        if (func(x)) {
          results$.push(x);
        }
      }
      return results$;
    }());
  };
  out$.getUrlParameters = getUrlParameters = function(){
    var url, hash, map, parts;
    url = window.location.href;
    hash = url.lastIndexOf('#');
    if (hash !== -1) {
      url = url.slice(0, hash);
    }
    map = {};
    parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value){
      return map[key] = decodeURIComponent(value).split('+').join(' ');
    });
    return map;
  };
}).call(this);
