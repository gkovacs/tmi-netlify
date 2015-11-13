(function(){
  Polymer({
    is: 'view-data',
    properties: {
      survey: {
        type: String,
        observer: 'surveyChanged'
      }
    },
    send_data: function(){
      return alert('todo not yet implemented');
    },
    return_to_survey: function(){
      return open_survey(this.survey);
    },
    return_home: function(){
      return return_home();
    },
    surveyChanged: function(){
      var self;
      self = this;
      return getSurveyInfo(self.survey, function(survey_info){
        var output, vars, lists;
        output = {};
        vars = survey_info.vars, lists = survey_info.lists;
        vars == null && (vars = []);
        lists == null && (lists = []);
        return async.eachSeries(vars, function(varname, ncallback){
          return getvar(varname, function(val){
            if (output.vars == null) {
              output.vars = {};
            }
            output.vars[varname] = val;
            return ncallback();
          });
        }, function(){
          return async.eachSeries(lists, function(listname, ncallback){
            return getlist(listname, function(val){
              if (output.lists == null) {
                output.lists = {};
              }
              output.lists[listname] = val;
              return ncallback();
            });
          }, function(){
            return self.$$('#results').innerText = jsyaml.safeDump(output);
          });
        });
      });
    }
  });
}).call(this);
