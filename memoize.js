(function(){
  var memoizeSingleAsync, out$ = typeof exports != 'undefined' && exports || this;
  out$.memoizeSingleAsync = memoizeSingleAsync = function(func){
    var cached_val;
    cached_val = null;
    return function(callback){
      if (cached_val != null) {
        callback(cached_val);
        return;
      }
      return func(function(result){
        cached_val = result;
        return callback(result);
      });
    };
  };
}).call(this);
