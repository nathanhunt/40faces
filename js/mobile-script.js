/* Author: Will Shown & Vail Gold */

(function(window, $, Raphael, _) {

  var MobileSite = function () {
    var self = this;

    this.state = 'main';
    this.transitioning = false;

    this.initApp = function () {
      $('body').css({
        padding: 0,
        margin: 0
      });
      $('#app').append('' +
        '<div class="mobile-fixed-top-bar">' +
          '<a id="mobile-cinch-logo"></a>' +
        '</div>' +
        '<div id="mobile-vector-content" class="mobile"></div>'
      );

      this.placeLogo();

      this.paper = Raphael('mobile-vector-content', 2000, 4000);

      this.initNavigation();
      this.initMainPage();
      this.initAboutPage();
      this.initContactPage();
      $(window).on('orientationchange resize', this.adjustViewingArea).trigger('resize');
    };

    this.initNavigation = function () {
      var attrs = {
        'main': {
          'bubble': {
            cx: 5, cy: -10, r: 100, fill: '0-rgb(0,151,219)-rgb(0,100,178)', opacity: 1,
            glow: { opacity: .7, x: -2, y: 0 }
          },
          'text': {
            x: 10, y: 50, anchor: 'start', text: '40 Faces'
          }
        },
        'about': {
          'bubble': {
            cx: 155, cy: -25, r: 100, fill: '0-rgb(0,151,219)-rgb(0,100,178)', opacity: .9,
            glow: { opacity: .6, x: -2, y: -2 }
          },
          'text': {
            x: 150, y: 50, anchor: 'middle', text: 'About CINCH'
          }
        },
        'contact': {
          'bubble': {
            cx: 290, cy: -15, r: 100, fill: '0-rgb(0,151,219)-rgb(0,100,178)', opacity: .9,
            glow: { opacity: .5, x: -2, y: -2 }
          },
          'text': {
            x: 290, y: 55, anchor: 'end', text: 'Contact'
          }
        }
      };

      var paper = this.paper;
      var bubbleSet = paper.set();
      var objectSet = paper.set();
      for(var attr in attrs) {
        if(attrs.hasOwnProperty(attr)) {
          var b = attrs[attr].bubble;
          var t = attrs[attr].text;
          var g = b.glow;
          var bubble = paper.circle(b.cx, b.cy, b.r).attr({
            'stroke-opacity': 0,
            fill: b.fill,
            opacity:b.opacity,
            cursor: 'pointer'
          }).toBack();

          var clone = bubble.clone().toBack();
          objectSet.push(clone);

          var glow = clone.glow({opacity:g.opacity}).translate(g.x, g.y).toBack();
          objectSet.push(glow);

          bubble['state'] = attr;
          this.bindTapCallback(bubble, function() {
            self.transition(this['state']);
          });

          bubbleSet.push(bubble);
          objectSet.push(bubble);

          var text = paper.text(t.x, t.y, t.text).attr({
            'text-anchor':t.anchor,
            'stroke-opacity': 0,
            'font-family': 'Arial, sans',
            'fill': '#ffffff',
            'font-size': 15,
            'fill-opacity': 1,
            'cursor': 'pointer'
          });
          text['state'] = attr;
          this.bindTapCallback(text, function() {
            self.transition(this['state']);
          });
          bubble['textObject'] = text;
          objectSet.push(text);
        }
      }

      this.navBubbleSet = bubbleSet;
      this.navObjectSet = objectSet;

      var navFT = paper.freeTransform(this.navObjectSet);
      navFT.hideHandles();
      navFT.opts.animate = false;
      navFT.attrs.translate.x = ($(window).width() - 320) / 2;
      navFT.apply();
      this.navFT = navFT;
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
        objectSet.push(imageBubble);
        image['bubbleObject'] = imageBubble;
        imageBubble['imageObject'] = image;
        image['set'] = imageSet;
        image['content'] = this.callOuts[j];

        this.bindTapCallback(image, self.mainBubbleClickCallback);
      }

      var windowWidth = $(window).width();
      var margin = (windowWidth - 320) / 2;
      var ctaBubble = paper.circle(160, 230, 130).attr({
        fill: '0-rgb(0,151,219)-rgb(0,100,178)',
        'stroke-opacity': 0,
        opacity: .7,
        cursor: 'pointer'
      }).toFront();

      var ctaText = paper.text(160, 190, 'Call to action here.').attr({
        'text-anchor': 'middle',
        'stroke-opacity': 0,
        'font-family': 'Arial, sans',
        'fill': '#ffffff',
        'font-size': 26,
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

      var mainFT = paper.freeTransform(this.mainObjectSet);
      mainFT.hideHandles();
      mainFT.opts.animate = false;
      mainFT.attrs.translate.x = ($(window).width() - 320) / 2;
      mainFT.apply();
      this.mainFT = mainFT;
    };

    this.getMainBubblePositionData = function () {
      var num = function(x) { return x < 10 ? '0'+x : x+''; };
      var x, y1, y2, y3;
      var data = [];
      var top = 100;
      for(var i=1; i < 41; i++) {
        if(Math.random() > .5) {
          // row of 2 images
          x = 20 + Math.floor(Math.random()*50);
          y1 = top;
          data.push({name:num(i), x:x, y:y1});

          if(i < 40) {
            i++;
            x = 170 + Math.floor(Math.random()*50);
            y2 = top;
            data.push({name:num(i), x:x, y:y2});
          }
          top = Math.max(y1, y2) + 100 + Math.floor(Math.random()*20);
        } else {
          // row of 3 images
          x = 5 + Math.floor(Math.random()*50);
          y1 = top + Math.floor(Math.random()*20);
          data.push({name:num(i), x:x, y:y1});

          if(i < 40) {
            i++;
            x = 165 + Math.floor(Math.random()*50);
            y2 = top + Math.floor(Math.random()*20);
            data.push({name:num(i), x:x, y:y2});
          }

          if(i < 40) {
            i++;
            x = 85 + Math.floor(Math.random()*50);
            y3 = top + 100 + Math.floor(Math.random()*20);
            data.push({name:num(i), x:x, y:y3});
          }
          top = Math.max(y1, y2, y3) + 100 + Math.floor(Math.random()*20);
        }
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

        bub.animate({
          r: 150,
          cx: $(window).width() / 2 - self.mainFT.attrs.translate.x,
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
            var x = bub.attrs.cx - bub.attrs.r * .7 + self.mainFT.attrs.translate.x;
            var y = bub.attrs.cy - bub.attrs.r / 2 + j * 20;
            var t = paper.text(x, y, textLines[j]).attr({
              'text-anchor': 'start',
              'stroke-opacity': 0,
              'font-family': 'Arial, sans',
              'fill': '#ffffff',
              'font-size': 14,
              'fill-opacity': 0
            });
            textObjects.push(t);
          }

          textObjects.animate({'fill-opacity': 1}, 500);

          // circle-close-x.png is 46x46 pixels
          var x = bub.attrs.cx - 23 + self.mainFT.attrs.translate.x;
          var y = bub.attrs.cy+bub.attrs.r - 51;
          var closeImage = paper.image('img/circle-close-x.png', x, y, 46, 46).attr({
            opacity: 0,
            'stroke-opacity': 0,
            cursor: 'pointer'
          }).toFront().animate({opacity: 1}, 500);
          closeImage['textObjects'] = textObjects;
          closeImage['bubbleObject'] = bub;

          bubImage['textObjects'] = textObjects;
          bubImage['closeImage'] = closeImage;

          self.bindTapCallback(closeImage, function() {
            self.mainBubblePopupClose(this['bubbleObject']['imageObject']);
          });

        }).toFront();
      }
    };

    this.mainBubblePopupClose = function (imageObject) {
      imageObject['closeImage'].animate({opacity: 0}, 200, '<>', function() {
        this.remove();
      });
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

      var aboutFT = paper.freeTransform(this.aboutObjectSet);
      aboutFT.hideHandles();
      aboutFT.opts.animate = false;
      aboutFT.attrs.translate.x = $(window).width();
      aboutFT.apply();
      this.aboutFT = aboutFT;
    };

    this.aboutBubbleClickCallback = function () {
      if(self.aboutPopup !== null) {
        self.aboutPopup.objectSet.remove();
        self.aboutPopup.remove();
        self.aboutPopup = null;
      }

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

      var textTop = 65;

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

      var topClose = paper.image('img/circle-close-x.png', margin + 320 - 56, 40, 46, 46).attr({
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
    };

    this.initContactPage = function () {
      var contactBubbleData = [
        {
          title: 'Contact Us',
          copy: "For more information,\nabout please CINCH\nLearning, please email\nus or use our contact form.",
          type: 'text',
          cx: 145,
          cy: 205,
          r: 115
        }, {
          text: 'Email us',
          type: 'link',
          href: "mailto:",
          cx: 170,
          cy: 348,
          r: 40
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

      var contactFT = paper.freeTransform(this.contactObjectSet);
      contactFT.hideHandles();
      contactFT.opts.animate = false;
      contactFT.attrs.translate.x = $(window).width();
      contactFT.apply();
      this.contactFT = contactFT;
    };

    this.contactBubbleClickCallback = function () {
      var text = typeof(this['textObject']) !== 'undefined' ? this['textObject'] : this;
      window.open(text.href, '_blank');
    };

    this.adjustViewingArea = function () {
      // This function is a callback for $(window).resize()
      if(self.transitioning === true) return;
      var windowWidth = $(window).width();
      var validStates = ['main', 'about', 'contact'];
      var currentState = self.state;

      var navFT = self.navFT;
      var tempNavOpts = navFT.opts;
      navFT.opts.animate = false;
      navFT.attrs.translate.x = (windowWidth - 320) / 2;
      navFT.apply();
      navFT.opts = tempNavOpts;

      for(var i=0; validStates[i]; i++) {
        var stateFT = self[validStates[i]+'FT'];
        var tempOpts = stateFT.opts;
        stateFT.opts.animate = false;

        if(validStates[i] === currentState) {
          stateFT.attrs.translate.x = (windowWidth - 320) / 2;
        } else {
          stateFT.attrs.translate.x = windowWidth;
        }
        stateFT.apply();
        stateFT.opts = tempOpts;
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

      for(var i=0; this.navBubbleSet[i]; i++) {
        if(this.navBubbleSet[i]['state'] === toState) {
          this.navBubbleSet[i].toFront();
          this.navBubbleSet[i]['textObject'].toFront();
        }
      }

      var fromFT = this[state+'FT'];
      var toFT = this[toState+'FT'];

      var windowWidth = $(window).width();
      var margin = (windowWidth-320) / 2;
      if(validStates.indexOf(state) < validStates.indexOf(toState)) {
        fromFT.attrs.translate.x = -windowWidth;
        toFT.attrs.translate.x = windowWidth;
        toFT.apply();
        toFT.attrs.translate.x = margin;
      } else {
        fromFT.attrs.translate.x = windowWidth;
        toFT.attrs.translate.x = -windowWidth;
        toFT.apply();
        toFT.attrs.translate.x = margin;
      }

      var animationDuration = 500;

      fromFT.opts.animate = {
        delay: animationDuration,
        easing: '<>'
      };
      fromFT.apply();

      toFT.opts.animate = {
        delay: animationDuration,
        easing: '<>'
      };
      toFT.apply();

      setTimeout((function () {
        self.state = toState;
        self.transitioning = false;
        $(window).scrollTop(0);
        switch(toState) {
          case 'main':
            $('#mobile-vector-content').css('height', 3000);
            break;
          case 'about':
            $('#mobile-vector-content').css('height', 650);
            break;
          case 'contact':
            $('#mobile-vector-content').css('height', 500);
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

    this.callOuts = ["Quality digital content for safe student use. Hands-on activities and digital assets complement classroom learning. Designed for group and independent assignments. No pop-ups or ads.",
      "Complete integration makes the best use of my time. Dynamic and editable yearly planning tool. Instantly pull reports of student comprehension of standards.",
      "Dynamic lessons with a few classroom devices. Manage the classroom from a single point: present activities using your laptop and IWB. Online labs for seamless collaboration and on-demand printing.",
      "21st century skill-building. Multi-strategy learning options and assessments available online. Web 2.0 tools prepare students for college and online standardized tests.",
      "Interactives features get students engaged. Interactive iPad tools for dynamic explanations and learning. Videos, tutorials, virtual labs, and games bring content to life.",
      "Online personal tutors build confidence. Each lesson has videos and guidance for continuous access to concepts. Games and animation for hands-on learning beyond the classroom.",
      "Integrate coursework with social media. Students use social networking features to discuss lessons and homework. Monitor the conversation to keep tabs on where students struggle.",
      "Real-world interactive experiences. Online assessments with simple auto-grade online assessments. Diverse, multimedia homework options for matching learning style to student need.",
      "Out-of-class support for a flipped classroom. Reading and multimedia assets for at home learning. Collaborative lessons for classroom support flipped learning model.",
      "Seamlessly blend digital and print. Customize note-taking guides for your program. Print drills and homeworks on demand.",
      "Real-time progress reports. Teachers and administrators can assess student progress. Seamless integration for administrators.",
      "Instant Assessment, Remediation, and Enrichment. Instantly assess student learning levels. Access to materials from all grades. Reach content from other grades for reteach and challenge exercises.",
      "Optimized lessons for ELL students. Emphasis on vocabulary development builds language and skill comprehension. Hands-on, animated supplements provide extra support for language challenge.",
      "Virtual labs for flawless experiments. Visual and experiential learning despite budgets. Online access to labs for absent students.",
      "Interactive tools backed by real lessons. Virtual labs, animations, and tutorials keep students engaged. Save all videos and materials you’ve collected in the planner.",
      "Curated lessons with creative teaching styles. Develop unique programs. Import and house additional material onto CINCH platform.",
      "Streamline accountability. Pull instant assessments of student progress. Both teachers and administrators can track classroom progress.",
      "Online, Customized Assessments. Customize assessment for individual students. No more copying: assessments assigned and completed online. Prepares students for new online state assessments.",
      "Activities that capture student attention. Tools for making lessons more dynamic. Students have fun with wideos, virtual labs, social networking tools.",
      "Collaboratively plan the week from the CINCH app. Planner tool makes it easy to follow scope and sequence. Plan as a group and tweak day-by-day using the CINCH app.",
      "Universal access. On-demand printing and smartphone access ensures all students can access homework. Tailor homework help to specific student needs.",
      "Transforming iPads into classroom tools. Cloud-based system allows you to access, save, and resume work from multiple devices. Tools and resources optimized for iPad integration.",
      "Teach, assign, assess: all in one place. Cloud-based system allows access from any device. Tailor lessons to your teaching style.",
      "Customizable IWB activities. Create original, dynamic IWB presentations, preloaded with slides that you can customize. Keep IWB presentations and any digital content in one place.",
      "Easy to adopt CCSS. Browse, search, and assess student comprehension by standard. Align standard reports with lessons for easy CCSS integration.",
      "Build a custom scope and sequence. Digitally distribute your curriculum and order custom printing of textbooks and materials. Create unique curriculum to match my curriculum map.",
      "Easy to use and customize. Easy to navigate and simple customization tool makes it easy to add additional content. Preloaded with resources for standard scope and sequences.",
      "Cloud-based software works on any device. Works on any device, providing flexibility to update technology as needed. Perfect for adapting to changing classroom technology.",
      "Makes it easy to align curriculum with CCSS. Align curriculum map with standards and assess students understanding of concepts. Multiple learning models makes it accessible for any student.",
      "Optimal guide for new teachers. Comes with assets and resources, organized by lesson and standard. One-stop-shop for plans, presentations, and supplemental resources.",
      "Teach in the order you choose. Collect all your teaching materials in one place: Rearrange content for your teaching style. Make material instantly available to students with a few clicks.",
      "Easy for parents to stay connected to classroom. Parents can access student progress reports online. Provides refresher material and tutorials online for interested parents.",
      "The most up-to-date curriculum for your budget. Modern digital platforms and Access to 6-12 curriculum for efficient use of budgets. Universal device optimization for efficient technology spending.",
      "Works seamlessly on all devices. Cloud-based software works on any device. Safe website for students to surf at school or at home.",
      "The most current content. Online platform with current content that’s researched, proven, teacher-approved. Universal device optimization for efficient technology spending.",
      "Customize to your teaching style. Create new or edit existing interactive lesson presentations. Plan, leave notes and assign homework all from one place.",
      "Cost Effective. Includes supplementary materials for above and below learners. Monitor student progress and administer extra support all from one place.",
      "Customized Printing. Print workbooks for students with limited technology access. Design unique note-taking pages to help guide students through lessons.",
      "All your files organized in one place. Easy prep: plan, teach, assess, remediate all from the online platform. Browse multimedia assets, worksheets, and activities by standard or lesson.",
      "Easy to integrate technology into the classroom. Huge library of engagement resources. Bring labs and lessons online with follow up exercises."];

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

  var mobile = new MobileSite();
  mobile.initApp();

  window.MobileSite = mobile;

})(window, jQuery, Raphael, _);