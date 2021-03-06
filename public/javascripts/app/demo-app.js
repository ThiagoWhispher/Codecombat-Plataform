require.register("test/demo/easeljs/WebGL.demo", function(exports, require, module) {
var RootView, WebGLDemoView, librarianLib, waterfallLib,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/kinds/RootView');

waterfallLib = require('test/demo/fixtures/waterfall');

librarianLib = require('test/demo/fixtures/librarian');

WebGLDemoView = (function(superClass) {
  extend(WebGLDemoView, superClass);

  function WebGLDemoView() {
    return WebGLDemoView.__super__.constructor.apply(this, arguments);
  }

  WebGLDemoView.prototype.template = function() {
    return '<canvas id="visible-canvas" width="1200" height="700" style="background: #ddd"><canvas id="invisible-canvas" width="0" height="0" style="display: none">';
  };

  WebGLDemoView.prototype.testMovieClipWithRasterizedSpriteChildren = function() {
    var builder, child1Shape, child1Sprite, child2Shape, child2Sprite, mc, sheet, stage;
    stage = new createjs.Stage(this.$el.find('canvas')[0]);
    createjs.Ticker.addEventListener("tick", stage);
    child1Shape = new createjs.Shape(new createjs.Graphics().beginFill("#999999").drawCircle(30, 30, 30));
    child2Shape = new createjs.Shape(new createjs.Graphics().beginFill("#5a9cfb").drawCircle(50, 50, 30));
    builder = new createjs.SpriteSheetBuilder();
    builder.addFrame(child1Shape, {
      x: 0,
      y: 0,
      width: 200,
      height: 200
    });
    builder.addFrame(child2Shape, {
      x: 0,
      y: 0,
      width: 200,
      height: 200
    });
    sheet = builder.build();
    child1Sprite = new createjs.Sprite(sheet, 0);
    child2Sprite = new createjs.Sprite(sheet, 1);
    child2Sprite.stop();
    mc = new createjs.MovieClip(null, 0, true, {
      start: 20
    });
    stage.addChild(mc);
    mc.timeline.addTween(createjs.Tween.get(child1Sprite).to({
      x: 0
    }).to({
      x: 60
    }, 50).to({
      x: 0
    }, 50));
    mc.timeline.addTween(createjs.Tween.get(child2Sprite).to({
      x: 60
    }).to({
      x: 0
    }, 50).to({
      x: 60
    }, 50));
    return mc.gotoAndPlay("start");
  };

  WebGLDemoView.prototype.testMovieClipWithEmptyObjectChildren = function() {
    var d1, d2, f, mc, stage;
    stage = new createjs.Stage(this.$el.find('#visible-canvas')[0]);
    createjs.Ticker.addEventListener("tick", stage);
    d1 = {};
    d2 = {};
    mc = new createjs.MovieClip(null, 0, true, {
      start: 20
    });
    stage.addChild(mc);
    mc.timeline.addTween(createjs.Tween.get(d1).to({
      x: 0
    }).to({
      x: 60
    }, 50).to({
      x: 0
    }, 50));
    mc.timeline.addTween(createjs.Tween.get(d2).to({
      x: 60
    }).to({
      x: 0
    }, 50).to({
      x: 60
    }, 50));
    mc.gotoAndPlay("start");
    window.d1 = d1;
    window.d2 = d2;
    f = function() {
      return console.log(JSON.stringify([d1, d2]));
    };
    return setInterval(f, 1000);
  };

  WebGLDemoView.prototype.testWaterfallRasteredPerformance = function() {
    var builder, sheet, sprite, stage, t0, t1, waterfall;
    stage = new createjs.Stage(this.$el.find('canvas')[0]);
    createjs.Ticker.addEventListener("tick", stage);
    builder = new createjs.SpriteSheetBuilder();
    waterfall = new waterfallLib.waterfallRed_JSCC();
    builder.addMovieClip(waterfall);
    t0 = new Date().getTime();
    sheet = builder.build();
    t1 = new Date().getTime();
    console.log("Time to build waterfall sprite sheet: " + (t1 - t0) + "ms");
    sprite = new createjs.Sprite(sheet, 'start');
    return stage.addChild(sprite);
  };

  WebGLDemoView.prototype.test11 = function() {
    var builder, createClass, frames, instance, klass, name, sheet, stage, t0, t1, waterfall;
    stage = new createjs.Stage(this.$el.find('canvas')[0]);
    createjs.Ticker.addEventListener("tick", stage);
    builder = new createjs.SpriteSheetBuilder();
    frames = [];
    createClass = function(frame) {
      var Stub;
      return Stub = (function() {
        function Stub() {
          var sprite;
          sprite = new createjs.Sprite(sheet, frame);
          sprite.stop();
          return sprite;
        }

        return Stub;

      })();
    };
    for (name in waterfallLib) {
      klass = waterfallLib[name];
      window.klass = klass;
      if (name === 'waterfallRed_JSCC') {
        continue;
      }
      instance = new klass();
      builder.addFrame(instance, instance.nominalBounds);
      waterfallLib[name] = createClass(frames.length);
      frames.push(frames.length);
    }
    t0 = new Date().getTime();
    sheet = builder.build();
    t1 = new Date().getTime();
    console.log("Time to build waterfall containers: " + (t1 - t0) + "ms");
    waterfall = new waterfallLib.waterfallRed_JSCC();
    stage.addChild(waterfall);
    this.$el.append(sheet._images[0]);
    this.$el.find('canvas:last').css('background', '#aaf');
    this.$el.find('canvas:last').css('width', '100%');
    return window.stage = stage;
  };

  WebGLDemoView.prototype.testMovieClipStageUpdatePerformance = function() {
    var builder, createClass, frames, i, instance, klass, name, sheet, stage, waterfall;
    stage = new createjs.Stage(this.$el.find('#invisible-canvas')[0]);
    createjs.Ticker.addEventListener("tick", stage);
    console.log('fps', createjs.Ticker.getFPS());
    builder = new createjs.SpriteSheetBuilder();
    frames = [];
    createClass = function(frame) {
      var Stub;
      return Stub = (function() {
        function Stub() {
          var sprite;
          sprite = new createjs.Sprite(sheet, frame);
          sprite.stop();
          return sprite;
        }

        return Stub;

      })();
    };
    for (name in waterfallLib) {
      klass = waterfallLib[name];
      window.klass = klass;
      if (name === 'waterfallRed_JSCC') {
        continue;
      }
      instance = new klass();
      builder.addFrame(instance, instance.nominalBounds);
      waterfallLib[name] = createClass(frames.length);
      frames.push(frames.length);
    }
    sheet = builder.build();
    i = 0;
    while (i < 100) {
      i += 1;
      waterfall = new waterfallLib.waterfallRed_JSCC();
      window.waterfall = waterfall;
      waterfall.x = (i % 10) * 10;
      waterfall.y = i * 2;
      stage.addChild(waterfall);
    }
    return window.stage = stage;
  };

  WebGLDemoView.prototype.testAnimateWaterfallContainersWithMovieClip = function() {
    var builder, createClass, frames, instance, invisibleStage, klass, listener, name, sheet, visibleStage, waterfall;
    invisibleStage = new createjs.Stage(this.$el.find('#invisible-canvas')[0]);
    visibleStage = new createjs.Stage(this.$el.find('#visible-canvas')[0]);
    createjs.Ticker.addEventListener("tick", invisibleStage);
    builder = new createjs.SpriteSheetBuilder();
    frames = [];
    createClass = function(frame) {
      var Stub;
      return Stub = (function() {
        function Stub() {
          var sprite;
          sprite = new createjs.Sprite(sheet, frame);
          sprite.stop();
          return sprite;
        }

        return Stub;

      })();
    };
    for (name in waterfallLib) {
      klass = waterfallLib[name];
      window.klass = klass;
      if (name === 'waterfallRed_JSCC') {
        continue;
      }
      instance = new klass();
      builder.addFrame(instance, instance.nominalBounds);
      waterfallLib[name] = createClass(frames.length);
      frames.push(frames.length);
    }
    sheet = builder.build();
    waterfall = new waterfallLib.waterfallRed_JSCC();
    invisibleStage.addChild(waterfall);
    listener = {
      handleEvent: function() {
        visibleStage.children = waterfall.children;
        return visibleStage.update();
      }
    };
    return createjs.Ticker.addEventListener("tick", listener);
  };

  WebGLDemoView.prototype.testAnimateManyWaterfallContainersWithMovieClip = function() {
    var builder, c, createClass, frames, i, instance, invisibleStage, klass, listener, name, sheet, visibleStage, waterfall;
    invisibleStage = new createjs.Stage(this.$el.find('#invisible-canvas')[0]);
    visibleStage = new createjs.SpriteStage(this.$el.find('#visible-canvas')[0]);
    createjs.Ticker.addEventListener("tick", invisibleStage);
    listener = {
      handleEvent: function() {
        var child, index, j, len, ref;
        ref = visibleStage.children;
        for (index = j = 0, len = ref.length; j < len; index = ++j) {
          child = ref[index];
          child.children = invisibleStage.children[index].children;
        }
        return visibleStage.update();
      }
    };
    createjs.Ticker.addEventListener("tick", listener);
    builder = new createjs.SpriteSheetBuilder();
    frames = [];
    createClass = function(frame) {
      var SuperContainer;
      return SuperContainer = (function(superClass1) {
        extend(SuperContainer, superClass1);

        function SuperContainer() {
          var sprite;
          sprite = new createjs.Sprite(sheet, frame);
          sprite.stop();
          return sprite;
        }

        return SuperContainer;

      })(createjs.Container);
    };
    for (name in waterfallLib) {
      klass = waterfallLib[name];
      window.klass = klass;
      if (name === 'waterfallRed_JSCC') {
        continue;
      }
      instance = new klass();
      builder.addFrame(instance, instance.nominalBounds);
      waterfallLib[name] = createClass(frames.length);
      frames.push(frames.length);
    }
    sheet = builder.build();
    i = 0;
    while (i < 100) {
      waterfall = new waterfallLib.waterfallRed_JSCC();
      window.waterfall = waterfall;
      invisibleStage.addChild(waterfall);
      c = new createjs.SpriteContainer(sheet);
      c.x = (i % 10) * 15;
      c.y = i * 3;
      visibleStage.addChild(c);
      i += 1;
    }
    return window.visibleStage = visibleStage;
  };

  WebGLDemoView.prototype.testAnimateSomeWaterfalls = function() {
    var beStatic, builder, c, createClass, frames, i, instance, invisibleStage, klass, listener, movieClips, name, sheet, spriteContainers, visibleStage, waterfall;
    invisibleStage = new createjs.Stage(this.$el.find('#invisible-canvas')[0]);
    visibleStage = new createjs.SpriteStage(this.$el.find('#visible-canvas')[0]);
    builder = new createjs.SpriteSheetBuilder();
    frames = [];
    createClass = function(frame) {
      var SuperContainer;
      return SuperContainer = (function(superClass1) {
        extend(SuperContainer, superClass1);

        function SuperContainer() {
          var sprite;
          sprite = new createjs.Sprite(sheet, frame);
          sprite.stop();
          return sprite;
        }

        return SuperContainer;

      })(createjs.Container);
    };
    for (name in waterfallLib) {
      klass = waterfallLib[name];
      if (name === 'waterfallRed_JSCC') {
        continue;
      }
      instance = new klass();
      builder.addFrame(instance, instance.nominalBounds);
      waterfallLib[name] = createClass(frames.length);
      frames.push(frames.length);
    }
    sheet = builder.build();
    movieClips = [];
    spriteContainers = [];
    i = 0;
    while (i < 100) {
      beStatic = i % 2;
      waterfall = new waterfallLib.waterfallRed_JSCC();
      if (beStatic) {
        waterfall.gotoAndStop(0);
      } else {
        invisibleStage.addChild(waterfall);
      }
      invisibleStage.addChild(waterfall);
      c = new createjs.SpriteContainer(sheet);
      c.x = (i % 10) * 95;
      c.y = i * 6;
      c.scaleX = 0.3;
      c.scaleY = 0.3;
      visibleStage.addChild(c);
      movieClips.push(waterfall);
      spriteContainers.push(c);
      i += 1;
    }
    createjs.Ticker.addEventListener("tick", invisibleStage);
    listener = {
      handleEvent: function() {
        var child, index, j, len;
        for (index = j = 0, len = spriteContainers.length; j < len; index = ++j) {
          child = spriteContainers[index];
          child.children = movieClips[index].children;
        }
        return visibleStage.update();
      }
    };
    return createjs.Ticker.addEventListener("tick", listener);
  };

  WebGLDemoView.prototype.testAnimateManyRasteredWaterfalls = function() {
    var builder, i, results, sheet, sprite, stage, waterfall;
    stage = new createjs.SpriteStage(this.$el.find('canvas')[0]);
    createjs.Ticker.addEventListener("tick", stage);
    builder = new createjs.SpriteSheetBuilder();
    waterfall = new waterfallLib.waterfallRed_JSCC();
    builder.addMovieClip(waterfall);
    sheet = builder.build();
    i = 0;
    results = [];
    while (i < 2000) {
      sprite = new createjs.Sprite(sheet, 'start');
      sprite.x = (i % 20) * 45;
      sprite.y = i * 0.23;
      sprite.scaleX = 0.3;
      sprite.scaleY = 0.3;
      stage.addChild(sprite);
      results.push(i += 1);
    }
    return results;
  };

  WebGLDemoView.prototype.testManualMovieClipUpdating = function() {
    var builder, createClass, frames, i, instance, klass, listener, name, sheet, visibleStage, waterfall;
    visibleStage = new createjs.Stage(this.$el.find('#visible-canvas')[0]);
    builder = new createjs.SpriteSheetBuilder();
    frames = [];
    createClass = function(frame) {
      var SuperContainer;
      return SuperContainer = (function(superClass1) {
        extend(SuperContainer, superClass1);

        function SuperContainer() {
          var sprite;
          sprite = new createjs.Sprite(sheet, frame);
          sprite.stop();
          return sprite;
        }

        return SuperContainer;

      })(createjs.Container);
    };
    for (name in waterfallLib) {
      klass = waterfallLib[name];
      window.klass = klass;
      if (name === 'waterfallRed_JSCC') {
        continue;
      }
      instance = new klass();
      builder.addFrame(instance, instance.nominalBounds);
      waterfallLib[name] = createClass(frames.length);
      frames.push(frames.length);
    }
    sheet = builder.build();
    waterfall = new waterfallLib.waterfallRed_JSCC();
    visibleStage.children = waterfall.children;
    i = 0;
    listener = {
      handleEvent: function() {
        i += 0.4;
        waterfall.gotoAndPlay(i);
        return visibleStage.update();
      }
    };
    return createjs.Ticker.addEventListener("tick", listener);
  };

  WebGLDemoView.prototype.testManyWaterfallsWithManualAnimation = function() {
    var beStatic, builder, c, createClass, frames, i, instance, klass, listener, movieClips, name, sheet, spriteContainers, visibleStage, waterfall;
    visibleStage = new createjs.SpriteStage(this.$el.find('#visible-canvas')[0]);
    builder = new createjs.SpriteSheetBuilder();
    frames = [];
    createClass = function(frame) {
      var Stub;
      return Stub = (function() {
        function Stub() {
          var sprite;
          sprite = new createjs.Sprite(sheet, frame);
          sprite.stop();
          return sprite;
        }

        return Stub;

      })();
    };
    for (name in waterfallLib) {
      klass = waterfallLib[name];
      if (name === 'waterfallRed_JSCC') {
        continue;
      }
      instance = new klass();
      builder.addFrame(instance, instance.nominalBounds);
      waterfallLib[name] = createClass(frames.length);
      frames.push(frames.length);
    }
    sheet = builder.build();
    movieClips = [];
    spriteContainers = [];
    i = 0;
    while (i < 100) {
      beStatic = false;
      waterfall = new waterfallLib.waterfallRed_JSCC();
      c = new createjs.SpriteContainer(sheet);
      c.x = (i % 10) * 95;
      c.y = i * 6;
      c.scaleX = 0.3;
      c.scaleY = 0.3;
      visibleStage.addChild(c);
      movieClips.push(waterfall);
      spriteContainers.push(c);
      c.children = waterfall.children;
      i += 1;
    }
    i = 0;
    listener = {
      handleEvent: function() {
        var index, j, len;
        i += 0.4;
        for (index = j = 0, len = movieClips.length; j < len; index = ++j) {
          waterfall = movieClips[index];
          waterfall.gotoAndPlay(i * index / 12);
        }
        return visibleStage.update();
      }
    };
    return createjs.Ticker.addEventListener("tick", listener);
  };

  WebGLDemoView.prototype.testLibrarianHorde = function() {
    var SpriteContainerChildClass, beStatic, builder, c, createClass, frames, i, instance, klass, librarian, listener, movieClips, name, sheet, spriteContainers, visibleStage;
    visibleStage = new createjs.SpriteStage(this.$el.find('#visible-canvas')[0]);
    builder = new createjs.SpriteSheetBuilder();
    frames = [];
    createClass = function(frame) {
      var Stub;
      return Stub = (function() {
        function Stub() {
          var sprite;
          sprite = new createjs.Sprite(sheet, frame);
          sprite.stop();
          return sprite;
        }

        return Stub;

      })();
    };
    for (name in librarianLib) {
      klass = librarianLib[name];
      if (name === 'Librarian_SideWalk_JSCC') {
        continue;
      }
      instance = new klass();
      builder.addFrame(instance, instance.nominalBounds);
      librarianLib[name] = createClass(frames.length);
      frames.push(frames.length);
    }
    sheet = builder.build();
    movieClips = [];
    spriteContainers = [];
    i = 0;
    SpriteContainerChildClass = (function(superClass1) {
      extend(SpriteContainerChildClass, superClass1);

      function SpriteContainerChildClass(spriteSheet) {
        this.initialize(spriteSheet);
      }

      return SpriteContainerChildClass;

    })(createjs.SpriteContainer);
    while (i < 100) {
      beStatic = false;
      librarian = new librarianLib.Librarian_SideWalk_JSCC();
      c = new SpriteContainerChildClass(sheet);
      c.x = (i % 10) * 95;
      c.y = i * 6;
      c.scaleX = 1;
      c.scaleY = 1;
      visibleStage.addChild(c);
      movieClips.push(librarian);
      spriteContainers.push(c);
      c.children = librarian.children;
      i += 1;
    }
    i = 0;
    listener = {
      handleEvent: function() {
        var index, j, len;
        i += 0.4;
        for (index = j = 0, len = movieClips.length; j < len; index = ++j) {
          librarian = movieClips[index];
          librarian.gotoAndPlay(i * index / 12);
        }
        return visibleStage.update();
      }
    };
    return createjs.Ticker.addEventListener("tick", listener);
  };

  WebGLDemoView.prototype.testGiantCanvas = function() {
    var builder, createClass, duplicates, frames, i, image, index, instance, j, k, klass, len, len1, name, ref, ref1, results, scale, sheet;
    builder = new createjs.SpriteSheetBuilder();
    builder.maxWidth = 4096;
    builder.maxHeight = 4096;
    scale = 3.9;
    duplicates = 100;
    frames = [];
    createClass = function(frame) {
      var Stub;
      return Stub = (function() {
        function Stub() {
          var sprite;
          sprite = new createjs.Sprite(sheet, frame);
          sprite.stop();
          return sprite;
        }

        return Stub;

      })();
    };
    for (name in librarianLib) {
      klass = librarianLib[name];
      if (name === 'Librarian_SideWalk_JSCC') {
        continue;
      }
      instance = new klass();
      ref = _.range(duplicates);
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        builder.addFrame(instance, instance.nominalBounds, scale);
      }
      librarianLib[name] = createClass(frames.length);
      frames.push(frames.length);
    }
    sheet = builder.build();
    $('body').attr('class', '').empty().css('background', 'white').append($(sheet._images));
    ref1 = sheet._images;
    results = [];
    for (index = k = 0, len1 = ref1.length; k < len1; index = ++k) {
      image = ref1[index];
      results.push(console.log("Sheet #" + index + ": " + ($(image).attr('width')) + "x" + ($(image).attr('height'))));
    }
    return results;
  };

  WebGLDemoView.prototype.afterRender = function() {
    return this.testLibrarianHorde();
  };

  return WebGLDemoView;

})(RootView);

module.exports = function() {
  var v;
  v = new WebGLDemoView();
  v.render();
  window.v = v;
  return v;
};
});

;require.register("test/demo/fixtures/achievements", function(exports, require, module) {
var DungeonArenaStarted, DungeonArenaStartedEarned, Simulated, Simulated2, SimulatedEarned, now, oneDayBefore;

now = new Date();

oneDayBefore = (new Date(now)).setDate(now.getDate() - 1);

module.exports.DungeonArenaStarted = DungeonArenaStarted = {
  _id: '53ba76249259823746b6b481',
  name: 'Dungeon Arena Started',
  description: 'Started playing Dungeon Arena. It was a really really hard game. So hard in fact, that this line should already be spanning',
  worth: 3,
  collection: 'level.session',
  query: "{\"level.original\":\"dungeon-arena\"}",
  userField: 'creator',
  i18n: {
    es: {
      name: 'Dungeon Arenos Started'
    }
  }
};

module.exports.Simulated = Simulated = {
  _id: '53ba76249259823746b6b482',
  name: 'Simulated',
  description: 'Simulated Games.',
  worth: 1,
  collection: 'users',
  query: "{\"simulatedBy\":{\"$gt\":0}}",
  userField: '_id',
  proportionalTo: 'simulatedBy'
};

module.exports.Simulated2 = Simulated2 = {
  _id: '53ba76249259823746b6b483',
  name: 'Simulated2',
  description: 'Simulated games for real.',
  icon: '/images/achievements/cup-02.png',
  worth: 1.5,
  collection: 'users',
  query: "{\"simulatedBy\":{\"$gt\":0}}",
  userField: '_id',
  proportionalTo: 'simulatedBy',
  "function": {
    kind: 'logarithmic',
    parameters: {
      a: 1,
      b: .5,
      c: .5,
      d: 1
    }
  }
};

module.exports.DungeonArenaStartedEarned = DungeonArenaStartedEarned = {
  user: '',
  achievement: DungeonArenaStarted._id,
  collection: DungeonArenaStarted.collection,
  achievementName: DungeonArenaStarted.name,
  created: now,
  changed: now,
  achievedAmount: 1,
  earnedPoints: 3,
  previouslyAchievedAmount: 0,
  notified: true
};

module.exports.SimulatedEarned = SimulatedEarned = {
  user: '',
  achievement: Simulated._id,
  collection: Simulated.collection,
  achievementName: Simulated.name,
  created: now,
  changed: now,
  achievedAmount: 6,
  earnedPoints: 6,
  previouslyAchievedAmount: 5,
  notified: true
};

module.exports.achievements = [DungeonArenaStarted, Simulated, Simulated2];

module.exports.earnedAchievements = [DungeonArenaStartedEarned, SimulatedEarned];
});

;require.register("test/demo/fixtures/librarian", function(exports, require, module) {
(function (lib, img, cjs) {

  var p; // shortcut to reference prototypes
  var rect; // used to reference frame bounds

// stage content:
  (lib.Librarian_SideWalk_JSCC = function(mode,startPosition,loop) {
    this.initialize(mode,startPosition,loop,{Down:0,Up:3,"Down":5,up:8,"Down/":9});

    // R_Heand
    this.instance = new lib.R_Heand_TrW();
    this.instance.setTransform(44.5,72.7,0.818,0.834,0,-3.2,-1.3,35.3,10.3);

    this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:35.1,regY:10.4,scaleX:0.84,scaleY:0.84,rotation:-38,skewX:0,skewY:0,x:42.3,y:69.3},3).to({regX:35.3,scaleX:0.82,scaleY:0.84,rotation:0,skewX:-61,skewY:-59.3,x:44.4,y:77.5},2).to({regX:35.2,scaleX:0.84,scaleY:0.84,rotation:-28.2,skewX:0,skewY:0,x:44.3,y:69.8},3).to({regX:35.3,scaleX:0.82,scaleY:0.83,rotation:0,skewX:-1.9,x:45.4,y:71},1).wait(1));

    // R_Sholder
    this.instance_1 = new lib.L_Sholder_TrW();
    this.instance_1.setTransform(46.7,76,0.833,0.819,0,-33.1,148.8,12.2,18.7);

    this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regX:12.1,regY:18.6,scaleX:0.84,scaleY:0.84,skewX:-32,skewY:147.8,x:47,y:70.7},3).to({scaleX:0.84,scaleY:0.82,skewX:-54.6,skewY:127,x:49.3,y:77.3},2).to({scaleX:0.84,scaleY:0.84,skewX:-32,skewY:147.8,x:48,y:71.3},3).to({regX:12.2,regY:18.7,scaleX:0.83,scaleY:0.82,skewX:-31.6,skewY:150.3,x:47.8,y:72.8},1).wait(1));

    // Head
    this.instance_2 = new lib.Head_01_TrW();
    this.instance_2.setTransform(65.3,53.3,0.842,0.809,0,0,0,35.3,38.9);

    this.timeline.addTween(cjs.Tween.get(this.instance_2).to({regY:39,scaleY:0.84,y:47.4},3).to({scaleY:0.81,y:53.1},2).to({scaleY:0.84,y:47.4},3).to({regY:38.9,y:48.1},1).wait(1));

    // R_Leg
    this.instance_3 = new lib.l_Leg_TrW();
    this.instance_3.setTransform(45.8,109.1,0.837,0.806,0,29.3,23.1,19.4,7.9);

    this.timeline.addTween(cjs.Tween.get(this.instance_3).to({regY:7.8,scaleX:0.84,scaleY:0.67,skewX:-6.9,skewY:-3.3,x:52.8,y:107.3},3).to({regX:19.6,scaleY:0.84,skewX:-24.3,skewY:-3.2,x:55.6,y:110.9},2).to({scaleX:0.83,scaleY:0.85,skewX:15.5,skewY:0.8,x:53.6,y:108.8},3).to({regX:19.3,regY:7.7,scaleX:0.78,scaleY:0.75,skewX:24.5,skewY:9.1,x:50.1,y:109.5},1).wait(1));

    // L_Leg
    this.instance_4 = new lib.R_Leg_TrW();
    this.instance_4.setTransform(74.3,110.8,0.842,0.768,0,-15,180,19.5,8.1);

    this.timeline.addTween(cjs.Tween.get(this.instance_4).to({regX:19.4,regY:8.2,scaleY:0.87,skewX:6,x:71.9,y:109},3).to({regX:19.5,regY:8.3,scaleY:0.76,skewX:21.8,x:63.1,y:111},2).to({regX:19.6,scaleY:0.72,skewX:6.2,skewY:188.5,x:71.3,y:106.1},3).to({regX:19.4,regY:8.2,scaleY:0.87,skewX:-24.1,skewY:180,x:72,y:108.1},1).wait(1));

    // Body
    this.instance_5 = new lib.Body_01_TrW();
    this.instance_5.setTransform(74.5,99.8,0.842,0.768,0,0,0,41.6,48.5);

    this.timeline.addTween(cjs.Tween.get(this.instance_5).to({regY:48.6,scaleY:0.84,y:96.9},3).to({regY:48.5,scaleY:0.77,y:99.7},2).to({regY:48.6,scaleY:0.84,y:96.9},3).to({regY:48.4,scaleY:0.82,y:97.8},1).wait(1));

    // Isolation Mode
    this.instance_6 = new lib.Sword();
    this.instance_6.setTransform(64.5,66.6,1.396,1.396,0,-16.1,163.8,11.8,30.6);

    this.timeline.addTween(cjs.Tween.get(this.instance_6).to({x:64.4,y:60.7},3).to({x:58.3,y:66.3},2).to({x:66.9,y:61.3},3).to({x:66.1,y:63.9},1).wait(1));

    // Plate
    this.instance_7 = new lib.ArmorPart_01_TrW();
    this.instance_7.setTransform(72.6,103.3,0.841,0.813,0,-15.8,-11.4,7.2,8.3);

    this.timeline.addTween(cjs.Tween.get(this.instance_7).to({scaleX:0.84,scaleY:0.84,skewX:-2.5,skewY:0,x:72.1,y:101.3},3).to({regY:8.2,scaleX:0.84,scaleY:0.82,skewX:12.9,skewY:12.1,x:68.2,y:103.8},2).to({scaleX:0.84,scaleY:0.75,rotation:-9.3,skewX:0,skewY:0,x:72.2,y:99.4},3).wait(1).to({scaleY:0.84,rotation:-7,x:71.9,y:102},0).wait(1));

    // Layer 3
    this.instance_8 = new lib.ArmorPart_TrW();
    this.instance_8.setTransform(52.2,102.4,0.912,0.821,0,15.6,4.7,15.1,8.6);

    this.timeline.addTween(cjs.Tween.get(this.instance_8).to({regX:15,regY:8.7,scaleX:0.98,scaleY:0.84,skewX:0,skewY:4.1,x:53.7,y:100.5},3).to({regX:15.1,regY:8.8,scaleX:0.83,scaleY:0.84,skewX:-9.3,skewY:3.9,x:54.1,y:103.4},2).to({regY:8.7,scaleX:0.92,scaleY:0.84,skewX:0,skewY:0.1,x:54.7,y:100.7},3).wait(1).to({regY:8.6,scaleX:0.89,skewY:4.1,x:53.9,y:101.6},0).wait(1));

    // l_Sholder
    this.instance_9 = new lib.L_Sholder_TrW();
    this.instance_9.setTransform(75.2,73.8,0.842,0.81,0,35.5,35,11.4,16.1);

    this.timeline.addTween(cjs.Tween.get(this.instance_9).to({regX:11.3,regY:16,scaleY:0.84,rotation:40.5,skewX:0,skewY:0,y:67.9},3).to({regX:11.4,regY:16.2,scaleY:0.82,rotation:0,skewX:57.4,skewY:56.9,x:72.2,y:72.9},2).to({regY:16,scaleY:0.84,rotation:37,skewX:0,skewY:0,x:75.2,y:67.8},3).to({regY:16.1,scaleY:0.81,rotation:0,skewX:35.5,skewY:35,y:70.9},1).wait(1));

    // L_Heand
    this.instance_10 = new lib.L_Heand_TrW();
    this.instance_10.setTransform(71.2,89,0.842,0.815,0,-1.3,-0.6,7.6,51.4);

    this.timeline.addTween(cjs.Tween.get(this.instance_10).to({x:70.7,y:85.4},3).to({x:66.2,y:89},2).to({x:70.7,y:85.4},3).to({x:72,y:87.3},1).wait(1));

    // Layer 11
    this.shape = new cjs.Shape();
    this.shape.graphics.f("rgba(0,0,0,0.451)").s().p("Ah7BLIgXgJQg8gbgBgnQAAglA9gcQA+gbBUAAQBWAAA9AbQA9AcAAAlQAAAYgWATQgPAMgYALIgXAJQg2AShGAAQhFAAg2gSg");
    this.shape.setTransform(61.5,113);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).wait(10));

  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = rect = new cjs.Rectangle(33.6,20,63.2,102.4);
  p.frameBounds = [rect, new cjs.Rectangle(33.9,17.5,62.9,104.9), new cjs.Rectangle(34.1,15,62.6,107.3), new cjs.Rectangle(34,12.5,62.7,109.8), new cjs.Rectangle(32.8,17.9,60.9,104.5), new cjs.Rectangle(35.3,19.5,55.3,102.9), new cjs.Rectangle(34,17.2,59.5,105.2), new cjs.Rectangle(32.8,14.9,63.6,107.5), new cjs.Rectangle(34.9,12.5,64.3,109.8), new cjs.Rectangle(34.9,13.4,63.5,109)];


// symbols:
  (lib.Sword = function() {
    this.initialize();

    // Isolation Mode
    this.shape = new cjs.Shape();
    this.shape.graphics.f("#FFD15F").s().p("AgTAJQgFgJABgDIADgCIAFADQAGACAGAAQAWAAAFgMQgCAQgGAFQgJAEgHAAQgJAAgKgEg");
    this.shape.setTransform(10,45.8,0.749,0.749,-97.4);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics.f("#FFD15F").s().p("AgSAIQgLgHAEgFQAEgGAMgDIAJgBQAQAAAKAJQAEAFgLAGQgKAJgJAAQgIAAgKgHg");
    this.shape_1.setTransform(6.6,46.6,0.749,0.749,-97.4);

    this.shape_2 = new cjs.Shape();
    this.shape_2.graphics.f("#FFD15F").s().p("AgQASQAAgCAFgEQAHgGADgGIAGgOQAEgIACgBQADgBACADQACAEgCACIgLAYQgEAJgEAEQgDACgDAAQgEAAgDgGg");
    this.shape_2.setTransform(8.7,44.1,0.749,0.749,-97.4);

    this.shape_3 = new cjs.Shape();
    this.shape_3.graphics.f("#FFD15F").s().p("AAEAVQgEgDgCgMIgFgOQgCgEgEgDIgDgBIAAgCQAAgEAHgBQADAAACAEIAEAHIAQAcQADAHgFABIgCAAQgEAAgEgDg");
    this.shape_3.setTransform(9.4,48.3,0.749,0.749,-97.4);

    this.shape_4 = new cjs.Shape();
    this.shape_4.graphics.f("#A37605").s().p("AgWACIgHgKIAAgCQAFAAAHAGIAKAGIAHADQAFABAFgFQAOgNAGABQgBAFgGAGQgFAJgFACQgDACgLAAQgNAAgIgLg");
    this.shape_4.setTransform(8.5,46.1,0.749,0.749,-97.4);

    this.shape_5 = new cjs.Shape();
    this.shape_5.graphics.f("#1D2226").s().p("AgrAqQgUgSABgYQgBgYAVgSQASgQAYAAQAZAAASARQAUAQAAAZIAAAAQAAAZgTARQgTARgZAAQgZgBgSgQgAglgjQgQAOAAAVQAAAUARAPQAQAOAUAAQAWAAAPgOQARgPAAgUQABgUgRgQQgPgNgXgBQgVABgQAOg");
    this.shape_5.setTransform(9,46.1,0.749,0.749,-97.4);

    this.shape_6 = new cjs.Shape();
    this.shape_6.graphics.f("#A37605").s().p("AgEAiQgNgCgSgLQgTgLgBgJQgBgFABgMIACgLIAFgCQAFgBACAJIAGAVQAEAIAJAEQAPAGANgCQAUgDAFgSQAFgUAGgGQAEgEAGACQAEABAAARQgBAPgDAFQgEAIgUALQgSALgKAAIgEgBg");
    this.shape_6.setTransform(10.3,45.8,0.749,0.749,-97.4);

    this.shape_7 = new cjs.Shape();
    this.shape_7.graphics.f("#F1B50F").s().p("AgoAmQgSgQAAgWQAAgVASgQQARgQAXAAQAYAAARAQQASAQAAAVQAAAWgSAQQgRAQgYAAQgXAAgRgQg");
    this.shape_7.setTransform(9,46.2,0.749,0.749,-97.4);

    this.shape_8 = new cjs.Shape();
    this.shape_8.graphics.f("#1D2226").s().p("AhQAKIgEAAQgJgBgGgEQgFgDgCgCQgDgEABgGIALACQAAADAEADIALACIADAAIACAAIC6AAIAAAKIi7ABg");
    this.shape_8.setTransform(1,48.2,0.749,0.749,-97.4);

    this.shape_9 = new cjs.Shape();
    this.shape_9.graphics.f("#1D2226").s().p("AgGCVIhEgCIgZgDQgGgDgDgDIgEgKIgBgGIgDhKIgChZIAAguIAEgtIADgGIABgBIAKgEIAWgDIBUgCIA5ABQAUABAKACIAFABIADACIAFAFIAAAAIABADIABAHIACAJIADAEIABABIABACIABAGIADBRIgBBZQAAAXgBAXIgBARIgCAIIgBABIgBACIAAABIgDACIgDABIgEABIgSADQgaABgkAAIgcAAgAgwiEIgwAGIgCAAIAAABIgBAFIgBAhIAAAtIACBZIAEBOIABABIAAAAQAEACAQABIBDACQA7AAAegCIAOgCIAAAAIAAgFIADiRIgEhOIAAgBIgGgCIgBgUIAAgCIABAAIgCgCIABABIAAABIgBAAQgHgCgTgCQgYgDgggBQgeAAgYACg");
    this.shape_9.setTransform(7.1,46.8,0.749,0.749,-97.4);

    this.shape_10 = new cjs.Shape();
    this.shape_10.graphics.f("#1D2226").s().p("AgvASQgggDgQgHIgBAAIgBgCQgDgFABgCQABgFAEgDQAFgDAIgCQALgDANgBQAggBAQABQAwADAtgDIAEAAIAMAhIg2ADIguABIgLAAIgkgBgAg4gKQgQACgHACQgGACgDADIgBABIABAAQAOAGAcAEQATADAbAAIAtgCIAogGIgGgNQgrgEgtAAIgOgBQgUAAgNADg");
    this.shape_10.setTransform(-0.9,47.8,0.749,0.749,-97.4);

    this.shape_11 = new cjs.Shape();
    this.shape_11.graphics.f("#EAD1AE").s().p("AhbADQgJgLAngFQAUgDAVABIBpACIAJAXQgjAEgpACIgXAAQg+AAgYgNg");
    this.shape_11.setTransform(-0.9,47.8,0.749,0.749,-97.4);

    this.shape_12 = new cjs.Shape();
    this.shape_12.graphics.f("#AD3AAD").s().p("AheAbQgKgFgCgLQgCgPABgGQAAgKAGgDQAFgDBcgBQBWgCAGABQAFACADAEQAEAFAAAGQAAAFAEAGIAEAKQAAAFgJAOIi4AAQgEAAgFgCg");
    this.shape_12.setTransform(-0.9,48,0.749,0.749,-97.4);

    this.shape_13 = new cjs.Shape();
    this.shape_13.graphics.f("#70266C").s().p("AhjByQgHgFAAhrQgBhpAIgHQAIgIBeAAQBfgBAFAJQAFAIAABpQgBBpgEAGQgDAGhiAAQhfgBgGgFg");
    this.shape_13.setTransform(8.6,46.5,0.749,0.749,-97.4);

    this.shape_14 = new cjs.Shape();
    this.shape_14.graphics.f("#85632A").s().p("AhGCMQgUgBgFgDQgCgCgCgKQgMjzALgLQAIgJBdAAQBgAAAFAJQAEAJABB5QAAB1gEAHQgDAEhAAGQg3AGgnAAIgMAAg");
    this.shape_14.setTransform(7,47.2,0.749,0.749,-97.4);

    this.addChild(this.shape_14,this.shape_13,this.shape_12,this.shape_11,this.shape_10,this.shape_9,this.shape_8,this.shape_7,this.shape_6,this.shape_5,this.shape_4,this.shape_3,this.shape_2,this.shape_1,this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = rect = new cjs.Rectangle(-4.6,36.9,23.5,19.9);
  p.frameBounds = [rect];


  (lib.R_Leg_TrW = function() {
    this.initialize();

    // Isolation Mode
    this.shape = new cjs.Shape();
    this.shape.graphics.f("#1D2226").s().p("AABAqIgIgCQgQgDgKgHQgNgJgFgPQgEgKABgOIABgNIACgFQADgEAIgBQAGADACAEIABAEIACALQABAKAEAGQAEAFAEAEQAGAEAJABIAEABIACAAIAEgBQAGgEAFgGQAFgFAFgIIAEgIIACgHIADgBIAHgBIAGACQABAAAAAAQABAAAAAAQAAABABAAQAAAAAAABIABACIAAAHIgCAMQgDAMgIAKQgKAOgLAFQgJAFgJAAg");
    this.shape.setTransform(20.3,14.7,1,1,0,9,-170.9);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics.f("#1D2226").s().p("AAGAuIgQgDQgSgDgPgHQgOgHgHgJQgFgHgCgHQgCgIACgIQACgLAFgJIAAgBIABAAQACgFAFgDIAHgDIAOgCQALAAAVACQATACATAEIAAgBIAFABQAGABAFADQAIAEAFAGQAFAGACAGQADAJgDAJIgEAQQgCAIgEAFQgDAFgGADQgGAEgKABIgJABIgVgCgAglgQIgCAAIgDAIIABAGQABACADACIAJAFQAHAEARADIAOACQAMACAIgBIAHgBIAAAAIAFgQIAAgEIgBgCQAAAAAAgBQgBAAAAAAQAAgBgBAAQAAAAgBAAIgFgCIgCAAIgBAAIgPgDQgRgDgPAAIgLgBIgJABg");
    this.shape_1.setTransform(20.9,8.8,1,1,0,9,-170.9);

    this.shape_2 = new cjs.Shape();
    this.shape_2.graphics.f("#654127").s().p("AghAMQAJgCAKgFQATgIAEgSQASgBAFALQADAFgBAGQgCAJgJAHQgIAGgMAAQgOAAgWgKg");
    this.shape_2.setTransform(19.5,14.9,1,1,0,9,-170.9);

    this.shape_3 = new cjs.Shape();
    this.shape_3.graphics.f("#654127").s().p("AgOAfQgagFgIgFQgEgDgCgJQAaAGASgVQAJgMACgNIA1ALQACAQgIANQgNAXggAAQgHAAgKgBg");
    this.shape_3.setTransform(19.7,9.2,1,1,0,9,-170.9);

    this.shape_4 = new cjs.Shape();
    this.shape_4.graphics.f("#965D36").s().p("AAAAhQghgFgJgcQgHgWAJgLQAFAJAOAGQAZAMAqgNQgEAZgHAMQgKAQgSAAIgHgBg");
    this.shape_4.setTransform(20.3,14.4,1,1,0,9,-170.9);

    this.shape_5 = new cjs.Shape();
    this.shape_5.graphics.f("#965D36").s().p("AgDAnQgogIgHgeQgHgWAKgMQAagIAYAAQA0ABgBAoQgDAYgHAIQgIAKgTAAQgJAAgLgDg");
    this.shape_5.setTransform(20.6,10,1,1,0,9,-170.9);

    this.addChild(this.shape_5,this.shape_4,this.shape_3,this.shape_2,this.shape_1,this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = rect = new cjs.Rectangle(13.7,4.2,14.6,14.7);
  p.frameBounds = [rect];


  (lib.R_Heand_TrW = function() {
    this.initialize();

    // Isolation Mode
    this.shape = new cjs.Shape();
    this.shape.graphics.f("#BF7643").s().p("AgPgPQAAgEAPAEQARAEABAFQAAAGgiASQgDAAAEghg");
    this.shape.setTransform(32.1,15.9);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics.f("#BF7643").s().p("AgVAMIAEgZIAnABQAAAMgWAIQgMAGgGAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAgBAAAAg");
    this.shape_1.setTransform(31,28.1);

    this.shape_2 = new cjs.Shape();
    this.shape_2.graphics.f("#BF7643").s().p("AgTgHQAAgFARgCQAQgDAHAJQAKALgzANQgEAAAFgXg");
    this.shape_2.setTransform(31.6,21.7);

    this.shape_3 = new cjs.Shape();
    this.shape_3.graphics.f("#1D2226").s().p("AAEAGQgdAAgdAHIgGgRQAegIAiAAQAgAAAZAJIgHAQQgWgHgcAAg");
    this.shape_3.setTransform(34,19.3);

    this.shape_4 = new cjs.Shape();
    this.shape_4.graphics.f("#1D2226").s().p("AggACQgVAAgGABIgBAAIgCgSQAMgBASAAQA1AAAqAQIgIARQglgPgyAAg");
    this.shape_4.setTransform(34.3,25.9);

    this.shape_5 = new cjs.Shape();
    this.shape_5.graphics.f("#1D2226").s().p("AhHgIQAjgKAxAAQAfAAAcAEIgEAcQgagEgdAAQgsAAggAJg");
    this.shape_5.setTransform(34.1,32.3);

    this.shape_6 = new cjs.Shape();
    this.shape_6.graphics.f("#FFB685").s().p("AgdABIgDgRQAlgDAUACQAPACgOAPQgOARgSACIgCAAQgOAAgHgSg");
    this.shape_6.setTransform(31.3,37.9);

    this.shape_7 = new cjs.Shape();
    this.shape_7.graphics.f("#1D2226").s().p("AguCfQgSgIgNgSIgDgEQgMgRgCgWQgBgMACgLQACgMADgKIAOhiQAOhlAFgHQAEgHAJAEIAKAFIgaDRIAAADIgBACQgDAFgBALQgCAJABAIQABANAIALIABACQAKANAMAGQAMAGAKgDQAGgCAGgFIANgJIANgHIAQgHIAGAVIABAAIACgBQAEgDADgGQAFgKABgLQADgfgTgpIAAAAIAAhQQgBhTgBgFIAIADQAFACAEADIADADIAAAEQAFApAJBcQALAgACAnQABAmgJARQgHAOgKAHQgMAIgLgCQgLgBgHgJIgLAIIAAAAQgKAGgKAEQgHACgIAAQgOAAgPgIg");
    this.shape_7.setTransform(33.7,28.9);

    this.shape_8 = new cjs.Shape();
    this.shape_8.graphics.f("#654127").s().p("AgDgiIgWgBIgVgCIAqgZIACgYIAsAPIAFCdIg6ABg");
    this.shape_8.setTransform(35.5,23);

    this.shape_9 = new cjs.Shape();
    this.shape_9.graphics.f("#965D36").s().p("AgohlQBXAbAGAHQABACACAbQABA2AIBUQgLgCg7ACIg7ACg");
    this.shape_9.setTransform(33.7,22.7);

    this.shape_10 = new cjs.Shape();
    this.shape_10.graphics.f("#FFE1CC").s().p("AgTARIAChgIAGgJQAHgCAKAMIANAPQADACgQBIQgNBHgDAHIAAABQgDAAgGhJg");
    this.shape_10.setTransform(29.6,23);

    this.shape_11 = new cjs.Shape();
    this.shape_11.graphics.f("#C1733E").s().p("AgcCPQgsgDgBgrQAVALAXABQArACAMg1QAJgugTghQABgegDhbIAJAAQAKAAAFAEQAIAGAEAsIAFBYQABARgBAMIAGACIAMAxQAGAxgeAEQgJABgIgJQgHgJgDgCQgHAdglAAIgGAAg");
    this.shape_11.setTransform(34.6,29.9);

    this.shape_12 = new cjs.Shape();
    this.shape_12.graphics.f("#1D2226").s().p("AgHASIgIgCQAXgYAIgOIgDAeQgBAKACAFQgMgCgJgDg");
    this.shape_12.setTransform(37.2,39.6);

    this.shape_13 = new cjs.Shape();
    this.shape_13.graphics.f("#EF995E").s().p("AgGBhQgagDgTgdQgSgcADgWQABgNAJgWQAJgbAFgZQACgMATgIQAUgIATAFQA4ANgIBXQgDAagWAgQgXAjgUAAIgEgBg");
    this.shape_13.setTransform(31.1,34.6);

    this.addChild(this.shape_13,this.shape_12,this.shape_11,this.shape_10,this.shape_9,this.shape_8,this.shape_7,this.shape_6,this.shape_5,this.shape_4,this.shape_3,this.shape_2,this.shape_1,this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = rect = new cjs.Rectangle(24.1,12.2,19.1,33.5);
  p.frameBounds = [rect];


  (lib.L_Sholder_TrW = function() {
    this.initialize();

    // Isolation Mode
    this.shape = new cjs.Shape();
    this.shape.graphics.f("#BF7643").s().p("AgHgMQAFgBAJADQALAEgBAEQgBAEghALg");
    this.shape.setTransform(15.6,17.1,1,1,0,-25.1,154.8);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics.f("#1D2226").s().p("Ag4gHIAAgEIAHgLIBqAbIgFASQgHgDhlgbg");
    this.shape_1.setTransform(16.5,21.1,1,1,0,-25.1,154.8);

    this.shape_2 = new cjs.Shape();
    this.shape_2.graphics.f("#1D2226").s().p("Ag1gDIAOgPIAVAUIBGgKIACASQgbACgvAGIgDABg");
    this.shape_2.setTransform(4.8,10.3,1,1,0,-25.1,154.8);

    this.shape_3 = new cjs.Shape();
    this.shape_3.graphics.f("#1D2226").s().p("AAAAJIhBgMIAHgTQAMAIASAFQAOAFAPAEQAhAEAgAAIgBATIhBgOg");
    this.shape_3.setTransform(8.1,13.5,1,1,0,-25.1,154.8);

    this.shape_4 = new cjs.Shape();
    this.shape_4.graphics.f("#1D2226").s().p("AAHBIQgUgBgSgGQgZgHgOgPIgEgEIgBgGQgBgZALgUQAKgVAWgPQARgMAXgGQASgFAZgBIACAeQgVABgRAEQgRAFgNAJQgPAKgHANQgGAMgBANQAIAFAPAFQALADAVAEIAkAEIAJAAQAHgHAJgCIAFADQAAAKgEAKIgBADIgBABIgBACIgDACIgBAAIgEACIgBAAIgOACIgWABIgRgBg");
    this.shape_4.setTransform(8.5,11.4,1,1,0,-25.1,154.8);

    this.shape_5 = new cjs.Shape();
    this.shape_5.graphics.f("#A52F00").s().p("AgcAeQgYgHgTgHIACgOQAsAXAzgcQAbgPASgUQAFAcgMAXQgJAUgLAFIgPABQgYAAghgJg");
    this.shape_5.setTransform(8.2,13.7,1,1,0,-25.1,154.8);

    this.shape_6 = new cjs.Shape();
    this.shape_6.graphics.f("#DD3900").s().p("AhHAgQgCgcASgWQAbgkA7gDQAfAFAIAiQAJAjgeAoIgbABQhDAAgagag");
    this.shape_6.setTransform(7.4,11.9,1,1,0,-25.1,154.8);

    this.shape_7 = new cjs.Shape();
    this.shape_7.graphics.f("#FFE5D4").s().p("AgVAkQABgLARgeIAOgfQACgBAJAAIgaBLQgIgCgJAAg");
    this.shape_7.setTransform(12.1,11.9,1,1,0,-25.1,154.8);

    this.shape_8 = new cjs.Shape();
    this.shape_8.graphics.f("#1D2226").s().p("AASBXQANgWAJgXQAKgbgCgSQgBgXgNgNQgDgEgMgJIgJgEIgDgBIgCACIgIAQIgTAjIgjBKIgYgKQAOgsAOgiQALgaAHgNIALgUIAJgLIAHgGQAIgFAHAAIABAAIACABIAQAFIAOAHQAOAIAKAOQAVAbgEAjQgCAZgOAdQgIARgSAfg");
    this.shape_8.setTransform(12.1,14.7,1,1,0,-25.1,154.8);

    this.shape_9 = new cjs.Shape();
    this.shape_9.graphics.f("#654127").s().p("AglA8IAchAQATg1ADgTQAWgCADA9IgTAmQgTApgCAQg");
    this.shape_9.setTransform(9.4,17.8,1,1,0,-25.1,154.8);

    this.shape_10 = new cjs.Shape();
    this.shape_10.graphics.f("#965D36").s().p("AAHBKQgOgIgLgCIgagCQgSgCgIgDQAOguAVgrQAZg1ALAAIAlAJQAlASgFAzQgEAFgOAkIgSA0QgIgDgTgJg");
    this.shape_10.setTransform(12.2,15.3,1,1,0,-25.1,154.8);

    this.addChild(this.shape_10,this.shape_9,this.shape_8,this.shape_7,this.shape_6,this.shape_5,this.shape_4,this.shape_3,this.shape_2,this.shape_1,this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = rect = new cjs.Rectangle(-0.3,5.4,22.5,20.2);
  p.frameBounds = [rect];


  (lib.l_Leg_TrW = function() {
    this.initialize();

    // Isolation Mode
    this.shape = new cjs.Shape();
    this.shape.graphics.f("#1D2226").s().p("AABAqIgIgCQgQgDgKgHQgNgJgFgPQgEgKABgOIABgNIACgFQADgEAIgBQAGADACAEIABAEIACALQABAKAEAGQAEAFAEAEQAGAEAJABIAEABIACAAIAEgBQAGgEAFgGQAFgFAFgIIAEgIIACgHIADgBIAHgBIAGACQABAAAAAAQABAAAAAAQAAABABAAQAAAAAAABIABACIAAAHIgCAMQgDAMgIAKQgKAOgLAFQgJAFgJAAg");
    this.shape.setTransform(21.3,14.9,1,1,-9.4);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics.f("#1D2226").s().p("AAGAuIgQgDQgSgDgPgHQgOgHgHgJQgFgHgCgHQgCgIACgIQACgLAFgJIAAgBIABAAQACgFAFgDIAHgDIAOgCQALAAAVACQATACATAEIAAgBIAFABQAGABAFADQAIAEAFAGQAFAGACAGQADAJgDAJIgEAQQgCAIgEAFQgDAFgGADQgGAEgKABIgJABIgVgCgAglgQIgCAAIgDAIIABAGQABACADACIAJAFQAHAEARADIAOACQAMACAIgBIAHgBIAAAAIAFgQIAAgEIgBgCQAAAAAAgBQgBAAAAAAQAAgBgBAAQAAAAgBAAIgFgCIgCAAIgBAAIgPgDQgRgDgPAAIgLgBIgJABg");
    this.shape_1.setTransform(20.7,9.1,1,1,-9.4);

    this.shape_2 = new cjs.Shape();
    this.shape_2.graphics.f("#654127").s().p("AghAMQAJgCAKgFQATgIAEgSQASgBAFALQADAFgBAGQgCAJgJAHQgIAGgMAAQgOAAgWgKg");
    this.shape_2.setTransform(22.1,15.1,1,1,-9.4);

    this.shape_3 = new cjs.Shape();
    this.shape_3.graphics.f("#654127").s().p("AgOAfQgagFgIgFQgEgDgCgJQAaAGASgVQAJgMACgNIA1ALQACAQgIANQgNAXggAAQgHAAgKgBg");
    this.shape_3.setTransform(21.9,9.4,1,1,-9.4);

    this.shape_4 = new cjs.Shape();
    this.shape_4.graphics.f("#965D36").s().p("AAAAhQghgFgJgcQgHgWAJgLQAFAJAOAGQAZAMAqgNQgEAZgHAMQgKAQgSAAIgHgBg");
    this.shape_4.setTransform(21.3,14.6,1,1,-9.4);

    this.shape_5 = new cjs.Shape();
    this.shape_5.graphics.f("#965D36").s().p("AgDAnQgogIgHgeQgHgWAKgMQAagIAYAAQA0ABgBAoQgDAYgHAIQgIAKgTAAQgJAAgLgDg");
    this.shape_5.setTransform(21,10.3,1,1,-9.4);

    this.addChild(this.shape_5,this.shape_4,this.shape_3,this.shape_2,this.shape_1,this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = rect = new cjs.Rectangle(13.4,4.4,14.6,14.7);
  p.frameBounds = [rect];


  (lib.L_Heand_TrW = function() {
    this.initialize();

    // Isolation Mode
    this.shape = new cjs.Shape();
    this.shape.graphics.f("#FFB685").s().p("AgCAIQgKgBgFgHIgEgHQADgBARADQAOACAGACQAHABgKAEQgIAEgIAAIgCAAg");
    this.shape.setTransform(16.3,58.8,0.934,0.934,3.7);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics.f("#EF995E").s().p("AgGAQQgNgCgOgOIgLgQQgCgDAKAHQARALALABQAIAAARAAIAXABQAIACgEACIgMAGQgJAHgQAAIgNgCg");
    this.shape_1.setTransform(15.8,58,0.934,0.934,3.7);

    this.shape_2 = new cjs.Shape();
    this.shape_2.graphics.f("#FFB685").s().p("AgRAHQgFgFgBgCQgBgCAPgEIAMgEQALgDADACQADABAEAIQAGAMgeADIgDAAQgJAAgFgGg");
    this.shape_2.setTransform(19.2,53.5,0.934,0.934,3.7);

    this.shape_3 = new cjs.Shape();
    this.shape_3.graphics.f("#1D2226").s().p("AgYAZQgPgFgMgKIgBgBQgIgJgCgKQAAgIADgEQAEgFAFgBQgEAEAAAEQAAAEABAEQAEAIAIAEQAKAEALACQALABAMgCQALgBANgEQAPgDAJgEIAMAZQgOAGgPADQgQACgOAAQgNAAgPgEg");
    this.shape_3.setTransform(17.9,55.3,0.934,0.934,3.7);

    this.shape_4 = new cjs.Shape();
    this.shape_4.graphics.f("#1D2226").s().p("AgJBoQgfgEgUgPQgYgRgHgdQgIggAMgpIABgoIATgIQAEAXACAIIAFARIgBAEQgLAlAGAYQAFATAOALQAOAKATACQANADAKgBIACAAQAOgCAIgFQAGgEAIgJIAHgMQAHgNAAgOQgBgKgDgGQgCgJgEgGIgBgCIgVhSIAJgEQADgCAIAAIAdBNQAFAIADAMQADAIACANQABAZgMATIgJAPQgKAOgMAHQgNAJgVADIgLABg");
    this.shape_4.setTransform(16.3,52.9,0.934,0.934,3.7);

    this.shape_5 = new cjs.Shape();
    this.shape_5.graphics.f("#EF995E").s().p("AghAdQgigagGgUQgEgPAaABQArABAJgDQASgFAcgLQAVgGAFARQAGAWgOAbQgPAggZAHIgJABQgUAAgdgWg");
    this.shape_5.setTransform(17.7,56.2,0.934,0.934,3.7);

    this.shape_6 = new cjs.Shape();
    this.shape_6.graphics.f("#1D2226").s().p("AhEAyIgOhgQAAgDABgCIACgDIADgDIAHgEIAUgJQAbgKAYgEIAPgBQAJABAEACIAEADIABADIArB3IAFAMIgRACQgCAAgJgVIglhkIgCgBIgLABQgPACgVAHQgTAGgLAGQAEAmAJA1QACASAAANIgSAGg");
    this.shape_6.setTransform(15.4,40.7,0.934,0.934,3.7);

    this.shape_7 = new cjs.Shape();
    this.shape_7.graphics.f("#BF7643").s().p("AgRgBQgBgFASgGQAQgHACAFQACAGgeAZIAAAAQgCAAgFgSg");
    this.shape_7.setTransform(15.6,35.2,0.934,0.934,36.9);

    this.shape_8 = new cjs.Shape();
    this.shape_8.graphics.f("#BF7643").s().p("AgUgDQgBgFAQgGQAPgHAJAHQAMALgvAWIAAAAQgEAAAAgWg");
    this.shape_8.setTransform(16.7,40.2,0.934,0.934,3.7);

    this.shape_9 = new cjs.Shape();
    this.shape_9.graphics.f().s("#1D2226").ss(2).p("Ag3AMQAPgHAVgFQAqgOAiAE");
    this.shape_9.setTransform(14,38.3,0.934,0.934,3.7);

    this.shape_10 = new cjs.Shape();
    this.shape_10.graphics.f().s("#1D2226").ss(2).p("Ag8AHQAQgGAXgCQAtgIAlAH");
    this.shape_10.setTransform(14.9,44,0.934,0.934,3.7);

    this.shape_11 = new cjs.Shape();
    this.shape_11.graphics.f().s("#1D2226").ss(3).p("Ag7ARQAOgHAXgIQAugOAygE");
    this.shape_11.setTransform(15.2,50.1,0.934,0.934,3.7);

    this.shape_12 = new cjs.Shape();
    this.shape_12.graphics.f("#654127").s().p("AgagkIgLgKIAHgQIACgNIAngBIAbCQIg2AJg");
    this.shape_12.setTransform(12.3,42.8);

    this.shape_13 = new cjs.Shape();
    this.shape_13.graphics.f("#BF7643").s().p("AgRAQIgCgZIAngIQADANgUAMQgNAKgEAAQgBAAAAgBQgBAAAAAAQAAAAAAAAQgBgBAAAAg");
    this.shape_13.setTransform(17.9,45,0.934,0.934,-155.5);

    this.shape_14 = new cjs.Shape();
    this.shape_14.graphics.f("#C1733E").s().p("AgUAqQgDACgEgBIgOgBQgeABgEgtIABgwIAPgEQAQAAAHAaQAhATAqgKQAWgFAPgJQAGAqguAfQgYAPgNAAQgOAAgFgNg");
    this.shape_14.setTransform(16,56.6,0.934,0.934,3.7);

    this.shape_15 = new cjs.Shape();
    this.shape_15.graphics.f("#965D36").s().p("AhGhOQBXgVAHAFQACABAHAbQAOA2AYBOQgLAAg7APIg3APg");
    this.shape_15.setTransform(15.2,42.9,0.934,0.934,3.7);

    this.shape_16 = new cjs.Shape();
    this.shape_16.graphics.f("#DDA27A").s().p("AAJBDQgKAAgBgKIgThrIACgCQATgQAEADQACABAIA+QAIA6AAAGQgBAFgKAAIgCAAg");
    this.shape_16.setTransform(11.1,41.2,0.934,0.934,3.7);

    this.shape_17 = new cjs.Shape();
    this.shape_17.graphics.f("#C1733E").s().p("AhBAhIgDgEQACgEgCgFIgCgXQgCgSgFACQAMgGALACIARADQAEAUARABQAJACASgDQAggBAEgEQAIgGAAgkIAEAWIAGAUQAFAMAIAGQgSAVg2AKQgRAEgNAAQgeAAgLgPg");
    this.shape_17.setTransform(16.3,49.3,0.934,0.934,3.7);

    this.shape_18 = new cjs.Shape();
    this.shape_18.graphics.f("#FFE1CC").s().p("AgchHIAEgBQAGgBADACQAFAEAKAjIAdBoIgbABQgBgPgdiBg");
    this.shape_18.setTransform(18.3,41.7,0.934,0.934,3.7);

    this.shape_19 = new cjs.Shape();
    this.shape_19.graphics.f("#FFCDAB").s().p("AgNBPQgbgXgRgNIgNhtQgBgGAqgOQApgPANAHIAsB3IACAkQgHAjgvABQgLAAgTgSg");
    this.shape_19.setTransform(15.4,42.7,0.934,0.934,3.7);

    this.addChild(this.shape_19,this.shape_18,this.shape_17,this.shape_16,this.shape_15,this.shape_14,this.shape_13,this.shape_12,this.shape_11,this.shape_10,this.shape_9,this.shape_8,this.shape_7,this.shape_6,this.shape_5,this.shape_4,this.shape_3,this.shape_2,this.shape_1,this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = rect = new cjs.Rectangle(7.4,32.8,17.8,30.1);
  p.frameBounds = [rect];


  (lib.Head_01_TrW = function() {
    this.initialize();

    // Isolation Mode
    this.shape = new cjs.Shape();
    this.shape.graphics.f("#081214").s().p("AgZAgQgKgNAAgTQAAgRAKgNQALgPAOAAQAQAAAKAPQAKANAAARQAAATgKANQgKAOgQAAQgOAAgLgOgAgNgVQgHAJAAAMQAAANAHAJQAGAJAHAAQAJAAAFgJQAIgJgBgNQABgMgIgJQgGgJgIAAQgGAAgHAJg");
    this.shape.setTransform(50.9,45.1);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics.f("#F3FDFF").s().p("AgRAcIAZg+IAKAGQgHAVgSAqg");
    this.shape_1.setTransform(50.8,45.2);

    this.shape_2 = new cjs.Shape();
    this.shape_2.graphics.f("#7CDCFA").s().p("AgTAbQgJgLAAgQQAAgOAJgMQAIgLALAAQAMAAAIALQAJAMAAAOQAAAQgJALQgIALgMAAQgLAAgIgLg");
    this.shape_2.setTransform(50.9,45.1);

    this.shape_3 = new cjs.Shape();
    this.shape_3.graphics.f("#081214").s().p("AghAhQgPgNAAgUQAAgSAPgOQAOgOATAAQAUAAAOAOQAPAOAAASQAAAUgPANQgOAOgUAAQgTAAgOgOgAgXgVQgKAKAAALQAAANAKAJQAKAKANAAQAOAAAKgKQAKgJAAgNQAAgLgKgKQgKgJgOAAQgNAAgKAJg");
    this.shape_3.setTransform(38.6,45.7);

    this.shape_4 = new cjs.Shape();
    this.shape_4.graphics.f("#F3FDFF").s().p("AgUAgIgFgCIAkhBIAPAHQgKAVgaArIgKgEg");
    this.shape_4.setTransform(38.7,45.9);

    this.shape_5 = new cjs.Shape();
    this.shape_5.graphics.f("#7CDCFA").s().p("AgcAbQgMgLAAgQQAAgPAMgMQAMgLAQAAQARAAAMALQAMAMAAAPQAAAQgMALQgMAMgRAAQgQAAgMgMg");
    this.shape_5.setTransform(38.6,45.7);

    this.shape_6 = new cjs.Shape();
    this.shape_6.graphics.f("#131C20").s().p("AgiAHQAAgCAEgFQAIgHAHgEQAIgFAHAAQAPAAAIAIQAGAGAHAJIgSAJQgFgIgCgDQgFgDgGAAQgCAAgCACQgEACgDACIgGAJg");
    this.shape_6.setTransform(45.4,44.5);

    this.shape_7 = new cjs.Shape();
    this.shape_7.graphics.f("#1D2226").s().p("AgiBfQgZgsgDg1QgBgdAGgYQAJghAVgQIAHgFIAIAEQAKADAGAKQAIAJAEAGQAHALAKAVIANAfIAKAgIAIAZIgZgHIgkgIIgFAbQgIAbgJANIgIAPgAgfgvQgGATgBAZQgBAkAMAhIAEgQIAJgyIAiADIgPgkQgHgTgFgIQgFgJgFgEQgJAKgFAQg");
    this.shape_7.setTransform(38.6,31.7);

    this.shape_8 = new cjs.Shape();
    this.shape_8.graphics.f("#F1B50F").s().p("AgugKQACg6AfgXQASAJAXA2QAMAbAHAXQgigEgNABQgFAGgGAcQgGAfgFAIQgZgvABg3g");
    this.shape_8.setTransform(38.3,31.6);

    this.shape_9 = new cjs.Shape();
    this.shape_9.graphics.f("#FFD56E").s().p("AgYACIgfgzQgNgOAkAIQATADAUAHQADAAARAcQAUAdAMAaQgBABgXgWIgWgUIAXAqQgKAGgRAOQgFgFgcg0g");
    this.shape_9.setTransform(45.8,20.2);

    this.shape_10 = new cjs.Shape();
    this.shape_10.graphics.f("#FFD56E").s().p("AAAAAIg6g+QgLgQAXgDQALgBARACQAFgBAVAnQAeAyAZBKQgGgOg5hEg");
    this.shape_10.setTransform(39,22);

    this.shape_11 = new cjs.Shape();
    this.shape_11.graphics.f("#FFD56E").s().p("AAUAEIgxg4IAFBPIgtAFIgFgpQgEgsgBgCQgLgOAmgKQAlgKAMAIQAKAIAZAtQAcAxAWBBQgKgUg0g+g");
    this.shape_11.setTransform(33,22.5);

    this.shape_12 = new cjs.Shape();
    this.shape_12.graphics.f("#FFD56E").s().p("AgNAAIAKg4IABgJQACgIAMAVQAGAKAFALQgXAzgWAwQgBgMAKg4g");
    this.shape_12.setTransform(19.3,26);

    this.shape_13 = new cjs.Shape();
    this.shape_13.graphics.f("#FFD56E").s().p("AAehQQAEABAGAFQAEAGAAAIQAAAEgbAnQgjAxgaAxQAHhbBDhGg");
    this.shape_13.setTransform(17.9,25.9);

    this.shape_14 = new cjs.Shape();
    this.shape_14.graphics.f("#FFD56E").s().p("AgRAAQgEgVAAgvQABgqACgFQAFgPARgEQAKgBAIABIgKBwQgFApgGB1QgMhngGghg");
    this.shape_14.setTransform(22.6,30.4);

    this.shape_15 = new cjs.Shape();
    this.shape_15.graphics.f("#FFD56E").s().p("Ag3gSQAFgbAYgRQANgIALgDQAOgFAWAMQASALAFAKQADAGgXALIgjASQgOAKgYAmIAEgeQADgZgDAMIgUBRQgHg8AEgig");
    this.shape_15.setTransform(20,9);

    this.shape_16 = new cjs.Shape();
    this.shape_16.graphics.f("#C1733E").s().p("AAHAlQgJgJgKgdIgIgdQAGgXAQAcQAQAZABAMQAFAdgJAAQgDAAgFgEg");
    this.shape_16.setTransform(16,42.5);

    this.shape_17 = new cjs.Shape();
    this.shape_17.graphics.f("#1D2226").s().p("AASBKQgJgBgJgJQgKgJgMgSQgJgQgGgOQgHgSgBgPQgBgKAEgJQAEgLAIgHQAGgGAMgDIAKgCIAIABQALADAGAKQAEAIABAJIgEACQgOgOgHAAIgEABIgGABQgFACgEAEQgHAGABAOQABAMAHAPQAEAIAJAQQAIAQAHAHIAHAFIABAAIADgBQAEgFAHgUIAIAAQADAKgBAHQAAALgFAIQgDAGgGADQgFAEgGAAIgDgBg");
    this.shape_17.setTransform(15.6,42.4);

    this.shape_18 = new cjs.Shape();
    this.shape_18.graphics.f("#EF995E").s().p("AgVAUQgbgxATgWQAGgHAJgDQAFgCAEAAQAKgCAHAFQAKAKAKAmQANA2gSASQgEAFgFAAQgRAAgWgtg");
    this.shape_18.setTransform(16.1,42.3);

    this.shape_19 = new cjs.Shape();
    this.shape_19.graphics.f("#1D2226").s().p("AhiDXIgjgUQgJhNAAgPQAAgygeAKQgRAFgBA6QAAAdADAcIgVgOIgNghQgyidBIhjQAtg/BNgYQBFgWBEAPQAWAEAyATQAcAKAbAXQAbAYANAgQANAfADAnIgMDdIgOgCIgbgMIAEgIQAIgaAEgcQAEgegCgbQAAgfgLgWQgFgKgJgIQgHgHgIgDIgBAAIgBAAQgCABgEAFQgGAJgFAMIgNAaQgGALgIAJQgNANgKAAQgNAAgPgKIgYgTQgSgQgOgJQgQgLgOgDQgQgFgRACQgGADgEAHQgEAIgEAQQgEAVgDAkQgCAgABAbIACA8IACAVQgNAAgPgGgAimAaQAYABAMAOQAHAHABAGIALByIAJAGIgBghQAAgcABgjQADgmAFgZQAHgUAEgKQAGgLAFgFQAIgIAIgDIADgBQAXgDAWAHQATAHATANQAXAQANANIAPAPQAKAIAJgCQAFgCADgGIAFgLIAMgWQAGgOAJgNQAGgJAHgFQAFgDAGgBQAHAAAEACQAQAGAJAQQAHANADASQACAOABAfIAEhMQgCghgLgZQgLgbgWgTQgfgbg/gNQhVgRhaAfQhLAjgZBiQgNAuADAqQABgIAGgJQALgRAXAAIABAAg");
    this.shape_19.setTransform(33.8,31.2);

    this.shape_20 = new cjs.Shape();
    this.shape_20.graphics.f("#F1B50F").s().p("AiABDIgzgYIgnAtIgFhPQgDhcBKg7QA9gwBLgDIBPAEQA6AFAnAbQA6ApAGBVIgMDLIgSgBQAHgoACguQAEhagYgeQgPgGgcAmQggAtgJAFQgNADgLgKIhJgoQg2gigPAKQgRAPgGBlQgCA1AAAwIggABg");
    this.shape_20.setTransform(34.4,31.3);

    this.shape_21 = new cjs.Shape();
    this.shape_21.graphics.f("#FFB685").s().p("AgMAAQAAgJAEgOIAEgLIAEAMQAGAPAFANQAFARgFAGQgEAEgIABIgBABQgKAAAAgjg");
    this.shape_21.setTransform(45.7,46.1);

    this.shape_22 = new cjs.Shape();
    this.shape_22.graphics.f("#1D2226").s().p("AgWAAIAWgBIAXgDQgIAIgPABIgBAAQgMAAgJgFg");
    this.shape_22.setTransform(44,56.9);

    this.shape_23 = new cjs.Shape();
    this.shape_23.graphics.f("#1D2226").s().p("AguAEQAJgEAOgCIAXgEIAXgBQAOABAKADQgTAHgcADIgWABQgPgBgJgDg");
    this.shape_23.setTransform(43.7,54.8);

    this.shape_24 = new cjs.Shape();
    this.shape_24.graphics.f("#1D2226").s().p("AgRAKQgKgIgCgIIARAGQAJACAEgCQAIAAAGgDIAPgMQAAAMgHAHQgHAKgNABIgDABQgJAAgIgGg");
    this.shape_24.setTransform(44.5,50.9);

    this.shape_25 = new cjs.Shape();
    this.shape_25.graphics.f("#1D2226").s().p("AAQAGQgkgYgcgKQAiAGAYALQASAJAVANIgBASQgNgKgTgNg");
    this.shape_25.setTransform(35.8,37.2);

    this.shape_26 = new cjs.Shape();
    this.shape_26.graphics.f("#BC624D").s().p("AghAFIgMgIQAKgDApgDIAogDIgKAMQgNAJgWADIgHABQgPAAgMgIg");
    this.shape_26.setTransform(43.9,55.7);

    this.shape_27 = new cjs.Shape();
    this.shape_27.graphics.f("#1D2226").s().p("AgeAAQAegRAhACIABADQgVAGgYALIgWAMg");
    this.shape_27.setTransform(50.7,37.2);

    this.shape_28 = new cjs.Shape();
    this.shape_28.graphics.f("#1D2226").s().p("AgkATIgGgDIACgGQAAgDAGgIQAIgNANgHQANgGAMAAQANAAAMAEIAFABIABAQIAAABQgGANgJAKQgLAKgRAAQgOAAgWgJgAgRAAIgGAHQAOAGAJAAQALAAAHgGQAGgGAEgKIAAgBQgJgCgHAAQgSAAgLAMg");
    this.shape_28.setTransform(50.8,40.8);

    this.shape_29 = new cjs.Shape();
    this.shape_29.graphics.f("#FFFFFF").s().p("AgiAMQADgMALgHQAUgUAiALIABAJQgHATgPAGQgGADgHAAQgNAAgVgJg");
    this.shape_29.setTransform(50.9,40.8);

    this.shape_30 = new cjs.Shape();
    this.shape_30.graphics.f("#1D2226").s().p("AggAQQgJgJgHgRIgDgIIAIgCQAUgHARAAQAZAAASARQAJAJADAHIADAHIgGADQgbAMgTAAIAAAAQgTAAgNgMgAgfgIQAEAIAGAFQAJAIAMAAQANAAASgIIgEgFQgOgMgTAAQgMAAgNAEg");
    this.shape_30.setTransform(35.4,41.2);

    this.shape_31 = new cjs.Shape();
    this.shape_31.graphics.f("#FFFFFF").s().p("AgQARQgQgHgJgXQApgOAZARQANAJAEAKQgZALgRAAQgIAAgIgDg");
    this.shape_31.setTransform(35.4,41.2);

    this.shape_32 = new cjs.Shape();
    this.shape_32.graphics.f("#EF995E").s().p("AAdCPQhDgFgbgWQgogggMhcQAFgaAIgWIAHgQQATABBFglQBCgkAJABQATACAQAfQASAlgCAxQgCBEgVAvQgXA1gmAAIgEgBg");
    this.shape_32.setTransform(40.4,44.7);

    this.shape_33 = new cjs.Shape();
    this.shape_33.graphics.f("#1D2226").s().p("AA5D8Qg8gGhJgoQg9gjg0gxIgBgBIgBgCQgahBgJg2IAAgFIAHgIIAYg3IAfg/QAlhFAwgrIACgDIAEAAIAdgEIAdgCQAegBAaAEQAhAEAZAJQAdAKAZATIACABIABACQAXAmANAcIAaBAIADAFIAAADQADAZABAiIACA3IAAACQgGArgHAcQgLAmgSAeQgXAkggAPQgZANgfAAIgRgBgAgPjkIg0AEQgqAogkBAIgfA9IgaA3IgDAEQAIA1AXA4QAyAvA6AhQBBAlA8AFQAjADAagOQAbgNASgfQAbgwAHhQIgEg0QgDgggEgXIgBgDIgBgGIgUg6QgPgigRgcQgmgdg6gIQgXgDgXAAIgHAAg");
    this.shape_33.setTransform(33.2,38.2);

    this.shape_34 = new cjs.Shape();
    this.shape_34.graphics.f("#C1733E").s().p("ABNDxQhMgDhjhAIhWg/QgXg8gGg2IAHgKQAmhVARgeQAjg/ApgnQAcgIAdgBQBngIA/AyQAlA9ATBAQABADACAEQAEAaADAwIgNBQQgIAxgKAcQgbBLhIAAIgHAAg");
    this.shape_34.setTransform(32.9,38.3);

    this.shape_35 = new cjs.Shape();
    this.shape_35.graphics.f("#1D2226").s().p("AgRDXQgJgBgHgFQgFgDgGgIQgHgJgJgVQgMgjgJg0QgJgvgFgyQgEgvAAgeIABgNQACgtAdgfQAdggAnAAIAGABQAoACAaAhQAbAfAAAtIAAAIQgCAPgEAXQgFAcgHAbQgSBHgSA0QgQAqgNAWQgKAQgHAHQgHAGgJAAgAgtihQgWAXgCAhIAAAMQAAAkAGA4QAHBBALAvQAIAlAKATQAEALAGAFIAAABIACgCQAHgIAGgMQAKgXAQgvQAdhXANhKQADgNABgOIAAgGQAAghgUgYQgTgXgbgBIgDgBQgaAAgUAXg");
    this.shape_35.setTransform(20.6,19.2);

    this.shape_36 = new cjs.Shape();
    this.shape_36.graphics.f("#F1B50F").s().p("AgQDFQgggCgViCQgThtAEg7QADgpAagbQAbgbAhACQAkADAXAeQAXAegCApQgEA8gfBpQgkB8gdAAIgBAAg");
    this.shape_36.setTransform(20.7,19);

    this.addChild(this.shape_36,this.shape_35,this.shape_34,this.shape_33,this.shape_32,this.shape_31,this.shape_30,this.shape_29,this.shape_28,this.shape_27,this.shape_26,this.shape_25,this.shape_24,this.shape_23,this.shape_22,this.shape_21,this.shape_20,this.shape_19,this.shape_18,this.shape_17,this.shape_16,this.shape_15,this.shape_14,this.shape_13,this.shape_12,this.shape_11,this.shape_10,this.shape_9,this.shape_8,this.shape_7,this.shape_6,this.shape_5,this.shape_4,this.shape_3,this.shape_2,this.shape_1,this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = rect = new cjs.Rectangle(9.5,-2.2,48.7,65.9);
  p.frameBounds = [rect];


  (lib.Body_01_TrW = function() {
    this.initialize();

    // Isolation Mode
    this.shape = new cjs.Shape();
    this.shape.graphics.f("#1D2226").s().p("AANAlIgGgDIgHgFIgagWIgDgDIAAgDIAFglIAFAAQATAAAOAHQAGACAFAGIACADIACAKIABAQIgBAJIgCALIgCAEIgCACIgGADgAgNgBQAIAGANAJIgDgXIAAABIAAgBIgCgBIgSgNg");
    this.shape.setTransform(39.9,29.4);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics.f("#DD3900").s().p("AgMgBIgBgHQgBgFACAAIAZAPQABABAAALIgBAAQgEAAgVgPg");
    this.shape_1.setTransform(39.6,28.7);

    this.shape_2 = new cjs.Shape();
    this.shape_2.graphics.f("#A52F00").s().p("AgSAEIAAggIAlASIAAAng");
    this.shape_2.setTransform(39.6,29.1);

    this.shape_3 = new cjs.Shape();
    this.shape_3.graphics.f("#DD3900").s().p("Ag1AEIAJgGQADgCAtgDIAvgCQADABABAEQABAEgFACQgEADgtACIg0ACIgBABQgGAAAEgGg");
    this.shape_3.setTransform(16.8,29.7);

    this.shape_4 = new cjs.Shape();
    this.shape_4.graphics.f("#1D2226").s().p("Ag+AhIgDAAIgFgBQgKgFgCgLQgBgFABgIQABgLAIgLIAEgGIAHgEIADgBIANgBIApgCQAuADAjADIAEAAIADArIgGACIiFAPgAg1gGQgFAGgDAHIgBAGIAAABIACABIAOAAIAogDQAogEAigFIADgVIhLAGQgPAAgZADIgIACIAAgBIgBABIABAAgAg0gHg");
    this.shape_4.setTransform(15.8,30.2);

    this.shape_5 = new cjs.Shape();
    this.shape_5.graphics.f("#A52F00").s().p("AhBgPICJgHIgBAhIiOAMg");
    this.shape_5.setTransform(16.2,30.2);

    this.shape_6 = new cjs.Shape();
    this.shape_6.graphics.f("#1D2226").s().p("Ag/CRIAdhKIAahJQAghkALg0IAdAKQgYAygfBgIgWBMQgQA2gFAXg");
    this.shape_6.setTransform(18,43.8);

    this.shape_7 = new cjs.Shape();
    this.shape_7.graphics.f("#737A7F").s().p("AADAHQgDgBgDgCQgEgBgBgDQgBgFAIgBIAEACQAFAEABAEQgBADgEAAIgBAAg");
    this.shape_7.setTransform(34.5,50.9);

    this.shape_8 = new cjs.Shape();
    this.shape_8.graphics.f("#1D2226").s().p("AgKALQgEgFAAgGQAAgFAEgFQAFgEAFAAQAGAAAFAEQAEAFAAAFQAAAGgEAFQgFAEgGAAQgFAAgFgEg");
    this.shape_8.setTransform(34.6,51.4);

    this.shape_9 = new cjs.Shape();
    this.shape_9.graphics.f("#737A7F").s().p("AgIAEQAAgEAGgEIAEgCQAIABgBAFQgBADgEABQgEACgCABIgCAAQgEAAAAgDg");
    this.shape_9.setTransform(27.2,52.6);

    this.shape_10 = new cjs.Shape();
    this.shape_10.graphics.f("#1D2226").s().p("AgKALQgEgFAAgGQAAgFAEgFQAFgEAFAAQAGAAAFAEQAEAFAAAFQAAAGgEAFQgFAEgGAAQgFAAgFgEg");
    this.shape_10.setTransform(27.5,53.1);

    this.shape_11 = new cjs.Shape();
    this.shape_11.graphics.f("#737A7F").s().p("AADAHQgDgBgDgCQgEgBgBgDQgBgFAIgBIAEACQAFAEABAEQgBADgEAAIgBAAg");
    this.shape_11.setTransform(34.5,45.1);

    this.shape_12 = new cjs.Shape();
    this.shape_12.graphics.f("#1D2226").s().p("AgKALQgEgFAAgGQAAgFAEgFQAFgEAFAAQAGAAAFAEQAEAFAAAFQAAAGgEAFQgFAEgGAAQgFAAgFgEg");
    this.shape_12.setTransform(34.6,45.4);

    this.shape_13 = new cjs.Shape();
    this.shape_13.graphics.f("#737A7F").s().p("AgIADQAAgEAGgDIAEgCQAIAAgBAGQgBACgEACQgEADgEAAQgEAAAAgEg");
    this.shape_13.setTransform(27.2,46.8);

    this.shape_14 = new cjs.Shape();
    this.shape_14.graphics.f("#1D2226").s().p("AgKALQgEgFAAgGQAAgFAEgFQAFgEAFAAQAGAAAFAEQAEAFAAAFQAAAGgEAFQgFAEgGAAQgFAAgFgEg");
    this.shape_14.setTransform(27.5,47.1);

    this.shape_15 = new cjs.Shape();
    this.shape_15.graphics.f("#737A7F").s().p("AADAHQgDgBgDgCQgEgBgBgDQgBgFAIgBIAEACQAFAEABAEQgBADgEAAIgBAAg");
    this.shape_15.setTransform(34.5,38.3);

    this.shape_16 = new cjs.Shape();
    this.shape_16.graphics.f("#1D2226").s().p("AgKALQgEgFAAgGQAAgFAEgFQAFgEAFAAQAGAAAFAEQAEAFAAAFQAAAGgEAFQgFAEgGAAQgFAAgFgEg");
    this.shape_16.setTransform(34.6,38.7);

    this.shape_17 = new cjs.Shape();
    this.shape_17.graphics.f("#737A7F").s().p("AgIADQAAgEAGgDIAEgCQAIAAgBAGQgBACgEACQgEADgEAAQgEAAAAgEg");
    this.shape_17.setTransform(27.2,40.1);

    this.shape_18 = new cjs.Shape();
    this.shape_18.graphics.f("#1D2226").s().p("AgKALQgEgFAAgGQAAgFAEgFQAFgEAFAAQAGAAAFAEQAEAFAAAFQAAAGgEAFQgFAFgGgBQgFABgFgFg");
    this.shape_18.setTransform(27.5,40.4);

    this.shape_19 = new cjs.Shape();
    this.shape_19.graphics.f("#737A7F").s().p("AgDAEQgEgCgBgCQgBgGAIAAIAEACQAFADABAEQAAAEgEAAQgEAAgEgDg");
    this.shape_19.setTransform(34.5,32.5);

    this.shape_20 = new cjs.Shape();
    this.shape_20.graphics.f("#1D2226").s().p("AgKALQgEgFAAgGQAAgFAEgFQAFgEAFAAQAGAAAFAEQAEAFAAAFQAAAGgEAFQgFAEgGAAQgFAAgFgEg");
    this.shape_20.setTransform(34.6,32.9);

    this.shape_21 = new cjs.Shape();
    this.shape_21.graphics.f("#737A7F").s().p("AgIAEQAAgEAGgEIAEgCQAIABgBAFQgBADgEABQgFADgDAAQgEAAAAgDg");
    this.shape_21.setTransform(27.2,34.1);

    this.shape_22 = new cjs.Shape();
    this.shape_22.graphics.f("#1D2226").s().p("AgKALQgEgFAAgGQAAgFAEgFQAFgEAFAAQAGAAAFAEQAEAFAAAFQAAAGgEAFQgFAEgGAAQgFAAgFgEg");
    this.shape_22.setTransform(27.5,34.6);

    this.shape_23 = new cjs.Shape();
    this.shape_23.graphics.f("#737A7F").s().p("AgDAEQgEgCgBgCQgBgGAIAAIAEACQAFADABAEQAAAEgEAAQgEAAgEgDg");
    this.shape_23.setTransform(34.5,27.3);

    this.shape_24 = new cjs.Shape();
    this.shape_24.graphics.f("#1D2226").s().p("AgKAKQgEgEAAgGQAAgFAEgFQAFgFAFAAQAGAAAFAFQAEAFAAAFQAAAGgEAEQgFAGgGAAQgFAAgFgGg");
    this.shape_24.setTransform(34.6,28);

    this.shape_25 = new cjs.Shape();
    this.shape_25.graphics.f("#737A7F").s().p("AgIADQAAgEAGgDIAEgCQAIABgBAFQgBACgEACQgEADgEAAQgEAAAAgEg");
    this.shape_25.setTransform(27.2,29);

    this.shape_26 = new cjs.Shape();
    this.shape_26.graphics.f("#1D2226").s().p("AgKALQgEgFAAgGQAAgFAEgEQAFgFAFgBQAGABAFAFQAEAEAAAFQAAAHgEAEQgFAEgGABQgFgBgFgEg");
    this.shape_26.setTransform(27.5,29.7);

    this.shape_27 = new cjs.Shape();
    this.shape_27.graphics.f("#737A7F").s().p("AgDAEQgEgCgBgDQgBgFAIAAIAEACQAFADABAEQAAAEgEAAQgEAAgEgDg");
    this.shape_27.setTransform(34.5,21.8);

    this.shape_28 = new cjs.Shape();
    this.shape_28.graphics.f("#1D2226").s().p("AgKALQgEgFAAgGQAAgFAEgFQAFgEAFAAQAGAAAFAEQAEAFAAAFQAAAGgEAFQgFAEgGAAQgFAAgFgEg");
    this.shape_28.setTransform(34.6,22.4);

    this.shape_29 = new cjs.Shape();
    this.shape_29.graphics.f("#737A7F").s().p("AgIADQAAgEAGgDIAEgCQAIABgBAFQgBADgEABQgEADgEAAQgEAAAAgEg");
    this.shape_29.setTransform(27.2,23.4);

    this.shape_30 = new cjs.Shape();
    this.shape_30.graphics.f("#1D2226").s().p("AgKALQgEgFAAgGQAAgFAEgFQAFgEAFAAQAGAAAFAEQAEAFAAAFQAAAGgEAFQgFAEgGAAQgFAAgFgEg");
    this.shape_30.setTransform(27.5,24.1);

    this.shape_31 = new cjs.Shape();
    this.shape_31.graphics.f("#737A7F").s().p("AADAHIgGgDQgEgBgBgDQgBgFAIgBIAEACQAFAEABAEQgBADgEAAIgBAAg");
    this.shape_31.setTransform(34.5,16.1);

    this.shape_32 = new cjs.Shape();
    this.shape_32.graphics.f("#1D2226").s().p("AgKALQgEgFAAgGQAAgFAEgFQAFgEAFAAQAGAAAFAEQAEAFAAAFQAAAGgEAFQgFAEgGAAQgFAAgFgEg");
    this.shape_32.setTransform(34.6,16.6);

    this.shape_33 = new cjs.Shape();
    this.shape_33.graphics.f("#737A7F").s().p("AgIAEQAAgEAGgEIAEgCQAIABgBAFQgBADgEABQgEACgCABIgCAAQgEAAAAgDg");
    this.shape_33.setTransform(27.2,17.8);

    this.shape_34 = new cjs.Shape();
    this.shape_34.graphics.f("#1D2226").s().p("AgKALQgEgFAAgGQAAgFAEgFQAFgEAFAAQAGAAAFAEQAEAFAAAFQAAAGgEAFQgFAEgGAAQgFAAgFgEg");
    this.shape_34.setTransform(27.5,18.3);

    this.shape_35 = new cjs.Shape();
    this.shape_35.graphics.f("#FF4310").s().p("AggATIgNhWQABgIAsgHQAvgIgBAOQgBAYgNA0QgRA9gPAVQgDAEgDAAQgNAAgNhDg");
    this.shape_35.setTransform(30.7,25.1);

    this.shape_36 = new cjs.Shape();
    this.shape_36.graphics.f("#1D2226").s().p("AhZEQQAChSACilIABi4QAAghgEgaIABAAIABABIABABIABAAIACABQAAAAAAABQABAAAAAAQABAAAAABQABAAAAAAIAEABIAEACIAAAAIADACIADABIADACIABAAIABAAQgCAVgBAZIABC4IACDlIB5gcIABj7IgBiFIgBhCQgCgngHgcIACAAIABABIAAAAIABABIAAABIABAAIAAABIAAAAIABABIAAAAIAAABIAAAAIABAAIAAABIAAABIAAAAIABABIAAAAIAAABIABABIAAABIABABIAAAAIAAABIABAAIAAABIAAAAIABABIAAABIAAAAIABABIAAABIAAABIAAABIABABIAAABIABABIAAAAIAAABIABABIAAAAIABABIAAABIABAAIAAABIABABIAAAAIAAABIABABIABABIAAABIAAAAIAAABIABABIAAAAIAAACIABABIAAAAIAAABIAAABIAAAAIAAABIABAAIAAABIAAABIAAABIAAAAIAAACIABABIAAACIAAACIAAAAIAAAPIABBCIADCEQAHDFADBCIABANIi1Apg");
    this.shape_36.setTransform(30.8,33.1);

    this.shape_37 = new cjs.Shape();
    this.shape_37.graphics.f("#DD3900").s().p("AhECIIgHhCQAGgkgBgvIgChVQAAgHgDgEIADgVIAEgEQANAFAbABIAvAAQAbgBASgHIALAKIgBAGQgBAgADBAQgHAFAAAIQABBDADAuQgbAMglACQgQAAgcAOQgPAHgKAAQgFAAgDgBg");
    this.shape_37.setTransform(30.9,28.3);

    this.shape_38 = new cjs.Shape();
    this.shape_38.graphics.f("#1D2226").s().p("AAGAYQgmgOgSgTIgFgFIAcgWIACADIAGAGQALAJAPAIQAVAJAcAEIgIAiQgagGgQgHg");
    this.shape_38.setTransform(9.4,56);

    this.shape_39 = new cjs.Shape();
    this.shape_39.graphics.f("#DD3900").s().p("Ag+BxQgfg5Alh5QATg/AVgNQAIgFAaADIAGgEQAIgDAHAHQAXAVALBoQAHA9gHAkQgMA+gzAHIgMABQgoAAgUgkg");
    this.shape_39.setTransform(30.6,39.5);

    this.shape_40 = new cjs.Shape();
    this.shape_40.graphics.f("#1D2226").s().p("AgRBDQAAgCAGgGIAHgFQAEgHgOhQIgGgwIAcADIAIAqQAHAzgDA9QAAAFgKAAIgOABQgGgJgHgGg");
    this.shape_40.setTransform(42.1,46.9);

    this.shape_41 = new cjs.Shape();
    this.shape_41.graphics.f("#1D2226").s().p("AgQBMQgNhEAMgxIANglIAcgDIgGAwQgOBQAEAHIAEAAIgDAcg");
    this.shape_41.setTransform(5.6,46.9);

    this.shape_42 = new cjs.Shape();
    this.shape_42.graphics.f("#1D2226").s().p("AADBSQgmgHgigYQgTgNgJgNQgOgSAAgPQAAgTAMgQQALgPARgJQAYgPAggCQgeADgYARQgOAKgHAPQgHAQACAOQACAKANANQAJAJARAKQAcARAiAGQAnAGAWgOQAMgHAHgOQAGgMAAgPQgCghgagYQgNgNgRgGQgMgFgPgCQAkAEAZATQAeAXAKAjQAFASgFARQgGAVgRANQgRANgZAEIgOABQgNAAgPgDg");
    this.shape_42.setTransform(26.5,7.4);

    this.shape_43 = new cjs.Shape();
    this.shape_43.graphics.f("#1D2226").s().p("AgiBOQgHgEgJgJIgIgIIATAFQAHABAIgBQAVgBAGgCQANgFAKgNQAIgLADgQQACgOgDgOIgFgNIgIgMIgJgNQgBgCABgLQABgKgCgDIAQgEIARAeQAEAHAEAJQAEALABAHIAAABQABARgDASQgFASgMAQQgNAPgVALQgGAEgNABQgNAAgIgFg");
    this.shape_43.setTransform(39.1,18.3);

    this.shape_44 = new cjs.Shape();
    this.shape_44.graphics.f("#DD3900").s().p("AgjA1QgVgJgFgUQgCglAigZQARgNAPgEQANgFAPAHQAPAGAMASQAMARgTAdQgTAdgYAIQgJAEgKAAQgMAAgMgFg");
    this.shape_44.setTransform(20.2,18.7);

    this.shape_45 = new cjs.Shape();
    this.shape_45.graphics.f("#1D2226").s().p("AgCBKQgFAAgJgDQgfgMgPgXQgPgXACggIADgPIAEgOQAFgLAKgOIAAgCIACACIAEAcQgJAOgBAOQgFAaAMATQAMAWAaAIQAHAEAFAAIAKABQARgCAIgCIARgGIAYgIQgJAIgLAIQgMAIgFACQgNAEgNAAIgPgBg");
    this.shape_45.setTransform(18.7,21.4);

    this.shape_46 = new cjs.Shape();
    this.shape_46.graphics.f("#1D2226").s().p("ACZDQIgHgXIgSgqIgBgCIAAgBIgNgsIAIgSIAGgBQANgDAKgMQAKgLAGgPQAFgPgBgQQgDgSgJgIIgDgDIABgFQAEgXACgSIAAgJIgBgIQgEgKgEgHQgRghgjgcQgggbglgGIgTgCIgSgBQgKgBgKADQgJADgLAEQgmAQgeAdQgQAQgIAQQgLARACAPQABAtAHAmQADAMAIAbIALAdIADAFIABADIACACIABAEIgCADIgNAoIAAABIgBABIgNAYIgLAZQgKAcgEAYIgdgGQAIgcANgbIAcgzQAFgLAHgWIgQglIgOgqQgLglgEgxQgBgWARgaQAMgSAUgQQAfgaAugTIAqgOQANgGAIAAIAMgBIAMABQAUACAaAMQAVAKASAQQAkAfAUAqIAIAWIABAOQABAGgCAGQgDATgGAVQALAUACAKQAEASgFAWQgGAVgMAPQgLAPgOAHIAJAcIAUAvIAHAZIAFAaIgdAEIgFgWg");
    this.shape_46.setTransform(24.2,16.7);

    this.shape_47 = new cjs.Shape();
    this.shape_47.graphics.f("#1D2226").s().p("AACAiQgCgOgFgTQgGgQgGgNQgJgTgIgLIAcgJQABAPAEASQABANAGAUQAGAQAHAOQAIAUAIAKIgcAKQgBgPgEgUg");
    this.shape_47.setTransform(39.7,46.9);

    this.shape_48 = new cjs.Shape();
    this.shape_48.graphics.f("#A52F00").s().p("AicBQQgKglAEgnQAFhAAsgjQBJg0BOATQA1ANAeAgQAdAfAOBeQgCAAgggVQgdgTgFAFQgGAHgUAIQgXAJgVABQgNAAgsgVQgrgSgPAGQgSAEgRAiQgIARgFAQIABBAQgNgfgHgXg");
    this.shape_48.setTransform(25.7,9);

    this.shape_49 = new cjs.Shape();
    this.shape_49.graphics.f("#DD3900").s().p("AgJAuQgQgIgKgbQgKgZAKgOQAJgPALgEQAKgFAHAFIAVARQAVAYgEAfQgGARgPAGQgHADgHAAQgGAAgIgFg");
    this.shape_49.setTransform(38.9,16.3);

    this.shape_50 = new cjs.Shape();
    this.shape_50.graphics.f("#A52F00").s().p("AAzD4QgUgCgtg2QgDgCgCgqQgCgogDgEQgCgCgHAdQgIAegCgDQgvg5gjgjQgNgNgRhRQgOhDgBgTQgCguBAgtQBAgtA7ADQA7ACAyA4QAtAygEAgQgFAhgEAOQAQAVgBAaQgBAWgNAVQgOAUgVAHQAWA/gkBGQgfA7gXAAIgDgBg");
    this.shape_50.setTransform(25.2,20.2);

    this.shape_51 = new cjs.Shape();
    this.shape_51.graphics.f("#A52F00").s().p("AgBAlQAAiQgCAEQgOAfgdBgQghBrgKAbQgqgKgNgFQgjgQgHgbQgDgiAEghQAFgfAOgyQAIgfATgiIARgcQAKgVA6gQQA+gQA4APQCjArgzEDIgNgxQgPgygEADQgCACAEA5QAEA6gFACQgbAPgiALQgpANgmACIAAAAQgFAAgBiWg");
    this.shape_51.setTransform(23.8,41.3);

    this.shape_52 = new cjs.Shape();
    this.shape_52.graphics.f("#2B2F33").s().p("AgOB8IglgHIAXhEQAYhDADgEQABgEAOgmIASguQACgGAIgGIAIgEIACApQABBFgHCMQgLADgPAAQgQAAgSgDg");
    this.shape_52.setTransform(17.9,45.1);

    this.shape_53 = new cjs.Shape();
    this.shape_53.graphics.f("#2B2F33").s().p("AgQBHIgCi3IAlDXIgcAKg");
    this.shape_53.setTransform(39.5,43.6);

    this.addChild(this.shape_53,this.shape_52,this.shape_51,this.shape_50,this.shape_49,this.shape_48,this.shape_47,this.shape_46,this.shape_45,this.shape_44,this.shape_43,this.shape_42,this.shape_41,this.shape_40,this.shape_39,this.shape_38,this.shape_37,this.shape_36,this.shape_35,this.shape_34,this.shape_33,this.shape_32,this.shape_31,this.shape_30,this.shape_29,this.shape_28,this.shape_27,this.shape_26,this.shape_25,this.shape_24,this.shape_23,this.shape_22,this.shape_21,this.shape_20,this.shape_19,this.shape_18,this.shape_17,this.shape_16,this.shape_15,this.shape_14,this.shape_13,this.shape_12,this.shape_11,this.shape_10,this.shape_9,this.shape_8,this.shape_7,this.shape_6,this.shape_5,this.shape_4,this.shape_3,this.shape_2,this.shape_1,this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = rect = new cjs.Rectangle(3.2,-6.4,41.9,68.8);
  p.frameBounds = [rect];


  (lib.ArmorPart_TrW = function() {
    this.initialize();

    // Layer 1
    this.shape = new cjs.Shape();
    this.shape.graphics.f("#E22500").s().p("AgwAkQgOgEALghQAGgSAJgRQAEAAAnAKQAaAHAHAEQASAIgCAKQgCAOgrAMQgbAIgSAAQgIAAgGgBg");
    this.shape.setTransform(12.8,1.1);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics.f("#1D2226").s().p("AgtBIQgTgDgOgGQgMgFgGgGIgDgDIAAgEQgCgIgBgOQAAgYAKgnIAKgiIAdAKIAAABIgCAIIgHAXQgJAgAAAXIAAAKIAFACQAEACAMADQAUAEAaAAQARAAAPgDQAPgDAHgFIAFgEQANgmAFgQIAAgBIAeAJQgGASgNAmQgFALgLAIQgKAHgLADQgXAHgcAAQgVAAgUgDg");
    this.shape_1.setTransform(14.3,2.3);

    this.shape_2 = new cjs.Shape();
    this.shape_2.graphics.f("#AF2D00").s().p("AhXAxQgLgOAPgxQAIgaAKgXQACgBAaAHIAlAKIBcAfQgQAogRAVQgNAQg6ACIgNABQgyAAgMgPg");
    this.shape_2.setTransform(14.2,2.1);

    this.shape_3 = new cjs.Shape();
    this.shape_3.graphics.f("#1D2226").s().p("AgQBWQgPgBgNgIQgNgIgIgMIgIgMIgBgDIgBgDIgCgGQgEgKgDgPQgDgOgCggQgBgjABgMIAeACIABAsQABAXAEATIAFAUIABAFIACAEIAEAIQALAQARACQAIABAHgCIAJgDIAJgFQAPgJAKgUQAGgKAJgdIALgsIAUAEQgDAVgGAZQgIAegHAOQgNAbgUANIgMAHQgHAEgFABQgKADgJAAIgHAAg");
    this.shape_3.setTransform(15,9.6);

    this.shape_4 = new cjs.Shape();
    this.shape_4.graphics.f("#2B2F33").s().p("Ag3BOQgPgbgEg6QgDgeABgYQAJgjAFADIAIAIQAIAFAJABQAgAEAaAMQAZAMAfAXQgRBegzAWQgNAGgNAAQgVAAgRgQg");
    this.shape_4.setTransform(15.1,7.1);

    this.addChild(this.shape_4,this.shape_3,this.shape_2,this.shape_1,this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = rect = new cjs.Rectangle(4,-5.2,20.6,23.6);
  p.frameBounds = [rect];


  (lib.ArmorPart_01_TrW = function() {
    this.initialize();

    // Layer 1
    this.shape = new cjs.Shape();
    this.shape.graphics.f("#2B2F33").s().p("AAHBQIgHgDIgJgEQgOgJgMgVQgGgMgIgcQgFgPgKg5IAmgKIAAgBIABABIABAAIABAGIAVA5QAFATAUAKQAQAJAXAAIADAAIgBAEIgEAUIgCAFIgBACIgBADIgEAHQgLAQgQACIgFAAIgNgBg");
    this.shape.setTransform(2.8,6.4);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics.f("#E22500").s().p("AgagKQgFgKAWgLQAJgFAMgDQAEgFAGAdQAGAYAAAPQAAALgDADQgCACgMABIgBAAQgMAAgYgzg");
    this.shape_1.setTransform(8.1,0);

    this.shape_2 = new cjs.Shape();
    this.shape_2.graphics.f("#AF2D00").s().p("AgHAvQgJgGgEgJIgWg7IAfgNQAJgEALgDIARgEIAJAgQAIAhAAAUIAAAKIgJAFQgLADgIAAQgOAAgIgFgAATgsQgMAEgJAFQgWALAFAKQAXA0AOgBQAMgBACgDQADgCAAgLQAAgPgGgZQgFgYgEAAIgBAAg");
    this.shape_2.setTransform(7.4,0.4);

    this.shape_3 = new cjs.Shape();
    this.shape_3.graphics.f("#1D2226").s().p("AgPByIgNgFQgGgCgFgFQgVgNgNgbQgHgQgHgeIgQhKIAWgGIAAADQALA5AEAOQAJAcAGANQAMAUAOAJIAIAFIAJADQAIABAIAAQAQgCALgQIAFgIIABgCIAAgCIACgFIAFgVIABgDIgEAAQgWAAgRgJQgSgLgHgSIgUg5IgBgGIgCAAIAAgCIAdgJQAAACAAACQABABAAAAQAAAAAAAAQAAgBAAgCIAUA9QAEAKAJAFQAKAEAOAAQAIAAALgCIAJgEIAAgLQAAgTgIgjIgJghIgBgCIAAAAIAdgKIAKAiQAKApAAAYQAAALgCAJIgBAEIgDADQgHAHgKAFIgDARIgGAZIgEAJIgBACIgHANQgIAMgNAIQgOAIgOABIgHAAQgJAAgKgDg");
    this.shape_3.setTransform(4.5,5.7);

    this.addChild(this.shape_3,this.shape_2,this.shape_1,this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = rect = new cjs.Rectangle(-5.9,-6,20.9,23.6);
  p.frameBounds = [rect];

})(lib = lib||{}, images = images||{}, createjs = window.createjs||{});
var lib, images, createjs;

module.exports = lib;
});

require.register("test/demo/fixtures/waterfall", function(exports, require, module) {
(function (lib, img, cjs) {

  var p; // shortcut to reference prototypes
  var rect; // used to reference frame bounds

// stage content:
  (lib.waterfallRed_JSCC = function(mode,startPosition,loop) {
    this.initialize(mode,startPosition,loop,{});

    // base (mask)
    var mask = new cjs.Shape();
    mask._off = true;
    mask.graphics.p("ACnU3IgkkAQhwrBkTl8QkYmDm6grIgkl0IBckhQNdCsHuInQH6IvBQN+IAPEEg");
    mask.setTransform(103.4,134);

    // W
    this.instance = new lib.W_1();
    this.instance.setTransform(116.1,183.8,0.753,0.753,0,37.2,-142.7,30.9,22.4);

//    this.instance.mask = mask;

    this.timeline.addTween(cjs.Tween.get(this.instance).to({skewX:42.8,skewY:-137,x:125.6,y:231.4},6).to({skewX:49,skewY:-130.8,x:129.6,y:299.4},4).to({_off:true},1).wait(7));

    // W
    this.instance_1 = new lib.W_1();
    this.instance_1.setTransform(-22,66.2,0.753,0.753,0,-27.4,152.5,30.9,22.4);

//    this.instance_1.mask = mask;

    this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regX:31,skewX:4,skewY:184.1,x:60.5,y:104.2},9).to({regX:30.9,skewX:33.5,skewY:213.6,x:110.6,y:167.4},8).wait(1));

    // Layer 53
    this.instance_2 = new lib.W_4();
    this.instance_2.setTransform(-24.1,26,1,1,0,-19.2,160.7,38.4,16.1);
    this.instance_2._off = true;

//    this.instance_2.mask = mask;

    this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(11).to({_off:false},0).to({skewX:-7.3,skewY:172.5,x:52.1,y:45.6},3).to({regX:38.5,regY:16.3,skewX:-0.3,skewY:179.5,x:71.1,y:53.2},3).wait(1));

    // Layer 7
    this.instance_3 = new lib.W_4();
    this.instance_3.setTransform(82.1,59.2,1,1,0,4.2,-175.7,38.5,16.2);

//    this.instance_3.mask = mask;

    this.timeline.addTween(cjs.Tween.get(this.instance_3).to({regY:16.3,skewX:27.7,skewY:-152.1,x:149.3,y:127.4},7).to({regX:38.2,regY:14,skewX:53.2,skewY:-126.6,x:192.3,y:216.4},7).to({regX:38.3,regY:13.9,skewX:59.6,skewY:-120.2,x:201.3,y:284.5,alpha:0},3).wait(1));

    // Layer 52
    this.instance_4 = new lib.W_3();
    this.instance_4.setTransform(-25.1,25.8,1,1,0,-42.8,137.1,25.9,29.3);
    this.instance_4._off = true;

//    this.instance_4.mask = mask;

    this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(6).to({_off:false},0).to({scaleX:1,scaleY:1,skewX:-17.7,skewY:162.1,x:90.9,y:73.5},5).to({regY:29.4,scaleX:1,scaleY:1,skewX:-3,skewY:176.8,x:135,y:110.5},6).wait(1));

    // Layer 6
    this.instance_5 = new lib.W_3();
    this.instance_5.setTransform(144,121.9,1,1,0,0,180,25.9,29.3);

//    this.instance_5.mask = mask;

    this.timeline.addTween(cjs.Tween.get(this.instance_5).to({skewX:18.7,skewY:198.8,x:183.5,y:229.2},7).to({skewX:25.7,skewY:205.8,x:196,y:287.4},7).to({_off:true},1).wait(3));

    // Layer 51
    this.instance_6 = new lib.W_2();
    this.instance_6.setTransform(-10.1,27.4,1,1,0,-31.5,148.4,35.4,30.2);
    this.instance_6._off = true;

//    this.instance_6.mask = mask;

    this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(7).to({_off:false},0).to({regX:35.3,scaleX:1,scaleY:1,skewX:-14.9,skewY:164.9,x:70.6,y:61.5},5).to({regX:35.4,scaleX:1,scaleY:1,skewX:-1.6,skewY:178.2,x:110.9,y:95.1},5).wait(1));

    // Layer 12
    this.instance_7 = new lib.W_2();
    this.instance_7.setTransform(121,103.5,1,1,0,1.3,-178.6,35.4,30.2);

//    this.instance_7.mask = mask;

    this.timeline.addTween(cjs.Tween.get(this.instance_7).to({regY:30.3,skewX:20,skewY:-159.8,x:167.6,y:204.4},7).to({regX:35.5,skewX:35.9,skewY:-143.9,x:181.4,y:276.3},7).to({regY:30.2,skewX:41.6,skewY:-138.2,x:188.4,y:311.4,alpha:0},3).wait(1));

    // base
    this.instance_8 = new lib.Waterfallred();
    this.instance_8.setTransform(103.7,133.1,1,1,0,0,180,101.7,108.9);
    this.instance_8.alpha = 0.801;

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_8}]}).wait(18));

    // base
    this.instance_9 = new lib.Waterfall2();
    this.instance_9.setTransform(103.7,133.1,1,1,0,0,180,101.7,108.9);
    this.instance_9.alpha = 0.801;

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_9}]}).wait(18));

    // base (mask)
    var mask_1 = new cjs.Shape();
    mask_1._off = true;
    mask_1.graphics.p("ACnU3IgkkAQhwrBkTl8QkYmDm6grIgkl0IBckhQNdCsHuInQH6IvBQN+IAPEEg");
    mask_1.setTransform(103.4,134);

    // Layer 50
    this.instance_10 = new lib.W_2();
    this.instance_10.setTransform(14.7,39.2,1,1,0,-25.7,154.2,35.4,30.1);

//    this.instance_10.mask = mask_1;

    this.timeline.addTween(cjs.Tween.get(this.instance_10).to({skewX:-10.9,skewY:168.9,x:63.7,y:62.1},4).to({skewX:10.6,skewY:190.7,x:129.9,y:129.1},7).to({regX:35.3,scaleX:1,scaleY:1,skewX:26.6,skewY:206.7,x:158.3,y:195.1},6).wait(1));

    // Layer 42
    this.instance_11 = new lib.W_2();
    this.instance_11.setTransform(164,208.3,1,1,0,29.9,-150,35.3,30.1);

//    this.instance_11.mask = mask_1;

    this.timeline.addTween(cjs.Tween.get(this.instance_11).to({skewX:37.4,skewY:-142.4,x:170.9,y:274.4},4).to({x:175.9,y:308.4},5).to({_off:true},1).wait(8));

    // Layer 49
    this.instance_12 = new lib.W_2();
    this.instance_12.setTransform(-9.3,53.1,1,1,0,-31.1,148.8,35.4,30.1);
    this.instance_12._off = true;

//    this.instance_12.mask = mask_1;

    this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(11).to({_off:false},0).to({skewX:-11.5,skewY:168.3,x:49.2,y:73.6},3).to({regY:30.2,skewX:-3.6,skewY:176.2,x:75.9,y:95},3).wait(1));

    // Layer 5
    this.instance_13 = new lib.W_2();
    this.instance_13.setTransform(89.3,105.7,1,1,0,0,180,35.3,30.2);

//    this.instance_13.mask = mask_1;

    this.timeline.addTween(cjs.Tween.get(this.instance_13).to({regY:30.1,skewX:19.2,skewY:199.3,x:120.9,y:175.8},7).to({skewX:29.9,skewY:210,x:131.9,y:242.4},6).to({skewX:43.6,skewY:223.7,x:130.9,y:313.4,alpha:0},4).wait(1));

    // W
    this.instance_14 = new lib.W_1();
    this.instance_14.setTransform(-27.4,34.7,1,1,0,-24.7,155.2,31,22.2);
    this.instance_14.alpha = 0.238;
    this.instance_14._off = true;

//    this.instance_14.mask = mask_1;

    this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(14).to({_off:false},0).to({skewX:-17.9,skewY:161.9,x:13.6,y:46.2,alpha:1},3).wait(1));

    // W
    this.instance_15 = new lib.W_1();
    this.instance_15.setTransform(145,223.3,1,1,0,38.3,-141.6,31,22.1);

//    this.instance_15.mask = mask_1;

    this.timeline.addTween(cjs.Tween.get(this.instance_15).to({skewX:49.8,skewY:-130,x:157,y:310.9},6).to({_off:true},1).wait(11));

    // W
    this.instance_16 = new lib.W_1();
    this.instance_16.setTransform(32.6,56.2,1,1,0,-7.8,172.1,31,22.2);

//    this.instance_16.mask = mask_1;

    this.timeline.addTween(cjs.Tween.get(this.instance_16).to({regY:22.1,skewX:2.5,skewY:182.6,x:86.8,y:86.1},7).to({regY:22.2,skewX:29.1,skewY:209.2,x:122.8,y:147.3},7).to({regY:22.1,skewX:38.3,skewY:218.4,x:141.4,y:208.3},3).wait(1));

    // W
    this.instance_17 = new lib.W_1();
    this.instance_17.setTransform(115.6,193.3,0.753,0.753,0,37.8,-142.1,30.9,22.3);

//    this.instance_17.mask = mask_1;

    this.timeline.addTween(cjs.Tween.get(this.instance_17).to({skewX:47.8,skewY:-132,x:131.2,y:301.5},6).to({_off:true},1).wait(11));

    // W
    this.instance_18 = new lib.W_1();
    this.instance_18.setTransform(24.5,71.2,0.753,0.753,0,-15,164.9,30.8,22.4);

//    this.instance_18.mask = mask_1;

    this.timeline.addTween(cjs.Tween.get(this.instance_18).to({regX:30.9,skewX:-0.5,skewY:179.3,x:63.6,y:94.2},7).to({skewX:24.3,skewY:204.4,x:95.6,y:141.3},7).to({regY:22.3,skewX:37.8,skewY:217.9,x:112.1,y:183.3},3).wait(1));

    // W
    this.instance_19 = new lib.W_1();
    this.instance_19.setTransform(13.6,31.4,1,1,0,-19,160.9,31.1,22.2);

//    this.instance_19.mask = mask_1;

    this.timeline.addTween(cjs.Tween.get(this.instance_19).to({regX:31,skewX:8.2,skewY:188.3,x:125.6,y:92.7},7).to({scaleX:1,scaleY:1,skewX:33.8,skewY:213.9,x:166.9,y:153.5},5).to({scaleX:1,scaleY:1,skewX:34.4,skewY:214.5,x:176.1,y:192.5},5).wait(1));

    // W
    this.instance_20 = new lib.W_1();
    this.instance_20.setTransform(178.3,202.1,1,1,0,34.6,-145.3,31.1,22.3);

//    this.instance_20.mask = mask_1;

    this.timeline.addTween(cjs.Tween.get(this.instance_20).to({skewX:43.9,skewY:-135.9,x:196.8,y:297.3},7).to({regY:22.2,scaleX:1,scaleY:1,skewX:45.9,skewY:-133.9,x:198,y:314.2},2).to({_off:true},1).wait(8));

    // W
    this.instance_21 = new lib.W_1();
    this.instance_21.setTransform(-11.3,41.5,1,1,0,-15.7,164.2,30.9,22.3);
    this.instance_21._off = true;

//    this.instance_21.mask = mask_1;

    this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(3).to({_off:false},0).to({scaleX:0.92,scaleY:0.94,skewX:14.2,skewY:194.3,x:88.9,y:98.5},8).to({regX:30.8,scaleX:0.99,scaleY:0.99,skewX:34.1,skewY:214.2,x:140.2,y:183.1},6).wait(1));

    // W
    this.instance_22 = new lib.W_1();
    this.instance_22.setTransform(147.5,195.1,1,1,0,36.9,-143,30.9,22.3);

//    this.instance_22.mask = mask_1;

    this.timeline.addTween(cjs.Tween.get(this.instance_22).to({skewX:45.6,skewY:-134.2,x:160,y:277.7},7).to({regX:31,regY:22.2,scaleX:1,scaleY:1,skewX:49.7,skewY:-130.1,x:161,y:314.5},6).to({_off:true},1).wait(4));

    // Layer 43
    this.instance_23 = new lib.W_1();
    this.instance_23.setTransform(2.5,37.8,1,1,0,-13.8,166.1,30.9,22.3);
    this.instance_23._off = true;

//    this.instance_23.mask = mask_1;

    this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(13).to({_off:false},0).to({regX:31,skewX:-3.1,skewY:176.7,x:61,y:67.9},4).wait(1));

    // Layer 4
    this.instance_24 = new lib.W_1();
    this.instance_24.setTransform(80.5,77.9,1,1,0,0,180,31,22.3);

//    this.instance_24.mask = mask_1;

    this.timeline.addTween(cjs.Tween.get(this.instance_24).to({regX:30.9,skewX:27.4,skewY:207.5,x:131.6,y:153.5},7).to({regY:22.2,skewX:43.3,skewY:223.4,x:160.9,y:217.5},6).to({skewX:53,skewY:233.1,x:167.3,y:310.6,alpha:0},4).wait(1));

    // Layer 57
    this.instance_25 = new lib.W_1();
    this.instance_25.setTransform(-4.2,35.8,1.091,1.006,0,-15.1,167.2,31,22.3);
    this.instance_25._off = true;

//    this.instance_25.mask = mask_1;

    this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(13).to({_off:false},0).to({regX:30.9,scaleX:1.1,scaleY:1,skewX:-3.4,skewY:177,x:60.1,y:65.9},4).wait(1));

  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = rect = new cjs.Rectangle(1.9,24.2,205,243.8);
  p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect];


// symbols:
  (lib.Waterfallred = function() {
    this.initialize();

    // Layer 1
    this.shape = new cjs.Shape();
    this.shape.graphics.f("#FF2A00").s().p("AvwO/QBPt/H6ovQHuomNeitIBbEhIgjF0Qm6ArkZGDQkTF8hvLCIglD/ItiAFg");
    this.shape.setTransform(101,121.9);

    this.addChild(this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = rect = new cjs.Rectangle(-1.4,0,205,243.8);
  p.frameBounds = [rect];


  (lib.Waterfall2 = function() {
    this.initialize();

    // Layer 1
    this.shape = new cjs.Shape();
    this.shape.graphics.f("#FFFFFF").s().p("AvDPcIAAhMIADgHIACgHIADgIIACgHIAAgQIAAgOIAAgIIAAgHIAAgIIAAgIIAAgIIADgHIACgHIACgIIACgHIABgIIAAgIIAAgHIADgHIACgIIADgHIACgIIAAgIIAAgHIAAgHQAJgbAHgaIAUhLIAghwQAKglADgnIACgHIADgIIACgIIADgHIAAgIIAAgHIAAgHIAEgIIAEgHIAEgIIADgIIABgHIACgHIABgIIABgIIAAgHIACgIIADgHIACgHIADgIIACgIIAFgHIADgIIACgHIADgHIACgIIADgIIAEgIIAEgHIAEgHIADgHIAFgQIAFgPIACgHIAFgPIADgIIAFgIIACgHIADgHIACgIIADgHIACgIQAJgOAIgPQAGgMAHgMIAKgNIAIgOIACgIIAAgBQgIA2gLA4IgrDXQgRBXgDBYIgEAPIgNBEQgGAegEAeQgCASgBATQgfCGgJCJIgIB2IgCAIIhvAAIAAg4gAo4MgQAujYA1jWQAmiYAviXQAcgyAbgxQAfg7Adg9QANgNAIgRIALgXIAIgPIAHgPIADgHIACgIIANgPIAMgPIAFgHIAIgPIAFgIIADgIIACgHIAFgHIAFgIIADgHIAFgIIACgIIADgHIASgWQAPgRAJgUQAFgMAHgMQAHgKAJgKQATAWAcAGQATAFARgBQATgCASgEIAKgGIANgHIAHgHIAPgIIAKgHIAKgJIAIgHIAWgPIAKgHIAIgIIAFgIIAFgHIAKgIIAIgHIAOgIIAKgHIAIgIIAHgHIAGgIIATgPIAQgPIAPgPIAHgHIAXgPIAJgIQAFgDADgFIAFgHIAFgHIAKgIIAIgGIAKgJIAKgHIAMgIIAIgHIARgPIAIgIIAPgPIAHgHIASgIIAMgHIAKgIIAIgHIAKgIIAPgEIAKgDQA/gdA7ggQAhgTAegXIAegLIA9gcQAVgKATgOIAOgFIALgFIAPgHIAPgEIAKgEIAFgCIAJgFIALgHIAPgFIASgFIgeE4Qm6ArkYGDQkTF8hwLCIglD/ImXACIAzjyg");
    this.shape.setTransform(106.4,139.3);

    this.addChild(this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = rect = new cjs.Rectangle(10,34.9,192.9,208.9);
  p.frameBounds = [rect];


  (lib.W_4 = function() {
    this.initialize();

    // Layer 1
    this.shape = new cjs.Shape();
    this.shape.graphics.f("#FFFFFF").s().p("Ah8gSQFgitiQCDQCLg9A1gQIAGgCQA0gPARADQAQACl1C5QigBaC+ijIjiB5QiBBFgRAAQgbAAD7irg");
    this.shape.setTransform(41.8,15.3);

    this.addChild(this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = rect = new cjs.Rectangle(6.6,0,70.4,30.7);
  p.frameBounds = [rect];


  (lib.W_3 = function() {
    this.initialize();

    // Layer 1
    this.shape = new cjs.Shape();
    this.shape.graphics.f("#FFFFFF").s().p("ABAjiQi1E4Fzl6QAoANksEcQipD0g0ApQgJADgHAAQhTAAGGoHg");
    this.shape.setTransform(25.9,29.3);

    this.addChild(this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = rect = new cjs.Rectangle(0,0,51.8,58.7);
  p.frameBounds = [rect];


  (lib.W_2 = function() {
    this.initialize();

    // Layer 1
    this.shape = new cjs.Shape();
    this.shape.graphics.f("#FFFFFF").s().p("AkDDfQAghsERj5QGNkOlJFUQCnhuhZBtQiPByhRBVQiSBwCNi2Qi1C+gkAAQgOAAAJgfg");
    this.shape.setTransform(44,25.2);

    this.addChild(this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = rect = new cjs.Rectangle(17.7,-0.2,52.8,51);
  p.frameBounds = [rect];


  (lib.W_1 = function() {
    this.initialize();

    // Layer 1
    this.shape = new cjs.Shape();
    this.shape.graphics.f("#FFFFFF").s().p("AlKDdQCSjBF1jNQDkiDiACDIk1DfQkGDGgsAAQgOAAAKgXg");
    this.shape.setTransform(33.1,22.4);

    this.addChild(this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = rect = new cjs.Rectangle(-0.4,-2,67.1,48.9);
  p.frameBounds = [rect];

})(lib = lib||{}, images = images||{}, createjs = window.createjs||{});
var lib, images, createjs;

module.exports = lib;
});

require.register("test/demo/views/achievement/AchievementGet.demo", function(exports, require, module) {
var Achievement, CocoModel, EarnedAchievement, RootView, fixtures, utils;

CocoModel = require('models/CocoModel');

RootView = require('views/core/RootView');

utils = require('core/utils');

Achievement = require('models/Achievement');

EarnedAchievement = require('models/EarnedAchievement');

fixtures = require('../../fixtures/achievements');

module.exports = function() {
  var earnedSimulated, earnedUnlockable, earnedUnlockableObj, simulated, unlockable, unlockableObj, view;
  me.set('points', 48);
  me.set('preferredLanguage', 'es');
  unlockableObj = fixtures.DungeonArenaStarted;
  earnedUnlockableObj = {
    earnedPoints: 3,
    notified: false
  };
  simulated = fixtures.Simulated;
  earnedSimulated = {
    achievedAmount: 1,
    earnedPoints: 1,
    notified: false
  };
  unlockable = new Achievement(unlockableObj);
  earnedUnlockable = new EarnedAchievement(earnedUnlockableObj);
  simulated = new Achievement(simulated);
  earnedSimulated = new EarnedAchievement(earnedSimulated);
  view = new RootView;
  view.render();
  view.showNewAchievement(unlockable, earnedUnlockable);
  return view;
};
});

;require.register("test/demo/views/achievement/UserAchievements.demo", function(exports, require, module) {
var Achievement, Achievements, EarnedAchievement, EarnedAchievementCollection, UserAchievementsView, fixtures;

Achievement = require('models/Achievement');

Achievements = require('collections/AchievementCollection');

UserAchievementsView = require('views/user/AchievementsView');

EarnedAchievement = require('models/EarnedAchievement');

EarnedAchievementCollection = require('collections/EarnedAchievementCollection');

fixtures = require('../../fixtures/achievements');

module.exports = function() {
  var respond, view;
  view = new UserAchievementsView({}, me.get('_id'));
  respond = function(request) {
    if (!request) {
      return;
    }
    if (request.url.match(/db\/achievement/)) {
      return request.response({
        status: 200,
        responseText: JSON.stringify(fixtures.achievements)
      });
    } else if (request.url.match(/db\/user\/[a-z0-9]*\/achievements/)) {
      return request.response({
        status: 200,
        responseText: JSON.stringify(fixtures.earnedAchievements)
      });
    } else {
      return request.response({
        status: 404
      });
    }
  };
  _.each(jasmine.Ajax.requests.all(), function(request) {
    return respond(request);
  });
  return view.render();
};
});

;require.register("test/demo/views/common/LevelSessionCodeView.demo", function(exports, require, module) {
var LevelSession, LevelSessionCodeView, levelData, levelSessionData;

LevelSessionCodeView = require('views/common/LevelSessionCodeView');

LevelSession = require('models/LevelSession');

levelSessionData = require('./level-session.fixture');

levelData = require('./level.fixture');

module.exports = function() {
  var request, session, v;
  session = new LevelSession(levelSessionData);
  v = new LevelSessionCodeView({
    session: session
  });
  request = jasmine.Ajax.requests.mostRecent();
  request.respondWith({
    status: 200,
    responseText: JSON.stringify(levelData)
  });
  v.render();
  return v;
};
});

;require.register("test/demo/views/common/level-session.fixture", function(exports, require, module) {
module.exports = {
  "_id": "5317ad4909098828ed071f4d",
  "level": {
    "original": "53173f76c269d400000543c2",
    "majorVersion": 0
  },
  "team": "humans",
  "levelID": "dungeon-arena",
  "levelName": "Dungeon Arena",
  "submitted": true,
  "totalScore": 38.4584087145667,
  "code": {
    "programmable-librarian": {
      "chooseAction": "// The Librarian is a spellcaster with a fireball attack\n// plus three useful spells: 'slow', 'regen', and 'haste'.\n// Slow makes a target move and attack at half speed for 5s.\n// Regen makes a target heal 10 hp/s for 10s.\n// Haste speeds up a target by 4x for 5s, once per match.\n\nvar enemies = this.getEnemies();\nif (enemies.length === 0) return;  // Chill if all enemies are dead.\nvar enemy = this.getNearest(enemies);\nif (this.canCast('slow', enemy)) {\n    // Slow the enemy, or chase if out of range (30m).\n    this.castSlow(enemy);\n    if (this.distance(enemy) <= 50)\n        this.say(\"Not so fast, \" + enemy.type + \" \" + enemy.id);\n}\nelse {\n    this.attack(enemy);\n}\nvar base = this.getFriends()[0];\nvar d = base.distance(enemy);\n// You can also command your troops with this.say():\n//this.say(\"Defend!\", {targetPos: {x: 30, y: 30}}));\n//this.say(\"Attack!\", {target: enemy});\n//this.say(\"Move!\", {targetPos: {x: 50, y: 40});\n"
    },
    "human-base": {
      "chooseAction": "// This is the code for your base. Decide which unit to build each frame.\n// Units you build will go into the this.built array.\n// Destroy the enemy base within 60 seconds!\n// Check out the Guide at the top for more info.\n\n// CHOOSE YOUR HERO! You can only build one hero.\nvar hero;\n//hero = 'tharin';  // A fierce knight with battlecry abilities.\nhero = 'hushbaum';  // A fiery spellcaster hero.\n\nif(hero && !this.builtHero) {\n    this.builtHero = this.build(hero);\n    return;\n}\n\n// Soldiers are hard-to-kill, low damage melee units with 2s build cooldown.\n// Archers are fragile but deadly ranged units with 2.5s build cooldown.\nvar buildOrder = ['soldier', 'soldier', 'soldier', 'soldier', 'archer'];\nvar type = buildOrder[this.built.length % buildOrder.length];\n//this.say('Unit #' + this.built.length + ' will be a ' + type);\nthis.build(type);"
    },
    "hushbaum": {
      "chooseAction": "var enemy = this.getNearestEnemy();\nif (enemy) {\n    if (!enemy.hasEffect('slow')) {\n        this.say(\"Not so fast, \" + enemy.type + \" \" + enemy.id);\n        this.castSlow(enemy);\n    }\n    else {\n        this.attack(enemy);\n    }\n}\nelse {\n    this.move({x: 70, y: 30});\n}\n"
    },
    "tharin": {
      "chooseAction": "var enemies = this.getEnemies();\nvar enemy = this.getNearest(enemies);\nif (!this.getCooldown('warcry')) {\n    this.warcry();\n}\nelse if (enemy) {\n    this.attack(enemy);\n}\nelse {\n    this.move({x: 10, y: 30});\n}\n"
    },
    "tharin-1": {
      "chooseAction": "var __interceptThis=(function(){var G=this;return function($this,sandbox){if($this==G){return sandbox;}return $this;};})();\nreturn (function (__global) {\n    var tmp0, tmp1;\n    tmp1 = function () {\n        _aether.logCallStart(this._aetherUserInfo); var enemies, enemy, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26;\n        tmp2 = 'use strict';\n        tmp3 = __interceptThis(this, __global);\n        tmp4 = 'getEnemies';\n        _aether.logStatementStart([{ofs: 0, row: 0, col: 0}, {ofs: 32, row: 0, col: 32}]); enemies = tmp3[tmp4](); _aether.vars['enemies'] = typeof enemies == 'undefined' ? undefined : enemies; _aether.vars['enemy'] = typeof enemy == 'undefined' ? undefined : enemy; _aether.vars['chooseAction'] = typeof chooseAction == 'undefined' ? undefined : chooseAction; _aether.logStatement([{ofs: 0, row: 0, col: 0}, {ofs: 32, row: 0, col: 32}], \"var enemies = this.getEnemies();\", this._aetherUserInfo);\n        tmp5 = __interceptThis(this, __global);\n        tmp6 = 'getNearest';\n        tmp7 = enemies;\n        _aether.logStatementStart([{ofs: 33, row: 1, col: 0}, {ofs: 70, row: 1, col: 37}]); enemy = tmp5[tmp6](tmp7); _aether.vars['enemies'] = typeof enemies == 'undefined' ? undefined : enemies; _aether.vars['enemy'] = typeof enemy == 'undefined' ? undefined : enemy; _aether.vars['chooseAction'] = typeof chooseAction == 'undefined' ? undefined : chooseAction; _aether.logStatement([{ofs: 33, row: 1, col: 0}, {ofs: 70, row: 1, col: 37}], \"var enemy = this.getNearest(enemies);\", this._aetherUserInfo);\n        tmp10 = __interceptThis(this, __global);\n        tmp11 = 'getCooldown';\n        _aether.logStatementStart([{ofs: 93, row: 2, col: 22}, {ofs: 101, row: 2, col: 30}]); tmp12 = 'warcry'; _aether.vars['enemies'] = typeof enemies == 'undefined' ? undefined : enemies; _aether.vars['enemy'] = typeof enemy == 'undefined' ? undefined : enemy; _aether.vars['chooseAction'] = typeof chooseAction == 'undefined' ? undefined : chooseAction; _aether.logStatement([{ofs: 93, row: 2, col: 22}, {ofs: 101, row: 2, col: 30}], \"'warcry'\", this._aetherUserInfo);\n        _aether.logStatementStart([{ofs: 76, row: 2, col: 5}, {ofs: 102, row: 2, col: 31}]); tmp9 = tmp10[tmp11](tmp12); _aether.vars['enemies'] = typeof enemies == 'undefined' ? undefined : enemies; _aether.vars['enemy'] = typeof enemy == 'undefined' ? undefined : enemy; _aether.vars['chooseAction'] = typeof chooseAction == 'undefined' ? undefined : chooseAction; _aether.logStatement([{ofs: 76, row: 2, col: 5}, {ofs: 102, row: 2, col: 31}], \"this.getCooldown('warcry')\", this._aetherUserInfo);\n        _aether.logStatementStart([{ofs: 75, row: 2, col: 4}, {ofs: 102, row: 2, col: 31}]); tmp8 = !tmp9; _aether.vars['enemies'] = typeof enemies == 'undefined' ? undefined : enemies; _aether.vars['enemy'] = typeof enemy == 'undefined' ? undefined : enemy; _aether.vars['chooseAction'] = typeof chooseAction == 'undefined' ? undefined : chooseAction; _aether.logStatement([{ofs: 75, row: 2, col: 4}, {ofs: 102, row: 2, col: 31}], \"!this.getCooldown('warcry')\", this._aetherUserInfo);\n        if (tmp8) {\n            tmp13 = __interceptThis(this, __global);\n            tmp14 = 'warcry';\n            _aether.logStatementStart([{ofs: 110, row: 3, col: 4}, {ofs: 123, row: 3, col: 17}]); tmp15 = tmp13[tmp14](); _aether.vars['enemies'] = typeof enemies == 'undefined' ? undefined : enemies; _aether.vars['enemy'] = typeof enemy == 'undefined' ? undefined : enemy; _aether.vars['chooseAction'] = typeof chooseAction == 'undefined' ? undefined : chooseAction; _aether.logStatement([{ofs: 110, row: 3, col: 4}, {ofs: 123, row: 3, col: 17}], \"this.warcry()\", this._aetherUserInfo);\n        } else {\n            tmp16 = enemy;\n            if (tmp16) {\n                tmp17 = __interceptThis(this, __global);\n                tmp18 = 'attack';\n                tmp19 = enemy;\n                _aether.logStatementStart([{ofs: 149, row: 6, col: 4}, {ofs: 167, row: 6, col: 22}]); tmp20 = tmp17[tmp18](tmp19); _aether.vars['enemies'] = typeof enemies == 'undefined' ? undefined : enemies; _aether.vars['enemy'] = typeof enemy == 'undefined' ? undefined : enemy; _aether.vars['chooseAction'] = typeof chooseAction == 'undefined' ? undefined : chooseAction; _aether.logStatement([{ofs: 149, row: 6, col: 4}, {ofs: 167, row: 6, col: 22}], \"this.attack(enemy)\", this._aetherUserInfo);\n            } else {\n                tmp21 = __interceptThis(this, __global);\n                tmp22 = 'move';\n                _aether.logStatementStart([{ofs: 196, row: 9, col: 18}, {ofs: 198, row: 9, col: 20}]); tmp24 = 10; _aether.vars['enemies'] = typeof enemies == 'undefined' ? undefined : enemies; _aether.vars['enemy'] = typeof enemy == 'undefined' ? undefined : enemy; _aether.vars['chooseAction'] = typeof chooseAction == 'undefined' ? undefined : chooseAction; _aether.logStatement([{ofs: 196, row: 9, col: 18}, {ofs: 198, row: 9, col: 20}], \"10\", this._aetherUserInfo);\n                _aether.logStatementStart([{ofs: 203, row: 9, col: 25}, {ofs: 205, row: 9, col: 27}]); tmp25 = 30; _aether.vars['enemies'] = typeof enemies == 'undefined' ? undefined : enemies; _aether.vars['enemy'] = typeof enemy == 'undefined' ? undefined : enemy; _aether.vars['chooseAction'] = typeof chooseAction == 'undefined' ? undefined : chooseAction; _aether.logStatement([{ofs: 203, row: 9, col: 25}, {ofs: 205, row: 9, col: 27}], \"30\", this._aetherUserInfo);\n                _aether.logStatementStart([{ofs: 192, row: 9, col: 14}, {ofs: 206, row: 9, col: 28}]); tmp23 = {\n                    x: tmp24,\n                    y: tmp25\n                }; _aether.vars['enemies'] = typeof enemies == 'undefined' ? undefined : enemies; _aether.vars['enemy'] = typeof enemy == 'undefined' ? undefined : enemy; _aether.vars['chooseAction'] = typeof chooseAction == 'undefined' ? undefined : chooseAction; _aether.logStatement([{ofs: 192, row: 9, col: 14}, {ofs: 206, row: 9, col: 28}], \"{x: 10, y: 30}\", this._aetherUserInfo);\n                _aether.logStatementStart([{ofs: 182, row: 9, col: 4}, {ofs: 207, row: 9, col: 29}]); tmp26 = tmp21[tmp22](tmp23); _aether.vars['enemies'] = typeof enemies == 'undefined' ? undefined : enemies; _aether.vars['enemy'] = typeof enemy == 'undefined' ? undefined : enemy; _aether.vars['chooseAction'] = typeof chooseAction == 'undefined' ? undefined : chooseAction; _aether.logStatement([{ofs: 182, row: 9, col: 4}, {ofs: 207, row: 9, col: 29}], \"this.move({x: 10, y: 30})\", this._aetherUserInfo);\n            }\n        }\n        _aether.logCallEnd(); return;\n    };\n    tmp0 = 'chooseAction';\n    __global[tmp0] = tmp1;\n}(this));"
    },
    "programmable-tharin": {
      "chooseAction": "/*this.getFriends();\nthis.attack(this.getEnemies()[0]);\nreturn;\n*/\n \n\n/* TODO:\n   If they fully base race us, we actually do want to produce archers since they DPS faster\n   The effective DPS on soldiers is better if they attack us\n   but worse if they straight race us\n\n   //not sure if this is good but...\n   if they're attacking our base with a small number of units\n   we should make archers and get them to defend\n*/\n/*\nreturn;\n// Tharin is a melee fighter with shield, warcry, and terrify skills.\n// this.shield() lets him take one-third damage while defending.\n// this.warcry() gives allies within 10m 30% haste for 5s, every 10s.\n// this.terrify() sends foes within 30m fleeing for 5s, once per match.\nvar friends = this.getFriends();\nvar enemies = this.getEnemies();\nif (enemies.length === 0) return;  // Chill if all enemies are dead.\nvar enemy = this.getNearest(enemies);\nvar furthestFriendX = 30;\nfor (var i = 0; i < friends.length; ++i) {\n    var friend = friends[i];\n    furthestFriendX = Math.max(friend.pos.x, furthestFriendX);\n}  \nif (!this.getCooldown('warcry') && friends.length > 5) {\n    this.warcry();\n}  \nelse if ((this.now() > 15 || this.health < 150) && !this.getCooldown('terrify')) {\n    this.terrify();\n}\nelse if (this.health < 75 && this.pos.x > furthestFriendX - 5) {\n    this.move({x: 10, y: 27});\n}\nelse if (this.pos.x > furthestFriendX - 1 && this.now() < 50) {\n    this.shield();\n}\nelse {\n    this.attack(enemy);\n}\nthis.say(\"Defend!\", {targetPos: {x: 30, y: Infinity}});\n\n// You can also command your troops with this.say():\n//this.say(\"Defend!\", {targetPos: {x: 30, y: 30}}));\n//this.say(\"Attack!\", {target: enemy});\n//this.say(\"Move!\", {targetPos: {x: 40, y: 40});\n\n// You can store state on this across frames:\n//this.lastHealth = this.health;\n*/"
    }
  },
  "teamSpells": {
    "ogres": ["programmable-brawler/chooseAction", "programmable-shaman/chooseAction", "ogre-base/chooseAction"],
    "humans": ["programmable-librarian/chooseAction", "programmable-tharin/chooseAction", "human-base/chooseAction"]
  },
  "submittedCodeLanguage": "javascript",
  "playtime": 9753,
  "codeLanguage": "javascript"
};
});

;require.register("test/demo/views/common/level.fixture", function(exports, require, module) {
module.exports = {
  "_id": "53c997066567c600002a43d0",
  "name": "Dungeon Arena",
  "icon": "db/level/53173f76c269d400000543c2/11_dungeon.png",
  "banner": "db/level/53173f76c269d400000543c2/dungeon_arena.png",
  "employerDescription": "Players:\n* Attempt to destroy the enemy base.\n* Choose and control heroes to attack with.\n* Choose which types of lesser units to build and have limited control over them.\n* Try to write strategies that counter other enemy strategies.\n* Play on a small map.",
  "systems": [],
  "thangs": [],
  "scripts": [],
  "documentation": {
    "generalArticles": [],
    "specificArticles": []
  },
  "description": "This level is indescribably flarmy!",
  "version": {
    "minor": 0,
    "major": 0,
    "isLatestMajor": true,
    "isLatestMinor": true
  }
};
});

;require.register("test/demo/views/editor/PatchesView.demo", function(exports, require, module) {
var BlandModel, CocoModel, PatchesView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PatchesView = require('views/editor/patches_view');

CocoModel = require('models/CocoModel');

BlandModel = (function(superClass) {
  extend(BlandModel, superClass);

  function BlandModel() {
    return BlandModel.__super__.constructor.apply(this, arguments);
  }

  BlandModel.className = 'Bland';

  BlandModel.schema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      number: {
        type: 'number'
      },
      object: {
        type: 'object'
      },
      string: {
        type: 'string'
      },
      _id: {
        type: 'string'
      }
    }
  };

  BlandModel.prototype.urlRoot = '/db/bland';

  return BlandModel;

})(CocoModel);

module.exports = function() {
  var model, names, patches, r, v;
  model = new BlandModel({
    _id: '12345',
    name: 'name',
    original: 'original'
  });
  v = new PatchesView(model);
  v.load();
  r = jasmine.Ajax.requests.mostRecent();
  patches = [
    {
      delta: null,
      commitMessage: 'Demo message',
      creator: '12345',
      created: '2014-01-01T12:00:00.000Z',
      status: 'pending'
    }
  ];
  r.response({
    status: 200,
    responseText: JSON.stringify(patches)
  });
  r = jasmine.Ajax.requests.mostRecent();
  names = {
    '12345': {
      name: 'Patchman'
    }
  };
  r.response({
    status: 200,
    responseText: JSON.stringify(names)
  });
  v.render();
  return v;
};
});

;require.register("test/demo/views/editor/component/AddThangComponentsModal.demo", function(exports, require, module) {
var AddThangComponentsModal, response;

AddThangComponentsModal = require('views/editor/component/AddThangComponentsModal');

response = [
  {
    "_id": "53c46b06bd135abdb79a4f32",
    "name": "InventorySomething",
    "original": "53c46ae2bd135abdb79a4f2f",
    "official": false,
    "configSchema": {
      "additionalProperties": false,
      "type": "object"
    },
    "propertyDocumentation": [],
    "dependencies": [],
    "code": "class AttacksSelf extends Component\n  @className: 'AttacksSelf'\n  chooseAction: ->\n    @attack @",
    "description": "This Component makes the Thang attack itself.",
    "system": "inventory",
    "version": {
      "minor": 2,
      "major": 0,
      "isLatestMajor": true,
      "isLatestMinor": true
    }
  }, {
    "_id": "538755f3cb18e70000712278",
    "name": "Jitters",
    "original": "530d8a70286ddc0000cc5d9d",
    "official": false,
    "configSchema": {
      "additionalProperties": false,
      "type": "object"
    },
    "propertyDocumentation": [],
    "dependencies": [],
    "code": "class AttacksSelf extends Component\n  @className: 'AttacksSelf'\n  chooseAction: ->\n    @attack @",
    "description": "This Component makes the Thang jitter. Or, it would, if it did anything yet. (Test Component.)",
    "system": "movement",
    "version": {
      "minor": 3,
      "major": 0,
      "isLatestMajor": true,
      "isLatestMinor": true
    }
  }, {
    "_id": "538755f3cb18e70000712279",
    "name": "DelaysExistence",
    "original": "524cbbea3ea855e0ab00003d",
    "official": false,
    "configSchema": {
      "additionalProperties": false,
      "type": "object"
    },
    "propertyDocumentation": [],
    "dependencies": [],
    "code": "class AttacksSelf extends Component\n  @className: 'AttacksSelf'\n  chooseAction: ->\n    @attack @",
    "description": "This Thang doesn't show up right away.",
    "system": "existence",
    "version": {
      "minor": 25,
      "major": 0,
      "isLatestMajor": true,
      "isLatestMinor": true
    }
  }, {
    "_id": "538755f3cb18e7000071227a",
    "name": "RunsInCircles",
    "original": "52438245ef76c3dcf5000004",
    "official": false,
    "configSchema": {
      "additionalProperties": false,
      "type": "object"
    },
    "propertyDocumentation": [],
    "dependencies": [],
    "code": "class AttacksSelf extends Component\n  @className: 'AttacksSelf'\n  chooseAction: ->\n    @attack @",
    "description": "This Thang runs in circles.",
    "system": "ai",
    "version": {
      "minor": 39,
      "major": 0,
      "isLatestMajor": true,
      "isLatestMinor": true
    }
  }, {
    "_id": "538755f3cb18e7000071227b",
    "name": "AttacksSelf",
    "original": "52437b061d9e25b8dc000004",
    "official": false,
    "configSchema": {
      "additionalProperties": false,
      "type": "object"
    },
    "propertyDocumentation": [],
    "dependencies": [],
    "code": "class AttacksSelf extends Component\n  @className: 'AttacksSelf'\n  chooseAction: ->\n    @attack @",
    "description": "This Component makes the Thang attack itself.",
    "system": "ai",
    "version": {
      "minor": 41,
      "major": 0,
      "isLatestMajor": true,
      "isLatestMinor": true
    }
  }, {
    "_id": "538755f3cb18e7000071227d",
    "name": "FollowsNearestFriend",
    "original": "52437e31ef76c3dcf5000002",
    "official": false,
    "configSchema": {
      "additionalProperties": false,
      "type": "object"
    },
    "propertyDocumentation": [],
    "dependencies": [],
    "code": "class AttacksSelf extends Component\n  @className: 'AttacksSelf'\n  chooseAction: ->\n    @attack @",
    "description": "This Thang follows the nearest friend.",
    "system": "ai",
    "version": {
      "minor": 39,
      "major": 0,
      "isLatestMajor": true,
      "isLatestMinor": true
    }
  }, {
    "_id": "538755f4cb18e7000071227e",
    "name": "FollowsNearest",
    "original": "52437c851d9e25b8dc000008",
    "official": false,
    "configSchema": {
      "additionalProperties": false,
      "type": "object"
    },
    "propertyDocumentation": [],
    "dependencies": [],
    "code": "class AttacksSelf extends Component\n  @className: 'AttacksSelf'\n  chooseAction: ->\n    @attack @",
    "description": "This Thang follows the nearest other Thang.",
    "system": "ai",
    "version": {
      "minor": 39,
      "major": 0,
      "isLatestMajor": true,
      "isLatestMinor": true
    }
  }
];

module.exports = function() {
  var view;
  view = new AddThangComponentsModal({
    skipOriginals: ['52437c851d9e25b8dc000008']
  });
  console.log(jasmine.Ajax.requests.all());
  jasmine.Ajax.requests.mostRecent().respondWith({
    status: 200,
    responseText: JSON.stringify(response)
  });
  view.render();
  return view;
};
});

;require.register("test/demo/views/editor/component/ThangComponentsEditView.demo", function(exports, require, module) {
var ThangComponentEditView, ThangType, responses;

ThangComponentEditView = require('views/editor/component/ThangComponentsEditView');

ThangType = require('models/ThangType');

responses = {
  '/db/level.component/A/version/0': {
    system: 'System',
    original: 'A',
    version: {
      major: 0,
      minor: 0
    },
    name: 'A',
    configSchema: {
      type: 'object',
      properties: {
        propA: {
          type: 'number'
        },
        propB: {
          type: 'string'
        }
      }
    }
  },
  '/db/level.component/B/version/0': {
    system: 'System',
    original: 'B',
    version: {
      major: 0,
      minor: 0
    },
    name: 'B (depends on A)',
    dependencies: [
      {
        original: 'A',
        majorVersion: 0
      }
    ]
  },
  '/db/level.component/C/version/0': {
    system: 'System',
    original: 'C',
    version: {
      major: 0,
      minor: 0
    },
    name: 'C (depends on B)',
    dependencies: [
      {
        original: 'B',
        majorVersion: 0
      }
    ],
    configSchema: {
      type: 'object',
      "default": {
        propC: 'Default property from component config'
      }
    }
  },
  '/db/level.component/D/version/0': {
    system: 'System',
    original: 'D',
    version: {
      major: 0,
      minor: 0
    },
    name: 'D (comes from ThangType components)'
  },
  '/db/thang.type': []
};

module.exports = function() {
  var view;
  view = new ThangComponentEditView({
    components: [
      {
        original: 'B',
        majorVersion: 0
      }, {
        original: 'C',
        majorVersion: 0
      }, {
        original: 'A',
        majorVersion: 0,
        config: {
          propA: 1,
          propB: 'string'
        }
      }
    ],
    thangType: new ThangType({
      components: [
        {
          original: 'A',
          majorVersion: 0,
          config: {
            propD: 'Default property from thang type component.'
          }
        }, {
          original: 'D',
          majorVersion: 0,
          config: {
            prop1: 'one',
            prop2: 'two'
          }
        }
      ]
    })
  });
  view.render();
  jasmine.Ajax.requests.sendResponses(responses);
  view.$el.css('background', 'white');
  return view;
};
});

;require.register("test/demo/views/game-menu/InventoryView.demo", function(exports, require, module) {
var InventoryView, thangTypes;

InventoryView = require('views/game-menu/InventoryView');

thangTypes = [
  {
    "_id": "53eb98ff1a100989a40ce46b",
    "name": "Boots",
    "original": "boots",
    "components": [
      {
        "original": "524b85837fc0f6d519000020",
        "majorVersion": 0
      }, {
        "original": "524b7b857fc0f6d519000012",
        "majorVersion": 0
      }, {
        "original": "524b4150ff92f1f4f8000024",
        "majorVersion": 0
      }, {
        "original": "53e12043b82921000051cdf9",
        "majorVersion": 0,
        "config": {
          "slots": ["feet"],
          "programmableProperties": ["move", "targetPos"],
          "moreProgrammableProperties": [],
          "extraHUDProperties": ["maxSpeed"],
          "stats": {
            "maxSpeed": {
              "factor": 1
            }
          }
        }
      }, {
        "original": "524b7b8c7fc0f6d519000013",
        "majorVersion": 0,
        "config": {
          "locomotionType": "running",
          "maxSpeed": 5,
          "maxAcceleration": 100
        }
      }, {
        "original": "524b75ad7fc0f6d519000001",
        "majorVersion": 0,
        "config": {
          "pos": {
            "x": 39.08,
            "y": 20.72,
            "z": 0.5
          },
          "width": 1,
          "height": 1,
          "depth": 1,
          "shape": "ellipsoid"
        }
      }, {
        "original": "524b7b7c7fc0f6d519000011",
        "majorVersion": 0
      }
    ]
  }, {
    "_id": "53eb98851a100989a40ce460",
    "name": "Boots of Leaping",
    "original": "boots-of-leaping",
    "components": [
      {
        "original": "524b85837fc0f6d519000020",
        "majorVersion": 0
      }, {
        "original": "524b7b857fc0f6d519000012",
        "majorVersion": 0
      }, {
        "original": "524b4150ff92f1f4f8000024",
        "majorVersion": 0
      }, {
        "original": "53e12043b82921000051cdf9",
        "majorVersion": 0,
        "config": {
          "ownerID": "Tharin",
          "slots": ["feet"],
          "programmableProperties": ["move", "targetPos", "jumpTo"],
          "moreProgrammableProperties": ["jump"],
          "extraHUDProperties": ["maxSpeed"],
          "stats": {
            "maxSpeed": {
              "factor": 1.2
            }
          }
        }
      }, {
        "original": "524b7b8c7fc0f6d519000013",
        "majorVersion": 0,
        "config": {
          "locomotionType": "running",
          "maxSpeed": 6,
          "maxAcceleration": 100
        }
      }, {
        "original": "524b1f54d768d916b5000001",
        "majorVersion": 0,
        "config": {
          "jumpHeight": 3
        }
      }, {
        "original": "5275392d69abdcb12401441e",
        "majorVersion": 0,
        "config": {
          "jumpSpeedFactor": 1.5
        }
      }, {
        "original": "524b75ad7fc0f6d519000001",
        "majorVersion": 0,
        "config": {
          "pos": {
            "x": 39.08,
            "y": 20.72,
            "z": 0.5
          },
          "width": 1,
          "height": 1,
          "depth": 1,
          "shape": "ellipsoid"
        }
      }, {
        "original": "524b7b7c7fc0f6d519000011",
        "majorVersion": 0
      }
    ]
  }, {
    "_id": "53e2288553457600003e3ee2",
    "name": "Crossbow",
    "original": "crossbow",
    "components": [
      {
        "original": "524b85837fc0f6d519000020",
        "majorVersion": 0
      }, {
        "original": "524b517fff92f1f4f8000046",
        "majorVersion": 0
      }, {
        "original": "524b7b747fc0f6d519000010",
        "majorVersion": 0,
        "config": {
          "team": "humans"
        }
      }, {
        "original": "524b7bc67fc0f6d51900001a",
        "majorVersion": 0,
        "config": {
          "missileThangID": "Arrow"
        }
      }, {
        "original": "524b7ba57fc0f6d519000016",
        "majorVersion": 0,
        "config": {
          "attackDamage": 5,
          "attackRange": 20,
          "cooldown": 0.6,
          "chasesWhenAttackingOutOfRange": true
        }
      }, {
        "original": "524b3e3fff92f1f4f800000d",
        "majorVersion": 0
      }, {
        "original": "524cbdc03ea855e0ab0000bb",
        "majorVersion": 0
      }, {
        "original": "524b4150ff92f1f4f8000024",
        "majorVersion": 0
      }, {
        "original": "53e12043b82921000051cdf9",
        "majorVersion": 0,
        "config": {
          "slots": ["right-hand"],
          "programmableProperties": ["attack", "target", "attackRange"],
          "moreProgrammableProperties": ["attackXY", "targetPos"],
          "extraHUDProperties": ["attackDamage", "attackRange"]
        }
      }, {
        "original": "524b75ad7fc0f6d519000001",
        "majorVersion": 0,
        "config": {
          "pos": {
            "x": 41.105000000000004,
            "y": 31.6,
            "z": 0.125
          },
          "width": 1.5,
          "height": 0.75,
          "depth": 0.25,
          "shape": "box"
        }
      }, {
        "original": "524b7b7c7fc0f6d519000011",
        "majorVersion": 0
      }, {
        "original": "524b457bff92f1f4f8000031",
        "majorVersion": 0
      }
    ]
  }, {
    "_id": "53ecec87415ce434054f6aac",
    "name": "Crude Glasses",
    "original": "crude-glasses",
    "components": [
      {
        "original": "524b7b747fc0f6d519000010",
        "majorVersion": 0,
        "config": {
          "team": "humans"
        }
      }, {
        "original": "524b4150ff92f1f4f8000024",
        "majorVersion": 0
      }, {
        "original": "53e12043b82921000051cdf9",
        "majorVersion": 0,
        "config": {
          "slots": ["eyes"],
          "programmableProperties": ["pos", "getEnemies"],
          "moreProgrammableProperties": ["getItems", "getFriends"]
        }
      }, {
        "original": "524b75ad7fc0f6d519000001",
        "majorVersion": 0,
        "config": {
          "pos": {
            "x": 33.230000000000004,
            "y": 20.75,
            "z": 2
          },
          "width": 1,
          "height": 2,
          "depth": 1,
          "shape": "ellipsoid"
        }
      }, {
        "original": "524b457bff92f1f4f8000031",
        "majorVersion": 0,
        "config": {
          "visualRange": 50
        }
      }
    ]
  }
];

module.exports = function() {
  var equipment, responses, view;
  equipment = {
    'feet': 'boots',
    'eyes': 'crude-glasses'
  };
  view = new InventoryView({
    equipment: equipment
  });
  view.render();
  responses = {
    '/db/thang.type?view=items': thangTypes
  };
  jasmine.Ajax.requests.sendResponses(responses);
  return view;
};
});

;require.register("test/demo/views/modals/WizardSettingsModal.demo", function(exports, require, module) {
var WizardSettingsModal,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

WizardSettingsModal = require('views/modal/wizard_settings_modal');

module.exports = function() {
  var modal, rootView, server, takenNames, wizardRequest;
  modal = new WizardSettingsModal;
  rootView = currentView;
  currentView.openModalView(modal);
  wizardRequest = jasmine.Ajax.requests.mostRecent();
  wizardRequest.response({
    status: 200,
    responseText: '{"_id":"5326914a5e02dd0000f5d20e","index":true,"slug":"wizard","name":"Wizard","creator":"5162fab9c92b4c751e000274","original":"52a00d55cf1818f2be00000b","__v":0,"raw":{"shapes":{"0":{"p":"AgHBdQgQgBgLgDQgRgFgKgMQgKgLgBgSIAAgOIAAgEIAAgBQgIgGgEgMQgDgJgBgRIACgyIAAgXIBtABIAGgBQAIAAAJACQANADAKAHQAHAGAFAJIAAAAIAFAJQADAKAAALIgEAkQgCAQgIALQgEAGgFAEIAAACQABAGgCAJQgFASgNAJQgMAJgRADIgQABIgJgBgAgoA1QAGAFAIACIARADIAEAAIAKABIAKgBQAIgBAHgEQAGgFAFgGQgJABgLAAIgKAAQgggCgTgFIgIgCQADAIAFAGgAg6gUQAAAKACAGIACAEIACADIAHAEQAFADAMADQARAEAXABIAJAAQAPAAAHgDQAEgBAEgEIACgFIADgKIADgfQgBgJgDgGIgHgHQgGgFgNAAIgDAAIgBABIgRAAIhAgBIgCArg","t":[19.4,11],"fc":"#1D2226"},"1":{"p":"AgUBBIgEAAQAMgFAKgKIAIAAQAKAAAJgBQgEAGgGAEQgHAFgIABIgJABgAgBAUQgZgBgSgFQgLgCgGgDIgGgFIgCgDQAdgBAVggQAIgOAGgOIAPAAIABgBIADAAQAMAAAHAEIAHAIQADAFAAAKIgCAeIgDAKIgDAGQgDADgFACQgGADgPAAgABChAIAAgBIAEABIAAAJIgEgJg","t":[20.9,10.9],"fc":"#6B4F32"},"2":{"p":"AgCA8QgIgCgGgFQgFgFgDgJIAIADQAQAEAjADQgKAKgMAEIgPgDgAgggDQgCgGAAgKIACgrIBAAAQgGAPgIANQgTAigdAAIgCgDg","t":[17,11],"fc":"#9F815D"},"3":{"p":"AApAvQgZgFgagMQgdgNgUgPQgNgIgIgJIgKgMIgIgOIAbgNIAPAOQAGAGANAJQASALAWALQATAHAcAIIAxAOIgEAdQgdgCgZgGg","t":[28.7,34.2,1,1,-25.4],"fc":"#1D2226"},"4":{"p":"ABWCjQgfAAgegGQgegGgbgMQg7gbgngvIABACIgIgKIgEgIIgCgGICEipIAOgPQATgPAXgFQALgCAOABIAMADIALAEIABAAQAYAKANAXQALAUABAaQABALgBAKIgKA5QgKAygXBjIgDAMgAA0h4QgLACgNAKIgMAKIghApQgbAhgWAYIgpAuIAAAAQAjArA0AWQAXALAbAGQAUAEAXABQARhbAIgtIAHg2QABgIgBgJQgCgQgHgLQgGgLgNgFQgJgDgJAAIgHAAg","t":[26.6,31.4,1,1,-25.4],"fc":"#1D2226"},"5":{"p":"AguAeQgEgCAphIIA5AQIgGBIQg/gIgZgGg","t":[35,38.9,1,1,-25.4],"fc":"#AF4F00"},"6":{"p":"AgpBTQAUgfARgmQAfhKgOglQAVAHAFA3QAFAqgGAiQgFAfgRAag","t":[32.3,25.9,1,1,-25.4],"fc":"#7E7E7E"},"7":{"p":"AgwANIAagXQAagZADgIQAYAKATAFIghBIQg2gVgLgKg","t":[30,39.9,1,1,-25.4],"fc":"#E28600"},"8":{"p":"AgHBgIgogLQAXghAQgnQAfhMgdgcQAPgIATAGQARAGADAJQACAHgTBGQgTBBgIASQgEANgEABIgBAAIgCAAg","t":[29.9,26,1,1,-25.4],"fc":"#8C8C8C"},"9":{"p":"Ag+AgQgjgagRgYIAxg/QAZAqBPAfQAoANAjAGQAEgCgVBJQhbAAhEgyg","t":[28.4,37.9,1,1,-25.4],"fc":"#FBA40B"},"10":{"p":"AgvBmQhJgpgFgSQANgUBwiEQAogyAvAUQAvAUgKBJQgOBVgXBqIgFAAQg1AAhMgrg","t":[26.7,31.7,1,1,-25.4],"fc":"#BABABA"},"11":{"p":"AgKAQIgJgEQAcgVALgOIgIAfQgCAKABAGIgVgIg","t":[34,44.1,1,1,-25.4],"fc":"#1D2226"},"12":{"p":"AAoBKQgMgDgGgJIgCgCIgNAGQgNAGgJABQgJACgKgCQgRgEgQgNQgNgMgJgPQgMgWABgXIADgPIAEgRQAEgKAEgGIAZAQIgEAKIgEANIgCAMIAAABQAAANAHANQAHAMAJAHQAIAIALACIAJABQAGgBAKgEIALgHIARgHIAQgEIADARQAAAFACABIACAAIAHgFQAKgMADgSQAHgdgNgsIAcgJQAQA0gIAkQgFAWgKAOQgKAOgNAGQgHADgIAAIgFAAg","t":[30,43.7,1,1,-25.4],"fc":"#1D2226"},"13":{"p":"AgkAxQgvgJAGgrQARAMAXAFQAsAIAdgyQAGgHAQgJIAPgGIAFAyQAAA0gggBQgJAAgIgKQgGgLgCgCQgKAXgcAAQgJAAgKgCg","t":[31,44.3,1,1,-25.4],"fc":"#EAB28C"},"14":{"p":"AgXA1QgbgHgQgiQgOgeAGgXQAFgRAWAGQANADAiANQATAFAkADQAaAFgFARQgGAUghAXQgcASgUAAQgGAAgGgCg","t":[28.3,45,1,1,-25.4],"fc":"#FFCDAB"},"15":{"p":"AhVAgQAugFAjgQQASgKAOgJIANgNIAIgLIABgCIAkAXIgLAKIgKAGIgVAMQgTAJgZAFQgUAEgXAAQgUAAgWgDgAAygiIAAAAg","t":[48.1,42.3],"fc":"#1D2226"},"16":{"p":"AAAAcQgQgEgVgIIgcgQIgJgGIAigZIADAFIAFAGIALALQAMAJAPAIQAeAQAnAHIgdABQgYAAgWgEg","t":[25.8,39.9],"fc":"#1D2226"},"17":{"p":"AhqBRQgegJgXgOQgOgJgKgKQgGgFgFgHIgKgQIgCgHIACgFQAFgPgBgPIgCgPIgDgKIgBgCIAlgVIADAHIACAGIADALQADALAAAMQABATgFAQIABABIAGAJQAHAJAJAHQASAOAZAJQAqAOA4gBQBBgCAmgLQAZgHAPgPQALgKAGgUIgMgoIgGgYQgDgRAAgLIAqAAIAIAqQAGAYAHAUIADAGIgDAGQgJATgFAIQgJAPgNAJQgUARgjAIQgoAJhGACIgHAAQg8AAgqgMg","t":[38,43.3],"fc":"#1D2226"},"18":{"p":"AhbAeQgbgIgSgIIgWgLIgVgNIAegeQAEAGAJAIQAHAHAJAFQASAMAUAFQAoAPAqgBQAogBAsgQQArgOAhgZIAUAkQg4AUggAJQgwANgsACIgJAAQgrAAgngLg","t":[37.5,35.2],"fc":"#1D2226"},"19":{"p":"AhoEwQgLgBgLgFQgMgEgZgQQgrgagZgNIg0gZIgQgEIgmgCIgLgBIgIgCIgEgCIgCgBIgDgDIgBgBIgBgBIgBAAIAAgBIgFgHIgGgKQgJgSgDgZIgBgVIAAgMIADgNQAIgUAWgRQARgNAWgIQAUgHAUgEQAXgEAQAAIAZgIIABgLQACgQADgKQADg1AHgrQADgZAGgZQAGgdAKgVQAHgOAIgKQAJgKAMgJQAVgPAbgJQAtgPA4ADQAxACAzAQQAaAJAVALIAWANIATANIABABIABABIABABQAqAkAXArQANAZAEAYQAFAYgDAcIAAACQgFAQgQAPQgQAOgSAAQgVABgPgQQgKgKgIgTIAAgBIgBgBQgBgMADgHQACgGAGgDQAFgCAEAAIAMAAQACgBABgHIgBgJIAAgBIAAAAIgDgBIgFgCQgLgCgMADQgXAHgDAWQgBAJABAMIABAIIAIAhQAYAEAZAIQAOACAPAIIAOAHIAKAHQAxAHAcALQAaALAMAPQAJAKAEAMIADANIAAAMQgBAtgXAlQgWAlglAYQg/AqhdAFIjsABIgWAAgAk1A+QgUAHgMAJQgPAKgFAMIgBAHIAAAaQADAUAGANIAEAIIACADIABABIAAAAIAAAAIACABIAIABIAUAAIAVACQAJABANAFIA3AbQAhASAkAXQAUANAMAFQAJADAHABIASAAIDrgBQBZgGA2glQAfgWASgfQATghAAgkQABgPgKgLQgIgJgTgIQgcgKgtgDIgEgBIgbgPIgagJQgWgHgggGIgMgDIgIgmIgBgDIAAgBIgBgCIAAgDIgBgWQABgSAFgMQAHgRAMgJQANgKAQgBQAOgCAPAFIAHADIAHAGIABACIABACIAAACIAAADIAAAIQgBAIgGAHIgNAIQgBABgBAAQAAAAAAABQgBAAAAAAQAAABAAAAIAAAAQgBABABAGQAHAOAHAGQAIAIALAAQALgBAJgJQAJgHADgKQAGgugYgpQgVglgnghIgCgCIgHgFIgegRQgWgLgWgGQgtgPgvgBQgygCgmAOQgxAQgQAjQgHAPgHAcQgDAPgFAgQgGAugDAxIAAADIgBADQgDAGgBAMQgBAIABAMIAAANIg2ASIgDAAIgHAAQggAAggALgAlZCzIgBAAIAAAAg","t":[39.9,33.3],"fc":"#1D2226"},"20":{"p":"AiIBUIBKgMQBCgQgYgYQBEgPgDggQgDgYgagNIBagfIAeBlQABASgiARQg8AfiQAAIgjAAg","t":[43.2,42.5],"fc":"#AF4F00"},"21":{"p":"AglBLQg0AAgkgZIArgLQAogQgOgbQASgGAKgWQAJgTgEgGQAzAAAsgIQAXgFALgEIAIAOQAHASADARQAKA3gtAlQhZAIggAAIgFAAg","t":[38,43.5],"fc":"#E28600"},"22":{"p":"AgBBnQhhgFgxgdQgdgRgIgVQAEgOADgQIABgLQgCgOgBgSQgDgkAHgTIAIALQAMAOAPAMQA0AlBRgCQBPgBAygmQAagTAJgTIAFAZQAEAdgBAQQANAZAGAhQgFAVgbAUQgwAkhXAAIgSAAg","t":[38,40.6],"fc":"#FBA40B"},"23":{"p":"Ag0CaQgEgMgCgLQgFgYgCgZQgEgwALguQAKgtAZgsQATggAjguIABAAIAagaIADAlQAFA7ABAfQABAygFAnQgFAygRAqQgUAvgeAhIgWAXgAgDhZQgYAlgIAtQgJApAIAtQAEAXAHATIAFAKQAQgWAHgWQAQgkAGgtQAHgxgEhXQgSASgNAXg","t":[43.7,21.7],"fc":"#1D2226"},"24":{"p":"AgyA8QgGh/BmhkQAJBzgHA3QgNBpg5A8QgYgsgEhAg","t":[43.6,21.5],"fc":"#FFFFFF"},"25":{"p":"AgiBqQgngKADg8QACg2AQgyQAIgZAHgOIADAeQAFAlAJAgQAcBjA/AKQg5AHgaAAQgPAAgHgCg","t":[26.8,28.3],"fc":"#7E7E7E"},"26":{"p":"AiEBrQACglAJgiQAchlBGgEQAZgEAOADIAeAHQAMgQAEgLQAHgTgdgdQAxAqAaAxQAhA5gWAoQgYAXgYgHQgagIgMgpQAZgGAIgLQAIgHgGgJQgIgMghAEQgiAEgDAeQABAPAFAnQAAAjgkANQhAAWgjAFQgDAAADggg","t":[53.9,24.3],"fc":"#7E7E7E"},"27":{"p":"AiFCdQgmgTgQgyQgRg0gCgvQgBgwANgVIASBPQAZBOAiADQAhADAagtQAZg3ALgVQAVgnAmgVQAigSAZADQAWAAgZgcQgOgQgSgLQBIAeARAJQApAVAPAcQADAZgPAQQgOAOgYAAQgbAAglAYQgrAZgHAiQgIApgbAgQgcAjgkACIgPABQgkAAgZgMg","t":[43,23.7],"fc":"#8C8C8C"},"28":{"p":"AjhCiQgHg4gBhFQAAiHAkg9QAjhBB0gBQBygBBTA+QA6AyASA2QAKAegEAiQgHAdgdAHQghAIgSgsQgIgJACgGIADgEIASADQARgDgFgaQgBgGgOgDQgQgDgOAFQgrAPANBBQAJAsAUAuQARAmgBACQgCAGgYARQggAWgoAKQgiAJghAAQhgAAhrhAg","t":[43.9,27],"fc":"#BABABA"},"29":{"p":"ACUBUQhMgBg/gcQghgQhrgPQhlgPggAEIAJgKQAdgDAfgXQAOgLAEgQQADgPgGgPQBggHBwAPQA4AIAmAJIBnAlQApAPgBAXQAAAOgLAZQgdAZhHAAIgGAAg","t":[51,41.5],"fc":"#7E7E7E"},"30":{"p":"AhEAAQgTgNgcgKIgZgJIAXgyIECARQAEApgrAqQg7A9hvAEQA8gsg8gng","t":[63,53.2],"fc":"#8C8C8C"},"31":{"p":"AhqCVQgOgBgngZIg+gnQgwgZgugEQglgDgDgDQgPgVgEgUQgDgMAAgaQAAgkA1gXQAtgTAqACQBIgYAngIQA4gMBGAAQC7AABFAxQA0AFAcAMQAqASAAAkQAABDg3AyQhGBAiHgDQhuADg4AAQgsAAgOgCg","t":[39.9,47.5],"fc":"#BABABA"},"32":{"p":"AARBIQAOgjAIgZIAGgdQADgQgEgHIgCgEIgGgCQgKAAgOAIQgXAOgRAaIgBABIAAABQgGAGgFALIgJASQgEAJgBAJIgBAJIAAADIABAFIgdAHIgDgOQgBgHABgHQAAgMAFgOQADgLAGgMIAMgVIgBADQAUgmAjgVQAUgNAUgBQARAAALAGQAOAIAHAQQAHASgDAbQgCAPgGAVQgOAogcAYg","t":[7.6,10.5,1,1,0,0,180],"fc":"#1D2226"},"33":{"p":"AgOALQAThLgegBQBBgnACAdQACAOgSA5QgRA0gGAJQgIAPgTAJQgKAFgHACQARgmAKgng","t":[4.7,12.9,1,1,0,0,180],"fc":"#7E7E7E"},"34":{"p":"AggBYQAMghAIgiQANhCgVgFQAUgeAPgHIAKAQQAKATgDARQgGAegJAjQgMAvgFAFQgKAGgOAAIgIAAg","t":[7.5,13,1,1,0,0,180],"fc":"#8C8C8C"},"35":{"p":"AgtBUQgRgIgEgNQgHgWAPglQAIgRAJgPQALgZAXgSQAUgRAUgBQA0gCgXBRQgWBKgmATQgLAHgMAAQgMAAgMgGg","t":[7.7,12.9,1,1,0,0,180],"fc":"#BABABA"},"36":{"p":"AApAvQgZgFgagMQgdgNgUgPQgNgIgIgJIgKgMIgIgOIAbgNIAPAOQAGAGANAJQASALAWALQATAHAcAIIAxAOIgEAdQgdgCgZgGg","t":[17.6,36.9,0.999,0.999,0,26.5,-153.4],"fc":"#1D2226"},"37":{"p":"ABWCjQgfAAgegGQgegGgbgMQg7gbgngvIABACIgIgKIgEgIIgCgGICEipIAOgPQATgPAXgFQALgCAOABIAMADIALAEIABAAQAYAKANAXQALAUABAaQABALgBAKIgKA5QgKAygXBjIgDAMgAA0h4QgLACgNAKIgMAKIghApQgbAhgWAYIgpAuIAAAAQAjArA0AWQAXALAbAGQAUAEAXABQARhbAIgtIAHg2QABgIgBgJQgCgQgHgLQgGgLgNgFQgJgDgJAAIgHAAg","t":[19.7,34.2,0.999,0.999,0,26.5,-153.4],"fc":"#1D2226"},"38":{"p":"AguAeQgEgCAphIIA5AQIgGBIQg/gIgZgGg","t":[11.3,41.5,0.999,0.999,0,26.5,-153.4],"fc":"#AF4F00"},"39":{"p":"AgpBTQAUgfARgmQAfhKgOglQAVAHAFA3QAFAqgGAiQgFAfgRAag","t":[14.2,28.6,0.999,0.999,0,26.5,-153.4],"fc":"#7E7E7E"},"40":{"p":"AgwANIAagXQAagZADgIQAYAKATAFIghBIQg2gVgLgKg","t":[16.2,42.6,0.999,0.999,0,26.5,-153.4],"fc":"#E28600"},"41":{"p":"AgHBgIgogLQAXghAQgnQAfhMgdgcQAPgIATAGQARAGADAJQACAHgTBGQgTBBgIASQgEANgEABIgBAAIgCAAg","t":[16.6,28.7,0.999,0.999,0,26.5,-153.4],"fc":"#8C8C8C"},"42":{"p":"Ag+AgQgjgagRgYIAxg/QAZAqBPAfQAoANAjAGQAEgCgVBJQhbAAhEgyg","t":[17.9,40.6,0.999,0.999,0,26.5,-153.4],"fc":"#FBA40B"},"43":{"p":"AgvBmQhJgpgFgSQANgUBwiEQAogyAvAUQAvAUgKBJQgOBVgXBqIgFAAQg1AAhMgrg","t":[19.7,34.5,0.999,0.999,0,26.5,-153.4],"fc":"#BABABA"},"44":{"p":"AgKAQIgJgEQAcgVALgOIgIAfQgCAKABAGIgVgIg","t":[12.1,46.7,0.999,0.999,0,26.5,-153.4],"fc":"#1D2226"},"45":{"p":"AAoBKQgMgDgGgJIgCgCIgNAGQgNAGgJABQgJACgKgCQgRgEgQgNQgNgMgJgPQgMgWABgXIADgPIAEgRQAEgKAEgGIAZAQIgEAKIgEANIgCAMIAAABQAAANAHANQAHAMAJAHQAIAIALACIAJABQAGgBAKgEIALgHIARgHIAQgEIADARQAAAFACABIACAAIAHgFQAKgMADgSQAHgdgNgsIAcgJQAQA0gIAkQgFAWgKAOQgKAOgNAGQgHADgIAAIgFAAg","t":[16.1,46.3,0.999,0.999,0,26.5,-153.4],"fc":"#1D2226"},"46":{"p":"AgkAxQgvgJAGgrQARAMAXAFQAsAIAdgyQAGgHAQgJIAPgGIAFAyQAAA0gggBQgJAAgIgKQgGgLgCgCQgKAXgcAAQgJAAgKgCg","t":[15.2,47,0.999,0.999,0,26.5,-153.4],"fc":"#EAB28C"},"47":{"p":"AgXA1QgbgHgQgiQgOgeAGgXQAFgRAWAGQANADAiANQATAFAkADQAaAFgFARQgGAUghAXQgcASgUAAQgGAAgGgCg","t":[17.8,47.8,0.999,0.999,0,26.5,-153.4],"fc":"#FFCDAB"},"48":{"p":"AgRAZQgIgLAAgOQAAgNAIgLQAIgKAJAAQALAAAHAKQAIALAAANQAAAOgIALQgHAKgLAAQgJAAgIgKg","t":[59.7,41.7],"fc":"#FFFFFF"},"49":{"p":"AgRAZQgJgLABgOQgBgNAJgLQAHgKAKAAQALAAAHAKQAJALgBANQABAOgJALQgHAKgLAAQgKAAgHgKg","t":[45.6,37.3],"fc":"#FFFFFF"},"50":{"p":"AgFDgQiOgGgth0QgXg7AFg8QgIhVAsg1QAmguBHgPQA/gOBBAOQBBANAjAfQAiAfALBEQALBDgRBCQgUBKgxArQg0AvhNAAIgJAAg","t":[61.1,34.3],"fc":"#1D2226"},"51":{"p":"AgbAAQADgyAAACIAPAFQAMAFAFAJQARAdAFAtIg7AEIACgxg","t":[35.1,20.3,0.914,0.896],"fc":"#FBA40B"},"52":{"p":"AhiAQIAHAPQAJASAOAOQAsAsBAgKQAWgRARgdIAMgaIAFg3Ig5gMIAFg1IA9AP","t":[20.5,30.6,0.914,0.896],"sc":"#1D2226","ss":[3]},"53":{"p":"AgEAaQgUgJgQgMQgHgFgJgHQgKgMgEgFIAegQQACAFAGAKQAFAIAFAFQAJAMAPALQAcAVApAJQgsAAgfgPg","t":[23.8,2.4,0.913,0.896],"fc":"#1D2226"},"54":{"p":"ABJgFQgRAGgcAEQg0AIgwgV","t":[36.4,12.6,0.914,0.896],"sc":"#1D2226","ss":[3.4]},"55":{"p":"ADmi9IgVgPQgCAdgeAbQg8A3iHgFQhtgEgwgnQgPgMgHgPIgEgMQgKADgKAIQgTAQAFAbQAJAVAIAJQAIAHAAABQABAEAJAkQAPAoAlAZQASAMAdAJQAJBgADBEICXAPIgSisIAvgJQA0gPAggZQAggcAMgqQAGgVgBgQQAGgPAEgRQAHgigLgMg","t":[38.8,8.3,0.914,0.896],"sc":"#1D2226","ss":[3.4]},"56":{"p":"AgpBMQAdg2gIg0QAYgTAggiIAjgkQAFAPgFAaQgEAYgGAFQAHAogcAsQglA8hMAZQARgQAPgcg","t":[53.3,2.1,0.914,0.896],"fc":"#AF4F00"},"57":{"p":"AAXgqIhbgDIgEgiICFgCIAMCdIgzAGg","t":[37.7,19.8,0.914,0.896],"fc":"#AF4F00"},"58":{"p":"Ah+BQQAUgEATgKQAlgUgGgcQAYgSAQgUQAQgVAAgOQAmgEAxgQQAYgIAQgHQABAbgEAfQgHA9gWAYQg6AmhKAAQgqAAgvgLg","t":[43.1,4.6,0.914,0.896],"fc":"#E28600"},"59":{"p":"AhHhTICNgcIAEDTIiUALg","t":[37.7,17.4,0.914,0.896],"fc":"#E28600"},"60":{"p":"AhOB4QgugLgYgRQglgagQgrIgJgjQgDgBgEgFQgJgKgJgWQgFgbATgQQAKgIAKgDIAEAMQAHAPAPAMQAwAnBtAEQCHAFA8g3QAegcACgcIAVAPQAMAMgIAiQgEARgGAPIADAKQABAQgJAYQg6BoiKAJIgXABQgnAAgngJg","t":[38.8,1.4,0.914,0.896],"fc":"#FBA40B"},"61":{"p":"AFYiPQgOgegVghQgqhAgngKQgcgIg8ANQhPAvgNAIQghAUgKAJQgRgSh+g4QhHgMgSAIQgeAOgrA5QgVAdgQAaIBNA0QgaAqgLBUQgLBRAGBPQAtAvA/ASQAgAKAXAAQAPgcAQgZQAOgXAGgGQAHAHBbBYIAgABQAnAAAmgGQB6gTBBhCQgDh/hBiKQAkgQAmgdQAUgPAMgLg","t":[39.2,21.4,0.914,0.896],"sc":"#1D2226","ss":[3.4]},"62":{"p":"Aj2giQA6AjBbAUQC2AnCrhb","t":[38.9,17,0.914,0.896],"sc":"#1D2226","ss":[3.4]},"63":{"p":"AgmAAIADggIA/AgIALAiQg+gVgPgNg","t":[20.2,41.1,0.914,0.896],"fc":"#E28600"},"64":{"p":"AgQAMIgKg1IA1ApIgDAqg","t":[14.6,38,0.914,0.896],"fc":"#AF4F00"},"65":{"p":"Ak0gyQAXAfAzAcQBnA8CLgEQB9gFBcg4QAlgUAzg1","t":[40.1,9.2,0.914,0.896],"sc":"#1D2226","ss":[3]},"66":{"p":"AhMAPIANgpIA6AGQA8AEAWgEQgFAfgEAQQhiAAgugMg","t":[37.1,16.6,0.914,0.896],"fc":"#AF4F00"},"67":{"p":"ACygYQgeAdgzAaQhkA1hogWQgRgPgbgeIgYgaIgChI","t":[50.4,35,0.914,0.896],"sc":"#1D2226","ss":[3]},"68":{"p":"AhMgNIAegdIAuATQA0ATAaAAQgbAlgFAKQhzgrgHgNg","t":[26.1,15,0.914,0.896],"fc":"#E28600"},"69":{"p":"AgYgTIA3gpIAJBBQgfAagwAeQAHgIAIhIg","t":[64.1,38.1,0.914,0.896],"fc":"#AF4F00"},"70":{"p":"AgXgNIA9gcIgHA6IhEAZg","t":[58.4,40.8,0.914,0.896],"fc":"#E28600"},"71":{"p":"AhvCXIhkhpIAQjLIAfCsIBFBCQBPAWAJAAQAoAAAogOQA+gVAwgwIAdAcQg3A3hHAYQgvAQguAAQgJAAgSAIIgQAHg","t":[49.4,32.4,0.914,0.896],"fc":"#FBA40B"},"72":{"p":"Ag3gFIBPgtIAHAQQALAQAOAJIhnA8g","t":[61.5,11.3,0.914,0.896],"fc":"#AF4F00"},"73":{"p":"Aj1APQg5ggghgiIAcgcIAAABIABAAIAEAEIAQAOQAeAYAfASQBqA7BxAAQCfAACah5IAdAoQibB5i7AAQh7AAh0hCg","t":[39.4,11.4,0.913,0.896],"fc":"#FBA40B"},"74":{"p":"Ag7AdIAAg5IB3AAIAAA5g","t":[40,25.5,0.914,0.896],"fc":"#FBA40B"},"75":{"p":"AgwBEIgHgVQArhJAVg0QAFgBAJAEQABBHAgAoQgTAMgtAaQgLAFgIAAQgNAAgIgLg","t":[59.7,5.2,0.914,0.896],"fc":"#7E7E7E"},"76":{"p":"AAAByQh8AEhvg+Qg3gfgegeQANgTASgVQAjgqAXgLQAXgKBrAWQA2ALAvANIBZgeQBggcAnAKQAmALAiAwQAQAYAJAWQgeAeg3AfQhoA6h1AAIgPAAg","t":[39.4,6,0.914,0.896],"fc":"#BABABA"},"77":{"p":"AgUgXIgeh7QgJACgBgBQgBgEApgTQAXAvAfB6QAQA+AKA0QACABgJAHQgTAPg4AfQAYg7gWiFg","t":[62.3,28.2,0.914,0.896],"fc":"#7E7E7E"},"78":{"p":"AASCYQhIgYg5g2IAcgdQATATAMAOQAGAGAWAHQAWAHAUgDQALgBAIgDIAzg2IAAg1Ig7gRIADgxIA5AOIABhjIAWABIgNEFIgpBJQAAgDgogNg","t":[21.4,30.2,0.914,0.896],"fc":"#FBA40B"},"79":{"p":"AgCgIQgDgsgMgxIgLgpIAFgHQAIgIAUgMQALACATA9QAZBWAMCHQgLAKghAMIhiAhQBNgmgJiMg","t":[56.9,30.9,0.914,0.896],"fc":"#8C8C8C"},"80":{"p":"AgwCEIgHgIQAEg5AJhCQARiDAZgvQAnATAMANQAHAGgCACQg2AEgbB3QgECaA4AmQg5gfgSgPg","t":[16.9,27.4,0.914,0.896],"fc":"#7E7E7E"},"81":{"p":"AgTCJIgPgOQgrhvAShUQAThVBGgDQAWALAJAJQAEAFAAACIgUAmQgDABgJghQhPA0AKBgQAKBnBNAmQg+gVgIgEg","t":[19.3,30.1,0.914,0.896],"fc":"#8C8C8C"},"82":{"p":"AAADrIhZhSIgLASQgLAVgRAaQg3ACgggZQgiglgZgXQAJhsAqh+QAVhAAUgqQA1gFBKgSQAvgLAIAIQAIgIAoAPQA9AYA3AJIAyBjQA0B3AJBsQgnAkhVAgQhTAgg7AAIgJAAg","t":[40,21.7],"fc":"#BABABA"},"83":{"p":"AjTAiQgQgMgGgOIgDgJIgmhBIIkAUQgWAbgyAbQhkA4iCADIgUAAQh1AAgughg","t":[39.6,40.9,0.914,0.896],"fc":"#35322D"},"84":{"p":"AhOAbQhNgKgzgYQBGALB0gFQBygGBxgXQhqA9h2AAQgeAAgfgEg","t":[41.4,46.4,0.914,0.896],"fc":"#1D2226"},"85":{"p":"AgdAAQgIgxACACQABABANAAQAPADAGAHQAVAaAPAqIg4AQIgJgwg","t":[48.9,21,0.898,0.898],"fc":"#FBA40B"},"86":{"p":"AiKARIBAAyQBMAvBCgKQAjgbAbgdIAChQIglAAIABg8IAlAAIABgc","t":[26,31.9,0.898,0.898],"sc":"#1D2226","ss":[3]},"87":{"p":"AgCAoQgmgGgkgOQgQgHgTgLQgUgJgOgMIAYgYQAJAKARAMQAPALAPAJQAfAPAiAJQBEATBOgMQgzAOgxAAQgZAAgXgEg","t":[32.5,3.8,0.898,0.898],"fc":"#1D2226"},"88":{"p":"AhJAcIAugHQAzgPAjgm","t":[49.8,11,0.898,0.898],"sc":"#1D2226","ss":[3.4]},"89":{"p":"ADghwQAGgPAEgRQAHgigLgMIgVgPQgCAdgeAbQg8A3iHgFQhtgEgwgnQgPgMgHgPIgEgMQgKADgKAIQgTAQAFAbQAJAWAJAKQAEAFADABIAJAmQAQArAlAYQAbASAyALQA5ALA1gGIAXCmICTghIgii8QAbgYARgfQAJgagBgPg","t":[39,9.1,0.898,0.898],"sc":"#1D2226","ss":[3.4]},"90":{"p":"AgpBMQAdg2gIg0QAYgTAggiIAjgkQAFAPgFAaQgEAYgGAFQAHAogcAsQglA8hMAZQARgQAPgcg","t":[53.2,2.8,0.898,0.898],"fc":"#AF4F00"},"91":{"p":"Ah+BQQAUgEATgKQAlgUgGgcQAYgSAQgUQAQgVAAgOQAmgEAxgQQAYgIAQgHQABAbgEAfQgHA9gWAYQg6AmhKAAQgqAAgvgLg","t":[43.2,5.3,0.898,0.898],"fc":"#E28600"},"92":{"p":"AhOB4QgugLgYgRQglgagQgrIgJgjQgDgBgEgFQgJgKgJgWQgFgbATgQQAKgIAKgDIAEAMQAHAPAPAMQAwAnBtAEQCHAFA8g3QAegcACgcIAVAPQAMAMgIAiQgEARgGAPIADAKQABAQgJAYQg6BoiKAJIgXABQgnAAgngJg","t":[39,2.1,0.898,0.898],"fc":"#FBA40B"},"93":{"p":"AARgbIhbALIgJgiICIgtIAfCxIgYAOg","t":[50.2,18.2,0.898,0.898],"fc":"#AF4F00"},"94":{"p":"AFeiYQgPgbgYgdQgug7gngKQgcgIg8ANQhPAvgNAIQghAUgKAJQgRgSh+g4QhHgMgSAIQgeAOgtA3QgWAcgRAZIBcA/QgkBpgNCqQBCBABcAQQAuAJAhgFQAwguAXgUQADAEAOAPQATAVAeAcIAXABQAdAAAegGQBfgSBChCQgLiKgwiMQAygeAqgjg","t":[39.5,21.9,0.898,0.898],"sc":"#1D2226","ss":[3.4]},"95":{"p":"AhVhIICHgwIAkDQIiQAhg","t":[50,17.5,0.898,0.898],"fc":"#E28600"},"96":{"p":"Aj/gdQA8AnBeATQC8AnCxht","t":[39.9,17.2,0.898,0.898],"sc":"#1D2226","ss":[3.4]},"97":{"p":"AgmAJQACgYACgQIADgLIBAAhIAGA0Qg+gVgPgNg","t":[20.7,41,0.898,0.898],"fc":"#E28600"},"98":{"p":"AgTAMIgJg1IA5AZIgHA6g","t":[15.4,38.7,0.898,0.898],"fc":"#AF4F00"},"99":{"p":"Ak2guQAjAiA8AdQB3A9B5gPQBWgNBggxQBMglAcgd","t":[40.4,9.6,0.898,0.898],"sc":"#1D2226","ss":[3]},"100":{"p":"AhMAPIANgpIA6AGQA8AEAWgEQgFAfgEAQQhiAAgugMg","t":[37.3,17.3,0.898,0.898],"fc":"#AF4F00"},"101":{"p":"ACIARQgZAagnAYQhLAvhDgKQgRgOgXgbIgVgXIgChHIAzAAIgEg/IgxABIAAgb","t":[54.1,31.9,0.898,0.898],"sc":"#1D2226","ss":[3]},"102":{"p":"AhMgNIAegdIAuATQA0ATAaAAQgbAlgFAKQhzgrgHgNg","t":[26.5,15.7,0.898,0.898],"fc":"#E28600"},"103":{"p":"AgYgTIA3gpIAJBBQgfAagwAeQAHgIAIhIg","t":[63.9,38.9,0.898,0.898],"fc":"#AF4F00"},"104":{"p":"AgXgNIA9gcIgHA6IhEAZg","t":[58.2,41.5,0.898,0.898],"fc":"#E28600"},"105":{"p":"AhOA8IgHgBIhOhKIAcgdIBEBBIAMAAQAqAAAngOQA+gTAwgwIAcAcQg2A1hIAYQgtAQgwAAIgXgBg","t":[53.7,40.5,0.898,0.898],"fc":"#FBA40B"},"106":{"p":"Ag3gFIBPgtIAHAQQALAQAOAJIhnA8g","t":[61.3,12,0.898,0.898],"fc":"#AF4F00"},"107":{"p":"AjzAPQg5ggghgiIAcgcIAAABIABAAIAEAEIAQAOQAeAYAfASQBqA7BxAAQCfAACah5IAZAfQilCCitAAQh7AAh0hCg","t":[39.5,12.1,0.898,0.898],"fc":"#FBA40B"},"108":{"p":"Ag7AdIAAg5IB3AAIAAA5g","t":[40.2,26.2,0.898,0.898],"fc":"#FBA40B"},"109":{"p":"AgwBEIgHgVQArhJAVg0QAFgBAJAEQABBHAgAoQgTAMgtAaQgLAFgIAAQgNAAgIgLg","t":[59.5,5.9,0.898,0.898],"fc":"#7E7E7E"},"110":{"p":"AAAByQh8AEhvg+Qg3gfgegeQANgTASgVQAjgqAXgLQAXgKBrAWQA2ALAvANIBZgeQBggcAnAKQAmALAiAwQAQAYAJAWQgeAeg3AfQhoA6h1AAIgPAAg","t":[39.6,6.7,0.898,0.898],"fc":"#BABABA"},"111":{"p":"AgZgOIgeh7IAEgIQAMgNAogTQAZAvARCDQAJBCAEA5QACABgKAHQgSAPg4AfQAag7gZiFg","t":[62.5,28.1,0.898,0.898],"fc":"#7E7E7E"},"112":{"p":"AgjCRQhLgYg4g2IAbgdQAzAwBBAVQAoANAoAAIAIAAIA+g8IAAjbIAoAAIAADsIhUBSIgIABIgSAAQgwAAgsgPg","t":[26.9,31.5,0.898,0.898],"fc":"#FBA40B"},"113":{"p":"AgCgIQgDgsgMgxIgLgpIAFgHQAIgIAUgMQALACATA9QAZBWAMCHQgLAKghAMIhiAhQBNgmgJiMg","t":[56.8,31.6,0.898,0.898],"fc":"#8C8C8C"},"114":{"p":"AgwCEIgHgIQAEg5AJhCQARiDAZgvQAnATAMANQAHAGgCACIgfB7QgYCFAaA7Qg5gfgSgPg","t":[17.5,28.1,0.898,0.898],"fc":"#7E7E7E"},"115":{"p":"AgbCJQgggMgLgKQALiHAahWQASg9ALgCQAUAMAIAIQAFAGAAABIgLApQgMAygDArQgICMBMAmIhighg","t":[23.1,31.6,0.898,0.898],"fc":"#8C8C8C"},"116":{"p":"ABJD7IhJhHIhIBHQhDAEg/gbQg2gXgsgpQAKh5AuiNQAXhHAVgwQA6gFBSgUQAzgNAJAKQAKgLA1ALQBsAYAeAEIAsB3QAuCNAKB5QgsApg2AXQg4AYg6AAIgQgBg","t":[40.1,21.3,0.898,0.898],"fc":"#BABABA"},"117":{"p":"Ai3AiQgZgLgRgNIgLgKIglhBIIjAUQgJAbgjAaQhIA3iEADIgVAAQh0AAhIggg","t":[40,41.6,0.898,0.898],"fc":"#35322D"},"118":{"p":"AhOAbQhNgKgzgYQBGALB0gFQBygGBxgXQhqA9h2AAQgeAAgfgEg","t":[41.6,47.2,0.898,0.898],"fc":"#1D2226"},"119":{"p":"AiUBTQgXgUgPgVQgPgYgFgYIgCgSIADAEQAZAhAhASQBAAiBdggQCSgxAMh0QApAsAAA5QgBBEg9AwQg+AwhVAAQhYgBg8gxg","t":[15,76.8],"fc":"#A5CCDE"},"120":{"p":"Ah/BrQghgSgZgjIgCgEQgDhPBehDIAFgDQARgJASgFIAXgGQAagFAcAAQBXAAA9AyIAUASQgNByiSAzQgsAQgnAAQgpAAghgSg","t":[13,69.2],"fc":"#CCECFA"},"121":{"p":"AAACFQhYgBg8gxQgXgUgPgVQgPgYgFgYIgCgSIADAEQAZAhAhASQBAAiBdggQCSgxAMh0QApAsAAA5QgBBEg9AwQg+AwhVAAIAAAAg","t":[15.2,76.7],"fc":"#A5CCDE"},"122":{"p":"Ah/BrQghgSgZgiIgDgFQgChPBehDIAFgDQARgJASgFIAXgGQAagFAcAAQBXABA9AxIAUATQgNBxiSA0QgsAPgmAAQgqAAghgSg","t":[13.1,69],"fc":"#CCECFA"},"123":{"p":"AAACFQhYgBg8gxQgXgUgPgVQgPgYgFgYIgCgSIADAEQAZAhAhASQBAAiBdggQCSgxAMh0QApAsAAA5QgBBDg9AxQg+AwhVAAIAAAAg","t":[15.3,76.5],"fc":"#A5CCDE"},"124":{"p":"AAACFQhYgBg8gyQgXgTgPgVQgPgXgFgaIgCgRIADAEQAZAhAhASQBAAiBdggQCSgxAMh0QApAsAAA5QgBBDg9AxQg+AwhVAAIAAAAg","t":[15.6,76.2],"fc":"#A5CCDE"},"125":{"p":"Ah/BrQghgSgZgiIgDgFQgChPBehDIAGgDQAQgIASgGIAXgGQAagFAcAAQBXABA9AxIAUATQgNBxiSA0QgsAPgmAAQgqAAghgSg","t":[13.7,68.4],"fc":"#CCECFA"},"126":{"p":"AAACFQhXgBg8gyQgYgTgPgVQgPgXgFgaIgCgRIADAEQAYAhAiASQBAAiBcggQCSgxANh0QApAsAAA5QgBBDg9AxQg+AwhVAAIAAAAg","t":[16,75.7],"fc":"#A5CCDE"},"127":{"p":"AhzCJQhDgdgUg8QBlBWB9hYQB/hVgThzQAzAfAPA3QASBDgvA9QguA/hUAXQgkAJgfAAQguAAgpgSg","t":[-10,74.3],"fc":"#A5CCDE"},"128":{"p":"AikBgIgDgKQgShCAvg+QAuhABUgWQBSgWBIAfQANAFALAIQATBxh/BXQg+Asg6AAQg4AAgygqg","t":[-13.8,69.5],"fc":"#CCECFA"},"129":{"p":"AijBgIgEgKQgShCAvg+QAuhABUgWQBSgWBIAfQANAFALAIQATBxh/BXQg+Asg6AAQg4AAgxgqg","t":[-14,69.3],"fc":"#CCECFA"},"130":{"p":"AhzCJQhDgdgUg8QBlBWB9hYQB/hVgThzQAzAfAPA3QASBDgvA9QguA/hUAXQgkAJgfAAQgtAAgqgSg","t":[-10.4,73.5],"fc":"#A5CCDE"},"131":{"p":"AijBgIgEgKQgShDAvg9QAuhABUgWQBSgXBIAgQANAFALAHQATBxh/BYQg+Asg5AAQg5AAgxgqg","t":[-14.2,68.8],"fc":"#CCECFA"},"132":{"p":"AhzCJQhDgdgUg8QBlBWB8hYQCAhVgThzQAzAfAOA3QATBDgvA9QgvA/hUAXQgjAJgfAAQgtAAgqgSg","t":[-10.5,73.3],"fc":"#A5CCDE"},"133":{"p":"AhzCJQhDgdgUg8QBlBWB8hYQCAhVgThzQAzAfAOA3QATBDgvA9QgvA/hUAXQgjAJgeAAQguAAgqgSg","t":[-10.7,73],"fc":"#A5CCDE"},"134":{"p":"AhzCJQhDgdgUg8QBlBWB8hXQCAhWgThzQAzAfAOA3QATBDgvA+QgvA+hUAXQgiAJgfAAQguAAgqgSg","t":[-10.8,72.8],"fc":"#A5CCDE"},"135":{"p":"AijBgIgEgKQgShDAvg9QAuhABUgWQBSgXBIAgQANAFALAHQATBxh/BYQg+Asg5AAQg4AAgygqg","t":[-14.6,68],"fc":"#CCECFA"},"136":{"p":"AheBwQg2gYgRgwQBTBGBlhIQBohGgPheQApAaANAtQAOA3gmAyQgmAzhFASQgdAIgZAAQglAAgigPg","t":[-35.2,109.3],"fc":"#A5CCDE"},"137":{"p":"AiGBOIgCgIQgPg3AmgxQAmg0BFgSQBDgTA6AaIAUAKQAPBchoBIQgyAkgvAAQguAAgpgjg","t":[-38.3,105.5],"fc":"#CCECFA"},"138":{"p":"AiTCvQhVglgahMQCBBtCfhvQCihugYiTQBBAoATBGQAXBVg7BPQg8BQhrAdQgsAMgoAAQg7AAg1gXg","t":[41.6,109.6],"fc":"#A5CCDE"},"139":{"p":"AjRB7IgEgNQgXhVA8hPQA7hRBrgcQBpgdBbAoQARAHAOAJQAYCQiiBwQhPA4hKAAQhHAAhAg1g","t":[36.7,103.6],"fc":"#CCECFA"},"140":{"p":"AjlBBIAAgNQAAhTBLg8QBLg7BoAAQBpAABLA7IAZAXQgxCOiHA3QgyAWgwAAQhfAAhShWg","t":[5.9,106.4],"fc":"#CCECFA"},"141":{"p":"AizBnQhGg3gFhLQB8CBCWhCQCHg1AyiRQAyA1AABGQAABShLA8QhLA8hpAAQhpAAhKg8g","t":[8.5,115.7],"fc":"#A5CCDE"},"142":{"p":"AjJBzQhNg+gGhTQCKCQCphKQCXg7A2iiQA5A7AABOQAABchUBDQhTBDh2AAQh1AAhUhDg","t":[-23.6,110.4],"fc":"#A5CCDE"},"143":{"p":"Aj/BIIgBgOQAAhcBUhEQBThCB1AAQB2AABTBCQAQAMAMANQg3CgiWA9Qg4AZg2AAQhqAAhbhhg","t":[-26.4,100],"fc":"#CCECFA"},"144":{"p":"AjJBzQhOg9gGhUQCLCQCphKQCXg7A3ijQA5A8AABOQAABdhVBCQhTBEh2gBQh2ABhThEg","t":[-23.6,110.2],"fc":"#A5CCDE"},"145":{"p":"AkABJIAAgPQAAhcBThEQBUhDB1AAQB3AABTBDQAPAMAMANQg2ChiXA9Qg4AZg2AAQhqAAhchhg","t":[-26.4,99.7],"fc":"#CCECFA"},"146":{"p":"AjKB0QhNg+gGhUQCLCRCphLQCYg7A3ijQA4A8AABOQAABdhUBDQhUBDh2AAQh2AAhUhDg","t":[-23.6,109.9],"fc":"#A5CCDE"},"147":{"p":"AkBBJIAAgOQAAhdBUhEQBUhDB1AAQB3AABUBDQAPAMAMANQg3ChiXA9Qg4AZg2AAQhrAAhchhg","t":[-26.4,99.5],"fc":"#CCECFA"},"148":{"p":"AjKB0QhOg+gGhUQCLCRCqhLQCYg7A3ikQA5A8AABPQAABdhVBDQhTBEh3gBQh2ABhUhEg","t":[-23.6,109.7],"fc":"#A5CCDE"},"149":{"p":"AkBBJIgBgOQAAhdBUhFQBUhDB2AAQB4AABTBDQAQAMAMAOQg3ChiYA+Qg4AZg2AAQhrAAhchig","t":[-26.4,99.2],"fc":"#CCECFA"},"150":{"p":"AjLB0QhOg+gGhUQCMCRCrhKQCYg8A3ikQA5A8AABOQAABehVBDQhUBEh3AAQh3AAhUhEg","t":[-23.6,109.5],"fc":"#A5CCDE"},"151":{"p":"AkCBJIgBgOQAAhdBVhFQBUhDB2AAQB4AABUBDQAQAMAMANQg3CiiZA+Qg4AZg2AAQhrAAhdhig","t":[-26.5,98.9],"fc":"#CCECFA"},"152":{"p":"AjMB0QhOg+gGhUQCMCSCshLQCYg8A3ilQA6A9AABOQAABfhVBCQhUBEh4AAQh3AAhVhEg","t":[-23.6,109.3],"fc":"#A5CCDE"},"153":{"p":"AkDBJIAAgOQAAheBUhEQBVhEB2AAQB4AABUBEQAQAMAMANQg3CiiZA+Qg4Aag2AAQhsAAhdhjg","t":[-26.5,98.7],"fc":"#CCECFA"},"154":{"p":"AjMB1QhOg/gGhUQCMCSCshLQCZg8A3ilQA5A8AABPQAABfhVBDQhUBEh4AAQh3AAhVhEg","t":[-23.6,109],"fc":"#A5CCDE"},"155":{"p":"AkEBKIAAgPQAAheBVhEQBVhEB2AAQB5AABUBEQAQAMAMANQg3CjiZA+Qg5AZg2AAQhsAAhehig","t":[-26.5,98.4],"fc":"#CCECFA"},"156":{"p":"AjNB1QhOg+gGhWQCNCUCshMQCZg9A4ilQA5A9AABPQAABfhVBDQhVBFh4AAQh4AAhVhFg","t":[-23.6,108.8],"fc":"#A5CCDE"},"157":{"p":"AkEBKIgBgPQAAheBVhFQBVhEB3AAQB5AABVBEQAQAMAMAOQg4CjiZA+Qg5Aag3AAQhsAAhdhjg","t":[-26.5,98.2],"fc":"#CCECFA"},"158":{"p":"AkDBJIgBgOQAAheBVhEQBVhEB2AAQB5AABUBEQAQAMAMANQg3CjiZA+Qg5AZg2AAQhsAAhdhjg","t":[-26.5,98.4],"fc":"#CCECFA"},"159":{"p":"AjLB0QhOg+gGhUQCMCSCrhLQCYg8A3ikQA5A8AABOQAABfhVBCQhUBEh3AAQh3AAhUhEg","t":[-23.7,109.1],"fc":"#A5CCDE"},"160":{"p":"AkCBJIgBgOQAAhdBUhFQBVhDB2AAQB4AABUBDQAQAMAMANQg3CiiZA+Qg4AZg2AAQhsAAhchig","t":[-26.6,98.6],"fc":"#CCECFA"},"161":{"p":"AjLB0QhNg+gGhUQCLCRCqhKQCYg8A3ikQA5A8AABPQAABdhUBDQhUBEh3AAQh3AAhUhEg","t":[-23.8,109.3],"fc":"#A5CCDE"},"162":{"p":"AkCBJIAAgOQAAhdBUhFQBUhDB2AAQB4AABUBDQAPAMAMAOQg3ChiYA+Qg4AZg2AAQhrAAhdhig","t":[-26.7,98.8],"fc":"#CCECFA"},"163":{"p":"AjKB0QhNg+gGhUQCKCRCqhLQCYg7A2ijQA5A8AABOQAABdhUBDQhUBDh2AAQh2AAhUhDg","t":[-23.9,109.5],"fc":"#A5CCDE"},"164":{"p":"AkBBJIAAgOQAAhdBUhEQBUhDB1AAQB3AABUBDQAPAMAMANQg2ChiYA9Qg4AZg2AAQhrAAhchhg","t":[-26.7,99],"fc":"#CCECFA"},"165":{"p":"AjJBzQhNg+gGhTQCKCRCphLQCXg7A3iiQA4A7AABOQAABdhUBCQhTBDh2AAQh2AAhThDg","t":[-24,109.6],"fc":"#A5CCDE"},"166":{"p":"AkABIIAAgOQAAhcBThEQBUhDB1AAQB3AABTBDQAPAMAMANQg2ChiXA9Qg4AZg2AAQhqAAhchig","t":[-26.8,99.2],"fc":"#CCECFA"},"167":{"p":"AjJBzQhMg+gGhTQCJCQCphKQCXg7A2iiQA4A8AABNQAABdhTBCQhUBDh1AAQh1AAhUhDg","t":[-24,109.8],"fc":"#A5CCDE"},"168":{"p":"Aj/BIIAAgOQAAhcBThEQBThCB1AAQB2AABTBCQAPANAMAMQg2CgiWA9Qg4AZg2AAQhqAAhbhhg","t":[-26.9,99.4],"fc":"#CCECFA"},"169":{"p":"AjIByQhMg9gGhTQCJCQCohKQCWg7A2ihQA5A7AABOQAABchUBBQhTBDh1AAQh1AAhThDg","t":[-24.1,110],"fc":"#A5CCDE"},"170":{"p":"Aj+BIIgBgOQAAhcBThDQBThCB1AAQB1AABUBCQAOAMANANQg3CfiWA9Qg3AYg1AAQhqAAhbhgg","t":[-27,99.6],"fc":"#CCECFA"},"171":{"p":"AhICvQiPgmhQhsQhJhiAVhpQBAC9EdARQEeARAhjvQAwBagYBeQggBwh6A2QhIAfhOAAQg2AAg7gQg","t":[23.9,115.3],"fc":"#A5CCDE"},"172":{"p":"AAPDTQkcgRhBi/IAFgPQAehyB6g2QB7g2CNAnQCPAmBPBsQAPATALATQgfDfj8AAIglgBg","t":[22.6,97.4],"fc":"#CCECFA"},"173":{"p":"AAPDTQkcgRhAi/IAEgPQAehyB6g2QB7g1CNAmQCPAmBPBsQAOATALATQgfDfj7AAIglgBg","t":[22.6,97.1],"fc":"#CCECFA"},"174":{"p":"AhICvQiPgnhQhrQhJhiAVhpQBAC9EdARQEeARAhjvQAwBagZBeQgfBvh6A2QhIAghPAAQg1AAg7gQg","t":[23.9,115],"fc":"#A5CCDE"},"175":{"p":"AAPDTQkcgRhAi/IAEgPQAehyB6g2QB7g1CNAnQCPAmBPBrQAOATALATQgfDfj7AAIglgBg","t":[22.6,96.9],"fc":"#CCECFA"},"176":{"p":"AhICvQiPgnhPhrQhKhiAVhpQBBC8EcASQEdAQAhjuQAxBagZBeQgfBvh7A2QhHAghPAAQg1AAg7gQg","t":[23.9,114.8],"fc":"#A5CCDE"},"177":{"p":"AAPDTQkcgShAi+IAEgPQAehyB6g2QB7g1CNAnQCPAmBOBrQAPATALATQgfDfj7AAIglgBg","t":[22.6,96.6],"fc":"#CCECFA"},"178":{"p":"AhICvQiPgnhPhrQhKhiAVhpQBBC8EcASQEdAQAhjtQAwBZgYBeQggBvh6A2QhHAghPgBQg1AAg7gPg","t":[23.9,114.5],"fc":"#A5CCDE"},"179":{"p":"AAPDSQkbgRhBi+IAEgPQAfhyB5g1QB7g2CNAnQCOAmBPBrQAPATALATQgfDej7AAIglgBg","t":[22.6,96.4],"fc":"#CCECFA"},"180":{"p":"AhICvQiPgnhPhrQhJhiAVhpQBAC8EcASQEdAQAhjtQAwBZgYBeQggBvh6A2QhIAfhOAAQg1AAg7gPg","t":[23.9,114.3],"fc":"#A5CCDE"},"181":{"p":"AAPDSQkbgRhAi+IAEgPQAehyB5g1QB7g2CNAnQCOAmBPBrQAOATALATQgeDej8AAIgkgBg","t":[22.6,96.2],"fc":"#CCECFA"},"182":{"p":"AhICvQiOgnhQhrQhJhiAVhpQBAC8EcASQEdAQAhjtQAwBZgZBeQgfBvh6A2QhIAfhOAAQg1AAg7gPg","t":[23.9,114],"fc":"#A5CCDE"},"183":{"p":"AAQDSQkcgRhAi+IAEgOQAehzB5g1QB7g2CNAnQCOAmBPBrQAOATALAUQgfDdj7AAIgjgBg","t":[22.6,95.9],"fc":"#CCECFA"},"184":{"p":"AhICvQiOgnhPhrQhKhiAVhpQBAC8EcASQEdAQAhjtQAwBZgZBeQgfBvh6A2QhIAfhOAAQg1AAg7gPg","t":[24,113.8],"fc":"#A5CCDE"},"185":{"p":"AhICvQiOgnhPhrQhKhhAVhpQBAC7EcASQEcAQAhjtQAwBagYBdQggBvh6A2QhHAfhOAAQg1AAg7gPg","t":[24,113.5],"fc":"#A5CCDE"},"186":{"p":"AAQDSQkcgRhAi+IAEgOQAehzB5g1QB7g1CNAmQCOAmBOBrQAPATALAUQgfDdj7AAIgjgBg","t":[22.6,95.7],"fc":"#CCECFA"},"187":{"p":"AAPDSQkbgRhAi+IAEgOQAehzB6g1QB6g2CMAnQCPAmBOBrQAPATALAUQgfDdj7AAIgkgBg","t":[22.6,95.9],"fc":"#CCECFA"},"188":{"p":"AhICuQiOgmhPhrQhKhiAVhoQBAC7EcASQEcAQAhjtQAwBZgYBeQgfBvh7A2QhHAfhOAAQg1AAg7gQg","t":[24,113.8],"fc":"#A5CCDE"},"189":{"p":"AhICuQiOgmhPhrQhKhiAVhoQBAC7EcASQEdAQAhjtQAvBZgYBeQgfBvh6A2QhIAfhOAAQg1AAg7gQg","t":[24,114],"fc":"#A5CCDE"},"190":{"p":"AhICuQiPgmhOhrQhKhiAVhoQBAC7EcASQEdAQAhjtQAvBZgYBeQgfBvh6A2QhHAfhOAAQg2AAg7gQg","t":[24.1,114.6],"fc":"#A5CCDE"},"191":{"p":"AhICuQiPgmhPhrQhJhiAVhoQBAC7EcASQEdAQAhjtQAvBZgYBeQgfBvh6A2QhHAfhOAAQg2AAg7gQg","t":[24.2,114.8],"fc":"#A5CCDE"},"192":{"p":"AhFCnQiJglhLhnQhHhdAUhkQBIDJD7gVQD4gSBDixQAvBVgYBaQgdBrh2AzQhEAehLAAQgzAAg5gPg","t":[3.4,91.7],"fc":"#A5CCDE"},"193":{"p":"Ak/ALIAEgPQAehtB0gzQB2gzCGAlQCJAkBLBnQAOASAKATQhDCvj6AUQgVACgVAAQjVAAhCi4g","t":[2.1,73.8],"fc":"#CCECFA"},"194":{"p":"Ak/ALIADgPQAehtB1g0QB2gzCGAlQCJAlBMBmQANATALATQhDCvj7AVQgVACgWAAQjVAAhBi5g","t":[2.1,73.6],"fc":"#CCECFA"},"195":{"p":"AhFCnQiKgkhLhoQhHhdAUhlQBJDKD7gVQD5gSBDiyQAvBWgYBaQgdBrh2A0QhFAehKAAQg0AAg5gQg","t":[3.4,91.5],"fc":"#A5CCDE"},"196":{"p":"AlAALIADgPQAehtB1g0QB3g0CGAmQCKAkBMBnQANASALAUQhDCvj8AVQgVACgWAAQjVAAhCi5g","t":[2.1,73.3],"fc":"#CCECFA"},"197":{"p":"AhGCoQiJglhMhnQhHheAVhlQBIDKD8gUQD6gTBDiyQAvBWgYBaQgeBrh2A0QhEAehLAAQg0AAg6gPg","t":[3.4,91.3],"fc":"#A5CCDE"},"198":{"p":"AlBALIADgPQAehuB2g0QB3gzCHAlQCJAlBNBnQANASALAUQhDCwj9AVQgVACgWAAQjWAAhCi6g","t":[2.1,73],"fc":"#CCECFA"},"199":{"p":"AhGCoQiKglhLhnQhIheAVhmQBIDLD9gUQD6gTBEizQAvBXgZBaQgdBsh2A0QhFAehLAAQg0AAg6gQg","t":[3.4,91],"fc":"#A5CCDE"},"200":{"p":"AlCALIADgPQAehuB2g0QB3g0CIAmQCKAlBMBnQAOASALAUQhECwj9AVQgVACgWAAQjXAAhCi6g","t":[2.1,72.8],"fc":"#CCECFA"},"201":{"p":"AhGCpQiLglhLhoQhIheAVhmQBJDLD9gUQD7gTBEizQAvBWgZBbQgdBsh3A0QhFAehLAAQg0AAg6gPg","t":[3.4,90.8],"fc":"#A5CCDE"},"202":{"p":"AlDALIADgPQAfhuB2g1QB3g0CIAmQCKAlBNBoQAOASALAUQhECxj+AVQgVACgWAAQjXAAhDi7g","t":[2.1,72.5],"fc":"#CCECFA"},"203":{"p":"AhGCpQiLglhMhoQhIhfAVhmQBJDND+gVQD8gTBDi0QAwBXgZBbQgdBsh3A1QhFAehMAAQg0AAg6gQg","t":[3.4,90.6],"fc":"#A5CCDE"},"204":{"p":"AlEALIADgPQAfhvB2g0QB4g0CIAmQCLAlBNBoQAOASALAUQhECxj/AVQgVACgWAAQjYAAhDi7g","t":[2.1,72.2],"fc":"#CCECFA"},"205":{"p":"AhGCpQiMgkhMhpQhIhfAVhmQBJDND/gVQD8gUBEizQAwBXgZBbQgdBth4A0QhFAehMAAQg0AAg6gQg","t":[3.4,90.4],"fc":"#A5CCDE"},"206":{"p":"AhHCqQiMglhMhpQhIhfAVhnQBJDOEAgVQD9gUBEi0QAwBXgZBcQgeBth4A0QhFAfhMAAQg0AAg7gQg","t":[3.4,90.2],"fc":"#A5CCDE"},"207":{"p":"AlEALIADgPQAehvB3g1QB4g0CIAmQCMAmBNBoQANASALAUQhDCykAAVQgVACgWAAQjZAAhCi8g","t":[2.1,71.9],"fc":"#CCECFA"},"208":{"p":"AlEALIAEgPQAehvB3g0QB3g0CIAmQCLAlBNBoQAOASAKAUQhDCxj/AVQgVACgWAAQjYAAhDi7g","t":[2.1,72.2],"fc":"#CCECFA"},"209":{"p":"AhGCpQiMgkhMhpQhHhfAUhmQBJDND/gVQD8gUBEizQAwBXgZBbQgdBth4A0QhFAehMAAQg0AAg6gQg","t":[3.5,90.3],"fc":"#A5CCDE"},"210":{"p":"AlCALIADgPQAehuB2g1QB3g0CIAmQCKAlBNBoQAOASALAUQhECxj+AVQgVACgWAAQjXAAhCi7g","t":[2.2,72.4],"fc":"#CCECFA"},"211":{"p":"AhGCpQiLglhMhoQhHhfAUhlQBJDMD+gVQD7gUBEizQAwBXgZBbQgdBsh3A0QhFAfhMAAQg0AAg6gQg","t":[3.5,90.5],"fc":"#A5CCDE"},"212":{"p":"AlCALIAEgPQAehuB2g0QB2g0CIAmQCJAlBNBnQAOASALAUQhECwj9AVQgVACgWAAQjXAAhCi6g","t":[2.2,72.6],"fc":"#CCECFA"},"213":{"p":"AhGCpQiKglhMhoQhHhfAUhlQBJDLD9gUQD7gTBDizQAvBWgYBbQgdBsh3A0QhFAehLAAQg0AAg6gPg","t":[3.6,90.7],"fc":"#A5CCDE"},"214":{"p":"AlAALIADgPQAehtB1g1QB3gzCHAlQCJAlBMBnQANATALATQhDCwj8AUQgVACgWAAQjWAAhBi5g","t":[2.3,72.8],"fc":"#CCECFA"},"215":{"p":"AhGCoQiKglhLhoQhHhdAUhlQBJDKD8gVQD6gSBDiyQAvBVgYBbQgdBsh2AzQhFAehLAAQg0AAg6gPg","t":[3.6,90.8],"fc":"#A5CCDE"},"216":{"p":"AlAALIAEgPQAehtB1g0QB2gzCGAlQCJAlBMBmQAOATALATQhECvj7AVQgVACgWAAQjVAAhCi5g","t":[2.4,73],"fc":"#CCECFA"},"217":{"p":"AhFCoQiKglhLhoQhHhdAUhlQBIDKD8gVQD5gSBDiyQAvBWgYBaQgdBrh2A0QhEAehMAAQgzAAg5gPg","t":[3.7,91],"fc":"#A5CCDE"},"218":{"p":"Ak+ALIADgPQAehtB0gzQB2g0CGAmQCIAkBMBmQAOATALATQhECvj6AUQgVACgWAAQjUAAhBi4g","t":[2.4,73.3],"fc":"#CCECFA"},"219":{"p":"AhFCnQiJgkhLhoQhHhdAVhkQBHDJD7gVQD4gSBEixQAuBVgYBaQgdBrh1AzQhFAehLAAQgzAAg5gPg","t":[3.7,91.2],"fc":"#A5CCDE"},"220":{"p":"AhFCnQiIglhLhnQhHhdAVhjQBHDID6gVQD4gSBDixQAuBVgYBaQgdBrh1AzQhEAehLAAQgzAAg5gPg","t":[3.8,91.3],"fc":"#A5CCDE"},"221":{"p":"Ak+ALIAEgPQAdhsB1g0QB1gzCGAlQCIAlBMBmQAMASALATQhDCuj5AVQgVABgWAAQjUAAhBi3g","t":[2.5,73.5],"fc":"#CCECFA"},"222":{"p":"AgIAZQgagKgWgPQgOgJgJgIQgFgFgFgGQgFgGgEgHIAagNIAGAIIAIAIQAFAGANAKQASANAXAJQAuAUA0AGIgEAdQg9gLgqgTg","t":[27.9,32.1,0.92,0.92,-26.6],"fc":"#1D2226"},"223":{"p":"ABYCjQgfAAgfgGQgegHgagMQg7gagngvIgFgFIgDgEIgDgHIgCgHIAHgKIAsg1QAfgnARgTIAYgdIAMgPIANgPQAUgRAUgFQALgDAOABQAHAAAFACIAGACIAFACIAAAAQAZAMALAXQAKAUAAAYQABAQgEAZIgmDHgAA2h6QgOABgNAIIgNALIgMANIgVAdIhWBqIAAAAQAjApA0AYQAXALAbAFQAUAFAXABIAOg/QAJgpAGgfIAHg4IgBgRQgCgRgIgLQgIgKgNgEIgEgBIgJgDIgJgBIgDAAg","t":[25.8,29.7,0.92,0.92,-26.6],"fc":"#1D2226"},"224":{"p":"AgvAdQgDgBAphHIA5AOIgGBKQhAgKgZgGg","t":[33.8,36.4,0.92,0.92,-26.6],"fc":"#AF4F00"},"225":{"p":"AgpBTQAUgfARgmQAghLgOgkQAUAHAGA3QAEAqgFAiQgFAfgSAag","t":[31.1,24.5,0.92,0.92,-26.6],"fc":"#7E7E7E"},"226":{"p":"AgwAMIAagWQAagZADgIQAXAKAUAFIghBIQg3gVgKgLg","t":[29.3,37.3,0.92,0.92,-26.6],"fc":"#E28600"},"227":{"p":"AgHBgIgogLQAXghAQgnQAfhMgdgcQAPgIATAGQARAGADAJQACAHgTBGQgTBBgIARQgEANgEACIgBAAIgCAAg","t":[28.9,24.6,0.92,0.92,-26.6],"fc":"#8C8C8C"},"228":{"p":"Ag+AfQgjgZgRgYIAxhAQAZAqBOAfQApANAjAHQAEgCgWBKQhaAAhEg0g","t":[27.7,35.5,0.92,0.92,-26.6],"fc":"#FBA40B"},"229":{"p":"AgvBmQhJgpgFgTQANgUBwiDQAPgUATgJQAagMAbALQAuAUgJBIQgQBYgVBoIgFAAQg1AAhMgrg","t":[26,29.9,0.92,0.92,-26.6],"fc":"#BABABA"},"230":{"p":"AgBAjQgRgBgWgJQgRgGAAgBIAKgUIABAAIAQAFQARAGANACQANADAJgEQAFgBADgDIACgDIgCgCQgDgBgMgRQgMgRgCgBIAOABQASAJAGAFQAHAEAFAGIAFAIQACADAAAFIgBACIAAACIgBABQgFAJgGAFQgKAJgOABIgLABIgLgBg","t":[26.7,43.6,0.92,0.92,-26.6],"fc":"#1D2226"},"231":{"p":"AAGAcQAFgHgHgIQgEgEgUgMQgPgJgCgQIAVACQAYAHAYAWQALAMgIAIQgGAGgOAAIgJgBg","t":[26.5,42.3,0.92,0.92,-26.6],"fc":"#EAB28C"},"232":{"p":"AAGBaIgOgEIAAABIgCgBQgKgBgMgEQgdgIgSgQQgNgLgGgPQgHgQADgSQAEgmAogxIAYATQgkArgCAcQgCAQAIALQAHAJAIAFQAMAHATAFIAMADIAEABIACAAIACABIAJACQAXADAUgQQANgKAEgOQADgJABgIQABgKgBgIIAdgFQADALgCAQQgCAMgDAJQgIAYgTAQQgZAUgdAAIgLgBg","t":[28.6,40.8,0.92,0.92,-26.6],"fc":"#1D2226"},"233":{"p":"AgQAeQgVgGgHgQQgGgNAGgRQAFgNANACQAJABAZAKQAaAJAHAFQALAHgFAMQgFAQgTAFQgIACgIAAQgKAAgNgEg","t":[26.4,43.1,0.92,0.92,-26.6],"fc":"#FFCDAB"},"234":{"p":"AAIA/QgPgEgzgTQgdgLASgvIAYguIALAMQAMANADAJQAIA5AsAJQAXAFAVgIQgIAggnAAQgKAAgMgCg","t":[27.8,42,0.92,0.92,-26.6],"fc":"#EAB28C"},"235":{"p":"AgDA1QgbgDgZgiQgXgfACgYQACgRAaAFIA0ANQAUACAgAAQAXADgCARQgDAWgZAYQgYAXgZAAIgDAAg","t":[31.8,42.1,0.92,0.92,-26.6],"fc":"#FFCDAB"},"236":{"p":"AgpAqQgSgRAAgZQAAgYASgRQARgSAYAAQAZAAARASQARARABAYQgBAZgRARQgRARgZABQgYgBgRgRg","t":[7.1,7.1],"fc":"#FFFFFF"},"237":{"p":"AgxAxQgVgUAAgdQAAgcAVgVQAVgVAcAAQAdAAAUAVQAWAVAAAcQAAAdgWAUQgUAWgdAAQgcAAgVgWg","t":[7.1,7.1],"fc":"#95EAFF"},"238":{"p":"ABFBeIgCAAIgCAAIgBgBIAAgBIAAgBIAAgBIABgBIABgBIABgBIAAgBIABgBIABAAIAAgBIABgBIAAgBIABgBIAAgBIAAgBIAAgBIgBgBIAAgBIAAgBIAAgBIgBgBIAAgBIAAgBIgBgBIgBgBIAAgBIAAgBIgBABIgCABIAAAAIgBABIAAABIAAABIAAABIgBABIgBABIAAABIgBACIgCABIgBABIAAABIAAABIgBABIgCABIAAAAIAAABIgBABIAAABIgBABIAAABIgBABIgCABIgBABIgBAAIgBAAIgBgBIgBgBIAAgBQgBAAAAAAQAAgBAAAAQAAAAABgBQAAAAAAAAIADgEIABgDIACgCIABgCIACgCIABAAIAAgBIABgBIABgBIABgCIAAgBIAAgBIABgBIAAgBIACgCIACgDIABgCIABgBIABgBIABAAIABAAIAAgBIAAgBIABAAIABgBIAAgBIAAgBIABgBIAAgBIAAgBIAAgBIAAgBIAAgBIAAgBIgBgBIAAgBIAAgBIAAgBIAAAAIABgBIAAAAIACgBIABABIABABIAAABIABABIAAABIAAABIABABIABAAIAAABIAAABIAAABIAAABIAAABIAAABIgBABIAAABIgBABIAAABIgBABIAAABIgBABIAAABIAAAAIAAAAIAAABIAAABIAAABIAAACIAAABIAAABIABABIAAABIAAABIAAABIABABIAAABIABABIAAABIABABIAAABIABABIAAABIAAABIAAAAIAAABIAAABIAAABIgBABIAAABIgBABIAAABIgBABIgBABIgBABIAAABIAAABIgBABIAAABIgBABIgBAAIgBAAgAg3gQIgDgBIgBgBIAAgBIgCgBIAAAAIgCgBIgBgBIgBgBIgCgBIgBgBIgBgBIAAAAIgCgBIgBgBIAAAAIgCgBIgCAAIgBgBIAAgBIAAgBIAAgBIAAgBIAAgBIABgBIAAgBIAAgBIABgBIAAgBIAAgBIABAAIABgBIAAgBIAAgBIABgBIAAgBIAAgBIAAgBIAAgBIABgBIAAgBIAAgBIAAgBIABgBIAAgBIAAgBIAAgBIAAgDIAAgCIAAgBIABgBIAAgBIAAgBIAAgBIABgBIAAgBIABgBIAAgBIABAAIAAgBIABgBIACgBIACABIAAABIABABIAAAAIAAABIAAABIAAABIgBABIAAABIAAABIgBABIAAABIgBABIAAABIAAABIAAACIAAACIAAACIAAABIgBABIAAABIgBABIAAABIgBABIAAACIAAABIAAABIAAABIgBABIAAABIgBAAIAAABIgBABIAAABIAAABIAAABIAAABIAAABIAAABIACABIABABIACAAIACACIADACIABABIACABIACABIAAAAIACABIAAABIABABIAAAAIAAABIAAABIgBABIAAABIgCABIgBAAgAAPgwIgCgBIAAAAIgBgBIAAgBIgBgBIAAgBIgBgBIgBgBIAAgBIAAgBIgBgBIgBgBIgBgBIAAAAIgBABIgBABIAAABIAAABIAAABIgBABIAAABIAAABIgBABIAAABIAAAAIgBABIgBABIAAABIgBgBIgBgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAgBIABgBIAAgBIAAgBIABgBIAAgBIAAgBIAAgBIAAgBIAAgBIAAgBIAAAAIAAgBIABgBIAAgBIABgBIABgBIABgCIAAgBIAAgBIgBgCIgBgCIgBgBIAAgBIAAAAIgBgBIAAgBIAAgBIAAgBIAAgBIAAgBIgBgBIAAgBIgBgBIAAgBIAAgBIAAgBIAAgBIABgBIABAAIAAAAIABAAIABABIABABIAAABIABABIAAABIABABIAAABIABABIABABIAAABIAAABIABABIAAABIAAABIABAAIAAABIAAABIABABIAAABIAAABIAAABIABABIABABIAAACIAAACIAAACIAAABIAAABIABABIACABIAAABIABABIABABIAAABIABABIAAABIAAABIABABIAAABIAAABIAAABIAAAAIAAABIgBABIgBABIgCgBg","t":[6.2,8.8],"fc":"#FFFFFF"},"239":{"p":"AAoBIIAAAAIAAgBIgBAAIABAAIAAAAIACAAIAAAAIABgBIABAAIABAAIgBAAIAAABIAAAAIgBAAIgBAAIAAABIgBAAIAAAAIgBAAgAAoBHIAAAAIAAAAgAAuBGIgBAAIAAAAIAAAAIAAAAIAAgBIABAAIAAAAIAAAAIAAABIAAAAIABAAIgBABIAAgBgAAtBFIAAAAIgBgBIgBgBIAAgBIAAgBIAAgBIgBgBIgBgBIAAgBIgBgBIgBgBIAAgBIgBgCIAAAAIAAgBIAAAAIAAAAIAAAAIAAAAIAAAAIgBAAIAAAAIAAAAIABgBIAAAAIgBAAIAAABIAAAAIAAAAIAAAAIAAAAIAAAAIgBABIAAAAIAAAAIAAgBIAAABIAAgBIAAAAIAAAAIAAAAIAAAAIAAgBIAAABIAAAAIAAgBIAAAAIAAAAIAAAAIAAAAIgBAAIAAAAIgBAAIgBABIAAAAIAAAAIgCAAIAAAAIAAgBIAAAAIgBABIAAAAIgBgBIAAAAIAAABIgBAAIAAAAIgBAAIAAAAIAAAAIgBAAIAAAAIgEgBIAAAAIABgEIAAgBIACgDIAAAAIAAgBIAAAAIABgBIAAgBIABgBIAAgBIAAAAIAAAAIAAgBIABgBIAAgBIABgBIAAgBIAAgBIAAAAIAAAAIABgBIAAgBIABgBIAAAAIABgBIAAAAIAAAAIAAAAIABgBIAAAAIAAgBIABAAIAAAAIABAAIAAAAIAAAAIAAAAIAAABIAAAAIABgBIAAAAIAAAAIAAgBIAAABIAAAAIABgBIABAAIAAAAIAAABIAAAAIAAAAIAAAAIAAgBIAAABIAAAAIAAAAIAAAAIAAAAIAAAAIABAAIAAAAIAAAAIAAAAIAAAAIABAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIABAAIAAAAIAAAAIAAAAIAAgBIABABIABgBIAAAAIAAAAIABAAIABAAIAAAAIABAAIAAAAIABAAIAAAAIAAAAIAAAAIABAAIAAABIACAAIAAABIABAAIAAABIABABIABAAIAAABIABAAIAAABIABAAIAAAAIAAAAIABABIABABIAAAAIABABIAAAAIAAABIABAAIAAAAIgBABIABABIAAAAIAAABIAAAAIAAAAIAAABIAAABIAAABIAAAAIAAAAIAAABIAAABIAAABIgBAAIABABIAAAAIAAABIAAAAIAAABIAAABIAAABIAAABIAAAAIAAABIAAABIgBAAIAAABIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIgBAAIABAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIABAAIgBAAIAAABIAAAAIgBABIAAABIgBAAIgBAAIAAAAIgBABIAAABIgBAAIAAABIgCABIgBABIAAAAIgBAAIAAABIAAAAIgBAAIAAABIgBAAIAAAAIAAAAIgBABIAAABIAAAAIAAABIAAAAIgBAAgAA6A4IAAAAIAAAAIAAAAgAA6A4IAAAAIAAAAIAAAAgAA6A4IAAAAgAAkA4IAAAAIAAAAIAAAAgAA6A4IAAAAIAAAAIAAAAgAAmA3IAAAAIAAAAgAAlA3IAAAAIABAAIAAAAIAAAAIgBAAgAAlA3IAAAAIAAAAIAAAAgAAlA3IAAAAIAAAAIAAAAIAAAAgAAlA3IAAAAIAAAAIAAAAgAAkA3IAAAAIAAAAIAAAAIAAAAIAAAAIAAAAgAAlA3IAAAAIAAAAIAAAAgAAlA3IAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAgAAlA3IAAAAIAAAAIAAAAgAAkAcIAAAAIAAAAIAAAAIAAAAIAAAAgAAkAcIAAAAIAAAAIAAAAgAAvAcIAAAAIAAAAIABAAIgBAAgAAvAbIAAABIAAgBgAAvAbIgBAAIAAAAIABAAIAAAAIAAABIAAAAIAAAAIAAAAIAAgBIAAABIAAgBgAAwAcIgBAAIABgBIAAABIAAAAgAAuAbIAAAAIAAAAgAAuAbIAAAAIAAAAgAgnACIABAAIgBAAgAgnACIgBgBIgBAAIgBAAIgBAAIgBAAIAAAAIgBgBIgBAAIgBgBIgCgCIgBgBIgBAAIgBgBIAAAAIAAgBIgBgBIAAgBIAAgBIAAAAIAAAAIAAgBIgBAAIAAgBIAAAAIAAAAIgBgBIAAAAIAAAAIAAgBIAAAAIAAgBIAAgBIAAgBIgDgLIAAAAIAAgBIABgBIAAAAIAAgBIAAAAIAAgBIAAAAIABAAIAAgBIAAgBIAAAAIAAgBIABAAIAAgBIAAgBIAAAAIAAgBIAAAAIABgBIAAAAIAAgBIAAAAIAAgBIAAgBIAAAAIAAAAIABgBIAAAAIAAgBIAAgBIAAgBIAAAAIABgBIAAAAIAAgBIAAAAIAAgBIAAgBIAAAAIAAgBIABAAIAAAAIAAgBIABgBIABgBIAAAAIAAAAIAAAAIAAAAIABAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAgBIABAAIAAAAIABABIABAAIAAAAIABAAIABABIAAAAIACABIABABIAAAAIABABIAAAAIAAABIABAAIAAABIAAAAIAAABIAAABIAAAAIgBABIAAAAIAAABIAAAAIgBABIAAABIAAAAIAAAAIgBABIAAAAIAAAAIAAABIAAAAIABABIAAAAIABABIAAAAIABABIAAAAIADACIAAAAIABABIAAABIAAABIABAAIAAABIAAAAIAAAAIAAABIAAAAIAAABIAAAAIAAABIAAAAIAAAAIAAABIAAABIAAABIAAAAIAAABIAAABIAAAAIAAABIAAAAIAAAAIAAABIAAABIAAABIAAABIgBAAIAAAAIgBAAIAAAAIAAAAIgBgBIAAAAIAAAAIAAAAIgBAAIAAAAIAAAAIAAAAIgBAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIgBAAIgCABIAAAAIABABIAAAAIAAAAIABABIAAAAIAAABIAAABIABABIAAAAIgBAAIABABIAAAAIAAABIAAAAIABAAIAAAAIAAAAIAAABIABAAIAAABIAAABIAAAAIAAABIAAAAIAAABIAAABIAAABIAAABIgBAAIAAAAIAAAAIAAABIgBABIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAABIAAAAIAAAAIgBAAIAAABIAAAAgAAJgVIAAgBIAAAAIgBAAIAAAAIAAAAIAAgBIAAAAIAAAAIAAgBIgCABIAAgBIAAAAIAAAAIAAAAIgBgBIAAgBIgBgBIAAAAIAAAAIAAgBIgBAAIAAgBIgBgBIgBAAIAAAAIgBgBIAAAAIAAgBIAAAAIAAAAIAAAAIAAgBIAAABIAAgBIAAAAIAAABIAAAAIABAAIAAAAIAAAAIABAAIAAABIAAAAIABAAIAAAAIAAAAIAAAAIAAAAIgBAAIAAgBIgBAAIgBAAIAAgBIAAgDIgBgBIgBgCIAAAAIgBgCIgBAAIAAgBIAAgBIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAAAIgBgBIAAgBIAAAAIAAAAIAAgBIAAgBIAAgBIAAAAIABgBIAAAAIAAgBIAAgBIAAgBIgEgJIAAAAIAEgEIAAAAIABAAIABAAIAAAAIAAAAIABAAIAAAAIAAAAIAAAAIAAAAIABAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAgBIAAAAIAAAAIAAAAIAAAAIAAAAIAAABIAAgBIABABIAAgBIAAABIABAAIAAgBIABAAIABABIAAABIAAAAIABABIAAAAIAAAAIAAABIAAABIAAABIAAABIAAABIAAAAIAAABIAAABIAAABIAAAAIAAABIAAABIAAABIAAABIAAABIAAABIAAABIAAAAIgBABIAAABIABABIAAAAIABABIAAABIAAABIAAAAIAAABIAAAAIABABIAAAAIAAABIAAABIAAAAIAAABIAAABIABAAIABABIABAAIABACIABABIABAAIAAABIAAAAIABAAIAAABIAAABIAAAAIAAAAIAAABIAAABIgBABIgBAAIAAAAIAAAAIAAAAIAAAAIAAgBIAAAAIAAgBIAAAAIAAgBIABgBIAAAAQAAAAAAAAQAAAAAAAAQAAAAAAAAQAAAAAAAAIAAgBIAAABIAAgBIAAAAIgBAAIAAAAIAAABIAAABIAAAAIAAAAIAAABIgBAAIAAABIgBAAIAAABIgBABIAAAAIAAABIAAABIACAAIAAAAIAAgBIAAAAIAAAAIABgBIAAAAIAAgBIABABIgBABIAAAAIAAAAIAAABIAAABIAAAAIAAAAIABAAIAAABIgBABIAAABIAAAAIAAABIAAABIgBAAIAAAAIgBABIgBAAgAgBghIAAAAIAAABIAAgBgAgBghIAAAAIAAAAIAAAAgAgBghIAAAAIAAAAIAAgBIAAABIAAAAIABAAIAAAAIgBAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAgAgBghIAAAAIAAAAIAAAAgAgBghIAAAAIAAAAIAAAAgAgBghIAAAAIAAAAIAAAAgAgBghIAAAAIAAAAIAAAAgAgBghIAAAAIAAAAIAAAAIAAAAgAgxg1IAAgBIAAABIAAAAIAAgBIAAAAIAAABIAAgBIAAABIAAAAIAAAAgAgxg1IABAAIAAAAIgBAAgAgwg2IgBAAIABAAIAAABIAAgBgAgwg2IAAABIAAgBgAgxg2IAAAAIAAAAIAAABIAAgBgAgxg2IAAAAIABAAIgBAAIAAAAgAgwg2IAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAgAgwg2IAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAgAgxg2IAAAAIAAAAIAAAAgAgxg2IAAAAIAAAAIAAAAgAgxg2IAAAAgAgwg2IAAAAgAgwg2IAAAAIAAAAIAAAAIAAAAIAAAAg","t":[4.3,8.2],"fc":"#FFFFFF"},"240":{"p":"AATA9IgBAAIAAAAIgBAAIgBgBIgBgBIAAgBIAAgBIgBgBIAAAAIABAAIABABIABAAIABABIABAAIABABIAAABIAAABIABAAIgBAAIAAAAIgBAAgAAMA3IAAgBIAAAAIAAAAIABABIABABIgCgBgAAMA1IgBgBIgBgBIgBgBIgBgBIgBgCIAAgBIAAgBIABAAIAAgBIAAAAIAAAAIAAgBIAAAAIABgBIAAAAIAAgBIAAgBIAAAAIAAAAIABAAIAAgBIAAAAIAAgBIAAAAIAAAAIAAgBIABAAIAAgBIAAgBIAAAAIAAgBIAAAAIABgBIAAgBIAAAAIAAAAIAAAAIAAAAIAAgBIAAAAIAAgBIABAAIAAgBIAAAAIAAgBIgBAAIAAgBIgCAAIAAABIgBgBIAAAAIgCgBIAAAAIgBgBIAAAAIgBAAIgBAAIgBgBIAAAAIAAAAIgBAAIgBAAIAAAAIgBgBIAAgBIAAAAIAAAAIgBgBIABAAIAAgGIAAgCIABgCIABgBIAAAAIAAgBIAAgBIAAgBIABgBIAAgBIAAgBIAAAAIAAgBIABgBIAAgBIABgBIAAgBIAAAAIAAgBIAAAAIABgBIAAgBIAAAAIABAAIABAAIABAAIAAABIABAAIAAABIAAABIAAAAIABABIAAAAIAAAAIAAAAIAAAAIAAABIAAAAIAAABIAAAAIAAABIAAAAIAAABIAAAAIAAABIAAAAIAAABIAAAAIAAABIAAAAIAAABIAAAAIAAAAIABABIACAAIABAAIAAABIABAAIACABIABABIABAAIABABIAAAAIABAAIABAAIAAABIAAAAIAAABIAAAAIAAABIAAAAIgBAAIgBAAIAAAAIAAABIAAAAIAAABIAAAAIAAABIAAAAIAAABIAAAAIAAABIABAAIABAAIABAAIABABIABAAIABAAIAAABIABAAIABAAIABAAIAAAAIABAAIABAAIACABIAAAAIACAAIABAAIABABIABAAIAAABIAAABIABABIAAAAIAAABIAAABIAAAAIABABIAAABIAAABIAAAAIABABIAAABIgBABIAAABIAAAAIABABIAAABIAAABIAAAAIABABIAAABIAAABIAAABIgBABIAAABIAAAAIgBAAIgBAAIAAABIgBgBIAAAAIgBgBIAAAAIAAgBIAAAAIAAgBIAAAAIAAgBIAAAAIgBgBIAAAAIAAgBIAAAAIAAgBIAAAAIAAgBIAAAAIAAgBIAAAAIAAAAIAAAAIgBAAIAAABIgBAAIgBAAIAAABIgBAAIgCAAIgBAAIgBAAIAAABIgBAAIgBAAIgBABIgCABIgBAAIAAAAIgBABIgBAAIAAAAIgBAAIAAAAIgBAAIAAAAIgBABIAAABIAAABIAAABIgBAAIAAABIAAABIgBABIAAAAIAAAAIgBABIAAABIgBAAIAAAAIgBABIgBAAIAAAAIAAABIAAAAIAAgBgAgZAbIgBAAIAAAAIgBgBIgBgCIgDgCIgCgCIgBgCIgBAAIgBgCIgBgBIAAAAIAAgBIAAgBIABgCIAAAAIAAgBIAAgBIAAAAIAAgBIABgBIAAAAIgBgBIAAAAIABgBIAAAAIAAgBIAAgBIAAgBIAAAAIgHgUIABgBIAAgBIAAgBIAAAAIAAgBIABgBIAAgBIAAAAIABgBIAAgBIAAAAIABgBIAAAAIAAgBIAAAAIABgBIAAgBIAAgBIAAAAIAAgBIAAAAIABgBIAAgBIAAgBIAAgBIAAAAIAAgBIABgBIAAAAIAAgCIAAgBIAAgBIAAAAIAAgBIAAgBIABAAIAAgBIAAgBIAAgBIAAAAIABgBIAAgBIAAAAIAAgBIABgBIACgBIABABIAAAAIABABIAAAAIAAAAIAAABIAAAAIAAABIAAAAIgBAAIAAABIAAAAIgBABIAAAAIAAABIAAABIAAABIAAAAIAAABIAAABIAAAAIgBAAIAAABIAAABIAAAAIgBABIAAAAIABABIAAAAIAAABIgBAAIABAAIgBAAIAAAAIAAABIAAAAIAAABIAAAAIAAABIAAAAIAAABIAAAAIABABIACAAIABABIAAAAIABABIABABIACABIABABIABAAIABABIAAAAIABABIABABIAAABIAAAAIAAABIAAABIAAAAIgBABIAAABIAAAAIgBABIAAABIgBABIAAABIAAAAIAAABIgBAAIAAABIABAAIAAAAIACAAIABAAIACABIABgBIABABIAAAAIAEAAIAAAAIAAABIAAABIAAABIgBABIABABIAAAAIgBABIAAABIgBACIAAABIAAABIACAAIgEAAIAAAAIgBAAIAAAAIAAAAIAAABIgBAAIgCABIAAAAIAAABIgBAAIgBAAIAAABIAAAAIAAAAIgBAAIAAAAIAAAAIAAABIAAAAIAAABIAAABIAAABIgBAAIABABIAAABIgBABIAAABIgBABIAAABIAAAAIAAAAIAAABIgBABIAAAAIAAABIgBABIAAABIABABIABABIABAAIAAABIABABIAAABIAAABIABABIAAAAIgBABIgBAAIgBAAIgBAAgAAVATIAAAAIAAAAgAAWAQIAAAAIAAAAgAgBAKIgBAAIgBgBIgBAAIABAAIAAgBIABgBIAAgBIAAgBIAAAAIAAABIACABIAAABIAAABIAAAAIAAABIgBAAgAgGAJIgBgBIAAAAIAAgBIAAgBIgBAAIAAAAIAAgBIAAAAIgBgBIAAAAIAAgBIgBAAIAAAAIAAgBIAAAAIAAgBIAAAAIAAgBIAAABIABABIABABIACACIACADIAAABIAAAAIAAAAIgBAAIgBAAgAAQAHIgBgBIAAAAIgBgBIAAAAIgBgBIAAAAIAAgBIAAgBIAAAAIgBgBIAAAAIgBgBIAAAAIABAAIAAAAIAAAAIAAAAIAAAAIAAgBIAAgBIgBgBIAAgBIAAAAIABgBIAAAAIAAgBIAAAAIAAAAIABAAIAAAAIAAAAIAAgBIAAgBIAAAAIAAgBIgBAAIgBgBIgBAAIAAAAIgBABIAAAAIgBABIAAAAIAAABIgBAAIAAABIgBABIAAABIgBgBIgBAAIgBAAIgBAAIgCAAIAAgBIAAABIAAAAIgBAAIgBAAIAAAAIgCAAIAAAAIAAAAIgBABIAAAAIAAAAIAAgBIAAgBIAAAAIgBgBIAAgBIAAgBIgBAAIgBgBIgBAAIgCgBIAAAAIABgBIAAgBIAAAAIAAgBIAAgBIABgBIAAAAIAAgCIABAAIAAgBIgJgTIABAAIADgGIAAgBIABgBIABAAIAAAAIAAgBIAAAAIABgBIAAgBIAAAAIAAgBIABAAIAAgBIAAAAIAAgBIAAAAIABgBIAAgBIAAgBIAAAAIAAgBIAAAAIABgBIAAAAIAAgBIABAAIAAgBIAAAAIABAAIAAgBIABAAIABAAIABAAIABABIAAABIAAAAIAAABIABABIAAABIgBABIAAABIAAABIgBAAIAAABIAAABIAAABIAAAAIAAACIAAACIAAABIAAABIgBABIAAABIAAABIAAABIgBAAIAAACIAAABIAAABIABABIgBAAIAAABIAAABIAAABIAAAAIAAABIAAABIAAABIAAABIAAAAIAAABIABABIABAAIACABIAAABIABACIABABIABABIABAAIABABIABAAIAAABIABABIAAAAIAAABIAAABIgBABIgBABIgBAAIAAABIAAAAIgBABIAAABIAAABIAAAAIAAAAIgBAAIAAABIgBABIABgBIAAAAIABgBIABAAIABAAIABgBIACAAIABgBIABAAIACAAIACgBIABAAIABAAIAAABIAAAAIAAABIABAAIAAABIAAABIAAABIAAAAIAAABIAAABIAAABIABAAIAAABIAAABIAAAAIAAABIAAAAIAAAAIAAAAIABABIAAAAIAAABIAAABIAAABIAAABIAAABIgBAAIAAABIgBAAIgBAAIAAAAgAgEAEIgBgBIgCgBIAAgBIAAAAIAAgBIAAAAIABAAIAAAAIAAAAIAAAAIAAgBIABAAIAAgBIAAAAIAAgBIAAAAIAAgBIAAAAIAAAAIAAABIAAABIAAABIABAAIAAABIAAAAIAAAAIAAAAIABABIAAABIAAABIAAAAIABABIAAABIgCgBgAgLAAIAAAAIAAAAIAAAAIABAAIAAAAIAAAAIgBAAg","t":[2.7,7.4],"fc":"#FFFFFF"},"241":{"p":"AgHA0IgCAAIgBgBQgCgEgDgCIgGgGIgBgCIAAgBIABgCIABgCIABAAIAAgBIAAgBIABgBIAAgCIABgBIAAgBIAAgBIABAAIABgBIAAgBIAAgBIAAgBIABgBIAAgBIAAgBIABgBIAAgBIAAgBIABAAIAAgBIABgBIAAgBIABgCIAAAAIAAgBIABgBIAAgBIAAgBIAAgBIABgBIAAAAIABgBIgCgCIgBAAIgCAAIgBAAIAAgBIgCgBIgBAAIgBgBIAAAAIgCgBIgBgBIgBgBIgBgBIgCAAIgBgBIAAgBIAAgBIAAAAIAAgBIAAgBIABgBIAAgBIAAgCIABgBIAAgBIAAgBIABAAIAAgBIAAgBIABgBIAAgBIABgBIAAgBIAAgBIAAgBIAAgBIABgBIAAAAIAAgBIAAgBIABgBIAAgCIAAgBIAAgDIAAgCIAAAAIABgBIAAgCIAAgBIAAgBIABgBIAAgBIABAAIAAgBIABgBIAAgBIABgBIACgBIABABIABABIABABIAAABIAAABIAAAAIAAABIgBABIAAABIgBABIgBACIAAAAIAAABIgBABIAAABIAAACIAAACIAAADIAAABIAAABIgBAAIAAABIAAABIgBABIAAACIAAABIAAABIAAABIgBABIAAABIgBAAIAAABIgBABIAAABIAAACIAAABIAAABIAAABIAAAAIACABIABABIACAAIACACIADADIABABIACABIABAAIABAAIABABIABABIAAAAIAAAAIAAAAIAAACIAAABIgBABIgBAAIAAABIAAABIgBABIAAABIAAABIAAAAIgBACIAAABIAAABIABgBIAAAAIAHgBIACAAIALAAIABAAIABABIABABIAAABIABAAIAAABIAAABIABABIAAABIAAACIAAABIAAABIABAAIABABIAAABIAAABIAAABIAAABIABABIAAABIAAABIABABIAAABIAAAAIAAABIAAABIAAABIgBABIgBAAIgBAAIgCAAIgBgBIAAgBIgBgBIAAgBIgBAAIAAgBIAAgBIAAgBIAAgCIgBgBIAAgBIgBgBIAAAAIAAgBIAAgBIgBgBIAAgBIAAgBIAAgBIAAgBIgJAAIgBAAIgBAAIgEABIAAABIgBAAIgCABIgBAAIgBAAIgCAAIAAAAIgBABIAAABIgBABIAAABIAAAAIAAABIAAABIgBABIAAACIgBABIAAABIgBABIAAAAIgBABIAAABIAAABIgBABIABACIADADIADABIABACIACAEIABABIAAABIgBABIgBABIgBAAIgBAAg","t":[1,6.6],"fc":"#FFFFFF"},"242":{"p":"AAGA1IgBAAIAAAAIAAAAIgBAAIAAAAIgBgBIgBAAIgCgDIAAgBIAAgBIAAAAIgBgBIAAgBIAAgBIgCgCIAAgBIAAgBIAAgBIAAAAIAAAAIAAgBIAAAAIAAgBIABgCIAAAAIAAAAIAAgBIAAgBIAAAAIAAgBIABgBIAAgBIAAgBIAAgBIABAAIAAgBIAAAAIAAgBIAAAAIAAAAIAAgBIAAAAIAAgBIAAgBIAAAAIgBgBIAAAAIAAgBIAAAAIAAgBIAAAAIgBAAIAAgBIAAAAIAAgBIAAgBIAAAAIAAgBIAAAAIAAgBIAAAAIAAgBIgBgBIAAAAIAAAAIABgBIgBAAIABAAIAAAAIAAAAIAAAAIAAAAIAAgBIgBAAIAAAAIgBAAIAAAAIgBAAIgBAAIAAgBIgBABIAAgBIgBAAIgBgBIAAAAIgCAAIAAAAIgBgBIgBAAIAAAAIAAgBIgBAAIAAAAIAAgBIgBAAIgBAAIAAgBIAAgBIAAAAIAAgBIAAAAIAAgBIgCgOIAAgBIAAgBIABAAIAAgBIAAgBIAAgBIAAAAIABgBIAAAAIAAgBIAAAAIAAgBIAAAAIABgBIAAgBIABAAIAAgBIAAgBIAAAAIABgBIAAgBIAAgBIAAAAIABgBIAAgBIAAAAIAAgBIAAAAIAAgBIAAgBIABgBIAAgBIABgBIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAAAIAAgBIAAAAIABgBIAAAAIAAgBIAAgBIAAAAIAAgBIAAAAIABgBIAAAAIAAgBIAAAAIABgBIAAAAIAAgBIABAAIAAAAIAAgBIABgCIACAAIABAAIABAAIAAABIABAAIAAABIAAABIAAABIAAAAIAAABIAAABIAAAAIAAAAIgBABIAAABIAAAAIgBABIAAAAIAAABIgBABIAAABIAAAAIAAABIAAABIAAAAIAAABIgBABIAAABIABABIAAAAIAAAAIAAAAIAAABIABABIAAAAIAAABIAAAAIABABIAAAAIAAABIAAABIABAAIAAABIAAABIAAAAIAAABIAAAAIAAABIAAAAIAAABIAAAAIAAABIAAAAIAAABIAAAAIAAABIAAAAIAAABIABABIABABIABAAIABABIABABIABABIAAABIABABIAAAAIABABIAAAAIABABIAAAAIABAAIABABIAAAAIABABIABABIAAAAIAAABIAAAAIABABIAAABIgBABIAAAAIAAABIAAAAIgBAAIAAABIgBAAIgBAAIAAABIgBAAIAAAAIAAAAIgBAAIAAAAIAAAAIAAAAIAAAAIAAAAIgBAAIAAAAIABAAIAAAAIAAAAIAAAAIAAAAIABAAIAAAAIAAAAIAAAAIAAAAIABAAIABAAIAAAAIABgBIAAAAIABgBIAAAAIAAgBIAAAAIABAAIABAAIAAAAIABAAIABAAIABABIAAAAIAAABIABABIAAAAIAAAAIAAAAIAAAAIAAABIAAABIAAABIgBAAIABABIAAAAIAAABIgBAAIAAABIAAABIABABIAAAAIAAABIAAAAIAAABIAAAAIAAABIAAAAIAAABIAAAAIAAABIAAAAIAAABIAAABIAAAAIgBABIAAAAIgBABIAAAAIAAAAIgCAAIgBAAIAAAAIgBgBIAAAAIAAAAIAAgBIAAAAIAAgBIAAAAIAAgBIAAAAIAAgBIAAAAIAAAAIAAgBIAAAAIAAgBIAAAAIAAAAIAAAAIABAAIAAAAIAAAAIAAAAIgBAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAABIgBAAIgBAAIgBABIAAAAIgCAAIAAAAIgBAAIAAABIAAAAIgBAAIgBABIAAAAIgBAAIgBABIAAAAIgBABIAAAAIgBABIAAABIgBAAIAAABIAAAAIAAABIAAAAIAAAAIgBAAIABABIAAAAIAAABIAAABIAAAAIAAABIAAABIAAAAIAAAAIAAABIAAAAIAAABIAAAAIAAABIAAABIABAAIAAAAIAAABIAAAAIAAABIABABIAAABIAAAAIAAABIAAABIABACIABABIAAABIABABIABABIABABIAAABIAAABIABABIABABIAAABIAAABIAAABIAAABIAAAAIAAABIAAAAIgBABIAAAAIAAABIgBAAIgBAAIAAAAgAgDANIAAAAIAAAAg","t":[0.5,8.4],"fc":"#FFFFFF"},"243":{"p":"AAMA3IgCAAIgBgCIgBgBIAAgBIgBgBIAAgBIAAAAIgBgCIAAgBIAAgBIAAgBIAAgBIgBgBIAAAAIAAgBIAAAAIAAgBIAAgCIABAAIAAgBIAAAAIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAgBIAAgBIAAgBIAAAAIAAgBIAAAAIAAAAIgBgBIAAAAIAAgBIgBAAIAAAAIgBgBIgBAAIgBgBIAAAAIAAAAIgBgBIAAAAIAAAAIAAgBIAAAAIAAgBIgBAAIAAAAIAAgBIAAAAIAAAAIgBAAIgBAAIgBgBIAAAAIAAABIAAAAIAAAAIAAAAIAAAAIAAAAIgBAAIAAAAIAAABIgBABIAAAAIgBAAIAAAAIAAABIgBAAIgBABIAAgBIgBAAIgBAAIAAAAIgBAAIgBAAIAAAAIgBgBIAAgBIAAAAIAAgBIgBAAIAAAAIAAgBIAAgBIAAAAIAAgBIAAAAIAAAAIgEgfIAAgBIAAgBIAAAAIAAgBIABgBIAAgBIABAAIAAAAIAAgBIAAAAIAAgBIAAAAIAAAAIABgBIAAgBIABgBIAAgBIAAgBIABAAIABgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAAAIABAAIAAgBIAAgBIAAAAIAAgBIABgBIAAgBIAAgBIAAgBIABgBIAAAAIAAgBIAAgBIAAAAIAAAAIABgBIAAgBIAAAAIAAgBIABgBIAAAAIAAgBIAAAAIAAgBIAAAAIAAgBIABAAIAAgBIAAAAIAAAAIAAAAIABgBIAAgBIABgCIACgBIAAAAIACAAIAAABIABAAIAAAAIAAABIAAABIAAABIAAAAIAAABIAAABIAAAAIAAABIgBABIAAAAIAAABIgBAAIAAABIAAABIAAABIgBAAIAAABIAAABIAAAAIAAAAIAAABIAAABIAAABIABAAIAAAAIAAAAIABAAIABAAIAAABIAAAAIAAAAIABAAIABAAIABABIAAAAIABAAIACABIABAAIABAAIAAAAIAAABIAAAAIABAAIAAABIABAAIAAABIAAAAIAAABIABAAIAAABIAAABIAAAAIABABIABABIAAABIABABIAAABIABABIAAAAIABABIAAABIAAAAIABABIAAAAIAAABIAAAAIABABIAAAAIABABIAAABIABAAIAAABIAAAAIABABIAAABIgBABIAAABIAAABIAAAAIgBAAIgBABIgBAAIgBAAIgBAAIAAgBIAAAAIAAAAIAAAAIgBgBIAAAAIAAAAIAAAAIgBAAIAAgBIABgBIAAAAIgBAAIAAgBIAAAAIAAgBIAAAAIABgBIAAgBIAAAAIAAgBIAAgBIABAAIgBgBIABAAIgBAAIgDAAIAAAAIAAAAIgBAAIAAABIAAAAIgBAAIAAABIAAAAIgBABIAAAAIAAABIgBAAIAAAAIAAABIgBAAIAAABIAAAAIAAAAIgBAAIAAABIAAABIAAABIAAAAIAAABIAAAAIAAABIAAAAIAAAAIAAABIAAAAIAAABIAAAAIAAABIgBAAIAAABIAAAAIgBABIAAABIAAABIgBAAIAAAAIgBABIgBAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIABAAIAAAAIAAAAIABAAIABAAIAAAAIAAAAIAAAAIAAAAIABABIAAAAIABAAIAAAAIAAABIAAAAIAAABIAAAAIAAABIgBABIAAAAIgBABIgBAAIAAABIAAAAIAAAAIgBABIAAAAIgBABIAAABIAAAAIAAABIAAABIgBABIAAAAIAAABIAAABIAAACIgBAAIAAABIAAABIgBAAIABAAIAAAAIACABIAAAAIAAAAIAAABIAAAAIABABIAAAAIAAAAIABABIAAAAIACABIABAAIAAAAIABABIABAAIAAAAIABABIAAABIABAAIAAAAIABABIABABIAAABIABABIAAABIAAACIABABIAAABIAAACIABACIAAABIAAABIAAABIABABIAAAAIAAABIABABIAAABIAAABIAAABIAAABIAAAAIAAABIAAABIgBAAIAAABIAAABIAAAAIgBABIAAAAIAAAAIgBAAIAAAAIgBAAIAAAAgAgEAUIAAAAIAAAAIAAAAIAAAAgAgEAUIAAAAIAAAAIAAAAIAAAAg","t":[0.7,10.2],"fc":"#FFFFFF"},"244":{"p":"AAPA5IAAgBIAAgBIgBgBIAAAAIAAgBIAAgBIAAgCIAAgBIAAgBIAAgBIAAgBIgBgBIAAAAIgBgBIAAgBIAAgEIAAgCIAAAAIAAgDIAAgCIAAgCIAAAAIgDgBIAAgBIgDAAIgBgBIAAAAIgDAAIgCAAIAAgBIgBAAIgBgBIAAAAIgFAAIgBAAIgBABIAAAAIAAABIAAABIgBABIAAABIAAABIAAABIAAABIgBABIAAABIAAABIAAABIgBAAIgCABIgCgBIgBAAIAAgBIAAgBIAAgBIAAgCIAAgBIABgBIAAgBIAAgBIAAgBIAAAAIAAgCIACAAIAAgDIAAgDIAAgCIAAgCIAAgBIAAgBIAAgBIABgBIAAgBIAAgCIAAgBIAAgBIABgCIAAgBIAAgBIAAAAIAAgBIABgBIAAAAIAAAAIAAAAIgBgBQgBgEgEgCIgGgHIAAgCIAAAAIABgCIABgDIAAAAIAAgBIAAgBIABgBIAAgBIABgBIAAgBIAAgBIABAAIABgCIAAgBIAAgBIAAgBIABAAIAAgBIAAgBIACgBIAAgBIAAgBIAAgBIABgBIAAgBIABgBIAAgBIAAAAIAAgBIABgBIAAgBIAAgCIAAgBIABgBIAAAAIABgBIAAAAIADgGIACAAIAAABIACABIAAABIABABIAAAAIAAABIAAABIgBABIAAABIgBAAIAAABIgBACIAAABIgBABIAAABIAAAAIAAABIgBABIAAABIABgBIABAAIAHgBIABAAIALAAIABAAIABABIABABIAAABIACABIAAABIAAABIAAABIAAABIABABIAAABIAAABIAAAAIABABIAAACIAAABIAAABIABABIAAAAIAAABIAAABIABABIAAABIAAABIAAABIAAABIAAABIgBABIAAAAIgBAAIgCAAIgCgBIAAgBIgBgBIAAgCIgBAAIAAgBIAAgBIAAgBIAAgBIgBgBIAAgBIAAgBIAAAAIAAgCIgBgBIAAgBIAAgBIAAAAIAAgBIgBgBIgIAAIgBAAIgBAAIgEABIgBABIgBAAIgBAAIgBAAIgCAAIgCAAIAAAAIgBABIAAABIgBABIAAACIAAAAIAAABIAAABIAAABIgBABIgBABIAAABIAAABIAAAAIgBACIgBABIAAABIgBABIABABIADADIADACIABACIABACIAAAAIACAAIABABIABABIAAABIAAABIAAABIAAABIgBAAIAAAAIgBABIAAABIAAAAIAAABIgBABIAAACIAAABIAAABIgBABIgBABIAAAAIAAABIAAACIAAACIAAABIAAABIgBABIAAAAIAHAAIABAAIABABIACABIABAAIADABIAEABIADABIACABIABAAIABABIABABIAAABIAAADIAAADIAAADIAAADIAAABIAAABIAAABIACABIAAABIAAABIAAABIAAABIAAABIAAABIAAABIABABIAAACIAAABIAAABIgBABIAAAAIgBABIgBAAIgBABIgCgBg","t":[1.2,12.1],"fc":"#FFFFFF"},"245":{"p":"AAIAyIgBAAIAAgBIgBgBIAAAAIAAgBIgBAAIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAAAIgBgBIAAAAIAAgBIAAgBIAAAAIAAgBIAAAAIAAAAIAAgBIAAgBIAAgBIgBgBIAAAAIgBAAIgBgBIgBAAIAAAAIAAAAIgDgBIgCAAIAAgBIAAAAIgBAAIgBgBIAAAAIgBAAIgCgBIAAAAIgBAAIAAAAIAAABIAAAAIgBABIAAAAIAAAAIAAABIAAAAIAAABIgBABIAAABIAAAAIAAAAIgBAAIgCAAIAAgBIAAgBIAAgBIAAAAIAAgCIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIABgBIAAAAIAAgCIABgCIAAgBIAAAAIAAgCIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAgBIAAAAIAAgBIABgBIAAgBIABgBIAAgBIAAAAIAAgBIABgBIAAgBIAAgBIAAAAIgBgBIAAgBIgBAAIgCgCIAAgBIgBgBIgEgDIAAgBIAAgBIgBgCIABgCIABgBIAAAAIAAgBIAAgBIABgBIAAAAIAAgBIAAgBIABgBIABAAIABgBIAAAAIAAgBIABAAIAAgBIAAAAIABgBIAAAAIABAAIAAgBIAAAAIAAAAIABgBIAAAAIAAgBIABgBIAAAAIABAAIAAAAIgDAFIgBABIADAFIAAAAIABABIAAABIAEAEIABABIACADIABABIAAAAIAAABIAAABIgBABIAAAAIAAABIAAAAIAAABIAAABIgBAAIAAAAIABABIAAABIgBABIAAAAIAAABIAAABIAAABIAAACIAAABIAAABIAAACIgBAAIAAABIAAAAIAAABIAAABIAAAAIgBABIABABIAAABIAAABIAAABIAAAAIAAABIACAAIABAAIAAgBIABAAIAAgBIAAgBIAAAAIAAgBIAAgBIAAAAIAAAAIAAAAIAAABIAAAAIABABIAAAAIAAABIAAAAIAAABIAAAAIgBABIAAgBIAAABIAAAAIAAABIAAAAIAAABIAAAAIAAABIAAAAIAAAAIAAAAIAAABIAAgBIAAABIAAAAIAAABIAAABIgBABIAAABIAAAAIAAABIABgBIABgBIABAAIAAAAIACAAIABAAIABAAIACAAIAAAAIADAAIAAAAIABAAIABABIABAAIABAAIAAABIAAAAIAAADIgBABIAAABIgBABIAAAAIAAACIAAABIAAABIAAAAIAAAAIAAABIAAAAIAAABIAAABIAAAAIAAABIAAAAIAAABIAAABIgBAAIAAABIAAAAIAAABIAAABIAAAAIgBABIAAAAIgBAAIgCAAgAASAjIAAgBIAAAAIgBgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAAAIgBgBIAAAAIAAgBIAAgCIAAgBIAAgBIAAgBIgBgCIAAgBIAAAAIgCgBIAAAAIgCAAIgBgBIAAAAIgCAAIgCgBIAAAAIgBAAIgBgBIAAAAIgDAAIgBAAIAAAAIAAABIAAAAIAAABIAAABIAAAAIAAAAIAAgCIgBgBIAAAAIgCgCIAAgBIAAgBIAAAAIAAgBIAAgBIABAAIAAgBIAAAAIAAgBIABgBIAAgBIAAAAIAAgBIAAAAIAAgBIABAAIAAgBIAAAAIAAAAIAAgBIAAgBIAAgBIAAgBIAAAAIABAAIAAAAIABAAIAAgBIABAAIAAAAIAAAAIAAAAIAAABIAAAAIAAABIAAAAIgBABIAAABIAAAAIAAABIAAAAIAAAAIgBABIAAAAIAAABIAAABIAAABIAAABIAAABIAAAAIAAABIACAAIACAAIABAAIACABIABAAIABABIACAAIADABIABABIACAAIABABIABAAIAAABIAAABIAAACIAAACIAAACIAAACIAAABIAAABIAAAAIABABIAAAAIAAACIAAAAIAAABIAAABIAAAAIAAABIABAAIAAACIAAAAIAAABIgBABIAAAAIAAABIgBAAIAAAAIgCAAgAgMAhIAAABIAAgBgAAQAAIAAgBIAAAAIAAgBIgBAAIAAgBIAAAAIAAgBIABAAIAAgBIAAgBIgBAAIAAgBIABABIAAABIABAAIAAABIABAAIAAABIAAABIAAABIAAAAIAAABIAAAAIgBAAIgBAAgAAEgGIAAAAIAAgBIAAgBIAAAAIgBgBIAAgBIgBAAIgBgCIgBgBIAAgBIgCgCIAAgCIAAgBIAAAAIAAAAIACAAIAAAAIABAAIAAAAIABABIAFAAIACAAIABABIAAABIABAAIABABIAAAAIAAABIAAABIAAAAIABABIAAAAIAAABIABABIAAAAIgBAAIgCABIgCAAIgBABIAAAAIgCAAIgCACIAAAAIgBABIABgBgAAPgHIAAAAIAAgBIAAgBIAAgBIgBAAIABAAIAAAAIAAABIAAAAIAAABIAAAAIABABIgBAAIAAAAIAAAAgAgCgTIgCgBIgCAAIAAAAIAAAAIAAgBIAAgBIABAAIAAgBIAAAAIAAAAIAAgBIAAAAIAAgBIABgBIAAgBIAAAAIAAgBIABAAIAAgBIABgBIAAAAIAAgBIAAgBIgBgBIAAAAIgBgBIgBAAIAAAAIAAgBIABAAIAAgBIAAAAIAAgBIABgBIAAAAIAAgBIABgBIAAAAIAAgBIAAAAIAAgBIAAgBIABAAIAAgBIAAAAIABgBIAAgEIABAAIAAABIABAAIABABIAAAAIAAABIAAAAIAAABIAAABIgBAAIgBABIAAAAIAAABIAAABIgBAAIAAABIAAAAIAAABIAAABIAAAAIABAAIAAAAIADAAIADgBIACABIACAAIAFAAIABAAIABABIAAABIAAAAIABABIAAABIAAAAIAAABIAAABIABAAIAAABIAAABIAAAAIABAAIAAABIAAABIAAAAIAAABIAAABIAAABIABAAIAAABIAAAAIAAABIAAABIAAAAIAAABIAAAAIgBABIAAAAIgCgBIAAAAIAAgBIgBgBIAAAAIgBgBIAAAAIAAgBIAAgBIAAAAIAAgBIgBgBIAAAAIAAgBIAAAAIAAgBIgBgBIAAAAIAAgBIAAgBIAAAAIgEAAIgCAAIAAAAIgBABIgDAAIgBABIgBAAIgBABIAAAAIgBAAIgBAAIAAAAIAAABIAAABIAAABIAAAAIAAABIAAAAIAAABIAAABIgBABIAAAAIAAABIAAABIAAAAIgBABIAAABIAAAAgAgJgcIAAAAIAAgBIAAAAIAAABIAAAAgAgJgdIAAgBIABAAIAAgBIAAAAIABAAIAAgBIABgBIABgBIAAAAIAAABIgBAAIAAABIgBABIgBABIgBABIAAAAg","t":[1.2,11.8],"fc":"#FFFFFF"},"246":{"p":"AAAAqIAAAAIgBAAIAAAAIgBgBIAAABIAAgBIAAAAIAAAAIAAAAIAAgBIAAAAIgBABIAAgBIAAAAIAAAAIgBAAIAAABIAAgBIAAAAIAAABIAAgBIAAAAIgBAAIAAAAIAAABIgBAAIgCAAIAAAAIgBAAIgBgBIgCgBIgBAAIAAgBIAAAAIgBAAIAAgBIAAAAIgBgBIAAAAIgBAAIAAgBIABAAIAAAAIAAAAIgBAAIAAgBIAAABIAAgBIgBgBIAAAAIAAAAIAAAAIAAgBIAAgBIAAgCIAAAAIAAgBIAAAAIAAAAIAAgCIABgBIAAAAIAAgCIAAgBIAAgBIAAgBIABAAIAAgCIAAAAIAAAAIAAgBIAAgBIAAAAIAAgBIAAgBIAAAAIAAgBIAAgBIAAAAIABgBIAAgBIAAAAIAAgBIABgBIAAgBIAAAAIAAgBIgBAAIABgCIgBgBIAAgCIgBAAIgBgBIgCgBIAAAAIAAAAIgDgEIABgCIABgBIABAAIAAAAIAAgBIAAAAIAAgBIAAAAIAAAAIAAgBIACgBIABAAIAAAAIABAAIAAAAIABAAIAAAAIAAAAIABAAIAAAAIAAAAIABAAIAAAAIABABIAAgBIAAAAIABAAIAAAAIABAAIAAAAIAAABIAAgBIAAAAIABABIAAgBIAAABIAAgBIAAAAIABAAIgBABIABgBIAAAAIAAABIAAAAIABAAIAAAAIAAABIAAABIAAAAIAAABIAAABIgBAAIAAABIAAAAIgBABIAAAAIAAABIAAABIAAAAIAAABIAAAAIAAAAIAAAAIAAAAIgBABIAAABIAAAAIAAAAIAAAAIAAAAIABAAIABAAIABABIAAABIABABIAAAAIAAABIAEAAIAAAAIABAAIAAABIABAAIABAAIAAAAIAAABIAAAAIAAAAIABABIAAAAIABAAIABABIAAAAIAAABIAAAAIABABIAAAAIABABIAAAAIABAAIAAABIABAAIABABIAAAAIAAAAIAAABIAAAAIABAAIAAAAIgBAAIABABIAAAAIAAgBIAAAAIAAAAIAAAAIAAAAIABgBIABAAIAAAAIAAAAIAAAAIABgBIAAABIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAABIgBAAIgBABIgBABIAAABIgBABIAAAAIgCACIAAAAIAAABIAAAAIAAABIAAAAIgBAAIABABIgBAAIAAABIAAAAIAAABIgBABIAAABIAAABIAAAAIAAABIAAAAIAAABIAAABIAAAAIAAABIAAAAIAAABIAAABIAAAAIAAABIAAAAIAAABIAAAAIgBABIgBAAIAAAAIgBACIgBAAIAAAAIAAABIAAAAIAAAAIAAAAIAAAAIgBAAIAAABIAAAAIAAAAIAAABIgBAAIAAAAIgBAAIAAAAgAAGAqIAAAAIABAAIgBAAgAAGAqIAAAAIAAAAIAAAAgAAGAqIAAgBIAAABIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAgAAGAqIAAgBIAAABIAAAAgAAGApIAAABIAAgBgAAGApIAAAAIgBAAIAAgBIAAABIAAAAIAAAAIAAAAIAAAAIAAgBIAAAAIAAAAIgBAAIAAAAIAAAAIAAgBIABAAIAAAAIAAAAIABAAIAAgBIAAAAIAAAAIAAAAIABACIgBAAIABABIgBAAIAAAAgAgCApIAAAAIAAAAgAAFApIAAAAgAAFApIAAAAIAAAAgAADAoIAAAAIAAABIAAgBgAADAoIAAAAIAAAAIAAAAgAADAoIAAAAIAAgBIABABIAAAAIgBAAIAAAAgAAEAoIAAAAIAAAAIAAAAIABAAIgBAAgAAEAoIAAAAIAAAAIAAAAgAAGAmIAAgBIAAAAIABgBIAAABIAAgCIABgBIABAAIABAAIAAAAIAAAAIAAAAIABAAIAAAAIgBAAIAAABIgBABIgBAAIAAAAIAAAAIgBABIAAABIAAAAIgBAAgAgQAkIAAAAIAAAAgAgQAkIAAAAIAAAAgAgQAkIAAgBIAAAAIAAAAIAAAAIAAABIAAAAgAgQAjIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAABIAAgBgAgQAjIAAAAIAAAAgAgQAjIABAAIgBAAgAALAiIAAAAIAAAAIAAAAgAAPANIAAAAIAAAAIAAAAgAATAMIAAAAIAAAAIAAgBIAAAAIAAAAIAAgBIAAAAIAAgBIAAAAIAAAAIAAgBIAAAAIgBAAIAAgBIAAgBIAAAAIAAAAIAAgBIgBAAIAAgBIAAAAIgBAAIAAAAIgBgBIgBAAIgBAAIgBAAIAAAAIgBgBIAAAAIgBAAIAAAAIgBgBIAAAAIgBAAIAAABIAAAAIAAAAIAAABIAAAAIgBgBIAAAAIAAABIAAAAIAAAAIAAABIAAAAIgBAAIAAAAIgBAAIAAAAIAAAAIAAgBIAAAAIAAgBIAAgBIAAAAIAAgBIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAgBIAAgCIAAgBIAAAAIAAAAIAAgBIAAAAIAAgBIAAgCIAAAAIAAAAIAAgBIABAAIAAAAIAAAAIAAgBIAAAAIAAgBIAAAAIAAAAIgBgBIgCgCIAAgBIgCgCIAAAAIAAgBIAAAAIgEgJIABgBIACgDIAAAAIAAgBIABgBIAAAAIABAAIABgBIAAAAIAAAAIAAgBIAAAAIAAAAIAAgBIABAAIAAAAIAAAAIAAgBIAAAAIAAAAIAAgBIAAAAIABAAIAAgBIAAAAIABgCIAAAAIABAAIAAABIAAAAIABAAIAAAAIAAABIAAAAIgBAAIAAABIAAAAIAAAAIAAABIgBAAIAAAAIAAABIAAAAIAAAAIAAAAIAAABIABAAIAAAAIACAAIACAAIABABIABAAIADAAIAAAAIABABIAAAAIAAAAIAAABIAAAAIAAAAIAAABIAAAAIABAAIAAABIAAAAIAAAAIAAABIAAAAIAAAAIAAABIAAAAIAAAAIAAABIABAAIAAAAIAAAAIAAABIAAAAIAAAAIAAABIAAAAIAAAAIAAAAIgBAAIAAAAIAAgBIgBAAIAAAAIAAAAIAAgBIAAAAIAAAAIAAgBIAAAAIAAAAIgBgBIAAAAIAAAAIAAAAIAAgBIAAAAIAAAAIAAgBIAAAAIgCABIgBAAIAAAAIgBAAIgBABIgBABIAAAAIAAAAIgBAAIAAABIAAAAIAAAAIgBABIAAAAIAAABIAAAAIAAAAIAAABIAAAAIAAAAIAAABIgBABIAAAAIAAABIAAAAIABABIAAAAIAAABIgBAAIABABIABABIAAABIABABIAAABIABABIAAAAIAAAAIAAAAIAAABIAAAAIAAAAIAAABIAAAAIAAABIAAAAIAAAAIAAABIAAAAIAAAAIAAABIAAAAIAAAAIAAABIAAABIAAAAIAAABIAAABIgBAAIAAABIAAAAIAAAAIACAAIABABIAAAAIACABIAAAAIAAAAIACAAIABABIABAAIABAAIAAAAIABAAIAAAAIAAAAIAAABIAAACIAAABIAAACIAAAAIAAAAIAAABIAAAAIAAAAIAAABIAAAAIAAAAIAAABIAAAAIAAAAIABABIAAAAIAAABIAAAAIgBAAIAAABIAAAAIAAAAIAAAAIgBAAIgBAAIAAAAg","t":[1.4,11.5],"fc":"#FFFFFF"},"247":{"p":"AAMAyIgBgBIAAgBIAAgBIAAgBIgBgBIAAgBIAAgBIAAgBIAAgBIAAgBIAAgBIAAgBIgBgBIAAgBIAAgBIAAgDIAAgCIAAAAIAAgEIAAgBIAAgCIgBAAIgCgBIAAgBIgDAAIgBgBIgBAAIgBgBIgCAAIAAgBIgCAAIgBgBIgBAAIgEAAIgBAAIgBABIAAAAIAAABIAAACIgBABIAAABIAAABIAAABIAAAAIgBABIAAABIAAABIgBABIgBABIgBABIgCgBIgBgBIAAgBIAAgBIAAgBIAAgBIAAgBIABgBIAAgBIAAgBIAAgCIAAAAIAAgCIABAAIAAgCIAAgDIAAgDIAAgCIAAAAIABgBIAAgBIAAgBIAAgCIAAgCIAAAAIABAAIAAgBIABgBIAAgBIAAAAIAAgBIABgCIAAgBIAAgBIAAAAIgBgBQgCgEgDgCIAAgBIAAAAIADgFIACACIADABIABACIABADIAAAAIACAAIABABIAAABIAAABIAAAAIAAABIAAABIAAABIgBABIAAACIAAABIAAAAIgBABIAAABIAAABIAAAAIAAAAIgBABIgBABIAAABIAAABIAAACIAAABIAAABIAAABIgBABIAAABIAHAAIABAAIADABIABABIAAAAIADABIAEABIACAAIADABIABAAIABABIABABIAAABIAAAEIAAACIAAADIAAAEIAAABIAAAAIAAABIABABIAAABIAAACIAAABIAAABIAAABIAAABIABABIAAAAIAAACIAAABIAAACIAAABIAAAAIgBABIgBAAIgBABIgCgBgAASgYIgBAAIAAAAIgBgDIgBgBIAAgCIgBgDIAAgBIgBgBIAAgBIgBAAIAAgBIgBgBIAAgBIgBAAIAAgBIAAgBIAAgBIAAgBIgCAAIAAgBIgBgBIAAgBIgBAAIgCgDIAIAAIABAAIABABIABABIAAABIABAAIAAABIAAABIABABIAAABIAAACIAAABIAAABIABAAIABABIAAABIAAABIAAABIAAABIABABIAAABIAAABIABABIAAABIAAAAIAAABIAAABIAAABIgBABIgBAAIgBAAg","t":[1.5,12.8],"fc":"#FFFFFF"},"248":{"p":"AgFAbIgBgBIAAgBIAAgBIAAgBIAAgBIAAgBIABgBIAAgBIABAAIAAgBIABgBIAAgBIAAgBIABgBIAAgBIAAgBIAAgBIABgBIAAgBIAAgBIABAAIAAgBIAAgCIAAgBIAAgBIAAgBIAAgBIABAAIAAgBIAAAAIABAAIAAgBIAAgBIABgBIAAgBIAAgBIgBgBIgBAAIAAgBIgBgBIAAgBIAAgCIgBgBIgBgBIgBAAIAAgBIgBgBIgBgBIgBgBIgBgBIAAgBIgBgBIAAgBIgBgBIgBgCIAAAAIABgBIAAgBIABAAIABAAIACAAIABAAIABABIABABIAAABIABAAIABABIAAABIAAADIABACIABABIABAAIABABIACACIABABIABABIABABIABABIABABIAAABIAAAAIAAABIAAABIAAABIgBABIgBACIAAAAIgBAAIAAAAIAAABIAAABIgBABIAAABIAAABIgBAAIAAACIAAABIgBABIgBABIgBABIAAABIAAABIgBABIAAABIAAABIAAABIgBABIAAABIAAABIAAAAIgBABIAAABIAAABIAAACIAAABIAAABIgBAAIgBAAIgBABIgCgBg","t":[6.9,12.4],"fc":"#FFFFFF"},"249":{"p":"AACAhIAAAAIAAAAIAAAAgAACAhIAAAAIAAAAIAAAAgAACAhIgBAAIAAgBIAAAAIAAgBIgBAAIAAAAIAAgBIAAAAIABgBIAAAAIAAgBIAAgBIAAAAIABgBIAAgBIAAAAIAAgBIAAAAIABgBIAAAAIAAAAIAAgBIAAAAIAAABIABAAIAAABIAAABIAAABIABAAIAAAAIAAABIAAABIAAAAIABABIgBAAIABAAIAAABIAAAAIAAABIAAAAIAAAAIAAABIgCAAIAAAAIgBAAIAAAAIAAgBIAAABIgBgBIAAAAIAAABIAAgBIAAABIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAABIAAAAIAAAAgAACAgIAAAAgAACAgIAAAAIAAAAIAAAAIAAAAgAACAgIAAAAIAAAAIAAAAgAACAgIAAAAIAAAAIAAAAIAAAAgAACAgIAAAAIAAAAIAAAAgAACAgIAAAAIAAAAIAAAAgAACAgIAAAAIAAAAIAAAAgAACAgIAAAAIAAAAIAAAAgAADAfIAAABIAAgBgAADAWIAAgBIABAAIAAAAIAAgBIAAAAIAAABIgBABIAAAAIAAAAgAAEAUIAAAAIABgBIAAAAIAAgBIAAgBIAAAAIAAAAIABgBIAAgBIAAAAIAAgBIAAgBIAAAAIABAAIAAgBIAAAAIAAgBIAAgBIAAAAIAAgBIgBAAIAAAAIAAgBIAAgBIAAgBIAAAAIgBgBIAAAAIgBgBIAAAAIgBgBIgBAAIAAgBIAAgBIAAAAIAAAAIgBgBIAAAAIgBAAIABAAIgBgBIABgBIgBAAIABgBIAAAAIAAAAIAAgBIAAgBIAAAAIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAgBIAAgBIAAgBIAAAAIAAAAIgBgBIAAgBIAAAAIAAgBIAAAAIAAAAIAAgBIgBAAIAAAAIgBgCIAAAAIAAgBIgLgKIAAgBIABgBIAAAAIABAAIABAAIAAABIAAAAIAAAAIABAAIABAAIAAABIABAAIABABIAAAAIABABIAAAAIAAABIABABIAAAAIABABIAAAAIAAABIAAAAIACABIAAAAIABABIAAABIAAABIAAABIAAAAIAAAAIABAAIABABIACABIABABIABAAIABABIAAAAIABABIAAAAIABABIACABIAAAAIABABIABAAIgBAAIABAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAABIABAAIAAAAIAAAAIgBACIAAABIAAAAIABABIgBABIAAAAIAAACIAAABIAAABIAAABIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAABIAAAAIAAAAIAAABIAAAAIAAACIAAABIgBACIAAABIAAAAIAAABIgBABIAAABIgBAAIAAABIAAAAIAAAAIAAABIgBABIAAAAIAAABIgBAAIAAAAIAAABIgBAAIAAABIAAAAIgBABIgBABIgBABIAAAAIAAAAgAANgLIgBAAIABAAIAAAAgAANgLIAAAAIAAAAIAAAAgAANgLIAAAAIAAAAIAAAAIAAgBIAAABIAAAAgAANgMIAAAAIAAAAIAAAAIAAAAIAAgBIAAAAIAAAAIAAgBIABAAIAAAAIAAABIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAABIAAAAIAAAAIAAAAIAAAAIgBAAgAANgOIAAAAIAAAAIAAAAIAAAAgAANgPIAAAAIAAAAIAAAAIAAAAIAAABIAAAAIAAgBgAAMgPIAAAAIAAAAIABAAIgBAAIAAAAgAAMgPIAAgBIAAABIAAAAgAAMgQIAAAAIAAAAIAAAAIAAAAIAAAAg","t":[6.4,10.9],"fc":"#FFFFFF"},"250":{"p":"AAEAtIAAABIgBgBIgBAAIAAgBIAAgBIAAAAIAAgBIAAgBIAAAAIABgBIAAgBIAAgBIABgBIAAgBIAAgBIAAAAIABgBIAAAAIAAgBIAAgBIABAAIAAgBIAAgBIAAAAIABgCIAAAAIABgBIAAgBIAAgBIAAAAIABgBIAAAAIAAgBIAAgBIABgBIAAAAIAAAAIABABIAAABIABABIAAAAIABABIAAABIABAAIAAABIAAAAIAAABIAAABIgBAAIAAABIgBAAIgBABIAAAAIAAABIAAAAIAAABIgBAAIAAABIAAAAIAAAAIgBABIAAAAIAAABIAAAAIgBABIAAABIAAAAIgBABIAAAAIAAABIAAAAIAAABIAAAAIAAABIAAAAIgBABIAAAAIAAABIAAAAIAAABIgBAAIAAABIgBgBgAAKAVIgBgBIgBgBIgBgBIAAgCIgBAAIAAgBIgBAAIAAgBIAAgBIABAAIAAgBIAAAAIABABIAAAAIABABIAAABIABAAIAAABIABABIAAABIABAAIAAABIgBABIAAAAIAAABIAAAAgAAGAMIAAgBIAAgBIgBAAIgBgBIAAgBIgBgBIgCAAIgBgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAgBIABgBIAAAAIAAAAIABAAIAAgBIABAAIAAgBIAAgBIABgBIAAgBIABAAIAAgBIABgBIAAAAIABgCIAAgBIABgBIAAgBIABgBIAAgBIABAAIgBgBIAAgBIgBgBIgBgBIgBAAIAAAAIgBAAIgBgBIgBAAIgBgCIAAAAIgBgBIgUgVIABgBIAAgBIABAAIABAAIABABIABAAIAAABIABABIAAAAIABAAIAAABIABABIABABIAAAAIABABIAAABIAAAAIAAABIABABIABABIAAABIAAAAIAAABIACABIABABIABABIAAAAIABABIABABIABAAIAAAAIAAABIABAAIADABIACACIABAAIABAAIABABIAAABIABAAIABABIACABIABAAIACACIABABIgBgBIAAAAIAAgBIAAAAIAAgBIAAAAIgBgBIAAAAIAAgCIAAAAIAAgCIAAgBIAAAAIAAgCIAAAAIAAgBIAAAAIAAgBIAAAAIAAgBIAAgBIAAgCIAAAAIgBgBIAAAAIgBgBIAAgBIAAAAIAAAAIAAgBIAAgBIAAgBIAAAAIAAAAIAAgBIABAAIABABIABABIAAABIAAAAIAAABIAAAAIAAABIABABIAAABIAAAAIABABIAAAAIAAABIgBACIAAABIABABIAAABIAAABIAAAAIAAADIAAACIAAABIAAABIAAABIAAAAIAAABIABABIAAAAIAAABIAAABIAAABIAAAAIABABIAAABIAAABIAAACIAAADIAAABIgBABIAAABIgBAAIgBABIAAAAIgBAAIAAABIAAAAIgBABIgBABIAAAAIAAABIgBAAIgBABIAAABIgBAAIAAABIAAAAIgBABIgCABIgBACIgBABIAAAAg","t":[6.1,10.1],"fc":"#FFFFFF"},"251":{"p":"AAEA9IgBgBIAAgBIAAgBIAAAAIAAgBIAAgBIABgBIAAgBIAAgBIABgBIAAgBIABgBIAAgBIAAAAIAAgBIAAgBIABgBIAAgCIABgBIAAgBIAAAAIABgBIAAgBIABgBIAAgBIABgBIAAgBIAAgBIAAgBIAAgBIABgBIABgBIAAAAIAAgBIABgBIgBgBIAAgBIgBgBIgBgBIgBgBIgBgBIgBgBIgBgBIgBgBIAAAAIgBgBIAAgCIgBgBIgBgBIgBgBIgCAAIAAgBIAAgBIAAgBIAAgBIAAgBIAAgCIAAgBIAAgBIABgBIAAAAIABgBIABgBIABgBIABgBIAAAAIABAAIABgBIABgBIABAAIAAgBIACgBIABgBIADgFIACgBIABgBIgBgBIgCgCIgBgCIgBAAIgBgBIgCAAIgBgBIgBgBIgBAAIgBgBIgCAAIgBgBIgBAAIgCgBIAAAAIgBAAIgCgBIgCgBIgBgBIAAAAIgCgBIgBgBIgCgBIgCgBIgDgDIgCgCIAAgBIgBgBIAAgBIgBgBIAAAAIAAgBIgBgBIgBgBIAAgCIAAgBIAAgBIgBAAIAAgBIAAgBIgBgBIgBgBIAAgBIAAgBIAAgBIABgBIAAgBIACAAIABAAIABABIABABIABABIAAABIABABIAAABIABABIAAAAIABABIAAABIABABIAAABIAAABIAAABIACABIAAABIAAABIAAABIABABIACABIABAAIABABIABABIABABIABABIACABIABAAIABABIAAAAIADABIAEABIABABIACAAIABABIABACIABAAIABABIACAAIAEADIAAABIAAgBIgBgBIAAgBIgBgBIAAAAIAAgBIgBgCIgBgBIAAgDIAAgFIAAgEIAAgBIAAgBIgBgBIAAgCIAAgBIAAgBIAAgCIAAgBIgBgBIAAgBIgBgBIAAgBIAAgBIAAgBIAAgCIAAgBIAAgBIABgBIAAgBIACAAIABABIABABIABABIAAAAIAAABIAAABIAAABIABABIAAABIABABIAAABIAAABIAAABIAAABIAAACIABABIAAABIAAADIAAAFIAAAEIAAABIABABIAAAAIABABIAAABIAAABIABABIAAABIAAABIABABIAAABIAAACIAAACIAAAEIAAABIAAABIgBABIgBABIgBABIAAABIgBABIgBABIAAABIgBABIgBABIgBABIgBAAIgBABIAAABIgBAAIgBABIgBAAIgCACIgDADIgBABIAAAAIgBABIABACIABAAIABABIAAABIABACIACACIABABIABAAIAAACIADACIAAABIACABIAAAAIABABIABABIAAABIAAABIAAABIAAABIAAABIAAABIgBABIgBAAIAAABIAAABIAAABIgBACIAAABIgBABIAAABIAAAAIgBABIAAABIAAABIgBABIgBACIAAABIgBABIAAABIgBAAIAAABIAAABIAAABIAAABIgBACIAAAAIgBABIAAABIgBABIAAABIAAABIgBABIAAAAIgBAAIgBABIgCgBg","t":[5.9,9],"fc":"#FFFFFF"},"252":{"p":"AAABBIAAgBIAAABIAAgBIAAABIAAgBIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAgBIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAgBIAAAAIAAAAIAAAAIAAgBIAAAAIAAAAIAAAAIAAgBIAAAAIgBgBIABgBIAAAAIAAgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAAAIAAgBIAAAAIAAgBIAAgBIAAAAIABgBIAAgBIAAAAIAAAAIAAgBIAAABIAAAAIAAABIAAAAIAAABIABAAIAAABIAAABIAAABIAAAAIABAAIAAAAIgBABIAAABIABACIAAAAIAAAAIAAABIABAAIAAABIAAABIAAAAIAAAAIAAABIAAAAIgBABIAAAAIAAABIAAAAIgBAAIAAAAIAAAAIAAABIgBAAIgBAAIAAABIAAAAgAAABAIAAAAIAAAAIAAAAIAAAAgAAABAIAAAAIAAAAgAgBA/IABABIgBAAIAAgBgAAABAIAAAAIAAAAgAAAA/IAAAAIAAABIAAgBgAAABAIAAAAIAAAAIAAAAgAAABAIAAgBIAAABIAAAAgAAAA/IAAAAIAAABIAAgBgAABAvIABgBIAAAAIAAAAIAAABIgBAAIAAAAgAACAtIABgBIAAgBIAAAAIABgBIgBgBIAAAAIAAgBIAAAAIAAgBIAAgBIAAAAIAAgBIAAAAIgBgBIAAAAIgBgBIgBAAIAAgBIAAAAIAAgBIAAgBIAAAAIgBgBIAAAAIgBgBIAAgBIAAAAIgBgBIAAgBIgBAAIgBAAIgBgBIAAgBIAAgBIAAAAIAAAAIgCgBIAAgBIAAAAIAAgBIAAgBIABgBIAAAAIAAAAIAAgBIAAAAIAAgBIABgBIAAAAIABgBIAAgBIABgBIAAAAIABgBIAAAAIAAAAIABgBIABgBIABgBIAAgCIAAAAIAAgBIABgBIAAgBIABgBIgBAAIAAAAIAAgBIAAAAIAAgBIAAAAIAAgBIAAAAIAAAAIgBAAIABAAIAAAAIgBgBIABAAIgBgBIAAAAIAAAAIAAgBIAAAAIAAgBIAAAAIAAAAIAAgBIAAgBIAAgBIAAAAIgBgBIgCgCIAAAAIgCgCIAAAAIAAgBIAAAAIgBAAIgBgBIAAAAIAAgBIAAAAIgCgBIAAAAIAAgBIgBAAIAAgBIAAAAIgBgBIAAAAIAAgBIAAAAIgBAAIgWgWIABgBIAAAAIAAAAIABgBIAAAAIABABIABAAIAAAAIABABIAAAAIABAAIAAABIABABIAAAAIABABIAAABIAAABIAAAAIABAAIAAABIABAAIAAABIAAABIAAAAIAAABIABAAIABABIAAAAIAAABIABAAIAAABIABAAIAAABIAAABIABAAIAAABIABAAIAAAAIACABIABABIAAAAIABABIAAABIABAAIABABIABABIAAAAIABAAIAAAAIACABIAAAAIABABIABABIABAAIAAABIAAgBIAAABIAAgBIABAAIAAAAIAAAAIAAgBIAAAAIABAAIABAAIAAAAIACgBIABAAIAAgBIAAAAIAAAAIABAAIAAAAIABAAIABAAIAAAAIAAAAIAAAAIABAAIAAgBIAAAAIABAAIAAAAIABABIABAAIAAAAIAAAAIAAgBIABAAIAAABIAAgBIAAgBIAAAAIAAAAIAAgBIAAAAIAAgBIAAAAIAAAAIAGAGIABAAIABABIAAAAIABABIAAAAIgBAAIAAABIgBABIAAAAIAAABIgBAAIAAABIAAAAIAAAAIgBABIAAAAIAAABIgBAAIAAAAIAAAAIgBABIgBABIAAAAIgBAAIgBABIgBABIgBAAIgBABIgBABIAAABIgBABIgBAAIAAABIAAAAIAAABIAAAAIAAABIABAAIAAAAIAAAAIAAAAIAAABIAAABIAAAAIABABIABABIAAAAIAAABIAAABIABAAIAAABIAAAAIABABIAAAAIABACIAAABIABACIAAAAIABABIAAABIABABIAAAAIABABIAAAAIAAABIAAAAIAAABIAAABIAAABIAAAAIABABIAAAAIAAACIgBABIAAACIAAAAIgBAAIAAABIAAABIAAABIAAAAIgBABIAAAAIAAABIAAAAIgBABIAAAAIAAAAIAAAAIgBABIAAABIAAAAIAAABIgBAAIgBABIAAABIAAAAIAAABIAAAAIgBABIgBAAIAAABIAAAAIgBABIAAABIAAABIgBAAIgBABIAAABIAAgBgAAUAhIgBAAIAAgBIAAgBIAAAAIAAgBIAAAAIAAAAIAAgBIAAAAIAAgBIABgBIAAAAIAAgBIAAAAIABAAIgBgBIAAgBIABAAIAAgBIAAAAIAAgBIAAAAIABgBIAAAAIAAAAIAAgBIAAgBIAAAAIAAgBIABAAIgBAAIAAgBIABAAIAAgBIAAgBIAAAAIABAAIgBAAIAAgBIgBAAIAAgBIgBAAIgBgBIAAAAIAAgBIgBAAIAAAAIAAgBIgBAAIAAAAIgBgBIAAAAIgBgBIgBAAIgBAAIAAgBIAAAAIAAgBIAAAAIAAgBIAAAAIABgBIAAAAIAAgBIABgBIAAABIAAgBIAAAAIAAgBIABgBIAAAAIAAAAIAAAAIABgBIABgBIAAAAIABgBIAAAAIAAgBIABgBIAAgBIABgBIABgBIAAgBIABABIAAAAIABABIAAAAIABABIAAABIABABIAAABIABABIABAAIAAABIABABIABAAIAAAAIABAAIAAABIABABIABABIAAAAIAAABIAAABIAAABIAAABIAAABIgBABIAAAAIgBABIAAABIAAABIAAABIAAAAIgBABIAAABIAAAAIAAAAIgBABIAAABIAAABIAAABIgBAAIgBACIAAAAIAAABIgBABIAAAAIAAABIAAAAIgBABIAAABIAAABIAAAAIgBABIgBABIAAABIAAABIgBAAIAAAAIAAABIAAABIgBAAIgBABIgBgBgAAXgJIABgBIAAgBIAAAAIAAABIAAAAIgBABIAAAAIAAAAgAAXgMIgBgCIAAAAIgBgBIAAAAIAAAAIgBgBIgBAAIgBgBIAAAAIAAgBIAAAAIAAAAIAAgBIABgBIAAgBIAAAAIAAgBIAAAAIAAgBIAAAAIAAgBIAAgBIAAAAIAAAAIAAgBIABgBIAAAAIABAAIABABIAAAAIABABIABAAIABAAIABABIADACIABAAIgBgBIAAgBIAAgBIgBAAIABgBIgBgBIAAAAIgBgBIABgBIgBgBIAAgBIABgBIAAgCIAAgBIAAgCIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAgBIAAgCIgBAAIAAgBIAAgBIgBgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAgBIAAAAIAAgBIAAAAIAAgBIABAAIABgBIABABIAAAAIABABIgBgBIAAABIABABIAAAAIAAABIAAABIABAAIAAABIAAABIAAAAIAAABIAAAAIABABIAAABIAAABIAAACIAAACIAAABIAAABIAAAAIABABIAAAAIAAABIAAAAIABABIAAAAIAAABIAAAAIAAAAIAAABIABABIAAABIAAABIAAAAIAAABIAAABIAAAAIAAAAIAAABIgBAAIAAABIAAABIgBABIAAAAIgBABIgBABIAAABIAAABIgBAAIAAABIAAAAIAAABIgBABIgBABIAAAAIgCACIgBADIgBABIgBgBgAgEgoIABgBIADABIABACIAAABIABAAIAAABIAAAAIABABIABABIAAABIAAAAIABABIAAAAIACABIABAAIABABIAAAAIABAAIgBABIAAAAIAAAAIAAAAIAAABIAAAAIAAAAIAAABIAAAAIAAABIAAABgAATgbIgCgBIgDAAIgBAAIgBgBIAAAAIgBAAIgBgBIAAAAIAAAAIAAgDIACgEIAAAAIACgDIAAAAIAAgBIAAAAIAAgCIAAAAIAAAAIABAAIAAABIABABIABABIAAAAIABABIAAAAIABABIAAAAIAAAAIAAAAIAAABIAAgBIAAABIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAABIABAAIAAAAIAAABIABAAIAAABIAAAAIAAABIAAAAIAAABIAAAAIAAAAIgBABIAAABIAAAAIAAAAIAAABIAAABIgBAAIABABIAAAAIgBAAgAATgmIAAAAIAAABIAAgBgAATgmIAAAAIAAABIAAgBgAATgmIAAAAIAAABIAAgBgAATgmIAAAAIAAAAIAAAAIAAAAgAATgmIAAAAIAAAAIAAAAIAAAAgAATgmIAAAAgAANgtIgDgEIAAAAIAAgBIAAgBIAAABIABABIABABIAAABIAAABIABAAIAAABIABABIAAAAIAAABIgBgCgAAJgzIgBgBIAAgBIgBAAIgBgBIAAAAIAAgBIgBgBIgCgBIAAgBIAAAAIgBgBIAAAAIAAgBIAAAAIAAAAIAAgBIAAAAIAAgBIAAgBIABAAIAAAAIAAgBIAAAAIAAAAIAAAAIAAAAIAAABIAAgBIAAAAIAAABIAAAAIAAgBIABABIAAAAIAAAAIABABIAAAAIAAAAIABABIABAAIAAABIAAABIAAAAIAAABIAAABIAAAAIABABIAAAAIAAABIAAAAIABABIAAABIAAAAIAAABIABAAIAAABIgBAAgAADhAIAAAAIABABIgBgBgAADhAIAAAAIAAAAIAAAAIAAAAIAAABIAAgBgAADhAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAg","t":[6.8,7.9],"fc":"#FFFFFF"},"253":{"p":"AgLBLIABAAIgBAAIAAAAgAgKBLIAAAAIgBAAIgBAAIAAgBIgBAAIAAgBIAAgBIAAgBIAAAAIAAgBIABgBIAAgBIABgBIAAgBIABAAIAAgBIAAgBIAAgBIAAAAIAAgBIABgBIAAgBIAAAAIAAgBIABgBIAAAAIABgBIAAgBIABgBIAAgBIAAgBIAAgBIAAgBIAAAAIABgBIAAAAIAAgBIAAAAIAAAAIAAABIABABIABABIAAABIABABIAAAAIABABIABABIAAABIAAAAIAAABIAAABIAAAAIgBABIAAAAIAAABIgBAAIAAABIgBAAIAAABIAAABIAAAAIgBABIAAABIgBAAIAAAAIAAAAIgBABIAAAAIAAABIgBAAIAAAAIAAAAIAAAAIAAABIAAAAIAAAAIgBABIAAAAIAAABIAAAAIAAABIAAAAIAAABIAAAAIAAAAIgBAAIAAABIAAAAIAAABIgBAAIAAAAIAAAAIAAAAgAgGAwIAAAAIgBgBIAAgCIgBAAIAAgBIgBgBIAAAAIAAgBIABABIAAAAIABABIAAAAIABABIABABIAAABIAAAAIAAABIAAABIAAAAIgBgBgAgJAqIgBgBIAAgBIgBgBIgBAAIAAgBIgBgBIAAAAIgBgBIgBgBIgBAAIAAgBIgBgBIAAAAIgBgBIAAgBIAAgBIAAgBIAAgBIAAgBIABgBIAAAAIABgBIAAAAIAAAAIAAgBIABAAIAAgBIAAgBIABgBIAAgBIABgBIABAAIAAgBIABAAIAAAAIAAgBIABgBIABgBIACgBIABgCIAAgBIABgBIABgBIABAAIgBgBIAAgBIgBgBIAAgBIgBAAIAAAAIAAAAIgBgBIgBgBIgBAAIAAgBIgBAAIgBgBIAAAAIgBgBIgBAAIAAAAIgCAAIAAAAIgBAAIgBAAIgBgBIAAAAIgBgBIAAgBIgBgBIAAAAIgCgBIgCgCIAAgBIgCgCIAAAAIgBgBIAAgBIgBAAIAAgBIAAAAIgBgBIAAgBIgBgBIAAAAIAAgBIgBgBIAAgBIgBAAIgBgBIAAgBIAAAAIAAgBIgBgBIgLgKIABgBIABAAIAAgBIABAAIABAAIABAAIABABIAAABIABAAIAAABIABAAIAAABIAAABIABABIABABIAAAAIAAABIAAABIABABIAAAAIABABIAAAAIAAABIAAABIABABIAAABIABAAIABAAIAAABIABAAIABABIABABIAAABIABAAIABAAIAAABIABAAIABAAIACABIABABIABAAIABABIABABIABAAIABAAIABABIABABIAAAAIABABIACAAIAAABIABABIACABIAAAAIABABIgBgBIAAAAIAAgBIAAgBIAAAAIAAAAIAAgBIgBgBIABAAIAAgBIAAgBIABgDIACgCIAAgBIAAAAIgBgBIABAAIAAgBIAAAAIABAAIAAgBIAAgBIAAAAIgBgBIAAAAIAAgBIAAAAIABgBIAAAAIAAAAIABgBIAAgBIAAAAIAAgBIAAAAIAAAAIABgBIAAAAIAAAAIABAAIAAgBIAAgBIAAAAIAAAAIAAgBIAAgBIAAAAIAAgBIAAAAIAAgBIAAAAIABgBIAAAAIABgBIABgBIADgEIABgBQABAAAAgBQABAAAAAAQAAgBABAAQAAgBAAAAIAAgBIAAAAIAAgBIABgBIAAgBIAAgBIgBgBIAAgBIgBAAIgBgBIAAAAIgBgBIgCgBIgBgBIgBAAIgBAAIgBgBIAAAAIgBAAIAAgBIAAAAIAAAAIgCgBIgDgBIgBAAIgBgBIAAAAIgBgBIAAgBIAAAAIAAgBIAAgBIgBAAIAAgBIAAgBIAAgBIAAAAIgBgBIAAAAIAAgBIAAAAIgBgBIAAAAIgBgBIAAAAIAAgBIAAAAIAAAAIAAgBIABAAIAAAAIAAAAIABAAIAAAAIABAAIABAAIABAAIAAABIABABIAAABIAAABIAAABIAAAAIABABIAAAAIAAABIABABIABABIAAABIAAAAIAAABIABABIAAABIAAABIABAAIAAABIADACIAEACIABAAIABAAIABABIAAABIACAAIAAAAIABABIAAAAIAAAAIAAAAIAAgBIgBAAIAAgBIABAAIgBgBIAAAAIAAgBIAAgBIAAgBIAAgBIAAAAIAAAAIABAAIAAgBIABAAIABAAIABABIAAABIABABIgBAAIAAABIAAAAIAAABIgBABIAAABIABAAIAAABIAAABIAAABIAAAAIAAABIABABIAAAAIgBABIAAABIAAABIABAAIgBABIABABIAAABIAAAAIAAABIAAABIAAABIAAABIAAABIAAABIAAAAIAAABIAAABIgBAAIAAABIgBAAIAAABIAAABIAAAAIAAAAIAAABIAAAAIAAABIAAABIgBAAIgBABIgBAAIAAABIAAAAIgBAAIgBABIgBABIgBAAIAAAAIgCABIgBABIgBAAIgBABIgBABIAAABIgBABIAAABIAAAAIAAABIAAAAIAAABIAAAAIAAABIAAAAIAAABIAAAAIgBABIAAABIAAAAIABABIAAABIAAABIAAAAIAAACIAAAAIAAABIAAABIAAABIAAAAIABADIAAAAIAAABIAAABIABABIAAABIAAABIAAAAIABABIAAABIAAABIAAAAIABABIAAABIAAABIAAAAIABABIAAABIAAABIAAADIAAACIAAAAIgBABIAAABIAAAAIAAABIAAABIgBAAIAAABIgBAAIAAABIgBABIAAABIAAAAIAAAAIgBABIAAAAIAAABIAAAAIAAABIgBABIAAAAIAAABIAAAAIgBABIgBABIAAAAIAAABIgBAAIgBABIgBABIAAAAIAAABIgBABIgBABIgBABIAAAAIAAABIAAAAIAAAAgAAiADIAAgBIAAAAIAAAAIAAgBIAAAAIAAAAIgBAAIAAAAIAAAAIAAgBIAAAAIAAAAIABAAIAAAAIAAAAIgBAAIAAAAIAAAAIABAAIAAAAIAAAAIgBAAIAAAAIABAAIAAAAIgBAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIgBAAIABAAIgBAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIABAAIgBAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIgBAAIAAAAIAAAAIAAAAIAAAAIAAAAIgBAAIAAAAIAAAAIAAAAIgBAAIAAAAIgBAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIABAAIAAAAIgBAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAgBIgBgBIAAgBIABgBIAAAAIAAgBIAAAAIAAgBIAAAAIAAgCIABgBIAAgBIAAgBIABAAIAAAAIgBgCIgBgBIAAgBIAAAAIgBAAIAAgBIAAAAIgBgBIAAAAIAAgBIgBAAIAAgBIAAgBIgLgLIAAAAIAAAAIAAAAIAEAAIAAAAIABAAIAAABIAAAAIABAAIAAAAIABAAIAAABIAAAAIABAAIAAAAIABAAIABABIABgBIAAAAIABAAIAAAAIABAAIAAAAIAAAAIABAAIACAAIABAAIABAAIAAAAIABABIAAAAIABAAIAAAAIAAAAIABAAIADAAIAAAAIAAAAIgBgBIABgBIgBAAIABgBIAAAAIgBAAIAAgBIABgBIAAgBIAAAAIAAgBIAAgBIAAgBIABgBIAAgBIAAAAIAAgBIAAAAIAAgBIAAAAIAAgBIAAgCIAAAAIAAgBIAAgBIgBAAIAAgBIAAAAIAAgBIAAgBIAAAAIAAgBIAAAAIAAgBIgBAAIABgBIAAgBIAAAAIABAAIAAAAIAAAAIAAABIAAAAIABAAIAAABIAAAAIAAAAIAAgCIAAABIAAAAIAAAAIAAABIAAAAIAAAAIAAgBIAAABIABAAIAAAAIAAAAIAAAAIAAAAIAAgBIAAABIAAgBIABAAIAAABIAAAAIABAAIABAAIgBAAIAAABIABAAIAAAAIAAABIAAAAIAAABIAAABIAAABIgBAAIAAABIAAABIAAABIgBAAIAAABIAAAAIAAABIAAABIAAABIgBAAIAAACIgBACIgBABIAAABIAAABIAAABIABAAIAAABIAAAAIAAABIAAABIABAAIABABIAAAAIABABIAAABIAAABIABABIAAAAIAAABIAAAAIABABIAAAAIAAABIABABIAAAAIAAABIAAABIAAABIgBABIAAABIAAAAIAAABIAAAAIgBABIAAABIAAAAIAAABIAAAAIAAAAIgBABIAAAAIAAACIgBAAIAAAAIAAABIAAABIgBAAIAAABIgBAAIAAABIAAAAIAAABIAAAAIAAABIgBAAIgBABIAAAAIAAAAIgBAAIAAAAIAAAAIAAABIAAAAIgBAAIgBACIgBAAgAAhAAIAAAAIAAAAIAAAAgAAhAAIAAAAIAAAAgAAhAAIABAAIgBAAIAAAAgAAfAAIAAAAIAAAAgAAfAAIAAAAIAAAAIAAAAgAAcAAIAAAAIAAAAIAAAAgAAgAAIAAAAIAAAAIAAAAgAAgAAIAAAAIAAAAIAAAAIAAAAgAAogzIAAAAgAAogzIAAAAIAAAAIAAAAgAAog0IAAAAIAAAAIAAAAIAAAAgAAng1IAAABIAAgBgAAng1IAAAAIAAAAIAAgBIAAABIAAAAg","t":[7.8,7],"fc":"#FFFFFF"},"254":{"p":"AgZBYIgBgBIAAgBIAAgBIAAgBIAAAAIAAgBIABgBIAAgBIABgBIAAgBIABgBIAAgBIAAgBIABgBIAAgBIAAgBIAAgBIABgBIAAgBIAAgBIABAAIAAgBIAAgBIABgBIABgBIAAgBIAAgBIABgBIAAgBIAAgBIABgBIAAgBIAAgBIABgBIAAgBIAAAAIgBgBIgBgBIAAgBIgCgBIgBgBIAAgBIgBgBIgBgBIgBgBIAAgBIgBgBIgBgBIgBgBIgBgBIgCAAIgBgBIAAgBIAAgBIAAgBIAAgBIAAgCIABgBIABgBIAAgBIABgBIABAAIABgBIAAgBIABgBIABgBIAAgBIABgBIABgBIABgBIABgBIABAAIABgCIAEgEIACgCIAAAAIgBgCIgBgCIgCgBIAAAAIgCgBIgCAAIgBgBIgBgBIAAgBIgCAAIgCgBIAAAAIgCgBIgBAAIgBAAIgDgBIgCAAIgBgBIgBAAIgBAAIgCAAIgBgBIgCgBIgBgCIgDgCIgCgCIAAgBIgBgBIgBgBIAAgBIAAgBIgBgBIAAgBIgBgBIAAgBIAAgBIAAgBIgBAAIAAgBIgBgBIgBgBIAAgBIgBgBIAAgBIAAgBIABgBIABgBIABAAIABAAIACABIABABIAAABIABABIABAAIAAABIAAABIAAABIABABIABABIAAABIAAABIAAABIABABIABABIABABIAAABIAAABIAAABIACABIACAAIABABIAAABIACABIABABIACAAIAAABIACAAIABABIAEABIADABIACABIABAAIABAAIABAAIABABIACAAIABABIAEADIABABIgBgBIAAgBIgBgBIAAgBIAAgBIgBgBIAAAAIgBAAIgBgEIABgEIAAgFIAAgBIgBgBIAAgBIAAgBIAAgBIAAgBIAAgCIgBgBIgBgBIAAgBIAAgBIgBgBIAAgBIAAgBIAAgBIAAgBIAAgCIAAAAIABgBIABgBIABAAIABAAIAAAAIACgCIAAgBIAAgBIABgBIACgBIAAgBIABAAIAAgBIACAAIAEgFQAEgBACgEIAAgBIAAAAIAAgCIABgBIAAgBIgBgBIAAgBIgCgBIAAAAIgDgBIgCgBIgQgBIgCgBIgBgBIAAgBIgBgBIAAgBIAAAAIgBgBIAAgBIgBgBIAAgBIAAgBIgBgBIgBgBIgBgBIAAgBIgBgBIgCgCIgBgBIAAgBIAAgBIAAgBIAAAAIAAgBIABgBIACgBIACgBIABABIABABIABABIAAABIAAAAIAAABIAAABIACABIAAABIABABIABABIABABIAAABIAAABIAAABIABABIAAABIABABIAAABIAPABIAAAAIABABIACABIACAAIAAgBIgBAAIAAgBIgBgBIAAgBIAAgBIgBgBIAAgCIAAgDIAAgDIAAgCIAAAAIABgBIABgBIABAAIABAAIACAAIABABIAAABIAAABIAAABIgBABIAAABIAAABIAAABIABABIAAABIAAABIAAAAIAAABIABABIABABIAAABIAAABIAAABIAAABIAAABIAAABIABABIAAABIAAABIAAABIABABIAAABIAAABIAAACIAAACIAAABIAAABIgBABIAAABIAAABIAAABIAAABIgBABIAAABIgBAAIAAABIgCAAIAAABIgBABIgBAAIgBABIgBABIgBAAIgBABIgBAAIgBABIAAABIgCABIAAABIgCABIAAABIgBABIgBABIgBABIAAABIAAAAIgBABIgBABIABABIAAABIABABIAAAAIAAABIAAACIAAACIAAABIABABIAAADIAAAFIAAADIAAABIAAABIABABIAAABIAAABIABABIAAAAIAAAAIABABIAAABIABABIAAABIAAADIAAADIAAACIgBABIAAABIgBABIgBABIgBABIgBABIAAABIAAAAIgBABIgCABIAAABIgBABIgBABIgBABIgBABIgBABIgBABIgCACIgCADIgBABIgBAAIAAABIAAABIABABIABABIABABIABACIABACIABABIABAAIABABIACACIABABIABABIABABIABABIABABIAAABIAAABIAAABIAAABIAAABIgBABIgBABIAAAAIgBABIAAABIAAABIAAABIgBABIAAABIAAABIgBABIAAABIAAABIgBABIgBABIgBACIAAABIAAAAIgBABIAAABIAAABIAAABIgBABIAAABIAAABIAAABIgBABIgBABIAAABIgBABIAAABIAAABIgBAAIgBAAIgBABIgCgBgAAlgEIgBgBIAAgBIAAgBIAAgBIAAgBIgBAAIAAgBIAAgBIAAgBIAAgBIgBgBIAAgBIgBgBIAAgBIAAgBIAAgCIAAgCIAAAAIABgBIABgBIABgBIABgBIABgBIACgBIABgBIAAgBIAAgBIACgBIAAgBIABgBIABgBIABgBIAAgBIABgBIABgBIAAAAIAAgBIABgBIABgBIAAgBIAAgBIAAgBIAAgBIAAgBIAAgBIgBgBIgBgBIAAgEIAAgEIAAgFIAAgBIgBgBIAAgBIAAgBIAAgBIAAgBIAAAAIABgBIAAgBIABgBIACgBIACABIABABIAAABIAAABIAAAAIgBABIABABIAAABIAAABIAAADIAAAEIAAAEIAAAAIAAABIABABIABABIAAABIAAABIAAABIAAABIAAABIABABIAAABIAAABIAAABIAAABIgBABIAAABIAAAAIAAABIgBABIgBABIgBACIAAABIgBABIgCACIgBACIgBABIgBABIgBABIAAABIAAAAIgBABIgBABIgCABIgBABIgBABIAAAAIABABIAAABIAAABIAAABIAAABIAAABIABABIAAABIAAACIAAACIgBACIAAAAIgBABIAAAAIgBABIgCgBg","t":[8.9,6.3],"fc":"#FFFFFF"},"255":{"p":"AgaBLIAAAAIgBAAIgBgBIABgBIAAgBIAAgBIAAAAIAAgBIAAAAIABgBIAAgBIABgBIAAgBIABAAIAAgBIAAgBIABgBIAAAAIAAgBIABgBIAAgBIABgBIAAgBIAAAAIABgBIAAgBIABgBIAAAAIABgBIAAgBIAAgBIAAAAIABgBIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAAAIgBgBIAAAAIgBgBIgBgBIgBgBIAAAAIgBAAIAAgBIgBAAIAAgBIgBAAIAAgBIgBAAIgBgBIAAgBIgBAAIgBgBIgBgBIAAAAIgBgBIgBAAIgBgBIgBAAIAAgBIgBgBIAAgBIAAgBIAAgBIAAgBIAAgBIAAAAIAAgBIABgBIgBgBIABgBIAAgBIAAgBIAAgBIAAgBIAAgBIABAAIAAAAIAAgBIABgBIAAAAIAAgBIAAgBIABgBIAAgBIAAgBIABAAIAAgBIAAgBIABgBIAAgBIAAAAIAAAAIgHgGIABAAIABABIACAAIABAAIABABIAAAAIAAAAIADABIACAAIABABIABABIABABIABAAIABAAIACABIABABIABABIACABIAAAAIAAABIAAAAIAAgBIABAAIAAAAIAAgBIAAAAIAAAAIAAgBIgBAAIAAAAIAAgBIgBgBIAAgBIAAgCIAAAAIAAgBIgBgBIAAgBIAAgDIAAgBIAAgBIAAgBIAAgBIAAgBIAAgCIAAgBIgBgBIAAgBIAAgBIgBgBIAAgBIAAgBIAAgBIAAgBIAAgBIAAgCIAAAAIAAgBIAAgBIAAgBIABAAIABAAIAAAAIAAgBIABgBIAAgBIAAAAIAAgBIABgBIAAAAIABgBIAAgBIABAAIAAgBIACAAIABgBIAAAAIACgCIAAAAIACgBIACgCIABgBIABgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAgBIAAgBIAAAAIAAgBIAAAAIAAgBIAAgBIgCgBIgBgBIgBgBIAAAAIAAAAIgBgBIgBAAIgBgBIgBAAIgDgBIgBAAIgBAAIgBgBIgBgBIAAAAIgBgBIAAAAIgBgBIAAgBIgBAAIAAgBIgBgBIAAAAIgBgBIgBgBIgBAAIAAgBIgBAAIgCgCIgBAAIAAgBIAAgBIAAAAIAAgBIgBAAIABgBIgBgBIABAAIAAgBIABAAIABAAIAAABIAAAAIAAAAIgBAAIAAABIABAAIAAAAIABABIAAAAIAAABIAAAAIAAAAIAAAAIAAABIAAAAIABAAIAAABIABgBIABAAIACAAIAEgBIACABIACAAIABAAIAAABIABAAIAAABIAAABIABAAIABAAIABABIABAAIgBgBIAAAAIAAAAIAAgBIAAAAIAAAAIAAAAIAAgBIAAgBIAAAAIABgBIAAgBIABgBIAAgBIABAAIABgBIABAAIAAAAIABAAIABABIABABIAAABIAAAAIAAABIAAAAIAAABIABABIAAABIABABIAAABIAAAAIAAABIABAAIAAAAIAAAAIAAABIAAAAIAAAAIAAAAIAAABIAAAAIAAAAIAAABIABAAIAAAAIAAABIAAAAIAAABIABAAIAAABIAAABIAAAAIAAAAIAAABIAAAAIAAABIAAABIABABIAAABIgBAAIAAABIgBABIAAABIgBAAIAAABIAAAAIAAABIgBABIgBAAIgBABIABABIgBAAIAAABIgBABIgBABIgBAAIAAABIAAAAIAAABIAAABIAAABIAAAAIAAABIgBABIAAAAIAAABIAAABIgBABIAAABIAAAAIgBABIAAAAIAAABIAAABIAAAAIAAABIAAABIAAAAIAAABIAAAAIAAABIAAACIAAAAIABABIAAAAIAAABIAAABIgBABIAAAAIAAACIAAABIgBABIAAABIgBACIAAABIAAABIAAAAIAAABIAAABIAAAAIABABIgBABIABABIAAABIAAAAIAAABIgBABIAAABIAAABIAAABIgBABIAAAAIAAABIAAAAIAAABIgBAAIAAABIgBAAIAAABIgBABIgBAAIAAAAIAAABIAAABIAAAAIAAABIAAABIgBABIAAABIgBAAIAAABIgBABIAAAAIAAABIAAAAIgBABIAAACIgBABIgBABIAAABIgBACIAAABIgBAAIAAABIAAABIAAABIgBAAIABABIAAAAIABAAIAAABIAAAAIAAABIABAAIAAABIAAAAIABABIABACIAAABIAAAAIABABIAAABIABAAIABACIAAABIABABIABABIAAABIABABIgBAAIAAABIAAABIAAABIAAABIgBABIgBABIAAAAIAAAAIAAABIgBABIAAABIAAABIAAAAIgBAAIAAABIgBABIAAABIAAAAIAAAAIAAABIgBAAIAAABIAAAAIgBAAIgBABIAAABIgBABIAAAAIgBABIAAAAIgBABIAAABIAAABIgBABIAAABIgBAAIAAABIgBABIAAAAIgBABIgBABIAAABIAAAAIAAAAIAAAAIAAAAIgBAAgAgZBLIAAAAIAAAAgAgZBLIAAAAIAAAAIAAAAIAAAAgAArARIAAAAIAAAAIgBAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAgBIAAAAIAAAAIgBAAIAAAAIgBAAIAAAAIgBgBIAAAAIgBAAIABAAIABgBIAAAAIAAAAIACgBIgBABIABABIAAAAIAAAAIABABIAAAAIAAAAIAAABIAAAAIAAAAIAAAAIAAAAIAAABIAAgBgAArARIAAAAIAAABIAAgBgAAmAPIgBgBIAAAAIAAAAIABABIAAAAIAAAAIAAAAIAAAAgAAlAOIAAAAIAAAAIAAAAIAAAAIAAAAgAAqANIAAgBIAAgBIAAgBIAAAAIAAgBIgBgBIgBgBIgBAAIAAgBIAAgBIgBgBIgBgBIgBgBIgBgBIgBgBIAAAAIAAAAIgBAAIAAAAIAAAAIAAAAIAAAAIgBAAIgGACIABAAIADgCIACgCIAAAAIABgBIABgBIABAAIAAAAIAAgBIABAAIAAgBIABAAIAAgBIABgBIAAAAIAAgBIAAAAIAAAAIAAgBIAAAAIAAAAIABgBIAAgBIAAAAIgBAAIABgBIgBAAIAAgBIAAAAIABgBIAAAAIAAgBIAAgBIABgCIAAAAIAAgBIAAgBIAAAAIAAAAIAAgBIABgBIAAAAIAAgBIAAgBIAAAAIAAgBIAAAAIAAAAIABgBIAAgBIAAAAIAAgBIAAAAIAAgBIABAAIAAgBIAAgBIABgBIAAgBIAAgBIAAAAIABgBIAAgBIgBgBIABgBIAAgBIAAAAIAAAAIAAgCIAAAAIABgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgCIAAAAIAAAAIABAAIAAAAIAAABIAAAAIAAAAIAAABIAAAAIAAAAIAAgCIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIAAAAIgBgBIAAAAIgBAAIAAAAIAAgBIAAAAIABAAIAAAAIAAABIAAAAIABAAIAAAAIAAABIAAAAIAAABIAAAAIAAABIAAABIAAAAIAAABIAAAAIAAABIAAAAIAAAAIAAACIAAABIABABIAAABIgBAAIAAADIAAAAIABAAIAAABIAAABIAAABIAAABIAAAAIAAABIAAAAIAAABIAAABIABABIAAABIAAAAIAAABIABAAIAAABIAAABIABABIABAAIAAABIABAAIAAABIABAAIAAABIAAAAIABABIAAAAIABABIAAAAIABABIAAABIABABIAAAAIAAABIABABIAAABIAAABIAAAAIAAAAIAAABIgBAAIAAABIAAABIgBABIgBABIAAABIAAABIgBAAIAAABIAAABIAAAAIAAAAIgBABIAAAAIgBAAIAAAAIAAAAIAAAAIgBABIgBAAIAAABIAAABIgBAAIAAAAIAAAAIgBABIAAAAIAAAAIAAACIAAABIgBAAIgBABIAAABIgBAAIAAAAIgBABIAAABIAAAAIAAAAIgBABIgBAAIAAABIgBAAIAAAAIAAAAgAgjAAIgBAAIAAAAIgCAAIgBgBIgBAAIAAgBIgBgBIgBAAIgBAAIAAgBIgBgBIgBgBIAAgBIAAAAIgBgBIALAIIAAAAgAg6gTIABgBIAAgBIABAAIABAAIABAAIAAAAIABAAIABABIAAAAIAAAAIABABIAAAAIAAABIABAAIAAAAIAAABIAAAAIABABIAAAAIAAABIAAAAIABABIAAAAIAAABIAAAAIABABIAAAAIAAABIAAAAIAAABIAAABIABAAIAAABIAAAAgAAtgxIAAAAIAAAAgAAugyIAAAAIAAAAIAAAAgAAGhAIAAAAIAAAAIAAAAg","t":[9.2,5.6],"fc":"#FFFFFF"},"256":{"p":"AgeBCIAAAAIAAgBIABAAIAAAAIAAAAIAAAAIgBgBIABgBIAAgBIAAgBIAAAAIABgBIAAAAIABgBIAAAAIAAgBIABgBIAAAAIABgBIAAAAIABgBIAAgBIABAAIAAgBIAAgBIABgBIAAgBIAAAAIABAAIAAgBIABgBIABAAIAAgBIABgBIAAgBIAAAAIAAgBIAAgBIAAgBIgBgBIAAAAIAAgBIgBAAIAAgBIAAAAIgBAAIgBgBIgBAAIgBgBIAAAAIgBgBIAAAAIAAgBIgBAAIAAAAIgBgBIgBAAIgBgBIAAAAIgBgBIgBAAIgBgBIAAAAIgBAAIgBAAIgBgBIgBAAIgBgBIgBgBIgBgBIAAAAIAAgBIgBAAIAAgCIgBAAIAAgBIgBgBIAAgBIgBgBIAAgBIgBgBIAAgBIAAgBIAAgBIAAgBIgBAAIAAgBIABgBIgBAAIAAgBIAAgBIAAgBIABgBIgBgBIAAgBIAAgBIAAgBIAAAAIAAABIABAAIABABIABAAIABABIABABIABAAIAAAAIABABIABABIACAAIAAAAIACABIAAAAIABAAIADABIABAAIABABIABAAIABABIABAAIABABIACAAIABABIABABIABABIABABIAAAAIAAAAIABAAIAAAAIAAAAIABAAIAAAAIAAABIAAABIAAABIAAABIAAABIAAABIAAABIAAAAIAAABIABAAIAAAAIAAABIAAAAIABABIAAAAIAAABIAAAAIABABIAAACIABAAIAAABIAAABIAAABIAAAAIABACIAAABIABABIgBABIAAABIABABIgBAAIAAABIgBABIAAABIAAABIgBAAIAAABIAAAAIgBAAIAAABIAAABIgBABIAAAAIgBABIAAAAIAAABIgBAAIAAABIgBAAIAAABIAAAAIAAABIgBAAIAAAAIAAAAIgBABIgBAAIgBABIAAAAIgBAAIgBABIgBAAIAAABIgBABIAAAAIAAABIgBABIAAAAIgBABIgBAAIgBABIgBABIAAABIAAgBgAAiA4IgBgBIAAgBIAAAAIAAgBIAAAAIABgBIAAABIAAgBIABAAIABAAIACgBIABAAIABAAIABgBIAAAAIAAAAIAAgBIABAAIAAAAIAAAAIAAgBIABAAIAAAAIAAgBIAAAAIAAgBIABAAIAAAAIAAAAIAAgBIABAAIAAAAIAAgBIABgBIAAgBIAAAAIABgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIABgBIAAgBIABAAIAAgCIgBAAIAAgBIgCgBIgBgBIgBgBIAAgBIgBAAIgCgBIgBgCIgCgBIgCgBIAAgBIgBAAIAAABIgBAAIgBABIAAAAIgBAAIAAABIAAAAIgMAHIAAgBIAEgFIACgCIABgBIABgBIABgBIABgBIABAAIAAgBIABAAIAAgBIAAAAIAAgBIACgCIABAAIAAgBIAAAAIAAgBIAAAAIAAgBIAAgBIAAAAIgBgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIgBgBIABgCIAAAAIAAgCIAAAAIAAgBIAAgBIAAAAIAAgBIAAAAIAAgBIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAAAIAAgCIAAgBIAAAAIAAgBIAAAAIABgBIABAAIAAgBIAAgBIABgBIACgBIAAgBIAAgBIAAgBIABgBIAAgBIABAAIABgBIAAgBIAAgBIABgBIAAgBIAAAAIAAgBIABgBIAAgBIAAgBIAAAAIABgCIAAAAIAAgBIAAABIAAAAIAAABIABABIAAAAIAAABIAAABIAAAAIAAAAIAAABIAAAAIABABIgBAAIAAAAIgCABIAAABIAAABIgBAAIAAgBIAAABIAAAAIgBABIAAAAIAAABIAAAAIgBABIAAAAIAAABIAAAAIgBABIAAAAIABABIAAABIAAAAIAAABIgBABIABABIAAABIAAAAIAAABIAAACIAAACIAAAAIAAABIAAACIAAABIAAABIAAABIAAABIABABIAAABIAAAAIAAAAIAAAAIABAAIAAABIAAABIAAACIABAAIABABIAAABIABAAIABABIABABIAAABIABABIABAAIABABIAAAAIABABIABAAIABABIABAAIABABIAAABIABABIABAAIAAABIABABIABABIAAABIABABIAAABIAAAAIAAABIAAABIAAAAIgBABIAAABIgBABIgBACIgBAAIAAABIAAABIgBABIAAABIAAAAIgBABIAAAAIgBABIAAABIgBAAIAAABIAAABIgBAAIgBABIAAABIAAABIgBAAIAAAAIgBABIAAABIAAAAIAAABIAAABIgBABIAAABIgBABIgBABIgBABIgBAAIAAABIAAABIgBAAIAAAAIgCABIAAAAIgBABIgBAAIgCABIAAABIgBAAIgBAAIAAAAIgBAAgAgPATIAAAAIAAAAIABABIAAgBIAAABIAAAAIgBgBgAgPATIAAgBIAAgBIgBgCIAAAAIAAgBIAAgBIgBgCIAAgEIAAgBIAAgBIgBgBIABgBIAAgBIAAgBIAAgBIAAAAIgBAAIAAgBIAAgBIgBgBIAAgBIAAgBIAAgBIAAgBIAAgBIAAAAIAAgCIAAgBIAAgBIAAAAIAAgBIAAAAIAAgBIAAgBIABAAIAAgBIAAAAIAAgBIAAgCIAAAAIABgBIAAAAIABgBIABAAIABAAIAAAAIACgCIABgBIABgBIABgBIACgBIAAgBIAAgBIAAAAIAAAAIABgBIACgBIgBAAIABgBIAAAAIABAAIgBgBIABgBIAAgCIABgBIABgCIgBgBIAAAAIAAgBIAAgBIAAgBIgBgBIgBAAIgCgBIAAAAIgBgBIgBAAIgBgBIgBAAIAAAAIgBAAIAAgBIgBAAIgBgBIAAAAIgBgBIgBAAIgBAAIAAgBIgBAAIgBAAIgBAAIgBgBIgBAAIgBgBIgBAAIAAAAIAAgBIgBAAIAAAAIgCgCIgBAAIAAgBIABgBIAAAAIAAAAIAAAAIAAAAIgBAAIAAAAIAAgBIAAAAIAAgBIAAAAIAAAAIgBgBIAAAAIAAAAIgBgBIAAAAIgBAAIAAgBIAAAAIABAAIAAgBIABAAIABgBIADgBIACAAIACABIAAAAIABABIAAABIABABIAAAAIAAAAIABABIABABIAAAAIAAAAIABAAIAAABIABAAIAAAAIAAABIAAAAIAAAAIAAAAIABAAIAAABIABgBIABgBIABAAIACAAIAAAAIACAAIABAAIABAAIABAAIABAAIABABIAAABIAAAAIAAAAIABABIAAABIAAABIABAAIAAABIABAAIAAAAIAAAAIAAAAIgBgBIAAAAIAAgBIAAAAIgBAAIABgBIAAAAIAAAAIAAgBIAAAAIAAgBIAAAAIAAAAIAAgBIAAAAIABABIAAgBIABAAIAAABIAAAAIAAAAIABABIABABIAAABIAAABIAAAAIAAABIgBABIAAABIAAABIAAAAIAAABIAAABIAAAAIgBABIAAABIAAABIABABIgBAAIAAABIgBABIAAABIAAAAIAAABIAAABIAAABIgBABIABABIAAABIAAABIAAAAIAAABIAAABIgBABIAAABIAAAAIAAABIgBABIAAAAIAAABIABAAIgBABIAAABIAAAAIAAABIAAAAIAAABIAAABIAAABIAAAAIAAABIAAAAIAAABIAAAAIAAABIAAABIgBABIAAABIgBABIgBABIAAABIgBAAIAAABIAAAAIAAABIgBAAIAAABIAAAAIAAABIgBABIAAAAIgBABIAAABIgBABIAAABIAAABIgBABIAAABIAAAAIAAAAIgBAAIAAAAIgBAAIAAAAIAAABIAAABIgBAAIgBAAIABABIAAABIAAABIAAAAIAAABIgBACIAAAAIAAABIAAABIAAABIAAAAIAAABIAAAAIAAACIgBACIAAABIAAABIgBABIAAAAgAguAEIAAAAIAAgBIgBgBIAAgBIAAgBIgBAAIAAAAIAAAAIADACIAAAAIgBABIABAAIAAABIgBAAgAg8gKIABgBIAAAAIABgBIAAAAIABAAIAAAAIABAAIAAABIABAAIABAAIAAABIAAAAIABABIAAAAIAAABIAAAAIABABIAAAAIAAABIAAAAIABABIAAAAIAAAAIAAABIABAAIAAABIAAAAIAAABIABAAIAAABIAAABIAAAAIABAAg","t":[9.4,4.7],"fc":"#FFFFFF"},"257":{"p":"AAgBQIgCAAIgBgBIAAgBIAAgBIAAgBIAAgBIABgBIABgBIAFgCIADgCIABgBIABAAIAAgCIAAgBIABgBIABgBIAAgBIABAAIAAgBIAAgBIAAgBIABgBIABgBIABgCIAAgBIABgBIACgCIAAgBIABgCIAAgBIAAgBIABgBIABAAIAAgBIABgBIABgBIAAgBIAAgBIgBgBIAAgBIgCgCIgCAAIgBgBIgBgBIgBAAIgCgBIgGgEIgCgCIAAAAIgBABIgBABIgBABIgBABIgCACIgBACIgBABIAAAAIgCABIAAABIgBABIgCACIAAABIgBABIgBAAIAAABIgBACIgDADIAAABIgBAAIgBAAIgCAAIgBgCIAAgBIAAgBIAAgBIAAAAIAAgBIABgBIABgBIABgBIAAgBIAAgBIABgBIABgBIABgBIABAAIABgBIABgBIACgCIACgCIAAgBIAAgBIABgBIABgBIACgCIABgBIAAAAIAAgCIAAgBIAAgBIAAgBIAAgBIgBAAIAAgBIAAgBIgBgBIAAgBIAAgBIAAgBIgBgBIAAgBIAAgCIAAgFIAAgCIAAAAIAAgBIAAAAIAAgBIAAgCIAAgBIgBgBIAAgBIgBAAIAAgBIAAgBIAAgCIAAgCIAAgBIABgBIABgBIABgBIABAAIABgBIACgBIABgBIAAgBIAAgBIACgBIAAgBIABgBIABgBIABgBIAAgBIABgBIABgBIAAgBIAAgBIABgBIABgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAABIABABIAAABIAAAAIAAABIAAABIAAABIAAABIABACIAAACIABABIAAABIAAABIgBABIgCABIgBADIgBABIgBABIgBAAIAAABIAAABIgBABIgBABIgCAAIgBACIgBABIAAAAIABABIAAABIAAABIAAABIAAABIAAABIABABIAAABIAAACIAAAAIgBABIAAABIAAAAIAAADIAAACIAAABIAAAAIABABIAAABIABABIAAABIAAABIAAABIABABIAAABIAAABIAAACIABAAIACABIABABIAAACIACAAIABABIAAABIACABIABAAIACABIAAAAIACABIABABIACAAIAAABIACAAIABACIAAABIACAAIAAABIADACIAAABIACACIAAABIAAABIgBABIAAABIgBABIgCABIgBACIgBACIgBACIgBABIAAABIAAABIgCABIAAAAIAAABIAAABIgBACIgBABIgBABIAAABIAAAAIgBABIgBABIAAABIAAABIAAABIAAABIgBABIgBABIgBABIgBABIgCACIgBABIAAACIgBAAIgCABIgBAAIgCABIgCAAIgBABIgBAAgAgjApIAAgBIABgBIABgBIABgBIAAgBIABAAIABgBIAAgBIABgBIABgBIABgBIABgBIABgBIABgBIAEgEIACgCIAAgBIgBgBIgBgCIgCgBIAAAAIgCgBIgCAAIgBgBIgBgBIAAgBIgCgBIgCAAIAAgBIgCAAIgBgBIgBAAIgDAAIgCgBIgBgBIgBAAIgBAAIgCgBIgBgBIgCgBIgBgCIgDgDIgCAAIAAAAIgBgBIgBgBIAAgBIAAgBIgBgBIAAgBIgBgBIAAgBIAAgBIAAgBIgBAAIAAgBIgBgCIgBgBIAAgBIgBgBIAAgBIAAAAIABgBIABgBIABAAIABAAIACABIABABIAAAAIABABIABABIAAABIAAABIAAABIABABIABABIAAABIAAABIAAABIABAAIABABIABABIAAABIAAACIAAABIACABIACAAIABAAIAAAAIACAAIABABIACABIAAAAIACABIABAAIAEACIADABIACABIABAAIABABIABABIABAAIACABIABAAIAEAEIABABIgBgBIAAgCIgBgBIAAgBIAAAAIgBgBIAAgBIgBgBIgBgEIABgDIAAgEIAAgBIgBgBIAAgBIAAgBIAAgBIAAgBIAAgDIgBgBIgBgBIAAgBIAAgBIgBAAIAAgBIAAgBIAAgBIAAgBIAAgCIAAgBIABgBIABAAIABAAIABAAIAAAAIACgCIAAgBIAAgBIABgBIACgBIAAgBIABgBIAAAAIACgBIAGgEQAEgBABgEIAAgBIAAAAIAAgCIAAgBIAAgCIAAgBIAAgBIgBAAIAAgBIgDAAIgEgBIgQgBIgCgBIgBgBIAAgBIgBgBIAAgBIAAgBIgBgBIAAgBIgBAAIAAgBIAAgBIgBgBIgBgCIgBgBIAAAAIgBgBIgCgCIgBgBIAAgBIAAgBIAAgBIAAgBIAAgBIABgBIACgBIACAAIABAAIABABIABABIAAABIAAABIAAABIAAABIACABIAAABIABABIABABIABABIAAAAIAAABIAAACIABABIAAABIABABIAAAAIAQABIABABIABABIACAAIACABIAAgBIgBgBIAAgBIgBgBIAAAAIAAgBIgBgBIAAgDIAAgCIAAgDIAAgCIAAAAIABgCIABgBIABAAIAAAAIABABIABABIAAABIAAABIAAABIgBABIAAAAIAAABIAAABIABABIAAABIAAACIAAAAIAAABIABABIABABIAAABIAAABIAAABIAAABIAAAAIAAACIABABIAAABIAAABIAAABIABAAIAAABIAAACIAAACIAAACIAAABIAAAAIgBABIAAABIAAABIAAABIAAACIgBABIAAABIgBAAIAAABIgCAAIAAABIgBAAIAAABIAAAAIgBABIgBABIgBAAIgBABIgCABIgBABIgCABIAAABIgCABIAAAAIgBABIgBABIgBABIAAACIAAAAIgBABIgBABIABABIAAAAIABABIAAABIAAABIAAACIAAACIAAABIABABIAAACIAAAGIAAABIAAABIAAABIABABIAAABIAAABIABABIAAABIAAAAIABABIAAABIABABIAAACIAAADIAAADIAAABIgBABIAAACIgBABIgBABIgBABIgBAAIAAABIAAABIgBABIgCABIAAABIgBABIgBABIgBABIAAABIgBAAIgCAAIgCAAIgBABIgFACIgFAEIABgBgAApgpIAAgDIAAABIABABIAAABIAAABIgBgBg","t":[9.6,5.4],"fc":"#FFFFFF"},"258":{"p":"AgFAJQgEgDAAgEQgBgCACgFIAHgFQACgBAEAEQAFABAAAFQABACgCAEQgCADgGACIgBABQgCAAgDgCg","t":[3.1,-6.4],"fc":"#FFFFFF"},"259":{"p":"AgEAJQgEgCgBgFQgBgCACgFQADgDAEgBQACgBAEADQAFABAAAFQABACgCAEQgCAEgFABIgCABQgCAAgCgCg","t":[4,-3.1],"fc":"#E5FAFF"},"260":{"p":"AgEAJQgEgCgBgFQgBgCACgFQADgDAEgBQACgBAEACQAEACABAEQABAEgCADQgCAEgFABIgCABQgCAAgCgCg","t":[4.9,0.1],"fc":"#CAF5FF"},"261":{"p":"AgEAJQgEgCgBgFQgBgDACgEQADgDAEgBQACgBAEACQAEACABAEQABAEgCADQgCAEgFABIgCABQgBAAgDgCg","t":[5.8,3.5],"fc":"#B0EFFF"},"262":{"p":"AgEAJQgEgCgBgFQgBgDACgEQADgDAEgBQACgBAEABQAEADABAEQABAEgCADQgCAEgFABIgCABQgBAAgDgCg","t":[6.7,6.8],"fc":"#95EAFF"},"263":{"p":"AgFAIQgEgCAAgEQgBgDADgEQACgEAFAAQACgBADACQAEACABAFQABACgCAEQgDAEgEABQgDAAgEgCg","t":[12.4,26.7],"fc":"#FFFFFF"},"264":{"p":"AgFAIQgEgCAAgEQgBgCADgFQACgDAFgBQACgBADADQAEABABAFQABADgCADQgDAEgEABIgBAAQgCAAgEgCg","t":[11.6,22.6],"fc":"#FFFFFF"},"265":{"p":"AgFAIQgEgCAAgEQgBgCADgFQACgDAFgBQABgBAEADQAEABABAFQABADgCADQgDAEgFABIAAAAQgCAAgEgCg","t":[10.8,18.5],"fc":"#FFFFFF"},"266":{"p":"AgFAIQgDgCgBgEQgBgCADgFQACgDAFgBQABgBAEADQAEABABAFQABADgCADQgDAEgFABIgBAAQgBAAgEgCg","t":[9.9,14.3],"fc":"#FFFFFF"},"267":{"p":"AgEAJQgEgCgBgEQgBgDACgEQACgEAEgBQADgBADABQAEADACAFQABACgCAEQgCAEgFABIgCABQAAAAAAAAQgBgBgBAAQAAAAgBAAQAAgBgBAAg","t":[23.2,13.6],"fc":"#95EAFF"},"268":{"p":"AgDAJQgFgCgBgEQgBgDACgEQACgEAEgBQADgBADABQAEADACAFQABACgCAEQgCAEgFABIgCABQAAAAAAAAQgBgBAAAAQgBAAAAAAQgBgBAAAAg","t":[20.1,12],"fc":"#95EAFF"},"269":{"p":"AgDAJQgFgCgBgFQgBgCACgEQACgEAEgBQADgBAEABQADADACAEQABACgCAFQgCAEgEABIgDABQAAAAAAAAQAAgBgBAAQgBAAAAAAQgBgBAAAAg","t":[17,10.5],"fc":"#95EAFF"},"270":{"p":"AgDAJQgFgCgBgFQgBgCACgEQACgEAEgBQACgBAFABQAEADABAEQABACgCAFQgCAEgEABIgDABQgBAAgCgCg","t":[13.9,8.9],"fc":"#95EAFF"},"271":{"p":"AgDAJQgFgDgBgEQgBgCACgEQACgEAEgBQACgBAFABQAEADABAEQABACgCAFQgCADgEACIgDABIgDgCg","t":[10.8,7.3],"fc":"#95EAFF"},"272":{"p":"AgBAKQgEgBgDgEQgCgEABgCQABgEAEgDQAEgCACABQAEABADAEQACADgBADQgBAEgDADQgDABgDAAIgBAAg","t":[3.7,24.6],"fc":"#FFFFFF"},"273":{"p":"AgBAKQgEgBgDgEQgCgEABgCQABgEAEgDQAEgCACABQAEABADAEQACADgBADQgBAEgDADQgDABgDAAIgBAAg","t":[4.4,21.2],"fc":"#E5FAFF"},"274":{"p":"AgBAKQgEgBgDgEQgCgEABgCQABgEAEgDQAEgCACABQAEABADAEQACADgBADQgBAEgDADQgEACgCAAIgBgBg","t":[5.1,17.8],"fc":"#CAF5FF"},"275":{"p":"AgBAKQgEgCgDgDQgCgEABgCQABgFAEgCQAEgDACACQAEAAADAEQACAEgBADQgBAEgDACQgEADgCAAIgBgBg","t":[5.8,14.5],"fc":"#B0EFFF"},"276":{"p":"AgCAKQgEgCgCgDQgDgEACgCQABgFAEgDQADgCADACQAEAAADAEQACAEgBADQgBAEgEACQgDADgCAAIgCgBg","t":[6.6,11.1],"fc":"#95EAFF"},"277":{"p":"AAAAKQgEAAgDgEQgDgEABgCQAAgFAEgCQAEgCACAAQAEABAEADQADAEgCACQAAAFgEACQgDACgDAAIAAAAg","t":[21.8,-2.9],"fc":"#FFFFFF"},"278":{"p":"AAAAKQgEAAgDgEQgDgEABgCQAAgFAEgCQAEgCACAAQAEABAEADQACAEgBACQAAAFgEACQgDACgDAAIAAAAg","t":[19.1,-0.8],"fc":"#E5FAFF"},"279":{"p":"AAAAKQgEgBgDgDQgDgEAAgCQABgFADgCQAEgCADAAQAEABAEADQACAEgBACQAAAFgEACQgDACgDAAIAAAAg","t":[16.4,1.3],"fc":"#CAF5FF"},"280":{"p":"AAAAKQgEgBgDgDQgDgDAAgDQABgEADgDQAEgCADAAQAEABAEADQACAEAAACQgBAEgEADQgDACgDAAIAAAAg","t":[13.6,3.4],"fc":"#B0EFFF"},"281":{"p":"AAAAKQgEgBgDgDQgEgDABgDQABgEADgDQAEgCADAAQAEABAEADQACAEAAACQgBAEgEADQgDACgDAAIAAAAg","t":[10.9,5.5],"fc":"#95EAFF"},"282":{"p":"AgEAJQgFgDAAgFQgBgCADgEQACgDAFgBQACgBAEADQAEADABAEQAAADgCADQgEAEgEAAIgBAAQgCAAgCgBg","t":[23.4,22.2],"fc":"#FFFFFF"},"283":{"p":"AgEAJQgFgDAAgFQgBgCADgEQACgDAFgBQACgBAEADQAEADABAEQAAADgCADQgEAEgEAAIgBAAQgCAAgCgBg","t":[20.5,20.2],"fc":"#E5FAFF"},"284":{"p":"AgEAJQgFgDAAgFQgBgCADgEQACgDAFgBQACgBAEADQAEADABAEQAAADgCADQgEAEgEAAIgBABQgCAAgCgCg","t":[17.7,18.2],"fc":"#CAF5FF"},"285":{"p":"AgEAJQgFgEAAgEQgBgCADgEQACgEAFgBQACAAAEADQAEADABAEQAAACgCAEQgEAEgEAAIgBABQgCAAgCgCg","t":[14.8,16.2],"fc":"#B0EFFF"},"286":{"p":"AgFAJQgEgEgBgEQgBgCAEgEQACgEAEgBQADAAAEADQADADABAEQABACgDAEQgDAEgEAAIgBABQgCAAgDgCg","t":[12,14.3],"fc":"#95EAFF"},"287":{"p":"AgDAKQgEgCgCgEQgBgEABgCQADgEAEgDQACgBAEABQAFADABAEQACACgDAEQgBAEgEACIgEAAIgDAAg","t":[12,-9.3],"fc":"#95EAFF"},"288":{"p":"AgDAJQgEgBgCgEQgBgEABgCQACgFAFgCQACgBAEABQAEACACAFQACACgDAEQgCAEgEACIgDAAIgDgBg","t":[10.7,-6.1],"fc":"#95EAFF"},"289":{"p":"AgDAJQgEgBgCgEQgBgEABgDQACgEAFgCQACgBAEABQAEACACAFQACACgDADQgCAFgEACIgDAAIgDgBg","t":[9.4,-2.9],"fc":"#95EAFF"},"290":{"p":"AgDAJQgEgBgCgEQgBgEABgDQACgEAFgCQACgBAEACQAEABACAEQABADgBADQgDAGgEABIgDAAIgDgBg","t":[8.1,0.2],"fc":"#95EAFF"},"291":{"p":"AAAAKQgFAAgDgEQgCgEABgCQAAgEAEgDQADgDADABQAFAAACAEQADAEAAACQgCAFgDACQgDACgDAAIAAAAg","t":[24.6,9.1],"fc":"#FFFFFF"},"292":{"p":"AAAAKQgFAAgDgEQgCgEABgCQAAgEAEgDQADgDADABQAFAAACAEQADAEAAACQgCAFgDACQgDACgDAAIAAAAg","t":[21.2,8.7],"fc":"#E5FAFF"},"293":{"p":"AAAAKQgFAAgDgEQgCgEABgCQAAgEAEgDQADgDADABQAFAAACAEQADAEAAACQgCAFgDACQgDADgDAAIAAgBg","t":[17.7,8.2],"fc":"#CAF5FF"},"294":{"p":"AAAAKQgFgBgDgDQgCgEABgDQAAgEAEgDQADgCADAAQAFABACAEQADADAAADQgCAFgDACQgDADgDAAIAAgBg","t":[14.3,7.8],"fc":"#B0EFFF"},"295":{"p":"AAAAKQgFgBgDgDQgCgEABgDQAAgEAEgDQADgCADAAQAFABACAEQADADAAADQgCAFgDACQgDADgDAAIAAgBg","t":[10.8,7.4],"fc":"#95EAFF"},"296":{"p":"AgGAHQgEgDAAgEQABgEADgCQADgEADABQAEgBAEAEQADADAAADQgBAFgDADQgDACgEAAIAAAAQgEAAgCgDg","t":[-11.9,6.1],"fc":"#FFFFFF"},"297":{"p":"AgGAHQgEgDAAgEQABgEADgCQADgEADABQAEgBAEAEQADADAAADQgBAFgDADQgDACgEAAIAAAAQgEAAgCgDg","t":[-8.5,6.3],"fc":"#E5FAFF"},"298":{"p":"AAAAKQgDABgDgEQgEgDAAgEQABgEADgCQADgEADABQAEgBAEAEQADADAAADQgBAFgDACQgDADgEAAIAAAAg","t":[-5,6.5],"fc":"#CAF5FF"},"299":{"p":"AAAAKQgDABgDgEQgDgDgBgEQABgEADgCQADgEADABQAFgBADAEQADADAAADQAAAFgEACQgDADgEAAIAAAAg","t":[-1.6,6.7],"fc":"#B0EFFF"},"300":{"p":"AAAAKQgDAAgDgDQgDgEgBgDQABgEADgDQADgDADAAQAFAAADAEQADADAAADQAAAEgEADQgCAEgFAAIAAgBg","t":[1.8,6.9],"fc":"#95EAFF"},"301":{"p":"AgCAKQgFgCgCgEQgBgEABgDQADgEAEgCQACgBAEABQAEACACAEQACADgCAEQgCAEgEABIgEABIgCAAg","t":[-2.8,26.8],"fc":"#95EAFF"},"302":{"p":"AAAAHQgDAAgCgCIgBgCIgBgDIAAAAIABgBIACgBIADgDIABAAIABgBIABAAIABAAIABAAIABABIAAgBIABABIABABIAAABIAAgBIAAAAIAAAAIAAAAIAAAAIAAACIABACIgBACIgCADIgBABIgEABIAAAAg","t":[-1.4,23.7],"fc":"#95EAFF"},"303":{"p":"AgBAGIgBgBIgDgDIAAAAIABgBIABgBIADgBIAAAAIABgCIABgBIABAAIAAAAIABAAIAAAAIAAAAIACACIAAABQAAABAAAAQAAAAAAAAQAAAAAAAAQAAAAAAABIAAABIgDADIgBABIgCAAIgBAAgAAEgEIABAAIAAAAIAAAAIgBAAgAAEgFIAAAAIAAAAIAAAAIAAABIAAAAIAAgBg","t":[0,20.5],"fc":"#95EAFF"},"304":{"p":"AgEAGIgBAAIABgBIACgBIACgCIAAgBIAAgBIAAAAIABgBIAAAAIAAgBIAAAAIABgBIgBAAIAAgBIgBgBIAAgBIAAAAIAAgBIACACIABABQABAAAAAAQABABAAAAQAAABABAAQAAABAAAAIAAABIgBAEIgBABQgBABAAAAQAAAAgBABQgBAAAAAAQgBAAAAAAIAAABIgEgCgAAAgHIAAAAIAAAAg","t":[1.4,17.3],"fc":"#95EAFF"},"305":{"p":"AgGAKIABgBIACgBIACgDIABgCIAAgDIAAAAIAAAAIAAgBIAAgBIgBgBIAAgBIgCgCIgBgCIgBgBQADgBACABQAEACACAEQABADgCAEQgBAEgEACIgCABIgEgBg","t":[3.1,14.1],"fc":"#95EAFF"},"306":{"p":"AgEAJQgEgCgBgEQgCgDACgEQADgEAEgBQADgBAEACQAEACABAFQABACgCAEQgDAEgEABIgCAAQgBAAgDgBg","t":[-7.9,-2],"fc":"#95EAFF"},"307":{"p":"AgEAJQgEgCgBgFQgCgCACgEQADgEAEgBQADgBAEACQAEACABAFQABACgCADQgDAFgEABIgCAAQgBAAgDgBg","t":[-5,-0.2],"fc":"#95EAFF"},"308":{"p":"AgEAJQgEgCgBgFQgBgCACgEQACgEAFgBQACgBAEACQAEACABAFQACACgDADQgCAFgFABIgCAAQgBAAgDgBg","t":[-2,1.5],"fc":"#95EAFF"},"309":{"p":"AgEAJQgEgCgBgFQgBgCACgEQACgEAFgBQACgBAEACQAEACABAFQACACgDADQgCAFgEABIgDAAQgCAAgCgBg","t":[3.8,5.1],"fc":"#95EAFF"},"310":{"p":"AgHAHQgCgDAAgEQAAgDACgDQAEgEADAAQAEAAADAEQAEADgBADQABAEgEADQgDAEgEAAQgDAAgEgEg","t":[-7,20.3],"fc":"#FFFFFF"},"311":{"p":"AgHAIQgCgEAAgEQAAgDACgDQAEgDADAAQAEAAADADQADADAAADQAAAEgDAEQgDACgEAAQgDAAgEgCg","t":[-4.5,17.9],"fc":"#E5FAFF"},"312":{"p":"AgGAHQgDgDgBgEQABgDADgEQADgDADAAQAEAAADADQADAEABADQgBAEgDADQgDADgEAAQgDAAgDgDg","t":[-2,15.5],"fc":"#CAF5FF"},"313":{"p":"AgGAHQgEgDAAgEQAAgDAEgDQADgEADAAQAEAAADAEQAEADAAADQAAAEgEADQgDAEgEAAQgDAAgDgEg","t":[0.4,13.1],"fc":"#B0EFFF"},"314":{"p":"AgHAIQgDgEAAgEQAAgDADgEQAEgCADAAQAEAAADACQADAEAAADQAAAEgDAEQgDACgEAAQgDAAgEgCg","t":[2.9,10.7],"fc":"#95EAFF"},"315":{"p":"AgHAHQgDgDAAgEQAAgDADgEQAEgCADAAQAEAAADACQAEAEAAADQAAAEgEADQgDADgEAAQgDAAgEgDg","t":[-10.4,22.2],"fc":"#FFFFFF"},"316":{"p":"AgIAZQgagKgWgPQgOgJgJgIQgFgFgFgGQgFgGgEgHIAagNIAGAIIAIAIQAFAGANAKQASANAXAJQAuAUA0AGIgEAdQg9gLgqgTg","t":[29.2,34.7,1,1,-25.1],"fc":"#1D2226"},"317":{"p":"ABYCjQgfAAgfgGQgegHgagMQg7gagngvIgFgFIgDgEIgDgHIgCgHIAHgKIAsg1QAfgnARgTIAYgdIAMgPIANgPQAUgRAUgFQALgDAOABQAHAAAFACIAGACIAFACIAAAAQAZAMALAXQAKAUAAAYQABAQgEAZIgmDHgAA2h6QgOABgNAIIgNALIgMANIgVAdIhWBqIAAAAQAjApA0AYQAXALAbAFQAUAFAXABIAOg/QAJgpAGgfIAHg4IgBgRQgCgRgIgLQgIgKgNgEIgEgBIgJgDIgJgBIgDAAg","t":[27,32,1,1,-25.1],"fc":"#1D2226"},"318":{"p":"AgvAdQgDgBAphHIA5AOIgGBKQhAgKgZgGg","t":[35.4,39.5,1,1,-25.1],"fc":"#AF4F00"},"319":{"p":"AgpBTQAUgfARgmQAghLgOgkQAUAHAGA3QAEAqgFAiQgFAfgSAag","t":[32.8,26.5,1,1,-25.1],"fc":"#7E7E7E"},"320":{"p":"AgwAMIAagWQAagZADgIQAXAKAUAFIghBIQg3gVgKgLg","t":[30.5,40.4,1,1,-25.1],"fc":"#E28600"},"321":{"p":"AgHBgIgogLQAXghAQgnQAfhMgdgcQAPgIATAGQARAGADAJQACAHgTBGQgTBBgIARQgEANgEACIgBAAIgCAAg","t":[30.4,26.6,1,1,-25.1],"fc":"#8C8C8C"},"322":{"p":"Ag+AfQgjgZgRgYIAxhAQAZAqBOAfQApANAjAHQAEgCgWBKQhaAAhEg0g","t":[28.8,38.4,1,1,-25.1],"fc":"#FBA40B"},"323":{"p":"AgvBmQhJgpgFgTQANgUBwiDQAPgUATgJQAagMAbALQAuAUgJBIQgQBYgVBoIgFAAQg1AAhMgrg","t":[27.2,32.2,1,1,-25.1],"fc":"#BABABA"},"324":{"p":"AgBAjQgRgBgWgJQgRgGAAgBIAKgUIABAAIAQAFQARAGANACQANADAJgEQAFgBADgDIACgDIgCgCQgDgBgMgRQgMgRgCgBIAOABQASAJAGAFQAHAEAFAGIAFAIQACADAAAFIgBACIAAACIgBABQgFAJgGAFQgKAJgOABIgLABIgLgBg","t":[32.1,47.2,1,1,0,25.2,-154.7],"fc":"#1D2226"},"325":{"p":"AAGAcQAFgHgHgIQgEgEgUgMQgPgJgCgQIAVACQAYAHAYAWQALAMgIAIQgGAGgOAAIgJgBg","t":[32.2,45.7,1,1,0,25.2,-154.7],"fc":"#EAB28C"},"326":{"p":"AAGBaIgOgEIAAABIgCgBQgKgBgMgEQgdgIgSgQQgNgLgGgPQgHgQADgSQAEgmAogxIAYATQgkArgCAcQgCAQAIALQAHAJAIAFQAMAHATAFIAMADIAEABIACAAIACABIAJACQAXADAUgQQANgKAEgOQADgJABgIQABgKgBgIIAdgFQADALgCAQQgCAMgDAJQgIAYgTAQQgZAUgdAAIgLgBg","t":[29.9,44.1,1,1,0,25.2,-154.7],"fc":"#1D2226"},"327":{"p":"AgQAeQgVgGgHgQQgGgNAGgRQAFgNANACQAJABAZAKQAaAJAHAFQALAHgFAMQgFAQgTAFQgIACgIAAQgKAAgNgEg","t":[32.4,46.6,1,1,0,25.2,-154.7],"fc":"#FFCDAB"},"328":{"p":"AAIA/QgPgEgzgTQgdgLASgvIAYguIALAMQAMANADAJQAIA5AsAJQAXAFAVgIQgIAggnAAQgKAAgMgCg","t":[30.8,45.4,1,1,0,25.2,-154.7],"fc":"#EAB28C"},"329":{"p":"AgDA1QgbgDgZgiQgXgfACgYQACgRAaAFIA0ANQAUACAgAAQAXADgCARQgDAWgZAYQgYAXgZAAIgDAAg","t":[26.4,45.7,1,1,0,25.2,-154.7],"fc":"#FFCDAB"},"330":{"p":"AhVAgQAugFAjgQQARgIAPgLIAOgNIAIgKIABgDIAjAXIgFAGIgPAKQgMAIgJAEQgUAJgYAFQgUAEgYAAQgUAAgWgDgAAzgiIAAAAg","t":[29.6,42.3,1,1,0,0,180],"fc":"#1D2226"},"331":{"p":"AAAAcQgSgEgTgIQgLgFgHgFIgJgGIgKgGIAigZIAIALIAMALQANAJANAIQAeAQAnAHIgdABQgYAAgWgEg","t":[51.9,39.9,1,1,0,0,180],"fc":"#1D2226"},"332":{"p":"AhpBRQgfgIgXgPQgMgHgMgMIgLgMQgHgKgCgHIgCgEIABgHQAFgPAAgPIgCgPIgCgHIgDgFIAlgVIAJAYQACALABALQAAASgEASIAAABIAGAJQAHAIAJAIQATAOAYAIQApAPA6gBQBCgCAkgLQAbgIAOgNQAKgLAGgUQgHgVgFgTIgIglIgBgPIAqAAIADATIAFAXQAFAVAIAXIADAGIgDAGIgOAaQgIAOgOALQgVARgiAIQgnAJhGACIgRAAQgzAAgpgMg","t":[39.7,43.3,1,1,0,0,180],"fc":"#1D2226"},"333":{"p":"AhbAeQgcgIgRgIIgVgLQgOgGgIgHIAegeQAFAHAIAHIAQAMQATAMATAFQAmAPAsgBQAqgCAqgPQArgOAhgaIAUAlQg2AUgiAJQgxANgrABIgNABQgnAAgngLg","t":[40.2,35.2,1,1,0,0,180],"fc":"#1D2226"},"334":{"p":"ABpEuQgJgBghgLQgtgSgZADQgOABgWAHIgmANIgUAGQgKACgNAAIgpgBQgtgEglgLQgtgPgegYQgkgbgSgoQgJgVgEgVQgDgLAAgKQgBgPAEgLQAGgWAWgQQASgNAVgJQARgGAZgGQAXgDAQAAIAagJIAAgLQABgOAEgLQADgzAHgtIAJgyQAHghAJgRQAIgPAHgJQAJgLAMgIQAUgPAcgKQAvgOA1ADQAzACAxAQQAZAJAXALIAqAaIABABIABAAIAAABQArAoAWAnQAMAYAGAZQAFAZgEAcIAAABIAAAAQgFASgQAOQgQANgSAAQgUACgPgQQgLgKgIgTIAAgCIAAgBQgCgKADgIQACgHAGgDQAFgCAFAAIAKAAQAEgBAAgHIgBgIIAAgBIgDgBIgGgCQgKgCgMADQgWAGgEAWQgCAKACAMIABAIIAIAhQAaAEAWAHQARAEANAGIAVANIADACQAzAHAbALQAZALANAQQAJAMAEAMQADALgBANQgCArgYAoQgWAkgnAYQg/AphgADIgfABQgGAAgFgCgAk2BAQgVAHgLAIQgQALgDAMQgCAEABALIABASQAEARAHASQAOAgAfAaQA0AqBaAGQATACAUAAIARgCIASgEIAmgOQAXgHATgCQAUgBAWAFQASAFAWAIQAaAJAJACIAmAAQBagDA4glQAhgWASgfQATggACglQAAgQgJgLQgIgKgTgIQgagJgwgFIgEAAIgQgJIglgQQgYgHgegGIgMgCIgFgSIgDgTIAAgBIgBgEIAAgCIgBgLIgBgPQABgRAFgNQAGgQANgKQANgKAQgBQAPgBAOAEIAHAEQAFADACADIACAFIAAAEQABADgBAEQgBAJgGAGIgOAJIgCACIAAABIAAAGQAGANAIAHQAJAJAKgBQAKAAAKgJQAJgHADgLQAGgtgYgqQgUgkgogiIgJgGIgfgRQgWgMgVgFQgtgPgvgCQgxgBgoANQgwARgQAiQgIARgGAaIgIAvQgGAwgDAwIgBAFQgDAJgBAJIAAAiIg2ARIgDAAIgFAAQghAAgiANgACaggIAAAAIABABIgBgEg","t":[37.8,33.3,1,1,0,0,180],"fc":"#1D2226"},"335":{"p":"AiIBUIBKgLQBCgRgYgYQBEgPgDgfQgDgagagLIBaggIAfBlQAAASgiASQg9AeiPAAIgjAAg","t":[34.5,42.4,1,1,0,0,180],"fc":"#AF4F00"},"336":{"p":"AglBLQg0AAgkgZIArgLQApgQgPgbQASgGAKgWQAJgTgEgGQAzAAAsgJQAXgEALgEIAIAOQAIARACASQAKA3gsAlQhZAIghAAIgFAAg","t":[39.7,43.5,1,1,0,0,180],"fc":"#E28600"},"337":{"p":"AAABnQhhgFgygdQgdgRgHgVQAEgOACgQIABgLIgDggQgCgkAHgTIAIALQALAOAQAMQA0AlBQgCQBPgBAzgmQAagTAJgTIAEAZQAEAdgCAQQAOAZAHAhQgGAVgbAUQgwAkhXAAIgRAAg","t":[39.7,40.6,1,1,0,0,180],"fc":"#FBA40B"},"338":{"p":"AghBqQgngKACg8QACg2AQgyIAPgnIADAeQAFAlAJAgQAcBjA/AKQg5AHgaAAQgOAAgHgCg","t":[50.9,28.3,1,1,0,0,180],"fc":"#7E7E7E"},"339":{"p":"AiFBqQADgkAJgiQAchlBFgFQAZgDAPADIAeAIQAMgRAEgKQAHgTgegdQAxApAbAxQAhA6gWAoQgYAWgZgHQgagIgMgpQAZgGAJgLQAHgHgFgJQgJgMggAEQgiAEgEAeQABAOAGAoQAAAkglAMQg/AVgjAGQgDgBACggg","t":[23.7,24.3,1,1,0,0,180],"fc":"#7E7E7E"},"340":{"p":"Ai7BYQgRg0gBgwQgCgvANgVIATBPQAZBOAhADQAhADAaguQAZg2ALgVQAVgnAmgVQAigSAZADQAWAAgZgdQgOgPgSgLQBIAeASAJQAoAVAPAcQADAZgPAQQgOAOgYAAQgbAAglAYQgqAZgHAiQgIApgbAgQgcAjglACIgPABQhZAAgahRg","t":[34.7,23.7,1,1,0,0,180],"fc":"#8C8C8C"},"341":{"p":"AjhCiQgHg4gBhFQAAiHAkg9QAjhBB0gBQBygBBTA+QA6AyASA2QAKAegEAiQgHAdgdAHQghAIgSgsQgIgJACgGIAEgEIARADQARgDgFgaQgBgGgOgDQgQgDgOAFQgrAPANBBQAJAsAUAuQARAmgBACQgCAGgYARQggAWgoAKQgiAJghAAQhgAAhrhAg","t":[33.8,27,1,1,0,0,180],"fc":"#BABABA"},"342":{"p":"ACVBUQhNgBg/gcQghgQhrgPQhlgPggAEIAJgKQAcgDAggXQAPgLADgQQAEgPgHgQQBggGBwAPQA4AIAmAJIBnAlQApAPAAAXQAAAOgMAZQgdAZhHAAIgFAAg","t":[26.7,41.5,1,1,0,0,180],"fc":"#7E7E7E"},"343":{"p":"AhFAAQgSgNgdgLIgYgIIAWgyIECASQAFAngrArQg7A9hvAEQA7grg8gog","t":[14.6,53.2,1,1,0,0,180],"fc":"#8C8C8C"},"344":{"p":"AB2CVQgOAAgogOQgogPgYAAQgVAAgqAPQgqAOgPAAQiHADhFhAQg2gxAAhEQABgkA1gXQAugUApADQBIgYAmgIQA4gMBHAAQBXAAA6AKQBJALAmAcQA0AFAcAMQAqASAAAkQAABDg3AyQhDA+iAAAIgKgBg","t":[37.8,47.4,1,1,0,0,180],"fc":"#BABABA"},"345":{"p":"AgrCzIgIgZIgHgYQgFgZgCgXQgEgyALgsQALguAZgrQASghAkgtIAagaIADAlQAFA9ABAdQACAygFAnQgHAzgQAoQgTAvgfAiIgWAXgAgChZQgZAngIArQgIApAHAsQAEAUAIAXIAEAKQAQgVAIgXQAPgkAHgtQAFgkAAgwIgDg1QgSASgMAYg","t":[26.2,21.4],"fc":"#1D2226"},"346":{"p":"AgyA8QgGh/BmhkQAJBzgHA3QgNBpg5A8QgYgsgEhAg","t":[26.1,21.2],"fc":"#FFFFFF"},"347":{"p":"AAQBIQARgoAFgUQAHgWAAgHQADgPgEgIQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAgBAAQgDgBgDAAQgIgBgPAIQgXAOgRAaIgBABIAAABQgFAFgGAMIgJASQgEAJgCAJIAAAMIAAAFIgcAHIgCgGIgBgHIgBgPQACgMAEgOQADgLAGgMQAFgJAHgMQATgjAigVQAVgNAUgBQAQAAAMAGQAOAJAGAPQAIASgDAbQgCAOgHAWQgNAogcAYg","t":[9.5,14.6,1,1,0,12,-167.9],"fc":"#1D2226"},"348":{"p":"AgOALQAShLgdgBQBBgnACAdQACAOgSA5QgRA0gGAJQgIAPgTAJQgKAFgHACQAQgmALgng","t":[6.1,16.4,1,1,0,12,-167.9],"fc":"#7E7E7E"},"349":{"p":"AggBYQANghAHgiQANhCgVgFQAVgeAPgHIAKAQQAJATgDARQgGAggJAhQgLAwgGAEQgKAGgOAAIgIAAg","t":[8.9,17,1,1,0,12,-167.9],"fc":"#8C8C8C"},"350":{"p":"AgtBUQgRgJgEgMQgGgWAPglQAHgRAJgOQALgaAXgSQAUgQAVgBQAzgDgXBRQgWBJgmAUQgLAGgMAAQgMAAgMgFg","t":[9.1,16.9,1,1,0,12,-167.9],"fc":"#BABABA"},"351":{"p":"AgIAZQgagKgWgPQgOgJgJgIQgFgFgFgGQgFgGgEgHIAagNIAGAIIAIAIQAFAGANAKQASANAXAJQAuAUA0AGIgEAdQg9gLgqgTg","t":[17.4,37.7,1,1,0,26.7,-153.2],"fc":"#1D2226"},"352":{"p":"ABYCjQgfAAgfgGQgegHgagMQg7gagngvIgFgFIgDgEIgDgHIgCgHIAHgKIAsg1QAfgnARgTIAYgdIAMgPIANgPQAUgRAUgFQALgDAOABQAHAAAFACIAGACIAFACIAAAAQAZAMALAXQAKAUAAAYQABAQgEAZIgmDHgAA2h6QgOABgNAIIgNALIgMANIgVAdIhWBqIAAAAQAjApA0AYQAXALAbAFQAUAFAXABIAOg/QAJgpAGgfIAHg4IgBgRQgCgRgIgLQgIgKgNgEIgEgBIgJgDIgJgBIgDAAg","t":[19.7,35.1,1,1,0,26.7,-153.2],"fc":"#1D2226"},"353":{"p":"AgvAdQgDgBAphHIA5AOIgGBKQhAgKgZgGg","t":[11,42.3,1,1,0,26.7,-153.2],"fc":"#AF4F00"},"354":{"p":"AgpBTQAUgfARgmQAghLgOgkQAUAHAGA3QAEAqgFAiQgFAfgSAag","t":[13.9,29.4,1,1,0,26.7,-153.2],"fc":"#7E7E7E"},"355":{"p":"AgwAMIAagWQAagZADgIQAXAKAUAFIghBIQg3gVgKgLg","t":[15.9,43.3,1,1,0,26.7,-153.2],"fc":"#E28600"},"356":{"p":"AgHBgIgogLQAXghAQgnQAfhMgdgcQAPgIATAGQARAGADAJQACAHgTBGQgTBBgIARQgEANgEACIgBAAIgCAAg","t":[16.3,29.5,1,1,0,26.7,-153.2],"fc":"#8C8C8C"},"357":{"p":"Ag+AfQgjgZgRgYIAxhAQAZAqBOAfQApANAjAHQAEgCgWBKQhaAAhEg0g","t":[17.6,41.3,1,1,0,26.7,-153.2],"fc":"#FBA40B"},"358":{"p":"AgvBmQhJgpgFgTQANgUBwiDQAPgUATgJQAagMAbALQAuAUgJBIQgQBYgVBoIgFAAQg1AAhMgrg","t":[19.4,35.2,1,1,0,26.7,-153.2],"fc":"#BABABA"},"359":{"p":"AgBAjQgRgBgWgJQgRgGAAgBIAKgUIABAAIAQAFQARAGANACQANADAJgEQAFgBADgDIACgDIgCgCQgDgBgMgRQgMgRgCgBIAOABQASAJAGAFQAHAEAFAGIAFAIQACADAAAFIgBACIAAACIgBABQgFAJgGAFQgKAJgOABIgLABIgLgBg","t":[14.3,50.2,1,1,-26.6],"fc":"#1D2226"},"360":{"p":"AAGAcQAFgHgHgIQgEgEgUgMQgPgJgCgQIAVACQAYAHAYAWQALAMgIAIQgGAGgOAAIgJgBg","t":[14.1,48.7,1,1,-26.6],"fc":"#EAB28C"},"361":{"p":"AAGBaIgOgEIAAABIgCgBQgKgBgMgEQgdgIgSgQQgNgLgGgPQgHgQADgSQAEgmAogxIAYATQgkArgCAcQgCAQAIALQAHAJAIAFQAMAHATAFIAMADIAEABIACAAIACABIAJACQAXADAUgQQANgKAEgOQADgJABgIQABgKgBgIIAdgFQADALgCAQQgCAMgDAJQgIAYgTAQQgZAUgdAAIgLgBg","t":[16.4,47.1,1,1,-26.6],"fc":"#1D2226"},"362":{"p":"AgQAeQgVgGgHgQQgGgNAGgRQAFgNANACQAJABAZAKQAaAJAHAFQALAHgFAMQgFAQgTAFQgIACgIAAQgKAAgNgEg","t":[14,49.6,1,1,-26.6],"fc":"#FFCDAB"},"363":{"p":"AAIA/QgPgEgzgTQgdgLASgvIAYguIALAMQAMANADAJQAIA5AsAJQAXAFAVgIQgIAggnAAQgKAAgMgCg","t":[15.6,48.4,1,1,-26.6],"fc":"#EAB28C"},"364":{"p":"AgDA1QgbgDgZgiQgXgfACgYQACgRAaAFIA0ANQAUACAgAAQAXADgCARQgDAWgZAYQgYAXgZAAIgDAAg","t":[19.9,48.5,1,1,-26.6],"fc":"#FFCDAB"},"365":{"p":"AgFDgQiOgGgth0QgXg7AFg8QgIhVAsg1QAmguBHgPQA/gOBBAOQBBANAjAfQAiAfALBEQALBDgRBCQgUBKgxArQg0AvhNAAIgJAAg","t":[60.7,33.4],"fc":"#1D2226"},"366":{"p":"AjhALQghgMgagRQgSgMgCgDIAUgWIABAAIADADIANAJQAXAPAfAOQBhAoB3AAQB2AABegnQAugVAXgVIAVAWQgaAYgyAUQhkAth+AAQh9AAhngtg","t":[39.8,41.3,0.893,0.925],"fc":"#1D2226"},"367":{"p":"AgCAoQgogGgigPQgVgJgOgIQgYgMgKgJIAZgYQAIAKARAMQALAJATAKQAfAPAiAKQBEATBNgMQgzAOgwAAQgZAAgXgEg","t":[32.4,5.6,0.893,0.925],"fc":"#1D2226"},"368":{"p":"AhQAtIAAghIAAAAIASgCQASgCARgEQA1gNAdgkIAaAXQglAqg+AQQgiAJgcAAg","t":[48.8,13.2,0.893,0.925],"fc":"#1D2226"},"369":{"p":"AhcCNQgqgMgYgQQgqgegRgvQgGgPgDgPIAAgFIgDgBQgKgLgLgaIgBgDIgCgPQAAgRAIgNQAGgKALgIQAHgFAJgDIAIgDIATgFIABATIAAABIABADQADAGAEAGQASAXArAOQAnAMA7ADIATAAQBaAAAzgeQAggSANgdIAEgOIgBAAIADgcIAuAfIACAAIABABQAFAHAEALQACAHAAAKQAAASgHAYIgEAOIABANQAAAPgIAaIAAACIgBABQgUAigcAaIgXgaQAZgWAPgaQAGgSAAgMIgBgFIACACIgBgCIgBgBIAAABIgEgGIAEgJIAAAAIAAgBIABgDIAFgNQAFgSAAgOIgBgIIgBgCIgIAPQgbArg8AUQgxAQhIAAIgUAAQhagCg0gbQgigSgQgbIgGAHQgDAGAAAGIABAIQAIAUAGAFIgDgBIAEACIgBgBIAKACIABAPIABAFQACAJAFAPQAOAlAhAYQASANAlAKQAoAKAsAAQAUAAARgCIADAiQgSACgWAAQgvAAgugLg","t":[38.8,3.4,0.893,0.925],"fc":"#1D2226"},"370":{"p":"AgpBMQAdg2gIg0QAYgTAggiIAjgkQAFAPgFAaQgEAZgGAEQAHAogcAsQglA8hMAZQARgQAPgcg","t":[52.9,4.6,0.893,0.925],"fc":"#AF4F00"},"371":{"p":"Ah+BPQAUgEATgJQAlgUgGgcQAYgSAQgUQAQgVAAgOQAmgEAxgQQAYgIAQgHQABAbgEAfQgHA9gWAYQg6AmhKAAQgqAAgvgMg","t":[43,7.2,0.893,0.925],"fc":"#E28600"},"372":{"p":"AhOB4QgugKgYgRQglgagQgrIgJgkQgDgBgEgFQgJgKgJgWQgFgbATgQQAKgIAKgDIAEAMQAHAPAPAMQAwAoBtADQCHAFA8g3QAdgbACgdIAWAPQALAMgHAiQgEARgGAPIADALQABAPgJAYQg6BoiKAJIgXABQgnAAgngJg","t":[38.8,3.9,0.893,0.925],"fc":"#FBA40B"},"373":{"p":"AgfEpQhIAAg8gPQhegWg6g4IgFgFIAAgIQANigAhhqIhfhDIAJgNIAYgiQAfgoAXgWQAZgXATgJIAHgDIAHADQBzA4BoAAQBaAABTgtIAfgQIAOgHIAJgBIAGAAQAZAIAbAXQATAQAXAcQAYAfAQAcIAIANIgMAJQgmAfgsAbQAtCGAKCIIABAIIgGAGQg4A4hfAYQg/APhIAAgAkAjlQgOANgTAXQgVAagMARIBNA1IAMAHIgFANQgiBlgNCiQAyAsBQATQA4AOBEAAIBHAAQBEAAA7gOQBRgUAxguQgMiFguiGIgEgNIAMgHQAogXAmgfIgOgVQgcgngZgWQgUgQgQgGIgQAIQgbAQgUAJQhPAkhVAAQhuAAh0g4QgLAHgOANg","t":[39.6,24.5,0.893,0.925],"fc":"#1D2226"},"374":{"p":"AirAdQgwgQgogWIgIgEIAGgNIABgCIAAgSIAEABIACAAIABABIACABIABABIARAJQAWAMAcAMQBTAfBaAAQCFAAB/hNIASAcQiHBTiPAAQhSAAhPgbg","t":[40.1,19.5,0.893,0.925],"fc":"#1D2226"},"375":{"p":"AgnAJQACgYAEgQIACgLIA/AhIAHA0Qg+gVgQgNg","t":[20.6,44,0.893,0.925],"fc":"#E28600"},"376":{"p":"AgSAMIgKg1IA5AZIgIA6g","t":[15.3,41.6,0.893,0.925],"fc":"#AF4F00"},"377":{"p":"AjtAUQg0gcgggeIAVgWIAAABIAAAAIAFADIAPANQAcAWAeARQBjA1BogBQAXAAATgCQBMgMBSglQBBggAqggIANgKIAVAUQgHAIgJAGIgYARQgjAXghAPQhjAzhYANIAAAAQgUACgaAAQhwAAhqg6g","t":[40.2,11.8,0.893,0.925],"fc":"#1D2226"},"378":{"p":"AiBgTIAegdIBiAYQBlAYAaAAQAQAbgwAOIgyAIQimg2gHgOg","t":[31.1,18.5,0.893,0.925],"fc":"#E28600"},"379":{"p":"AgZgTIA5goIAIBAQgfAagwAdQAIgHAGhIg","t":[63.6,41.8,0.893,0.925],"fc":"#AF4F00"},"380":{"p":"AgYgNIA9gcIgHA6IhCAZg","t":[57.9,44.6,0.893,0.925],"fc":"#E28600"},"381":{"p":"AhlA8IgGgBIgighQAlABAPgBQAdgCAVgGQAVgEAVgHQA+gTAwgwIAdAcQg4A2hGAXQgvAQguAAIgYgBg","t":[55.4,43.5,0.893,0.925],"fc":"#FBA40B"},"382":{"p":"AiFAoQANghAngDQAngDBOgkQAogSAggTIAHAPQAKARAPAJQg2Ayh1AgIhsAVQgBgPAHgRg","t":[53.5,16.2,0.893,0.925],"fc":"#AF4F00"},"383":{"p":"AgDBRQh8AAh0hCQg6gfghgiIAdgcIAVASQAiAbAbAPQBqA7ByAAQCdAACch5IAZAfQimCCiqAAIgCAAg","t":[39.3,14.1,0.893,0.925],"fc":"#FBA40B"},"384":{"p":"AgwBEIgHgVQArhIAVg1QAFgBAJAEQABBHAgAoQgTAMgtAaQgLAFgJAAQgNAAgHgLg","t":[59.2,7.8,0.893,0.925],"fc":"#7E7E7E"},"385":{"p":"AAAByQh8ADhvg+Qg3gfgegdQANgTASgVQAjgrAXgKQAXgLBrAXQA1ALAwANIBYgeQBhgcAnAKQAmALAiAwQAQAYAJAWQgeAdg3AfQhpA7h2AAIgNAAg","t":[39.4,8.7,0.893,0.925],"fc":"#BABABA"},"386":{"p":"AgZgOIgeh7IAEgIQAMgNAogSQAZAtARCEQAJBCAEA6QACAAgKAIQgSANg4AgQAag7gZiFg","t":[62.2,30.7,0.893,0.925],"fc":"#7E7E7E"},"387":{"p":"AAoA5IgTABQgsAAgwgPQhKgXg5g2IAcgcQA0AxA/ARQAPAGAMABQANAGATACIAhABICJAFIAhAmg","t":[30,43.7,0.893,0.925],"fc":"#FBA40B"},"388":{"p":"AgCgIQgDgsgMgxIgLgpIAEgGQAJgJAUgMQALACASA+QAaBVALCHQgLAKggAMIhjAhQBNgmgIiMg","t":[56.5,34.3,0.893,0.925],"fc":"#8C8C8C"},"389":{"p":"AgwCFIgHgIQAEg6AIhCQASiEAZgtQAoASAMANQAFAGgCACIgeB7QgYCFAZA7Qg4gggSgNg","t":[17.4,30.7,0.893,0.925],"fc":"#7E7E7E"},"390":{"p":"AgbCJQgggMgLgKQALiHAahVQASg+ALgCQAUAMAIAJQAFAEAAACIgLApQgMAxgDAsQgICMBMAmIhighg","t":[23,34.3,0.893,0.925],"fc":"#8C8C8C"},"391":{"p":"ABJDqQgjgjgmAAQgkAAgkAjQhDAEg/gbQg2gXgsgpQAKh5AuiNQAXhHAVgwQBQAiAwADQAaACAsgKIA/AEQA0gDBYgeIAsB3QAuCNAKB5QgsApg2AXQg4AYg6AAIgQgBg","t":[39.9,25.3,0.893,0.925],"fc":"#BABABA"},"392":{"p":"Ai3AiQgZgLgRgNIgLgKIglhBIIjAUQgJAbgjAaQhHA3iFADIgVAAQh0AAhIggg","t":[39.8,44.6,0.893,0.925],"fc":"#35322D"},"393":{"p":"ADbg8QAJgagBgPIgDgLQAGgPAEgRQAHgigLgMIgVgPQgCAdgeAbQg8A3iHgFQhtgEgwgnQgPgMgHgPIgEgMQgKADgKAIQgTAQAFAbQAJAWAJAKQAEAFADABIAJAmQAQArAlAYQAbASAyALQA5ALA1gGIAXCmICTghIgii8QAbgYARgfg","t":[39,9.1,0.898,0.898],"sc":"#1D2226","ss":[3.4]},"394":{"t":[52.8,49.2,1.099,1.099],"p":"AglA1QgPgWAAgfQAAgdAPgXQAQgWAVAAQAWAAAQAWQAPAXAAAdQAAAfgPAWQgQAWgWAAQgVAAgQgWg","fc":"#FFFFFF"},"395":{"t":[74.7,46.5,1.099,1.099],"p":"AgcAwQgNgUAAgcQAAgbANgUQAMgUAQAAQARAAAMAUQANAUAAAbQAAAcgNAUQgMAUgRAAQgQAAgMgUg","fc":"#FFFFFF"},"396":{"t":[47.6,51.4,1.099,1.099],"p":"AjNETQhMhDgehzQgbhmARhpQARhoA1gwQA1gwBlgVQBmgVBhAWQBtAYA7BGQBFBSgNCEQAIBegjBaQhHCzjaAJIgPAAQh3AAhRhHg","fc":"#1D2226"},"397":{"t":[31.3,33],"p":"AhtAWQgcgSgGgRIgBgPQAkAJA3AIQBqANBcgCQgbAPhDAJQgnAFgkAAQgrAAgqgHg","fc":"#AF4F00"},"398":{"t":[43,34.9],"p":"AhtAYQg4gJAngRQArgVAKAEIBJAFQBXACA4gOQgvAXg+AOQg6AQgvAAQgUAAgSgDg","fc":"#E28600"},"399":{"t":[44.2,28.1],"p":"AiEAYQgmgPgIgTIgCgSIAQAKQAXAKAiAHQBrAUC1gXQgWAKhwAOQhEAJgwAAQgmAAgZgFg","fc":"#E28600"},"400":{"t":[20.4,24.5],"p":"AgKA+Qg0gOgqgYQgXgNgUgPQgMgKgIgJIgJgKIgJgOIAXgiIAUAYIAGAJIAOARQAOAPAVAPQAjAXAxAUQBOAeBvAKIgWAAQhiAAhMgUg","fc":"#1D2226"},"401":{"t":[46.4,42.5],"p":"AhuAeIgPAAIAEgpIADAAIALABIAnABQBkAABTgWIALAoQhYAWhqAAIgqgBg","fc":"#1D2226"},"402":{"t":[24.7,26.8],"p":"AgPAgIg2gYQgUgIgKgcQgKgbAIABQAEAAA5ApQBGAsBMAZQg5AAhAgYg","fc":"#AF4F00"},"403":{"t":[52.1,47.6],"p":"AgYAJQAagVAVAGQABAAABAPg","fc":"#FBA40B"},"404":{"t":[66.6,24.9],"p":"AABAUQAZgRAUgVQANgNAFgKQAJgMAFgMIAiAPQgJAPgNANQgMAOgMAIQgZAVgeAPQg0AahGAEQBDgNAtghg","fc":"#1D2226"},"405":{"t":[39.9,24.3],"p":"ACbDyIgCgaIAAgNIABgEQAAgJAFgMIAIgPIAAgBIAOgNIAFgEIACAAQAggNAbgcQAUgUAYgmIABgBIAIgPIADgEIAAgCIAVgjQANgaAGgQIAGgRQAHgWAAgPQAAgNgFgIQgFgKgJgFIgBgBQgGANgJANIgEAGQgNAQgUAOQgcAUglANIguAQQgSAFgVAEQhEAOhNAAIhDgDQgpgCgggHIAAAAQgOgCgXgGIgvgPQgWgKgSgLQgUgLgSgSIgDgEIghgRIgDgGQgDAIAAAOQAAAPAEAOIAAAAIADAMQAIAcAIAVIAIAUIAAABIAIAQQAKAXAMAPQAWAdAiAWQAVANAcAMIAeAKQAvAPA4ADIAAAAIALABIADAAIAGAAIACABIgCAVIgBABIAAAFIgBACIgFAqIgrAAIAEghIgogFQgugJglgPQhQgggrg6QgPgUgLgXIgQgnQgKgYgKgjQgHgYAAgZQAAgfALgZQAMgZAVgRIACgCIARgYIABgBIALgQIAIA0IAAAAQAGAlAaAbQAYAZAoAQQAfAMAkAHQArAIA3ADIAqABQBPAABBgOQAdgHAWgHQAfgKAbgPQAegRAPgUQALgQADgQIADgWIAWAFQAcAGARAPQARAOAGAXQAEAMAAAPQAAAWgIAcQgHAWgNAaIgqBMIgBABQgcArgWAXQggAhgmAQQgGAEgDAHQgDAHAAAMQAAAIADAVg","fc":"#1D2226"},"406":{"t":[14.6,25],"p":"Ag+A9Qgpg9AIg8QgNgJgGgrQgIgwAZgRQALAHAkAxQArAxAzAVQgKBSAoBSQAUApAXAYQh8gig3hTg","fc":"#AF4F00"},"407":{"t":[33.1,39],"p":"AAMAqQhbgCg0gcQgvgXAFgRIAOgNIAgAGIBaAhQBsAfBogEQhIARhLAAIgQAAg","fc":"#AF4F00"},"408":{"t":[45.9,44.5],"p":"Ah7AoIADgVIgDAAIAEgVIAAgCIAAgGIABAAIAAgHIABgBIADAAIB+gMIAAAAIAxgEIABAAIAtgEIAAAAIARgBIgDAIIAAABIgBAAIgGAYIgBADIg2AOIhkAdg","fc":"#AF4F00"},"409":{"t":[34.9,30.1],"p":"AABCFQhlgIhDgmQglgkgOhfQgIgxAAgpQBQASBCARQCDAhhAgDQg3gDgNAMQgLAJATARQARAPAfAMQAdAKAUgBQg2ADB5A2QA+AaBKAaQhaAYhXAAQgZAAgYgCg","fc":"#E28600"},"410":{"t":[45.6,44.6],"p":"Ah4AnIAGgpIAAgDIABgFIAAgBIAAgGIABgCIAAgKIABgDIAAgGIDdAAIAKAAIAAA8IgJgFQgIgDgIgBIADAag","fc":"#E28600"},"411":{"t":[55.8,25.4],"p":"AjEA5QAIgOAagGQC8AFBrg2QA1gcAPgcQgBANgNASQgaAlg8AYQg9Aah9AMIhzAHQgBgGAFgGg","fc":"#E28600"},"412":{"t":[39.9,24.7],"p":"AgZDCQjcgHhkieQgOglAAgYIADgQQgKgWgHgbQgOg0ASgTQASgPAPgKQAFAsAxApQBiBSDZgQQCvgMBKg/QAlggACgdIAhAPQAgAYgHAqQgNAjgOAQIgLAIQAAAagMAfQgYBEg5AqQglAchJASQhJAThJAAIgRAAg","fc":"#FBA40B"},"413":{"t":[58.5,47.7],"p":"AgGAIIAAgPIAGAFQADACADAGIABACg","fc":"#1D2226"},"414":{"t":[47.2,47.1],"p":"Ag1AOQgJgDgIACIgGABIgFgNIAAgBIAVgDQAJgDATgCQAjgFAiAAIAfABIAMACIACAYg","fc":"#1D2226"},"415":{"t":[34.6,47.5],"p":"AgJAKIACgTIARAAIgDATg","fc":"#1D2226"},"416":{"t":[37.2,69.5],"p":"AhpAnQAUgPAZgQQAygfAWgDQAngFA3gJQhgA1g4ARQglALgOAAg","fc":"#8C8C8C"},"417":{"t":[45.6,63.2],"p":"Ag1gQQAugJAmgDQCtANgkAAQgYAAiSATQiMATggAHQAcgdBdgRg","fc":"#BABABA"},"418":{"t":[27,67.1],"p":"AhUAoQgTgFAAgHIAjgJQAegJAJgJQAKgIAdgSIAdgRQARgEAeATQAeAUgTACQgMABgwATQgxAVgVAFQgOACgMAAQgNAAgMgDg","fc":"#8C8C8C"},"419":{"t":[66.3,49.8],"p":"AAegQIAKAFIBNAYIjpAEg","fc":"#FBA40B"},"420":{"t":[53.9,43.7],"p":"AAgAZQhKgDhTgPQgRgMAQgLQAIgGAMgDIALAIQAPAKAXAHQBIAXB3gDQgYAGgvAAIgfgBg","fc":"#AF4F00"},"421":{"t":[47.4,19.5],"p":"AgKg5QgWgbgcgYIgTgSIATgHQAOgFAMAAQAiAAAiA4QAkA7AIBGQAFA0gIAoQgKhshLhYg","fc":"#8C8C8C"},"422":{"t":[44.9,47.8],"p":"AAAAoQgogDghgLQgWgHgOgHIgjgVIAhgfIAEAFIASAPQAPAKAOAHQAdANAiAIQA/AOBPgIQhBARg6AAIgWgBg","fc":"#1D2226"},"423":{"t":[78.8,42.3],"p":"AhvAuQA8gJAwgWQAYgMAUgNQAOgLAGgGIAIgKIAGgIIAlAaIgNANIgNAHIgbAPQgbANgeAHQgqAKgwAAIgXAAg","fc":"#1D2226"},"424":{"t":[60.2,47.3],"p":"Ak/CFQgEgFgCgLIgBgMIABgTIAFgkQAEgXALgrIAhh7IAAgEIAAAAIAtACIAAABIgBAGIghCBQgJAggGAfIgFAgIAAAJQAagBAagGIAmgIIAngGQA+gIBcACIBMAAIBOACQA0AEAZAEIAmAFIAGAAIgHgqIgGg9QgFg9gBg+IAtgBQACBHADAyIAGA6QAFAiAGAWIACAHIgCAHQgDAIgHAGQgGAFgHAAQgIADgHgCQgJAAgNgDIglgIQgzgJgYgCQgjgEgogCIgmAAIgnAAQhWgBg+AMQgYAEgxAOQgjAKgtADIgMABg","fc":"#1D2226"},"425":{"t":[61.7,37.6],"p":"AAAAxQg8gGhSgSQgfgHhrgbIAPgqQA+AeBFAUQBGATBAAGQBLAGA+gOQAjgJAbgMQAOgIANgKIALgKIAIgLIAkAbIgIAIIgHAHIgRAKQgVAMgNAFQgfAOgpAGQgmAHgsAAQgeAAgfgDg","fc":"#1D2226"},"426":{"t":[42.8,46.7],"p":"AhMh7IAoALQAwAPA0ATQggALgSAJQghAUAKAUQACACATAKQAXAJACACQAZAYBCAOQgpAlACAOQABAHAJAAIjiAYg","fc":"#AF4F00"},"427":{"t":[61,54.7],"p":"AiWABIAAgKIBAgLIDtAeQjgACgtAJQgbgGgFgOg","fc":"#AF4F00"},"428":{"t":[53.7,48.4],"p":"AhDAJIglgPIgBgKQABgKAIAFQA5AYBOADQAnACAcgDQgGAEgPAEQgdAIgoACIgJAAQgjAAgngOg","fc":"#AF4F00"},"429":{"t":[64,21.4],"p":"AgghLQgqhDgogoIABgIQAFgHAKAAQBaAyBFCrQAlBWARBNQgCACgHADQgQAFgeABQgJiLhTiGg","fc":"#BABABA"},"430":{"t":[63.1,47.1],"p":"AjhghQAFgYAMgWQAGgMAFgGIA6ATQBKATBPAAQgBACgkAAQghAAAJAIQABABA8AKIA+AKQAJAIg7AOQAmAUCkBDQgaAKgxgBIhigIQiNgMhUAcQhFg6AOhJg","fc":"#E28600"},"431":{"t":[60,24.7],"p":"AAECWQAGgtgIg+QgNh5hChQQAnAPAzBXQBBBoAABtQgZACgQAAQgfAAgCgJg","fc":"#7E7E7E"},"432":{"t":[60.4,46.6],"p":"AkuBDQAFhAANgXQgCgYAPgoIAPgiIBFAfQBfAeB6ADQB9ADBKglQAlgUAMgSQALAcgHAbQgEANgGAHIANA+QAOBFAHAWQgCAGgKgBIglgHQhTgQiHAHQibAIhuAPIhPANQAAgbADghg","fc":"#FBA40B"},"433":{"t":[65.4,20.6],"p":"AAOCPQgFg6gOhEQghiGg0g1QgSgPAbAMQAZAKAdAdQBcBcAaCmIAHA3g","fc":"#8C8C8C"},"434":{"t":[62.3,68.8],"p":"AoLBxQgxgQgjgQIgJgDIgDgJQgCgHgBgJQAAgVANgTQAPgVAcgKQATgHAbAAIAOAAQAlAAAggQQAVgKAlgZQAXgOAQgIIAEgBQDEgsDIAAQBMgBBEAJQBEAIAqAQQAgAMASARIAAAAQAYATAkARQAeAPAqAOQAxARAqAHIABAAIAiAIIgXAbQgKAJgLAGQgZAOggAAQgkAAgpgSIgBAAIgBAAQivhSiRgBQhiAAhYAlQg4AXhPA2QgyAkgVAMIgBABIgCAAQggAMgsAAQhIgBhmgfgAoxAZQgLAGgFAMIgBAEIAKAFQAbAKAfAKQBdAeBEAAQAiAAAZgIQANgIA2gkQAygkAmgSQB7hECGAAQB/AACSA7QgjgSgYgUIgBAAQgLgLgYgJQgYgJgmgIQhNgNhlAAQjBAAjAArQgMAGgTAMIgoAZQg4Aeg2AAIgOAAIgBAAQgZAAgPAKg","fc":"#1D2226"},"435":{"t":[33.8,70.7],"p":"AiyBZQhygSgWgdQAIglAJgIQAQgSAugDQA3gGA/gcQAygXAUgRIABAPQACATAKANQAeAqBZgYQBdgYBOgHQAngEAUABQgfAHg3AXQhuAth1BVQgcAGglAAQgzAAhAgKg","fc":"#7E7E7E"},"436":{"t":[48.5,64],"p":"Ai/AjQgkgIgKgNQgKgNAUgMQAigWA2gHQAbgEAUABQCWAWC3AGQhJALglAGQguAKgvASQhQAOg+AAQgyAAglgJg","fc":"#8C8C8C"},"437":{"t":[61.1,68.8],"p":"AnZBmQhBgRg0gXQgGgTAQgWQAWgaAwAAQA4AEA1geQAdgQAyggQDRgvDPAEQDRADA4A0QAuAnBiAeQAxARAoAIQgKAMgVAGQgrANg5gZQkPiAjRBEQhGAWhNAwIhpBGQgdAKgoAAQg4AAhNgVg","fc":"#BABABA"},"438":{"t":[84.2,26.6],"p":"Ag/EIIgShTIgEgvIAAgIQAAgbACgVQACgbAHgnQAHggAJgjQAVhLAkhYIARgvIA9AAQAIAzABAvQABBJgOBCIgFAVIAAAAQgHAfgPAoIAAABIgTAwIgHAOIAAABIgYAyQgPAagQAXIgBACIgaAlgAAbi+IAAABIgOAmQgUA+gLAsQgSBDgEA7IgBAeIACAyIAOgTIAAgBQANgTAHgOIANgeQAJgSAIgVQANgfAIghIAAAAIACgJQALgtACgnQABgYgBgYQgBgPgLhBg","fc":"#1D2226"},"439":{"t":[85.1,18.8],"p":"AAgiDIgEBfQgCAMgIAaQgRA3ggBLQAMhRAzi2g","fc":"#FFFFFF"},"440":{"t":[83.9,20.6],"p":"AgyCBQADhEATg4QAchXA0hoQg7EUAFBIQgWARgPAFIgKADQgCgXABgjg","fc":"#D8CACA"},"441":{"t":[84.6,23.8],"p":"AhDClIgBgRQAAhKAXhZIAAgBQAMgwAUg3IAAAAIArh1IAbAAQAWBlgSBmQgGAngNAlIAAABQgIAZgKAZIgMAdIgBAAQgIASgJATIgEAJIgBAAQgOAZgRAYIgPATg","fc":"#FFFFFF"},"442":{"t":[75.4,24.8],"p":"AgMgfIgchdQAhAfAaBPQAOAlAIAeQgBAHgHAOQgNAdgYAWQAPg2gXhmg","fc":"#8C8C8C"},"443":{"t":[52.9,30],"p":"AgYEnQgXgDgagHIgggKIgEgCIgUgIIgBAAIgIgDQgigPgegXIgdgaIgHgLIAAAAIgBgEIgBgEIABgIIAHgRIABgEIAMgbQAVguANgqIgCgXQAAgUAJghIAKgnQgCgLgFgLQgFgIgIgGQgOgKgUAAQgIAAgJACIgFACIAAAFQAFAEAIADIAMgEIAHACIAIAEQAHAFADAIQADAHAAAGQAAAGgDAJIgGANQgNAhgWASIgBABIAAAAIgBAAQgWASgcAAQgIAAgKgDIgBAAIAAAAQgdgGgagWIgCgCIgCgEQgPgbAAgnQAAgTAEgXIAAgBQAIguAagtIAAAAQAXgtAgggIA/AAIgRAPIgBAAIgEAFIgBAAQgcAZgYApIgGALIAAAAQgXAogGAnIAAAAQgDASAAARQAAAbAIARQARAOAPADIABAAIAJACQAMAAALgKIAAAAIACgBQAMgKAJgXQgbgKgNgQIgDgEIgCgFIgBgOQAAgKACgKQACgGADgFIAHgHQAHgFAIgCIAEgCQAQgEAQAAQAXgBAWAKQASAJANAQIAIALQAKASADAXIABAEIgBADQgDAPgJAeQgHAbAAAPQAAALACAHIABAGIgBAFIgHAUIAAACIgFANQgKAcgSApIgDAIIgCADIgIASIADAEIAGAEQANALAQAKIARAKQAPAJAVAIQAaAKAeAHIACAAQALAEAMABIABAAIAOACQAWACAWAAIAQAAQAbgBAUgDIAAAAIAngHIABAAIAHgCIACAAIAigKIAAAAQAfgKAegNIAggOQAXgMAegRIAKi3QAAhBgGg7QgCgQgDgRIgCgMQgCgNgGgZIgIgcQgHgYgNgXIAwAAIAPAqQALAjAGAqIAEAcQAEAYABAgIACA2IABAZQAAAzgEA2IAAABQgGBagDACIgBALIgaAPQgmAVgnASIAAAAIgWAJIgBAAQgNAHgKACQgQAHgQAEIgjAKQg7ANg4AAQggAAgcgEg","fc":"#1D2226"},"444":{"t":[37.6,20.3],"p":"ABjDDQgbgFgZgIIgIgCQgVgIgMgLIgDgDQgDgGgEgHIgBgBIgEgMIgCgGIAAAAQgEgXAJgjQAJgmACgPIACgMQgFgwg1gGQgygGgNASQgJAOAMAPQAKAKAVAHIAUAGIgGASQgLAcgQAPIAAAAQgYAVgdgFIgCgBQgYgEgVgVQgUglAMg4IABgHQAJgoAVgnIABgBQAbg1AnggIAWAAQgIAKgEAKIAAAAQgJAVANAUQATAbAAADIAvgLQAWgFAnAGQBiAGAtCIQAfBggGBLIgCAHIgTACIgFAAIgEAAIgIAAQgiAAgjgHg","fc":"#7E7E7E"},"445":{"t":[54.4,22],"p":"ABsDbIgTAAQgcgCgbgQQgNgIgJgIIgCgBQgHgGgHgKQgvgygOhEQgGgggdgcQgYgZglgTQgugZgfAAQgSAAgNgFQglgMgIgkQgDgOACgRIAKgQIAAAAQAPgWATgRIByAAQACAEAJAAQAjgFBEAeQBLAiAtA0QAuA1ATAgQAkA9AfBxQACAHAMgzQAPg7AGgIQAHgIAAgLQgBgPAFgKIAAgBQATgrANg6IAAAAIALg5IABgFQADAFADAIQAFAMAEAXQADAaAAAdQgCBKgaBSQgLAhgTAbIgBAAIgJALIgEAFIgBABIAAAAIgLAKQgJAHgMAHIgRAIIAAAAQgiAOgvAAIgGAAg","fc":"#8C8C8C"},"446":{"t":[53,28.9],"p":"AAAEfIAAAAIgwgHIgBAAIg0gPQg4gUgpgiIgKgIIgLgMQAAgCABgGQACgFAHgPIAvh5IAAgCQAJgeAEgRQAGgjgEgaIAAgBQgIg7g2gHQgUgDgSAFQgRAFgBAGQgCAPACALQAFAXAagEQAIgBAHgDIAEADQADAEgBAHIgDAIIgGAKQgLAagOANIAAAAIgCACIgCABQgWARgbgGIgCgBQgWgEgSgVIgBgBQgKgMgEgOQgCgoAEgaIABgHQAHgmAXgoIAAgBIABgBQAMgVAUgZIABAAQAOgTAVgUII4AAIARAqQAFAPAEASIAAAAQARBFACBfIgDCXIgIBYIgJAFQgtAagsATIgCABIgaAKIgoAPIgCAAIgfAIIgBAAQglAIgXADQgaACgaAAIgjgBg","fc":"#BABABA"},"447":{"t":[93.5,57.6],"p":"ACQCaIAbgcIAMgOIAHgLIgKgGIgBgBQgHgFgEgHIAAgBQgDgGgBgEIAAgFIAAgCIgRgPQgpgigXgPQgggYgggSIgjgTIAAgBIglgPQg8gXhIgMIg6gIQAkgKAigXIAcAFIAtALQAaAHAkANIBOAmQAhATAjAaQAqAeA8AzIANAKIANANIAIAgIgKADIgCAGQgEAKgFAIIgFAHIAAABQgIALgHAGg","fc":"#1D2226"},"448":{"t":[28.7,57.7],"p":"AjsCZIABgBIgNgJIgBgFIAAAAIgBgHQABgJACgIIAHgPIASgWIAJgKQBWhjBUgvIAYgNIABgBIBGgdQATgHATgFIBMgSQAqAUArALIgRACQgbACghAGIgBAAQgbAFgeAIQgjAKgZAJIgBAAIhSAnQhFAohMBUQAmAYAwAYIAxAVgAjNB9IgCAGIACAAIAJABIABAAIAWgCIAGgBIgcgSIgKAOg","fc":"#1D2226"},"449":{"t":[72.3,61.9],"p":"Ai8BkQhEg0AqggQAWgPAjgDIAlACQAvAEAugEQCTgOBbhdQAUAKAAAFQgaA/hCA1QhjBUiIAAQgsAAgwgIg","fc":"#7E7E7E"},"450":{"t":[40.5,69.3],"p":"AgiAlQgQgKgTgPQgngcgNgVQA7AkBhAQQAxAKAmADIgCAKg","fc":"#8C8C8C"},"451":{"t":[90.3,67.4],"p":"AgTAeQBAgjAjgyQgEATgfAqQgfAugOACIhPACg","fc":"#8C8C8C"},"452":{"t":[87.5,62.1],"p":"AhWAyIgCgNIA5ggQA+grAig7QACgNALAJQAGAFAFAIQgDAkgVArQgpBUhaAfQgPgkgFgUg","fc":"#8C8C8C"},"453":{"t":[104.9,67],"p":"AhJA8QBAgsAqg7IALgQIAOAJIABAAIAPAKIgBADIgTAaQgeAmgnAhg","fc":"#1D2226"},"454":{"t":[12.1,70.2],"p":"AgiAcQgNgHgFgFIAAAAIgBgBIATgbIABgCIAKgNIAXALIABAAIA1AXIgzAAIAvAVg","fc":"#AF4F00"},"455":{"t":[11.1,69.9],"p":"AgoAgIgHgGIgBAAIgBgBIgDgCIAAAAIgDgBIgDgEIAkgwIAIADIAAABIAGAEIABAAIAQAKIACAAIApAUIABAAIAEACIgsAAIAvAWg","fc":"#FBA40B"},"456":{"t":[108.1,67.4],"p":"AhJA4IALgKIACgBQAfgbAdgiIAOgUIALgSIABgBIAwAsIgMAMIgCADQgWAdgVAXIgxAAIgZAAIgQAAg","fc":"#FBA40B"},"457":{"t":[32,61.6],"p":"AhgByIgwgWIgyAAIAuAWIhUAAIgTgMIgBgBIgBAAIAKgTIAAgBIAAAAIARgdIAigwQA1hDA+gfIAWgLIANgEIALgEIADABIAHACIAIABQADABADACIAMAVQANAPAbAQQAZAPBfAWQAuALArAGIgNApIAAACIgFATIAAAAIgCAGIAAAAIAAABIgBABIgKAhIgQABQgaACgaAIg","fc":"#7E7E7E"},"458":{"t":[60.7,69.4],"p":"AABAkIjXAAQAPgMAWgKQANgFASgFQANgEASgBQAWgDAUgBIAXgBIATABQAMABBkgQIBlgQIAaAcQAUAdgiAOIiTACIgugBg","fc":"#8C8C8C"},"459":{"t":[60.2,58.3],"p":"Al7CTIgvgWIgyAAIAuAWIgqAAQgcgPgKgGIgNgJIgCgCIgBAAQgEgDgBgDIACgCIAAAAQAGgLAKgNIAUgZIABAAIAAgBIALgLQAzgzBRg3IAkgXIABgBIAOgJIABAAIAAAAIAlgPQAhgLAegHIALgCIAtgIIABAAIARgCQBxgPB6ANIAKABQAaADAZAFIAgAGQA0AMAtASIAqASIAAAAIATAKQBNAoA9A7IADADIABABIACACIAZAaIgKALIgBAAIAAABIgJAKQgYAZgZAVIgSAPg","fc":"#BABABA"},"460":{"t":[118,69.4],"p":"AgHAkQgTgUgMgKIgGgFIgBgBIADgDIARghIABABIABAAIABABIABABIALAJIAMANQAWAUAWAbIgbAAIgTABIgHgBg","fc":"#1D2226"}},"containers":{"R_Leg":{"c":["2","1","0"],"b":[10.5,1.6,17.8,18.8]},"R_Heand":{"c":["14","13","12","11","10","9","8","7","6","5","4","3"],"b":[15.5,13.3,27.1,38.7]},"MagicHat":{"c":["31","30","29","28","27","26","25","24","23","22","21","20","19","18","17","16","15"],"b":[0.5,1.1,78.8,62.8]},"L_Sholder":{"c":["35","34","33","32"],"b":[-1.2,1.7,17.7,20.3]},"L_Heand":{"c":["47","46","45","44","43","42","41","40","39","38","37","36"],"b":[3.7,16,27.1,38.7]},"Head":{"c":["50","49","48"],"b":[39.8,11.8,42.6,44.9]},"Body":{"c":["118","117","116","115","114","113","112","111","110","109","108","107","106","105","104","103","102","101","100","99","98","97","96","95","94","93","92","91","90","89","88","87","86","85","84","83","82","81","80","79","78","77","76","75","74","73","72","71","70","69","68","67","66","65","64","63","62","61","60","59","58","57","56","55","54","53","52","51"],"b":[8.3,-10.2,62.8,60.3]},"wizard_casting:R_Heand":{"c":["235","234","233","232","231","230","229","228","227","226","225","224","223","222"],"b":[15.9,12.8,25,36.3]},"wizard_move_back:R_Heand":{"c":["329","328","327","326","325","324","323","322","321","320","319","318","317","316"],"b":[16,13.7,27.1,39.5]},"wizard_move_back:MagicHat":{"c":["346","345","344","343","342","341","340","339","338","337","336","335","334","333","332","331","330"],"b":[-1.5,0.7,78.7,63]},"wizard_move_back:L_Sholder":{"c":["350","349","348","347"],"b":[1.2,5.1,15.9,21.3]},"wizard_move_back:L_Heand":{"c":["364","363","362","361","360","359","358","357","356","355","354","353","352","351"],"b":[3.4,16.7,27.1,39.4]},"wizard_move_back:Head":{"c":["365"],"b":[39.4,10.9,42.6,44.9]},"wizard_move_back:Body":{"c":["392","391","390","389","388","387","386","385","384","383","382","381","380","379","378","377","376","375","374","373","372","371","370","369","368","367","366"],"b":[6.5,-10.6,66.1,62.7]},"wizard_move:Body":{"c":["118","117","116","115","114","113","112","111","110","109","108","107","106","105","104","103","102","101","100","99","98","97","96","95","94","93","92","91","90","393","88","87","86","85","84","83","82","81","80","79","78","77","76","75","74","73","72","71","70","69","68","67","66","65","64","63","62","61","60","59","58","57","56","55","54","53","52","51"],"b":[8.3,-10.2,62.8,60.3]},"Face_15_JSCC:Head":{"c":["396","395","394"],"b":[11.5,13.3,72.3,76.3]},"Coat":{"c":["415","414","413","412","411","410","409","408","407","406","405","404","403","402","401","400","399","398","397"],"b":[0,0,79.8,48.6]},"Cap":{"c":["446","445","444","443","442","441","440","439","438","437","436","435","434","433","432","431","430","429","428","427","426","425","424","423","422","421","420","419","418","417","416"],"b":[0,0,124.6,83.3]},"Face_15_JSCC:Body":{"c":["460","459","458","457","456","455","454","453","452","451","450","449","448","447"],"b":[3.6,42.1,119,31]}},"animations":{"Cloud":{"shapes":[{"bn":"shape","gn":"119"},{"bn":"shape_1","gn":"120"},{"bn":"shape_2","gn":"121"},{"bn":"shape_3","gn":"122"},{"bn":"shape_4","gn":"123"},{"bn":"shape_5","gn":"124"},{"bn":"shape_6","gn":"125"},{"bn":"shape_7","gn":"126"},{"bn":"shape_8","gn":"127"},{"bn":"shape_9","gn":"128"},{"bn":"shape_10","gn":"129"},{"bn":"shape_11","gn":"130"},{"bn":"shape_12","gn":"131"},{"bn":"shape_13","gn":"132"},{"bn":"shape_14","gn":"133"},{"bn":"shape_15","gn":"134"},{"bn":"shape_16","gn":"135"},{"bn":"shape_17","gn":"136"},{"bn":"shape_18","gn":"137"},{"bn":"shape_19","gn":"138"},{"bn":"shape_20","gn":"139"},{"bn":"shape_21","gn":"140"},{"bn":"shape_22","gn":"141"},{"bn":"shape_23","gn":"142"},{"bn":"shape_24","gn":"143"},{"bn":"shape_25","gn":"144"},{"bn":"shape_26","gn":"145"},{"bn":"shape_27","gn":"146"},{"bn":"shape_28","gn":"147"},{"bn":"shape_29","gn":"148"},{"bn":"shape_30","gn":"149"},{"bn":"shape_31","gn":"150"},{"bn":"shape_32","gn":"151"},{"bn":"shape_33","gn":"152"},{"bn":"shape_34","gn":"153"},{"bn":"shape_35","gn":"154"},{"bn":"shape_36","gn":"155"},{"bn":"shape_37","gn":"156"},{"bn":"shape_38","gn":"157"},{"bn":"shape_39","gn":"158"},{"bn":"shape_40","gn":"159"},{"bn":"shape_41","gn":"160"},{"bn":"shape_42","gn":"161"},{"bn":"shape_43","gn":"162"},{"bn":"shape_44","gn":"163"},{"bn":"shape_45","gn":"164"},{"bn":"shape_46","gn":"165"},{"bn":"shape_47","gn":"166"},{"bn":"shape_48","gn":"167"},{"bn":"shape_49","gn":"168"},{"bn":"shape_50","gn":"169"},{"bn":"shape_51","gn":"170"},{"bn":"shape_52","gn":"171"},{"bn":"shape_53","gn":"172"},{"bn":"shape_54","gn":"173"},{"bn":"shape_55","gn":"174"},{"bn":"shape_56","gn":"175"},{"bn":"shape_57","gn":"176"},{"bn":"shape_58","gn":"177"},{"bn":"shape_59","gn":"178"},{"bn":"shape_60","gn":"179"},{"bn":"shape_61","gn":"180"},{"bn":"shape_62","gn":"181"},{"bn":"shape_63","gn":"182"},{"bn":"shape_64","gn":"183"},{"bn":"shape_65","gn":"184"},{"bn":"shape_66","gn":"185"},{"bn":"shape_67","gn":"186"},{"bn":"shape_68","gn":"187"},{"bn":"shape_69","gn":"188"},{"bn":"shape_70","gn":"189"},{"bn":"shape_71","gn":"190"},{"bn":"shape_72","gn":"191"},{"bn":"shape_73","gn":"192"},{"bn":"shape_74","gn":"193"},{"bn":"shape_75","gn":"194"},{"bn":"shape_76","gn":"195"},{"bn":"shape_77","gn":"196"},{"bn":"shape_78","gn":"197"},{"bn":"shape_79","gn":"198"},{"bn":"shape_80","gn":"199"},{"bn":"shape_81","gn":"200"},{"bn":"shape_82","gn":"201"},{"bn":"shape_83","gn":"202"},{"bn":"shape_84","gn":"203"},{"bn":"shape_85","gn":"204"},{"bn":"shape_86","gn":"205"},{"bn":"shape_87","gn":"206"},{"bn":"shape_88","gn":"207"},{"bn":"shape_89","gn":"208"},{"bn":"shape_90","gn":"209"},{"bn":"shape_91","gn":"210"},{"bn":"shape_92","gn":"211"},{"bn":"shape_93","gn":"212"},{"bn":"shape_94","gn":"213"},{"bn":"shape_95","gn":"214"},{"bn":"shape_96","gn":"215"},{"bn":"shape_97","gn":"216"},{"bn":"shape_98","gn":"217"},{"bn":"shape_99","gn":"218"},{"bn":"shape_100","gn":"219"},{"bn":"shape_101","gn":"220"},{"bn":"shape_102","gn":"221"}],"containers":[],"animations":[],"tweens":[[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"shape_1"},{"t":"shape"}]}]},{"n":"to","a":[{"state":[{"t":"shape_3","p":{"x":13.1,"y":69}},{"t":"shape_2"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_3","p":{"x":13.3,"y":68.9}},{"t":"shape_4","p":{"x":15.3,"y":76.5}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_3","p":{"x":13.4,"y":68.7}},{"t":"shape_4","p":{"x":15.4,"y":76.4}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_3","p":{"x":13.5,"y":68.6}},{"t":"shape_5","p":{"x":15.6,"y":76.2}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_6","p":{"x":13.7,"y":68.4}},{"t":"shape_5","p":{"x":15.7,"y":76}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_6","p":{"x":13.8,"y":68.2}},{"t":"shape_5","p":{"x":15.8,"y":75.9}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_6","p":{"x":13.9,"y":68.1}},{"t":"shape_7"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_6","p":{"x":13.8,"y":68.2}},{"t":"shape_5","p":{"x":15.8,"y":75.9}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_6","p":{"x":13.7,"y":68.4}},{"t":"shape_5","p":{"x":15.7,"y":76}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_3","p":{"x":13.5,"y":68.6}},{"t":"shape_5","p":{"x":15.6,"y":76.2}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_3","p":{"x":13.4,"y":68.7}},{"t":"shape_4","p":{"x":15.4,"y":76.4}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_3","p":{"x":13.3,"y":68.9}},{"t":"shape_4","p":{"x":15.3,"y":76.5}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_3","p":{"x":13.1,"y":69}},{"t":"shape_2"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_1"},{"t":"shape"}]},1]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"shape_9"},{"t":"shape_8","p":{"x":-10,"y":74.3}}]}]},{"n":"to","a":[{"state":[{"t":"shape_10","p":{"x":-14,"y":69.3}},{"t":"shape_8","p":{"x":-10.1,"y":74.1}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_10","p":{"x":-14.1,"y":69}},{"t":"shape_8","p":{"x":-10.3,"y":73.8}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_12","p":{"x":-14.2,"y":68.8}},{"t":"shape_11"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_12","p":{"x":-14.4,"y":68.5}},{"t":"shape_13"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_12","p":{"x":-14.5,"y":68.2}},{"t":"shape_14"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_16","p":{"x":-14.6,"y":68}},{"t":"shape_15","p":{"x":-10.8,"y":72.8}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_16","p":{"x":-14.8,"y":67.7}},{"t":"shape_15","p":{"x":-10.9,"y":72.5}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_16","p":{"x":-14.6,"y":68}},{"t":"shape_15","p":{"x":-10.8,"y":72.8}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_12","p":{"x":-14.5,"y":68.2}},{"t":"shape_14"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_12","p":{"x":-14.4,"y":68.5}},{"t":"shape_13"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_12","p":{"x":-14.2,"y":68.8}},{"t":"shape_11"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_10","p":{"x":-14.1,"y":69}},{"t":"shape_8","p":{"x":-10.3,"y":73.8}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_10","p":{"x":-14,"y":69.3}},{"t":"shape_8","p":{"x":-10.1,"y":74.1}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_9"},{"t":"shape_8","p":{"x":-10,"y":74.3}}]},1]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"shape_18","p":{"y":105.5}},{"t":"shape_17","p":{"y":109.3}}]}]},{"n":"to","a":[{"state":[{"t":"shape_18","p":{"y":105.3}},{"t":"shape_17","p":{"y":109.2}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_18","p":{"y":105.2}},{"t":"shape_17","p":{"y":109.1}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_18","p":{"y":105}},{"t":"shape_17","p":{"y":108.9}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_18","p":{"y":104.9}},{"t":"shape_17","p":{"y":108.8}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_18","p":{"y":104.8}},{"t":"shape_17","p":{"y":108.6}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_18","p":{"y":104.6}},{"t":"shape_17","p":{"y":108.5}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_18","p":{"y":104.5}},{"t":"shape_17","p":{"y":108.3}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_18","p":{"y":104.6}},{"t":"shape_17","p":{"y":108.5}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_18","p":{"y":104.8}},{"t":"shape_17","p":{"y":108.6}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_18","p":{"y":104.9}},{"t":"shape_17","p":{"y":108.8}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_18","p":{"y":105}},{"t":"shape_17","p":{"y":108.9}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_18","p":{"y":105.2}},{"t":"shape_17","p":{"y":109.1}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_18","p":{"y":105.3}},{"t":"shape_17","p":{"y":109.2}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_18","p":{"y":105.5}},{"t":"shape_17","p":{"y":109.3}}]},1]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"shape_20","p":{"y":103.6}},{"t":"shape_19","p":{"y":109.6}}]}]},{"n":"to","a":[{"state":[{"t":"shape_20","p":{"y":103.2}},{"t":"shape_19","p":{"y":109.3}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_20","p":{"y":102.9}},{"t":"shape_19","p":{"y":109}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_20","p":{"y":102.6}},{"t":"shape_19","p":{"y":108.6}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_20","p":{"y":102.2}},{"t":"shape_19","p":{"y":108.3}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_20","p":{"y":101.9}},{"t":"shape_19","p":{"y":107.9}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_20","p":{"y":101.5}},{"t":"shape_19","p":{"y":107.6}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_20","p":{"y":101.2}},{"t":"shape_19","p":{"y":107.2}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_20","p":{"y":101.5}},{"t":"shape_19","p":{"y":107.6}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_20","p":{"y":101.9}},{"t":"shape_19","p":{"y":107.9}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_20","p":{"y":102.2}},{"t":"shape_19","p":{"y":108.3}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_20","p":{"y":102.6}},{"t":"shape_19","p":{"y":108.6}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_20","p":{"y":102.9}},{"t":"shape_19","p":{"y":109}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_20","p":{"y":103.2}},{"t":"shape_19","p":{"y":109.3}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_20","p":{"y":103.6}},{"t":"shape_19","p":{"y":109.6}}]},1]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"shape_22","p":{"y":115.7}},{"t":"shape_21","p":{"y":106.4}}]}]},{"n":"to","a":[{"state":[{"t":"shape_21","p":{"y":106.6}},{"t":"shape_22","p":{"y":115.9}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_21","p":{"y":106.8}},{"t":"shape_22","p":{"y":116.1}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_21","p":{"y":107}},{"t":"shape_22","p":{"y":116.3}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_21","p":{"y":107.2}},{"t":"shape_22","p":{"y":116.5}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_21","p":{"y":107.4}},{"t":"shape_22","p":{"y":116.7}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_21","p":{"y":107.6}},{"t":"shape_22","p":{"y":116.9}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_22","p":{"y":117.1}},{"t":"shape_21","p":{"y":107.8}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_21","p":{"y":107.6}},{"t":"shape_22","p":{"y":116.9}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_21","p":{"y":107.4}},{"t":"shape_22","p":{"y":116.7}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_21","p":{"y":107.2}},{"t":"shape_22","p":{"y":116.5}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_21","p":{"y":107}},{"t":"shape_22","p":{"y":116.3}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_21","p":{"y":106.8}},{"t":"shape_22","p":{"y":116.1}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_21","p":{"y":106.6}},{"t":"shape_22","p":{"y":115.9}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_22","p":{"y":115.7}},{"t":"shape_21","p":{"y":106.4}}]},1]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"shape_24"},{"t":"shape_23"}]}]},{"n":"to","a":[{"state":[{"t":"shape_26"},{"t":"shape_25"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_28"},{"t":"shape_27"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_30"},{"t":"shape_29"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_32"},{"t":"shape_31"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_34"},{"t":"shape_33"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_36"},{"t":"shape_35","p":{"x":-23.6}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_38"},{"t":"shape_37"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_39"},{"t":"shape_35","p":{"x":-23.7}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_41"},{"t":"shape_40"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_43"},{"t":"shape_42"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_45"},{"t":"shape_44"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_47"},{"t":"shape_46"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_49"},{"t":"shape_48"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_51"},{"t":"shape_50"}]},1]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"shape_53"},{"t":"shape_52"}]}]},{"n":"to","a":[{"state":[{"t":"shape_55"},{"t":"shape_54"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_57"},{"t":"shape_56"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_59"},{"t":"shape_58"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_61"},{"t":"shape_60"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_63"},{"t":"shape_62"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_65"},{"t":"shape_64"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_67"},{"t":"shape_66"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_69"},{"t":"shape_68","p":{"x":22.6,"y":95.9}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_70","p":{"x":24,"y":114}},{"t":"shape_68","p":{"x":22.7,"y":96.1}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_70","p":{"x":24.1,"y":114.2}},{"t":"shape_68","p":{"x":22.7,"y":96.3}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_70","p":{"x":24.1,"y":114.4}},{"t":"shape_68","p":{"x":22.8,"y":96.5}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_71"},{"t":"shape_68","p":{"x":22.8,"y":96.8}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_72","p":{"y":114.8}},{"t":"shape_68","p":{"x":22.8,"y":97}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_68","p":{"x":22.9,"y":97.2}},{"t":"shape_72","p":{"y":115}}]},1]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"shape_74"},{"t":"shape_73"}]}]},{"n":"to","a":[{"state":[{"t":"shape_76"},{"t":"shape_75"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_78"},{"t":"shape_77"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_80"},{"t":"shape_79"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_82"},{"t":"shape_81"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_84"},{"t":"shape_83"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_86"},{"t":"shape_85"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_88"},{"t":"shape_87"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_90"},{"t":"shape_89"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_92"},{"t":"shape_91"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_94"},{"t":"shape_93"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_96"},{"t":"shape_95"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_98"},{"t":"shape_97"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_100"},{"t":"shape_99"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_102"},{"t":"shape_101"}]},1]},{"n":"wait","a":[1]}]],"graphics":[],"bounds":[-52.5,54.3,120.1,80.2],"frameBounds":[[-52.5,54.3,120.1,80.2],[-52.5,54,120.1,80.3],[-52.5,53.7,120.1,80.3],[-52.5,53.3,120.1,80.4],[-52.5,53,120.1,80.5],[-52.6,52.7,120.1,80.5],[-52.6,52.3,120.2,81],[-52.7,52,120.3,81.5],[-52.7,52.3,120.3,81],[-52.7,52.6,120.2,80.5],[-52.7,52.9,120.2,80.4],[-52.6,53.1,120.2,80.4],[-52.6,53.4,120.2,80.3],[-52.6,53.7,120.1,80.2],[-52.6,54,120.1,80.1]]},"wizard_cast_end":{"shapes":[],"containers":[{"bn":"instance","t":[85.2,65,0.741,0.593,0,138.6,134.7,4.5,8],"gn":"L_Sholder"},{"bn":"instance_1","t":[81.1,64.8,0.686,0.71,0,135.2,134.9,17.4,21.1],"gn":"L_Heand"},{"bn":"instance_2","t":[63.8,94.1,0.781,0.808,0,0,0,40.4,48.5],"gn":"Body"},{"bn":"instance_3","t":[43.4,54.1,0.78,0.78,0,113.9,-66,8.4,10.6],"gn":"L_Sholder"},{"bn":"instance_4","t":[34.2,53.9,0.78,0.78,170,0,0,33,14.5],"gn":"R_Heand"},{"bn":"instance_5","t":[62.6,23.5,0.781,0.781,0,0,0,39.3,31.9],"gn":"MagicHat"},{"bn":"instance_6","t":[58.4,49.7,0.781,0.79,0,0,0,54.4,39.2],"gn":"Head"},{"bn":"instance_7","t":[72.3,102.2,0.781,0.578,0,0,180,19.6,19.7],"gn":"R_Leg"},{"bn":"instance_8","t":[51.5,97.9,0.781,0.833,0,0,0,19.4,19.6],"gn":"R_Leg"}],"animations":[{"bn":"instance_9","t":[64.1,92.9,0.781,0.781,0,0,0,7.3,93.2],"gn":"Cloud","a":["synched",0]}],"tweens":[[{"n":"get","a":["instance"]},{"n":"to","a":[{"regX":4.7,"scaleX":0.74,"scaleY":0.72,"skewX":96.7,"skewY":98.3,"x":82.6,"y":62.8},3]},{"n":"to","a":[{"regX":4.5,"skewX":6.5,"skewY":8.2,"x":82.5,"y":64.4},4]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_1"]},{"n":"to","a":[{"regX":17.5,"scaleY":0.71,"skewX":122.6,"skewY":122.2,"x":75.8,"y":66.7},3]},{"n":"to","a":[{"regX":17.4,"regY":20.9,"skewX":16.1,"skewY":15.7,"x":85.7,"y":72.1},4]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_2"]},{"n":"to","a":[{"scaleY":0.8,"y":95.4},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_3"]},{"n":"to","a":[{"regX":8.6,"regY":10.7,"scaleX":0.78,"scaleY":0.78,"skewX":61.9,"skewY":-117.9,"x":41,"y":63.3},3]},{"n":"to","a":[{"regY":10.6,"scaleX":0.78,"scaleY":0.78,"skewX":23.6,"skewY":-156.2,"x":45.2},2]},{"n":"to","a":[{"scaleX":0.78,"scaleY":0.78,"skewX":15.7,"skewY":-164.1,"x":49,"y":61.8},2]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_4"]},{"n":"to","a":[{"regY":14.6,"scaleX":0.78,"scaleY":0.78,"rotation":160,"x":32.9,"y":70.8},3]},{"n":"to","a":[{"regX":32.9,"rotation":89.2,"x":46.5,"y":74.4},2]},{"n":"to","a":[{"rotation":18,"x":50.9,"y":64.2},2]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_5"]},{"n":"to","a":[{"y":25.5},3]},{"n":"to","a":[{"y":26.3},4]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_6"]},{"n":"to","a":[{"scaleY":0.78,"y":51.5},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_7"]},{"n":"to","a":[{"y":103.7},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_8"]},{"n":"to","a":[{"y":99.4},7]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"wait","a":[8]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"instance_9"}]}]},{"n":"wait","a":[8]}]],"graphics":[],"bounds":[17.3,-0.5,93.7,125.7],"frameBounds":[[17.3,-0.5,93.7,125.7],[17.3,0,93.7,124.9],[17.3,0.8,93.7,123.9],[15.9,1.4,95.1,123.1],[9.3,1.5,101.7,122.7],[17.1,1.8,93.9,122.3],[17,2,94.1,122.2],[17.1,2.2,93.9,122.1]]},"wizard_cast_start":{"shapes":[],"containers":[{"bn":"instance","t":[82.5,64.4,0.742,0.724,0,6.5,8.2,4.5,8],"gn":"L_Sholder"},{"bn":"instance_1","t":[85.7,72.1,0.686,0.711,0,16.1,15.7,17.4,20.9],"gn":"L_Heand"},{"bn":"instance_2","t":[63.8,95.4,0.781,0.798,0,0,0,40.4,48.5],"gn":"Body"},{"bn":"instance_3","t":[49,61.8,0.781,0.781,0,15.7,-164.2,8.6,10.6],"gn":"L_Sholder"},{"bn":"instance_4","t":[50.9,64.2,0.781,0.781,18,0,0,32.9,14.6],"gn":"R_Heand"},{"bn":"instance_5","t":[62.6,26.3,0.781,0.781,0,0,0,39.3,31.9],"gn":"MagicHat"},{"bn":"instance_6","t":[58.4,51.5,0.781,0.781,0,0,0,54.4,39.2],"gn":"Head"},{"bn":"instance_7","t":[72.3,103.7,0.781,0.578,0,0,180,19.6,19.7],"gn":"R_Leg"},{"bn":"instance_8","t":[51.5,99.4,0.781,0.833,0,0,0,19.4,19.6],"gn":"R_Leg"}],"animations":[{"bn":"instance_9","t":[64.1,92.9,0.781,0.781,0,0,0,7.3,93.2],"gn":"Cloud","a":["synched",0]}],"tweens":[[{"n":"get","a":["instance"]},{"n":"to","a":[{"regX":4.7,"skewX":96.7,"skewY":98.3,"x":82.6,"y":62.8},4]},{"n":"to","a":[{"regX":4.5,"scaleX":0.74,"scaleY":0.59,"skewX":138.6,"skewY":134.7,"x":85.2,"y":65},3]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_1"]},{"n":"to","a":[{"regX":17.5,"regY":21.1,"skewX":122.6,"skewY":122.2,"x":75.8,"y":66.7},4]},{"n":"to","a":[{"regX":17.4,"scaleY":0.71,"skewX":135.2,"skewY":134.9,"x":81.1,"y":64.8},3]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_2"]},{"n":"to","a":[{"scaleY":0.81,"y":94.1},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_3"]},{"n":"to","a":[{"scaleX":0.78,"scaleY":0.78,"skewX":23.6,"skewY":-156.2,"x":45.2,"y":63.3},2]},{"n":"to","a":[{"regY":10.7,"scaleX":0.78,"scaleY":0.78,"skewX":61.9,"skewY":-117.9,"x":41},2]},{"n":"to","a":[{"regX":8.4,"regY":10.6,"scaleX":0.78,"scaleY":0.78,"skewX":113.9,"skewY":-65.9,"x":43.4,"y":54.1},3]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_4"]},{"n":"to","a":[{"rotation":89.2,"x":46.5,"y":74.4},2]},{"n":"to","a":[{"regX":33,"rotation":160,"x":32.9,"y":70.8},2]},{"n":"to","a":[{"regY":14.5,"scaleX":0.78,"scaleY":0.78,"rotation":170,"x":34.2,"y":53.9},3]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_5"]},{"n":"to","a":[{"y":25.5},4]},{"n":"to","a":[{"y":23.5},3]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_6"]},{"n":"to","a":[{"scaleY":0.79,"y":49.7},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_7"]},{"n":"to","a":[{"y":102.2},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_8"]},{"n":"to","a":[{"y":97.9},7]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"wait","a":[8]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"instance_9"}]}]},{"n":"wait","a":[8]}]],"graphics":[],"bounds":[17.3,2.2,93.7,122.9],"frameBounds":[[17.3,2.2,93.7,122.9],[15,2,96.1,122.9],[17.1,1.8,93.9,122.9],[11.3,1.5,99.7,122.9],[15.9,1.4,95.1,122.9],[17.3,0.7,93.8,123.4],[17.2,0,93.8,124.2],[17.1,-0.5,93.9,124.9]]},"Ef_02":{"shapes":[{"bn":"shape","gn":"236"}],"containers":[],"animations":[],"tweens":[[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"shape"}]}]},{"n":"wait","a":[10]}]],"graphics":[],"bounds":[1.1,1.1,12,12],"frameBounds":[[1.1,1.1,12,12],[1.1,1.1,12,12],[1.1,1.1,12,12],[1.1,1.1,12,12],[1.1,1.1,12,12],[1.1,1.1,12,12],[1.1,1.1,12,12],[1.1,1.1,12,12],[1.1,1.1,12,12],[1.1,1.1,12,12]]},"Ef":{"shapes":[{"bn":"shape","gn":"237"}],"containers":[],"animations":[],"tweens":[[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"shape"}]}]},{"n":"wait","a":[10]}]],"graphics":[],"bounds":[0,0,14.2,14.2],"frameBounds":[[0,0,14.2,14.2],[0,0,14.2,14.2],[0,0,14.2,14.2],[0,0,14.2,14.2],[0,0,14.2,14.2],[0,0,14.2,14.2],[0,0,14.2,14.2],[0,0,14.2,14.2],[0,0,14.2,14.2],[0,0,14.2,14.2]]},"EFANi":{"shapes":[{"bn":"shape","gn":"238"},{"bn":"shape_1","gn":"239"},{"bn":"shape_2","gn":"240"},{"bn":"shape_3","gn":"241"},{"bn":"shape_4","gn":"242"},{"bn":"shape_5","gn":"243"},{"bn":"shape_6","gn":"244"},{"bn":"shape_7","gn":"245"},{"bn":"shape_8","gn":"246"},{"bn":"shape_9","gn":"247"},{"bn":"shape_10","gn":"248"},{"bn":"shape_11","gn":"249"},{"bn":"shape_12","gn":"250"},{"bn":"shape_13","gn":"251"},{"bn":"shape_14","gn":"252"},{"bn":"shape_15","gn":"253"},{"bn":"shape_16","gn":"254"},{"bn":"shape_17","gn":"255"},{"bn":"shape_18","gn":"256"},{"bn":"shape_19","gn":"257"},{"bn":"shape_20","gn":"258"},{"bn":"shape_21","gn":"259"},{"bn":"shape_22","gn":"260"},{"bn":"shape_23","gn":"261"},{"bn":"shape_24","gn":"262"},{"bn":"shape_25","gn":"263"},{"bn":"shape_26","gn":"264"},{"bn":"shape_27","gn":"265"},{"bn":"shape_28","gn":"266"},{"bn":"shape_29","gn":"267"},{"bn":"shape_30","gn":"268"},{"bn":"shape_31","gn":"269"},{"bn":"shape_32","gn":"270"},{"bn":"shape_33","gn":"271"},{"bn":"shape_34","gn":"272"},{"bn":"shape_35","gn":"273"},{"bn":"shape_36","gn":"274"},{"bn":"shape_37","gn":"275"},{"bn":"shape_38","gn":"276"},{"bn":"shape_39","gn":"277"},{"bn":"shape_40","gn":"278"},{"bn":"shape_41","gn":"279"},{"bn":"shape_42","gn":"280"},{"bn":"shape_43","gn":"281"},{"bn":"shape_44","gn":"282"},{"bn":"shape_45","gn":"283"},{"bn":"shape_46","gn":"284"},{"bn":"shape_47","gn":"285"},{"bn":"shape_48","gn":"286"},{"bn":"shape_49","gn":"287"},{"bn":"shape_50","gn":"288"},{"bn":"shape_51","gn":"289"},{"bn":"shape_52","gn":"290"},{"bn":"shape_53","gn":"291"},{"bn":"shape_54","gn":"292"},{"bn":"shape_55","gn":"293"},{"bn":"shape_56","gn":"294"},{"bn":"shape_57","gn":"295"},{"bn":"shape_58","gn":"296"},{"bn":"shape_59","gn":"297"},{"bn":"shape_60","gn":"298"},{"bn":"shape_61","gn":"299"},{"bn":"shape_62","gn":"300"},{"bn":"shape_63","gn":"301"},{"bn":"shape_64","gn":"302"},{"bn":"shape_65","gn":"303"},{"bn":"shape_66","gn":"304"},{"bn":"shape_67","gn":"305"},{"bn":"shape_68","gn":"306"},{"bn":"shape_69","gn":"307"},{"bn":"shape_70","gn":"308"},{"bn":"shape_71","gn":"309"},{"bn":"shape_72","gn":"310"},{"bn":"shape_73","gn":"311"},{"bn":"shape_74","gn":"312"},{"bn":"shape_75","gn":"313"},{"bn":"shape_76","gn":"314"},{"bn":"shape_77","gn":"315"}],"containers":[],"animations":[{"bn":"instance","t":[6.2,7.3,0.69,0.69,0,0,0,7.1,7.1],"gn":"Ef_02","a":[]},{"bn":"instance_1","t":[6.2,7.3,1.127,1.127,0,0,0,7.1,7.1],"gn":"Ef","a":[]}],"tweens":[[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"shape"}]}]},{"n":"to","a":[{"state":[{"t":"shape_1"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_2"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_3"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_4"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_5"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_6"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_7"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_8"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_9"}]},1]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"shape_10"}]}]},{"n":"to","a":[{"state":[{"t":"shape_11"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_12"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_13"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_14"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_15"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_16"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_17"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_18"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_19"}]},1]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[]}]},{"n":"to","a":[{"state":[{"t":"shape_20"}]},5]},{"n":"to","a":[{"state":[{"t":"shape_21"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_22"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_23"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_24"}]},1]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[]}]},{"n":"to","a":[{"state":[{"t":"shape_25"}]},5]},{"n":"to","a":[{"state":[{"t":"shape_26"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_27"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_28","p":{"x":9.9,"y":14.3}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_28","p":{"x":9.1,"y":10.2}}]},1]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[]}]},{"n":"to","a":[{"state":[{"t":"shape_29","p":{"x":23.2,"y":13.6}}]},2]},{"n":"to","a":[{"state":[{"t":"shape_30"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_31"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_32"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_33"}]},1]},{"n":"to","a":[{"state":[]},1]},{"n":"to","a":[{"state":[{"t":"shape_29","p":{"x":28.1,"y":15}}]},2]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"shape_34","p":{"x":3.7,"y":24.6}}]}]},{"n":"to","a":[{"state":[{"t":"shape_35"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_36"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_37"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_38"}]},1]},{"n":"to","a":[{"state":[]},1]},{"n":"to","a":[{"state":[{"t":"shape_34","p":{"x":2.9,"y":28.9}}]},4]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[]}]},{"n":"to","a":[{"state":[{"t":"shape_39"}]},5]},{"n":"to","a":[{"state":[{"t":"shape_40"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_41"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_42"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_43"}]},1]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[]}]},{"n":"to","a":[{"state":[{"t":"shape_44"}]},5]},{"n":"to","a":[{"state":[{"t":"shape_45"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_46"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_47"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_48"}]},1]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[]}]},{"n":"to","a":[{"state":[{"t":"shape_49"}]},2]},{"n":"to","a":[{"state":[{"t":"shape_50"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_51"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_52","p":{"x":8.1,"y":0.2}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_52","p":{"x":6.7,"y":3.4}}]},1]},{"n":"to","a":[{"state":[]},1]},{"n":"wait","a":[3]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"shape_53","p":{"x":24.6,"y":9.1}}]}]},{"n":"to","a":[{"state":[{"t":"shape_54"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_55"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_56"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_57"}]},1]},{"n":"to","a":[{"state":[]},1]},{"n":"to","a":[{"state":[{"t":"shape_53","p":{"x":27.1,"y":7.4}}]},4]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[]}]},{"n":"to","a":[{"state":[{"t":"shape_58"}]},5]},{"n":"to","a":[{"state":[{"t":"shape_59"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_60"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_61"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_62"}]},1]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[]}]},{"n":"to","a":[{"state":[{"t":"shape_63"}]},5]},{"n":"to","a":[{"state":[{"t":"shape_64"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_65"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_66"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_67"}]},1]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[]}]},{"n":"to","a":[{"state":[{"t":"shape_68"}]},2]},{"n":"to","a":[{"state":[{"t":"shape_69"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_70","p":{"x":-2,"y":1.5}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_70","p":{"x":0.9,"y":3.3}}]},1]},{"n":"to","a":[{"state":[{"t":"shape_71"}]},1]},{"n":"to","a":[{"state":[]},1]},{"n":"wait","a":[3]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"shape_72"}]}]},{"n":"to","a":[{"state":[{"t":"shape_73"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_74"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_75"}]},1]},{"n":"to","a":[{"state":[{"t":"shape_76"}]},1]},{"n":"to","a":[{"state":[]},1]},{"n":"to","a":[{"state":[{"t":"shape_77"}]},4]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance"]},{"n":"to","a":[{"regY":7,"scaleX":0.88,"scaleY":0.88,"y":7.2},3]},{"n":"wait","a":[7]}],[{"n":"get","a":["instance_1"]},{"n":"to","a":[{"scaleX":1.48,"scaleY":1.48},3]},{"n":"wait","a":[7]}]],"graphics":[],"bounds":[-8.1,-0.6,33.9,26.5],"frameBounds":[[-8.1,-0.6,33.9,26.5],[-18,-16.9,51.9,51.9],[-20.3,-19.2,56.7,56.7],[-6.1,-7.2,27.4,25.1],[-18.2,-17.1,52,52],[-18.2,-17.1,52,52],[-18.2,-17.1,52,52],[-18.2,-17.1,52,52],[-18.2,-17.1,52,52],[-11.5,-3.1,40.8,33.2]]},"wizard_casting":{"shapes":[],"containers":[{"bn":"instance_2","t":[85.2,66.6,0.741,0.593,0,138.6,134.7,4.5,8],"gn":"L_Sholder"},{"bn":"instance_3","t":[81.1,66.4,0.686,0.71,0,135.2,134.9,17.4,21.1],"gn":"L_Heand"},{"bn":"instance_4","t":[63.8,95.4,0.781,0.798,0,0,0,40.4,48.5],"gn":"Body"},{"bn":"instance_5","t":[43.4,55.9,0.78,0.78,0,113.9,-66,8.4,10.6],"gn":"L_Sholder"},{"bn":"instance_6","t":[34.2,55.5,0.78,0.78,170,0,0,33,14.5],"gn":"wizard_casting:R_Heand"},{"bn":"instance_7","t":[62.6,26.3,0.781,0.781,0,0,0,39.3,31.9],"gn":"MagicHat"},{"bn":"instance_8","t":[58.4,51.5,0.781,0.781,0,0,0,54.4,39.2],"gn":"Head"},{"bn":"instance_9","t":[72.3,103.7,0.781,0.578,0,0,180,19.6,19.7],"gn":"R_Leg"},{"bn":"instance_10","t":[51.5,99.4,0.781,0.833,0,0,0,19.4,19.6],"gn":"R_Leg"}],"animations":[{"bn":"instance","t":[74.8,57.4,1,1,0,0,0,8.8,12.5],"gn":"EFANi","a":["synched",0]},{"bn":"instance_1","t":[39.1,38.7,1,1,0,0,0,8.8,12.5],"gn":"EFANi","a":["synched",0]},{"bn":"instance_11","t":[64.1,92.9,0.781,0.781,0,0,0,7.3,93.2],"gn":"Cloud","a":["synched",0]}],"tweens":[[{"n":"get","a":["instance"]},{"n":"to","a":[{"x":73.6,"y":55.7,"startPosition":7},7]},{"n":"to","a":[{"x":71.6,"y":57.5,"startPosition":4},7]},{"n":"to","a":[{"x":73.6,"y":55.7,"startPosition":2},8]},{"n":"to","a":[{"x":74.8,"y":57.4,"startPosition":9},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_1"]},{"n":"to","a":[{"x":37.8,"y":36.9,"startPosition":7},7]},{"n":"to","a":[{"x":36.1,"y":39.4,"startPosition":4},7]},{"n":"to","a":[{"x":37.8,"y":36.9,"startPosition":2},8]},{"n":"to","a":[{"x":39.1,"y":38.7,"startPosition":9},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_2"]},{"n":"to","a":[{"scaleX":0.74,"scaleY":0.59,"skewY":134.6,"y":63.9},7]},{"n":"to","a":[{"scaleX":0.74,"scaleY":0.59,"skewY":134.7,"y":66.6},7]},{"n":"to","a":[{"scaleX":0.74,"scaleY":0.59,"skewY":134.6,"y":63.9},8]},{"n":"to","a":[{"scaleX":0.74,"scaleY":0.59,"skewY":134.7,"y":66.6},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_3"]},{"n":"to","a":[{"scaleX":0.69,"scaleY":0.71,"x":81,"y":63.6},7]},{"n":"to","a":[{"scaleX":0.69,"scaleY":0.71,"x":81.1,"y":66.4},7]},{"n":"to","a":[{"scaleX":0.69,"scaleY":0.71,"x":81,"y":63.6},8]},{"n":"to","a":[{"scaleX":0.69,"scaleY":0.71,"x":81.1,"y":66.4},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_4"]},{"n":"to","a":[{"scaleY":0.81,"y":94.1},7]},{"n":"to","a":[{"scaleY":0.8,"y":95.1},7]},{"n":"to","a":[{"scaleY":0.81,"y":94.1},8]},{"n":"to","a":[{"scaleY":0.8,"y":95.4},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_5"]},{"n":"to","a":[{"regY":10.5,"scaleX":0.78,"scaleY":0.78,"skewX":113.8,"skewY":-66,"y":53.7},7]},{"n":"to","a":[{"regY":10.6,"scaleX":0.78,"scaleY":0.78,"skewX":113.9,"skewY":-65.9,"y":55.9},7]},{"n":"to","a":[{"regY":10.5,"scaleX":0.78,"scaleY":0.78,"skewX":113.8,"skewY":-66,"y":53.7},8]},{"n":"to","a":[{"regY":10.6,"scaleX":0.78,"scaleY":0.78,"skewX":113.9,"skewY":-65.9,"y":55.9},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_6"]},{"n":"to","a":[{"scaleX":0.78,"scaleY":0.78,"rotation":170.2,"y":53.4},7]},{"n":"to","a":[{"scaleX":0.78,"scaleY":0.78,"rotation":170,"y":55.5},7]},{"n":"to","a":[{"scaleX":0.78,"scaleY":0.78,"rotation":170.2,"y":53.4},8]},{"n":"to","a":[{"scaleX":0.78,"scaleY":0.78,"rotation":170,"y":55.5},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_7"]},{"n":"to","a":[{"y":25.5},4]},{"n":"to","a":[{"y":23.5},3]},{"n":"to","a":[{"y":26.1},7]},{"n":"to","a":[{"y":23.5},8]},{"n":"to","a":[{"y":26.3},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_8"]},{"n":"to","a":[{"scaleY":0.79,"y":49.7},7]},{"n":"to","a":[{"scaleY":0.78,"y":51.2},7]},{"n":"to","a":[{"scaleY":0.79,"y":49.7},8]},{"n":"to","a":[{"scaleY":0.78,"y":51.5},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_9"]},{"n":"to","a":[{"y":102.2},7]},{"n":"to","a":[{"y":103.7},7]},{"n":"to","a":[{"y":102.2},8]},{"n":"to","a":[{"y":103.7},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_10"]},{"n":"to","a":[{"y":97.9},7]},{"n":"to","a":[{"y":99.4},7]},{"n":"to","a":[{"y":97.9},8]},{"n":"to","a":[{"y":99.4},7]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"wait","a":[30]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"instance_11"}]}]},{"n":"wait","a":[30]}]],"graphics":[],"bounds":[17.3,2.2,93.7,122.9],"frameBounds":[[17.3,2.2,93.7,122.9],[12,2,99.1,122.9],[9.5,1.8,101.5,122.9],[17.3,1.5,93.7,122.9],[11.3,1.4,99.8,122.9],[11,0.7,100,123.4],[10.9,0,100.1,124.2],[10.7,-0.5,100.3,124.9],[10.5,-0.1,100.6,124.4],[16.9,0.1,94.1,123.9],[17.2,0.5,93.9,123.6],[9.9,0.9,101.1,123.4],[7.4,1.3,103.6,123.2],[17.3,1.6,93.8,123],[9,2,102.1,122.8],[9.1,1.6,101.9,123.5],[9.4,1.4,101.6,123.6],[9.6,1,101.4,123.7],[9.9,0.7,101.2,123.8],[16.8,0.4,94.3,123.9],[17.3,0,93.8,124.1],[10.7,-0.2,100.3,124.5],[8.6,-0.5,102.4,124.9],[17.1,-0.1,93.9,124.4],[11,0.2,100,123.8],[11.3,0.6,99.8,123.6],[11.4,1,99.6,123.3],[11.6,1.5,99.4,123],[11.8,1.9,99.3,122.8],[17.3,2.2,93.8,122.6]]},"wizard_move_back":{"shapes":[],"containers":[{"bn":"instance","t":[62.6,26.3,0.781,0.781,0,0,0,39.3,31.9],"gn":"wizard_move_back:MagicHat"},{"bn":"instance_1","t":[63.8,95.4,0.781,0.798,0,0,0,40.4,48.5],"gn":"wizard_move_back:Body"},{"bn":"instance_2","t":[44.3,62.2,0.781,0.781,0,155.5,-24.4,8.6,10.6],"gn":"wizard_move_back:L_Sholder"},{"bn":"instance_3","t":[97,71.3,0.742,0.724,0,-12.3,-10.6,25.8,27.5],"gn":"wizard_move_back:L_Sholder"},{"bn":"instance_4","t":[85.1,70.1,0.686,0.711,0,-15.1,-15.5,17.3,21],"gn":"wizard_move_back:L_Heand"},{"bn":"instance_5","t":[58.4,51.5,0.781,0.781,0,0,0,54.4,39.2],"gn":"wizard_move_back:Head"},{"bn":"instance_6","t":[38.4,57.3,0.781,0.781,-174.4,0,0,32.9,14.7],"gn":"wizard_move_back:R_Heand"},{"bn":"instance_7","t":[74.3,99.4,0.781,0.578,0,0,180,19.6,19.7],"gn":"R_Leg"},{"bn":"instance_8","t":[52.4,103.6,0.781,0.833,0,0,0,19.4,19.6],"gn":"R_Leg"}],"animations":[{"bn":"instance_9","t":[64.1,92.9,0.781,0.781,0,0,0,7.3,93.2],"gn":"Cloud","a":["synched",0]}],"tweens":[[{"n":"get","a":["instance"]},{"n":"to","a":[{"y":24.9},7]},{"n":"to","a":[{"y":26.1},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_1"]},{"n":"to","a":[{"y":94.1},7]},{"n":"to","a":[{"y":95.1},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_2"]},{"n":"to","a":[{"y":60.6},7]},{"n":"to","a":[{"y":62.2},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_3"]},{"n":"to","a":[{"y":70.1},7]},{"n":"to","a":[{"y":70.7},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_4"]},{"n":"to","a":[{"y":68.6},7]},{"n":"to","a":[{"y":69.9},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_5"]},{"n":"to","a":[{"y":50.2},7]},{"n":"to","a":[{"y":51.2},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_6"]},{"n":"to","a":[{"y":56.5},7]},{"n":"to","a":[{"y":57.3},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_7"]},{"n":"to","a":[{"y":98.2},7]},{"n":"to","a":[{"y":99.1},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_8"]},{"n":"to","a":[{"regY":19.7,"y":102.4},7]},{"n":"to","a":[{"y":103.3},7]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"wait","a":[15]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"instance_9"}]}]},{"n":"wait","a":[15]}]],"graphics":[],"bounds":[17.3,2,93.7,123.2],"frameBounds":[[17.3,2,93.7,123.2],[17.3,1.8,93.7,123.2],[17.3,1.5,93.7,123.1],[17.3,1.4,93.7,123.1],[17.3,1.1,93.7,123.2],[17.3,0.9,93.8,123.2],[17.2,0.7,93.8,123.5],[17.1,0.5,93.9,123.8],[17.1,0.8,93.9,123.4],[17.2,0.9,93.9,123.1],[17.2,1.1,93.9,123.1],[17.2,1.3,93.8,123.1],[17.2,1.5,93.8,123],[17.3,1.6,93.8,123.1],[17.3,1.8,93.8,123.1]]},"wizard_move":{"shapes":[],"containers":[{"bn":"instance","t":[82.6,64.5,0.742,0.724,0,96.7,98.3,4.7,8],"gn":"L_Sholder"},{"bn":"instance_1","t":[73.8,68.7,0.686,0.711,0,146.9,146.4,17.4,21],"gn":"L_Heand"},{"bn":"instance_2","t":[62.6,26.3,0.781,0.781,0,0,0,39.3,31.9],"gn":"MagicHat"},{"bn":"instance_3","t":[63.8,95.4,0.781,0.798,0,0,0,40.4,48.5],"gn":"wizard_move:Body"},{"bn":"instance_4","t":[49,61.8,0.781,0.781,0,15.7,-164.2,8.6,10.6],"gn":"L_Sholder"},{"bn":"instance_5","t":[50.9,64.2,0.781,0.781,18,0,0,32.9,14.6],"gn":"R_Heand"},{"bn":"instance_6","t":[58.4,51.5,0.781,0.781,0,0,0,54.4,39.2],"gn":"Head"},{"bn":"instance_7","t":[72.3,103.7,0.781,0.578,0,0,180,19.6,19.7],"gn":"R_Leg"},{"bn":"instance_8","t":[51.5,99.4,0.781,0.833,0,0,0,19.4,19.6],"gn":"R_Leg"}],"animations":[{"bn":"instance_9","t":[64.1,92.9,0.781,0.781,0,0,0,7.3,93.2],"gn":"Cloud","a":["synched",0]}],"tweens":[[{"n":"get","a":["instance"]},{"n":"to","a":[{"y":62.8},7]},{"n":"to","a":[{"y":64.5},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_1"]},{"n":"to","a":[{"y":66.9},7]},{"n":"to","a":[{"y":68.7},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_2"]},{"n":"to","a":[{"y":24.9},7]},{"n":"to","a":[{"y":26.1},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_3"]},{"n":"to","a":[{"y":94.1},7]},{"n":"to","a":[{"y":95.1},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_4"]},{"n":"to","a":[{"y":60.5},7]},{"n":"to","a":[{"y":61.8},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_5"]},{"n":"to","a":[{"y":62.9},7]},{"n":"to","a":[{"y":64.2},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_6"]},{"n":"to","a":[{"y":50.2},7]},{"n":"to","a":[{"y":51.2},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_7"]},{"n":"to","a":[{"y":102.2},7]},{"n":"to","a":[{"y":103.7},7]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_8"]},{"n":"to","a":[{"y":97.9},7]},{"n":"to","a":[{"y":99.4},7]},{"n":"wait","a":[1]}],[{"n":"get","a":[null]},{"n":"wait","a":[15]}],[{"n":"get","a":[null]},{"n":"to","a":[{"state":[{"t":"instance_9"}]}]},{"n":"wait","a":[15]}]],"graphics":[],"bounds":[17.3,2.2,93.7,122.9],"frameBounds":[[17.3,2.2,93.7,122.9],[17.3,2,93.7,122.9],[17.3,1.8,93.7,122.9],[17.3,1.6,93.7,122.9],[17.3,1.4,93.7,122.9],[17.3,1.1,93.8,122.9],[17.2,1,93.8,123.2],[17.1,0.8,93.9,123.5],[17.1,1,93.9,123.2],[17.2,1.1,93.9,122.9],[17.2,1.4,93.9,122.8],[17.2,1.5,93.8,122.8],[17.2,1.7,93.8,122.8],[17.3,1.9,93.8,122.8],[17.3,2,93.8,122.8]]},"Face_15_JSCC":{"shapes":[],"containers":[{"bn":"instance","t":[64.6,27.1,1,1,0,0,0,62.3,41.6],"gn":"Cap"},{"bn":"instance_1","t":[62.7,102.4,1,1,0,0,0,39.9,24.3],"gn":"Coat"},{"bn":"instance_2","t":[66.8,66.3,1,1,0,0,0,50.5,48.2],"gn":"Face_15_JSCC:Head"},{"bn":"instance_3","t":[61,87.1,1,1,0,0,0,62.5,37.7],"gn":"Face_15_JSCC:Body"}],"animations":[],"tweens":[[{"n":"get","a":["instance"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":27.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":28.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":27.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":27.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":27.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":27.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":27.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":27.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":27.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":28.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":28.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":28.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":28.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":28.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":27.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":27.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":27.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":27.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":28},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":28.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":28.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":28.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":28.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":28},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":27.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":27.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":27.1},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_1"]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":102.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":102.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":102.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":102.6},0]},{"n":"wait","a":[1]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":102.5},0]},{"n":"wait","a":[1]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":102.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":102.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":102.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":103.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":103.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":103.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":103.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":103},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":102.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":102.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":102.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":103.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":103.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":103.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":103.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":103.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":103.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":102.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":102.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":102.4},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_2"]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.01,"y":66.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.02,"y":67.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.01,"y":66.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.01,"y":66.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.01,"y":66.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1,"y":66.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1,"y":66.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1,"y":66.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":48.3,"scaleY":1.01,"y":66.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":48.2,"scaleY":1.01,"y":66.9},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":48.1,"scaleY":1.02,"y":67.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":48.2,"scaleY":1.03,"y":67.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.02,"y":67.4},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.02,"y":67.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.01,"y":66.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.01,"y":66.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1,"y":66.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":48.1,"scaleY":1.01,"y":66.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":48.2,"scaleY":1.01,"y":67},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":48.1,"scaleY":1.02,"y":67.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":48.2,"scaleY":1.03,"y":67.7},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":48.3,"scaleY":1.02,"y":67.5},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":48.2,"scaleY":1.02,"y":67.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1.01,"y":67},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":48.3,"scaleY":1.01,"y":66.8},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regY":48.2,"scaleY":1,"y":66.6},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleY":1,"y":66.3},0]},{"n":"wait","a":[1]}],[{"n":"get","a":["instance_3"]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1.01,"scaleY":1.01},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":62.6,"scaleX":1.01,"scaleY":1.01,"x":61.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":62.5,"regY":37.6,"scaleX":1,"scaleY":1,"x":61,"y":87},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":62.6,"scaleX":1,"scaleY":1,"x":61.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":62.5,"regY":37.7,"scaleX":1,"scaleY":1,"x":61,"y":87.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":62.6,"scaleX":1,"scaleY":1,"x":61.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":62.5,"scaleX":1,"scaleY":1,"x":61},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1.01,"scaleY":1.01},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":87.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"y":87.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1.01,"scaleY":1.01},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":62.6,"scaleX":1,"scaleY":1,"x":61.1,"y":87.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":62.5,"scaleX":1,"scaleY":1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"x":61,"y":87.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"y":87.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1,"scaleY":1,"x":61.1,"y":87.3},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"scaleX":1.01,"scaleY":1.01,"x":61},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":62.6,"scaleX":1.01,"scaleY":1.01,"x":61.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":62.5,"regY":37.6,"scaleX":1,"scaleY":1,"x":61,"y":87.2},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":62.6,"scaleX":1,"scaleY":1,"x":61.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":62.5,"regY":37.7,"scaleX":1,"scaleY":1,"x":61},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":62.6,"scaleX":1,"scaleY":1,"x":61.1,"y":87.1},0]},{"n":"wait","a":[1]},{"n":"to","a":[{"regX":62.5,"scaleX":1,"scaleY":1,"x":61},0]},{"n":"wait","a":[1]}]],"graphics":[],"bounds":[2.1,-14.4,124.8,141.2],"frameBounds":[[2.1,-14.4,124.8,141.2],[1.9,-13.9,125,140.9],[1.7,-13.4,125.2,140.7],[1.8,-13.9,125.2,140.9],[1.8,-14,125.1,141],[1.9,-14.1,125,141],[2,-14.2,125,141.1],[2,-14.3,124.9,141.1],[2.1,-14.4,124.8,141.2],[1.9,-13.9,125,140.9],[1.7,-13.4,125.2,140.7],[1.7,-13,125.2,140.8],[1.7,-12.7,125.2,140.9],[1.8,-13,125.2,141],[1.9,-13.4,125.1,141],[2,-13.7,125,141.1],[2,-14.1,124.9,141.1],[2.1,-14.4,124.8,141.2],[2,-13.9,124.9,141.1],[1.9,-13.5,125,141],[1.8,-13.1,125.1,141],[1.7,-12.7,125.2,140.9],[1.8,-12.9,125.2,141],[1.8,-13.2,125.1,141],[1.9,-13.5,125,141],[2,-13.8,125,141.1],[2,-14.1,124.9,141.1],[2.1,-14.4,124.8,141.2]]}}},"actions":{"idle":{"animation":"wizard_cast_start","frames":"0","loops":false,"framerate":16,"flipX":true},"move":{"relatedActions":{"fore":{"animation":"wizard_move","framerate":16},"side":{"animation":"wizard_move","framerate":16,"flipX":true},"back":{"animation":"wizard_move_back","framerate":16}}},"cast":{"relatedActions":{"begin":{"animation":"wizard_cast_start","framerate":16,"loops":false,"flipX":true},"end":{"animation":"wizard_cast_end","framerate":16,"loops":false,"flipX":true}},"animation":"wizard_casting","framerate":16},"portrait":{"animation":"Face_15_JSCC","scale":0.83}},"rotationType":"isometric","shadow":2.5,"layerPriority":10,"scale":0.3,"positions":{"registration":{"x":-60,"y":-110},"torso":{"x":0,"y":-35},"mouth":{"x":-25,"y":-50},"aboveHead":{"x":0,"y":-110}},"commitMessage":"Switched cloud color to team color.","parent":"52ebe89922aad10000000030","components":[{"original":"524b85837fc0f6d519000020","majorVersion":0},{"original":"52c8db98a87ed54d100004d7","majorVersion":0,"config":{"bobTime":2,"bobHeight":1.5}},{"original":"524b4150ff92f1f4f8000024","majorVersion":0},{"original":"524b75ad7fc0f6d519000001","majorVersion":0,"config":{"pos":{"x":20,"y":20,"z":2},"width":1.5,"height":1.5,"depth":2}}],"colorGroups":{"clothes":["6","8","10","25","26","27","28","29","30","31","33","34","35","39","41","43","75","76","77","79","80","81","82","109","110","111","113","114","115","116","225","227","229","319","321","323","338","339","340","341","342","343","344","348","349","350","354","356","358","384","385","386","388","389","390","391","416","417","418","421","429","431","433","435","436","437","440","442","444","445","446","449","450","451","452","457","458","459"],"trim":["5","7","9","20","21","22","38","40","42","51","56","57","58","59","60","63","64","66","68","69","70","71","72","73","74","78","85","90","91","92","93","95","97","98","100","102","103","104","105","106","107","108","112","224","226","228","318","320","322","335","336","337","353","355","357","370","371","372","375","376","378","379","380","381","382","383","387","397","398","399","402","403","406","407","408","409","410","411","412","419","420","426","427","428","430","432","454","455","456"],"spell":["237","259","261","262","267","268","269","270","271","273","275","276","278","280","281","283","285","286","287","288","289","290","292","294","295","297","299","300","301","302","303","304","305","306","307","308","309","311","313","314"],"boots":["1","2"],"team":["119","120","121","122","123","124","125","126","127","128","129","130","131","132","133","134","135","136","137","138","139","140","141","142","143","144","145","146","147","148","149","150","151","152","153","154","155","156","157","158","159","160","161","162","163","164","165","166","167","168","169","170","171","172","173","174","175","176","177","178","179","180","181","182","183","184","185","186","187","188","189","190","191","192","193","194","195","196","197","198","199","200","201","202","203","204","205","206","207","208","209","210","211","212","213","214","215","216","217","218","219","220","221"]},"kind":"Unit","created":"2014-03-17T06:08:10.353Z","version":{"isLatestMinor":true,"isLatestMajor":true,"minor":19,"major":0}}'
  });
  takenNames = ['bobson'];
  server = function() {
    var name, request;
    request = jasmine.Ajax.requests.mostRecent();
    name = request.url.split('/')[3];
    if (indexOf.call(takenNames, name) >= 0) {
      request.response({
        status: 409,
        responseText: JSON.stringify({
          name: name + '0'
        })
      });
    } else {
      request.response({
        status: 200,
        responseText: JSON.stringify({
          name: name
        })
      });
    }
    return console.log(request);
  };
  server = _.debounce(server, 500);
  Backbone.listenTo(modal, 'nameChanged', server);
};
});

;require.register("test/demo/views/user/JobProfileView.demo", function(exports, require, module) {
var JobProfileView, responses;

JobProfileView = require('views/user/JobProfileView');

responses = {
  '/db/user/joe/nameToID': '512ef4805a67a8c507000001',
  '/db/user/512ef4805a67a8c507000001': {
    "_id": "512ef4805a67a8c507000001",
    "__v": 47,
    "email": "livelily@gmail.com",
    "emailSubscriptions": ["announcement", "notification", "developer", "level_creator", "tester", "article_editor", "translator", "support"],
    "facebookID": "4301215",
    "firstName": "Nick",
    "gender": "male",
    "lastName": "Winter",
    "name": "Nick!",
    "photoURL": "db/user/512ef4805a67a8c507000001/nick_wizard.png",
    "volume": 0,
    "wizardColor1": 0.4,
    "testGroupNumber": 217,
    "mailChimp": {
      "leid": "70264209",
      "euid": "c4418e2abd",
      "email": "livelily@gmail.com"
    },
    "hourOfCode": true,
    "hourOfCodeComplete": true,
    "signedCLA": "Fri Jan 03 2014 14:40:18 GMT-0800 (PST)",
    "wizard": {
      "colorConfig": {
        "boots": {
          "lightness": 0.1647058823529412,
          "saturation": 0.023809523809523805,
          "hue": 0
        },
        "spell": {
          "hue": 0.7490196078431373,
          "saturation": 0.4106280193236715,
          "lightness": 0.5941176470588235
        },
        "cloud": {
          "lightness": 0.14,
          "saturation": 1,
          "hue": 0
        },
        "clothes": {
          "lightness": 0.1411764705882353,
          "saturation": 0,
          "hue": 0
        },
        "trim": {
          "hue": 0.5,
          "saturation": 0.009900990099009936,
          "lightness": 0.19803921568627453
        }
      }
    },
    "aceConfig": {
      "liveCompletion": true,
      "indentGuides": true,
      "invisibles": true,
      "keyBindings": "emacs",
      "behaviors": true,
      "language": "javascript"
    },
    "lastLevel": "drink-me",
    "gplusID": "110703832132860599877",
    "jobProfile": {
      "photoURL": "db/user/512ef4805a67a8c507000001/nick_bokeh_small.jpg",
      "links": [
        {
          "name": "LinkedIn",
          "link": "https://www.linkedin.com/in/nwinter"
        }, {
          "name": "Blog",
          "link": "http://blog.nickwinter.net/"
        }, {
          "name": "Personal Site",
          "link": "http://www.nickwinter.net/"
        }, {
          "name": "GitHub",
          "link": "https://github.com/nwinter"
        }, {
          "name": "G+",
          "link": "https://plus.google.com/u/0/+NickWinter"
        }
      ],
      "projects": [
        {
          "name": "The Motivation Hacker",
          "description": "I wrote a book. *The Motivation Hacker* shows you how to summon extreme amounts of motivation to accomplish anything you can think of. From precommitment to rejection therapy, this is your field guide to getting yourself to want to do everything you always wanted to want to do.",
          "picture": "db/user/512ef4805a67a8c507000001/the_motivation_hacker_thumb.jpg",
          "link": "http://www.nickwinter.net/motivation-hacker"
        }, {
          "name": "Quantified Mind",
          "description": "Quantified Mind is a tool that quickly, reliably, and comprehensively measures your basic cognitive abilities. We've adapted tests used by psychologists to a practical web application that you can use whenever, wherever, and as often as you want.",
          "picture": "db/user/512ef4805a67a8c507000001/screenshot.png",
          "link": "http://www.quantified-mind.com/"
        }, {
          "link": "https://github.com/nwinter/telepath-logger",
          "name": "Telepath",
          "description": "A happy Mac keylogger for Quantified Self purposes. It also now serves as a time lapse heads-up-display thing. I used it to make a [time-lapse video of myself working an 120-hour workweek](http://blog.nickwinter.net/the-120-hour-workweek-epic-coding-time-lapse).",
          "picture": "db/user/512ef4805a67a8c507000001/687474703a2f2f63646e2e736574742e636f6d2f696d616765732f757365722f32303133313131303139353534393937375a30356665633666623234623937323263373733636231303537613130626336365f66726f6e742e6a7067"
        }
      ],
      "education": [
        {
          "school": "Oberlin College",
          "degree": "BA Computer Science, Mathematics, and East Asian Studies, highest honors in CS",
          "duration": "Aug 2004 - May 2008",
          "description": "Cofounded Oberlin Street Art and did all sorts of crazy missions without telling anyone about it."
        }
      ],
      "work": [
        {
          "employer": "CodeCombat",
          "role": "Cofounder",
          "duration": "Jan 2013 - present",
          "description": "Programming a programming game for learning programming to be a programming programmer of programmatic programs."
        }, {
          "employer": "Skritter",
          "role": "Cofounder",
          "duration": "May 2008 - present",
          "description": "I coded, I designed, I marketed, I businessed, I wrote, I drudged, I cheffed, I laughed, I cried. But mostly I emailed. God, so much email."
        }
      ],
      "visa": "Authorized to work in the US",
      "longDescription": "I cofounded Skritter, am working on CodeCombat, helped with Quantified Mind, live in San Francisco, went to Oberlin College, wrote a book about motivation hacking, and can do anything.\n\nI like hacking on startups, pigs with dogs for feet, and Smash Bros. I dislike shoes, mortality, and Java.\n\nDo you love hiring renegade maverick commandos who can't abide the system? Are you looking to hire the sample job profile candidate of the job profile system? Are you just testing this thing? If your answer is yes, yes yes!–then let us talk.",
      "shortDescription": "Maniac two-time startup cofounder looking to test the system and see what a job profile might look like. Can't nobody hold him down.",
      "experience": 6,
      "skills": ["python", "coffeescript", "node", "ios", "objective-c", "javascript", "app-engine", "mongodb", "web dev", "django", "backbone", "chinese", "qs", "writing"],
      "country": "USA",
      "city": "San Francisco",
      "active": false,
      "lookingFor": "Full-time",
      "name": "Nick Winter",
      "updated": "2014-07-12T01:48:42.980Z",
      "jobTitle": "Mutant Code Gorilla"
    },
    "jobProfileApproved": false,
    "emails": {
      "anyNotes": {
        "enabled": true
      },
      "generalNews": {
        "enabled": true
      },
      "archmageNews": {
        "enabled": true
      },
      "artisanNews": {
        "enabled": true
      },
      "adventurerNews": {
        "enabled": true
      },
      "scribeNews": {
        "enabled": true
      },
      "diplomatNews": {
        "enabled": true
      },
      "ambassadorNews": {
        "enabled": true
      }
    },
    "activity": {
      "viewed_by_employer": {
        "last": "2014-06-19T20:21:43.747Z",
        "count": 6,
        "first": "2014-06-12T01:37:38.278Z"
      },
      "view_candidate": {
        "first": "2014-06-10T19:59:30.773Z",
        "count": 661,
        "last": "2014-07-11T02:14:40.131Z"
      },
      "login": {
        "first": "2014-06-10T21:55:08.968Z",
        "count": 22,
        "last": "2014-07-16T16:32:31.661Z"
      },
      "contacted_by_employer": {
        "first": "2014-06-19T20:24:51.870Z",
        "count": 1,
        "last": "2014-06-19T20:24:51.870Z"
      }
    },
    "slug": "nick",
    "jobProfileNotes": "Nick used to be the **#1 Brawlwood player** on CodeCombat. He wrote most of the game engine, so that's totally cheating. Now other players have surpassed him by emulating his moves and improving his strategy. If you like the sixth Rocky movie, you might still want to hire this aging hero even in his fading senescence.",
    "simulatedFor": 2363,
    "simulatedBy": 103674,
    "preferredLanguage": "en-US",
    "anonymous": false,
    "permissions": ["admin"],
    "autocastDelay": 90019001,
    "music": false,
    "dateCreated": "2013-02-28T06:09:04.743Z"
  },
  '/db/user/512ef4805a67a8c507000001/level.sessions/employer': [
    {
      "_id": "53179b49b483edfcdb7ef13e",
      "level": {
        "original": "53173f76c269d400000543c2",
        "majorVersion": 0
      },
      "code": {},
      "submitted": false,
      "teamSpells": {
        "ogres": ["programmable-brawler/chooseAction", "programmable-shaman/chooseAction", "ogre-base/chooseAction"],
        "humans": ["programmable-librarian/chooseAction", "programmable-tharin/chooseAction", "human-base/chooseAction"]
      },
      "levelID": "dungeon-arena",
      "levelName": "Dungeon Arena",
      "submittedCodeLanguage": "javascript",
      "playtime": 33,
      "codeLanguage": "javascript"
    }, {
      "_id": "53336ee91506ed33756f73e5",
      "level": {
        "original": "533353722a61b7ca6832840c",
        "majorVersion": 0
      },
      "code": {},
      "teamSpells": {
        "humans": ["programmable-coin/chooseAction", "tharin/chooseAction", "wizard-purple/chooseAction"]
      },
      "levelID": "gold-rush",
      "levelName": "Resource gathering multiplayer",
      "submittedCodeLanguage": "javascript",
      "playtime": 0,
      "codeLanguage": "javascript"
    }, {
      "_id": "52ae32cbef42c52f1300000d",
      "level": {
        "original": "52ae2460ef42c52f13000008",
        "majorVersion": 0
      },
      "levelID": "gridmancer",
      "levelName": "Gridmancer",
      "code": {},
      "teamSpells": {
        "humans": ["thoktar"]
      },
      "submitted": false,
      "submittedCodeLanguage": "javascript",
      "playtime": 302,
      "codeLanguage": "javascript"
    }, {
      "_id": "5334901f0a0f9b286f57382c",
      "level": {
        "original": "533353722a61b7ca6832840c",
        "majorVersion": 0
      },
      "team": "humans",
      "code": {},
      "teamSpells": {
        "common": ["coin-generator-9000/chooseAction"],
        "humans": ["tharin/chooseAction"],
        "ogres": ["mak-fod/chooseAction"]
      },
      "levelID": "gold-rush",
      "levelName": "Gold Rush",
      "totalScore": 39.23691444835561,
      "submitted": true,
      "submittedCodeLanguage": "javascript",
      "playtime": 1158,
      "codeLanguage": "javascript"
    }, {
      "_id": "52dea9b77e486eeb97000001",
      "level": {
        "original": "52d97ecd32362bc86e004e87",
        "majorVersion": 0
      },
      "levelID": "brawlwood",
      "levelName": "Brawlwood",
      "code": {},
      "totalScore": 24.138610165979667,
      "teamSpells": {
        "humans": ["programmable-artillery/chooseAction", "programmable-artillery/hear", "programmable-soldier/chooseAction", "programmable-soldier/hear", "s-arrow-tower/chooseAction", "programmable-archer/chooseAction", "programmable-archer/hear", "human-base/chooseAction", "human-base/hear"],
        "ogres": ["programmable-shaman/chooseAction", "programmable-shaman/hear", "n-beam-tower/chooseAction", "programmable-thrower/chooseAction", "programmable-thrower/hear", "programmable-munchkin/chooseAction", "programmable-munchkin/hear", "ogre-base/chooseAction", "ogre-base/hear"]
      },
      "team": "humans",
      "submitted": true,
      "submittedCodeLanguage": "javascript",
      "playtime": 0,
      "codeLanguage": "javascript"
    }, {
      "_id": "535701331bfa9bba14b5e03d",
      "level": {
        "original": "53558b5a9914f5a90d7ccddb",
        "majorVersion": 0
      },
      "team": "ogres",
      "levelID": "greed",
      "levelName": "Greed",
      "code": {},
      "teamSpells": {
        "humans": ["human-base/chooseAction"],
        "ogres": ["ogre-base/chooseAction"],
        "common": ["well/chooseAction"]
      },
      "totalScore": 36.77589873873074,
      "submitted": true,
      "submittedCodeLanguage": "javascript",
      "playtime": 12893,
      "codeLanguage": "javascript"
    }, {
      "_id": "5356fc2e1bfa9bba14b5e039",
      "level": {
        "original": "53558b5a9914f5a90d7ccddb",
        "majorVersion": 0
      },
      "team": "humans",
      "levelID": "greed",
      "levelName": "Greed",
      "code": {},
      "teamSpells": {
        "humans": ["human-base/chooseAction"],
        "ogres": ["ogre-base/chooseAction"],
        "common": ["well/chooseAction"]
      },
      "totalScore": 31.538998178536794,
      "submitted": true,
      "submittedCodeLanguage": "javascript",
      "playtime": 15648,
      "codeLanguage": "javascript"
    }, {
      "_id": "52fd5bf7e3c53130231726e1",
      "level": {
        "original": "52d97ecd32362bc86e004e87",
        "majorVersion": 0
      },
      "team": "ogres",
      "levelID": "brawlwood",
      "levelName": "Brawlwood",
      "submitted": true,
      "totalScore": 53.73511062513137,
      "teamSpells": {
        "humans": ["programmable-artillery/chooseAction", "programmable-artillery/hear", "programmable-soldier/chooseAction", "programmable-soldier/hear", "s-arrow-tower/chooseAction", "programmable-archer/chooseAction", "programmable-archer/hear", "human-base/chooseAction", "human-base/hear"],
        "ogres": ["programmable-shaman/chooseAction", "programmable-shaman/hear", "n-beam-tower/chooseAction", "programmable-thrower/chooseAction", "programmable-thrower/hear", "programmable-munchkin/chooseAction", "programmable-munchkin/hear", "ogre-base/chooseAction", "ogre-base/hear"]
      },
      "code": {},
      "submittedCodeLanguage": "javascript",
      "playtime": 178,
      "codeLanguage": "javascript"
    }, {
      "_id": "5317ad4909098828ed071f4d",
      "level": {
        "original": "53173f76c269d400000543c2",
        "majorVersion": 0
      },
      "team": "humans",
      "levelID": "dungeon-arena",
      "levelName": "Dungeon Arena",
      "submitted": true,
      "totalScore": 38.19039674380126,
      "code": {},
      "teamSpells": {
        "ogres": ["programmable-brawler/chooseAction", "programmable-shaman/chooseAction", "ogre-base/chooseAction"],
        "humans": ["programmable-librarian/chooseAction", "programmable-tharin/chooseAction", "human-base/chooseAction"]
      },
      "submittedCodeLanguage": "javascript",
      "playtime": 9753,
      "codeLanguage": "javascript"
    }, {
      "_id": "53361c80948ad7a777a10d9c",
      "level": {
        "original": "533353722a61b7ca6832840c",
        "majorVersion": 0
      },
      "team": "ogres",
      "levelID": "gold-rush",
      "levelName": "Gold Rush",
      "code": {},
      "teamSpells": {
        "common": ["coin-generator-9000/chooseAction"],
        "humans": ["tharin/chooseAction"],
        "ogres": ["mak-fod/chooseAction"]
      },
      "totalScore": 40.73558595296533,
      "submitted": true,
      "submittedCodeLanguage": "javascript",
      "playtime": 1014,
      "codeLanguage": "javascript"
    }, {
      "_id": "531920069f44be00001a7aef",
      "level": {
        "original": "53173f76c269d400000543c2",
        "majorVersion": 0
      },
      "team": "ogres",
      "levelID": "dungeon-arena",
      "levelName": "Dungeon Arena",
      "submitted": true,
      "totalScore": 26.50666470188054,
      "code": {},
      "teamSpells": {
        "ogres": ["programmable-brawler/chooseAction", "programmable-shaman/chooseAction", "ogre-base/chooseAction"],
        "humans": ["programmable-librarian/chooseAction", "programmable-tharin/chooseAction", "human-base/chooseAction"]
      },
      "submittedCodeLanguage": "javascript",
      "playtime": 1786,
      "codeLanguage": "javascript"
    }
  ]
};

module.exports = function() {
  var request, requests, responseBody, url, v;
  me.isAdmin = function() {
    return false;
  };
  me.set('permissions', ['employer']);
  v = new JobProfileView({}, 'joe');
  for (url in responses) {
    responseBody = responses[url];
    requests = jasmine.Ajax.requests.filter(url);
    if (!requests.length) {
      console.error("could not find response for <" + url + ">", responses);
      continue;
    }
    request = requests[0];
    request.response({
      status: 200,
      responseText: JSON.stringify(responseBody)
    });
  }
  return v;
};
});

;require.register("test/demo/views/user/UserNotFound.demo", function(exports, require, module) {
var UserAchievementsView;

UserAchievementsView = require('views/user/achievements');

module.exports = function() {
  var userRequest, view;
  view = new UserAchievementsView({}, 'thisiddoesntexist');
  userRequest = jasmine.Ajax.requests.mostRecent();
  userRequest.response({
    status: 404
  });
  return view.render();
};
});

;
//# sourceMappingURL=/javascripts/app/demo-app.js.map