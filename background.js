// Generated by LiveScript 1.4.0
(function(){
  var execute_content_script, insert_css, load_experiment, load_experiment_for_location, getLocation, getTabInfo, sendTab, message_handlers;
  console.log('weblab running in background');
  execute_content_script = function(script_path, callback){
    return chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    }, function(tabs){
      if (tabs.length === 0) {
        if (callback != null) {
          callback();
        }
        return;
      }
      return chrome.tabs.executeScript(tabs[0].id, {
        file: script_path,
        allFrames: false,
        runAt: 'document_start'
      }, function(){
        if (callback != null) {
          return callback();
        }
      });
    });
  };
  insert_css = function(css_path, callback){
    if (callback != null) {
      return callback();
    }
  };
  load_experiment = function(experiment_name, callback){
    console.log('load_experiment ' + experiment_name);
    return get_experiments(function(all_experiments){
      var experiment_info;
      experiment_info = all_experiments[experiment_name];
      return async.eachSeries(experiment_info.scripts, function(script_name, ncallback){
        return execute_content_script("experiments/" + experiment_name + "/" + script_name, ncallback);
      }, function(){
        return async.eachSeries(experiment_info.css, function(css_name, ncallback){
          return insert_css("experiments/" + experiment_name + "/" + css_name, ncallback);
        }, function(){
          if (callback != null) {
            return callback();
          }
        });
      });
    });
  };
  load_experiment_for_location = function(location, callback){
    return list_available_experiments_for_location(location, function(possible_experiments){
      var enabled_experiments, ref$, i$, len$, x, results$ = [];
      console.log('possible experiments are:');
      console.log(possible_experiments);
      enabled_experiments = (ref$ = JSON.parse(localStorage.getItem('experiments'))) != null
        ? ref$
        : [];
      console.log('enabled experiments are:');
      for (i$ = 0, len$ = enabled_experiments.length; i$ < len$; ++i$) {
        x = enabled_experiments[i$];
        if (possible_experiments.indexOf(x) !== -1) {
          load_experiment(x);
          break;
        }
      }
      return results$;
    });
  };
  getLocation = function(callback){
    console.log('calling getTabInfo');
    return getTabInfo(function(tabinfo){
      console.log('getTabInfo results');
      console.log(tabinfo);
      console.log(tabinfo.url);
      return callback(tabinfo.url);
    });
  };
  getTabInfo = function(callback){
    return chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    }, function(tabs){
      console.log('getTabInfo results');
      console.log(tabs);
      if (tabs.length === 0) {
        return;
      }
      return chrome.tabs.get(tabs[0].id, callback);
    });
  };
  sendTab = function(type, data, callback){
    return chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    }, function(tabs){
      console.log('sendTab results');
      console.log(tabs);
      if (tabs.length === 0) {
        return;
      }
      return chrome.tabs.sendMessage(tabs[0].id, {
        type: type,
        data: data
      }, {}, callback);
    });
  };
  message_handlers = {
    'getLocation': function(data, callback){
      return getLocation(function(location){
        console.log('getLocation background page:');
        console.log(location);
        return callback(location);
      });
    },
    'load_experiment': function(data, callback){
      var experiment_name;
      experiment_name = data.experiment_name;
      return load_experiment(experiment_name, function(){
        if (callback != null) {
          return callback();
        }
      });
    },
    'load_experiment_for_location': function(data, callback){
      var location;
      location = data.location;
      return load_experiment_for_location(location, function(){
        if (callback != null) {
          return callback();
        }
      });
    }
  };
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if (tab.url) {
      return list_available_experiments_for_location(tab.url, function(possible_experiments){
        if (possible_experiments.length > 0) {
          return chrome.pageAction.show(tabId);
        }
      });
    }
  });
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    var type, data, message_handler;
    type = request.type, data = request.data;
    console.log(type);
    console.log(data);
    message_handler = message_handlers[type];
    if (message_handler == null) {
      return;
    }
    return message_handler(data, function(response){
      console.log('message handler response:');
      console.log(response);
      return sendResponse(response);
    });
  });
}).call(this);
