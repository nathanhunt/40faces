/* Author: Will Shown & Vail Gold */

/* MEDIA CONTROLLER
 * pipe all abstract commands to this function. */
(function(window, $){

  var $body = $('body');

  $body.one('media:complete', function(e, supportsVideo, v, c){

    v.play();

  });

}(window, window.jQuery));

/* MEDIA SUBSTRATE
 * media:complete is fired on <body> when everything is ready. */
(function(window, $, Modernizr){

  $(function(){

    var $body = $('body');

    $body.one('shimsLoaded', function(){

      if(Modernizr.video){

        var $canvas = $('canvas.faces').css({
          'margin': '0 auto',
          'display': 'block'
        }), canvas = $canvas.get(0);
        var $v = $('video.faces'), vid = $v.get(0);

        var $container = $(window);
        $container.on('resize', function(){
          fitInside($canvas, $container);
        }).trigger('resize');

        var context = canvas.getContext('2d');
        var cw, ch;

        $v.on('play', function(){
          draw(this,context,cw,ch);
        });

        $v.on('canplay', function(){
          cw = vid.videoWidth;
          ch = vid.videoHeight;
          canvas.width = cw;
          canvas.height = ch;
        });

        $v.on('canplaythrough', function(){
          $body.trigger('media:complete',[Modernizr.video, vid, canvas]);
        });

        vid.load();

      }else{

        $('canvas').hide();
        var v = window.$f(0);

        v.onLoad(function(){

          var $v = $('#facesVideo').css('margin', '0 auto');

          var $container = $(window);
          $container.on('resize', function(){
            fitInside($v, $container);
          }).trigger('resize');

          $body.trigger('media:complete',[Modernizr.video, v]);

        });
      }

    });

    Modernizr.load([
      {
        test: Modernizr.video,
        nope: ['http://api.html5media.info/1.1.5/html5media.min.js'],
        complete: function(){
          $body.trigger('shimsLoaded');
        }
      }
    ]);

  });

  function fitInside ($elem, $container) {

    var oW, oH;

    if($elem.data('orig-width') == null){
      oW = parseInt($elem.width(),10);
      $elem.data('orig-width', oW);
    }else{ oW = parseInt($elem.data('orig-width'),10); }

    if($elem.data('orig-height') == null){
      oH = parseInt($elem.height(),10);
      $elem.data('orig-height', oH);
    }else{ oH = parseInt($elem.data('orig-height'),10); }

    var scaleFactor = Math.min(
      ($container.height()/oH),
      ($container.width() /oW));
    $elem.width (oW * scaleFactor);
    $elem.height(oH * scaleFactor);

  }

  var framerate = 1000/24;

  function draw(v,c,w,h) {
    if(v.paused || v.ended) return false;
    c.drawImage(v,0,0,w,h);
    setTimeout(draw,framerate,v,c,w,h);
  }

})(window, window.jQuery, window.Modernizr);