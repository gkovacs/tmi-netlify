(function(){
  var getSurveyInfo, getExperimentInfo, get_experiments, list_available_experiments_for_location, getDb, getCollection, getVarsCollection, getListsCollection, setvar, getvar, clearvar, printvar, addtolist, getlist, clearlist, printlist, clear_all_lists, clear_all_vars, clear_all, out$ = typeof exports != 'undefined' && exports || this;
  out$.getSurveyInfo = getSurveyInfo = function(survey_name, callback){
    return $.get("/surveys/" + survey_name + ".yaml", function(survey_info_text){
      var survey_info;
      survey_info = jsyaml.safeLoad(survey_info_text);
      return callback(survey_info);
    });
  };
  out$.getExperimentInfo = getExperimentInfo = function(experiment_name, callback){
    return $.get("/experiments/" + experiment_name + "/experiment.yaml", function(experiment_info_text){
      var experiment_info;
      experiment_info = jsyaml.safeLoad(experiment_info_text);
      return callback(experiment_info);
    });
  };
  out$.get_experiments = get_experiments = memoizeSingleAsync(function(callback){
    return $.get('/experiments/experiments_list.yaml', function(experiments_list_text){
      var experiments_list, output;
      console.log(experiments_list_text);
      experiments_list = jsyaml.safeLoad(experiments_list_text);
      console.log(experiments_list);
      output = {};
      return async.mapSeries(experiments_list, function(experiment_name, ncallback){
        return getExperimentInfo(experiment_name, function(experiment_info){
          var res$, i$, ref$, len$, x;
          if (experiment_info.nomatches == null) {
            experiment_info.nomatches = [];
          }
          if (experiment_info.matches == null) {
            experiment_info.matches = [];
          }
          if (experiment_info.scripts == null) {
            experiment_info.scripts = [];
          }
          if (experiment_info.css == null) {
            experiment_info.css = [];
          }
          res$ = [];
          for (i$ = 0, len$ = (ref$ = experiment_info.matches).length; i$ < len$; ++i$) {
            x = ref$[i$];
            res$.push(new RegExp(x));
          }
          experiment_info.match_regexes = res$;
          res$ = [];
          for (i$ = 0, len$ = (ref$ = experiment_info.nomatches).length; i$ < len$; ++i$) {
            x = ref$[i$];
            res$.push(new RegExp(x));
          }
          experiment_info.nomatch_regexes = res$;
          output[experiment_name] = experiment_info;
          return ncallback(null, null);
        });
      }, function(errors, results){
        return callback(output);
      });
    });
  });
  out$.list_available_experiments_for_location = list_available_experiments_for_location = function(location, callback){
    return get_experiments(function(all_experiments){
      var possible_experiments, experiment_name, experiment_info, blacklisted, i$, ref$, len$, regex, matches;
      possible_experiments = [];
      for (experiment_name in all_experiments) {
        experiment_info = all_experiments[experiment_name];
        blacklisted = false;
        for (i$ = 0, len$ = (ref$ = experiment_info.nomatch_regexes).length; i$ < len$; ++i$) {
          regex = ref$[i$];
          if (regex.test(location)) {
            blacklisted = true;
            break;
          }
        }
        if (blacklisted) {
          continue;
        }
        matches = false;
        for (i$ = 0, len$ = (ref$ = experiment_info.match_regexes).length; i$ < len$; ++i$) {
          regex = ref$[i$];
          if (regex.test(location)) {
            matches = true;
            break;
          }
        }
        if (matches) {
          possible_experiments.push(experiment_name);
        }
      }
      return callback(possible_experiments);
    });
  };
  out$.getDb = getDb = memoizeSingleAsync(function(callback){
    return new minimongo.IndexedDb({
      namespace: 'autosurvey'
    }, callback);
  });
  out$.getCollection = getCollection = function(collection_name, callback){
    return getDb(function(db){
      var collection;
      collection = db.collections[collection_name];
      if (collection != null) {
        callback(collection);
        return;
      }
      return db.addCollection(collection_name, function(){
        return callback(db.collections[collection_name]);
      });
    });
  };
  out$.getVarsCollection = getVarsCollection = memoizeSingleAsync(function(callback){
    return getCollection('vars', callback);
  });
  out$.getListsCollection = getListsCollection = memoizeSingleAsync(function(callback){
    return getCollection('lists', callback);
  });
  out$.setvar = setvar = function(name, val, callback){
    return getVarsCollection(function(data){
      return data.upsert({
        _id: name,
        val: val
      }, function(result){
        if (callback != null) {
          return callback();
        }
      });
    });
  };
  out$.getvar = getvar = function(name, callback){
    return getVarsCollection(function(data){
      return data.findOne({
        _id: name
      }, function(result){
        if (result != null) {
          callback(result.val);
        } else {
          callback(null);
        }
      });
    });
  };
  out$.clearvar = clearvar = function(name, callback){
    return getVarsCollection(function(data){
      return data.remove(name, function(){
        if (callback != null) {
          return callback();
        }
      });
    });
  };
  out$.printvar = printvar = function(name){
    return getvar(name, function(result){
      return console.log(result);
    });
  };
  out$.addtolist = addtolist = function(name, val, callback){
    return getListsCollection(function(data){
      return data.upsert({
        name: name,
        val: val
      }, function(result){
        if (callback != null) {
          return callback();
        }
      });
    });
  };
  out$.getlist = getlist = function(name, callback){
    return getListsCollection(function(data){
      return data.find({
        name: name
      }).fetch(function(result){
        var x;
        return callback((function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = result).length; i$ < len$; ++i$) {
            x = ref$[i$];
            results$.push(x.val);
          }
          return results$;
        }()));
      });
    });
  };
  out$.clearlist = clearlist = function(name, callback){
    return getListsCollection(function(data){
      return data.find({
        name: name
      }).fetch(function(result){
        return async.eachSeries(result, function(item, ncallback){
          return data.remove(item['_id'], function(){
            return ncallback();
          });
        }, function(){
          if (callback != null) {
            return callback();
          }
        });
      });
    });
  };
  out$.printlist = printlist = function(name){
    return getlist(name, function(result){
      return console.log(result);
    });
  };
  out$.clear_all_lists = clear_all_lists = function(callback){
    return getListsCollection(function(data){
      return data.find({}).fetch(function(result){
        return async.eachSeries(result, function(item, ncallback){
          return data.remove(item['_id'], function(){
            return ncallback();
          });
        }, function(){
          if (callback != null) {
            return callback();
          }
        });
      });
    });
  };
  out$.clear_all_vars = clear_all_vars = function(callback){
    return getVarsCollection(function(data){
      return data.find({}).fetch(function(result){
        return async.eachSeries(result, function(item, ncallback){
          return data.remove(item['_id'], function(){
            return ncallback();
          });
        }, function(){
          if (callback != null) {
            return callback();
          }
        });
      });
    });
  };
  out$.clear_all = clear_all = function(callback){
    return async.series([clear_all_vars, clear_all_lists], function(){
      if (callback != null) {
        return callback();
      }
    });
  };
}).call(this);
