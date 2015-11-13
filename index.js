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
        tagname = 'intro-page';
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
  });
}).call(this);
