(function(){
  Polymer({
    is: 'auto-field',
    properties: {
      field: {
        type: String,
        observer: 'fieldChanged'
      }
    },
    fieldChanged: function(){
      var field_name, self;
      field_name = this.field;
      self = this;
      return getvar(field_name, function(value){
        return getExperimentInfo(field_name, function(experiment_info){
          var experiment_title;
          experiment_title = experiment_info.title;
          self.$$('#field_description').innerText = experiment_title;
          return self.$$('#field_value').innerText = value;
        });
      });
    }
  });
}).call(this);
