/* Author: Will Shown & Vail Gold

*/

(function(window){

  var $ = window.jQuery;
  var Modernizr = window.Modernizr;

  Modernizr.load([
    {
      test: Modernizr.canvas,
      nope: ['libs/flashcanvas.js']
    }
  ]);

  $(function(){
    var v = $('video.faces').get(0);
    var canvas = $('canvas.faces').get(0);
    var context = canvas.getContext('2d');
    var cw, ch;


    v.addEventListener('play', function(){
      draw(this,context,cw,ch);
    },false);

    v.addEventListener('canplay', function(){
      cw = v.videoWidth;
      ch = v.videoHeight;
      canvas.width = cw;
      canvas.height = ch;
    });

    v.addEventListener('canplaythrough', function(){
      v.play();
    }, false);

    v.load();

  });

  function draw(v,c,w,h) {
    if(v.paused || v.ended) return false;
    c.drawImage(v,0,0,w,h);
    setTimeout(draw,20,v,c,w,h);
  }



})(window);