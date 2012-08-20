/* Author: Will Shown & Vail Gold */

/* LOGO PUTTER
 *  puts the logo. */
(function(window, $, Raphael, _){

  var paper = Raphael('cinch-logo', 235, 22);
  var logo = paper.path(
    'M10.547,0.49c1.781,0,3.689,0.451,5.726,1.351v4.913c-2.18-1.311-4.089-1.965-5.726-1.965c-1.639,0-2.947,0.562-3.93,1.688' +
    'c-0.982,1.126-1.474,2.641-1.474,4.544c0,1.802,0.517,3.242,1.551,4.322c1.034,1.078,2.416,1.618,4.145,1.618' +
    'c1.514,0,3.325-0.608,5.434-1.826v4.882c-2.364,0.788-4.334,1.182-5.911,1.182c-2.713,0-5.016-0.995-6.908-2.986' +
    'c-1.894-1.99-2.84-4.419-2.84-7.284c0-2.916,0.964-5.385,2.894-7.406C5.437,1.5,7.784,0.49,10.547,0.49z M19.328,20.923h4.345V0.766' +
    'h-4.345V20.923z M41.035,13.723L31.791,0.766h-4.296v20.157h4.345V7.874l9.215,13.049h4.233V0.766h-4.253V13.723z M51.328,3.677' +
    'c-1.93,2.021-2.895,4.489-2.895,7.407c0,2.865,0.945,5.293,2.84,7.284c1.894,1.991,4.196,2.986,6.908,2.986' +
    'c1.576,0,3.546-0.394,5.91-1.183V15.29c-2.108,1.218-3.919,1.827-5.434,1.827c-1.73,0-3.112-0.54-4.145-1.619' +
    'c-1.034-1.08-1.551-2.52-1.551-4.322c0-1.903,0.491-3.418,1.474-4.544c0.983-1.126,2.293-1.688,3.931-1.688' +
    'c1.637,0,3.546,0.655,5.725,1.964V1.996c-2.037-0.9-3.945-1.352-5.725-1.352C55.602,0.645,53.256,1.655,51.328,3.677z M78.797,8.689' +
    'H71.66V0.921h-4.345v20.156h4.345v-8.014h7.138v8.014h4.345V0.921h-4.345V8.689z M100.145,0.865h-2.719v20.144h9.281v-2.719h-6.562' +
    'V0.865z M109.722,21.008h11.162v-2.719h-8.443v-6.925h8.443v-2.72h-8.443V3.616h8.443V0.865h-11.162V21.008z M132.097,0.09' +
    'l9.511,20.918h-2.883l-2.339-5.154h-8.547l-2.312,5.154h-2.862L132.097,0.09z M135.347,13.561l-3.257-7.184l-3.223,7.184H135.347z' +
    'M151.278,12.388l5.852,8.62h-3.156l-5.588-8.285h-0.616v8.285h-2.752V0.865h4.364c2.172,0,3.94,0.54,5.305,1.62' +
    'c1.365,1.08,2.048,2.464,2.048,4.149c0,1.349-0.441,2.54-1.324,3.573C154.526,11.24,153.149,11.966,151.278,12.388z M153.857,6.794' +
    'c0-0.854-0.238-1.552-0.712-2.096c-0.476-0.542-1.107-0.911-1.897-1.106c-0.791-0.195-1.951-0.292-3.479-0.292v7.02' +
    'C151.827,10.405,153.857,9.229,153.857,6.794z M175.97,15.368L161.077,0.059v20.95h2.751V6.7l14.895,15.242V0.865h-2.752V15.368z' +
    'M183.239,21.008h2.72V0.865h-2.72V21.008z M205.576,15.368L190.681,0.059v20.95h2.751V6.7l14.895,15.242V0.865h-2.751V15.368z' +
    'M225.65,10.826v2.751h5.439c-1.033,3.489-3.558,5.234-7.574,5.234c-2.677,0-4.777-0.798-6.3-2.393' +
    'c-1.524-1.595-2.284-3.388-2.284-5.378c0-2.274,0.785-4.17,2.355-5.687s3.535-2.274,5.896-2.274c2.699,0,5.076,1.007,7.131,3.02' +
    'l2.04-2.008c-1.549-1.486-3.065-2.5-4.546-3.043s-3.117-0.814-4.908-0.814c-3.016,0-5.582,1.041-7.701,3.121s-3.178,4.6-3.178,7.56' +
    'c0,2.812,1.035,5.311,3.107,7.497c2.071,2.186,4.846,3.278,8.324,3.278c1.527,0,2.844-0.168,3.945-0.505s2.135-0.897,3.099-1.682' +
    's1.737-1.671,2.315-2.66c0.58-0.989,0.963-1.895,1.147-2.715s0.276-1.921,0.276-3.3H225.65z M88.587,3.414' +
    'c0.061,0.305,0.11,0.415,0.146,0.488h-0.488c-0.061-0.073-0.098-0.244-0.159-0.488c-0.037-0.208-0.159-0.306-0.415-0.306h-0.22' +
    'v0.794h-0.464V1.899c0.183-0.024,0.439-0.061,0.769-0.061c0.378,0,0.549,0.061,0.684,0.159c0.123,0.085,0.208,0.232,0.208,0.427' +
    'c0,0.244-0.183,0.403-0.415,0.477v0.024C88.428,2.986,88.526,3.145,88.587,3.414z M88.147,2.486c0-0.184-0.134-0.306-0.427-0.306' +
    'c-0.122,0-0.208,0.012-0.257,0.024v0.574h0.22C87.94,2.779,88.147,2.693,88.147,2.486z M89.82,2.864' +
    'c0,1.124-0.904,2.015-2.051,2.015s-2.063-0.892-2.063-2.015c0-1.123,0.916-2.002,2.076-2.002C88.917,0.862,89.82,1.741,89.82,2.864z' +
    'M89.307,2.876c0-0.892-0.659-1.612-1.55-1.612c-0.867,0-1.539,0.72-1.539,1.599c0,0.892,0.672,1.6,1.563,1.6' +
    'C88.648,4.476,89.307,3.755,89.307,2.876z'
  );
  logo.attr({
    fill: '#fff',
    'stroke-opacity': 0
  });

}(window, window.jQuery, window.Raphael, window._));

