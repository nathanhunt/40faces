/* Author: Will Shown & Vail Gold */

(function(window, $, Modernizr, Raphael, _) {

  var Cinch = function () {

    var self = this;

    this.initApp = function () {
      return this.updateDOM().initPrimaryPaper().putLogo().initMedia().runScion();
    };

    this.updateDOM = function () {
      $('body').css({
        overflow: 'hidden',
        'padding-top': 40
      });

      $('#app').html(
        '<div class="standard fixed-top-bar">' +
          ' <a id="cinch-logo"></a>' +
          ' <a href="#" class="volume-icon-link on">' +
          '   <img class="on" src="img/volume-on.png" />' +
          '   <img class="off" src="img/volume-off.png" />' +
          ' </a>' +
          ' <ul id="nav-link-list" class="float-right">' +
          '   <li><a href="#" class="main active">40 Faces</a></li>' +
          '   <li><span>|</span></li>' +
          '   <li><a href="#" class="about">About CINCH</a></li>' +
          '   <li><span>|</span></li>' +
          '   <li><a href="#" class="contact">Contact</a></li>' +
          '   <li><span>|</span></li>' +
          '   <li><a href="http://www.cinchlearning.com" class="login" target="_blank">Login</a></li>' +
          ' </ul>' +
          '</div>' +
          '<div class="standard fixed-bottom-bar">' +
          ' <a class="logoLink" href="https://www.mheonline.com/" target="_blank"><img src="img/mhe_logo_94x26.png" /></a>' +
          ' <a href="http://www.mcgraw-hill.com/site/tools/terms-of-use" target="_blank">Terms of Use</a>' +
          ' <span>|</span>' +
          ' <a href="https://www.mheonline.com/pages/display/privacynotice_view" target="_blank">Privacy Notice</a>' +
          ' <span>|</span>' +
          ' <a href="https://www.mheonline.com/" target="_blank">McGraw Hill Education</a>' +
          '</div>' +
          '<div role="viewport" id="viewport">'+
          '  <div role="video" id="video">'+
          '    <video class="faces" id="facesVideo" autobuffer="autobuffer" preload="auto" loop="loop">'+
          '      <source src="video/grid-with-audio.ogv" type="video/ogg" />'+
          '      <source src="video/grid-with-audio.mp4" type="video/mp4" />'+
          '    </video>'+
          '    <audio class="faces" id="facesAudio" autobuffer="autobuffer" preload="auto" loop="loop" muted="muted"></audio>'+
          '  </div>'+
          '</div>'+
          '<div id="vector-content"></div>' +
          '<div id="hitAreaWrapper"><div id="hitAreas"></div></div>'
      );

      return this;
    };

    this.initPrimaryPaper = function () {
      this.paper = Raphael('vector-content', 3000, 1500);
      return this;
    };

    this.putLogo = function () {
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
      ).attr({
          fill: '#fff',
          'stroke-opacity': 0
        });

      return this;
    };

    this.mainBubbleData = [
      {cx: -290, cy: -182, r: 530, anchor: {x: 'left', y: 'top'}},
      {cx: -135, cy: 203, r: 216, anchor: {x: 'left', y: 'top'}},
      {cx: 335, cy: -400, r: 641, anchor: {x: 'right', y: 'top'}},
      {cx: 300, cy: -499, r: 626, anchor: {x: 'right', y: 'top'}},
      {cx: 500, cy: 27, r: 646, anchor: {x: 'right', y: 'bottom'}},
      {cx: 216, cy: 500, r: 630, anchor: {x: 'left', y: 'bottom'}}
    ];

    this.aboutBubbleData = [
      {cx: 500, cy: -227, r: 646, anchor: {x: 'right', y: 'bottom'}},
      {cx: 216, cy: 400, r: 630, anchor: {x: 'left', y: 'bottom'}}
    ];

    this.contactBubbleData = [
      {cx: 500, cy: -127, r: 646, anchor: {x: 'right', y: 'bottom'}},
      {cx: 216, cy: 400, r: 630, anchor: {x: 'left', y: 'bottom'}},
      {cx: 316, cy: 400, r: 630, anchor: {x: 'left', y: 'bottom'}}
    ];

    this.initMainState = function () {
      this.state = 'main';
      return this.displayMainIntro().initMainHitAreas().initMainBlurbs();
    };

    this.displayMainIntro = function () {
      var paper = this.paper;
      var s = paper.set();
      var margin = ($(window).width() - 800) / 2;
      var x = 350 + margin;
      var y = 270;

      s.push(paper.circle(x, y, 200).attr({
        'fill': '0-rgba(0,151,219,0.7)-rgba(0,100,178,0.7)',
        'stroke-opacity': 0
      }).toFront());
      s.push(paper.text(x, y, "See how teachers,\nadministrators and\nparents are using\nCinch technology\ntoday.").attr({
        'text-anchor': 'middle',
        'stroke-opacity': 0,
        'fill': '#ffffff',
        'font-size': 28
      }).toFront());

      s.push(paper.circle(x+180, y+180, 100).attr({
        'fill': '0-rgba(0,151,219,0.9)-rgba(0,100,178,0.9)',
        'stroke-opacity': 0
      }).toFront());
      s.push(paper.text(x+180, y+180, "Make it\nPersonal").attr({
        'text-anchor': 'middle',
        'stroke-opacity': 0,
        'fill': '#ffffff',
        'font-size': 28
      }).toFront());

      self.mainIntroSet = s;

      var mainBubbleData = this.mainBubbleData;

      var windowWidth = $(window).width();
      var windowHeight = $(window).height();

      var mainBubbles = this.paper.set();

      var i;
      for(i=0; mainBubbleData[i]; i++) {
        var o = (0.2+(Math.random()*0.3)).toFixed(2);
        var fill = '0-rgba(0,151,219,'+o+')-rgba(0,100,178,'+o+')';

        var b = this.paper.circle(windowHeight/2, windowHeight/2, 0).attr({
          'stroke-opacity': 0,
          fill: fill
        });

        b.data('bubbleData', mainBubbleData[i]);

        var a = Raphael.animation({
          cx: mainBubbleData[i].cx + (mainBubbleData[i].anchor.x === 'right' ? windowWidth : 0),
          cy: mainBubbleData[i].cy + (mainBubbleData[i].anchor.y === 'bottom' ? windowHeight : 0),
          r: mainBubbleData[i].r
        }, 3000, 'easeInOut');

        mainBubbles.push(b);

        b.animate(a.delay(300 * i));
      }

      this.mainBubbleSet = mainBubbles;

      setTimeout((function () {
        $('body').trigger('mainBubbles:complete');
      }), 300 * i + 3000);

      return this;
    };

    this.initMainHitAreas = function () {
      var paper = Raphael('hitAreas', 1200, 1000);
      $('#hitAreas > *').css('left', -200);

      paper.hint = paper.path("M0,0L1,0Z").attr({
        opacity: 0,
        fill: 'rgb(0,151,219)',
        'stroke-opacity': 0
      });

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
          24, 30, 23, 20, 12, 31, 21],

        seek: [9, 3, 6, 1.8,
          3, 4, 0, 1, 6.5, 3,
          3, 5, 1.8, 4, 6.5, 0, 10.3,
          1.8, 0.5, 0.8, 0, 9, 7, 9, 0,
          1, 1.8, 9, 0.5, 5, 0, 0.5, 0,
          4, 3, 0.5, 6, 1.8, 0.5, 7]
      };

      var offset = {
        x: 200-45.541,
        y: -42.119
      };

      var radius = 48.661;
      var h;

      var hitAreaSet = paper.set();

      for(h=0; h < circleAttrs.cx.length; h += 1) {

        var c = paper.circle(circleAttrs.cx[h] + offset.x, circleAttrs.cy[h] + offset.y, radius).attr({
          fill: '#f00',
          'stroke-opacity': 0,
          opacity: 0
        });

        hitAreaSet.push(c);

        c.data('track', circleAttrs.track[h]);
        c.data('seek', circleAttrs.seek[h]);

        if(Modernizr.video){

          (function (circle) {
            var $c = $(circle['0']);
            $c.off('mouseenter').on('mouseenter', function (e) {
              hintMouseEnter(circle);
              var $c = $(e.target);
              var transition = function (circle) {
                self.interpreter.gen({
                  name: 'toSpecific',
                  data: {
                    circle: circle,
                    track: circle.data('track')
                  }
                });
              };
              var trans = setTimeout(transition, 1500, circle);
              $c.one('mouseleave', function (e) {
                clearTimeout(trans);
              });
            }).on('mouseleave', function () {
                hintMouseLeave(circle);
              });
          }(c));

        } else {

          c.click(function () {
            self.interpreter.gen({
              name: 'toSpecific',
              data: {
                circle: this,
                track: this.data('track')
              }
            });
          }).mouseover(function () {
              hintMouseEnter(this);
            }).mouseout(function () {
              hintMouseLeave(this);
            });
        }
      }

      this.hitAreaSet = hitAreaSet;
      return this;
    };

    var hintMouseEnter = function (circle) {
      if(typeof($('body').data('readyForHint')) === 'undefined' || $('body').data('readyForHint') !== true) return;

      var cx = circle.attrs.cx;
      var cy = circle.attrs.cy;
      var r = circle.attrs.r;

      var track = circle.data('track');
      var direction;
      if([39, 36, 27, 4, 29].indexOf(track) > -1) {
        direction = 'bottomright';
      } else if([2, 32, 10, 14, 5].indexOf(track) > -1) {
        direction = 'bottomleft';
      } else if([37, 16, 28, 35, 9, 15, 26, 7, 19, 6, 38, 17, 24, 30, 23, 20].indexOf(track) > -1) {
        direction = 'topright';
      } else if([34, 18, 11, 8, 22, 1, 33, 3, 40, 25, 13, 12, 31, 21].indexOf(track) > -1) {
        direction = 'topleft';
      } else {
        direction = 'bottomright'; // this shouldn't happen
      }

      var initialPath, finalPath, rotation, transformString;
      if(['topright', 'topleft'].indexOf(direction) > -1) {
        initialPath = "M" + (cx + 0.5) + "," + (cy - r) +
          "A" + (r - 1) + "," + (r - 1) + " 0 1,1 " + (cx - 0.5) + "," + (cy - r) +
          "A" + (r - 1) + "," + (r - 1) + " 0 1,0 " + (cx + 0.5) + "," + (cy - r) + "Z";

        finalPath = "M" + (cx + 0.5) + "," + (cy - r) +
          "A" + (r * 1.1) + "," + (r * 1.1) + " 0 1,1 " + (cx - 0.5) + "," + (cy - r) +
          "A" + (r - 1) + "," + (r - 1) + " 0 1,0 " + (cx + 0.5) + "," + (cy - r) + "Z";

        rotation = direction === 'topright' ? -135 : 135;
        transformString = "r" + rotation + "," + cx + "," + cy;

      } else if(['bottomright', 'bottomleft'].indexOf(direction) > -1) {
        initialPath = "M" + (cx - 0.5) + "," + (cy + r) +
          "A" + (r - 1) + "," + (r - 1) + " 0 1,1 " + (cx + 0.5) + "," + (cy + r) +
          "A" + (r - 1) + "," + (r - 1) + " 0 1,0 " + (cx - 0.5) + "," + (cy + r) + "Z";

        finalPath = "M" + (cx - 0.5) + "," + (cy + r) +
          "A" + (r * 1.1) + "," + (r * 1.1) + " 0 1,1 " + (cx + 0.5) + "," + (cy + r) +
          "A" + (r - 1) + "," + (r - 1) + " 0 1,0 " + (cx - 0.5) + "," + (cy + r) + "Z";

        rotation = direction === 'bottomleft' ? -180 : 180;
        transformString = "r" + rotation + "," + cx + "," + cy;

      }

      circle.paper.hint.stop();

      circle.paper.hint.attr({
        opacity: 0,
        path: initialPath,
        transform: "r0," + cx + "," + cy,
        fill: 'rgb(0,151,219)',
        'stroke-opacity': 0
      });

      circle.paper.hint.animation = Raphael.animation({
        path: finalPath,
        transform: transformString,
        opacity: .4
      }, 325, 'linear');

      circle.paper.hint.animate(circle.paper.hint.animation);

    };

    var hintMouseLeave = function (circle) {
      circle.paper.hint.stop(circle.paper.hint.animation);
      circle.paper.hint.attr({opacity: 0});
    };

    this.initMainBlurbs = function () {
      var Blurb = function(){
        var blurbSelf = this;

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

          var o = 0.95;

          if(['topright', 'topleft'].indexOf(this.direction) > -1) {

            initialPath = "M" + (middle + 0.5) + "," + bbox.y +
              "A" + (bbox.width / 2 - 1) + "," + (bbox.height / 2 - 1) + " 0 1,1 " + (middle - 0.5) + "," + bbox.y +
              "A" + (bbox.width / 2 - 1) + "," + (bbox.height / 2 - 1) + " 0 1,0 " + (middle + 0.5) + "," + bbox.y + "Z";

            finalPath = "M" + (middle + 0.5) + "," + bbox.y +
              "A200,200 0 1,1 " + (middle - 0.5) + "," + bbox.y +
              "A" + (bbox.width / 2 - 1) + "," + (bbox.width / 2 - 1) + " 0 1,0 " + (middle + 0.5) + "," + bbox.y + "Z";

            rotation = this.direction === 'topright' ? -135 : 135;
            transformString = "R" + rotation + "," + middle + "," + (bbox.y + bbox.height / 2);

          } else if(['bottomright', 'bottomleft'].indexOf(this.direction) > -1) {

            initialPath = "M" + (middle - 0.5) + "," + (bbox.y + bbox.height) +
              "A" + (bbox.width / 2 - 1) + "," + (bbox.height / 2 - 1) + " 0 1,1 " + (middle + 0.5) + "," + (bbox.y + bbox.height) +
              "A" + (bbox.width / 2 - 1) + "," + (bbox.height / 2 - 1) + " 0 1,0 " + (middle - 0.5) + "," + (bbox.y + bbox.height) + "Z";

            finalPath = "M" + (middle - 0.5) + "," + (bbox.y + bbox.height) +
              "A200,200 0 1,1 " + (middle + 0.5) + "," + (bbox.y + bbox.height) +
              "A" + (bbox.width / 2 - 1) + "," + (bbox.width / 2 - 1) + " 0 1,0 " + (middle - 0.5) + "," + (bbox.y + bbox.height) + "Z";

            rotation = this.direction === 'bottomleft' ? -180 : 180;
            transformString = "R" + rotation + "," + middle + "," + (bbox.y + bbox.height / 2);

          }

          p = paper.path(initialPath).attr({
            fill: '0-rgba(0,151,219,'+o+')-rgba(0,100,178,'+o+')',
            'stroke-opacity': 0
          }).animate({path: finalPath, transform: transformString}, 500, 'linear', function () {
              $('body').trigger('blurbs:animationComplete', [blurbSelf]);
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
          }).animate({'fill-opacity': 1}, objectAnimationDuration);

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

          var linkHitArea = paper.rect(linkBBox.x, linkBBox.y, linkBBox.width, linkBBox.height).attr({
            opacity: 0.00001,
            'stroke-opacity': 0,
            fill: 'white',
            cursor: 'pointer'
          }).toFront().click(function () {
              $('#nav-link-list a.about').trigger('click');
            });

          objectSet.push(linkHitArea);

          var image = paper.image('img/circle-close-x.png', tempX - 23, tempY + 30, 46, 46).attr({
            opacity: 0,
            cursor: 'pointer'
          }).animate({opacity: 1}, objectAnimationDuration).click(function () {
              self.interpreter.gen({
                name: 'leaveSpecific'
              });
              blurbSelf.removeObjectSet();
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
            });
          }
        };
      };

      this.blurb = new Blurb();
      return this;
    };

    this.showState = function (toState) {
      var bubbleData = this[toState + 'BubbleData'];
      var windowWidth = $(window).width();
      var windowHeight = $(window).height();

      var bubbles = this.paper.set();

      var i;
      for(i=0; bubbleData[i]; i++) {
        var o = (0.2+(Math.random()*0.3)).toFixed(2);
        var fill = '0-rgba(0,151,219,'+o+')-rgba(0,100,178,'+o+')';

        var cx = bubbleData[i].anchor.x === 'right' ? windowWidth + 1000 : -1000;
        var cy = bubbleData[i].anchor.y === 'bottom' ? windowHeight + 1000 : -1000;
        var b = this.paper.circle(cx, cy, bubbleData[i].r).attr({
          'stroke-opacity': 0,
          fill: fill
        })
          .animate({
            cx: bubbleData[i].cx + (bubbleData[i].anchor.x === 'right' ? windowWidth : 0),
            cy: bubbleData[i].cy + (bubbleData[i].anchor.y === 'bottom' ? windowHeight : 0),
            r: bubbleData[i].r
          }, 500, 'easeOut')
          .data('bubbleData', bubbleData[i]);

        bubbles.push(b);
      }

      this[toState + 'BubbleSet'] = bubbles;

      var methodName = 'show' + toState.substr(0, 1).toUpperCase() + toState.substr(1) + 'State';
      if (typeof(this[methodName]) !== 'undefined') {
        this[methodName]();
      }

      setTimeout((function () {
        $('body').trigger('transition:complete');
        self.state = toState;
      }), 500);

      return this;
    };

    this.showMainState = function () {
      $('#nav-link-list a').not('.main').removeClass('active');
      $('#nav-link-list a.main').addClass('active');
      $('#hitAreas, #viewport').fadeIn();
      self.media.resume();
    };

    this.aboutSpecialBubbleData = {
      cinch: {cx: 575, cy: 100, r: 50, code: 'cinch'},
      course: {cx: 630, cy: 195, r: 50, code: 'course'},
      students: {cx: 640, cy: 300, r: 50, code: 'students'},
      classroom: {cx: 620, cy: 405, r: 50, code: 'classroom'}
    };

    this.aboutExpandedBubbleParams = {cx: 320, cy: 280, r: 280};

    this.showAboutState = function () {
      $('#nav-link-list a').not('.about').removeClass('active');
      $('#nav-link-list a.about').addClass('active');

      if(typeof(self.aboutSpecialBubbleSet) === 'undefined') {
        self.createAboutSpecialBubbles();
      }

      self.showAboutSpecialBubbles();
    };

    this.createAboutSpecialBubbles = function () {
      var windowWidth = $(window).width();
      var windowHeight = $(window).height();

      var paper = self.paper;
      var specialBubbleData = self.aboutSpecialBubbleData;
      var specialBubbleSet = paper.set();

      for (var x in specialBubbleData) {
        if(specialBubbleData.hasOwnProperty(x)) {
          var o = (0.2+(Math.random()*0.3)).toFixed(2);
          var fill = '0-rgba(0,151,219,'+o+')-rgba(0,100,178,'+o+')';

          var b = paper.circle(windowWidth + 1000, windowHeight + 1000, 0).attr({
            'stroke-opacity': 0,
            fill: fill
          });

          specialBubbleSet.push(b);

          b.data('code', x);
          b.mouseover(self.aboutSpecialBubbleMouseOverCallback)
            .mouseout(self.aboutSpecialBubbleMouseOutCallback)
            .click(self.aboutSpecialBubbleClickCallback);

          // Create text element in Raphael
          var link = paper.text(windowWidth + 1000, windowHeight + 1000, self.aboutCopy[x].link).attr({
            'text-anchor': 'middle',
            'stroke-opacity': 0,
            'font-family': 'Arial, sans',
            'fill': '#ffffff',
            'font-size': 16,
            'fill-opacity': 0,
            'cursor': 'pointer'
          });

          // Add reference to bubble object to text objects for events
          link.data('code', x);
          link.data('bubbleObject', b);
          b.data('linkObject', link);
          link.mouseover(self.aboutSpecialBubbleMouseOverCallback)
            .mouseout(self.aboutSpecialBubbleMouseOutCallback)
            .click(self.aboutSpecialBubbleClickCallback);
        }
      }

      self.aboutSpecialBubbleSet = specialBubbleSet;
    };

    this.showAboutSpecialBubbles = function () {
      var windowWidth = $(window).width();
      var bubbles = self.aboutSpecialBubbleSet;
      var margin = (windowWidth - 800) / 2;

      for (var i=0; bubbles[i]; i++) {
        var b = bubbles[i];
        var code = b.data('code');
        var cx = self.aboutSpecialBubbleData[code].cx + margin;
        var cy = self.aboutSpecialBubbleData[code].cy;
        var r = self.aboutSpecialBubbleData[code].r;

        b.animate({
          cx: cx, cy: cy, r: r
        }, 500, '<>', function () {
          self.aboutSpecialBubbleDestroyAndShrink(null);
          self.aboutSpecialBubbleEnlarge('cinch');
        });

        b.data('linkObject').animate({
          'fill-opacity': 1,
          x: cx,
          y: cy
        }, 500, '<>');
      }
    };

    var defaultOpacity = .8;
    var hoverOpacity = 1;
    var disabledOpacity = .1;

    this.aboutSpecialBubbleMouseOverCallback = function() {
      var tempBubble = typeof(this.data('bubbleObject')) === 'undefined' ? this : this.data('bubbleObject');
      if(tempBubble.attrs.r !== 50 || (typeof(self['animateInProgress']) !== 'undefined' && self['animateInProgress'] === true)) {
        return;
      }
      tempBubble.attr({'opacity': hoverOpacity, 'cursor': 'pointer'});
    };

    this.aboutSpecialBubbleMouseOutCallback = function() {
      var tempBubble = typeof(this.data('bubbleObject')) === 'undefined' ? this : this.data('bubbleObject');
      if(tempBubble.attrs.r !== 50 || (typeof(self['animateInProgress']) !== 'undefined' && self['animateInProgress'] === true)) {
        return;
      }
      tempBubble.attr('opacity', defaultOpacity);
    };

    this.aboutSpecialBubbleClickCallback = function () {
      var clickedBubble = typeof(this.data('bubbleObject')) === 'undefined' ? this : this.data('bubbleObject');
      if(clickedBubble.attrs.r !== 50 || (typeof(self['animateInProgress']) !== 'undefined' && self['animateInProgress'] === true)) {
        return;
      }
      self.aboutSpecialBubbleDestroyAndShrink(clickedBubble);
      self.aboutSpecialBubbleEnlarge(clickedBubble.data('code'));
    };

    this.aboutSpecialBubbleDestroyAndShrink = function (skipBubble) {
      var duration = 100;
      var margin = ($(window).width() - 800) / 2;
      var code = typeof(skipBubble) !== 'undefined' && skipBubble !== null ? skipBubble.data('code') : null;

      // Destroy current text set and shrink bubble
      for(var i=0; self.aboutSpecialBubbleSet[i]; i++) {
        var tempBubble = self.aboutSpecialBubbleSet[i];

        if(tempBubble.data('code') !== code) {
          tempBubble.attr({'fill-opacity': disabledOpacity});

          var params = self.aboutSpecialBubbleData[tempBubble.data('code')];

          tempBubble.animate({
            cx: params.cx + margin,
            cy: params.cy,
            r: params.r,
            opacity: defaultOpacity,
            cursor: 'pointer'
          }, duration, '<>', function() {
            this.attr({
              'fill-opacity': defaultOpacity
            }).data('linkObject').attr({
                cursor: 'pointer'
              }).animate({
                'fill-opacity': 1
              }, 100);
          });

          if(typeof(tempBubble.data('textSet')) !== 'undefined' && tempBubble.data('textSet') !== null) {
            tempBubble.data('textSet').forEach(function (e) {
              e.animate({'fill-opacity': 0}, 100, '<>', function () {
                this.remove();
              });
            });
            tempBubble.data('textSet', null);
          }
        }
      }

    };

    this.aboutSpecialBubbleEnlarge = function (code) {
      self['animateInProgress'] = true;
      var duration = 325;
      var margin = ($(window).width() - 800) / 2;
      var clickedBubble = null;

      for (var i=0; self.aboutSpecialBubbleSet[i]; i++) {
        if(self.aboutSpecialBubbleSet[i].data('code') === code) {
          clickedBubble = self.aboutSpecialBubbleSet[i];
        }
      }

      if(clickedBubble === null) return;

      var cx = self.aboutExpandedBubbleParams.cx + margin;
      var cy = self.aboutExpandedBubbleParams.cy;
      var r = self.aboutExpandedBubbleParams.r;

      clickedBubble.attr({cursor: 'default'}).animate({
        cx: cx,
        cy: cy,
        r: r,
        opacity: hoverOpacity
      }, duration, '<>', function () {
        this.toBack();
      });

      clickedBubble.data('linkObject').animate({'fill-opacity': 0}, duration, '<>');

      var paper = self.paper;
      var textSet = paper.set();

      var title = paper.text(cx - r*11/20, cy - r*7/10, self.aboutCopy[code].title).attr({
        'text-anchor': 'start',
        'stroke-opacity': 0,
        'fill': '#ffffff',
        'font-family': 'Arial, sans',
        'font-size': 32,
        'fill-opacity': 0
      }).toBack();
      textSet.push(title);

      var subtitle = paper.text(cx - r*11/20, cy - r*7/10 + 45, self.aboutCopy[code].subtitle).attr({
        'text-anchor': 'start',
        'stroke-opacity': 0,
        'fill': '#ffffff',
        'font-family': 'Arial, sans',
        'font-size': 26,
        'fill-opacity': 0
      }).toBack();
      textSet.push(subtitle);

      var textLines = self.aboutCopy[code].text.split('\n');
      for(var j=0; textLines[j]; j++) {
        textSet.push(
          paper.text(cx - r*11/20, cy - r*7/10 + 85 + j*20, textLines[j]).attr({
            'text-anchor': 'start',
            'stroke-opacity': 0,
            'fill': '#ffffff',
            'font-family': 'Arial, sans',
            'font-size': 14,
            'fill-opacity': 0
          }).toBack()
        );
      }

      clickedBubble.data('textSet', textSet);
      textSet.animate({
        'fill-opacity': 1
      }, duration, '<>', function () {
        self['animateInProgress'] = false;
        for(var i=0; self.aboutSpecialBubbleSet[i]; i++) {
          if(self.aboutSpecialBubbleSet[i].attrs['fill-opacity'] < defaultOpacity) {
            self.aboutSpecialBubbleSet[i].attr({'fill-opacity': defaultOpacity});
          }
        }
      });
    };

    this.contactSpecialBubbleData = {
      cx: 300, cy: 175, r: 155
    };

    this.showContactState = function () {
      $('#nav-link-list a').not('.contact').removeClass('active');
      $('#nav-link-list a.contact').addClass('active');

      if(typeof(self.contactSpecialBubble) === 'undefined') {
        self.createContactSpecialBubble();
      }

      self.showContactSpecialBubble();
    };

    this.createContactSpecialBubble = function () {
      var windowWidth = $(window).width();
      var windowHeight = $(window).height();

      var paper = self.paper;

      var fill = '0-rgba(0,151,219,.8)-rgba(0,100,178,.9)';

      this.contactSpecialBubble = paper.circle(windowWidth + 1000, windowHeight + 1000, 0).attr({
        'stroke-opacity': 0,
        fill: fill
      });
    };

    this.showContactSpecialBubble = function () {
      var windowWidth = $(window).width();

      var margin = (windowWidth - 800) / 2;
      var specialBubbleData = self.contactSpecialBubbleData;

      var cx = specialBubbleData.cx + margin;
      var cy = specialBubbleData.cy;
      var r = specialBubbleData.r;

      this.contactSpecialBubble.animate({cx: cx, cy: cy, r: r}, 500, '<>', function () {
        self.createAndShowContactSpecialBubbleText();
        self.createAndShowContactExtraBubbles();
      });
    };

    this.createAndShowContactSpecialBubbleText = function () {
      var paper = this.paper;
      var textSet = paper.set();
      var bubble = this.contactSpecialBubble;

      var contactCopy = {
        'title': 'Contact Us',
        'text': "For more information, about\nplease CINCH Learning, please\nemail us or use our contact form."
      };

      var x = bubble.attrs.cx - bubble.attrs.r * 13/20;
      var y = bubble.attrs.cy - bubble.attrs.r * 10/40;

      var contactTitle = paper.text(x, y, contactCopy.title).attr({
        'text-anchor': 'start',
        'stroke-opacity': 0,
        'fill': '#ffffff',
        'font-family': 'Arial, sans',
        'font-size': 32,
        'fill-opacity': 1
      });
      textSet.push(contactTitle);

      var contactTextLines = contactCopy.text.split('\n');
      for(var i=0; contactTextLines[i]; i++) {
        textSet.push(
          paper.text(x, y + 30 + i * 20, contactTextLines[i]).attr({
            'text-anchor': 'start',
            'stroke-opacity': 0,
            'fill': '#ffffff',
            'font-family': 'Arial, sans',
            'font-size': 14,
            'fill-opacity': 1
          })
        );
      }

      bubble.data('textSet', textSet);

    };

    this.contactExtraBubbleData = [
      {cx: 455, cy: 335, r: 50},
      {cx: 350, cy: 355, r: 35},
      {cx: 267, cy: 339, r: 28},
      {cx: 205, cy: 305, r: 20},
      {cx: 174, cy: 263, r: 10}
    ];

    this.createAndShowContactExtraBubbles = function () {
      var bubbleData = self.contactExtraBubbleData;
      var paper = self.paper;
      var bubbleSet = paper.set();

      var windowWidth = $(window).width();
      var margin = (windowWidth - 800) / 2;

      for(var i=0; i < 5; i++) {
        var o = (0.2 + (Math.random() * 0.3)).toFixed(2);
        var cx = bubbleData[i].cx + margin;
        var cy = bubbleData[i].cy;
        var r = bubbleData[i].r;

        var b = paper.circle(cx, cy, r).attr({
          'stroke-opacity': 0,
          fill: '0-rgba(0,151,219,'+o+')-rgba(0,100,178,'+o+')',
          'fill-opacity': 0
        }).toFront().animate({'fill-opacity': .4}, 500);
        bubbleSet.push(b);
      }

      var defaultOpacity = .8;
      var hoverOpacity = 1;

      var mouseOverCallback = function() {
        var tempBubble = typeof(this.data('bubbleObject')) !== 'undefined' ? this.data('bubbleObject') : this;
        tempBubble.attr({'opacity': hoverOpacity, 'fill-opacity': hoverOpacity, 'cursor': 'pointer'});
      };

      var mouseOutCallback = function() {
        var tempBubble = typeof(this.data('bubbleObject')) !== 'undefined' ? this.data('bubbleObject') : this;
        tempBubble.attr({'opacity': defaultOpacity, 'fill-opacity': defaultOpacity, 'cursor': 'pointer'});
      };

      var clickCallback = function() {
        window.open('http://mheducation.force.com/MHE/SEG_Sampling_Leads?id=701C0000000UKSx', '_blank');
      };

      var x, y, bbox;

      bbox = bubbleSet[0].getBBox();
      x = bbox.x + bbox.width / 2;
      y = bbox.y + bbox.height / 2;
      var contactLink = paper.text(x, y, 'Contact\nForm').attr({
        'text-anchor': 'middle',
        'stroke-opacity': 0,
        'font-family': 'Arial, sans',
        'fill': '#ffffff',
        'font-size': 18,
        'fill-opacity': 0,
        'cursor': 'pointer'
      }).animate({'fill-opacity':1}, 500);

      contactLink.mouseover(mouseOverCallback).mouseout(mouseOutCallback).click(clickCallback);
      bubbleSet[0].mouseover(mouseOverCallback).mouseout(mouseOutCallback).click(clickCallback);
      bubbleSet[0].attr({'cursor': 'pointer'}).animate({'fill-opacity': defaultOpacity}, 500);
      contactLink.data('bubbleObject', bubbleSet[0]);
      bubbleSet[0].data('textObject', contactLink);

      self.contactExtraBubbleSet = bubbleSet;
    };

    this.hideState = function () {
      var windowWidth = $(window).width();
      var windowHeight = $(window).height();
      var state = this.state;
      this.state = 'transition';
      if(typeof(this[state + 'BubbleSet']) !== 'undefined') {
        var bubbleSet = this[state + 'BubbleSet'];
        this[state + 'BubbleSet'] = null;

        for (var i=0; bubbleSet[i]; i++) {
          var x = bubbleSet[i].data('bubbleData').anchor.x === 'left' ? -1000 : windowWidth + 1000;
          var y = bubbleSet[i].data('bubbleData').anchor.y === 'top' ? -1000 : windowHeight + 1000;
          bubbleSet[i].animate({cx: x, cy: y}, 500, 'easeIn', function () {
            this.remove();
            $('body').trigger('transitionHide:complete');
          });
        }
      }

      var methodName = 'hide' + state.substr(0, 1).toUpperCase() + state.substr(1) + 'State';
      if (typeof(this[methodName]) !== 'undefined') {
        this[methodName]();
      }

      return this;
    };

    this.hideMainState = function () {
      self.media.pause();
      self.blurb.removeObjectSet();
      $('#hitAreas, #viewport').fadeOut();
    };

    this.hideAboutState = function () {
      self.aboutSpecialBubbleDestroyAndShrink(null);
      var bubbles = self.aboutSpecialBubbleSet;
      var windowWidth = $(window).width();

      for (var i=0; bubbles[i]; i++) {
        bubbles[i].animate({
          cx: windowWidth + 1000
        }, 500, '<>');

        bubbles[i].data('linkObject').animate({
          x: windowWidth + 1000
        }, 500, '<>');
      }
    };

    this.hideContactState = function () {
      self.contactSpecialBubbleTextDestroy();
      self.contactExtraBubblesDestroy();
      var windowWidth = $(window).width();

      self.contactSpecialBubble.animate({
        cx: windowWidth + 1000
      }, 500, '<>');
    };

    this.contactSpecialBubbleTextDestroy = function () {
      if(typeof(self.contactSpecialBubble.data('textSet')) !== 'undefined') {
        var textSet = self.contactSpecialBubble.data('textSet');
        textSet.animate({'fill-opacity': 0}, 100, '<>', function () {
          this.remove();
        });
        self.contactSpecialBubble.data('textSet', null);
      }
    };

    this.contactExtraBubblesDestroy = function () {
      self.contactExtraBubbleSet.forEach(function (e) {
        if(typeof(e.data('textObject')) !== 'undefined') {
          e.data('textObject').remove();
        }
        e.remove();
      });
    };

    this.transition = function (toState) {
      if (['main', 'about', 'contact'].indexOf(toState) === -1) toState = 'main';
      if (this.state === toState) return;

      $('body').on('transitionHide:complete', function () {
        $('body').off('transitionHide:complete');
        self.showState(toState);
      });
      this.hideState();

      return this;
    };

    this.adjustViewingArea = function () {
      // This function is a callback for window resize and orientationchange
      var windowWidth = $(window).width();
      var windowHeight = $(window).height();

      var state = self.state;
      if (['main', 'about', 'contact'].indexOf(state) === -1) return;
      if(typeof(this[state + 'BubbleData']) === 'undefined' || typeof(this[state + 'BubbleSet']) === 'undefined') {
        return;
      }

      var bubbleData = this[state + 'BubbleData'];
      var bubbleSet = this[state + 'BubbleSet'];

      console.log(state);
      console.log(bubbleSet);

      for(var i=0; bubbleSet[i]; i++) {
        bubbleSet[i].attr({
          cx: bubbleData[i].cx + (bubbleData[i].anchor.x === 'right' ? windowWidth : 0),
          cy: bubbleData[i].cy + (bubbleData[i].anchor.y === 'bottom' ? windowHeight : 0)
        });
      }

    };

    this.initMedia = function () {
      this.MediaSubstrate = function (canDoVideo) {

        var $body = $('body');
        this.video = {};
        var self = this;

        function zeroPad(num, places) {
          var zero = places - (num + '').length + 1;
          return Array(+(zero > 0 && zero)).join("0") + num;
        }

        if(canDoVideo){

          //VIDEO BUSINESS
          var $vid = $('video.faces');
          this.video = $vid.get(0);
          this.video.$el = $vid;

          //AUDIO BUSINESS
          var $aud = $('#facesAudio');
          this.aud = $aud.get(0);
          this.aud.$el = $aud;
          this.currentChannel = 0;

          //TRIGGERING COMPLETE AT THE RIGHT MOMENT
          var videoReady = $.Deferred(function(dfd){
            $vid.on('canplaythrough', function(){
              dfd.resolve();
            });
          }).promise();

          $.when(videoReady).done(function () {
            $('body').on('media:set', function () {
              $('body').trigger('media:complete');
            }).trigger('media:set');
          });

          //LOAD STUFF
          this.video.load();

          //SET UP API
          this.resume = function () {
            this.load(0);
            if(this.video.paused) this.video.play();
          };

          this.pause = function () {
            this.video.pause();
            this.aud.pause();
          };

          this.load = function (track) {
            this.aud.pause();
            if(track === 0 || typeof track === 'undefined'){
              this.currentChannel = 0;
              $aud.prop('muted', true);
              $vid.prop('muted', false);
            }else{
              $aud.off('canplaythrough').one('canplaythrough', function () {
                self.aud.currentTime = self.video.currentTime;
                self.aud.play();
                self.currentChannel = track;
                $body.trigger('audioLoaded',[self, track, self.aud]);
                $vid.prop('muted', true);
                $aud.prop('muted', false);
              });
              loadTrack(track);
            }
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
//              $aud.off('loadedmetadata').on('loadedmetadata',function(){
//                self.aud.currentTime = self.video.currentTime;
//              });
          }

        }else{ ////////////////////////////////////////////////////////////////////

          this.video = $f(0).play();
          this.audio = $f(1);
          this.currentChannel = 0;
          this.audioLag = 0.5;

          //TRIGGERING COMPLETE AT THE RIGHT MOMENT

          this.vReady = $.Deferred(function(dfd){
            self.video.getClip(0).onStart(function(){
              $body.trigger('video:loop');
              dfd.resolve();
            });
          }).promise();

          this.aReady = $.Deferred(function(dfd){
            self.aDfd = dfd;
          }).promise();

          $body.off('video:loop').on('video:loop',function(){
            self.audio.play();
          });

          var loadChannels = function(){
            console.log('Getting channels!');
            var c;
            for(c=1;c<=40;c+=1){
              self.audio.addClip({
                url: 'audio/' + zeroPad(c, 2) + '.m4a',
                autoPlay: false,
                autoBuffering: true,
                scaling: "fit",
                fadeInSpeed: 0,
                fadeOutSpeed: 0
              });
            }
            self.aDfd.resolve();
          };

          this.audio.isLoaded() ? loadChannels() : this.audio.onLoad(loadChannels);

          $.when(this.vReady, this.aReady).done(function(){
            $body.trigger('media:complete');
          });

          //THIS IS THE API::::

          var sync = function(){
            self.audioLag = (new Date().getTime() - self.audioStarted) / 1000;
            self.audio.seek(self.video.getTime() + self.audioLag);
            $body.trigger('audioLoaded', [self, self.currentChannel, self.audio]);
          };

          this.start = function(){
            console.log('Playing!');
            this.audio.getClip(this.currentChannel).onBegin(sync);
            this.audioStarted = new Date().getTime();
          };

          this.load = function(track){
            var t = 0;
            if(typeof track !== 'undefined'){t = track}
            this.currentChannel = t;
            this.start();
          };

          this.pause = function(){
            this.video.pause();
            this.audio.pause();
          };

          this.resume = function(){
            this.audio.resume();
            this.video.resume();
          };

        }
      };

      return this;
    };

    this.runScion = function () {
      var scion = require('scion');

      scion.urlToModel("scxml/40faces.sc.xml", function (err, model) {
        if(err) throw err;
        var interpreter = new scion.SCXML(model);
        interpreter.start();

        var $body = $('body');
        self.interpreter = interpreter;
        interpreter.gen({name: "init", data: {app: self}});

        //NAVIGATION:
        var navCallback = function(event) {
          event.preventDefault();
          var className = $.trim(event.target.className);
          if(['main', 'about', 'contact'].indexOf(className) === -1) return;
          var target = className.substr(0, 1).toUpperCase() + className.substr(1);

          $('#nav-link-list a').not('.login').off('click').on('click', function(e) {e.preventDefault()});

          interpreter.gen({name : 'to'+target, data: {app: self}});

          $body.on('transition:complete', function () {
            $('body').off('transition:complete');
            $('#nav-link-list a').not('.login').off('click').on('click', navCallback);
          });
        };

        $('#nav-link-list a').not('.login').on('click', navCallback);

        $(window).on('resize orientationchange', function () {
          self.adjustViewingArea();
        }).trigger('resize');

        //LOADING MEDIA:
        var media;

        var mediaComplete = $.Deferred(function (dfd) {
          $body.on('media:complete', function (e) {
            dfd.resolve();
          });
          $body.trigger('media:set');
        }).promise();

        var bubblesComplete = $.Deferred(function (dfd) {
          $body.on('mainBubbles:complete', function (e) {
            dfd.resolve();
          });
        }).promise();

        $.when(mediaComplete, bubblesComplete).done(function () {
          self.mainIntroSet.animate({'opacity': 0}, 600, '<>', function () {
            self.mainIntroSet.forEach(function(e){e.remove()});
          });
          $('#video').fadeIn(2e3, function () {
            $body.data('readyForHint', true);
            if(typeof(self.hitAreaSet) !== 'undefined') {
              self.hitAreaSet.attr({cursor: 'pointer'});
            }
          });

          interpreter.gen({
            name: 'readyForMain',
            data: {
              media: self.media,
              blurb: self.blurb
            }
          });
        });

        //SWITCHING MEDIA:
        $body.off('audioLoaded').on('audioLoaded', function (e, m, track, a) {
          interpreter.gen({
            name: 'trackLoaded'
          });
        });
        $body.off('blurbs:animationComplete').on('blurbs:animationComplete', function (e, b) {
          interpreter.gen({
            name: 'animationComplete'
          });
        });

        $body.one('shimsLoaded', function () {
          self.media = new self.MediaSubstrate(Modernizr.video);
        });

        Modernizr.load([
          {
            test: Modernizr.video,
            nope: ['js/libs/flowplayer.js','js/libs/html5media.js'],
            complete: function () {
              $body.trigger('shimsLoaded');
            }
          }
        ]);
      });

      return this;
    };

    this.aboutCopy = {
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
  };

  window.Cinch = Cinch;

})(window, window.jQuery, window.Modernizr, window.Raphael, window._);