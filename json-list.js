(function(){
  Polymer({
    is: 'json-list',
    properties: {
      field: {
        type: String,
        observer: 'fieldChanged'
      },
      json_lines: Array
    },
    fieldChanged: function(){
      var field_name, self;
      field_name = this.field;
      self = this;
      return getlist(field_name, function(value){
        self.json_lines = value;
        return console.log(self.json_lines);
      });
    },
    prettyprint: function(line){
      return JSON.stringify(line);
    }
  });
}).call(this);
