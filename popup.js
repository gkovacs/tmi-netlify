(function(){
  var startPage;
  startPage = function(){
    var params, tagname, survey, tag, k, v;
    params = getUrlParameters();
    tagname = params.tag;
    survey = params.survey;
    if (tagname == null) {
      if (survey != null) {
        tagname = survey + '-survey';
      } else {
        tagname = 'popup-view';
      }
    }
    tag = $("<" + tagname + ">");
    for (k in params) {
      v = params[k];
      if (k === 'tag') {
        continue;
      }
      v = jsyaml.safeLoad(v);
      tag.prop(k, v);
    }
    return tag.appendTo('#contents');
  };
  $(document).ready(function(){
    console.log(window.location);
    startPage();
    return;
    return getvar('facebook_name', function(facebook_name){
      return getvar('facebook_link', function(facebook_link){
        return getvar('facebook_birthdate', function(facebook_birthdate){
          return getvar('facebook_occupation', function(facebook_occupation){
            $('#facebook_name').text(facebook_name);
            $('#facebook_link').text(facebook_link);
            $('#facebook_occupation').text(facebook_occupation);
            $('#facebook_birthdate').text(facebook_birthdate);
            return console.log('popup is getting rendered');
          });
        });
      });
    });
  });
}).call(this);
