(function(){
  var pageactive, throttled_pageactive;
  console.log('running browsing_time_by_site');
  pageactive = function(){
    var item;
    item = {
      host: window.location.host,
      url: window.location.href,
      timestamp: Date.now(),
      time: new Date().toString(),
      interval: 5
    };
    console.log(item);
    return addtolist('browsing_time_by_site', item);
  };
  throttled_pageactive = _.throttle(pageactive, 5000, {
    trailing: false
  });
  throttled_pageactive();
  window.addEventListener('mousedown', function(){
    return throttled_pageactive();
  });
  window.addEventListener('mousemove', function(){
    return throttled_pageactive();
  });
  window.addEventListener('scroll', function(){
    return throttled_pageactive();
  });
  window.addEventListener('mousewheel', function(){
    return throttled_pageactive();
  });
  window.addEventListener('keydown', function(){
    return throttled_pageactive();
  });
  window.addEventListener('touchstart', function(){
    return throttled_pageactive();
  });
  /*
  main = ->
    #console.log 'running main in browsing_history'
    setInterval ->
      item = {host: window.location.host, url: window.location.href, timestamp: Date.now(), time: new Date().toString()}
  
  
    , 5000
    addtolist 'browsing_time_by_site', item
  */
}).call(this);
