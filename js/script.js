/* Author: Will Shown & Vail Gold */

(function(window, $, Modernizr, Raphael, _) {

  var Cinch = function () {

    this.initApp = function () {
      $('body').css({
        overflow: 'hidden',
        'padding-top': 40
      }).append(
        '<script type="text/javascript" src="js/libs/scion.js"><\/script>' +
          '<script type="text/javascript" src="js/libs/raphael.free_transform.js"><\/script>'
      );

      $('#app').html(
        '<div class="standard fixed-top-bar">' +
          '<a id="cinch-logo"></a>' +
          '<a href="#" class="volume-icon-link on">' +
          '<img class="on" src="img/volume-on.png" />' +
          '<img class="off" src="img/volume-off.png" />' +
          '</a>' +
          '<ul id="nav-link-list" class="float-right">' +
          '<li><a href="#" class="main active">40 Faces</a></li>' +
          '<li><span>|</span></li>' +
          '<li><a href="#" class="about">About CINCH</a></li>' +
          '<li><span>|</span></li>' +
          '<li><a href="#" class="contact">Contact</a></li>' +
          '</ul>' +
          '</div>' +
          '<div class="standard fixed-bottom-bar">' +
          '<a href="http://www.mcgraw-hill.com/site/tools/terms-of-use" target="_blank">Terms of Use</a>' +
          '<span>|</span>' +
          '<a href="https://www.mheonline.com/pages/display/privacynotice_view" target="_blank">Privacy Notice</a>' +
          '<span>|</span>' +
          '<a href="https://www.mheonline.com/" target="_blank">McGraw Hill Education</a>' +
          '</div>' +
          ''+
          '  <div role="viewport" id="viewport">'+
          ''+
          '    <div role="video" id="video">'+
          '      <video class="faces" id="facesVideo" preload="auto">'+
          '        <source src="video/grid.mp4" type="video/mp4" />'+
          '        <source src="video/grid.ogv" type="video/ogg" />'+
          '      </video>'+
          '      <audio class="faces" id="facesAudio" src="audio/00.m4a" type="audio/x-m4a" preload="auto"></audio>'+
          '    </div>'+
          ''+
          '    <div role="occluder" id="occluder"></div>'+
          ''+
          '  </div>'+
          ''+
          '  <div id="vector-content"></div>'+
          ''+
          '  <div id="hitAreas"></div>'
      );

      this.run();
    };

    this.run = function () {
      /* LOGO PUTTER
      * puts the logo. */
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

      }(window, $, Raphael, _));

      /* VIEW BINDER
       * binds views. */
      (function(window, $, Raphael, _, require){

        /* BUBBLE MAKER
         * yes, it's inside the view binder. */
        var Bubbles = function () {
          var self = this;

          this.paper = Raphael('vector-content', 2985, 3174);

          this.deploy = function(){

            this.bubbles = deployBubbles(this.paper, 3e3, 'easeInOut', 300, 600);

            this.ft = this.paper.freeTransform(this.bubbles);
            this.ft.hideHandles();
      //      this.initWindowResizing();
            return this.bubbles;
          };

          this.initWindowResizing = function() {
            console.log('init window resizing');
            $(window).off('resize').on('resize',function() {
              var anim = self.ft.opts.animate;
              self.ft.opts.animate = false;
              self.ft.attrs.translate.x = ($(window).width() - $('#viewport').width()) / 2;
              self.ft.apply();
              self.ft.opts.animate = anim;
            }).trigger('resize');
          };

          this.destroyWindowResizing = function() {
            console.log('destroy window resizing');
            $(window).off('resize');
          };

          this.transition = function(toState, fromState, duration, easing){
            var bubbleAttrs = {
              main: {
                rotate: 0,
                translate: {x: 0, y: 0},
                center: {x: 2985/2, y: 3174/2}
              },
              contact: {
                rotate: -90,
                translate: {x: 750, y: -860},
                center: {x: 2985/2, y: 3174/2}
              },
              about: {
                rotate: -180,
                translate: {x: -1350, y: -1250},
                center: {x: 2985/2, y: 3174/2}
              }
            };

            // This prevents weird transformations through the origin
            this.ft.opts.animate = false;
            _.extend(this.ft.attrs, bubbleAttrs[fromState]);
            this.ft.apply();
            ///////////////

            this.ft.opts.animate = {'delay': duration, 'easing': easing};
            _.extend(this.ft.attrs, bubbleAttrs[toState]);
            var i;
            var movingBubbles = self[toState+'Bubbles'];
            for(i = 0; i < movingBubbles.length; i++){
              var b = movingBubbles[i];
              var a = Raphael.animation(b[toState+'Pos'], duration, easing);
              b.animate(a);
            }
            this.ft.apply();

            if(fromState === 'main') {
              // Video should go out of the bottom left
              $('#viewport').animate({top: $(window).height()+1000, left: -$(window).width()-1000}, duration);

              // TODO: Volume should fade out, with callback of video stopping and seeking to beginning


            } else if(fromState === 'about') {
              // Fade out text from about bubbles
            } else if(fromState === 'contact') {
              // TODO: Check for mini bubbles, and destroy them and text inside of them
              if(typeof(self.contactBubbles.bubbleSet) !== 'undefined') {
                for(var i=0; self.contactBubbles.bubbleSet[i]; i++) {
                  self.contactBubbles.bubbleSet[i].remove();
                }
                self.contactBubbles.bubbleSet = [];
              }
              if(typeof(self.contactBubbles.textSet) !== 'undefined') {
                for(var i=0; self.contactBubbles.textSet[i]; i++) {
                  self.contactBubbles.textSet[i].remove();
                }
                self.contactBubbles.textSet = [];
              }
            }

            if(toState === 'main') {
              // Video should come from the bottom left
              $('#viewport').animate({top: 0, left: 0}, duration, function() {
                // TODO: Video should do something when it enters the viewing area
              });

            } else if(toState === 'contact') {
              setTimeout((function() {
                // Create mini bubbles from the left side of the larger bubble, around the bottom, counter-clockwise.
                var bbox = self.contactBubbles[0].getBBox();
                var x = bbox.x;
                var y = bbox.y;
                var h = bbox.height;
                var w = bbox.width;

                var x0, x1, x2, x3, y0, y1, y2, y3;
                x0 = x+w/12;
                x1 = x+w/12;
                x2 = x+w*3/5;
                x3 = x+w;

                y0 = y+h*3/4;
                y1 = y+h*19/20;
                y2 = y+h*6/5;
                y3 = y+h;

                var miniBubbles = [];
                for(var i=0; i < 5; i++) {
                  var o = (0.2+(Math.random()*0.3)).toFixed(2);
                  var b = self.paper.circle(x0, y0, 0).attr({
                    'stroke-opacity': 0,
                    fill: '0-rgba(0,151,219,'+o+')-rgba(0,100,178,'+o+')',
                    'fill-opacity': .4
                  }).toBack();
                  miniBubbles.push(b);
                }

                var maxTime = 1000;
                var maxRadius = 45;
                for(var i=0; miniBubbles[i]; i++) {
                  var delay = maxTime/5*i+Math.sqrt(i*5000);
                  var duration = maxTime-delay;
                  var finalRadius = maxRadius+Math.pow(i,1.5)*5;
                  if(typeof(miniBubbles[i+1]) === 'undefined') finalRadius = 200;
                  animateBubble(miniBubbles[i], delay, duration, maxTime, makeCBXFunction(x0, x1, x2, x3), makeCBYFunction(y0, y1, y2, y3), finalRadius);
                }

                self.contactBubbles['bubbleSet'] = miniBubbles;

                // TODO: Put text into largest two bubbles, and set mouseover, mouseout, and click events.
                setTimeout((function() {
                  if(self.contactBubbles.bubbleSet[0] && self.contactBubbles.bubbleSet[1]) {
                    self.contactBubbles['textSet'] = [];
                    var defaultOpacity = .8;
                    var hoverOpacity = 1;

                    var mouseOverCallback = function() {
                      var tempBubble = typeof(this['bubbleObject']) !== 'undefined' ? this['bubbleObject'] : this;
                      tempBubble.attr({'opacity': hoverOpacity, 'cursor': 'pointer'});
                    };

                    var mouseOutCallback = function() {
                      var tempBubble = typeof(this['bubbleObject']) !== 'undefined' ? this['bubbleObject'] : this;
                      tempBubble.attr({'opacity': defaultOpacity, 'cursor': 'pointer'});
                    };

                    var clickCallback = function() {
                      var tempBubble = typeof(this['bubbleObject']) !== 'undefined' ? this['bubbleObject'] : this;
                      if(tempBubble.textObject.code === 'emailUs') {
                        window.open('mailto:', '_blank');
                      } else {
                        window.open('http://mheducation.force.com/MHE/SEG_Sampling_Leads?id=701C0000000UKSx', '_blank');
                      }
                    };

                    var bbox = self.contactBubbles.bubbleSet[1].getBBox();
                    var emailLink = self.paper.text(bbox.x+bbox.width/2, bbox.y+bbox.height/2, 'Email us').attr({
                      'text-anchor': 'middle',
                      'stroke-opacity': 0,
                      'font-family': 'Arial, sans',
                      'fill': '#ffffff',
                      'font-size': 15,
                      'fill-opacity': 0,
                      'cursor': 'pointer'
                    }).animate({'fill-opacity':1}, 500);

                    emailLink.mouseover(mouseOverCallback).mouseout(mouseOutCallback).click(clickCallback);
                    self.contactBubbles.bubbleSet[1].attr({'cursor': 'pointer'}).animate({'fill-opacity': defaultOpacity}, 500);
                    emailLink['bubbleObject'] = self.contactBubbles.bubbleSet[1];
                    emailLink['code'] = 'emailUs';
                    self.contactBubbles.bubbleSet[1]['textObject'] = emailLink;
                    self.contactBubbles['textSet'].push(emailLink);

                    bbox = self.contactBubbles.bubbleSet[0].getBBox();
                    var contactLink = self.paper.text(bbox.x+bbox.width/2, bbox.y+bbox.height/2, 'Contact\nForm').attr({
                      'text-anchor': 'middle',
                      'stroke-opacity': 0,
                      'font-family': 'Arial, sans',
                      'fill': '#ffffff',
                      'font-size': 17,
                      'fill-opacity': 0,
                      'cursor': 'pointer'
                    }).animate({'fill-opacity':1}, 500);

                    contactLink.mouseover(mouseOverCallback).mouseout(mouseOutCallback).click(clickCallback);
                    self.contactBubbles.bubbleSet[0].attr({'cursor': 'pointer'}).animate({'fill-opacity': defaultOpacity}, 500);
                    contactLink['bubbleObject'] = self.contactBubbles.bubbleSet[0];
                    contactLink['code'] = 'contactForm';
                    self.contactBubbles.bubbleSet[0]['textObject'] = contactLink;
                    self.contactBubbles['textSet'].push(contactLink);
                  }
                }), maxTime+200);
              }), duration+10)
            } else if(toState === 'about') {
              setTimeout((function() {
                var clickInterval = setInterval((function() {
                  if(bubbles.aboutBubbles[0].attrs.r === 50) {
                    bubbles.aboutBubbles[0].events[2].f.call(bubbles.aboutBubbles[0]);
                    clearInterval(clickInterval);
                  }
                }), 10);
              }), duration)
            }
          };

          function animateBubble(bubble, delay, duration, maxTime, eqX, eqY, finalRadius) {
            setTimeout((function() {
              var timer = 0;
              if(typeof(bubble.attrs) !== 'undefined') {
                var initialRadius = bubble.attrs.r;
                setInterval((function() {
                  if(timer >= duration || typeof(bubble.attrs) === 'undefined') {
                    clearInterval(this);
                  } else {
                    var time = timer/maxTime;
                    var newXT = eqX(time);
                    var newYT = eqY(time);
                    if(!isNaN(newXT) && !isNaN(newYT)) {
                      bubble.attr({cx: newXT, cy: newYT, r: time*(finalRadius-initialRadius)});
                    }
                    timer += 10;
                  }
                }), 10);
              }
            }), delay);
          }

          function makeCBXFunction(x0, x1, x2, x3) {
            return function(t) {
              return (1-t)*(1-t)*(1-t)*x0 + 3*t*(1-t)*(1-t)*x1 + 3*t*t*(1-t)*x2 + t*t*t*x3;
            };
          }

          function makeCBYFunction(y0, y1, y2, y3) {
            return function(t) {
              return (1-t)*(1-t)*(1-t)*y0 + 3*t*(1-t)*(1-t)*y1 + 3*t*t*(1-t)*y2 + t*t*t*y3;
            };
          }

          function displayIntro(paper){
            var s = paper.set();
            s.push(paper.circle(450, 350, 200).attr({
              'fill': '0-rgba(0,151,219,0.7)-rgba(0,100,178,0.7)',
              'stroke-opacity': 0
            }).toFront());
            s.push(paper.text(450, 350, "See how teachers,\nadministrators and\nparents are using\nCinch technology\ntoday.").attr({
              'text-anchor': 'middle',
              'stroke-opacity': 0,
              'fill': '#ffffff',
              'font-size': 28
            }).toFront());
            return s;
          }

          function deployBubbles(paper, duration, easing, delta, introFadeOut) {

            self.mainBubbles = [];
            self.aboutBubbles = [];
            self.contactBubbles = [];

            var mainAttributes = {
      //        cx: [-237, -135, 1059, 1144, 796, 1012, 1466, 1077, 661,  216,  580, 1509],
      //        cy: [-182,  203, -400, -499,  15,  202,  717, 1000, 881, 1294, 1169, 1832],
      //        r:  [ 530,  216,  641,  626, 156,  216,  646,  216, 216,  630,  216,  216]
      //                    #                        #     #      ##                 #
              cx: [-237, -1000, -135, 1059, 1144,   796,  1012,  1012, 1466, 1077,    0,  216,  580],
              cy: [-182,  -182,  203, -400, -499, -1000, -1202, -1202,  717, 1000, 1381, 1294, 1169],
              r:  [ 530,   530,  216,  641,  626,   156,   216,   216,  646,  216,  216,  630,  216]
            };

            var aboutAttributes = {
              cx: [null, 1060, null, null, null,  995, 1010, null, null, 1015, null, null, null],
              cy: [null, 1765, null, null, null, 1565, 1670, null, null, 1460, null, null, null],
              r:  [null,   50, null, null, null,   50,   50, null, null,   50, null, null, null],
              e:  [null, 'cinch', null, null, null, 'students', 'course', null, null, 'classroom', null, null, null]
            };

            var contactAttributes = {
              cx: [null, null, null, null, null, null, null, 1986, null, null, null, null, null],
              cy: [null, null, null, null, null, null, null, -168, null, null, null, null, null],
              r:  [null, null, null, null, null, null, null,  156, null, null, null, null, null]
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
            var defaultOpacity = .8;
            var hoverOpacity = 1;
            var disabledOpacity = .1;

            for(i=0; i<mainAttributes.cx.length; i+=1){
              var o = (0.2+(Math.random()*0.3)).toFixed(2);
              var fill = '0-rgba(0,151,219,'+o+')-rgba(0,100,178,'+o+')';
              var finalAttrs = {
                cx: mainAttributes.cx[i],
                cy: mainAttributes.cy[i],
                r:  mainAttributes.r[i]
              };
              var a = Raphael.animation(finalAttrs, duration, easing);
              var b = paper.add([_.extend({ fill: fill }, startingAttributes, defaultAttributes)])[0];
              b.toBack();

              b.mainPos = {
                cx: mainAttributes.cx[i],
                cy: mainAttributes.cy[i],
                r:  mainAttributes.r[i]
              };
              self.mainBubbles.push(b);

              if(aboutAttributes.cx[i] !== null) {
                var mouseOverCallback = function() {
                  var tempBubble = typeof(this['bubbleObject']) !== 'undefined' ? this['bubbleObject'] : this;
                  if(tempBubble.attrs.r === 50 && (typeof(self['animateInProgress']) === 'undefined' || self['animateInProgress'] === false)) {
                    tempBubble.attr({'opacity': hoverOpacity, 'cursor': 'pointer'});
                  }
                };

                var mouseOutCallback = function() {
                  var tempBubble = typeof(this['bubbleObject']) !== 'undefined' ? this['bubbleObject'] : this;
                  if(tempBubble.attrs.r === 50 && (typeof(self['animateInProgress']) === 'undefined' || self['animateInProgress'] === false)) {
                    tempBubble.attr('opacity', defaultOpacity);
                  }
                };

                var clickCallback = function() {
                  var clickedBubble = typeof(this['bubbleObject']) !== 'undefined' ? this['bubbleObject'] : this;
                  if(clickedBubble.attrs.r === 50 && (typeof(self['animateInProgress']) === 'undefined' || self['animateInProgress'] === false)) {
                    self['animateInProgress'] = true;
                    var duration = 325;

                    clickedBubble.animate({
                      cx: 1310,
                      cy: 1575,
                      r: 275,
                      opacity: hoverOpacity
                    }, duration);

                    clickedBubble.textObjects.link.animate({'fill-opacity': 0}, 100);
                    clickedBubble.textObjects.text.animate({'fill-opacity': 1}, 800, '<>', function() {
                      self['animateInProgress'] = false;
                      for(var j=0; self.aboutBubbles[j]; j++) {
                        if(self.aboutBubbles[j].attrs['fill-opacity'] < defaultOpacity) {
                          self.aboutBubbles[j].attr({'fill-opacity': defaultOpacity});
                        }
                      }
                    });

                    var defaultParams = {r: 50, opacity: defaultOpacity};
                    var viewParams = {
                      'cinch': {cx: 1060, cy: 1765},
                      'course': {cx: 1010, cy: 1670},
                      'students': {cx: 995, cy: 1565},
                      'classroom': {cx: 1015, cy: 1460}
                    };

                    for(var j=0; self.aboutBubbles[j]; j++) {
                      if(self.aboutBubbles[j].code !== clickedBubble.code) {
                        self.aboutBubbles[j].attr({'fill-opacity': disabledOpacity});
                        var params = _.extend(defaultParams, viewParams[self.aboutBubbles[j].code]);
                        self.aboutBubbles[j].animate(params, duration, '<>', function() {
                          this.attr({
                            'fill-opacity': defaultOpacity
                          }).textObjects.link.attr({
                              x: this.attrs.cx,
                              y: this.attrs.cy
                            }).animate({
                              'fill-opacity': 1
                            }, 100);
                        });
                        self.aboutBubbles[j].textObjects.text.animate({'fill-opacity': 0}, 100);
                      }
                    }
                  }
                };

                b.mouseover(mouseOverCallback).mouseout(mouseOutCallback).click(clickCallback);

                b.aboutPos = {
                  cx: aboutAttributes.cx[i],
                  cy: aboutAttributes.cy[i],
                  r:  aboutAttributes.r[i]
                };

                b['code'] = aboutAttributes.e[i];

                var aboutCopy = {
                  'cinch': {
                    'link': 'About\nCINCH',
                    'title': 'CINCH Learning',
                    'subtitle': 'Make it Personal',
                    'text': "No one else connects with, engages or excites\n" +
                      "students exactly like you. With CINCH Learning\n" +
                      "you’re in control of how and what you teach like\n" +
                      "never before. CINCH Learning provides convenient\n" +
                      "cloud-based access to quality math and science\n" +
                      "content for grades 5-12 along with robust planning\n" +
                      "and assessment tools. Choose what you want to\n" +
                      "teach, what resources you want to use, and what\n" +
                      "device you want to use to deliver the lesson.\n" +
                      "Put it all together to create a compelling learning\n" +
                      "experience that is uniquely yours and highly\n" +
                      "personalized to your students.\n \n" +
                      "Get up close and personal with CINCH. Explore\n" +
                      "this site and then contact us for a product demo."
                  },
                  'course': {
                    'link': 'Your\nCourse',
                    'title': 'Your Course',
                    'subtitle': 'Personalize content',
                    'text': "You know what you want to teach and how you\n" +
                      "want to teach it. CINCH puts all the resources you\n" +
                      "need in one place to use any way you want.\n \n" +
                      "Choose from thousands of pre-built lessons to\n" +
                      "create your own unique scope and sequence.\n \n" +
                      "Customize lessons to match your personal teaching\n" +
                      "style. Add and use your own favorite content.\n \n" +
                      "Integrate videos, games, interactive labs and\n" +
                      "other multimedia assets."
                  },
                  'students': {
                    'link': 'Your\nStudents',
                    'title': 'Your Students',
                    'subtitle': 'Personalize learning',
                    'text': "You’ve got students who love math and\n" +
                      "science and students who haven’t yet unlocked\n" +
                      "the secrets. With CINCH, you can meet all\n" +
                      "their needs.\n \n" +
                      "Assign content, assessments, homework, and\n" +
                      "even games to each individual student based\n" +
                      "on specific learning needs.\n \n" +
                      "Encourage collaboration and communication\n" +
                      "with built-in social networking tools.\n \n" +
                      "Keep learning active with IWBs, student\n" +
                      "response systems, and hundreds of\n" +
                      "multimedia resources."
                  },
                  'classroom': {
                    'link': 'Your\nClassroom',
                    'title': 'Your Classroom',
                    'subtitle': 'Personalize the experience',
                    'text': "Wherever your classroom is in the digital\n" +
                      "transition, CINCH is right there with you\n" +
                      "helping you make the most of your school’s\n" +
                      "technology resources.\n \n" +
                      "Access and edit content from any device –\n" +
                      "desktops, laptops, IWBs, tablets or smartphones.\n" +
                      "Plan, assess and communicate on-the-go\n" +
                      "with the CINCH app.\n \n" +
                      "Always have the latest resources aligned to the\n" +
                      "most current standards with real-time updates.\n" +
                      "Integrate print and digital with print\n" +
                      "on demand options."
                  }
                };

                // Create text element in Raphael
                var link = paper.text(aboutAttributes.cx[i], aboutAttributes.cy[i], aboutCopy[b.code].link).attr({
                  'text-anchor': 'middle',
                  'stroke-opacity': 0,
                  'font-family': 'Arial, sans',
                  'fill': '#ffffff',
                  'font-size': 16,
                  'fill-opacity': 1,
                  'cursor': 'pointer'
                }).rotate(-180);

                // Add reference to bubble object to text objects for events
                link['bubbleObject'] = b;
                link.mouseover(mouseOverCallback).mouseout(mouseOutCallback).click(clickCallback);

                var textSet = paper.set();
                var title = paper.text(1460, 1755, aboutCopy[b.code].title).attr({
                  'text-anchor': 'end',
                  'stroke-opacity': 0,
                  'fill': '#ffffff',
                  'font-family': 'Arial, sans',
                  'font-size': 32,
                  'fill-opacity': 0
                });
                textSet.push(title);

                var subtitle = paper.text(1460, 1715, aboutCopy[b.code].subtitle).attr({
                  'text-anchor': 'end',
                  'stroke-opacity': 0,
                  'fill': '#ffffff',
                  'font-family': 'Arial, sans',
                  'font-size': 26,
                  'fill-opacity': 0
                });
                textSet.push(subtitle);

                var textLines = aboutCopy[b.code].text.split('\n');
                for(var j=0; textLines[j]; j++) {
                  textSet.push(
                    paper.text(1460, 1680-j*20, textLines[j]).attr({
                      'text-anchor': 'end',
                      'stroke-opacity': 0,
                      'fill': '#ffffff',
                      'font-family': 'Arial, sans',
                      'font-size': 14,
                      'fill-opacity': 0
                    })
                  );
                }

                textSet.rotate(-180);
                textSet['bubbleObject'] = b;
                b['textObjects'] = {
                  link: link,
                  text: textSet
                };
                self.aboutBubbles.push(b);
              }

              if(contactAttributes.cx[i] !== null){
                b.contactPos = {
                  cx: contactAttributes.cx[i],
                  cy: contactAttributes.cy[i],
                  r:  contactAttributes.r[i]
                };
                b.attr({'fill-opacity': 1});

                var contactCopy = {
                  'title': 'Contact Us',
                  'text': "For more information, about\n" +
                    "please CINCH Learning, please\n" +
                    "email us or use our contact form."
                };

                var contactTextSet = paper.set();
                var contactTitle = paper.text(2030, -280, contactCopy.title).attr({
                  'text-anchor': 'middle',
                  'stroke-opacity': 0,
                  'fill': '#ffffff',
                  'font-family': 'Arial, sans',
                  'font-size': 32,
                  'fill-opacity': 1
                });
                contactTextSet.push(contactTitle);

                var contactTextLines = contactCopy.text.split('\n');
                for(var k=0; contactTextLines[k]; k++) {
                  contactTextSet.push(
                    paper.text(1995-k*20, -280, contactTextLines[k]).attr({
                      'text-anchor': 'middle',
                      'stroke-opacity': 0,
                      'fill': '#ffffff',
                      'font-family': 'Arial, sans',
                      'font-size': 14,
                      'fill-opacity': 1
                    })
                  );
                }

                contactTextSet.rotate(90).attr({'text-anchor': 'start'});
                contactTextSet['bubbleObject'] = b;
                b['textObjects'] = {
                  text: contactTextSet
                };
                self.contactBubbles.push(b);
              }

              b.mainPos = finalAttrs;
              b.animate(a.delay(delta * i));
            }

            var bubbleSet = paper.setFinish();

            function triggerBubblesComplete(){
              var fadeOut = function(){intro.animate({'opacity': 0}, introFadeOut, easing, function(){intro.forEach(function(e){e.remove()})});};
              $('body').trigger('bubbles:complete',[fadeOut]);
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

        window.bubbles = bubbles;

        $(document).ready(function(){

          var $body = $('body');

          scion.urlToModel("scxml/40faces.sc.xml",function(err,model){

            if(err) throw err;

            var interpreter = new scion.SCXML(model);

            interpreter.start();

            window.interpreter = interpreter;

            interpreter.gen({name:"init",data:initData});

            function handleEvent(e){
              try{e.preventDefault();}catch(e){}
              interpreter.gen({name : e.type,data: e});
            }

            //connect all relevant event listeners:

            //NAVIGATION:
            var duration = 1000;
            var navCallback = function(event) {
              event.preventDefault();
              var target = (event.target.className === 'about' ? 'About' : (event.target.className === 'contact' ? 'Contact' : 'Main'));
              window.blurb.removeObjectSet();
              $(this).off('click').on('click', function(e) {e.preventDefault()});
              var _this = this;
              interpreter.gen({name : 'to'+target, data: {bubbles: bubbles, duration: duration}});
              setTimeout((function() {
                $(_this).off('click').on('click', navCallback);
              }), duration+1);
            };

            $('#nav-link-list a').on('click', navCallback);

            //LOADING MEDIA:
            var media, introFadeOut, blurb;

            var mediaComplete = $.Deferred(function (dfd) {
                $body.on('media:complete', function (e, m) {
                  media = m;
                  dfd.resolve();
                });
              }).promise();

            var bubblesComplete = $.Deferred(function (dfd) {
                $body.on('bubbles:complete', function (e, i) {
                  introFadeOut = i;
                  dfd.resolve();
                });
              }).promise();

            $.when(mediaComplete, bubblesComplete).done(function(){
                window.video = video;
                introFadeOut.call(this);
                $('#occluder').fadeOut(2e3);
                interpreter.gen({
                  name: 'readyForMain',
                  data: {
                    media: media,
                    blurb: window.blurb
                  }
                });
            });

            //SWITCHING MEDIA:
            $body.off('audioLoaded').on('audioLoaded',function(e, m, track, a){
              interpreter.gen({
                name: 'trackLoaded'
              });
            });
            $body.off('blurbs:animationComplete').on('blurbs:animationComplete',function(e, b){
              interpreter.gen({
                name: 'animationComplete'
              });
            });

            //SWITCHING TRACKS:
            (function(window, $, Raphael, interpreter){

              $('#hitAreas').css('left', -200);
              var paper = Raphael('hitAreas', 1200, 800);
              var circleAttrs = {
                cx:    [294.005, 394.306, 496.028, 596.329,
                  193.482, 293.783, 395.506, 495.807, 595.84,  696.141,
                  143.977, 244.277,     346, 444.301, 544.334, 645.635, 746.802,
                  93.115, 193.416, 295.139, 395.439, 494.473, 594.773, 696.496, 796.797,
                  92.971, 193.271, 294.994, 395.295, 494.328, 594.629, 696.352, 796.652,
                  143.255, 244.556, 346.278, 444.579, 544.612, 645.913, 747.08],

                cy:    [ 90.221,  90.221,  90.221,  90.221,
                  189.901, 189.901, 189.901, 189.901, 189.901, 189.901,
                  291.184, 291.184, 291.184, 291.184, 291.184, 291.184, 291.184,
                  391.505, 391.505, 391.505, 391.505, 391.505, 391.505, 391.505, 391.505,
                  490.827, 490.827, 490.827, 490.827, 490.827, 490.827, 490.827, 490.827,
                  589.289, 589.289, 589.289, 589.289, 589.289, 589.289, 589.289],

                track: [39, 36, 2, 32,
                  27, 4, 29, 10, 14, 5,
                  37, 16, 28, 35, 34, 18, 11,
                  9, 15, 26, 7, 8, 22, 1, 33,
                  19, 6, 38, 17, 3, 40, 25, 13,
                  24, 30, 23, 20, 12, 31, 21]
              };

              var offset = {
                x: 200-45.541,
                y: -42.119
              };

              var radius = 48.661, h;

              for(h=0;h<circleAttrs.cx.length;h+=1){

                var c = paper.add([{
                  type: 'circle',
                  cx: circleAttrs.cx[h] + offset.x,
                  cy: circleAttrs.cy[h] + offset.y,
                  r: radius,
                  fill: '#f00',
                  'stroke-opacity': 0,
                  opacity: 0
                }])[0];

                c.data('track', circleAttrs.track[h]);

                c.click(function(){
                  interpreter.gen({
                    name: 'toSpecific',
                    data: {
                      circle: this,
                      track: this.data('track')
                    }
                  });
                });

            }

            }(window, $, Raphael, interpreter));

          });
        });

      }(window, $, Raphael, _, require));

      /* BLURBS */
      (function(window, $){

        var Blurb = function(){
          var self = this;

          this.objectSet = null;
          this.callouts = [["Quality digital content for safe student use",
            "Hands-on activities and digital assets complement classroom learning",
            "Designed for group and independent assignments. No pop-ups or ads."],
            ["Complete integration makes the best use of my time",
              "Dynamic and editable yearly planning tool",
              "Instantly pull reports of student comprehension of standards"],
            ["Dynamic lessons with a few classroom devices",
              "Manage the classroom from a single point: present activities using your laptop and IWB",
              "Online labs for seamless collaboration and on-demand printing"],
            ["21st century skill-building",
              "Multi-strategy learning options and assessments available online",
              "Web 2.0 tools prepare students for college and online standardized tests"],
            ["Interactives features get students engaged",
              "Interactive iPad tools for dynamic explanations and learning",
              "Videos, tutorials, virtual labs, and games bring content to life"],
            ["Online personal tutors build confidence",
              "Each lesson has videos and guidance for continuous access to concepts",
              "Games and animation for hands-on learning beyond the classroom"],
            ["Integrate coursework with social media",
              "Students use social networking features to discuss lessons and homework",
              "Monitor the conversation to keep tabs on where students struggle"],
            ["Real-world interactive experiences",
              "Online assessments with simple auto-grade online assessments",
              "Diverse, multimedia homework options for matching learning style to student need"],
            ["Out-of-class support for a flipped classroom",
              "Reading and multimedia assets for at home learning",
              "Collaborative lessons for classroom support flipped learning model"],
            ["Seamlessly blend digital and print",
              "Customize note-taking guides for your program",
              "Print drills and homeworks on demand"],
            ["Real-time progress reports",
              "Teachers and administrators can assess student progress",
              "Seamless integration for administrators"],
            ["Instant Assessment, Remediation, and Enrichment",
              "Instantly assess student learning levels",
              "Access to materials from all grades",
              "Reach content from other grades for reteach and challenge exercises"],
              ["Optimized lessons for ELL students",
              "Emphasis on vocabulary development builds language and skill comprehension",
              "Hands-on, animated supplements provide extra support for language challenge"],
            ["Virtual labs for flawless experiments",
              "Visual and experiential learning despite budgets",
              "Online access to labs for absent students"],
            ["Interactive tools backed by real lessons",
              "Virtual labs, animations, and tutorials keep students engaged",
              "Save all videos and materials you’ve collected in the planner"],
            ["Curated lessons with creative teaching styles",
              "Develop unique programs",
              "Import and house additional material onto CINCH platform"],
            ["Streamline accountability",
              "Pull instant assessments of student progress",
              "Both teachers and administrators can track classroom progress"],
            ["Online, Customized Assessments",
              "Customize assessment for individual students",
              "No more copying: assessments assigned and completed online",
              "Prepares students for new online state assessments"],
            ["Activities that capture student attention",
              "Tools for making lessons more dynamic",
              "Students have fun with wideos, virtual labs, social networking tools"],
            ["Collaboratively plan the week from the CINCH app",
              "Planner tool makes it easy to follow scope and sequence",
              "Plan as a group and tweak day-by-day using the CINCH app"],
            ["Universal access",
              "On-demand printing and smartphone access ensures all students can access homework",
              "Tailor homework help to specific student needs"],
            ["Transforming iPads into classroom tools",
              "Cloud-based system allows you to access, save, and resume work from multiple devices",
              "Tools and resources optimized for iPad integration"],
            ["Teach, assign, assess: all in one place",
              "Cloud-based system allows access from any device",
              "Tailor lessons to your teaching style"],
            ["Customizable IWB activities",
              "Create original, dynamic IWB presentations, preloaded with slides that you can customize",
              "Keep IWB presentations and any digital content in one place"],
            ["Easy to adopt CCSS",
              "Browse, search, and assess student comprehension by standard",
              "Align standard reports with lessons for easy CCSS integration"],
            ["Build a custom scope and sequence",
              "Digitally distribute your curriculum and order custom printing of textbooks and materials",
              "Create unique curriculum to match my curriculum map"],
            ["Easy to use and customize",
              "Easy to navigate and simple customization tool makes it easy to add additional content",
              "Preloaded with resources for standard scope and sequences"],
            ["Cloud-based software works on any device",
              "Works on any device, providing flexibility to update technology as needed",
              "Perfect for adapting to changing classroom technology"],
            ["Makes it easy to align curriculum with CCSS",
              "Align curriculum map with standards and assess students understanding of concepts",
              "Multiple learning models makes it accessible for any student"],
            ["Optimal guide for new teachers",
              "Comes with assets and resources, organized by lesson and standard",
              "One-stop-shop for plans, presentations, and supplemental resources"],
            ["Teach in the order you choose",
              "Collect all your teaching materials in one place: Rearrange content for your teaching style",
              "Make material instantly available to students with a few clicks"],
            ["Easy for parents to stay connected to classroom",
              "Parents can access student progress reports online",
              "Provides refresher material and tutorials online for interested parents"],
            ["The most up-to-date curriculum for your budget",
              "Modern digital platforms and Access to 6-12 curriculum for efficient use of budgets",
              "Universal device optimization for efficient technology spending"],
            ["Works seamlessly on all devices",
              "Cloud-based software works on any device",
              "Safe website for students to surf at school or at home"],
            ["The most current content",
              "Online platform with current content that’s researched, proven, teacher-approved",
              "Universal device optimization for efficient technology spending"],
            ["Customize to your teaching style",
              "Create new or edit existing interactive lesson presentations",
              "Plan, leave notes and assign homework all from one place"],
            ["Cost Effective",
              "Includes supplementary materials for above and below learners",
              "Monitor student progress and administer extra support all from one place"],
            ["Customized Printing",
              "Print workbooks for students with limited technology access",
              "Design unique note-taking pages to help guide students through lessons"],
            ["All your files organized in one place",
              "Easy prep: plan, teach, assess, remediate all from the online platform",
              "Browse multimedia assets, worksheets, and activities by standard or lesson"],
            ["Easy to integrate technology into the classroom",
              "Huge library of engagement resources",
              "Bring labs and lessons online with follow up exercises "]];

          this.textToLines = function (text, CHARLIMIT) {
            if(typeof(CHARLIMIT) === 'undefined') CHARLIMIT = 32;
            var textLines = [];
            var tempLine, tempArray;
            var tempText = text;
            while(tempText.length > 0) {
              tempLine = $.trim(tempText.substr(0, CHARLIMIT));
              // Test if we're in the middle of a word
              if(tempText.charAt(CHARLIMIT) !== ' ' && tempText.charAt(CHARLIMIT) !== '') {
                // Remove anything after the last space
                tempArray = tempLine.split(' ');
                tempArray.pop();
                tempLine = tempArray.join(' ');
              }
              textLines.push(tempLine);
              tempText = tempText.substr(tempLine.length+1);
            }
            return textLines;
          };

          this.display = function (circle) {
            this.removeObjectSet();

            var track = circle.data('track');
            if([39, 36, 27, 4, 29].indexOf(track) > -1) {
              this.direction = 'bottomright';

            } else if([2, 32, 10, 14, 5].indexOf(track) > -1) {
              this.direction = 'bottomleft';

            } else if([37, 16, 28, 35, 9, 15, 26, 7, 19, 6, 38, 17, 24, 30, 23, 20].indexOf(track) > -1) {
              this.direction = 'topright';

            } else if([34, 18, 11, 8, 22, 1, 33, 3, 40, 25, 13, 12, 31, 21].indexOf(track) > -1) {
              this.direction = 'topleft';

            } else {
              // this shouldn't happen
              this.direction = 'bottomright';
            }

            var paper = circle.paper;
            var objectSet = paper.set();
            var bbox = circle.getBBox();
            var middle = bbox.x + bbox.width/2;

            var initialPath, p, finalPath, rotation, transformString;
            if(['topright', 'topleft'].indexOf(this.direction) > -1) {

              initialPath = "M" + (middle + 0.5) + "," + bbox.y +
                "A" + (bbox.width / 2 - 1) + "," + (bbox.height / 2 - 1) + " 0 1,1 " + (middle - 0.5) + "," + bbox.y +
                "A" + (bbox.width / 2 - 1) + "," + (bbox.height / 2 - 1) + " 0 1,0 " + (middle + 0.5) + "," + bbox.y + "Z";

              p = paper.path(initialPath).attr({
                fill: '0-rgb(0,151,219)-rgb(0,100,178)',
                'stroke-opacity': 0,
                opacity:.7
              });

              finalPath = "M" + (middle + 0.5) + "," + bbox.y +
                "A200,200 0 1,1 " + (middle - 0.5) + "," + bbox.y +
                "A" + (bbox.width / 2 - 1) + "," + (bbox.width / 2 - 1) + " 0 1,0 " + (middle + 0.5) + "," + bbox.y + "Z";

              rotation = this.direction === 'topright' ? -135 : 135;
              transformString = "R" + rotation + "," + middle + "," + (bbox.y + bbox.height / 2);

            } else if(['bottomright', 'bottomleft'].indexOf(this.direction) > -1) {

              initialPath = "M" + (middle - 0.5) + "," + (bbox.y + bbox.height) +
                "A" + (bbox.width / 2 - 1) + "," + (bbox.height / 2 - 1) + " 0 1,1 " + (middle + 0.5) + "," + (bbox.y + bbox.height) +
                "A" + (bbox.width / 2 - 1) + "," + (bbox.height / 2 - 1) + " 0 1,0 " + (middle - 0.5) + "," + (bbox.y + bbox.height) + "Z";

              p = paper.path(initialPath).attr({
                fill: '0-rgb(0,151,219)-rgb(0,100,178)',
                'stroke-opacity': 0,
                opacity:.7
              });

              finalPath = "M" + (middle - 0.5) + "," + (bbox.y + bbox.height) +
                "A200,200 0 1,1 " + (middle + 0.5) + "," + (bbox.y + bbox.height) +
                "A" + (bbox.width / 2 - 1) + "," + (bbox.width / 2 - 1) + " 0 1,0 " + (middle - 0.5) + "," + (bbox.y + bbox.height) + "Z";

              rotation = this.direction === 'bottomleft' ? -180 : 180;
              transformString = "R" + rotation + "," + middle + "," + (bbox.y + bbox.height / 2);

            }

            p.animate({path: finalPath, transform: transformString}, 500, 'linear', function () {
              $('body').trigger('blurbs:animationComplete', [self]);
            });

            objectSet.push(p);

            var objectAnimationDuration = 1250;

            var x, y;
            if(this.direction.search('top') > -1) {
              y = bbox.y - 155;

              if(this.direction.search('right') > -1) {
                x = bbox.x;
              } else {
                x = bbox.x - 210;
              }
            } else {
              y = bbox.y + 120;
              x = bbox.x - 115;
            }

            var calloutArray = this.callouts[track-1];

            var i, j, k, tempY;
            var textLines = [];
            for(i=0; calloutArray[i]; i++) {

              textLines.push(this.textToLines(calloutArray[i], i === 0 ? 34 : 48));
              for(j=0; textLines[i][j]; j++) {
                tempY = y +
                  (i > 0 ? 30 * textLines[0].length : 0) +
                  (i > 1 ? 25 * textLines[1].length : 0) +
                  (i > 2 ? 25 * textLines[2].length : 0);

                var t = paper.text(x, tempY + j * (i === 0 ? 28 : 20), textLines[i][j]).attr({
                  'stroke-opacity': 0,
                  fill: 'white',
                  'text-anchor': 'start',
                  'font-size': i === 0 ? 20 : 14,
                  'font-family': 'Arial, sans-serif',
                  'fill-opacity': 0
                }).animate({'fill-opacity': 1}, objectAnimationDuration);

                objectSet.push(t);
              }
            }

            tempY = y +
              (i > 0 ? 30 * textLines[0].length : 0) +
              (i > 1 ? 25 * textLines[1].length : 0) +
              (i > 2 ? 25 * textLines[2].length : 0) +
              (i > 3 ? 25 * textLines[3].length : 0) + 10;

            var tempX;

            if(this.direction.search('bottom') > -1) {
              tempX = bbox.x + bbox.width / 2;
            } else {
              tempX = this.direction.search('left') > -1 ? bbox.x - 75 : bbox.x + 150;
            }

            var link = paper.text(tempX, tempY, 'Learn more').attr({
              'stroke-opacity': 0,
              fill: 'white',
              'text-anchor': 'middle',
              'font-size': 14,
              'font-weight': 'bold',
              'font-family': 'Arial, sans-serif',
              'fill-opacity': 0,
              cursor: 'pointer'
            }).animate({'fill-opacity': 1}, objectAnimationDuration).click(function () {
                $('#nav-link-list a.about').trigger('click');
              });

            objectSet.push(link);

            var linkBBox = link.getBBox();
            var linePath = 'M' + linkBBox.x + ',' + (linkBBox.y + linkBBox.height) +
              'L' + (linkBBox.x + linkBBox.width) + ',' + (linkBBox.y + linkBBox.height) + 'Z';
            var line = paper.path(linePath).attr({
              stroke: 'white',
              'stroke-width': 1,
              fill: 'white',
              opacity: 0,
              cursor: 'pointer'
            }).animate({opacity: 1}, objectAnimationDuration).click(function () {
                $('#nav-link-list a.about').trigger('click');
              });

            objectSet.push(line);

            var image = paper.image('img/circle-close-x.png', tempX - 23, tempY + 30, 46, 46).attr({
              opacity: 0,
              cursor: 'pointer'
            }).animate({opacity: 1}, objectAnimationDuration).click(function () {
                self.removeObjectSet();
              });

            objectSet.push(image);

            this.objectSet = objectSet;
          };

          this.removeObjectSet = function () {
            if(this.objectSet !== null) {
              var tempObjectSet = this.objectSet;
              this.objectSet = null;
              tempObjectSet.animate({opacity: 0}, 150, '<>', function () {
                this.remove();
              })
            }
          };

        };

        window.blurb = new Blurb();

      }(window, $));

      /* MEDIA SUBSTRATE */
      (function(window, $, Modernizr){

        var Media = function(canDoVideo){

          var $body = $('body');
          var $container = $('.faces').parent();

          this.video = {};
          var self = this;

          if(canDoVideo){

            //VIDEO BUSINESS
            var $vid = $('video.faces');
            this.video = $vid.get(0);
            this.video.$el = $vid;

            //AUDIO BUSINESS
            var $aud = $('#facesAudio');
            this.aud = $aud.get(0);
            this.aud.$el = $aud;

            //TRIGGERING COMPLETE AT THE RIGHT MOMENT
            var
              videoReady = $.Deferred(function(dfd){
                $vid.on('canplaythrough', function(){
                  console.log('Video ready!');
                  dfd.resolve();
                });
              }).promise(),
              mainAudReady = $.Deferred(function(dfd){
                $aud.on('canplaythrough', function(){
                  console.log('Audio ready!');
                  dfd.resolve();
                });
              }).promise();
            $.when(videoReady, mainAudReady).done(function(){
              console.log('Media ready!');
              $body.trigger('media:complete',[self]);
            });

            //LOAD STUFF
            this.video.load();
            loadTrack(0);

            //SET UP API
            this.play = function(){
              this.video.play();
              this.aud.play();
            };

            this.pause = function(){
              this.video.pause();
              this.aud.pause();
            };

            this.stop = function(){
              this.pause();
              this.seek(0);
            };

            this.seek = function(t){
              this.video.currentTime = t;
              this.aud.currentTime = t;
            };

            this.load = function(track){
              this.stop();

              $aud.off('canplaythrough').on('canplaythrough',function(){
                $body.trigger('audioLoaded',[self, track, self.aud]);
              });

              loadTrack(track);
            };

            function loadTrack(track){
              if(self.aud.canPlayType('audio/mp4')){
                self.aud.setAttribute('src','audio/' + zeroPad(track, 2) + '.m4a');
                self.aud.setAttribute('type', 'audio/mp4');
              }else
              if(self.aud.canPlayType('audio/ogg')){
                self.aud.setAttribute('src','audio/' + zeroPad(track, 2) + '.ogg');
                self.aud.setAttribute('type', 'audio/ogg');
              }else{
                self.aud.setAttribute('src','audio/' + zeroPad(track, 2) + '.mp3');
                self.aud.setAttribute('type', 'audio/mpeg');
              }
              self.aud.load();
            }

          }else{ ////////////////////////////////////////////////////////////////////

            //VIDEO BUSINESS
            this.video = $f(0);

            //AUDIO BUSINESS
            this.aud = $f(1);

            //TRIGGERING COMPLETE AT THE RIGHT MOMENT
            var
              vReady = $.Deferred(function(dfd){
                self.video.getClip(0).onBufferFull(function(){
                  dfd.resolve();
                });
              }).promise(),
              mainAReady = $.Deferred(function(dfd){
                self.aud.getClip(0).onBufferFull(function(){
                  dfd.resolve();
                });
              }).promise();

            $.when(vReady).done(function(){
              self.video.pause().seek(0);
              console.log('Video ready!');
            });

            $.when(mainAReady).done(function(){
              self.aud.pause().seek(0);
              console.log('Audio ready!');
            });

            $.when(vReady, mainAReady).done(function(){
              console.log('Media ready!');
              $body.trigger('media:complete',[self]);
            });

            //LOAD STUFF
            this.video.play();
            this.aud.play();

            //SET UP API
            this.play = function(){
              if(typeof this.aud.currentIndex !== 'undefined'){
                this.aud.play(this.aud.currentIndex);
              }else{
                this.aud.play(0);
                this.video.seek(0);
              }
            };

            this.pause = function(){
              this.video.pause();
              this.aud.pause();
            };

            this.stop = function(){
              this.video.pause().seek(0);
              this.aud.pause().seek(0);
            };

            this.seek = function(t){
              this.video.seek(t);
              this.aud.seek(t);
            };

            this.aud.onClipAdd(function(Clip, index){
              self.aud.currentClip = Clip;
              self.aud.currentIndex = index;
              Clip.onStart(function(){
                self.video.seek(0);
              });
            });

            this.load = function(track){
              this.pause();
              this.aud.addClip('audio/' + zeroPad(track, 2) + '.m4a');
              var trigger = function(){
                $body.trigger('audioLoaded', [self, track, self.aud]);
              };
              setTimeout(trigger, 0);
            };

          }

          function zeroPad(num, places) {
            var zero = places - num.toString().length + 1;
            return Array(+(zero > 0 && zero)).join("0") + num;
          }

        };

        $(function(){

          var $body = $('body');
          var $container = $('.faces').parent();

          $body.one('shimsLoaded', function(){

            //NEW CODE:

            var media = new Media(Modernizr.video);

            //OLD CODE:

      //      if(Modernizr.video){
      //
      //
      //
      //      }else{
      //
      //        $('canvas').hide();
      //        var v = window.$f(0), $v = $('#facesVideo');
      //
      //        $v.before('<div id="facesVideo_control"></div>');
      //        var $c = $('#facesVideo_control').on('click', function(e){
      //          e.preventDefault();
      //        });
      //        var $resize = $v.add($c);
      //        $resize.css({
      //          position: 'absolute',
      //          top: 0,
      //          left: 0
      //        });
      //
      //        v.getClip(0).onBufferFull(function(){
      //          fitInside($resize, $container);
      //          centerInside($resize, $container);
      //          $body.trigger('media:complete',[v]);
      //          v.getClip(0).onBufferFull(function(){});
      //        });
      //
      //        console.log('Playing');
      //        v.play(0);
      //        console.log('Pausing');
      //        setTimeout(v.pause, 0, 0);
      //      }

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

      })(window, $, Modernizr);
    };

  };

  window.Cinch = Cinch;

})(window, window.jQuery, window.Modernizr, window.Raphael, window._);