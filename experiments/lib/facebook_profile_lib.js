(function(){
  var infobox_item_type_matches, infobox_contains_child, get_infoboxes, get_infobox_text, call_if_on_facebook_profile, out$ = typeof exports != 'undefined' && exports || this;
  out$.infobox_item_type_matches = infobox_item_type_matches = curry$(function(item_type, infobox){
    var datastore_text, datastore;
    datastore_text = infobox.getAttribute('data-store');
    if (datastore_text == null) {
      return false;
    }
    datastore = JSON.parse(datastore_text);
    return datastore['context_item_type_as_string'] === item_type;
  });
  out$.infobox_contains_child = infobox_contains_child = curry$(function(selector, infobox){
    return infobox.querySelector(selector) !== null;
  });
  out$.get_infoboxes = get_infoboxes = function(callback){
    return once_available('._1zw6._md0._5vb9', callback);
  };
  out$.get_infobox_text = get_infobox_text = function(list_of_filters, callback){
    return get_infoboxes(function(infoboxes){
      var matching_infoboxes, i$, ref$, len$, filter_func;
      console.log('infoboxes are');
      console.log(infoboxes);
      matching_infoboxes = [];
      for (i$ = 0, len$ = (ref$ = list_of_filters).length; i$ < len$; ++i$) {
        filter_func = ref$[i$];
        if (matching_infoboxes.length === 1) {
          break;
        }
        matching_infoboxes = filter_list(filter_func, infoboxes);
      }
      if (matching_infoboxes.length === 0) {
        callback();
        return;
      }
      return callback(matching_infoboxes[0].innerText);
    });
  };
  out$.call_if_on_facebook_profile = call_if_on_facebook_profile = function(callback){
    return getvar('facebook_link', function(facebook_link){
      if (facebook_link != null && facebook_link.length > 0) {
        if (window.location.href.indexOf(facebook_link) > -1) {
          return callback();
        }
      }
    });
  };
  function curry$(f, bound){
    var context,
    _curry = function(args) {
      return f.length > 1 ? function(){
        var params = args ? args.concat() : [];
        context = bound ? context || this : this;
        return params.push.apply(params, arguments) <
            f.length && arguments.length ?
          _curry.call(context, params) : f.apply(context, params);
      } : f;
    };
    return _curry();
  }
}).call(this);
