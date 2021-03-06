(function(){
  Polymer({
    is: 'popup-view',
    properties: {
      experiment_list: Array
    },
    open_slacking_survey: function(){
      return open_survey('slacking');
    },
    open_facebook_survey: function(){
      return open_survey('facebook');
    },
    open_google_survey: function(){
      return open_survey('google');
    },
    open_bing_survey: function(){
      return open_survey('bing');
    },
    ready: function(){
      var self;
      self = this;
      return $.get('experiment_list.yaml', function(experiment_list_text){
        return self.experiment_list = jsyaml.safeLoad(experiment_list_text);
      });
    }
  });
}).call(this);
