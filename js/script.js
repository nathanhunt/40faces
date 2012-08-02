/* Author: Will Shown & Vail Gold

*/

(function(window){

  var $ = window.jQuery;
  var Modernizr = window.Modernizr;

  $(function(){

    var $body = $('body');

    $body.on('shimsLoaded', function(){

      var v = $('video.faces').get(0);
      var canvas = $('canvas.faces').get(0);

      if (typeof window.html5media !== "undefined") {
        canvas.onload = semaphore(canvas, v, $);
        v = window.flowplayer(0);
        v.onLoad(function(){
          semaphore(canvas, v, $);
        });
      }else{
        startNative(canvas, v, $);
      }

    });

    Modernizr.load([
      {
        test: Modernizr.canvas && Modernizr.video,
        nope: ['js/libs/flashcanvas.js', 'http://api.html5media.info/1.1.5/html5media.min.js'],
        complete: function(){
          $body.trigger('shimsLoaded');
        }
      }
    ]);

  });

  function draw(v,c,w,h) {
    if(v.paused || v.ended) return false;
    c.drawImage(v,0,0,w,h);
    setTimeout(draw,20,v,c,w,h);
  }

  function startNative(canvas, v, $){
    var context = canvas.getContext('2d');
    var cw, ch;
    var $v = $(v);

    $v.on('play', function(){
      draw(this,context,cw,ch);
    });

    $v.on('canplay', function(){
      cw = v.videoWidth;
      ch = v.videoHeight;
      canvas.width = cw;
      canvas.height = ch;
    });

    $v.on('canplaythrough', function(){
      v.play();
    });

    v.load();
  }

  var sem = 0;

  function semaphore(canvas, v, $) {
    if (sem == 1){startShim(canvas, v, $)}else{sem += 1}
  }

  function drawShim(v, c, w, h){
    console.log('drawing.');
    //TODO: figure out how to pipe the data from the flash-video object to the flash-canvas object so that it works with drawImage(Image,…);
  }

  function startShim(canvas, v, $){
    var context = canvas.getContext('2d');
    var c = v.getClip(0);
    var cw, ch

    c.onStart(function(){
      canvas.width = cw = c.metaData.width;
      canvas.height = ch = c.metaData.height;
      drawShim(this, context, cw, ch);
    });

    v.startBuffering();
    setTimeout(function(){v.play()}, 2000);
  }

})(window);