(function(){
  var main2, main1;
  main2 = function(){
    var fieldname;
    fieldname = 'facebook_birthdate';
    return get_infobox_text([infobox_item_type_matches('born'), infobox_contains_child('.sx_75ca87')], function(infobox_text){
      if (infobox_text == null) {
        console.log("no matching infoboxes found for " + fieldname);
        return;
      }
      return setvar(fieldname, infobox_text);
    });
  };
  main1 = function(){
    return call_if_on_facebook_profile(main2);
  };
  main1();
  onpageupdate(main1);
}).call(this);
