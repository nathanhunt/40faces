/* Author: Will Shown & Vail Gold */

(function(window, $, Raphael) {

  var MobileSite = function () {

    var self = this;

    this.state = 'main';
    this.transitioning = false;
    this.mainPageHeight = 3800;

    this.initApp = function () {

      $('body').css({
        padding: 0,
        margin: 0
      });

      $('#navigation-bubbles').css({width: $(window).width()});

      this.isIPad = !!navigator.userAgent.match(/iPad/i);
      console.log('Is iPad?: ' + this.isIPad);

      var audioTag = '';
      if(this.isIPad){
        audioTag = '<audio preload="auto" />'
      }

      $('#app').html(
        '<div id="navigation-bubbles">' +
          '<a href="#" class="about"><span>About CINCH</span></a>' +
          '<a href="#" class="contact"><span>Contact</span></a>' +
          '<a href="#" class="main"><span>40 Faces</span></a>' +
        '</div>' +
        '<div class="mobile-fixed-top-bar"><a id="mobile-cinch-logo"></a></div>' +
        audioTag +
        '<div id="mobile-vector-content"></div>' +
        '<div id="mobile-footer">' +
          '<a class="logoLink" href="https://www.mheonline.com/" target="_blank"><img src="img/mhe_logo_94x26.png" /></a>' +
          '<a href="http://www.mcgraw-hill.com/site/tools/terms-of-use" target="_blank">Terms</a>' +
          '<span>|</span>' +
          '<a href="https://www.mheonline.com/pages/display/privacynotice_view" target="_blank">Privacy</a>' +
          '<span>|</span>' +
          '<a href="https://www.mheonline.com/" target="_blank">MHEOnline</a>' +
        '</div>'
      );

      this.$audio = $('audio');
      this.audio = this.$audio.get(0);

      this.placeLogo();

      this.paper = Raphael('mobile-vector-content', 2000, 4000);
      this.paper.canvas.style.zIndex = '100';

      this.initNavigation();
      this.initMainPage();
      this.initAboutPage();
      this.initContactPage();
      $(window).on('orientationchange resize', this.adjustViewingArea).trigger('resize');
    };

    this.initNavigation = function () {
      $('#navigation-bubbles a').on('click', function (event) {
        event.preventDefault();
        var toState = $.trim(this.className.replace('active', ''));
        self.transition(toState);
        $('#navigation-bubbles a').removeClass('active');
        $('#navigation-bubbles a.'+toState).addClass('active');

      }).on('touchstart', function () {
          event.preventDefault();
          $(this).on('touchend', function () {
          $(this).trigger('click').off('touchend touchmove');

          }).on('touchmove', function () {
            $(this).off('touchend touchmove');
          });
      });
    };

    this.bindTapCallback = function (obj, cb) {
      var startCallback = function () {
        var active = true;

        setTimeout((function () {
          active = false;
        }), 500);

        var endCallback = function () {
          if(active === true) cb.call(obj);
        };

          obj.touchend(endCallback).touchmove(function () {
            obj.untouchend(endCallback);
          });

          obj.mouseup(endCallback).mousemove(function () {
            obj.unmouseup(endCallback);
          });
      };

        obj.touchstart(startCallback).mousedown(startCallback);
    };

    this.initMainPage = function () {
      var paper = this.paper;

      var data = this.getMainBubblePositionData();

      var imageSet = paper.set();
      var objectSet = paper.set();
      for(var j=0; data[j]; j++) {
        var image = paper.image('img/circle-faces/'+data[j].name+'.png', data[j].x, data[j].y, 100, 100).attr({
          cursor: 'pointer'
        });
        imageSet.push(image);
        objectSet.push(image);

        var imageBubble = paper.circle(data[j].x + 50.5, data[j].y + 50, 48).attr({
          fill: '0-rgb(0,151,219)-rgb(0,100,178)',
          'stroke-opacity': 0
        }).toBack();

        imageBubble.data('track',data[j].name);

        objectSet.push(imageBubble);
        image['bubbleObject'] = imageBubble;
        imageBubble['imageObject'] = image;
        image['set'] = imageSet;
        image['content'] = this.callOuts[j];

        this.bindTapCallback(image, self.mainBubbleClickCallback);
      }

      var ctaBubble = paper.circle(160, 230, 130).attr({
        fill: '0-rgb(0,151,219)-rgb(0,100,178)',
        'stroke-opacity': 0,
        opacity: .7,
        cursor: 'pointer'
      }).toFront();

      var ctaText = paper.text(160, 215, "See how teachers,\nadministrators and\nparents are using\nCinch technology\ntoday.").attr({
        'text-anchor': 'middle',
        'stroke-opacity': 0,
        'font-family': 'Arial, sans',
        'fill': '#ffffff',
        'font-size': 20,
        cursor: 'pointer'
      }).toFront();

      var ctaImage = paper.image('img/circle-close-x.png', 160 - 23, 300, 46, 46).attr({
        cursor: 'pointer'
      });

      ctaImage['textObject'] = ctaText;
      ctaImage['bubbleObject'] = ctaBubble;

      this.bindTapCallback(ctaImage, function () {
        this.animate({opacity:0}, 200, function () {
          this.remove();
          self.mainObjectSet.pop();
          self.mainObjectSet.pop();
          self.mainObjectSet.pop();
        });
        this['textObject'].animate({opacity:0}, 200, function () {
          this.remove();
        });
        this['bubbleObject'].animate({opacity:0}, 200, function () {
          this.remove();
        });
      });

      objectSet.push(ctaImage, ctaText, ctaBubble);
      this.mainObjectSet = objectSet;

      $('#mobile-vector-content').css('height', this.mainPageHeight);
      $('#navigation-bubbles a.main').addClass('active');
    };

    this.getMainBubblePositionData = function () {
      var num = function(x) { return x < 10 ? '0'+x : x+''; };
      var data = [];
      var top = 100;
      for(var i=1; i < 41; i++) {
        data.push({name:num(i), x:10, y:top});
        i++;
        if(i < 41) {
          top += 100;
          data.push({name:num(i), x:60, y:top});
        }
        i++;
        if(i < 41) {
          top += 65;
          data.push({name:num(i), x:155, y:top});
        }
        i++;
        if(i < 41) {
          top += 100;
          data.push({name:num(i), x:210, y:top});
        }
        i++;
        if(i < 41) {
          top += 100;
          data.push({name:num(i), x:155, y:top});
        }
        i++;
        if(i < 41) {
          top += 65;
          data.push({name:num(i), x:60, y:top});
        }
        top += 100;
      }
      return data;
    };

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

    this.mainBubbleClickCallback = function () {
      if(typeof(this['opened']) === 'undefined' || this['opened'] === false) {
        var image = this;
        image['opened'] = true;
        var bub = image['bubbleObject'];

        for(var i=0; image.set[i]; i++) {
          if(image.set[i].bubbleObject.attrs.r > 48) {
            self.mainBubblePopupClose(image.set[i]);
          }
        }

        self.mainObjectSet.push(bub);
        $(window).trigger('resize');

        bub.animate({
          r: 150,
          cx: 160,
          cy: Math.max(bub.attrs.cy, 200),
          opacity: .6
        }, 325, '<>', function() {
          var bub = this;
          var bubImage = bub['imageObject'];
          var textLines = self.textToLines(bubImage.content, 32);

          var paper = self.paper;
          var textObjects = paper.set();
          // Create text elements with Raphael and add to set
          for(var j=0; textLines[j]; j++) {
            var x = bub.attrs.cx - bub.attrs.r * .7;
            var y = bub.attrs.cy - bub.attrs.r / 2 - 5 + j * 20;
            var t = paper.text(x, y, textLines[j]).attr({
              'text-anchor': 'start',
              'stroke-opacity': 0,
              'font-family': 'Arial, sans',
              'fill': '#ffffff',
              'font-size': 14,
              'fill-opacity': 0
            });
            textObjects.push(t);
            self.mainObjectSet.push(t);
          }

          textObjects.animate({'fill-opacity': 1}, 500);

          // circle-close-x.png is 46x46 pixels
          var x = bub.attrs.cx - 23;
          var y = bub.attrs.cy+bub.attrs.r - 51;
          var audioY = bub.attrs.cy - bub.attrs.r + 5;
          var closeImage = paper.image('img/circle-close-x.png', x, y, 46, 46).attr({
            opacity: 0,
            'stroke-opacity': 0,
            cursor: 'pointer'
          }).toFront().animate({opacity: 1}, 500);
          closeImage['textObjects'] = textObjects;
          closeImage['bubbleObject'] = bub;

          console.log('Putting elements - isIpad?: '+!!navigator.userAgent.match(/iPad/i));
          if(!!navigator.userAgent.match(/iPad/i)){
            console.log('Putting play and stop images');
            console.log('x='+x+' y='+y+' audioY='+audioY);
            var playImage = paper.image('img/circle-play.png', x, audioY, 46, 46).attr({
              opacity: 0,
              'stroke-opacity': 0,
              cursor: 'pointer'
            }).toFront().animate({opacity: 1}, 500);
            var stopImage = paper.image('img/circle-stop.png', x, audioY, 46, 46).attr({
              opacity: 0,
              'stroke-opacity': 0,
              cursor: 'pointer'
            }).toFront().animate({opacity: 1}, 500);
            $(stopImage['0']).hide();

            bubImage['playImage'] = playImage;
            bubImage['stopImage'] = stopImage;

            self.mainObjectSet.push(playImage);
            self.mainObjectSet.push(stopImage);

            self.bindTapCallback(playImage, function(){
              self.mainBubblePlayAudio(bubImage);
            });

            self.bindTapCallback(stopImage, function(){
              self.mainBubbleStopAudio(bubImage);
            });
          }

          self.mainObjectSet.push(closeImage);
          $(window).trigger('resize');

          bubImage['textObjects'] = textObjects;
          bubImage['closeImage'] = closeImage;

          self.bindTapCallback(closeImage, function() {
            self.mainBubblePopupClose(this['bubbleObject']['imageObject']);
          });

        }).toFront();
      }
    };

    this.mainBubblePlayAudio = function (imageObject){
      this.$audio.one('playing', function(){
        $(imageObject['playImage']['0']).css('display','none');
        $(imageObject['stopImage']['0']).css('display','block');
      });
      this.$audio.one('ended',function(){
        $(imageObject['stopImage']['0']).css('display','none');
        $(imageObject['playImage']['0']).css('display','block');
      });
      //Dear Vail, this is another place where the src needs to change. Change it so that the iPad gets the same starts-at-the-beginning audio files as IE.
      this.$audio.attr('src','audio/from_beginning/' + imageObject['bubbleObject'].data('track') + '.m4a').attr('type','audio/mp4');
      this.audio.play();
    };

    this.mainBubbleStopAudio = function (imageObject){
      this.audio.pause();
      this.$audio.attr('src','');
      $(imageObject['stopImage']['0']).hide();
      $(imageObject['playImage']['0']).show();
    };

    this.mainBubblePopupClose = function (imageObject) {
      imageObject['closeImage'].animate({opacity: 0}, 200, '<>', function() {
        this.remove();
      });
      if(typeof(imageObject['playImage']) !== 'undefined') {
        imageObject['playImage'].animate({opacity: 0}, 200, '<>', function() {
          this.remove();
        });
      }
      if(typeof(imageObject['stopImage']) !== 'undefined') {
        imageObject['stopImage'].animate({opacity: 0}, 200, '<>', function() {
          this.remove();
        });
      }
      imageObject['textObjects'].animate({opacity:0}, 200, '<>', function() {
        this.remove();
      });
      imageObject['bubbleObject'].animate({
        r: 48,
        cx: imageObject.attrs.x + 50.5,
        cy: imageObject.attrs.y + 50
      }, 325, '<>', function() {
        this['imageObject']['opened'] = false;
        this.toBack();
      });
      var $audio = $('audio');
      if($audio.length > 0) {
        $audio.get(0).pause();
        $audio.attr('src', '');
      }
    };

    this.initAboutPage = function () {
      var aboutBubbleData = [
        {
          state: 'cinch',
          text: 'CINCH\nLearning',
          cx: 105,
          cy: 175,
          r: 50
        }, {
          state: 'students',
          text: 'Your\nStudents',
          cx: 210,
          cy: 260,
          r: 50
        }, {
          state: 'course',
          text: 'Your\nCourse',
          cx: 80,
          cy: 310,
          r: 50
        }, {
          state: 'classroom',
          text: 'Your\nClassroom',
          cx: 190,
          cy: 400,
          r: 50
        }
      ];

      var paper = this.paper;
      var bubbleSet = paper.set();
      var objectSet = paper.set();
      for(var i=0; aboutBubbleData[i]; i++) {
        var data = aboutBubbleData[i];
        var bubble = paper.circle(data.cx, data.cy, data.r).attr({
          fill: '0-rgb(0,151,219)-rgb(0,100,178)',
          'stroke-opacity': 0,
          opacity: .8,
          cursor: 'pointer'
        });

        var text = paper.text(data.cx, data.cy, data.text).attr({
          'text-anchor': 'middle',
          'stroke-opacity': 0,
          'font-family': 'Arial, sans',
          'fill': '#ffffff',
          'font-size': 16,
          cursor: 'pointer'
        }).toFront();

        bubble['textObject'] = text;
        text['bubbleObject'] = bubble;
        bubble['state'] = data.state;
        text['state'] = data.state;

        this.bindTapCallback(bubble, this.aboutBubbleClickCallback);
        this.bindTapCallback(text, this.aboutBubbleClickCallback);

        bubbleSet.push(bubble);
        objectSet.push(bubble, text);
      }

      this.aboutObjectSet = objectSet;
      this.aboutPopup = null;
    };

    this.aboutBubbleClickCallback = function () {
      if(self.aboutPopup !== null) {
        self.aboutPopup.objectSet.remove();
        self.aboutPopup.remove();
        self.aboutPopup = null;
      }

      $('#mobile-footer').hide();

      var bub = typeof(this.bubbleObject) !== 'undefined' ? this.bubbleObject : this;

      var paper = self.paper;
      var margin = ($(window).width() - 320) / 2;

      var cx = bub.attrs.cx + margin;
      var cy = bub.attrs.cy;
      var popup = paper.circle(cx, cy, 1).attr({
        fill: '0-rgb(0,151,219)-rgb(0,100,178)',
        'stroke-opacity': 0
      }).toFront().animate({r: 700}, 500);

      var objectSet = paper.set();

      var textTop = 130;

      var title = paper.text(margin + 30, textTop, self.aboutCopy[bub.state].title).attr({
        'text-anchor': 'start',
        'stroke-opacity': 0,
        'font-family': 'Arial, sans',
        'fill': '#ffffff',
        'font-size': 28,
        'fill-opacity': 0
      });
      objectSet.push(title);

      textTop += 36;

      var subtitle = paper.text(margin + 30, textTop, self.aboutCopy[bub.state].subtitle).attr({
        'text-anchor': 'start',
        'stroke-opacity': 0,
        'font-family': 'Arial, sans',
        'fill': '#ffffff',
        'font-size': 22,
        'fill-opacity': 0
      });
      objectSet.push(subtitle);

      textTop += 28;

      var k = 0;
      for(var i=0; self.aboutCopy[bub.state].text[i]; i++, k++) {
        var lines = self.textToLines(self.aboutCopy[bub.state].text[i], 38);

        for(var j=0; lines[j]; j++, k++) {
          var text = paper.text(margin + 30, textTop + k * 20, lines[j]).attr({
            'text-anchor': 'start',
            'stroke-opacity': 0,
            'font-family': 'Arial, sans',
            'fill': '#ffffff',
            'font-size': 14,
            'fill-opacity': 0
          });
          objectSet.push(text);
        }
      }

      var topClose = paper.image('img/circle-close-x.png', margin + 320 - 56, 100, 46, 46).attr({
        cursor: 'pointer',
        opacity: 0
      }).animate({opacity: 1}, 1000);
      topClose['popupObject'] = popup;
      self.bindTapCallback(topClose, self.aboutPopupCloseClickCallback);
      objectSet.push(topClose);

      var bottomClose = paper.image('img/circle-close-x.png', margin + 320 - 56, textTop + (k-1) * 20, 46, 46).attr({
        cursor: 'pointer',
        opacity: 0
      }).animate({opacity: 1}, 1000);
      bottomClose['popupObject'] = popup;
      self.bindTapCallback(bottomClose, self.aboutPopupCloseClickCallback);
      objectSet.push(bottomClose);

      objectSet.animate({'fill-opacity': 1}, 500);
      popup['objectSet'] = objectSet;
      self.aboutPopup = popup;
    };

    this.aboutPopupCloseClickCallback = function () {
      var popup = self.aboutPopup;
      popup.objectSet.animate({opacity: 0, 'fill-opacity': 0}, 200, function () {
        popup.objectSet.remove();
      });
      popup.animate({r: 0}, 500, '<>', function () {
        self.aboutPopup = null;
      });

      setTimeout((function () {
        $('#mobile-footer').show();
      }), 500);
    };

    this.initContactPage = function () {
      var contactBubbleData = [
        {
          title: 'Contact Us',
          copy: "For more information about\nCINCH Learning, please use\nour contact form.",
          type: 'text',
          cx: 145,
          cy: 205,
          r: 115
        }, {
          text: 'Contact\nForm',
          type: 'link',
          href: "http://mheducation.force.com/MHE/SEG_Sampling_Leads?id=701C0000000UKSx",
          cx: 252,
          cy: 312,
          r: 45
        }
      ];

      var paper = this.paper;
      var objectSet = paper.set();
      for(var i=0; contactBubbleData[i]; i++) {
        var data = contactBubbleData[i];
        var bubble = paper.circle(data.cx, data.cy, data.r).attr({
          fill: '0-rgb(0,151,219)-rgb(0,100,178)',
          'stroke-opacity': 0,
          opacity: .8,
          cursor: data.type === 'link' ? 'pointer' : 'default'
        });

        if(data.type === 'link') {

          var text = paper.text(data.cx, data.cy, data.text).attr({
            'text-anchor': 'middle',
            'stroke-opacity': 0,
            'font-family': 'Arial, sans',
            'fill': '#ffffff',
            'font-size': 16,
            cursor: 'pointer'
          });
          objectSet.push(text);

          bubble['textObject'] = text;
          text['bubbleObject'] = bubble;
          text['href'] = data.href;

          self.bindTapCallback(bubble, this.contactBubbleClickCallback);
          self.bindTapCallback(text, this.contactBubbleClickCallback);

          objectSet.push(text);

        } else {

          var title = paper.text(data.cx - data.r*.7, data.cy - data.r/2, data.title).attr({
            'text-anchor': 'start',
            'stroke-opacity': 0,
            'font-family': 'Arial, sans',
            'fill': '#ffffff',
            'font-size': 24,
            cursor: 'pointer'
          }).toFront();
          objectSet.push(title);

          var textLines = data.copy.split('\n');
          for(var j=0; textLines[j]; j++) {
            var line = paper.text(data.cx - data.r*.7, data.cy - data.r/2 + 30 + j*20, textLines[j]).attr({
              'text-anchor': 'start',
              'stroke-opacity': 0,
              'font-family': 'Arial, sans',
              'fill': '#ffffff',
              'font-size': 14,
              cursor: 'pointer'
            }).toFront();
            objectSet.push(line);
          }

        }

        objectSet.push(bubble);
      }

      this.contactObjectSet = objectSet;
    };

    this.contactBubbleClickCallback = function () {
      if(typeof(this['textObject']) !== 'undefined') return;
      var text = this;
      window.open(text.href, 'newWindow');
    };

    this.adjustViewingArea = function () {
      // This function is a callback for $(window).resize()
      $('#navigation-bubbles').css({width: $(window).width()});
      if(self.transitioning === true) return;
      var validStates = ['main', 'about', 'contact'];
      var currentState = self.state;

      var windowWidth = $(window).width();
      var margin = (windowWidth - 320) / 2;

      $('#navigation-bubbles').find('a').each(function () {
        var $this = $(this);
        var offsetLeft = $this.offset().left;
        if(typeof($this.data('left')) === 'undefined') {
          $this.data('left', offsetLeft);
        }
        $this.css('left', margin+$this.data('left'));
      });

      for(var i=0; validStates[i]; i++) {
        var stateObjectSet = self[validStates[i]+'ObjectSet'];
        if(validStates[i] === currentState) {
          stateObjectSet.transform('T'+margin+',0');
        } else {
          stateObjectSet.transform('T'+windowWidth+',0');
        }
      }
    };

    this.transition = function(toState) {
      if(this.transitioning === true) return;

      var state = this.state.toLowerCase();
      var validStates = ['main', 'about', 'contact'];
      if(validStates.indexOf(state) === -1) state = 'main';
      if(validStates.indexOf(toState) === -1) toState = 'main';
      if(state === toState) return;

      this.transitioning = true;

      var fromSet = this[state+'ObjectSet'];
      var toSet = this[toState+'ObjectSet'];

      var windowWidth = $(window).width();
      var margin = (windowWidth-320) / 2;
      var animationDuration = 500;

      if(validStates.indexOf(state) < validStates.indexOf(toState)) {
        fromSet.animate({transform: 'T'+(-windowWidth)+',0'}, animationDuration);
        toSet.transform('T'+(windowWidth)+',0');
      } else {
        fromSet.animate({transform: 'T'+(windowWidth)+',0'}, animationDuration);
        toSet.transform('T'+(-windowWidth)+',0');
      }

      toSet.animate({transform: 'T'+margin+',0'}, animationDuration);

      setTimeout((function () {
        self.state = toState;
        self.transitioning = false;
        $(window).scrollTop(0);
        switch(toState) {
          case 'main':
            $('#mobile-vector-content').css('height', self.mainPageHeight);
            $('#mobile-footer').hide();
            break;
          case 'about':
            $('#mobile-vector-content').css('height', 600);
            $('#mobile-footer').show();
            break;
          case 'contact':
            $('#mobile-vector-content').css('height', 600);
            $('#mobile-footer').show();
            break;
        }
      }), animationDuration+1);
    };

    this.placeLogo = function () {
      var paper = Raphael('mobile-cinch-logo', 235, 22);
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
    };

    this.callOuts = ["I love how CINCH provides quality digital content that's safe for students, no pop-ups or ads. It has hands-on activities and digital assets for group and independent assignments that complement classroom learning.",
      "The complete integration of teaching tools makes the best use of my time. I can instantly pull reports of student comprehension of standards and plan or edit my lessons from the same place.",
      "I can manage the classroom from a single point, making for dynamic lessons with just my laptop and IWB. I can even print on-demand! My students can also use the online labs for seamless collaboration.",
      "I can use the online assessments to help me line up student needs with the multi-strategy learning options and tools. What's more, the Web 2.0 tools help me prepare students for college and online standardized tests.",
      "I love how the interactive features get students engaged. There are iPad tools for dynamic explanations and learning. The videos, tutorials, virtual labs, and games bring content to life.",
      "The online personal tutors really help build confidence for my students. Each lesson comes with videos and guidance, games and animation for hands-on learning beyond the classroom.",
      "I love that CINCH integrates coursework with social media. My students use social networking features to discuss lessons and homework, while I monitor the conversation to keep tabs on where they struggle.",
      "The diverse, multimedia homework options help me matching learning style to student need with real-world interactive experiences. What's even better is the simple auto-grade function for online assessments. ",
      "I love the out-of-class support for my flipped classroom. The reading and multimedia assets are great for at home learning, while the collaborative lessons really support the in-class lessons.",
      "It's so easy to seamlessly blend digital and print learning. I customize note-taking guides for my program and print drills and homework on demand.",
      "The real-time progress reports make it so easy to assess student progress. And it's integrated for administrators, too.",
      "I'm able to instantly assess student learning levels, and remediate by pulling materials from other grades levels. I can also use the content from other grades for reteach and challenge exercises.",
      "The optimized lessons for ELL students make my job so much easier. The emphasis on vocabulary development builds language and skill comprehension. Plus, the hands-on, animated supplements provide extra support for language challenge.",
      "Virtual labs make for flawless experiments. I love that I can bring visual and experiential learning to the classroom despite my tight budget, and how online labs means access absent students, too.",
      "I really like how the interactive tools are backed by real lessons, because it's the virtual labs, animations, and tutorials that keep students engaged. I can also save all videos and materials I’ve collected in the planner.",
      "I love that I can curate my lessons to match my creative teaching style. I can develop unique programs by importing additional material onto CINCH platform.",
      "I can pull instant assessments of student progress. Both teachers and administrators can keep track of the classroom, which really helps streamline accountability.",
      "The online assessment tool let's me customize assessments for individual students. I never worry about copying: assessments are assigned and completed online. And I'm preparing students for the new online state assessments.",
      "I really appreciate how the activities capture student attention. There are great tools for making lessons more dynamic. Students have fun with the videos, virtual labs, social networking tools.",
      "I love collaboratively planning the week from the CINCH app. The planner tool makes it easy to follow scope and sequence. We plan as a group then independently tweak day-by-day using the CINCH app.",
      "On-demand printing and smartphone access reassures me that all my students can access the homework. I also love how I can tailor homework help to specific student needs.",
      "CINCH has helped me transform our iPads into classroom tools. The cloud-based system allows me to access, save, and resume work from any device, plus all the tools and resources optimized for iPad integration.",
      "I love being able to teach, assign, assess all from one place. Because it's cloud-based, I can access CINCH from from any device, which makes it easy for me to tailor lessons to my teaching style.",
      "I really like using the customizable IWB activities. I can customize the preloaded with slides to create an original, dynamic IWB presentation. I save all my IWB presentations in the same place where I save all my digital content.",
      "CINCH made it easy for me to adopt CCSS. I love how I can browse, search, and assess student comprehension by standard. I can even align standard reports with lessons for easy integration.",
      "I was able easily build and distribute our district's scope and sequence. I can also order custom printing of textbooks and materials. It's really easy to create a unique curriculum to match my curriculum map.",
      "CINCH is so easy for me to navigate. The simple customization tool makes it easy to add additional content, too. Plus I love how it's preloaded with resources for standard scope and sequences.",
      "It's essential that the cloud-based software works on any device, because it gives me the flexibility to update technology as needed. It's really perfect for adapting to changing classroom technology.",
      "Using CINCH makes it easy to align our curriculum map with CCSS and also assess students understanding of the standards. I'm always using the multiple learning models to make the lessons accessible for all of my students.",
      "CINCH has been the optimal guide for me as a new teacher. It comes with assets and resources, organized by lesson and standard. It's been my one-stop-shop for plans, presentations, and supplemental resources.",
      "I like teaching in an order I choose. I use CINCH to collect all my teaching materials in one place, and rearrange the content for my teaching style. I can also make those material available to my students with a few clicks.",
      "I love how easy it is for parents to stay connected to classroom. I can access my son's progress reports online. The online refresher material and tutorials make it easy for me to help with homework, too.",
      "CINCH gives me confidence that I'm getting the most up-to-date curriculum for my budget. It has modern digital platforms and access to 6-12 curriculum. Plus I feel that the universal device optimization is efficient technology spending.",
      "I really appreciate how the cloud-based software works seamlessly on all devices. I also find it reassuring that I'm sending my students to a safe website for school or home.",
      "I love knowing that we've adopted a platform that uses the most current content, that’s researched, proven, teacher-approved. It's an efficient use of my technology budget because it's optimized for every device.",
      "I'm always creating new or editing existing interactive lesson presentations. I also love planning, leaving notes and assigning homework all from the same place.",
      "CINCH has been really cost effective for our district. I really like that it includes supplementary materials for above and below learners, and that it comes with a system to monitor student progress and administer that extra support.",
      "I use the customized printing all the time. I print workbooks for my students who have limited technology access. I also design unique note-taking pages to help guide my students through our lessons.",
      "I love having all my files organized in one place. It makes for easy prep: plan, teach, assess, remediate all from the online platform. I really like being able to browse multimedia assets, worksheets, and activities by standard or lesson.",
      "I always refer to the huge library of engagement resources to integrate technology into my classroom. I always try to bring our labs and lessons online with follow up exercises."];

    this.aboutCopy = {
      'cinch': {
        'link': 'About\nCINCH',
        'title': 'CINCH Learning',
        'subtitle': 'Make it Personal',
        'text': [
          "No one else connects with, engages or excites students exactly like you. With CINCH Learning you’re " +
            "in control of how and what you teach like never before. CINCH Learning provides convenient cloud-based " +
            "access to quality math and science content for grades 5-12 along with robust planning and assessment tools. " +
            "Choose what you want to teach, what resources you want to use, and what device you want to use to deliver " +
            "the lesson. Put it all together to create a compelling learning experience that is uniquely yours and " +
            "highly personalized to your students.",
          "Get up close and personal with CINCH. Explore this site and then contact us for a product demo."
        ]
      },
      'course': {
        'link': 'Your\nCourse',
        'title': 'Your Course',
        'subtitle': 'Personalize content',
        'text': [
          "You know what you want to teach and how you want to teach it. CINCH puts all the resources you " +
            "need in one place to use any way you want.",
          "Choose from thousands of pre-built lessons to create your own unique scope and sequence.",
          "Customize lessons to match your personal teaching style. Add and use your own favorite content.",
          "Integrate videos, games, interactive labs and other multimedia assets."
        ]
      },
      'students': {
        'link': 'Your\nStudents',
        'title': 'Your Students',
        'subtitle': 'Personalize learning',
        'text': [
          "You’ve got students who love math and science and students who haven’t yet unlocked the secrets. " +
            "With CINCH, you can meet all their needs.",
          "Assign content, assessments, homework, and even games to each individual student based on specific " +
            "learning needs.",
          "Encourage collaboration and communication with built-in social networking tools.",
          "Keep learning active with IWBs, student response systems, and hundreds of multimedia resources."
        ]
      },
      'classroom': {
        'link': 'Your\nClassroom',
        'title': 'Your Classroom',
        'subtitle': 'Personalize the experience',
        'text': [
          "Wherever your classroom is in the digital transition, CINCH is right there with you helping you make " +
            "the most of your school’s technology resources.",
          "Access and edit content from any device – desktops, laptops, IWBs, tablets or smartphones. Plan, " +
            "assess and communicate on-the-go with the CINCH app.",
          "Always have the latest resources aligned to the most current standards with real-time updates. " +
            "Integrate print and digital with print on demand options."
        ]
      }
    };

  };

  window.MobileSite = new MobileSite();

})(window, window.jQuery, window.Raphael);
