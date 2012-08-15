/* Author: Will Shown & Vail Gold */

/* BUBBLE MAKER
 * controls… bubbles… */
(function(window, $, Raphael, _){

  $(function(){

    window.paper = Raphael('vector-content', 2400, 2400);
    window.bubbles = addBubbles(paper);

    var ft = paper.freeTransform(window.bubbles);
    ft.hideHandles();
    ft.attrs.rotate = 10;
    ft.apply();

  });

  function addBubbles(paper) {

    var bubbles = [];

    var startingAttributes = {
      cx: [-236.499, -135.166, 1059.167, 1144.167, 795.834, 1011.834, 1466.167, 1076.834, 660.834, 216.169 , 579.834, 1508.834],
      cy: [-182.167,  202.5  , -399.833, -498.833, 14.5   , 201.5   , 717.167 , 999.5   , 880.5  , 1294.167, 1168.5 , 1831.5  ],
      r:  [ 529.502,  216.169,  641.169,  626.169, 156.169, 216.169 , 646.169 , 216.169 , 216.169, 629.502 , 216.169, 216.169 ]
    };

    var defaultAttributes = {
      type: 'circle',
      'stroke-opacity': 0,
      fill: '270-#87E0FD-#53CBF1:40-#05ABE0',
      opacity: 0.5
    };

    var i;
    for(i=0; i<startingAttributes.cx.length; i+=1){
      var bubble = {
        cx: startingAttributes.cx[i],
        cy: startingAttributes.cy[i],
        r: startingAttributes.r[i]
      };
      bubbles.push(
        _.extend(bubble, defaultAttributes)
      );
    }
    paper.setStart();
    paper.add(bubbles);
    return paper.setFinish();
  }

}(window, window.jQuery, window.Raphael, window._));

/* MEDIA CONTROLLER
 * pipe all control APIs to this function. */
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
    var $container = $('.faces').parent();

    $body.one('shimsLoaded', function(){

      if(Modernizr.video){

        var $canvas = $('canvas.faces').css({
          'margin': '0 auto',
          'display': 'block'
        }), canvas = $canvas.get(0);
        var $vid = $('video.faces'), vid = $vid.get(0);

        $(window).on('resize', function(){
          fitInside($canvas, $container);
        }).trigger('resize');

        var context = canvas.getContext('2d');
        var cw, ch;

        $vid.on('play', function(){
          draw(this,context,cw,ch);
        });

        $vid.on('canplay', function(){
          cw = vid.videoWidth;
          ch = vid.videoHeight;
          canvas.width = cw;
          canvas.height = ch;
        });

        $vid.on('canplaythrough', function(){
          $body.trigger('media:complete',[Modernizr.video, vid, canvas]);
        });

        vid.load();

      }else{

        $('canvas').hide();
        var v = window.$f(0), $v = $('#facesVideo');

        $v.before('<div id="facesVideo_control"></div>');
        var $c = $('#facesVideo_control').on('click', function(e){
          e.preventDefault();
        });
        var $resize = $v.add($c);
        $resize.css({
          position: 'absolute',
          top: 0,
          left: 0
        });

        v.onLoad(function(){

          $(window).on('resize', function(){
            fitInside($resize, $container);
            centerInside($resize, $container);
          }).trigger('resize');

          $body.trigger('media:complete',[Modernizr.video, v, $c]);

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
  
  function scaleFactor(ch, cw, th, tw){
    return Math.min(
      (ch/th), (cw/tw)
    );
  }

  function centerInside ($elem, $container) {

    var cW = $container.width();

    return $elem.each(function(){

      var $this = $(this);
      var tW = $this.width();

      $this.css({
        left: (cW - tW) / 2
      });

    });

  }

  function fitInside ($elem, $container) {
    
    var cW = $container.width(), cH = $container.height();

    return $elem.each(function(){
      
      var $this = $(this);
      var oW, oH;

      if($this.data('orig-width') == null){
        oW = parseInt($this.width(),10);
        $this.data('orig-width', oW);
      }else{ oW = parseInt($this.data('orig-width'),10); }

      if($this.data('orig-height') == null){
        oH = parseInt($this.height(),10);
        $this.data('orig-height', oH);
      }else{ oH = parseInt($this.data('orig-height'),10); }

      var s = scaleFactor(cH, cW, oH, oW);

      $this.width (oW * s);
      $this.height(oH * s);
      
    });
  }

  var framerate = 1000/24;

  function draw(v,c,w,h) {
    if(v.paused || v.ended) return false;
    c.drawImage(v,0,0,w,h);
    setTimeout(draw,framerate,v,c,w,h);
  }

})(window, window.jQuery, window.Modernizr);