/* VIEW BINDER
 * binds views. */
(function(window, $, Raphael, _, require){

  /* BUBBLE MAKER
   * yes, it's inside the view binder. */
  var Bubbles = function () {
    var self = this;

    this.paper = Raphael('vector-content', 2400, 2400);

    this.deploy = function(){

      this.bubbles = deployBubbles(this.paper, 3e3, 'easeInOut', 300, 600);

      this.ft = this.paper.freeTransform(this.bubbles);
      this.ft.hideHandles();

      $(window).on('resize',function(){
        var anim = self.ft.opts.animate;
        self.ft.opts.animate = false;
        self.ft.attrs.translate.x = ($(window).width() - $('#viewport').width()) / 2;
        self.ft.apply();
        self.ft.opts.animate = anim;
      }).trigger('resize');

      return this.bubbles;
    };

    function displayIntro(paper){
      var s = paper.set();
      s.push(paper.circle(400, 300, 200).attr({
        'fill': '0-rgba(0,151,219,0.7)-rgba(0,100,178,0.7)',
        'stroke-opacity': 0
      }).toFront());
      s.push(paper.text(400, 300, "See how teachers,\nadministrators and\nparents are using\nCinch technology\ntoday.").attr({
        'text-anchor': 'middle',
        'stroke-opacity': 0,
        'fill': '#ffffff',
        'font-size': 28
      }).toFront());
      return s;
    }

    function deployBubbles(paper, duration, easing, delta, introFadeOut) {

      var finalAttributes = {
        cx: [-236.499, -135.166, 1059.167, 1144.167, 795.834, 1011.834, 1466.167, 1076.834, 660.834, 216.169 , 579.834, 1508.834],
        cy: [-182.167,  202.5  , -399.833, -498.833, 14.5   , 201.5   , 717.167 , 999.5   , 880.5  , 1294.167, 1168.5 , 1831.5  ],
        r:  [ 529.502,  216.169,  641.169,  626.169, 156.169, 216.169 , 646.169 , 216.169 , 216.169, 629.502 , 216.169, 216.169 ]
      };

      var startingAttributes = {
        cx: 400,
        cy: 300,
        r: 0
      };

      var defaultAttributes = {
        type: 'circle',
        'stroke-opacity': 0
      };

      var i;

      paper.setStart();

      var intro = displayIntro(paper);

      for(i=0; i<finalAttributes.cx.length; i+=1){
        var o = (0.2+(Math.random()*0.3)).toFixed(2);
        var fill = '0-rgba(0,151,219,'+o+')-rgba(0,100,178,'+o+')';
        var finalAttrs = {
          cx: finalAttributes.cx[i],
          cy: finalAttributes.cy[i],
          r:  finalAttributes.r[i]
        };
        var a = Raphael.animation(finalAttrs, duration, easing);
        var b = paper.add([_.extend({ fill: fill }, startingAttributes, defaultAttributes)])[0];
        b.toBack();
        b.animate(a.delay(delta * i));
      }

      var bubbleSet = paper.setFinish();

      function triggerBubblesComplete(){
        intro.animate({'opacity': 0}, introFadeOut, easing, function(){intro.forEach(function(e){e.remove()})});
        $('body').trigger('bubbles:complete',[bubbleSet]);
      }

      setTimeout(triggerBubblesComplete, ((i * delta) + duration));

      return bubbleSet;
    }

    return this;
  };

  var scion = require('scion');
  var bubbles = new Bubbles();

  var initData = {
    bubbles: bubbles
  };

  $(document).ready(function(){

    scion.urlToModel("scxml/40faces.sc.xml",function(err,model){

      if(err) throw err;

      var interpreter = new scion.SCXML(model);

      interpreter.start();

      interpreter.gen({name:"init",data:initData});

      function handleEvent(e){
        try{e.preventDefault();}catch(e){}
        interpreter.gen({name : e.type,data: e});
      }

      //connect all relevant event listeners
      var video, bSet;
      $('body').on('media:complete',function(e, v){
        video = v;
        checkIfReadyForPlay();
      });
      $('body').on('bubbles:complete',function(e, b){
        bSet = b;
        checkIfReadyForPlay();
      });
      function checkIfReadyForPlay(){
        if(typeof video !== 'undefined' && typeof bSet !== 'undefined'){
          window.video = video;
          interpreter.gen({
            name: 'readyForMain',
            data: {
              video: video,
              occluder: $('#occluder')
            }
          });
        }
      }
    });
  });

}(window, window.jQuery, window.Raphael, window._, window.require));

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

        fitInside($canvas, $container);

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
          $body.trigger('media:complete',[vid]);
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

          fitInside($resize, $container);
          centerInside($resize, $container);

          $body.trigger('media:complete',[v]);

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

  var framerate = 20;

  function draw(v,c,w,h) {
    if(v.paused || v.ended) return false;
    c.drawImage(v,0,0,w,h);
    setTimeout(draw,framerate,v,c,w,h);
  }

})(window, window.jQuery, window.Modernizr);