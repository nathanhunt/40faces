/* Author: Will Shown & Vail Gold */

(function(window, $, Raphael, _) {

  var MobileSite = function () {
    var self = this;

    this.state = 'main';

    this.initApp = function() {
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
      $(window).on('resize', this.adjustViewingArea).trigger('resize');
    };

    this.initNavigation = function() {
      var paper = this.paper;
      var navBubbleSet = paper.set();
      var attrs = {
        'about': {
          'bubble': {
            cx: 155, cy: -25, r: 100, fill: '0-rgb(0,151,219)-rgb(0,100,178)', opacity:.9,
            glow: { opacity: .6, x: -2, y: -2 }
          },
          'text': {
            x: 150, y: 50, anchor: 'middle', text: 'About CINCH'
          }
        },
        'contact': {
          'bubble': {
            cx: 290, cy: -15, r: 100, fill: '0-rgb(0,151,219)-rgb(0,100,178)', opacity:.4,
            glow: { opacity:.5, x: -2, y: -2 }
          },
          'text': {
            x: 290, y: 55, anchor: 'end', text: 'Contact'
          }
        },
        'main': {
          'bubble': {
            cx: 5, cy: -10, r: 100, fill: '0-rgb(0,151,219)-rgb(0,100,178)', opacity:1,
            glow: { opacity:.7, x: -5, y: 0 }
          },
          'text': {
            x: 10, y: 50, anchor: 'start', text: '40 Faces'
          }
        }
      };

      var b, t, g, bubble, text;
      for(var attr in attrs) {
        if(attrs.hasOwnProperty(attr)) {
          b = attrs[attr].bubble;
          t = attrs[attr].text;
          g = b.glow;
          bubble = paper.circle(b.cx, b.cy, b.r).attr({
            'stroke-opacity': 0,
            fill: b.fill,
            opacity:b.opacity
          }).toBack();
          bubble.clone().glow({opacity:g.opacity}).translate(g.x, g.y).toBack();
          bubble.click(this.transition(attr));
          navBubbleSet.push(bubble);

          text = paper.text(t.x, t.y, t.text).attr({
            'text-anchor':t.anchor,
            'stroke-opacity': 0,
            'font-family': 'Arial, sans',
            'fill': '#ffffff',
            'font-size': 15,
            'fill-opacity': 1,
            'cursor': 'pointer'
          });
          bubble['textObject'] = text;
        }
      }

      this.navBubbleSet = navBubbleSet;
    };

    this.initMainPage = function() {
      var paper = this.paper;

      var num = function(x) { return x < 10 ? '0'+x : x+''; };
      var x, y, y1, y2, y3;
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

      var clickCallback = function() {
        if(typeof(this['opened']) === 'undefined' || this['opened'] === false) {
          var image = this;
          image['opened'] = true;
          var bub = image['bubbleObject'];

          for(var i=0; image.set[i]; i++) {
            if(image.set[i].bubbleObject.attrs.r > 48) {
              image.set[i]['textObjects'].animate({opacity:0}, 200, '<>', function() {
                this.remove();
              });
              image.set[i]['closeImage'].animate({opacity:0}, 200, '<>', function() {
                this.remove();
              });
              image.set[i].bubbleObject.animate({
                r: 48,
                cx: image.set[i].attrs.x + 50.5,
                cy: image.set[i].attrs.y + 50
              }, 325, '<>', function() {
                this['imageObject']['opened'] = false;
              }).toBack();
            }
          }

          bub.animate({
            r: 150,
            cx: 160,
            cy: Math.max(bub.attrs.cy, 200),
            opacity:.6
          }, 325, '<>', function() {
            var bub = this;
            // Put all content into an array of lines, soft-wrapped at CHARLIMIT
            var CHARLIMIT = 32;
            var bubImage = bub['imageObject'];
            var textLines = [];
            var tempLine, tempArray;
            var tempText = bubImage.content;
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

            var textObjects = paper.set();
            var t;
            // Create text elements with Raphael and add to set
            for(var j=0; textLines[j]; j++) {
              t = paper.text(bub.attrs.cx-bub.attrs.r *.7, bub.attrs.cy-bub.attrs.r/2+j*20, textLines[j]).attr({
                'text-anchor':'start',
                'stroke-opacity': 0,
                'font-family': 'Arial, sans',
                'fill': '#ffffff',
                'font-size': 14,
                'fill-opacity': 0
              });
              textObjects.push(t);
            }

            textObjects.animate({'fill-opacity':1}, 500);

            // circle-close-x.png is 46x46 pixels
            var closeImage = paper.image('img/circle-close-x.png', bub.attrs.cx-23, bub.attrs.cy+bub.attrs.r-51, 46, 46).attr({
              opacity: 0,
              'stroke-opacity': 0
            }).toFront().animate({opacity: 1}, 500);
            closeImage['textObjects'] = textObjects;
            closeImage['bubbleObject'] = bub;

            bubImage['textObjects'] = textObjects;
            bubImage['closeImage'] = closeImage;

            var clickCallback = function() {
              this.animate({opacity:0}, 200, '<>', function() {
                this.remove();
              });
              this['textObjects'].animate({opacity:0}, 200, '<>', function() {
                this.remove();
              });
              this['bubbleObject'].animate({
                r: 48,
                cx: this['bubbleObject']['imageObject'].attrs.x + 50.5,
                cy: this['bubbleObject']['imageObject'].attrs.y + 50
              }, 325, '<>', function() {
                this['imageObject']['opened'] = false;
              }).toBack();
            };

            var touchEndCallback = function() {
              clickCallback.call(this);
            };

            var touchStartCallback = function() {
              this.touchmove(function() {
                this.untouchstart(touchStartCallback);
              }).touchend(touchEndCallback);
            };

            closeImage.click(clickCallback).touchstart(touchStartCallback);

            // Add a reference to text object set to image object
          }).toFront();
        }
      };

      var touchEndCallback = function() {
        clickCallback.call(this);
      };

      var touchStartCallback = function() {
        this.touchmove(function() {
          this.untouchstart(touchStartCallback);
        }).touchend(touchEndCallback);
      };

      var imageSet = paper.set();
      var objectSet = paper.set();
      for(var j=0; data[j]; j++) {
        var image = paper.image('img/circle-faces/'+data[j].name+'.png', data[j].x, data[j].y, 100, 100);
        imageSet.push(image);
        objectSet.push(image);

        var imageBubble = paper.circle(data[j].x+50.5, data[j].y+50, 48).attr({
          fill: '0-rgb(0,151,219)-rgb(0,100,178)',
          'stroke-opacity': 0
        }).toBack();
        objectSet.push(imageBubble);
        image['bubbleObject'] = imageBubble;
        imageBubble['imageObject'] = image;
        image['set'] = imageSet;
        image['content'] = this.callOuts[j];

        image.touchstart(touchStartCallback).click(clickCallback);
      }

      this.mainObjectSet = objectSet;
    };

    this.initAboutPage = function() {

    };

    this.initContactPage = function() {

    };

    this.adjustViewingArea = function() {

    };

    this.transition = function(toState) {
      if(this.state === 'transition') return;

      var paper = this.paper;
      var state = this.state.toLowerCase();
      var validStates = ['main', 'about', 'contact'];

      if(validStates.indexOf(state) === -1) state = 'main';
      if(validStates.indexOf(toState) === -1) toState = 'main';
      if(state === toState) return;

      this.state = 'transition';

      //var fromFT = paper.freeTransform(this[state+'ObjectSet']).hideHandles();
      //var toFT = paper.freeTransform(this[toState+'ObjectSet']);

      if(validStates.indexOf(state) < validStates.indexOf(toState)) {

      } else {

      }


    };

    this.placeLogo = function() {
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
      "Easy to integrate technology into the classroom. Huge library of engagement resources. Bring labs and lessons online with follow up exercises."]
  };

  var mobile = new MobileSite();
  mobile.initApp();

})(window, jQuery, Raphael, _);