(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.ProcessingSk = {})));
}(this, (function (exports) { 'use strict';

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  /* global Sk, require */
  if (typeof require === "function") {
    var fs = require("fs");

    var skulpt = fs.readFileSync("bower_components/skulpt/skulpt.min.js").toString();
    (0, eval)(skulpt);
  }

  var _Sk$builtin = Sk.builtin,
      str = _Sk$builtin.str,
      func = _Sk$builtin.func,
      NotImplementedError = _Sk$builtin.NotImplementedError,
      pyCheckArgs = _Sk$builtin.pyCheckArgs,
      ValueError = _Sk$builtin.ValueError,
      TypeError$1 = _Sk$builtin.TypeError;
  var _Sk$ffi = Sk.ffi,
      remapToJs = _Sk$ffi.remapToJs,
      remapToPy = _Sk$ffi.remapToPy;
  var _Sk$misceval = Sk.misceval,
      buildClass = _Sk$misceval.buildClass,
      callsim = _Sk$misceval.callsim;
  var assign = Object.assign,
      keys = Object.keys;
  var argsToArray = Array.from;
  var cache = new Map();
  var OptionalContextManager;

  function countNonOptionalArgs(args) {
    return args === undefined ? 0 : args.filter(function (a) {
      return !a.optional;
    }).length;
  }

  function join(func, arr1, arr2) {
    return arr1.map(function (v, i) {
      return func(v, arr2[i]);
    });
  }

  function pyCheckTypes(name, args) {
    args.forEach(function (a) {
      var _a = _slicedToArray(a, 2),
          arg = _a[0],
          template = _a[1];

      var keys = Object.keys(template);
      var argName = keys[0];

      if (!Array.isArray(template[argName])) {
        template[argName] = [template[argName]];
      } // if a is true i.e. a short cut if you don't want the type to be checked Any or self.
      // and it has to be really true not just truthy.


      if (!template[argName].some(function (a) {
        if (a === true) {
          return true;
        }

        if (typeof a === "string") {
          return arg.tp$name === a;
        }

        return arg instanceof a && (!a.allowed || arg in a.allowed);
      })) {
        throw new TypeError$1("".concat(name, ": ").concat(argName, " (value: ").concat(remapToJs(arg), ") not of type ").concat(template[argName].map(function (t) {
          return t.tp$name;
        })));
      }
    });
  }

  function makeFunc(thingToWrap, name, args_template) {
    var largs_template = args_template || [];

    var jsfunc = function wrappedFunc() {
      if (!isInitialised()) {
        throw new Error("cannot call \"".concat(name, "\" outside \"draw\", \"setup\" or event handlers"));
      }

      var functionToWrap = null;

      if (typeof thingToWrap !== "function") {
        if (thingToWrap[name]) {
          functionToWrap = thingToWrap[name];
        }
      } else {
        functionToWrap = thingToWrap;
      }

      if (functionToWrap == null) {
        throw new Error("Couldn't infer function to wrap");
      }

      var args = argsToArray(arguments).filter(function (a) {
        return a !== undefined;
      });
      pyCheckArgs(name, args, countNonOptionalArgs(largs_template), largs_template.length, false);
      pyCheckTypes(name, join(function (l, r) {
        return [l, r];
      }, args, largs_template));
      var js_args = args.filter(function (a, i) {
        return largs_template[i].ignored === undefined || !largs_template[i].ignored;
      }).map(function (a, i) {
        var template = largs_template[i];

        if (template === self) {
          return a;
        }

        if (template.converter) {
          return template.converter(remapToJs(a));
        }

        return remapToJs(a);
      });
      var result = functionToWrap.apply(null, js_args);
      return remapToPy(result);
    };

    return new func(jsfunc);
  }
  function strToColor(input) {
    if (typeof input === "string") {
      var res = /#([A-F0-9]{6})/g.exec(input);

      if (res.length !== 2) {
        throw new ValueError("".concat(input, " not in the correct format for a color expecting \"#AB12F4\""));
      }

      return parseInt(res[1], 16) + 0xFF000000;
    }

    return input;
  }
  var optional = true;
  var ignored = true;
  var self = {
    "self": true
  };
  var notImplemented = new func(function () {
    throw new NotImplementedError();
  });
  var __name__ = new str("processing");
  var processingProxy = new Proxy({}, {
    get: function get(target, name) {
      return exports.processingInstance[name];
    }
  });

  function optionalContextManager(loc) {
    return function ($glb, $loc) {
      assign($loc, loc);
    };
  }

  function initUtils(mod) {
    OptionalContextManager = function OptionalContextManager(loc, name) {
      return buildClass(mod, optionalContextManager(loc), "OptionalContextManager_" + name, []);
    };
  }
  function constructOptionalContectManager(loc, name) {
    var funcs = keys(loc);

    if (!funcs.includes("__call__") || !funcs.includes("__enter__") || !funcs.includes("__exit__")) {
      throw new Error("The optional context manager needs a __call__, __enter__ and __exit__ function.");
    }

    return callsim(OptionalContextManager(loc, name));
  }
  function cachedLazy(func, args, id) {
    return function () {
      if (cache.has(id)) {
        return cache.get(id);
      }

      var res = func.apply(null, args);
      cache.set(id, res);
      return res;
    };
  }

  var _Sk$builtin$1 = Sk.builtin,
      float_ = _Sk$builtin$1.float_,
      int_ = _Sk$builtin$1.int_;
  var twodprimitives = {
    arc: makeFunc(processingProxy, "arc", [{
      "x": [int_, float_]
    }, {
      "y": [int_, float_]
    }, {
      "width": [int_, float_]
    }, {
      "height": [int_, float_]
    }, {
      "start": [int_, float_]
    }, {
      "stop": [int_, float_]
    }]),
    ellipse: makeFunc(processingProxy, "ellipse", [{
      "x": [int_, float_]
    }, {
      "y": [int_, float_]
    }, {
      "width": [int_, float_]
    }, {
      "height": [int_, float_]
    }]),
    line: makeFunc(processingProxy, "line", [{
      "x1": [int_, float_]
    }, {
      "y1": [int_, float_]
    }, {
      "z1": [int_, float_]
    }, {
      "x2": [int_, float_]
    }, {
      "y2": [int_, float_],
      optional: optional
    }, {
      "z2": [int_, float_],
      optional: optional
    }]),
    point: makeFunc(processingProxy, "point", [{
      "x": [int_, float_]
    }, {
      "y": [int_, float_]
    }, {
      "z": [int_, float_],
      optional: optional
    }]),
    quad: makeFunc(processingProxy, "quad", [{
      "x1": [int_, float_]
    }, {
      "y1": [int_, float_]
    }, {
      "x2": [int_, float_]
    }, {
      "y2": [int_, float_]
    }, {
      "x3": [int_, float_]
    }, {
      "y3": [int_, float_]
    }, {
      "x4": [int_, float_]
    }, {
      "y4": [int_, float_]
    }]),
    rect: makeFunc(processingProxy, "rect", [{
      "x": [int_, float_]
    }, {
      "y": [int_, float_]
    }, {
      "width": [int_, float_]
    }, {
      "height": [int_, float_]
    }, {
      "tlradius": [int_, float_],
      optional: optional
    }, {
      "trradius": [int_, float_],
      optional: optional
    }, {
      "brradius": [int_, float_],
      optional: optional
    }, {
      "blradius": [int_, float_],
      optional: optional
    }]),
    triangle: makeFunc(processingProxy, "triangle", [{
      "x1": [int_, float_]
    }, {
      "y1": [int_, float_]
    }, {
      "x2": [int_, float_]
    }, {
      "y2": [int_, float_]
    }, {
      "x3": [int_, float_]
    }, {
      "y3": [int_, float_]
    }])
  };

  var _Sk$builtin$2 = Sk.builtin,
      float_$1 = _Sk$builtin$2.float_,
      int_$1 = _Sk$builtin$2.int_;
  var threedprimitives = {
    box: makeFunc(processingProxy, "box", [{
      "width": [int_$1, float_$1]
    }, {
      "height": [int_$1, float_$1],
      optional: optional
    }, {
      "depth": [int_$1, float_$1],
      optional: optional
    }]),
    sphere: makeFunc(processingProxy, "sphere", [{
      "radius": [int_$1, float_$1]
    }]),
    sphereDetail: makeFunc(processingProxy, "sphereDetail", [{
      "ures": int_$1
    }, {
      "vres": int_$1,
      optional: optional
    }])
  };

  var remapToPy$1 = Sk.ffi.remapToPy;
  var constants = {
    X: 0,
    Y: 1,
    Z: 2,
    R: 3,
    G: 4,
    B: 5,
    A: 6,
    U: 7,
    V: 8,
    NX: 9,
    NY: 10,
    NZ: 11,
    EDGE: 12,
    // Stroke
    SR: 13,
    SG: 14,
    SB: 15,
    SA: 16,
    SW: 17,
    // Transformations (2D and 3D)
    TX: 18,
    TY: 19,
    TZ: 20,
    VX: 21,
    VY: 22,
    VZ: 23,
    VW: 24,
    // Material properties
    AR: 25,
    AG: 26,
    AB: 27,
    DR: 3,
    DG: 4,
    DB: 5,
    DA: 6,
    SPR: 28,
    SPG: 29,
    SPB: 30,
    SHINE: 31,
    ER: 32,
    EG: 33,
    EB: 34,
    BEEN_LIT: 35,
    VERTEX_FIELD_COUNT: 36,
    // Renderers
    P2D: 1,
    JAVA2D: 1,
    WEBGL: 2,
    P3D: 2,
    OPENGL: 2,
    PDF: 0,
    DXF: 0,
    // Platform IDs
    OTHER: 0,
    WINDOWS: 1,
    MAXOSX: 2,
    LINUX: 3,
    EPSILON: 0.0001,
    MAX_FLOAT: 3.4028235e+38,
    MIN_FLOAT: -3.4028235e+38,
    MAX_INT: 2147483647,
    MIN_INT: -2147483648,
    PI: Math.PI,
    TWO_PI: 2 * Math.PI,
    TAU: 2 * Math.PI,
    HALF_PI: Math.PI / 2,
    THIRD_PI: Math.PI / 3,
    QUARTER_PI: Math.PI / 4,
    DEG_TO_RAD: Math.PI / 180,
    RAD_TO_DEG: 180 / Math.PI,
    WHITESPACE: " \t\n\r\f\xA0",
    // Color modes
    RGB: 1,
    ARGB: 2,
    HSB: 3,
    ALPHA: 4,
    CMYK: 5,
    // Image file types
    TIFF: 0,
    TARGA: 1,
    JPEG: 2,
    GIF: 3,
    // Filter/convert types
    BLUR: 11,
    GRAY: 12,
    INVERT: 13,
    OPAQUE: 14,
    POSTERIZE: 15,
    THRESHOLD: 16,
    ERODE: 17,
    DILATE: 18,
    // Blend modes
    REPLACE: 0,
    BLEND: 1 << 0,
    ADD: 1 << 1,
    SUBTRACT: 1 << 2,
    LIGHTEST: 1 << 3,
    DARKEST: 1 << 4,
    DIFFERENCE: 1 << 5,
    EXCLUSION: 1 << 6,
    MULTIPLY: 1 << 7,
    SCREEN: 1 << 8,
    OVERLAY: 1 << 9,
    HARD_LIGHT: 1 << 10,
    SOFT_LIGHT: 1 << 11,
    DODGE: 1 << 12,
    BURN: 1 << 13,
    // Color component bit masks
    ALPHA_MASK: 0xff000000,
    RED_MASK: 0x00ff0000,
    GREEN_MASK: 0x0000ff00,
    BLUE_MASK: 0x000000ff,
    // Projection matrices
    CUSTOM: 0,
    ORTHOGRAPHIC: 2,
    PERSPECTIVE: 3,
    // Shapes
    POINT: 2,
    POINTS: 2,
    LINE: 4,
    LINES: 4,
    TRIANGLE: 8,
    TRIANGLES: 9,
    TRIANGLE_STRIP: 10,
    TRIANGLE_FAN: 11,
    QUAD: 16,
    QUADS: 16,
    QUAD_STRIP: 17,
    POLYGON: 20,
    PATH: 21,
    RECT: 30,
    ELLIPSE: 31,
    ARC: 32,
    SPHERE: 40,
    BOX: 41,
    // Arc drawing modes
    //OPEN:          1, // shared with Shape closing modes
    CHORD: 2,
    PIE: 3,
    GROUP: 0,
    PRIMITIVE: 1,
    //PATH:         21, // shared with Shape PATH
    GEOMETRY: 3,
    // Shape Vertex
    VERTEX: 0,
    BEZIER_VERTEX: 1,
    CURVE_VERTEX: 2,
    BREAK: 3,
    CLOSESHAPE: 4,
    // Shape closing modes
    OPEN: 1,
    CLOSE: 2,
    // Shape drawing modes
    CORNER: 0,
    // Draw mode convention to use (x, y) to (width, height)
    CORNERS: 1,
    // Draw mode convention to use (x1, y1) to (x2, y2) coordinates
    RADIUS: 2,
    // Draw mode from the center, and using the radius
    CENTER_RADIUS: 2,
    // Deprecated! Use RADIUS instead
    CENTER: 3,
    // Draw from the center, using second pair of values as the diameter
    DIAMETER: 3,
    // Synonym for the CENTER constant. Draw from the center
    CENTER_DIAMETER: 3,
    // Deprecated! Use DIAMETER instead
    // Text vertical alignment modes
    BASELINE: 0,
    // Default vertical alignment for text placement
    TOP: 101,
    // Align text to the top
    BOTTOM: 102,
    // Align text from the bottom, using the baseline
    // UV Texture coordinate modes
    NORMAL: 1,
    NORMALIZED: 1,
    IMAGE: 2,
    // Text placement modes
    MODEL: 4,
    SHAPE: 5,
    // Stroke modes
    SQUARE: "butt",
    ROUND: "round",
    PROJECT: "square",
    MITER: "miter",
    BEVEL: "bevel",
    // Lighting modes
    AMBIENT: 0,
    DIRECTIONAL: 1,
    //POINT:     2, Shared with Shape constant
    SPOT: 3,
    // Key constants
    // Both key and keyCode will be equal to these values
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 10,
    RETURN: 13,
    ESC: 27,
    DELETE: 127,
    CODED: 0xffff,
    // p.key will be CODED and p.keyCode will be this value
    SHIFT: 16,
    CONTROL: 17,
    ALT: 18,
    CAPSLK: 20,
    PGUP: 33,
    PGDN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    NUMLK: 144,
    META: 157,
    INSERT: 155,
    // Cursor types
    ARROW: "default",
    CROSS: "crosshair",
    HAND: "pointer",
    MOVE: "move",
    TEXT: "text",
    WAIT: "wait",
    NOCURSOR: "url('data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='), auto",
    // Hints
    DISABLE_OPENGL_2X_SMOOTH: 1,
    ENABLE_OPENGL_2X_SMOOTH: -1,
    ENABLE_OPENGL_4X_SMOOTH: 2,
    ENABLE_NATIVE_FONTS: 3,
    DISABLE_DEPTH_TEST: 4,
    ENABLE_DEPTH_TEST: -4,
    ENABLE_DEPTH_SORT: 5,
    DISABLE_DEPTH_SORT: -5,
    DISABLE_OPENGL_ERROR_REPORT: 6,
    ENABLE_OPENGL_ERROR_REPORT: -6,
    ENABLE_ACCURATE_TEXTURES: 7,
    DISABLE_ACCURATE_TEXTURES: -7,
    HINT_COUNT: 10,
    // PJS defined constants
    SINCOS_LENGTH: 720,
    // every half degree
    PRECISIONB: 15,
    // fixed point precision is limited to 15 bits!!
    PRECISIONF: 1 << 15,
    PREC_MAXVAL: (1 << 15) - 1,
    PREC_ALPHA_SHIFT: 24 - 15,
    PREC_RED_SHIFT: 16 - 15,
    NORMAL_MODE_AUTO: 0,
    NORMAL_MODE_SHAPE: 1,
    NORMAL_MODE_VERTEX: 2,
    MAX_LIGHTS: 8
  };
  var remappedConstants = Object.keys(constants).reduce(function (previous, current) {
    previous[current] = remapToPy$1(constants[current]);
    return previous;
  }, {});

  var _Sk$builtin$3 = Sk.builtin,
      int_$2 = _Sk$builtin$3.int_,
      str$1 = _Sk$builtin$3.str,
      float_$2 = _Sk$builtin$3.float_;
  var ROUND = remappedConstants.ROUND,
      SQUARE = remappedConstants.SQUARE,
      BUTT = remappedConstants.BUTT,
      MITTER = remappedConstants.MITTER,
      BEVEL = remappedConstants.BEVEL,
      CENTER = remappedConstants.CENTER,
      RADIUS = remappedConstants.RADIUS,
      CORNER = remappedConstants.CORNER,
      CORNERS = remappedConstants.CORNERS;
  var attributes = {
    ellipseMode: makeFunc(processingProxy, "ellipseMode", [{
      "mode": int_$2,
      allowed: [CENTER, RADIUS, CORNER, CORNERS]
    }]),
    noSmooth: makeFunc(processingProxy, "noSmooth"),
    smooth: makeFunc(processingProxy, "smooth", [{
      "level": int_$2,
      allows: [2, 4, 8],
      ignored: ignored,
      optional: optional
    }]),
    rectMode: makeFunc(processingProxy, "rectMode", [{
      "mode": int_$2,
      allowed: [CENTER, RADIUS, CORNER, CORNERS]
    }]),
    strokeCap: makeFunc(processingProxy, "strokeCap", [{
      "mode": str$1,
      allowed: [ROUND, SQUARE, BUTT]
    }]),
    strokeJoin: makeFunc(processingProxy, "strokeJoin", [{
      "mode": str$1,
      allowed: [MITTER, BEVEL, ROUND]
    }]),
    strokeWeight: makeFunc(processingProxy, "strokeWeight", [{
      "width": [int_$2, float_$2]
    }])
  };

  var _Sk$builtin$4 = Sk.builtin,
      int_$3 = _Sk$builtin$4.int_,
      float_$3 = _Sk$builtin$4.float_,
      list = _Sk$builtin$4.list;
  var calculation = {
    abs: makeFunc(processingProxy, "abs", [{
      "value": [int_$3, float_$3]
    }]),
    ceil: makeFunc(processingProxy, "ceil", [{
      "value": [int_$3, float_$3]
    }]),
    constrain: makeFunc(processingProxy, "constrain", [{
      "value": [int_$3, float_$3]
    }, {
      "min": [int_$3, float_$3]
    }, {
      "max": [int_$3, float_$3]
    }]),
    dist: makeFunc(processingProxy, "dist", [{
      "x1": [int_$3, float_$3]
    }, {
      "y1": [int_$3, float_$3]
    }, {
      "z1": [int_$3, float_$3]
    }, {
      "x2": [int_$3, float_$3]
    }, {
      "y2": [int_$3, float_$3],
      optional: optional
    }, {
      "z2": [int_$3, float_$3],
      optional: optional
    }]),
    exp: makeFunc(processingProxy, "exp", [{
      "value": [int_$3, float_$3]
    }]),
    floor: makeFunc(processingProxy, "floor", [{
      "value": [int_$3, float_$3]
    }]),
    lerp: makeFunc(processingProxy, "lerp", [{
      "value1": [int_$3, float_$3]
    }, {
      "value2": [int_$3, float_$3]
    }, {
      "amt": [int_$3, float_$3]
    }]),
    mag: makeFunc(processingProxy, "mag", [{
      "a": [int_$3, float_$3]
    }, {
      "a": [int_$3, float_$3]
    }, {
      "a": [int_$3, float_$3],
      optional: optional
    }]),
    map: makeFunc(processingProxy, "map", [{
      "value": [int_$3, float_$3]
    }, {
      "low1": [int_$3, float_$3]
    }, {
      "high1": [int_$3, float_$3]
    }, {
      "low2": [int_$3, float_$3]
    }, {
      "high2": [int_$3, float_$3]
    }]),
    max: makeFunc(processingProxy, "max", [{
      "values": [list, int_$3, float_$3]
    }, {
      "b": [int_$3, float_$3],
      optional: optional
    }, {
      "c": [int_$3, float_$3],
      optional: optional
    }]),
    min: makeFunc(processingProxy, "min", [{
      "values": [list, int_$3, float_$3]
    }, {
      "b": [int_$3, float_$3],
      optional: optional
    }, {
      "c": [int_$3, float_$3],
      optional: optional
    }]),
    norm: makeFunc(processingProxy, "norm", [{
      "value": [int_$3, float_$3]
    }, {
      "low": [int_$3, float_$3]
    }, {
      "high": [int_$3, float_$3]
    }]),
    pow: makeFunc(processingProxy, "pow", [{
      "n": [int_$3, float_$3]
    }, {
      "e": [int_$3, float_$3]
    }]),
    round: makeFunc(processingProxy, "round", [{
      "value": [int_$3, float_$3]
    }]),
    sq: makeFunc(processingProxy, "sq", [{
      "value": [int_$3, float_$3]
    }]),
    sqrt: makeFunc(processingProxy, "sq", [{
      "value": [int_$3, float_$3]
    }])
  };

  var _Sk$builtin$5 = Sk.builtin,
      float_$4 = _Sk$builtin$5.float_,
      int_$4 = _Sk$builtin$5.int_,
      object = _Sk$builtin$5.object;
  var camera = {
    beginCamera: cachedLazy(constructOptionalContectManager, [{
      __call__: makeFunc(function (self$$1) {
        processingProxy.beginCamera();
        return self$$1;
      }, "__call__", [self]),
      __enter__: makeFunc(function (self$$1) {
        return self$$1;
      }, "__enter__", [self]),
      __exit__: makeFunc(function () {
        return processingProxy.endCamera();
      }, "__exit__", [self, {
        "exc_type": object,
        ignored: ignored
      }, {
        "exc_value": object,
        ignored: ignored
      }, {
        "traceback": object,
        ignored: ignored
      }])
    }, "beginCamera"], "beginCamera"),
    endCamera: makeFunc(processingProxy, "endCamera"),
    camera: makeFunc(processingProxy, "camera", [{
      "eyeX": [int_$4, float_$4],
      optional: optional
    }, {
      "eyeY": [int_$4, float_$4],
      optional: optional
    }, {
      "eyeZ": [int_$4, float_$4],
      optional: optional
    }, {
      "centerX": [int_$4, float_$4],
      optional: optional
    }, {
      "centerY": [int_$4, float_$4],
      optional: optional
    }, {
      "centerZ": [int_$4, float_$4],
      optional: optional
    }, {
      "upX": [int_$4, float_$4],
      optional: optional
    }, {
      "upY": [int_$4, float_$4],
      optional: optional
    }, {
      "upZ": [int_$4, float_$4],
      optional: optional
    }]),
    frustum: makeFunc(processingProxy, "frustum", [{
      "left": [int_$4, float_$4]
    }, {
      "right": [int_$4, float_$4]
    }, {
      "bottom": [int_$4, float_$4]
    }, {
      "top": [int_$4, float_$4]
    }, {
      "near": [int_$4, float_$4]
    }, {
      "far": [int_$4, float_$4]
    }]),
    ortho: makeFunc(processingProxy, "ortho", [{
      "left": [int_$4, float_$4],
      optional: optional
    }, {
      "right": [int_$4, float_$4],
      optional: optional
    }, {
      "bottom": [int_$4, float_$4],
      optional: optional
    }, {
      "top": [int_$4, float_$4],
      optional: optional
    }, {
      "near": [int_$4, float_$4],
      optional: optional
    }, {
      "far": [int_$4, float_$4],
      optional: optional
    }]),
    perspective: makeFunc(processingProxy, "perspective", [{
      "fov": [int_$4, float_$4],
      optional: optional
    }, {
      "aspect": [int_$4, float_$4],
      optional: optional
    }, {
      "zNear": [int_$4, float_$4],
      optional: optional
    }, {
      "zFar": [int_$4, float_$4],
      optional: optional
    }]),
    printCamera: makeFunc(processingProxy, "printCamera"),
    printProjection: makeFunc(processingProxy, "printProjection")
  };

  var BLEND = remappedConstants.BLEND,
      ADD = remappedConstants.ADD,
      SUBTRACT = remappedConstants.SUBTRACT,
      DARKEST = remappedConstants.DARKEST,
      LIGHTEST = remappedConstants.LIGHTEST,
      DIFFERENCE = remappedConstants.DIFFERENCE,
      EXLUSION = remappedConstants.EXLUSION,
      MULTIPLY = remappedConstants.MULTIPLY,
      SCREEN = remappedConstants.SCREEN,
      OVERLAY = remappedConstants.OVERLAY,
      HARD_LIGHT = remappedConstants.HARD_LIGHT,
      SOFT_LIGHT = remappedConstants.SOFT_LIGHT,
      DODGE = remappedConstants.DODGE,
      BURN = remappedConstants.BURN;
  var _Sk$builtin$6 = Sk.builtin,
      int_$5 = _Sk$builtin$6.int_,
      float_$5 = _Sk$builtin$6.float_,
      lng = _Sk$builtin$6.lng,
      str$2 = _Sk$builtin$6.str;
  var ccreatingandreading = {
    alpha: makeFunc(processingProxy, "alpha", [{
      "color": [int_$5, lng, float_$5, str$2],
      converter: strToColor
    }]),
    blendColor: makeFunc(processingProxy, "blendColor", [{
      "c1": [int_$5, lng, float_$5, str$2],
      converter: strToColor
    }, {
      "c2": [int_$5, lng, float_$5, str$2],
      converter: strToColor
    }, {
      "mode": int_$5,
      allowed: [BLEND, ADD, SUBTRACT, DARKEST, LIGHTEST, DIFFERENCE, EXLUSION, MULTIPLY, SCREEN, OVERLAY, HARD_LIGHT, SOFT_LIGHT, DODGE, BURN]
    }]),
    blue: makeFunc(processingProxy, "blue", [{
      "color": [int_$5, lng, float_$5, str$2],
      converter: strToColor
    }]),
    brightness: makeFunc(processingProxy, "brightness", [{
      "color": [int_$5, lng, float_$5, str$2],
      converter: strToColor
    }]),
    green: makeFunc(processingProxy, "green", [{
      "color": [int_$5, lng, float_$5, str$2],
      converter: strToColor
    }]),
    hue: makeFunc(processingProxy, "hue", [{
      "color": [int_$5, lng, float_$5, str$2],
      converter: strToColor
    }]),
    lerpColor: makeFunc(processingProxy, "lerpColor", [{
      "c1": [int_$5, lng, float_$5, str$2],
      converter: strToColor
    }, {
      "c2": [int_$5, lng, float_$5, str$2],
      converter: strToColor
    }, {
      "amt": [int_$5, float_$5]
    }]),
    red: makeFunc(processingProxy, "red", [{
      "color": [int_$5, lng, float_$5, str$2],
      converter: strToColor
    }]),
    saturation: makeFunc(processingProxy, "saturation", [{
      "color": [int_$5, lng, float_$5, str$2],
      converter: strToColor
    }])
  };

  var RGB = remappedConstants.RGB,
      HSB = remappedConstants.HSB;
  var _Sk$builtin$7 = Sk.builtin,
      int_$6 = _Sk$builtin$7.int_,
      float_$6 = _Sk$builtin$7.float_,
      str$3 = _Sk$builtin$7.str,
      lng$1 = _Sk$builtin$7.lng;
  var csetting = {
    background: makeFunc(processingProxy, "background", [{
      "value1": [int_$6, lng$1, float_$6, str$3, "PImage"],
      converter: strToColor
    }, {
      "value2": [int_$6, float_$6],
      optional: optional
    }, {
      "value2": [int_$6, float_$6],
      optional: optional
    }, {
      "alpha": [int_$6, float_$6],
      optional: optional
    }]),
    colorMode: makeFunc(processingProxy, "colorMode", [{
      "mode": int_$6,
      allowed: [RGB, HSB]
    }, {
      "range1": [int_$6, float_$6],
      optional: optional
    }, {
      "range2": [int_$6, float_$6],
      optional: optional
    }, {
      "range3": [int_$6, float_$6],
      optional: optional
    }, {
      "range4": [int_$6, float_$6],
      optional: optional
    }]),
    fill: makeFunc(processingProxy, "fill", [{
      "value1": [int_$6, lng$1, float_$6, str$3],
      converter: strToColor
    }, {
      "value2": [int_$6, float_$6],
      optional: optional
    }, {
      "value2": [int_$6, float_$6],
      optional: optional
    }, {
      "alpha": [int_$6, float_$6],
      optional: optional
    }]),
    noFill: makeFunc(processingProxy, "noFill"),
    noStroke: makeFunc(processingProxy, "noStroke"),
    stroke: makeFunc(processingProxy, "stroke", [{
      "value1": [int_$6, lng$1, float_$6, str$3],
      converter: strToColor
    }, {
      "value2": [int_$6, float_$6],
      optional: optional
    }, {
      "value2": [int_$6, float_$6],
      optional: optional
    }, {
      "alpha": [int_$6, float_$6],
      optional: optional
    }])
  };

  var _Sk$builtin$8 = Sk.builtin,
      float_$7 = _Sk$builtin$8.float_,
      int_$7 = _Sk$builtin$8.int_,
      str$4 = _Sk$builtin$8.str,
      lng$2 = _Sk$builtin$8.lng;
  var color = makeFunc(processingProxy, "color", [{
    "value1": [int_$7, float_$7, str$4, lng$2],
    "converter": strToColor
  }, {
    "value2": [int_$7, float_$7],
    optional: optional
  }, {
    "value3": [int_$7, float_$7],
    optional: optional
  }, {
    "alpha": [int_$7, float_$7],
    optional: optional
  }]);

  var _Sk$builtin$9 = Sk.builtin,
      int_$8 = _Sk$builtin$9.int_,
      float_$8 = _Sk$builtin$9.float_;
  var coordinates = {
    modelX: makeFunc(processingProxy, "modelX", [{
      "x": [int_$8, float_$8]
    }, {
      "y": [int_$8, float_$8]
    }, {
      "z": [int_$8, float_$8]
    }]),
    modelY: makeFunc(processingProxy, "modelY", [{
      "x": [int_$8, float_$8]
    }, {
      "y": [int_$8, float_$8]
    }, {
      "z": [int_$8, float_$8]
    }]),
    modelZ: makeFunc(processingProxy, "modelZ", [{
      "x": [int_$8, float_$8]
    }, {
      "y": [int_$8, float_$8]
    }, {
      "z": [int_$8, float_$8]
    }]),
    screenX: makeFunc(processingProxy, "screenX", [{
      "x": [int_$8, float_$8]
    }, {
      "y": [int_$8, float_$8]
    }, {
      "z": [int_$8, float_$8]
    }]),
    screenY: makeFunc(processingProxy, "screenY", [{
      "x": [int_$8, float_$8]
    }, {
      "y": [int_$8, float_$8]
    }, {
      "z": [int_$8, float_$8]
    }]),
    screenZ: makeFunc(processingProxy, "screenZ", [{
      "x": [int_$8, float_$8]
    }, {
      "y": [int_$8, float_$8]
    }, {
      "z": [int_$8, float_$8]
    }])
  };

  var _Sk$builtin$a = Sk.builtin,
      int_$9 = _Sk$builtin$a.int_,
      float_$9 = _Sk$builtin$a.float_;
  var curves = {
    bezier: makeFunc(processingProxy, "bezier", [{
      "x1": [int_$9, float_$9]
    }, {
      "y1": [int_$9, float_$9]
    }, {
      "z1": [int_$9, float_$9]
    }, {
      "cx1": [int_$9, float_$9]
    }, {
      "cy1": [int_$9, float_$9]
    }, {
      "cz1": [int_$9, float_$9]
    }, {
      "cx2": [int_$9, float_$9]
    }, {
      "cy2": [int_$9, float_$9]
    }, {
      "cz2": [int_$9, float_$9],
      optional: optional
    }, {
      "x2": [int_$9, float_$9],
      optional: optional
    }, {
      "y2": [int_$9, float_$9],
      optional: optional
    }, {
      "z2": [int_$9, float_$9],
      optional: optional
    }]),
    bezierDetail: makeFunc(processingProxy, "bezierDetail", [{
      "detail": int_$9
    }]),
    bezierPoint: makeFunc(processingProxy, "bezierPoint", [{
      "a": [int_$9, float_$9]
    }, {
      "b": [int_$9, float_$9]
    }, {
      "c": [int_$9, float_$9]
    }, {
      "d": [int_$9, float_$9]
    }, {
      "t": [int_$9, float_$9]
    }]),
    bezierTangent: makeFunc(processingProxy, "bezierTangent", [{
      "a": [int_$9, float_$9]
    }, {
      "b": [int_$9, float_$9]
    }, {
      "c": [int_$9, float_$9]
    }, {
      "d": [int_$9, float_$9]
    }, {
      "t": [int_$9, float_$9]
    }]),
    curve: makeFunc(processingProxy, "curve", [{
      "x1": [int_$9, float_$9]
    }, {
      "y1": [int_$9, float_$9]
    }, {
      "z1": [int_$9, float_$9]
    }, {
      "x2": [int_$9, float_$9]
    }, {
      "y2": [int_$9, float_$9]
    }, {
      "z2": [int_$9, float_$9]
    }, {
      "x3": [int_$9, float_$9]
    }, {
      "y3": [int_$9, float_$9]
    }, {
      "z3": [int_$9, float_$9],
      optional: optional
    }, {
      "x4": [int_$9, float_$9],
      optional: optional
    }, {
      "y4": [int_$9, float_$9],
      optional: optional
    }, {
      "z4": [int_$9, float_$9],
      optional: optional
    }]),
    curveDetail: makeFunc(processingProxy, "curveDetail", [{
      "detail": int_$9
    }]),
    curvePoint: makeFunc(processingProxy, "curvePoint", [{
      "a": [int_$9, float_$9]
    }, {
      "b": [int_$9, float_$9]
    }, {
      "c": [int_$9, float_$9]
    }, {
      "d": [int_$9, float_$9]
    }, {
      "t": [int_$9, float_$9]
    }]),
    curveTangent: makeFunc(processingProxy, "curveTangent"[({
      "t": [int_$9, float_$9]
    })]),
    curveTightness: makeFunc(processingProxy, "curveTightness", [{
      "squishy": [int_$9, float_$9]
    }])
  };

  var _Sk$ffi$1 = Sk.ffi,
      remapToPy$2 = _Sk$ffi$1.remapToPy,
      remapToJs$1 = _Sk$ffi$1.remapToJs;
  var _Sk$builtin$b = Sk.builtin,
      func$1 = _Sk$builtin$b.func,
      int_$a = _Sk$builtin$b.int_;
  var buildClass$1 = Sk.misceval.buildClass;
  var ARROW = remappedConstants.ARROW,
      CROSS = remappedConstants.CROSS,
      HAND = remappedConstants.HAND,
      MOVE = remappedConstants.MOVE,
      TEXT = remappedConstants.TEXT,
      WAIT = remappedConstants.WAIT;

  function environmentClass($gbl, $loc) {
    $loc.__getattr__ = new func$1(function (self$$1, key) {
      switch (remapToJs$1(key)) {
        case "frameCount":
          return remapToPy$2(processingProxy.frameCount);

        case "frameRate":
          return remapToPy$2(processingProxy.frameRate);

        case "height":
          return remapToPy$2(processingProxy.height);

        case "width":
          return remapToPy$2(processingProxy.width);

        case "online":
          return remapToPy$2(processingProxy.online);

        case "focused":
          return remapToPy$2(processingProxy.focused);

        default:
          return undefined;
      }
    });
  }

  var EnvironmentBuilder = function EnvironmentBuilder(mod) {
    return buildClass$1(mod, environmentClass, "Environment", []);
  };

  function frameRateClass($gbl, $loc) {
    $loc.__init__ = makeFunc(function (self$$1) {
      self$$1.v = processingProxy.__frameRate;
    }, "__init__", [self]);
    $loc.__call__ = makeFunc(function (self$$1, rate) {
      processingProxy.frameRate(rate);
      self$$1.v = rate;
    }, "__call__", [self, {
      "rate": int_$a
    }]);
  }

  var FrameRateBuilder = function FrameRateBuilder(mod) {
    return buildClass$1(mod, frameRateClass, "FrameRate", [int_$a]);
  };
  var cursor = makeFunc(processingProxy, "cursor", [{
    "image": ["PImage", int_$a],
    allowed: [ARROW, CROSS, HAND, MOVE, TEXT, WAIT],
    optional: optional
  }, {
    "x": int_$a,
    optional: optional
  }, {
    "y": int_$a,
    optional: optional
  }]);
  var noCursor = makeFunc(processingProxy, "noCursor");
  var height = function height() {
    return remapToPy$2(processingProxy.height);
  };
  var width = function width() {
    return remapToPy$2(processingProxy.width);
  };
  var frameCount = function frameCount() {
    return remapToPy$2(processingProxy.frameCount);
  };
  var focused = function focused() {
    return remapToPy$2(processingProxy.focused);
  };

  var str$5 = Sk.builtin.str;
  var files = {
    loadBytes: makeFunc(processingProxy, "loadBytes", [{
      "filename": str$5
    }]),
    loadStrings: makeFunc(processingProxy, "loadStrings"[{
      "filename": str$5
    }]),
    createInput: notImplemented,
    selectFolder: notImplemented,
    selectInput: notImplemented
  };

  var LEFT = remappedConstants.LEFT,
      CENTER$1 = remappedConstants.CENTER,
      RIGHT = remappedConstants.RIGHT,
      TOP = remappedConstants.TOP,
      BOTTOM = remappedConstants.BOTTOM,
      BASELINE = remappedConstants.BASELINE,
      MODEL = remappedConstants.MODEL,
      SCREEN$1 = remappedConstants.SCREEN,
      SHAPE = remappedConstants.SHAPE;
  var _Sk$builtin$c = Sk.builtin,
      int_$b = _Sk$builtin$c.int_,
      float_$a = _Sk$builtin$c.float_,
      str$6 = _Sk$builtin$c.str;
  var fontattribues = {
    textAlign: makeFunc(processingProxy, "textAlign", [{
      "ALIGN": int_$b,
      allowed: [LEFT, CENTER$1, RIGHT]
    }, {
      "YALIGN": int_$b,
      allowed: [TOP, BOTTOM, BASELINE, CENTER$1]
    }]),
    textLeading: makeFunc(processingProxy, "textLeading", [{
      "dist": [int_$b, float_$a]
    }]),
    textMode: makeFunc(processingProxy, "textMode", [{
      "MODE": int_$b,
      allowed: [MODEL, SCREEN$1, SHAPE]
    }]),
    textSize: makeFunc(processingProxy, "textSize", [{
      "size": [int_$b, float_$a]
    }]),
    textWidth: makeFunc(processingProxy, "textWidth", [{
      "width": str$6
    }])
  };

  var fontmetrics = {
    textAscent: makeFunc(processingProxy, "textAscent"),
    textDescent: makeFunc(processingProxy, "textDescent")
  };

  var _Sk$builtin$d = Sk.builtin,
      func$2 = _Sk$builtin$d.func,
      float_$b = _Sk$builtin$d.float_,
      list$1 = _Sk$builtin$d.list,
      str$7 = _Sk$builtin$d.str,
      bool = _Sk$builtin$d.bool,
      int_$c = _Sk$builtin$d.int_;
  var _Sk$misceval$1 = Sk.misceval,
      buildClass$2 = _Sk$misceval$1.buildClass,
      callsim$1 = _Sk$misceval$1.callsim,
      loadname = _Sk$misceval$1.loadname;

  function createFontFunction(name, size, smooth, charset) {
    var font = processingProxy.createFont(name, size, smooth, charset);
    var pfont = callsim$1(exports.PFont);
    pfont.v = font;
    return pfont;
  }

  function fontClass($gbl, $loc) {
    $loc.__init__ = makeFunc(function (self$$1, input) {
      if (input) {
        self$$1.v = new processingProxy.PFont(input);
      }
    }, "__init__", [self, {
      "input ": str$7,
      optional: optional
    }]);
    var staticmethod = loadname("staticmethod", $gbl);
    var list_func = new func$2(function () {
      return new list$1(processingProxy.PFont.list());
    });
    $loc.list = callsim$1(staticmethod, list_func);
  }

  var PFontBuilder = function PFontBuilder(mod) {
    return buildClass$2(mod, fontClass, "PFont", []);
  };
  var createFont = makeFunc(createFontFunction, "createFont", [{
    "name": str$7
  }, {
    "size": [int_$c, float_$b]
  }, {
    "smooth": bool,
    optional: optional
  }, {
    "charset": str$7,
    optional: optional
  }]);
  var loadFont = makeFunc(processingProxy, "loadFont", [{
    "fontname": str$7
  }]);
  var text = makeFunc(processingProxy, "text", [{
    "data": [str$7, int_$c, float_$b]
  }, {
    "x": [int_$c, float_$b]
  }, {
    "y": [int_$c, float_$b]
  }, {
    "z": [int_$c, float_$b],
    optional: optional
  }, {
    "height": [int_$c, float_$b],
    optional: optional
  }, {
    "z": [int_$c, float_$b],
    optional: optional
  }]);
  var textFont = makeFunc(processingProxy, "textFont", [{
    "font": "PFont"
  }, {
    "size": [int_$c, float_$b],
    optional: optional
  }]);

  var P2D = constants.P2D,
      JAVA2D = constants.JAVA2D,
      WEBGL = constants.WEBGL,
      P3D = constants.P3D,
      OPENGL = constants.OPENGL,
      PDF = constants.PDF,
      DXF = constants.DXF;
  var _Sk$builtin$e = Sk.builtin,
      int_$d = _Sk$builtin$e.int_,
      func$3 = _Sk$builtin$e.func;
  var _Sk$misceval$2 = Sk.misceval,
      buildClass$3 = _Sk$misceval$2.buildClass,
      callsim$2 = _Sk$misceval$2.callsim;
  var _Sk$ffi$2 = Sk.ffi,
      remapToPy$3 = _Sk$ffi$2.remapToPy,
      remapToJs$2 = _Sk$ffi$2.remapToJs;

  function graphicsInit(self$$1, width, height, renderer) {
    self$$1.v = processingProxy.createGraphics(width, height, renderer);

    if (renderer === undefined || renderer === P2D || renderer === JAVA2D) {
      // monkey patching image to make sure toImageData returns something.
      // 2017 Chrome 64 doesn't always return something the first call.
      // this is a VERY HACKY way to deal with that synchronously.
      self$$1.v.toImageData = function (x, y, w, h) {
        x = x !== undefined ? x : 0;
        y = y !== undefined ? y : 0;
        w = w !== undefined ? w : processingProxy.width;
        h = h !== undefined ? h : processingProxy.height;
        var res = undefined;

        while (res === undefined) {
          res = self$$1.v.externals.context.getImageData(x, y, w, h);
        }

        return res;
      };
    }
  }

  function graphicsClass($gbl, $loc) {
    $loc.__init__ = makeFunc(graphicsInit, "__init__", [self, {
      "width": int_$d
    }, {
      "height": int_$d
    }, {
      "renderer": int_$d,
      allowed: [P2D, JAVA2D, WEBGL, P3D, OPENGL, PDF, DXF],
      optional: optional
    }]);
    $loc.beginDraw = new func$3(function (self$$1) {
      self$$1.v.beginDraw();
    });
    $loc.endDraw = new func$3(function (self$$1) {
      self$$1.v.endDraw();
    });
    $loc.__getattr__ = new func$3(function (self$$1, key) {
      var prop = self$$1.v[remapToJs$2(key)];

      if (prop !== undefined) {
        if (typeof prop === "function") {
          return new func$3(function (self$$1) {
            var args = Array.from(arguments).map(remapToJs$2);
            return remapToPy$3(prop.apply(self$$1.v, args));
          });
        }

        return remapToPy$3(prop);
      }
    });
  }

  var PGraphicsBuilder = function PGraphicsBuilder(mod) {
    return buildClass$3(mod, graphicsClass, "PGraphics", []);
  };
  var createGraphics = new func$3(function (width, height, renderer) {
    return callsim$2(exports.PGraphics, width, height, renderer);
  });
  var hint = new func$3(function (item) {
    // hint(item)
    processingProxy.hint(item);
  });

  var _Sk$builtin$f = Sk.builtin,
      func$4 = _Sk$builtin$f.func,
      int_$e = _Sk$builtin$f.int_,
      list$2 = _Sk$builtin$f.list,
      str$8 = _Sk$builtin$f.str,
      float_$c = _Sk$builtin$f.float_,
      lng$3 = _Sk$builtin$f.lng,
      IOError = _Sk$builtin$f.IOError,
      list_iter_ = _Sk$builtin$f.list_iter_;
  var _Sk$misceval$3 = Sk.misceval,
      buildClass$4 = _Sk$misceval$3.buildClass,
      callsim$3 = _Sk$misceval$3.callsim,
      Suspension = _Sk$misceval$3.Suspension;
  var _Sk$ffi$3 = Sk.ffi,
      remapToJs$3 = _Sk$ffi$3.remapToJs,
      remapToPy$4 = _Sk$ffi$3.remapToPy;
  var BLEND$1 = remappedConstants.BLEND,
      ADD$1 = remappedConstants.ADD,
      SUBTRACT$1 = remappedConstants.SUBTRACT,
      LIGHTEST$1 = remappedConstants.LIGHTEST,
      DARKEST$1 = remappedConstants.DARKEST,
      DIFFERENCE$1 = remappedConstants.DIFFERENCE,
      EXCLUSION = remappedConstants.EXCLUSION,
      MULTIPLY$1 = remappedConstants.MULTIPLY,
      SCREEN$2 = remappedConstants.SCREEN,
      OVERLAY$1 = remappedConstants.OVERLAY,
      HARD = remappedConstants.HARD,
      LIGHT = remappedConstants.LIGHT,
      SOFT_LIGHT$1 = remappedConstants.SOFT_LIGHT,
      DODGE$1 = remappedConstants.DODGE,
      BURN$1 = remappedConstants.BURN,
      THRESHOLD = remappedConstants.THRESHOLD,
      GRAY = remappedConstants.GRAY,
      INVERT = remappedConstants.INVERT,
      POSTERIZE = remappedConstants.POSTERIZE,
      BLUR = remappedConstants.BLUR,
      OPAQUE = remappedConstants.OPAQUE,
      ERODE = remappedConstants.ERODE,
      DILATE = remappedConstants.DILATE,
      CORNER$1 = remappedConstants.CORNER,
      CORNERS$1 = remappedConstants.CORNERS,
      CENTER$2 = remappedConstants.CENTER,
      RGB$1 = remappedConstants.RGB,
      ARGB = remappedConstants.ARGB,
      ALPHA = remappedConstants.ALPHA;
  var PixelProxy = null;

  function imageLoadImage(img) {
    var imageUrl = img;

    if (typeof Sk.imageProxy === "function") {
      imageUrl = Sk.imageProxy(img);
    }

    var susp = new Suspension();

    susp.resume = function () {
      if (susp.data["error"]) {
        throw susp.data["error"];
      }

      return susp.data["result"];
    };

    susp.data = {
      type: "Sk.promise",
      promise: Promise.race([new Promise(function (resolve) {
        return setTimeout(resolve, 3000);
      }), new Promise(function (resolve) {
        var image = callsim$3(exports.PImage);
        var i = processingProxy.loadImage(imageUrl, {}, function () {
          image.v = i;
          resolve(image);
        });
      })]).then(function (image) {
        if (!image) {
          throw new IOError("[Errno 2] No such file or directory: '".concat(img, "'"));
        } else {
          return image;
        }
      })
    };
    return susp;
  }

  function imageRequestImage(filename, extension) {
    var image = Sk.misceval.callsim(exports.PImage);
    image.v = processingProxy.requestImage(filename, extension);
    return image;
  }

  function imageInit(self$$1, arg1, arg2, arg3) {
    self$$1.v = new processingProxy.PImage(arg1, arg2, arg3);
  }

  function imageGet(self$$1, x, y, width, height) {
    var args = [x, y, width, height].filter(function (a) {
      return a !== undefined;
    });

    if (args.length == 2) {
      return self$$1.v.get.apply(self$$1.v, args);
    }

    var image = callsim$3(exports.PImage);
    image.v = self$$1.v.get.apply(self$$1.v, args);
    return image;
  }

  function imageSet(self$$1, x, y, color) {
    self$$1.v.set(x, y, color);
  }

  function imageCopy(self$$1, srcImg, sx, sy, swidth, sheight, dx, dy, dwidth, dheight) {
    return self$$1.v.copy(srcImg, sx, sy, swidth, sheight, dx, dy, dwidth, dheight);
  }

  function imageMask(self$$1, maskImg) {
    self$$1.v.mask(maskImg);
  }

  function imageBlend(self$$1, srcImg, x, y, width, height, dx, dy, dwidth, dheight) {
    self$$1.v.blend(srcImg, x, y, width, height, dx, dy, dwidth, dheight);
  }

  function imageFilter(self$$1, MODE, srcImg) {
    self$$1.v.filter(MODE, srcImg);
  }

  function imageSave(self$$1, filename) {
    self$$1.v.save(filename);
  }

  function imageResize(self$$1, wide, high) {
    self$$1.v.save(wide, high);
  }

  function imageLoadPixels(self$$1) {
    self$$1.v.loadPixels();
  }

  function imageUpdatePixels(self$$1, x, y, w, h) {
    self$$1.v.updatePixels(x, y, w, h);
  }

  function pixelProxy($glb, $loc) {
    $loc.__init__ = makeFunc(function (self$$1, image) {
      self$$1.image = image;
    }, "__init__", [self, {
      "image": "PImage",
      optional: optional
    }]);
    $loc.__getitem__ = makeFunc(function (self$$1, index) {
      return self$$1.image.pixels.getPixel(index);
    }, "__getitem__", [self, {
      "index": int_$e
    }]);
    $loc.__setitem__ = makeFunc(function (self$$1, index, color) {
      return self$$1.image.pixels.setPixel(index, color);
    }, "__setitem__", [self, {
      "index": int_$e
    }, {
      "color": [int_$e, lng$3, float_$c, str$8],
      converter: strToColor
    }]);
    $loc.__iter__ = new Sk.builtin.func(function (self$$1) {
      Sk.builtin.pyCheckArgs("__iter__", arguments, 0, 0, true, false);
      return new list_iter_(new list$2(self$$1.image.pixels.toArray()));
    });
    $loc.__repr__ = makeFunc(function (self$$1) {
      return "array('i', [".concat(self$$1.image.pixels.toArray().join(", "), "])");
    }, "__repr__", [self]);
    $loc.__len__ = makeFunc(function (self$$1) {
      return self$$1.image.width * self$$1.image.height;
    }, "__len__", [self]);
  }

  function imageClass($gbl, $loc) {
    $loc.__init__ = makeFunc(imageInit, "__init__", [self, {
      "width": [int_$e, str$8],
      optional: optional
    }, {
      "height": int_$e,
      optional: optional
    }, {
      "format": int_$e,
      allowed: [1, 2, 4],
      optional: optional
    }]);
    $loc.__getattr__ = new func$4(function (self$$1, key) {
      key = remapToJs$3(key);

      if (key === "width") {
        return remapToPy$4(self$$1.v.width);
      }

      if (key === "height") {
        return remapToPy$4(self$$1.v.height);
      }

      if (key === "pixels") {
        return callsim$3(PixelProxy, self$$1);
      }
    });
    $loc.get = makeFunc(imageGet, "get", [self, {
      "x": int_$e
    }, {
      "y": int_$e
    }, {
      "width": int_$e,
      optional: optional
    }, {
      "height": int_$e,
      optional: optional
    }]);
    $loc.set = makeFunc(imageSet, "set", [self, {
      "x": int_$e
    }, {
      "y": int_$e
    }, {
      "color": [int_$e, lng$3, float_$c, str$8],
      converter: strToColor
    }]);
    $loc.copy = makeFunc(imageCopy, "copy", [self, {
      "srcImg": [int_$e, "PImage"]
    }, {
      "sx": int_$e
    }, {
      "sy": int_$e
    }, {
      "swidth": int_$e
    }, {
      "sheight": int_$e
    }, {
      "dx": int_$e
    }, {
      "dy": int_$e
    }, {
      "dwidth": int_$e
    }, {
      "dheight": int_$e,
      optional: optional
    }]);
    $loc.mask = makeFunc(imageMask, "mask", [self, {
      "maskImg": ["PImage", list$2]
    }]);
    $loc.blend = makeFunc(imageBlend, "blend", [self, {
      "srcImg": [int_$e, "PImage"]
    }, {
      "x": int_$e
    }, {
      "y": int_$e
    }, {
      "width": int_$e
    }, {
      "height": int_$e
    }, {
      "dx": int_$e
    }, {
      "dy": int_$e
    }, {
      "dwidth": int_$e
    }, {
      "dheight": int_$e
    }, {
      "MODE": int_$e,
      optional: optional,
      allowed: [BLEND$1, ADD$1, SUBTRACT$1, LIGHTEST$1, DARKEST$1, DIFFERENCE$1, EXCLUSION, MULTIPLY$1, SCREEN$2, OVERLAY$1, HARD, LIGHT, SOFT_LIGHT$1, DODGE$1, BURN$1]
    }]);
    $loc.filter = makeFunc(imageFilter, "filter", [self, {
      "MODE": int_$e,
      allowed: [THRESHOLD, GRAY, INVERT, POSTERIZE, BLUR, OPAQUE, ERODE, DILATE]
    }, {
      "srcImg": "PImage",
      optional: optional
    }]);
    $loc.save = makeFunc(imageSave, "save", [self, {
      "filename": str$8
    }]);
    $loc.resize = makeFunc(imageResize, "resize", [self, {
      "wide": int_$e
    }, {
      "high": int_$e
    }]);
    $loc.loadPixels = makeFunc(imageLoadPixels, "loadPixels", [self]);
    $loc.updatePixels = makeFunc(imageUpdatePixels, "updatePixels", [self, {
      "x": int_$e,
      optional: optional
    }, {
      "y": int_$e,
      optional: optional
    }, {
      "w": int_$e,
      optional: optional
    }, {
      "h": int_$e,
      optional: optional
    }]);
  }

  var PImageBuilder = function PImageBuilder(mod) {
    PixelProxy = buildClass$4(mod, pixelProxy, "ImageProxy", []);
    return buildClass$4(mod, imageClass, "PImage", []);
  };
  var createImage = makeFunc(function (width, height, format) {
    var image = Sk.misceval.callsim(exports.PImage);
    image.v = processingProxy.createImage(width, height, format);
    return image;
  }, "createFunc", [{
    "width": int_$e
  }, {
    "height": int_$e
  }, {
    "format": int_$e,
    allowed: [RGB$1, ARGB, ALPHA]
  }]);
  var image = makeFunc(processingProxy, "image", [{
    "img": ["PImage", "PGraphics"]
  }, {
    "x": [int_$e, float_$c]
  }, {
    "y": [int_$e, float_$c]
  }, {
    "width": [int_$e, float_$c],
    optional: optional
  }, {
    "height": [int_$e, float_$c],
    optional: optional
  }]);
  var imageMode = makeFunc(processingProxy, "imageMode", [{
    "mode": int_$e,
    allowed: [CORNER$1, CORNERS$1, CENTER$2]
  }]);
  var loadImage = makeFunc(imageLoadImage, "loadImage", [{
    "image": str$8
  }, {
    "extension": str$8,
    optional: optional,
    ignored: ignored
  }]);
  var noTint = makeFunc(processingProxy, "noTint");
  var requestImage = makeFunc(imageRequestImage, "requestImage", [{
    "filename": str$8
  }, {
    "extension": str$8,
    optional: optional
  }]);
  var tint = makeFunc(processingProxy, "tint", [{
    "value1": [int_$e, lng$3, float_$c, str$8],
    converter: strToColor
  }, {
    "value2": [int_$e, float_$c],
    optional: optional
  }, {
    "value3": [int_$e, float_$c],
    optional: optional
  }, {
    "alpha": [int_$e, float_$c],
    optional: optional
  }]);
  var blend = makeFunc(processingProxy, "blend", [{
    "srcImg": [int_$e, "PImage"]
  }, {
    "x": int_$e
  }, {
    "y": int_$e
  }, {
    "width": int_$e
  }, {
    "height": int_$e
  }, {
    "dx": int_$e
  }, {
    "dy": int_$e
  }, {
    "dwidth": int_$e
  }, {
    "dheight": int_$e
  }, {
    "MODE": int_$e,
    optional: optional,
    allowed: [BLEND$1, ADD$1, SUBTRACT$1, LIGHTEST$1, DARKEST$1, DIFFERENCE$1, EXCLUSION, MULTIPLY$1, SCREEN$2, OVERLAY$1, HARD, LIGHT, SOFT_LIGHT$1, DODGE$1, BURN$1]
  }]);
  var copy = makeFunc(processingProxy, "copy", [{
    "srcImg": [int_$e, "PImage"]
  }, {
    "sx": int_$e
  }, {
    "sy": int_$e
  }, {
    "swidth": int_$e
  }, {
    "sheight": int_$e
  }, {
    "dx": int_$e
  }, {
    "dy": int_$e
  }, {
    "dwidth": int_$e
  }, {
    "dheight": int_$e,
    optional: optional
  }]);
  var filter = makeFunc(processingProxy, "filter", [{
    "MODE": int_$e,
    allowed: [THRESHOLD, GRAY, INVERT, POSTERIZE, BLUR, OPAQUE, ERODE, DILATE]
  }, {
    "srcImg": "PImage",
    optional: optional
  }]);
  var get = makeFunc(processingProxy, "get", [{
    "x": int_$e,
    optional: optional
  }, {
    "y": int_$e,
    optional: optional
  }, {
    "width": int_$e,
    optional: optional
  }, {
    "height": int_$e,
    optional: optional
  }]);
  var loadPixels = makeFunc(processingProxy, "loadPixels");
  var set$1 = makeFunc(processingProxy, "set", [{
    "x": int_$e
  }, {
    "y": int_$e
  }, {
    "image": ["PImage", int_$e, lng$3, float_$c, str$8],
    converter: strToColor
  }]);
  var updatePixels = makeFunc(processingProxy, "updatePixels");
  function pixels() {
    var pp = callsim$3(PixelProxy);
    pp.image = {
      pixels: processingProxy.pixels
    };
    return pp;
  }

  var CODED = constants.CODED;
  var _Sk$ffi$4 = Sk.ffi,
      remapToPy$5 = _Sk$ffi$4.remapToPy,
      remapToJs$4 = _Sk$ffi$4.remapToJs;
  var func$5 = Sk.builtin.func;
  var buildClass$5 = Sk.misceval.buildClass;

  function keyboardClass($gbl, $loc) {
    $loc.__getattr__ = new func$5(function (self$$1, attr) {
      var l_attr = remapToJs$4(attr);

      if (l_attr === "key") {
        return key();
      } else if (l_attr === "keyCode") {
        return keyCode();
      } else if (l_attr === "keyPressed") {
        return keyPressed();
      }
    });
  }

  var KeyboardBuilder = function KeyboardBuilder(mod) {
    return buildClass$5(mod, keyboardClass, "Keyboard", []);
  };
  var key = function key() {
    if (processingProxy.key.code === CODED) {
      return remapToPy$5(processingProxy.key.code);
    }

    return remapToPy$5(processingProxy.key.toString());
  };
  var keyCode = function keyCode() {
    return remapToPy$5(processingProxy.keyCode);
  };
  var keyPressed = function keyPressed() {
    return remapToPy$5(processingProxy.__keyPressed);
  };

  var _Sk$builtin$g = Sk.builtin,
      int_$f = _Sk$builtin$g.int_,
      float_$d = _Sk$builtin$g.float_;
  var lights = {
    ambientLight: makeFunc(processingProxy, "ambientLight", [{
      "v1": [int_$f, float_$d]
    }, {
      "v2": [int_$f, float_$d]
    }, {
      "v3": [int_$f, float_$d]
    }, {
      "x": [int_$f, float_$d],
      optional: optional
    }, {
      "y": [int_$f, float_$d],
      optional: optional
    }, {
      "z": [int_$f, float_$d],
      optional: optional
    }]),
    directionalLight: makeFunc(processingProxy, "directionalLight", [{
      "v1": [int_$f, float_$d]
    }, {
      "v2": [int_$f, float_$d]
    }, {
      "v3": [int_$f, float_$d]
    }, {
      "nx": [int_$f, float_$d],
      optional: optional
    }, {
      "ny": [int_$f, float_$d],
      optional: optional
    }, {
      "nz": [int_$f, float_$d],
      optional: optional
    }]),
    lightFalloff: makeFunc(processingProxy, "lightFalloff", [{
      "constant": [int_$f, float_$d]
    }, {
      "linear": [int_$f, float_$d]
    }, {
      "quardatic": [int_$f, float_$d]
    }]),
    lightSpecular: makeFunc(processingProxy, "lightSpecular", [{
      "v1": [int_$f, float_$d]
    }, {
      "v2": [int_$f, float_$d]
    }, {
      "v3": [int_$f, float_$d]
    }]),
    lights: makeFunc(processingProxy, "lights"),
    noLights: makeFunc(processingProxy, "noLights"),
    normal: makeFunc(processingProxy, "normal", [{
      "nx": [int_$f, float_$d]
    }, {
      "ny": [int_$f, float_$d]
    }, {
      "nz": [int_$f, float_$d]
    }]),
    pointLight: makeFunc(processingProxy, "pointLight", [{
      "v1": [int_$f, float_$d]
    }, {
      "v2": [int_$f, float_$d]
    }, {
      "v3": [int_$f, float_$d]
    }, {
      "nx": [int_$f, float_$d]
    }, {
      "ny": [int_$f, float_$d]
    }, {
      "nz": [int_$f, float_$d]
    }]),
    spotLight: makeFunc(processingProxy, "spotLight", [{
      "v1": [int_$f, float_$d]
    }, {
      "v2": [int_$f, float_$d]
    }, {
      "v3": [int_$f, float_$d]
    }, {
      "x": [int_$f, float_$d]
    }, {
      "y": [int_$f, float_$d]
    }, {
      "z": [int_$f, float_$d]
    }, {
      "nx": [int_$f, float_$d]
    }, {
      "ny": [int_$f, float_$d]
    }, {
      "nz": [int_$f, float_$d]
    }, {
      "angle": [int_$f, float_$d]
    }, {
      "concentration": [int_$f, float_$d]
    }])
  };

  var _Sk$builtin$h = Sk.builtin,
      int_$g = _Sk$builtin$h.int_,
      float_$e = _Sk$builtin$h.float_,
      str$9 = _Sk$builtin$h.str,
      lng$4 = _Sk$builtin$h.lng;
  var materialproperties = {
    ambient: makeFunc(processingProxy, "ambient", [{
      "gray": [int_$g, lng$4, float_$e, str$9],
      converter: strToColor
    }, {
      "v1": [int_$g, float_$e],
      optional: optional
    }, {
      "v2": [int_$g, float_$e],
      optional: optional
    }, {
      "v3": [int_$g, float_$e],
      optional: optional
    }]),
    emissive: makeFunc(processingProxy, "emissive", [{
      "gray": [int_$g, lng$4, float_$e, str$9],
      converter: strToColor
    }, {
      "v1": [int_$g, float_$e],
      optional: optional
    }, {
      "v2": [int_$g, float_$e],
      optional: optional
    }, {
      "v3": [int_$g, float_$e],
      optional: optional
    }]),
    shininess: makeFunc(processingProxy, "shininess", [{
      "shine": [int_$g, float_$e]
    }]),
    specular: makeFunc(processingProxy, "specular", [{
      "gray": [int_$g, lng$4, float_$e, str$9],
      converter: strToColor
    }, {
      "v1": [int_$g, float_$e],
      optional: optional
    }, {
      "v2": [int_$g, float_$e],
      optional: optional
    }, {
      "v3": [int_$g, float_$e],
      optional: optional
    }])
  };

  var _Sk$ffi$5 = Sk.ffi,
      remapToPy$6 = _Sk$ffi$5.remapToPy,
      remapToJs$5 = _Sk$ffi$5.remapToJs;
  var func$6 = Sk.builtin.func;
  var buildClass$6 = Sk.misceval.buildClass;

  function mouseClass($gbl, $loc) {
    $loc.__getattr__ = new func$6(function (self$$1, key) {
      switch (remapToJs$5(key)) {
        case "x":
          return remapToPy$6(processingProxy.mouseX);

        case "y":
          return remapToPy$6(processingProxy.mouseY);

        case "px":
          return remapToPy$6(processingProxy.pmouseX);

        case "py":
          return remapToPy$6(processingProxy.pmouseY);

        case "pressed":
          return remapToPy$6(processingProxy.__mousePressed);

        case "button":
          return remapToPy$6(processingProxy.mouseButton);

        default:
          return undefined;
      }
    });
  }

  var MouseBuilder = function MouseBuilder(mod) {
    return buildClass$6(mod, mouseClass, "Mouse", []);
  };
  var mouseX = function mouseX() {
    return remapToPy$6(processingProxy.mouseX);
  };
  var mouseY = function mouseY() {
    return remapToPy$6(processingProxy.mouseY);
  };
  var pmouseX = function pmouseX() {
    return remapToPy$6(processingProxy.pmouseX);
  };
  var pmouseY = function pmouseY() {
    return remapToPy$6(processingProxy.pmouseY);
  };
  var mousePressed = function mousePressed() {
    return remapToPy$6(processingProxy.__mousePressed);
  };
  var mouseButton = function mouseButton() {
    return remapToPy$6(processingProxy.mouseButton);
  };

  var _Sk$builtin$i = Sk.builtin,
      object$1 = _Sk$builtin$i.object,
      str$a = _Sk$builtin$i.str,
      list$3 = _Sk$builtin$i.list;
  var print_ = Sk.misceval.print_;
  var output = {
    println: makeFunc(function (o) {
      print_(o);
      print_("\n");
    }, "println", [{
      "data": object$1
    }]),
    save: makeFunc(processingProxy, "save", [{
      "filename": str$a
    }]),
    saveFrame: makeFunc(processingProxy, "saveFrame", [{
      "filename": str$a
    }, {
      "ext": str$a,
      allowed: ["tif", "tga", "jpg", "png"]
    }]),
    saveStrings: makeFunc(processingProxy, "saveStrings", [{
      "filename": str$a
    }, {
      "strings": list$3
    }]),
    PrintWriter: notImplemented,
    beginRaw: notImplemented,
    beginRecord: notImplemented,
    createOutput: notImplemented,
    createReader: notImplemented,
    createWriter: notImplemented,
    endRaw: notImplemented,
    endRecord: notImplemented,
    saveBytes: notImplemented,
    saveStream: notImplemented,
    selectOuput: notImplemented
  };

  var _Sk$builtin$j = Sk.builtin,
      float_$f = _Sk$builtin$j.float_,
      int_$h = _Sk$builtin$j.int_;
  var random = {
    noise: makeFunc(processingProxy, "noise", [{
      "x": [int_$h, float_$f]
    }, {
      "y": [int_$h, float_$f],
      optional: optional
    }, {
      "z": [int_$h, float_$f],
      optional: optional
    }]),
    noiseDetail: makeFunc(processingProxy, "noiseDetail", [{
      "octave": int_$h
    }, {
      "falloff": [int_$h, float_$f],
      optional: optional
    }]),
    noiseSeed: makeFunc(processingProxy, "noiseSeed", [{
      "value": int_$h
    }]),
    randomSeed: makeFunc(processingProxy, "randomSeed", [{
      "value": int_$h
    }]),
    random: makeFunc(processingProxy, "random", [{
      low: [int_$h, float_$f]
    }, {
      high: [int_$h, float_$f],
      optional: optional
    }]),
    randomGaussian: makeFunc(processingProxy, "randomGaussian")
  };

  var _Sk$ffi$6 = Sk.ffi,
      remapToJs$6 = _Sk$ffi$6.remapToJs,
      remapToPy$7 = _Sk$ffi$6.remapToPy;
  var buildClass$7 = Sk.misceval.buildClass;
  var _Sk$builtin$k = Sk.builtin,
      list$4 = _Sk$builtin$k.list,
      func$7 = _Sk$builtin$k.func;

  function screenClass($gbl, $loc) {
    $loc.__init__ = new func$7(function (self) {
      self.pixels = null;
    });
    $loc.__getattr__ = new func$7(function (self, key) {
      key = remapToJs$6(key);

      switch (key) {
        case "height":
          return remapToPy$7(processing.height);

        case "width":
          return remapToPy$7(processing.width);

        case "pixels":
          if (self.pixels == null) {
            self.pixels = new list$4(processing.pixels.toArray());
          }

          return self.pixels;
      }
    });
  }

  var ScreenBuilder = function ScreenBuilder(mod) {
    return buildClass$7(mod, screenClass, "Screen", []);
  };

  var CORNER$2 = remappedConstants.CORNER,
      CORNERS$2 = remappedConstants.CORNERS,
      CENTER$3 = remappedConstants.CENTER;
  var _Sk$builtin$l = Sk.builtin,
      str$b = _Sk$builtin$l.str,
      int_$i = _Sk$builtin$l.int_,
      float_$g = _Sk$builtin$l.float_,
      bool$1 = _Sk$builtin$l.bool;
  var _Sk$ffi$7 = Sk.ffi,
      remapToJs$7 = _Sk$ffi$7.remapToJs,
      remapToPy$8 = _Sk$ffi$7.remapToPy;
  var buildClass$8 = Sk.misceval.buildClass;

  function shapeIsVisible(self$$1) {
    return self$$1.v.isVisible();
  }

  function shapeSetVisible(self$$1, value) {
    self$$1.v.setVisible(value);
  }

  function shapeDisableStyle(self$$1) {
    self$$1.v.disableStyle();
  }

  function shapeEnableStyle(self$$1) {
    self$$1.v.enableStyle();
  }

  function shapeGetChild(self$$1, shape) {
    // getChild() Returns a child element of a shape as a PShapeSVG object
    var child = self$$1.v.getChild(shape);

    if (child != null) {
      // special method for Skulpt:
      var new_shape = Sk.misceval.callsim(exports.PShape); // Now fill in value:

      new_shape.v = child;
      return new_shape;
    } else {
      return null;
    }
  }

  function shapeTranslate(self$$1, x, y, z) {
    self$$1.v.translate(x.v, y.v, z.v);
  }

  function shapeRotate(self$$1, angle) {
    self$$1.v.rotate(angle);
  }

  function shapeRotateX(self$$1, angle) {
    self$$1.v.rotateX(angle);
  }

  function shapeRotateY(self$$1, angle) {
    self$$1.v.rotateY(angle);
  }

  function shapeRotateZ(self$$1, angle) {
    self$$1.v.rotateZ(angle);
  }

  function shapeScale(self$$1, x, y, z) {
    self$$1.v.scale(x, y, z);
  }

  function shapeClass($gbl, $loc) {
    $loc.__getattr__ = new Sk.builtin.func(function (self$$1, key) {
      key = remapToJs$7(key);

      switch (key) {
        case "width":
          return remapToPy$8(self$$1.v.width);

        case "height":
          return remapToPy$8(self$$1.v.height);
      }
    });
    $loc.isVisible = makeFunc(shapeIsVisible, "isVisible", [self]);
    $loc.setVisible = makeFunc(shapeSetVisible, "setVisible"[({
      "value": bool$1
    })]);
    $loc.disableStyle = makeFunc(shapeDisableStyle, "disableStyle", [self]);
    $loc.enableStyle = makeFunc(shapeEnableStyle, "enableStyle", [self]);
    $loc.getChild = makeFunc(shapeGetChild, "getChild", [self, {
      "shape": exports.PShape
    }]);
    $loc.translate = makeFunc(shapeTranslate, "translate", [self, {
      "x": [int_$i, float_$g]
    }, {
      "y": [int_$i, float_$g]
    }, {
      "z": [int_$i, float_$g],
      optional: optional
    }]);
    $loc.rotate = makeFunc(shapeRotate, "rotate", [self, {
      "angle": [int_$i, float_$g]
    }]);
    $loc.rotateX = makeFunc(shapeRotateX, "rotateX", [self, {
      "angle": [int_$i, float_$g]
    }]);
    $loc.rotateY = makeFunc(shapeRotateY, "rotateY", [self, {
      "angle": [int_$i, float_$g]
    }]);
    $loc.rotateZ = makeFunc(shapeRotateZ, "rotateZ", [self, {
      "angle": [int_$i, float_$g]
    }]);
    $loc.scale = makeFunc(shapeScale, "scale"[({
      "z": [int_$i, float_$g],
      optional: optional
    })]);
  }

  var PShapeBuilder = function PShapeBuilder(mod) {
    return buildClass$8(mod, shapeClass, "PShape", []);
  };
  var shape = {
    loadShape: makeFunc(processingProxy, "loadShape", [{
      "filename": str$b
    }]),
    shape: makeFunc(processingProxy, "shape", [{
      "sh": "PShape"
    }, {
      "x": [int_$i, float_$g]
    }, {
      "y": [int_$i, float_$g]
    }, {
      "width": [int_$i, float_$g],
      optional: optional
    }, {
      "height": [int_$i, float_$g],
      optional: optional
    }]),
    shapeMode: makeFunc(processingProxy, "shapeMode", [{
      "img": int_$i,
      allowed: [CORNER$2, CORNERS$2, CENTER$3]
    }])
  };

  var _Sk$builtin$m = Sk.builtin,
      int_$j = _Sk$builtin$m.int_,
      float_$h = _Sk$builtin$m.float_,
      str$c = _Sk$builtin$m.str,
      list$5 = _Sk$builtin$m.list;
  var stringFunctions = {
    join: makeFunc(processingProxy, "join", [{
      "stringArray": list$5
    }, {
      "separator": str$c
    }]),
    match: makeFunc(processingProxy, "match", [{
      "str": str$c
    }, {
      "regexp": str$c
    }]),
    matchAll: makeFunc(processingProxy, "matchAll", [{
      "str": str$c
    }, {
      "regexp": str$c
    }]),
    nf: makeFunc(processingProxy, "nf", [{
      "value": [int_$j, float_$h, list$5]
    }, {
      "digits": int_$j
    }, {
      "right": int_$j,
      optional: optional
    }]),
    nfc: makeFunc(processingProxy, "nfc", [{
      "value": [int_$j, float_$h, list$5]
    }, {
      "right": int_$j,
      optional: optional
    }]),
    nfp: makeFunc(processingProxy, "nfp", [{
      "value": [int_$j, float_$h, list$5]
    }, {
      "digits": int_$j
    }, {
      "right": int_$j,
      optional: optional
    }]),
    nfs: makeFunc(processingProxy, "nfs", [{
      "value": [int_$j, float_$h, list$5]
    }, {
      "digits": int_$j
    }, {
      "right": int_$j,
      optional: optional
    }]),
    split: makeFunc(processingProxy, "split", [{
      "string": str$c
    }, {
      "delimiter": str$c
    }]),
    splitTokens: makeFunc(processingProxy, "splitTokens", [{
      "string": str$c
    }, {
      "delimiter": str$c,
      optional: optional
    }]),
    trim: makeFunc(processingProxy, "trim", [{
      "strOrArray": [str$c, list$5]
    }])
  };

  var _Sk$builtin$n = Sk.builtin,
      int_$k = _Sk$builtin$n.int_,
      object$2 = _Sk$builtin$n.object;
  var P2D$1 = remappedConstants.P2D,
      JAVA2D$1 = remappedConstants.JAVA2D,
      WEBGL$1 = remappedConstants.WEBGL,
      P3D$1 = remappedConstants.P3D,
      OPENGL$1 = remappedConstants.OPENGL,
      PDF$1 = remappedConstants.PDF,
      DXF$1 = remappedConstants.DXF;

  function loop() {
    if (isInitialised()) {
      throw new Sk.builtin.Exception("loop() should be called after run()");
    }

    processing.loop();
  }

  function noLoop() {
    if (isInitialised()) {
      throw new Sk.builtin.Exception("noLoop() should be called after run()");
    }

    processingProxy.noLoop();
  }

  function size(width, height, renderer) {
    if (renderer === undefined || renderer === P2D$1 || renderer === JAVA2D$1) {
      // monkey patching image to make sure toImageData returns something.
      // 2017 Chrome 64 doesn't always return something the first call.
      // this is a VERY HACKY way to deal with that synchronously.
      processing.toImageData = function (x, y, w, h) {
        x = x !== undefined ? x : 0;
        y = y !== undefined ? y : 0;
        w = w !== undefined ? w : processing.width;
        h = h !== undefined ? h : processing.height;
        var res = undefined;

        while (res === undefined) {
          res = processing.externals.context.getImageData(x, y, w, h);
        }

        return res;
      };
    }

    processing.size(width, height, renderer);
  }

  var structure = {
    loop: makeFunc(loop, "loop"),
    noLoop: makeFunc(noLoop, "noLoop"),
    size: makeFunc(size, "size", [{
      "width": int_$k
    }, {
      "height": int_$k
    }, {
      "renderer": int_$k,
      allowed: [P2D$1, JAVA2D$1, WEBGL$1, P3D$1, OPENGL$1, PDF$1, DXF$1],
      optional: optional
    }]),
    exit: makeFunc(processingProxy, "exit"),
    redraw: makeFunc(processingProxy, "redraw"),
    pushStyle: cachedLazy(constructOptionalContectManager, [{
      __call__: makeFunc(function (self$$1) {
        processingProxy.pushStyle();
        return self$$1;
      }, "__call__", [self]),
      __enter__: makeFunc(function (self$$1) {
        return self$$1;
      }, "__enter__", [self]),
      __exit__: makeFunc(function () {
        return processingProxy.popStyle();
      }, "__exit__", [self, {
        "exc_type": object$2,
        ignored: ignored
      }, {
        "exc_value": object$2,
        ignored: ignored
      }, {
        "traceback": object$2,
        ignored: ignored
      }])
    }, "pushStyle"], "pushStyle"),
    popStyle: makeFunc(processingProxy, "popStyle")
  };

  var timeanddate = {
    day: makeFunc(processingProxy, "day"),
    hour: makeFunc(processingProxy, "hour"),
    millis: makeFunc(processingProxy, "millis"),
    minute: makeFunc(processingProxy, "minute"),
    month: makeFunc(processingProxy, "month"),
    second: makeFunc(processingProxy, "second"),
    year: makeFunc(processingProxy, "year")
  };

  var _Sk$builtin$o = Sk.builtin,
      float_$i = _Sk$builtin$o.float_,
      int_$l = _Sk$builtin$o.int_,
      object$3 = _Sk$builtin$o.object;
  var transform = {
    applyMatrix: makeFunc(processingProxy, "applyMatrix", [{
      "n00": [int_$l, float_$i]
    }, {
      "n01": [int_$l, float_$i]
    }, {
      "n02": [int_$l, float_$i]
    }, {
      "n03": [int_$l, float_$i]
    }, {
      "n04": [int_$l, float_$i]
    }, {
      "n05": [int_$l, float_$i]
    }, {
      "n06": [int_$l, float_$i]
    }, {
      "n07": [int_$l, float_$i]
    }, {
      "n08": [int_$l, float_$i]
    }, {
      "n09": [int_$l, float_$i]
    }, {
      "n10": [int_$l, float_$i]
    }, {
      "n11": [int_$l, float_$i]
    }, {
      "n12": [int_$l, float_$i]
    }, {
      "n13": [int_$l, float_$i]
    }, {
      "n14": [int_$l, float_$i]
    }, {
      "n15": [int_$l, float_$i]
    }]),
    popMatrix: makeFunc(processingProxy, "popMatrix"),
    printMatrix: makeFunc(processingProxy, "printMatrix"),
    pushMatrix: cachedLazy(constructOptionalContectManager, [{
      __call__: makeFunc(function (self$$1) {
        processingProxy.pushMatrix();
        return self$$1;
      }, "__call__", [self]),
      __enter__: makeFunc(function (self$$1) {
        return self$$1;
      }, "__enter__", [self]),
      __exit__: makeFunc(function () {
        return processingProxy.popMatrix();
      }, "__exit__", [self, {
        "exc_type": object$3,
        ignored: ignored
      }, {
        "exc_value": object$3,
        ignored: ignored
      }, {
        "traceback": object$3,
        ignored: ignored
      }])
    }, "pushMatrix"], "pushMatrix"),
    resetMatrix: makeFunc(processingProxy, "resetMatrix"),
    rotate: makeFunc(processingProxy, "rotate", [{
      "angle": [int_$l, float_$i]
    }]),
    rotateX: makeFunc(processingProxy, "rotateX", [{
      "angle": [int_$l, float_$i]
    }]),
    rotateY: makeFunc(processingProxy, "rotateY", [{
      "angle": [int_$l, float_$i]
    }]),
    rotateZ: makeFunc(processingProxy, "rotateZ", [{
      "angle": [int_$l, float_$i]
    }]),
    scale: makeFunc(processingProxy, "scale", [{
      "size": [int_$l, float_$i]
    }, {
      "y": [int_$l, float_$i],
      optional: optional
    }, {
      "z": [int_$l, float_$i],
      optional: optional
    }]),
    translate: makeFunc(processingProxy, "translate", [{
      "x": [int_$l, float_$i]
    }, {
      "y": [int_$l, float_$i]
    }, {
      "z": [int_$l, float_$i],
      optional: optional
    }])
  };

  var _Sk$builtin$p = Sk.builtin,
      int_$m = _Sk$builtin$p.int_,
      float_$j = _Sk$builtin$p.float_;
  var trigonometry = {
    degrees: makeFunc(processingProxy, "degrees", [{
      "angle": [int_$m, float_$j]
    }]),
    radians: makeFunc(processingProxy, "radians", [{
      "angle": [int_$m, float_$j]
    }]),
    cos: makeFunc(processingProxy, "cos", [{
      "angle": [int_$m, float_$j]
    }]),
    sin: makeFunc(processingProxy, "sin", [{
      "angle": [int_$m, float_$j]
    }]),
    tan: makeFunc(processingProxy, "tan", [{
      "angle": [int_$m, float_$j]
    }]),
    acos: makeFunc(processingProxy, "acos", [{
      "value": [int_$m, float_$j]
    }]),
    asin: makeFunc(processingProxy, "asin", [{
      "value": [int_$m, float_$j]
    }]),
    atan: makeFunc(processingProxy, "tan", [{
      "angle": [int_$m, float_$j]
    }]),
    atan2: makeFunc(processingProxy, "atan2", [{
      "x": [int_$m, float_$j]
    }, {
      "y": [int_$m, float_$j]
    }])
  };

  var _Sk$builtin$q = Sk.builtin,
      int_$n = _Sk$builtin$q.int_,
      float_$k = _Sk$builtin$q.float_;
  var _Sk$misceval$4 = Sk.misceval,
      callsim$4 = _Sk$misceval$4.callsim,
      buildClass$9 = _Sk$misceval$4.buildClass;
  var remapToPy$9 = Sk.ffi.remapToPy;

  function vectorInit(self$$1, x, y, z) {
    self$$1.v = new processing.PVector(x, y, z);
  }

  function vectorSet(self$$1, x, y, z) {
    self$$1.v.set(x, y, z);
  }

  function vectorGet(self$$1) {
    var vector = callsim$4(exports.PVector);
    vector.v = self$$1.v.get();
    return vector;
  }

  function vectorAdd(self$$1, vec) {
    var new_vec = callsim$4(exports.PVector);
    new_vec.v = self$$1.v.add(vec);
    return new_vec;
  }

  function vectorSub(self$$1, vec) {
    var new_vec = callsim$4(exports.PVector);
    new_vec.v = self$$1.v.sub(vec);
    return new_vec;
  }

  function vectorMult(self$$1, vec) {
    var new_vec = callsim$4(exports.PVector);
    new_vec.v = self$$1.v.mult(vec);
    return new_vec;
  }

  function vectorDiv(self$$1, vec) {
    var new_vec = callsim$4(exports.PVector);
    new_vec.v = self$$1.v.div(vec);
    return new_vec;
  }

  function vectorDot(self$$1, vec) {
    var new_vec = callsim$4(exports.PVector);
    new_vec.v = self$$1.v.dot(vec);
    return new_vec;
  }

  function vectorCross(self$$1, vec) {
    var new_vec = callsim$4(exports.PVector);
    new_vec.v = self$$1.v.cross(vec);
    return new_vec;
  }

  function vectorDist(self$$1, vec) {
    var new_vec = callsim$4(exports.PVector);
    new_vec.v = self$$1.v.dist(vec);
    return new_vec;
  }

  function vectorAngleBetween(self$$1, vec) {
    var new_vec = callsim$4(exports.PVector);
    new_vec.v = self$$1.v.angleBetween(vec);
    return new_vec;
  }

  function vectorLimit(self$$1, value) {
    self$$1.v.limit(value);
  }

  function vectorClass($gbl, $loc) {
    $loc.__init__ = makeFunc(vectorInit, "__init__", [self, {
      "x": int_$n,
      optional: optional
    }, {
      "y": int_$n,
      optional: optional
    }, {
      "z": int_$n,
      optional: optional
    }]);
    $loc.__getattr__ = new Sk.builtin.func(function (self$$1, key) {
      key = Sk.ffi.remapToJs(key);

      if (key === "x") {
        return remapToPy$9(self$$1.v.x);
      } else if (key === "y") {
        return remapToPy$9(self$$1.v.y);
      } else if (key === "z") {
        return Sk.builtin.assk$(self$$1.v.z);
      }
    });
    $loc.get = makeFunc(vectorGet, "get", [self]), $loc.set = makeFunc(vectorSet, "set", [self, {
      "x": int_$n
    }, {
      "x": int_$n,
      optional: optional
    }, {
      "x": int_$n,
      optional: optional
    }]);
    $loc.mag = makeFunc(function (self$$1) {
      return self$$1.v.mag();
    }, "mag", [self]);
    $loc.add = makeFunc(vectorAdd, "add", [self, {
      "vector": "PVector"
    }]);
    $loc.sub = makeFunc(vectorSub, "sub", [self, {
      "vector": "PVector"
    }]);
    $loc.mult = makeFunc(vectorMult, "mult", [self, {
      "vector": "PVector"
    }]);
    $loc.div = makeFunc(vectorDiv, "div", [self, {
      "vector": "PVector"
    }]);
    $loc.dist = makeFunc(vectorDist, "dist", [self, {
      "vector": "PVector"
    }]);
    $loc.dot = makeFunc(vectorDot, "dot", [self, {
      "x": [int_$n, float_$k]
    }, {
      "y": [int_$n, float_$k],
      optional: optional
    }, {
      "z": [int_$n, float_$k],
      optional: optional
    }]);
    $loc.cross = makeFunc(vectorCross, "cross", [self, {
      "vector": "PVector"
    }]);
    $loc.normalize = makeFunc(function (self$$1) {
      return self$$1.normalize();
    }, "normalize", [self]);
    $loc.limit = makeFunc(vectorLimit, "limit", [self, {
      "value": [int_$n, float_$k]
    }]);
    $loc.angleBetween = makeFunc(vectorAngleBetween, "angleBetween", [self, {
      "vector": "PVector"
    }]);
    $loc.array = makeFunc(function (self$$1) {
      return self$$1.v.array();
    }, "array", [self]);
    $loc.__repr__ = makeFunc(function (self$$1) {
      return self$$1.v.toString();
    }, "repr", [self]);
  }

  var vectorBuilder = (function (mod) {
    return buildClass$9(mod, vectorClass, "PVector", []);
  });

  var _Sk$builtin$r = Sk.builtin,
      float_$l = _Sk$builtin$r.float_,
      int_$o = _Sk$builtin$r.int_,
      object$4 = _Sk$builtin$r.object;
  var IMAGE = remappedConstants.IMAGE,
      NORMALIZED = remappedConstants.NORMALIZED,
      POINTS = remappedConstants.POINTS,
      LINES = remappedConstants.LINES,
      TRIANGLES = remappedConstants.TRIANGLES,
      TRIANGLE_FAN = remappedConstants.TRIANGLE_FAN,
      TRIANGLE_STRIP = remappedConstants.TRIANGLE_STRIP,
      QUADS = remappedConstants.QUADS,
      QUAD_STRIP = remappedConstants.QUAD_STRIP,
      CLOSE = remappedConstants.CLOSE;
  var vertex = {
    beginShape: cachedLazy(constructOptionalContectManager, [{
      __call__: makeFunc(function (self$$1, mode) {
        processingProxy.beginShape(mode);
        return self$$1;
      }, "__call__", [self, {
        "MODE": int_$o,
        allowed: [POINTS, LINES, TRIANGLES, TRIANGLE_FAN, TRIANGLE_STRIP, QUADS, QUAD_STRIP],
        optional: optional
      }]),
      __enter__: makeFunc(function (self$$1) {
        return self$$1;
      }, "__enter__", [self]),
      __exit__: makeFunc(function () {
        return processingProxy.endShape;
      }, "__exit__", [self, {
        "exc_type": object$4,
        ignored: ignored
      }, {
        "exc_value": object$4,
        ignored: ignored
      }, {
        "traceback": object$4,
        ignored: ignored
      }])
    }, "beginShape"], "beginShape"),
    beginClosedShape: cachedLazy(constructOptionalContectManager, [{
      __call__: makeFunc(function (self$$1, mode) {
        processingProxy.beginShape(mode);
        return self$$1;
      }, "__call__", [self, {
        "MODE": int_$o,
        allowed: [POINTS, LINES, TRIANGLES, TRIANGLE_FAN, TRIANGLE_STRIP, QUADS, QUAD_STRIP],
        optional: optional
      }]),
      __enter__: makeFunc(function (self$$1) {
        return self$$1;
      }, "__enter__"[self]),
      __exit__: makeFunc(function () {
        return processingProxy.endShape(constants.CLOSE);
      }, "__exit__", [self, {
        "exc_type": object$4,
        ignored: ignored
      }, {
        "exc_value": object$4,
        ignored: ignored
      }, {
        "traceback": object$4,
        ignored: ignored
      }])
    }, "beginClosedShape"], "beginClosedShape"),
    endShape: makeFunc(processingProxy, "endShape", [{
      "MODE": int_$o,
      allowed: [CLOSE],
      optional: optional
    }]),
    vertex: makeFunc(processingProxy, "vertex", [{
      "x": [int_$o, float_$l]
    }, {
      "y": [int_$o, float_$l]
    }, {
      "z": [int_$o, float_$l],
      optional: optional
    }, {
      "u": [int_$o, float_$l],
      optional: optional
    }, {
      "v": [int_$o, float_$l],
      optional: optional
    }]),
    bezierVertex: makeFunc(processingProxy, "bezierVertex", [{
      "cx1": [int_$o, float_$l]
    }, {
      "cy1": [int_$o, float_$l]
    }, {
      "cz1": [int_$o, float_$l]
    }, {
      "cx2": [int_$o, float_$l]
    }, {
      "cy2": [int_$o, float_$l]
    }, {
      "cz2": [int_$o, float_$l]
    }, {
      "x": [int_$o, float_$l],
      optional: optional
    }, {
      "y": [int_$o, float_$l],
      optional: optional
    }, {
      "z": [int_$o, float_$l],
      optional: optional
    }]),
    curveVertex: makeFunc(processingProxy, "curveVertex", [{
      "x": [int_$o, float_$l]
    }, {
      "y": [int_$o, float_$l]
    }, {
      "z": [int_$o, float_$l],
      optional: optional
    }]),
    texture: makeFunc(processingProxy, "texture", [{
      "img": "PImage"
    }]),
    textureMode: makeFunc(processingProxy, "textureMode", [{
      "img": int_$o,
      allowed: [IMAGE, NORMALIZED]
    }])
  };

  var str$d = Sk.builtin.str;
  var web = {
    link: makeFunc(processingProxy, "link"[({
      "target": str$d,
      optional: optional
    })]),
    status: makeFunc(processingProxy, "status", [{
      "text": str$d
    }])
  };

  var _Sk$misceval$5 = Sk.misceval,
      callsim$5 = _Sk$misceval$5.callsim,
      asyncToPromise = _Sk$misceval$5.asyncToPromise,
      callsimOrSuspend = _Sk$misceval$5.callsimOrSuspend;
  var mod = {};
  exports.processingInstance = {};
  function isInitialised() {
    return exports.processingInstance == null;
  }
  var processing = processingProxy;
  var suspHandler;
  var bHandler;
  var seenCanvas = null;
  var doubleBuffered = true;

  var eventPred = function eventPred() {
    return true;
  };

  function init(path, suspensionHandler, breakHandler, eventPredicate) {
    suspHandler = suspensionHandler;

    if (breakHandler !== undefined && typeof breakHandler !== "function") {
      throw new Error("breakHandler must be a function if anything");
    } else {
      bHandler = breakHandler;
    }

    Sk.externalLibraries = Sk.externalLibraries || {};

    _extends(Sk.externalLibraries, {
      "./processing/__init__.js": {
        path: "".concat(path, "/__init__.js")
      }
    });

    if (typeof eventPredicate === "function") {
      eventPred = eventPredicate;
    }
  }
  function main() {
    // We need this to store a reference to the actual processing object which is not created
    // until the run function is called.  Even then the processing object is passed by the
    // processing-js sytem as a parameter to the sketchProc function.  Why not set it to None here
    //
    // See:  http://processingjs.org/reference/
    //  //////////////////////////////////////////////////////////////////////
    //  Run
    //
    //  Create the processing context and setup of calls to setup, draw etc.
    //
    //
    //  //////////////////////////////////////////////////////////////////////
    exports.PImage = PImageBuilder(mod);
    exports.PShape = PShapeBuilder(mod);
    exports.PGraphics = PGraphicsBuilder(mod);
    exports.PVector = vectorBuilder(mod);
    exports.PFont = PFontBuilder(mod);
    var Environment = EnvironmentBuilder(mod);
    var FrameRate = FrameRateBuilder(mod);
    var frameRate = callsim$5(FrameRate);
    var environment = callsim$5(Environment);
    var Mouse = MouseBuilder(mod);
    var mouse = callsim$5(Mouse);
    var Keyboard = KeyboardBuilder(mod);
    var keyboard = callsim$5(Keyboard);
    var Screen = ScreenBuilder(mod);
    var screen = callsim$5(Screen);
    initUtils(mod);

    _extends(mod, twodprimitives, threedprimitives, attributes, calculation, camera, ccreatingandreading, csetting, {
      color: color
    }, remappedConstants, coordinates, curves, {
      Environment: Environment,
      environment: environment,
      cursor: cursor,
      noCursor: noCursor,
      height: height,
      width: width,
      frameCount: frameCount,
      frameRate: frameRate,
      focused: focused
    }, files, fontattribues, fontmetrics, {
      PFont: exports.PFont,
      createFont: createFont,
      loadFont: loadFont,
      text: text,
      textFont: textFont
    }, {
      PGraphics: exports.PGraphics,
      createGraphics: createGraphics,
      hint: hint
    }, {
      PImage: exports.PImage
    }, {
      image: image,
      createImage: createImage,
      imageMode: imageMode,
      loadImage: loadImage,
      noTint: noTint,
      requestImage: requestImage,
      tint: tint,
      blend: blend,
      copy: copy,
      filter: filter,
      get: get,
      loadPixels: loadPixels,
      set: set$1,
      updatePixels: updatePixels,
      pixels: pixels
    }, {
      keyboard: keyboard,
      Keyboard: Keyboard,
      keyCode: keyCode,
      key: key,
      keyPressed: keyPressed
    }, lights, materialproperties, {
      Mouse: Mouse,
      mouse: mouse,
      mouseX: mouseX,
      mouseY: mouseY,
      pmouseX: pmouseX,
      pmouseY: pmouseY,
      mousePressed: mousePressed,
      mouseButton: mouseButton
    }, output, random, {
      Screen: Screen,
      screen: screen
    }, {
      PShape: exports.PShape
    }, structure, timeanddate, transform, trigonometry, {
      PVector: exports.PVector
    }, vertex, web, shape, stringFunctions);

    mod.disableDoubleBuffer = new Sk.builtin.func(function () {
      doubleBuffered = false;
      return Sk.builtin.none.none$;
    });
    mod.run = new Sk.builtin.func(function () {
      var susp = new Sk.misceval.Suspension();
      var exceptionOccurred = null;
      var finish = null;
      var canvas = null;
      var parentNode = null;

      susp.resume = function () {
        if (susp.data["error"]) {
          throw susp.data["error"];
        }

        return Sk.builtin.none.none$;
      };

      susp.data = {
        type: "Sk.promise",
        promise: new Promise(function (resolve, reject) {
          exceptionOccurred = reject;
          finish = resolve;
        })
      };
      var sketchProc = new window.Processing.Sketch(function sketchProcFunc(proc) {
        function throwAndExit(e) {
          exceptionOccurred(e);
          proc.exit();
        }

        exports.processingInstance = proc;

        if (Sk.globals["setup"]) {
          proc.setup = function () {
            return asyncToPromise(function () {
              return callsimOrSuspend(Sk.globals["setup"]);
            }, suspHandler);
          };
        }

        if (Sk.globals["draw"]) {
          proc.draw = function () {
            // call the break handler every draw so the processing.sk is stoppable.
            if (bHandler) {
              try {
                bHandler();
              } catch (e) {
                throwAndExit(e);
              }
            }

            return asyncToPromise(function () {
              return callsimOrSuspend(Sk.globals["draw"]);
            }, suspHandler);
          };
        }

        var callBacks = ["mouseMoved", "mouseClicked", "mouseDragged", "mouseMoved", "mouseOut", "mouseOver", "mousePressed", "mouseReleased", "keyPressed", "keyReleased", "keyTyped"];

        for (var cb in callBacks) {
          if (Sk.globals[callBacks[cb]]) {
            (function () {
              // don't access a modified closure
              var callback = callBacks[cb]; // store the python callback

              var skulptCallback = Sk.globals[callback]; // replace the function with the processing variable if it's keyPressed or mousePressed
              // because they can both be callbacks and variables.

              if (callback == "keyPressed") {
                Sk.globals[callback] = keyPressed;
              }

              if (callback == "mousePressed") {
                Sk.globals[callback] = mousePressed;
              }

              proc[callback] = function () {
                return asyncToPromise(function () {
                  return Sk.misceval.callsimOrSuspend(skulptCallback);
                }, suspHandler).catch(function (r) {
                  return throwAndExit(r);
                });
              };
            })();
          }
        }
      });
      sketchProc.options.globalKeyEvents = true;
      sketchProc.options.eventPredicate = eventPred;

      sketchProc.onExit = function (e) {
        if (e) {
          exceptionOccurred(e);
        } else {
          finish();
        }
      };

      sketchProc.onSetup = function (e) {
        if (e) {
          exceptionOccurred(e);
        }
      };

      var canvasContainer = document.getElementById(Sk.canvas); // this shouldn't be the case but added for backwards compat
      // may have strange results when this hits.

      if (canvasContainer.tagName === "CANVAS") {
        parentNode = canvasContainer.parentNode;
        parentNode.removeChild(canvasContainer);
        canvasContainer = parentNode;
      }

      canvas = document.createElement("canvas");
      canvas.id = Sk.canvas + "-psk";

      while (canvasContainer.firstChild) {
        canvasContainer.removeChild(canvasContainer.firstChild);
      }

      if (doubleBuffered) {
        canvas.style = "display:none";
        seenCanvas = document.createElement("canvas");
        canvasContainer.appendChild(seenCanvas);
      } else {
        canvasContainer.appendChild(canvas);
      } // if a Processing instance already exists it's likely still running, stop it by exiting


      var instance = window.Processing.getInstanceById(Sk.canvas + "-psk");

      if (instance) {
        instance.exit();
      }

      sketchProc.options.focusElement = canvasContainer; // ugly hack make it start the loopage!

      setTimeout(function () {
        mod.p = new window.Processing(canvas, sketchProc, null, seenCanvas);
      }, 300);
      return susp;
    });
    return mod;
  }

  exports.isInitialised = isInitialised;
  exports.processing = processing;
  exports.init = init;
  exports.main = main;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
