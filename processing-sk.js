(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.ProcessingSk = {})));
}(this, (function (exports) { 'use strict';

/* global Sk, require */

if (typeof require === "function") {
    var fs = require("fs");
    var skulpt = fs.readFileSync("bower_components/skulpt/skulpt.min.js").toString();
    (1, eval)(skulpt);
}

var slicedToArray = function () {
  function sliceIterator(arr, i) {
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
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var _Sk$builtin$1 = Sk.builtin;
var str = _Sk$builtin$1.str;
var func = _Sk$builtin$1.func;
var NotImplementedError = _Sk$builtin$1.NotImplementedError;
var pyCheckArgs = _Sk$builtin$1.pyCheckArgs;
var ValueError = _Sk$builtin$1.ValueError;
var TypeError$1 = _Sk$builtin$1.TypeError;
var _Sk$ffi = Sk.ffi;
var remapToJs = _Sk$ffi.remapToJs;
var remapToPy = _Sk$ffi.remapToPy;
var _Sk$misceval$1 = Sk.misceval;
var buildClass = _Sk$misceval$1.buildClass;
var callsim$1 = _Sk$misceval$1.callsim;
var assign = Object.assign;
var keys = Object.keys;


var argsToArray = Array.from;

var cache = new Map();

var OptionalContextManager = void 0;

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
        var _a = slicedToArray(a, 2),
            arg = _a[0],
            template = _a[1];

        var keys = Object.keys(template);
        var argName = keys[0];

        if (!Array.isArray(template[argName])) {
            template[argName] = [template[argName]];
        }

        // if a is true i.e. a short cut if you don't want the type to be checked Any or self.
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
            throw new TypeError$1(name + ": " + argName + " (value: " + remapToJs(arg) + ") not of type " + template[argName].map(function (t) {
                return t.tp$name;
            }));
        }
    });
}

function makeFunc(thingToWrap, name, args_template) {
    var largs_template = args_template || [];

    var jsfunc = function wrappedFunc() {
        var functionToWrap = null;

        if (typeof thingToWrap != "function") {
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

        var js_args = args.filter(function (a, i) {
            return largs_template[i].ignored === undefined || !largs_template[i].ignored;
        }).map(function (a, i) {
            var template = largs_template[i];

            if (template === self$1) {
                return a;
            }

            if (template.converter) {
                return template.converter(remapToJs(a));
            }

            return remapToJs(a);
        });

        pyCheckArgs(name, args, countNonOptionalArgs(largs_template), largs_template.length, false);

        pyCheckTypes(name, join(function (l, r) {
            return [l, r];
        }, args, largs_template));

        var result = functionToWrap.apply(null, js_args);

        return remapToPy(result);
    };

    return new func(jsfunc);
}

function strToColor(input) {
    if (typeof input === "string") {
        var res = /#([A-F0-9]{6})/g.exec(input);
        if (res.length !== 2) {
            throw new ValueError(input + " not in the correct format for a color expecting \"#AB12F4\"");
        }

        return parseInt(res[1], 16) + 0xFF000000;
    }

    return input;
}

var optional = true;

var ignored = true;

var self$1 = { "self": true };

var notImplemented = new func(function () {
    throw new NotImplementedError();
});

var __name__ = new str("processing");

var processingProxy = new Proxy({}, {
    get: function get$$1(target, name) {
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

    return callsim$1(OptionalContextManager(loc, name));
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

var _Sk$builtin = Sk.builtin;
var float_ = _Sk$builtin.float_;
var int_ = _Sk$builtin.int_;


var twodprimitives = {
    arc: makeFunc(processingProxy, "arc", [{ "x": [int_, float_] }, { "y": [int_, float_] }, { "width": [int_, float_] }, { "height": [int_, float_] }, { "start": [int_, float_] }, { "stop": [int_, float_] }]),

    ellipse: makeFunc(processingProxy, "ellipse", [{ "x": [int_, float_] }, { "y": [int_, float_] }, { "width": [int_, float_] }, { "height": [int_, float_] }]),

    line: makeFunc(processingProxy, "line", [{ "x1": [int_, float_] }, { "y1": [int_, float_] }, { "z1": [int_, float_] }, { "x2": [int_, float_] }, { "y2": [int_, float_], optional: optional }, { "z2": [int_, float_], optional: optional }]),

    point: makeFunc(processingProxy, "point", [{ "x": [int_, float_] }, { "y": [int_, float_] }, { "z": [int_, float_], optional: optional }]),

    quad: makeFunc(processingProxy, "quad", [{ "x1": [int_, float_] }, { "y1": [int_, float_] }, { "x2": [int_, float_] }, { "y2": [int_, float_] }, { "x3": [int_, float_] }, { "y3": [int_, float_] }, { "x4": [int_, float_] }, { "y4": [int_, float_] }]),

    rect: makeFunc(processingProxy, "rect", [{ "x": [int_, float_] }, { "y": [int_, float_] }, { "width": [int_, float_] }, { "height": [int_, float_] }, { "tlradius": [int_, float_], optional: optional }, { "trradius": [int_, float_], optional: optional }, { "brradius": [int_, float_], optional: optional }, { "blradius": [int_, float_], optional: optional }]),

    triangle: makeFunc(processingProxy, "triangle", [{ "x1": [int_, float_] }, { "y1": [int_, float_] }, { "x2": [int_, float_] }, { "y2": [int_, float_] }, { "x3": [int_, float_] }, { "y3": [int_, float_] }])
};

var _Sk$builtin$2 = Sk.builtin;
var float_$1 = _Sk$builtin$2.float_;
var int_$1 = _Sk$builtin$2.int_;


var threedprimitives = {
    box: makeFunc(processingProxy, "box", [{ "width": [int_$1, float_$1] }, { "height": [int_$1, float_$1], optional: optional }, { "depth": [int_$1, float_$1], optional: optional }]),

    sphere: makeFunc(processingProxy, "sphere", [{ "radius": [int_$1, float_$1] }]),

    sphereDetail: makeFunc(processingProxy, "sphereDetail", [{ "ures": int_$1 }, { "vres": int_$1, optional: optional }])
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
    CORNER: 0, // Draw mode convention to use (x, y) to (width, height)
    CORNERS: 1, // Draw mode convention to use (x1, y1) to (x2, y2) coordinates
    RADIUS: 2, // Draw mode from the center, and using the radius
    CENTER_RADIUS: 2, // Deprecated! Use RADIUS instead
    CENTER: 3, // Draw from the center, using second pair of values as the diameter
    DIAMETER: 3, // Synonym for the CENTER constant. Draw from the center
    CENTER_DIAMETER: 3, // Deprecated! Use DIAMETER instead

    // Text vertical alignment modes
    BASELINE: 0, // Default vertical alignment for text placement
    TOP: 101, // Align text to the top
    BOTTOM: 102, // Align text from the bottom, using the baseline

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
    SINCOS_LENGTH: 720, // every half degree
    PRECISIONB: 15, // fixed point precision is limited to 15 bits!!
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

var _Sk$builtin$3 = Sk.builtin;
var int_$2 = _Sk$builtin$3.int_;
var str$1 = _Sk$builtin$3.str;
var float_$2 = _Sk$builtin$3.float_;
var ROUND = remappedConstants.ROUND;
var SQUARE = remappedConstants.SQUARE;
var BUTT = remappedConstants.BUTT;
var MITTER = remappedConstants.MITTER;
var BEVEL = remappedConstants.BEVEL;
var CENTER = remappedConstants.CENTER;
var RADIUS = remappedConstants.RADIUS;
var CORNER = remappedConstants.CORNER;
var CORNERS = remappedConstants.CORNERS;


var attributes = {
    ellipseMode: makeFunc(processingProxy, "ellipseMode", [{ "mode": int_$2, allowed: [CENTER, RADIUS, CORNER, CORNERS] }]),

    noSmooth: makeFunc(processingProxy, "noSmooth"),

    smooth: makeFunc(processingProxy, "smooth", [{ "level": int_$2, allows: [2, 4, 8], ignored: ignored, optional: optional }]),

    rectMode: makeFunc(processingProxy, "rectMode", [{ "mode": int_$2, allowed: [CENTER, RADIUS, CORNER, CORNERS] }]),

    strokeCap: makeFunc(processingProxy, "strokeCap", [{ "mode": str$1, allowed: [ROUND, SQUARE, BUTT] }]),

    strokeJoin: makeFunc(processingProxy, "strokeJoin", [{ "mode": str$1, allowed: [MITTER, BEVEL, ROUND] }]),

    strokeWeight: makeFunc(processingProxy, "strokeWeight", [{ "width": [int_$2, float_$2] }])
};

var _Sk$builtin$4 = Sk.builtin;
var int_$3 = _Sk$builtin$4.int_;
var float_$3 = _Sk$builtin$4.float_;
var list = _Sk$builtin$4.list;


var calculation = {
    abs: makeFunc(processingProxy, "abs", [{ "value": [int_$3, float_$3] }]),

    ceil: makeFunc(processingProxy, "ceil", [{ "value": [int_$3, float_$3] }]),

    constrain: makeFunc(processingProxy, "constrain", [{ "value": [int_$3, float_$3] }, { "min": [int_$3, float_$3] }, { "max": [int_$3, float_$3] }]),

    dist: makeFunc(processingProxy, "dist", [{ "x1": [int_$3, float_$3] }, { "y1": [int_$3, float_$3] }, { "z1": [int_$3, float_$3] }, { "x2": [int_$3, float_$3] }, { "y2": [int_$3, float_$3], optional: optional }, { "z2": [int_$3, float_$3], optional: optional }]),

    exp: makeFunc(processingProxy, "exp", [{ "value": [int_$3, float_$3] }]),

    floor: makeFunc(processingProxy, "floor", [{ "value": [int_$3, float_$3] }]),

    lerp: makeFunc(processingProxy, "lerp", [{ "value1": [int_$3, float_$3] }, { "value2": [int_$3, float_$3] }, { "amt": [int_$3, float_$3] }]),

    mag: makeFunc(processingProxy, "mag", [{ "a": [int_$3, float_$3] }, { "a": [int_$3, float_$3] }, { "a": [int_$3, float_$3], optional: optional }]),

    map: makeFunc(processingProxy, "map", [{ "value": [int_$3, float_$3] }, { "low1": [int_$3, float_$3] }, { "high1": [int_$3, float_$3] }, { "low2": [int_$3, float_$3] }, { "high2": [int_$3, float_$3] }]),

    max: makeFunc(processingProxy, "max", [{ "values": [list, int_$3, float_$3] }, { "b": [int_$3, float_$3], optional: optional }, { "c": [int_$3, float_$3], optional: optional }]),

    min: makeFunc(processingProxy, "min", [{ "values": [list, int_$3, float_$3] }, { "b": [int_$3, float_$3], optional: optional }, { "c": [int_$3, float_$3], optional: optional }]),

    norm: makeFunc(processingProxy, "norm", [{ "value": [int_$3, float_$3] }, { "low": [int_$3, float_$3] }, { "high": [int_$3, float_$3] }]),

    pow: makeFunc(processingProxy, "pow", [{ "n": [int_$3, float_$3] }, { "e": [int_$3, float_$3] }]),

    round: makeFunc(processingProxy, "round", [{ "value": [int_$3, float_$3] }]),

    sq: makeFunc(processingProxy, "sq", [{ "value": [int_$3, float_$3] }]),

    sqrt: makeFunc(processingProxy, "sq", [{ "value": [int_$3, float_$3] }])
};

var _Sk$builtin$5 = Sk.builtin;
var float_$4 = _Sk$builtin$5.float_;
var int_$4 = _Sk$builtin$5.int_;
var object = _Sk$builtin$5.object;


var camera = {
    beginCamera: cachedLazy(constructOptionalContectManager, [{
        __call__: makeFunc(function (self) {
            processingProxy.beginCamera();
            return self;
        }, "__call__", [self$1]),
        __enter__: makeFunc(function (self) {
            return self;
        }, "__enter__", [self$1]),
        __exit__: makeFunc(function () {
            return processingProxy.endCamera();
        }, "__exit__", [self$1, { "exc_type": object, ignored: ignored }, { "exc_value": object, ignored: ignored }, { "traceback": object, ignored: ignored }])
    }, "beginCamera"], "beginCamera"),

    endCamera: makeFunc(processingProxy, "endCamera"),

    camera: makeFunc(processingProxy, "camera", [{ "eyeX": [int_$4, float_$4], optional: optional }, { "eyeY": [int_$4, float_$4], optional: optional }, { "eyeZ": [int_$4, float_$4], optional: optional }, { "centerX": [int_$4, float_$4], optional: optional }, { "centerY": [int_$4, float_$4], optional: optional }, { "centerZ": [int_$4, float_$4], optional: optional }, { "upX": [int_$4, float_$4], optional: optional }, { "upY": [int_$4, float_$4], optional: optional }, { "upZ": [int_$4, float_$4], optional: optional }]),

    frustum: makeFunc(processingProxy, "frustum", [{ "left": [int_$4, float_$4] }, { "right": [int_$4, float_$4] }, { "bottom": [int_$4, float_$4] }, { "top": [int_$4, float_$4] }, { "near": [int_$4, float_$4] }, { "far": [int_$4, float_$4] }]),

    ortho: makeFunc(processingProxy, "ortho", [{ "left": [int_$4, float_$4], optional: optional }, { "right": [int_$4, float_$4], optional: optional }, { "bottom": [int_$4, float_$4], optional: optional }, { "top": [int_$4, float_$4], optional: optional }, { "near": [int_$4, float_$4], optional: optional }, { "far": [int_$4, float_$4], optional: optional }]),

    perspective: makeFunc(processingProxy, "perspective", [{ "fov": [int_$4, float_$4], optional: optional }, { "aspect": [int_$4, float_$4], optional: optional }, { "zNear": [int_$4, float_$4], optional: optional }, { "zFar": [int_$4, float_$4], optional: optional }]),

    printCamera: makeFunc(processingProxy, "printCamera"),

    printProjection: makeFunc(processingProxy, "printProjection")
};

var BLEND = remappedConstants.BLEND;
var ADD = remappedConstants.ADD;
var SUBTRACT = remappedConstants.SUBTRACT;
var DARKEST = remappedConstants.DARKEST;
var LIGHTEST = remappedConstants.LIGHTEST;
var DIFFERENCE = remappedConstants.DIFFERENCE;
var EXLUSION = remappedConstants.EXLUSION;
var MULTIPLY = remappedConstants.MULTIPLY;
var SCREEN = remappedConstants.SCREEN;
var OVERLAY = remappedConstants.OVERLAY;
var HARD_LIGHT = remappedConstants.HARD_LIGHT;
var SOFT_LIGHT = remappedConstants.SOFT_LIGHT;
var DODGE = remappedConstants.DODGE;
var BURN = remappedConstants.BURN;
var _Sk$builtin$6 = Sk.builtin;
var int_$5 = _Sk$builtin$6.int_;
var float_$5 = _Sk$builtin$6.float_;
var lng = _Sk$builtin$6.lng;
var str$2 = _Sk$builtin$6.str;


var ccreatingandreading = {
    alpha: makeFunc(processingProxy, "alpha", [{ "color": [int_$5, lng, float_$5, str$2], converter: strToColor }]),

    blendColor: makeFunc(processingProxy, "blendColor", [{ "c1": [int_$5, lng, float_$5, str$2], converter: strToColor }, { "c2": [int_$5, lng, float_$5, str$2], converter: strToColor }, { "mode": int_$5, allowed: [BLEND, ADD, SUBTRACT, DARKEST, LIGHTEST, DIFFERENCE, EXLUSION, MULTIPLY, SCREEN, OVERLAY, HARD_LIGHT, SOFT_LIGHT, DODGE, BURN] }]),

    blue: makeFunc(processingProxy, "blue", [{ "color": [int_$5, lng, float_$5, str$2], converter: strToColor }]),

    brightness: makeFunc(processingProxy, "brightness", [{ "color": [int_$5, lng, float_$5, str$2], converter: strToColor }]),

    green: makeFunc(processingProxy, "green", [{ "color": [int_$5, lng, float_$5, str$2], converter: strToColor }]),

    hue: makeFunc(processingProxy, "hue", [{ "color": [int_$5, lng, float_$5, str$2], converter: strToColor }]),

    lerpColor: makeFunc(processingProxy, "lerpColor", [{ "c1": [int_$5, lng, float_$5, str$2], converter: strToColor }, { "c2": [int_$5, lng, float_$5, str$2], converter: strToColor }, { "amt": [int_$5, float_$5] }]),

    red: makeFunc(processingProxy, "red", [{ "color": [int_$5, lng, float_$5, str$2], converter: strToColor }]),

    saturation: makeFunc(processingProxy, "saturation", [{ "color": [int_$5, lng, float_$5, str$2], converter: strToColor }])
};

var RGB = remappedConstants.RGB;
var HSB = remappedConstants.HSB;
var _Sk$builtin$7 = Sk.builtin;
var int_$6 = _Sk$builtin$7.int_;
var float_$6 = _Sk$builtin$7.float_;
var str$3 = _Sk$builtin$7.str;
var lng$1 = _Sk$builtin$7.lng;


var csetting = {
    background: makeFunc(processingProxy, "background", [{ "value1": [int_$6, lng$1, float_$6, str$3], converter: strToColor }, { "value2": [int_$6, float_$6], optional: optional }, { "value2": [int_$6, float_$6], optional: optional }, { "alpha": [int_$6, float_$6], optional: optional }]),

    colorMode: makeFunc(processingProxy, "colorMode", [{ "mode": int_$6, allowed: [RGB, HSB] }, { "range1": [int_$6, float_$6], optional: optional }, { "range2": [int_$6, float_$6], optional: optional }, { "range3": [int_$6, float_$6], optional: optional }, { "range4": [int_$6, float_$6], optional: optional }]),

    fill: makeFunc(processingProxy, "fill", [{ "value1": [int_$6, lng$1, float_$6, str$3], converter: strToColor }, { "value2": [int_$6, float_$6], optional: optional }, { "value2": [int_$6, float_$6], optional: optional }, { "alpha": [int_$6, float_$6], optional: optional }]),

    noFill: makeFunc(processingProxy, "noFill"),

    noStroke: makeFunc(processingProxy, "noStroke"),

    stroke: makeFunc(processingProxy, "stroke", [{ "value1": [int_$6, lng$1, float_$6, str$3], converter: strToColor }, { "value2": [int_$6, float_$6], optional: optional }, { "value2": [int_$6, float_$6], optional: optional }, { "alpha": [int_$6, float_$6], optional: optional }])
};

var _Sk$builtin$8 = Sk.builtin;
var float_$7 = _Sk$builtin$8.float_;
var int_$7 = _Sk$builtin$8.int_;
var str$4 = _Sk$builtin$8.str;
var lng$2 = _Sk$builtin$8.lng;


var color = makeFunc(processingProxy, "color", [{ "value1": [int_$7, float_$7, str$4, lng$2], "converter": strToColor }, { "value2": [int_$7, float_$7], optional: optional }, { "value3": [int_$7, float_$7], optional: optional }, { "alpha": [int_$7, float_$7], optional: optional }]);

var _Sk$builtin$9 = Sk.builtin;
var int_$8 = _Sk$builtin$9.int_;
var float_$8 = _Sk$builtin$9.float_;


var coordinates = {
    modelX: makeFunc(processingProxy, "modelX", [{ "x": [int_$8, float_$8] }, { "y": [int_$8, float_$8] }, { "z": [int_$8, float_$8] }]),

    modelY: makeFunc(processingProxy, "modelY", [{ "x": [int_$8, float_$8] }, { "y": [int_$8, float_$8] }, { "z": [int_$8, float_$8] }]),

    modelZ: makeFunc(processingProxy, "modelZ", [{ "x": [int_$8, float_$8] }, { "y": [int_$8, float_$8] }, { "z": [int_$8, float_$8] }]),

    screenX: makeFunc(processingProxy, "screenX", [{ "x": [int_$8, float_$8] }, { "y": [int_$8, float_$8] }, { "z": [int_$8, float_$8] }]),

    screenY: makeFunc(processingProxy, "screenY", [{ "x": [int_$8, float_$8] }, { "y": [int_$8, float_$8] }, { "z": [int_$8, float_$8] }]),

    screenZ: makeFunc(processingProxy, "screenZ", [{ "x": [int_$8, float_$8] }, { "y": [int_$8, float_$8] }, { "z": [int_$8, float_$8] }])
};

var _Sk$builtin$10 = Sk.builtin;
var int_$9 = _Sk$builtin$10.int_;
var float_$9 = _Sk$builtin$10.float_;


var curves = {
    bezier: makeFunc(processingProxy, "bezier", [{ "x1": [int_$9, float_$9] }, { "y1": [int_$9, float_$9] }, { "z1": [int_$9, float_$9] }, { "cx1": [int_$9, float_$9] }, { "cy1": [int_$9, float_$9] }, { "cz1": [int_$9, float_$9] }, { "cx2": [int_$9, float_$9] }, { "cy2": [int_$9, float_$9] }, { "cz2": [int_$9, float_$9], optional: optional }, { "x2": [int_$9, float_$9], optional: optional }, { "y2": [int_$9, float_$9], optional: optional }, { "z2": [int_$9, float_$9], optional: optional }]),

    bezierDetail: makeFunc(processingProxy, "bezierDetail", [{ "detail": int_$9 }]),

    bezierPoint: makeFunc(processingProxy, "bezierPoint", [{ "a": [int_$9, float_$9] }, { "b": [int_$9, float_$9] }, { "c": [int_$9, float_$9] }, { "d": [int_$9, float_$9] }, { "t": [int_$9, float_$9] }]),

    bezierTangent: makeFunc(processingProxy, "bezierTangent", [{ "a": [int_$9, float_$9] }, { "b": [int_$9, float_$9] }, { "c": [int_$9, float_$9] }, { "d": [int_$9, float_$9] }, { "t": [int_$9, float_$9] }]),

    curve: makeFunc(processingProxy, "curve", [{ "x1": [int_$9, float_$9] }, { "y1": [int_$9, float_$9] }, { "z1": [int_$9, float_$9] }, { "x2": [int_$9, float_$9] }, { "y2": [int_$9, float_$9] }, { "z2": [int_$9, float_$9] }, { "x3": [int_$9, float_$9] }, { "y3": [int_$9, float_$9] }, { "z3": [int_$9, float_$9], optional: optional }, { "x4": [int_$9, float_$9], optional: optional }, { "y4": [int_$9, float_$9], optional: optional }, { "z4": [int_$9, float_$9], optional: optional }]),

    curveDetail: makeFunc(processingProxy, "curveDetail", [{ "detail": int_$9 }]),

    curvePoint: makeFunc(processingProxy, "curvePoint", [{ "a": [int_$9, float_$9] }, { "b": [int_$9, float_$9] }, { "c": [int_$9, float_$9] }, { "d": [int_$9, float_$9] }, { "t": [int_$9, float_$9] }]),

    curveTangent: makeFunc(processingProxy, "curveTangent"[({ "a": [int_$9, float_$9] }, { "b": [int_$9, float_$9] }, { "c": [int_$9, float_$9] }, { "d": [int_$9, float_$9] }, { "t": [int_$9, float_$9] })]),

    curveTightness: makeFunc(processingProxy, "curveTightness", [{ "squishy": [int_$9, float_$9] }])
};

var _Sk$ffi$1 = Sk.ffi;
var remapToPy$2 = _Sk$ffi$1.remapToPy;
var remapToJs$1 = _Sk$ffi$1.remapToJs;
var _Sk$builtin$11 = Sk.builtin;
var func$1 = _Sk$builtin$11.func;
var int_$10 = _Sk$builtin$11.int_;
var buildClass$1 = Sk.misceval.buildClass;
var ARROW = remappedConstants.ARROW;
var CROSS = remappedConstants.CROSS;
var HAND = remappedConstants.HAND;
var MOVE = remappedConstants.MOVE;
var TEXT = remappedConstants.TEXT;
var WAIT = remappedConstants.WAIT;


function environmentClass($gbl, $loc) {
    $loc.__getattr__ = new func$1(function (self, key) {
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
    $loc.__init__ = makeFunc(function (self) {
        self.v = processingProxy.__frameRate;
    }, "__init__", [self$1]);

    $loc.__call__ = makeFunc(function (self, rate) {
        processingProxy.frameRate(rate);
        self.v = rate;
    }, "__call__", [self$1, { "rate": int_$10 }]);
}

var FrameRateBuilder = function FrameRateBuilder(mod) {
    return buildClass$1(mod, frameRateClass, "FrameRate", [int_$10]);
};

var cursor = makeFunc(processingProxy, "cursor", [{ "image": ["PImage", int_$10], allowed: [ARROW, CROSS, HAND, MOVE, TEXT, WAIT], optional: optional }, { "x": int_$10, optional: optional }, { "y": int_$10, optional: optional }]);

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
    loadBytes: makeFunc(processingProxy, "loadBytes", [{ "filename": str$5 }]),
    loadStrings: makeFunc(processingProxy, "loadStrings"[{ "filename": str$5 }]),
    createInput: notImplemented,
    selectFolder: notImplemented,
    selectInput: notImplemented
};

var LEFT = remappedConstants.LEFT;
var CENTER$1 = remappedConstants.CENTER;
var RIGHT = remappedConstants.RIGHT;
var TOP = remappedConstants.TOP;
var BOTTOM = remappedConstants.BOTTOM;
var BASELINE = remappedConstants.BASELINE;
var MODEL = remappedConstants.MODEL;
var SCREEN$1 = remappedConstants.SCREEN;
var SHAPE = remappedConstants.SHAPE;
var _Sk$builtin$12 = Sk.builtin;
var int_$11 = _Sk$builtin$12.int_;
var float_$10 = _Sk$builtin$12.float_;
var str$6 = _Sk$builtin$12.str;


var fontattribues = {
    textAlign: makeFunc(processingProxy, "textAlign", [{ "ALIGN": int_$11, allowed: [LEFT, CENTER$1, RIGHT] }, { "YALIGN": int_$11, allowed: [TOP, BOTTOM, BASELINE, CENTER$1] }]),

    textLeading: makeFunc(processingProxy, "textLeading", [{ "dist": [int_$11, float_$10] }]),

    textMode: makeFunc(processingProxy, "textMode", [{ "MODE": int_$11, allowed: [MODEL, SCREEN$1, SHAPE] }]),

    textSize: makeFunc(processingProxy, "textSize", [{ "size": [int_$11, float_$10] }]),

    textWidth: makeFunc(processingProxy, "textWidth", [{ "width": str$6 }])
};

var fontmetrics = {
    textAscent: makeFunc(processingProxy, "textAscent"),
    textDescent: makeFunc(processingProxy, "textDescent")
};

var _Sk$builtin$13 = Sk.builtin;
var func$2 = _Sk$builtin$13.func;
var float_$11 = _Sk$builtin$13.float_;
var list$1 = _Sk$builtin$13.list;
var str$7 = _Sk$builtin$13.str;
var bool = _Sk$builtin$13.bool;
var int_$12 = _Sk$builtin$13.int_;
var _Sk$misceval$2 = Sk.misceval;
var buildClass$2 = _Sk$misceval$2.buildClass;
var callsim$2 = _Sk$misceval$2.callsim;
var loadname = _Sk$misceval$2.loadname;


function createFontFunction(name, size, smooth, charset) {
    var font = processingProxy.createFont(name, size, smooth, charset);
    var pfont = callsim$2(exports.PFont);
    pfont.v = font;
    return pfont;
}

function fontClass($gbl, $loc) {
    $loc.__init__ = makeFunc(function (self, input) {
        if (input) {
            self.v = new processingProxy.PFont(input);
        }
    }, "__init__", [self$1, { "input ": str$7, optional: optional }]);

    var staticmethod = loadname("staticmethod", $gbl);
    var list_func = new func$2(function () {
        return new list$1(processingProxy.PFont.list());
    });
    $loc.list = callsim$2(staticmethod, list_func);
}

var PFontBuilder = function PFontBuilder(mod) {
    return buildClass$2(mod, fontClass, "PFont", []);
};

var createFont = makeFunc(createFontFunction, "createFont", [{ "name": str$7 }, { "size": [int_$12, float_$11] }, { "smooth": bool, optional: optional }, { "charset": str$7, optional: optional }]);

var loadFont = makeFunc(processingProxy, "loadFont", [{ "fontname": str$7 }]);

var text = makeFunc(processingProxy, "text", [{ "data": [str$7, int_$12, float_$11] }, { "x": [int_$12, float_$11] }, { "y": [int_$12, float_$11] }, { "z": [int_$12, float_$11], optional: optional }, { "height": [int_$12, float_$11], optional: optional }, { "z": [int_$12, float_$11], optional: optional }]);

var textFont = makeFunc(processingProxy, "textFont", [{ "font": "PFont" }, { "size": [int_$12, float_$11], optional: optional }]);

var P2D = constants.P2D;
var JAVA2D = constants.JAVA2D;
var WEBGL = constants.WEBGL;
var P3D = constants.P3D;
var OPENGL = constants.OPENGL;
var PDF = constants.PDF;
var DXF = constants.DXF;
var _Sk$builtin$14 = Sk.builtin;
var int_$13 = _Sk$builtin$14.int_;
var func$3 = _Sk$builtin$14.func;
var _Sk$misceval$3 = Sk.misceval;
var buildClass$3 = _Sk$misceval$3.buildClass;
var callsim$3 = _Sk$misceval$3.callsim;
var _Sk$ffi$2 = Sk.ffi;
var remapToPy$3 = _Sk$ffi$2.remapToPy;
var remapToJs$2 = _Sk$ffi$2.remapToJs;


function graphicsInit(self, width, height, renderer) {
    self.v = processingProxy.createGraphics(width, height, renderer);
    if (renderer === undefined || renderer === P2D || renderer === JAVA2D) {
        // monkey patching image to make sure toImageData returns something.
        // 2017 Chrome 64 doesn't always return something the first call.
        // this is a VERY HACKY way to deal with that synchronously.
        self.v.toImageData = function (x, y, w, h) {
            x = x !== undefined ? x : 0;
            y = y !== undefined ? y : 0;
            w = w !== undefined ? w : processingProxy.width;
            h = h !== undefined ? h : processingProxy.height;
            var res = undefined;
            while (res === undefined) {
                res = self.v.externals.context.getImageData(x, y, w, h);
            }
            return res;
        };
    }
}

function graphicsClass($gbl, $loc) {
    $loc.__init__ = makeFunc(graphicsInit, "__init__", [self$1, { "width": int_$13 }, { "height": int_$13 }, { "renderer": int_$13, allowed: [P2D, JAVA2D, WEBGL, P3D, OPENGL, PDF, DXF], optional: optional }]);

    $loc.beginDraw = new func$3(function (self) {
        self.v.beginDraw();
    });

    $loc.endDraw = new func$3(function (self) {
        self.v.endDraw();
    });

    $loc.__getattr__ = new func$3(function (self, key) {
        var prop = self.v[remapToJs$2(key)];
        if (prop !== undefined) {
            if (typeof prop === "function") {
                return new func$3(function (self) {
                    var args = Array.from(arguments).map(remapToJs$2);
                    return remapToPy$3(prop.apply(self.v, args));
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
    return callsim$3(exports.PGraphics, width, height, renderer);
});

var hint = new func$3(function (item) {
    // hint(item)
    processingProxy.hint(item);
});

var _Sk$builtin$15 = Sk.builtin;
var func$4 = _Sk$builtin$15.func;
var int_$14 = _Sk$builtin$15.int_;
var list$2 = _Sk$builtin$15.list;
var str$8 = _Sk$builtin$15.str;
var float_$12 = _Sk$builtin$15.float_;
var lng$3 = _Sk$builtin$15.lng;
var IOError = _Sk$builtin$15.IOError;
var sattr = Sk.abstr.sattr;
var _Sk$misceval$4 = Sk.misceval;
var buildClass$4 = _Sk$misceval$4.buildClass;
var callsim$4 = _Sk$misceval$4.callsim;
var Suspension = _Sk$misceval$4.Suspension;
var _Sk$ffi$3 = Sk.ffi;
var remapToJs$3 = _Sk$ffi$3.remapToJs;
var remapToPy$4 = _Sk$ffi$3.remapToPy;
var BLEND$1 = remappedConstants.BLEND;
var ADD$1 = remappedConstants.ADD;
var SUBTRACT$1 = remappedConstants.SUBTRACT;
var LIGHTEST$1 = remappedConstants.LIGHTEST;
var DARKEST$1 = remappedConstants.DARKEST;
var DIFFERENCE$1 = remappedConstants.DIFFERENCE;
var EXCLUSION = remappedConstants.EXCLUSION;
var MULTIPLY$1 = remappedConstants.MULTIPLY;
var SCREEN$2 = remappedConstants.SCREEN;
var OVERLAY$1 = remappedConstants.OVERLAY;
var HARD = remappedConstants.HARD;
var LIGHT = remappedConstants.LIGHT;
var SOFT_LIGHT$1 = remappedConstants.SOFT_LIGHT;
var DODGE$1 = remappedConstants.DODGE;
var BURN$1 = remappedConstants.BURN;
var THRESHOLD = remappedConstants.THRESHOLD;
var GRAY = remappedConstants.GRAY;
var INVERT = remappedConstants.INVERT;
var POSTERIZE = remappedConstants.POSTERIZE;
var BLUR = remappedConstants.BLUR;
var OPAQUE = remappedConstants.OPAQUE;
var ERODE = remappedConstants.ERODE;
var DILATE = remappedConstants.DILATE;
var CORNER$1 = remappedConstants.CORNER;
var CORNERS$1 = remappedConstants.CORNERS;
var CENTER$2 = remappedConstants.CENTER;
var RGB$1 = remappedConstants.RGB;
var ARGB = remappedConstants.ARGB;
var ALPHA = remappedConstants.ALPHA;


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
            var image = callsim$4(exports.PImage);
            var i = processingProxy.loadImage(imageUrl, {}, function () {
                image.v = i;
                resolve(image);
            });
        })]).then(function (image) {
            if (!image) {
                throw new IOError("[Errno 2] No such file or directory: '" + img + "'");
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

function imageInit(self, arg1, arg2, arg3) {
    self.v = new processingProxy.PImage(arg1, arg2, arg3);
    sattr(self, "pixels", callsim$4(PixelProxy, self));
}

function imageGet(self, x, y, width, height) {
    var args = [x, y, width, height].filter(function (a) {
        return a !== undefined;
    });
    if (args.length == 2) {
        return self.v.get.apply(self.v, args);
    }

    var image = callsim$4(exports.PImage);
    image.v = self.v.get.apply(self.v, args);
    sattr(image, "pixels", callsim$4(PixelProxy, image));
    return image;
}

function imageSet(self, x, y, color) {
    self.v.set(x, y, color);
}

function imageCopy(self, srcImg, sx, sy, swidth, sheight, dx, dy, dwidth, dheight) {
    return self.v.copy(srcImg, sx, sy, swidth, sheight, dx, dy, dwidth, dheight);
}

function imageMask(self, maskImg) {
    self.v.mask(maskImg);
}

function imageBlend(self, srcImg, x, y, width, height, dx, dy, dwidth, dheight) {
    self.v.blend(srcImg, x, y, width, height, dx, dy, dwidth, dheight);
}

function imageFilter(self, MODE, srcImg) {
    self.v.filter(MODE, srcImg);
}

function imageSave(self, filename) {
    self.v.save(filename);
}

function imageResize(self, wide, high) {
    self.v.save(wide, high);
}

function imageLoadPixels(self) {
    self.v.loadPixels();
}

function imageUpdatePixels(self, x, y, w, h) {
    self.v.updatePixels(x, y, w, h);
}

function pixelProxy($glb, $loc) {
    $loc.__init__ = makeFunc(function (self, image) {
        self.image = image;
    }, "__init__", [self$1, { "image": "PImage", optional: optional }]);

    $loc.__getitem__ = makeFunc(function (self, index) {
        return self.image.pixels[index];
    }, "__getitem__", [self$1, { "index": int_$14 }]);

    $loc.__setitem__ = makeFunc(function (self, index, color) {
        return self.image.pixels[index] = color;
    }, "__setitem__", [self$1, { "index": int_$14 }, { "color": [int_$14, lng$3, float_$12, str$8], converter: strToColor }]);

    $loc.__len__ = makeFunc(function (self) {
        return self.image.width * self.image.height;
    }, "__len__", [self$1]);
}

function imageClass($gbl, $loc) {
    $loc.__init__ = makeFunc(imageInit, "__init__", [self$1, { "width": [int_$14, str$8], optional: optional }, { "height": int_$14, optional: optional }, { "format": int_$14, allowed: [1, 2, 4], optional: optional }]);

    $loc.__getattr__ = new func$4(function (self, key) {
        key = remapToJs$3(key);
        if (key === "width") {
            return remapToPy$4(self.v.width);
        }
        if (key === "height") {
            return remapToPy$4(self.v.height);
        }
    });

    $loc.get = makeFunc(imageGet, "get", [self$1, { "x": int_$14 }, { "y": int_$14 }, { "width": int_$14, optional: optional }, { "height": int_$14, optional: optional }]);

    $loc.set = makeFunc(imageSet, "set", [self$1, { "x": int_$14 }, { "y": int_$14 }, { "color": [int_$14, lng$3, float_$12, str$8], converter: strToColor }]);

    $loc.copy = makeFunc(imageCopy, "copy", [self$1, { "srcImg": [int_$14, "PImage"] }, { "sx": int_$14 }, { "sy": int_$14 }, { "swidth": int_$14 }, { "sheight": int_$14 }, { "dx": int_$14 }, { "dy": int_$14 }, { "dwidth": int_$14 }, { "dheight": int_$14, optional: optional }]);

    $loc.mask = makeFunc(imageMask, "mask", [self$1, { "maskImg": ["PImage", list$2] }]);

    $loc.blend = makeFunc(imageBlend, "blend", [self$1, { "srcImg": [int_$14, "PImage"] }, { "x": int_$14 }, { "y": int_$14 }, { "width": int_$14 }, { "height": int_$14 }, { "dx": int_$14 }, { "dy": int_$14 }, { "dwidth": int_$14 }, { "dheight": int_$14 }, { "MODE": int_$14, optional: optional, allowed: [BLEND$1, ADD$1, SUBTRACT$1, LIGHTEST$1, DARKEST$1, DIFFERENCE$1, EXCLUSION, MULTIPLY$1, SCREEN$2, OVERLAY$1, HARD, LIGHT, SOFT_LIGHT$1, DODGE$1, BURN$1] }]);

    $loc.filter = makeFunc(imageFilter, "filter", [self$1, { "MODE": int_$14, allowed: [THRESHOLD, GRAY, INVERT, POSTERIZE, BLUR, OPAQUE, ERODE, DILATE] }, { "srcImg": "PImage", optional: optional }]);

    $loc.save = makeFunc(imageSave, "save", [self$1, { "filename": str$8 }]);

    $loc.resize = makeFunc(imageResize, "resize", [self$1, { "wide": int_$14 }, { "high": int_$14 }]);

    $loc.loadPixels = makeFunc(imageLoadPixels, "loadPixels");

    $loc.updatePixels = makeFunc(imageUpdatePixels, "updatePixels", [self$1, { "x": int_$14, optional: optional }, { "y": int_$14, optional: optional }, { "w": int_$14, optional: optional }, { "h": int_$14, optional: optional }]);
}

var PImageBuilder = function PImageBuilder(mod) {
    PixelProxy = buildClass$4(mod, pixelProxy, "ImageProxy", []);
    return buildClass$4(mod, imageClass, "PImage", []);
};

var createImage = makeFunc(function (width, height, format) {
    var image = Sk.misceval.callsim(exports.PImage);
    image.v = processingProxy.createImage(width, height, format);
    sattr(image, "pixels", callsim$4(PixelProxy, image));
    return image;
}, "createFunc", [{ "width": int_$14 }, { "height": int_$14 }, { "format": int_$14, allowed: [RGB$1, ARGB, ALPHA] }]);

var image = makeFunc(processingProxy, "image", [{ "img": ["PImage", "PGraphics"] }, { "x": [int_$14, float_$12] }, { "y": [int_$14, float_$12] }, { "width": [int_$14, float_$12], optional: optional }, { "height": [int_$14, float_$12], optional: optional }]);

var imageMode = makeFunc(processingProxy, "imageMode", [{ "mode": int_$14, allowed: [CORNER$1, CORNERS$1, CENTER$2] }]);

var loadImage = makeFunc(imageLoadImage, "loadImage", [{ "image": str$8 }]);

var noTint = makeFunc(processingProxy, "noTint");

var requestImage = makeFunc(imageRequestImage, "requestImage", [{ "filename": str$8 }, { "extension": str$8, optional: optional }]);

var tint = makeFunc(processingProxy, "tint", [{ "value1": [int_$14, lng$3, float_$12, str$8], converter: strToColor }, { "value2": [int_$14, float_$12], optional: optional }, { "value3": [int_$14, float_$12], optional: optional }, { "alpha": [int_$14, float_$12], optional: optional }]);

var blend = makeFunc(processingProxy, "blend", [{ "srcImg": [int_$14, "PImage"] }, { "x": int_$14 }, { "y": int_$14 }, { "width": int_$14 }, { "height": int_$14 }, { "dx": int_$14 }, { "dy": int_$14 }, { "dwidth": int_$14 }, { "dheight": int_$14 }, { "MODE": int_$14, optional: optional, allowed: [BLEND$1, ADD$1, SUBTRACT$1, LIGHTEST$1, DARKEST$1, DIFFERENCE$1, EXCLUSION, MULTIPLY$1, SCREEN$2, OVERLAY$1, HARD, LIGHT, SOFT_LIGHT$1, DODGE$1, BURN$1] }]);

var copy = makeFunc(processingProxy, "copy", [{ "srcImg": [int_$14, "PImage"] }, { "sx": int_$14 }, { "sy": int_$14 }, { "swidth": int_$14 }, { "sheight": int_$14 }, { "dx": int_$14 }, { "dy": int_$14 }, { "dwidth": int_$14 }, { "dheight": int_$14, optional: optional }]);

var filter = makeFunc(processingProxy, "filter", [{ "MODE": int_$14, allowed: [THRESHOLD, GRAY, INVERT, POSTERIZE, BLUR, OPAQUE, ERODE, DILATE] }, { "srcImg": "PImage", optional: optional }]);

var get$1 = makeFunc(processingProxy, "get", [{ "x": int_$14, optional: optional }, { "y": int_$14, optional: optional }, { "width": int_$14, optional: optional }, { "height": int_$14, optional: optional }]);

var loadPixels = makeFunc(processingProxy, "loadPixels");

var set$1 = makeFunc(processingProxy, "set", [{ "x": int_$14 }, { "y": int_$14 }, { "image": ["PImage", int_$14, lng$3, float_$12, str$8], converter: strToColor }]);

var updatePixels = makeFunc(processingProxy, "updatePixels");

function pixels() {
    var pp = callsim$4(PixelProxy);
    pp.image = {
        pixels: processingProxy.pixels
    };
    return pp;
}

var _Sk$ffi$4 = Sk.ffi;
var remapToPy$5 = _Sk$ffi$4.remapToPy;
var remapToJs$4 = _Sk$ffi$4.remapToJs;
var func$5 = Sk.builtin.func;
var buildClass$5 = Sk.misceval.buildClass;


function keyboardClass($gbl, $loc) {
    $loc.__getattr__ = new func$5(function (self, key) {
        key = remapToJs$4(key);
        if (key === "key") {
            return remapToPy$5(processingProxy.key.toString());
        } else if (key === "keyCode") {
            return remapToPy$5(processingProxy.keyCode);
        } else if (key === "keyPressed") {
            return remapToPy$5(processingProxy.__keyPressed);
        }
    });
}

var KeyboardBuilder = function KeyboardBuilder(mod) {
    return buildClass$5(mod, keyboardClass, "Keyboard", []);
};

var key = function key() {
    return remapToPy$5(processingProxy.key.toString());
};
var keyCode = function keyCode() {
    return remapToPy$5(processingProxy.keyCode);
};
var keyPressed = function keyPressed() {
    return remapToPy$5(processingProxy.__keyPressed);
};

var _Sk$builtin$16 = Sk.builtin;
var int_$15 = _Sk$builtin$16.int_;
var float_$13 = _Sk$builtin$16.float_;


var lights = {
    ambientLight: makeFunc(processingProxy, "ambientLight", [{ "v1": [int_$15, float_$13] }, { "v2": [int_$15, float_$13] }, { "v3": [int_$15, float_$13] }, { "x": [int_$15, float_$13], optional: optional }, { "y": [int_$15, float_$13], optional: optional }, { "z": [int_$15, float_$13], optional: optional }]),

    directionalLight: makeFunc(processingProxy, "directionalLight", [{ "v1": [int_$15, float_$13] }, { "v2": [int_$15, float_$13] }, { "v3": [int_$15, float_$13] }, { "nx": [int_$15, float_$13], optional: optional }, { "ny": [int_$15, float_$13], optional: optional }, { "nz": [int_$15, float_$13], optional: optional }]),

    lightFalloff: makeFunc(processingProxy, "lightFalloff", [{ "constant": [int_$15, float_$13] }, { "linear": [int_$15, float_$13] }, { "quardatic": [int_$15, float_$13] }]),

    lightSpecular: makeFunc(processingProxy, "lightSpecular", [{ "v1": [int_$15, float_$13] }, { "v2": [int_$15, float_$13] }, { "v3": [int_$15, float_$13] }]),

    lights: makeFunc(processingProxy, "lights"),

    noLights: makeFunc(processingProxy, "noLights"),

    normal: makeFunc(processingProxy, "normal", [{ "nx": [int_$15, float_$13] }, { "ny": [int_$15, float_$13] }, { "nz": [int_$15, float_$13] }]),

    pointLight: makeFunc(processingProxy, "pointLight", [{ "v1": [int_$15, float_$13] }, { "v2": [int_$15, float_$13] }, { "v3": [int_$15, float_$13] }, { "nx": [int_$15, float_$13] }, { "ny": [int_$15, float_$13] }, { "nz": [int_$15, float_$13] }]),

    spotLight: makeFunc(processingProxy, "spotLight", [{ "v1": [int_$15, float_$13] }, { "v2": [int_$15, float_$13] }, { "v3": [int_$15, float_$13] }, { "x": [int_$15, float_$13] }, { "y": [int_$15, float_$13] }, { "z": [int_$15, float_$13] }, { "nx": [int_$15, float_$13] }, { "ny": [int_$15, float_$13] }, { "nz": [int_$15, float_$13] }, { "angle": [int_$15, float_$13] }, { "concentration": [int_$15, float_$13] }])
};

var _Sk$builtin$17 = Sk.builtin;
var int_$16 = _Sk$builtin$17.int_;
var float_$14 = _Sk$builtin$17.float_;
var str$9 = _Sk$builtin$17.str;
var lng$4 = _Sk$builtin$17.lng;


var materialproperties = {
    ambient: makeFunc(processingProxy, "ambient", [{ "gray": [int_$16, lng$4, float_$14, str$9], converter: strToColor }, { "v1": [int_$16, float_$14], optional: optional }, { "v2": [int_$16, float_$14], optional: optional }, { "v3": [int_$16, float_$14], optional: optional }]),

    emissive: makeFunc(processingProxy, "emissive", [{ "gray": [int_$16, lng$4, float_$14, str$9], converter: strToColor }, { "v1": [int_$16, float_$14], optional: optional }, { "v2": [int_$16, float_$14], optional: optional }, { "v3": [int_$16, float_$14], optional: optional }]),

    shininess: makeFunc(processingProxy, "shininess", [{ "shine": [int_$16, float_$14] }]),

    specular: makeFunc(processingProxy, "specular", [{ "gray": [int_$16, lng$4, float_$14, str$9], converter: strToColor }, { "v1": [int_$16, float_$14], optional: optional }, { "v2": [int_$16, float_$14], optional: optional }, { "v3": [int_$16, float_$14], optional: optional }])
};

var _Sk$ffi$5 = Sk.ffi;
var remapToPy$6 = _Sk$ffi$5.remapToPy;
var remapToJs$5 = _Sk$ffi$5.remapToJs;
var func$6 = Sk.builtin.func;
var buildClass$6 = Sk.misceval.buildClass;


function mouseClass($gbl, $loc) {
    $loc.__getattr__ = new func$6(function (self, key) {
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

var _Sk$builtin$18 = Sk.builtin;
var object$1 = _Sk$builtin$18.object;
var str$10 = _Sk$builtin$18.str;
var list$3 = _Sk$builtin$18.list;
var print_ = Sk.misceval.print_;


var output = {
    println: makeFunc(function (o) {
        print_(o);
        print_("\n");
    }, "println", [{ "data": object$1 }]),

    save: makeFunc(processingProxy, "save", [{ "filename": str$10 }]),

    saveFrame: makeFunc(processingProxy, "saveFrame", [{ "filename": str$10 }, { "ext": str$10, allowed: ["tif", "tga", "jpg", "png"] }]),

    saveStrings: makeFunc(processingProxy, "saveStrings", [{ "filename": str$10 }, { "strings": list$3 }]),

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

var _Sk$builtin$19 = Sk.builtin;
var float_$15 = _Sk$builtin$19.float_;
var int_$17 = _Sk$builtin$19.int_;


var random = {
    noise: makeFunc(processingProxy, "noise", [{ "x": [int_$17, float_$15] }, { "y": [int_$17, float_$15], optional: optional }, { "z": [int_$17, float_$15], optional: optional }]),

    noiseDetail: makeFunc(processingProxy, "noiseDetail", [{ "octave": int_$17 }, { "falloff": [int_$17, float_$15], optional: optional }]),

    noiseSeed: makeFunc(processingProxy, "noiseSeed", [{ "value": int_$17 }]),

    randomSeed: makeFunc(processingProxy, "randomSeed", [{ "value": int_$17 }]),

    random: makeFunc(processingProxy, "random", [{ low: [int_$17, float_$15] }, { high: [int_$17, float_$15], optional: optional }]),

    randomGaussian: makeFunc(processingProxy, "randomGaussian")
};

var _Sk$ffi$6 = Sk.ffi;
var remapToJs$6 = _Sk$ffi$6.remapToJs;
var remapToPy$7 = _Sk$ffi$6.remapToPy;
var buildClass$7 = Sk.misceval.buildClass;
var _Sk$builtin$20 = Sk.builtin;
var list$4 = _Sk$builtin$20.list;
var func$7 = _Sk$builtin$20.func;


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

var CORNER$2 = remappedConstants.CORNER;
var CORNERS$2 = remappedConstants.CORNERS;
var CENTER$3 = remappedConstants.CENTER;
var _Sk$builtin$21 = Sk.builtin;
var str$11 = _Sk$builtin$21.str;
var int_$18 = _Sk$builtin$21.int_;
var float_$16 = _Sk$builtin$21.float_;
var bool$1 = _Sk$builtin$21.bool;
var _Sk$ffi$7 = Sk.ffi;
var remapToJs$7 = _Sk$ffi$7.remapToJs;
var remapToPy$8 = _Sk$ffi$7.remapToPy;
var buildClass$8 = Sk.misceval.buildClass;


function shapeIsVisible(self) {
    return self.v.isVisible();
}

function shapeSetVisible(self, value) {
    self.v.setVisible(value);
}

function shapeDisableStyle(self) {
    self.v.disableStyle();
}

function shapeEnableStyle(self) {
    self.v.enableStyle();
}

function shapeGetChild(self, shape) {
    // getChild() Returns a child element of a shape as a PShapeSVG object
    var child = self.v.getChild(shape);
    if (child != null) {
        // special method for Skulpt:
        var new_shape = Sk.misceval.callsim(exports.PShape);
        // Now fill in value:
        new_shape.v = child;
        return new_shape;
    } else {
        return null;
    }
}

function shapeTranslate(self, x, y, z) {
    self.v.translate(x.v, y.v, z.v);
}

function shapeRotate(self, angle) {
    self.v.rotate(angle);
}

function shapeRotateX(self, angle) {
    self.v.rotateX(angle);
}

function shapeRotateY(self, angle) {
    self.v.rotateY(angle);
}

function shapeRotateZ(self, angle) {
    self.v.rotateZ(angle);
}

function shapeScale(self, x, y, z) {
    self.v.scale(x, y, z);
}

function shapeClass($gbl, $loc) {
    $loc.__getattr__ = new Sk.builtin.func(function (self, key) {
        key = remapToJs$7(key);
        switch (key) {
            case "width":
                return remapToPy$8(self.v.width);
            case "height":
                return remapToPy$8(self.v.height);
        }
    });

    $loc.isVisible = makeFunc(shapeIsVisible, "isVisible", [self$1]);

    $loc.setVisible = makeFunc(shapeSetVisible, "setVisible"[(self$1, { "value": bool$1 })]);

    $loc.disableStyle = makeFunc(shapeDisableStyle, "disableStyle", [self$1]);

    $loc.enableStyle = makeFunc(shapeEnableStyle, "enableStyle", [self$1]);

    $loc.getChild = makeFunc(shapeGetChild, "getChild", [self$1, { "shape": exports.PShape }]);

    $loc.translate = makeFunc(shapeTranslate, "translate", [self$1, { "x": [int_$18, float_$16] }, { "y": [int_$18, float_$16] }, { "z": [int_$18, float_$16], optional: optional }]);

    $loc.rotate = makeFunc(shapeRotate, "rotate", [self$1, { "angle": [int_$18, float_$16] }]);

    $loc.rotateX = makeFunc(shapeRotateX, "rotateX", [self$1, { "angle": [int_$18, float_$16] }]);

    $loc.rotateY = makeFunc(shapeRotateY, "rotateY", [self$1, { "angle": [int_$18, float_$16] }]);

    $loc.rotateZ = makeFunc(shapeRotateZ, "rotateZ", [self$1, { "angle": [int_$18, float_$16] }]);

    $loc.scale = makeFunc(shapeScale, "scale"[(self$1, { "x": [int_$18, float_$16] }, { "y": [int_$18, float_$16], optional: optional }, { "z": [int_$18, float_$16], optional: optional })]);
}

var PShapeBuilder = function PShapeBuilder(mod) {
    return buildClass$8(mod, shapeClass, "PShape", []);
};

var shape = {
    loadShape: makeFunc(processingProxy, "loadShape", [{ "filename": str$11 }]),

    shape: makeFunc(processingProxy, "shape", [{ "sh": "PShape" }, { "x": [int_$18, float_$16] }, { "y": [int_$18, float_$16] }, { "width": [int_$18, float_$16], optional: optional }, { "height": [int_$18, float_$16], optional: optional }]),

    shapeMode: makeFunc(processingProxy, "shapeMode", [{ "img": int_$18, allowed: [CORNER$2, CORNERS$2, CENTER$3] }])
};

var _Sk$builtin$22 = Sk.builtin;
var int_$19 = _Sk$builtin$22.int_;
var float_$17 = _Sk$builtin$22.float_;
var str$12 = _Sk$builtin$22.str;
var list$5 = _Sk$builtin$22.list;


var stringFunctions = {
    join: makeFunc(processingProxy, "join", [{ "stringArray": list$5 }, { "separator": str$12 }]),

    match: makeFunc(processingProxy, "match", [{ "str": str$12 }, { "regexp": str$12 }]),

    matchAll: makeFunc(processingProxy, "matchAll", [{ "str": str$12 }, { "regexp": str$12 }]),

    nf: makeFunc(processingProxy, "nf", [{ "value": [int_$19, float_$17, list$5] }, { "digits": int_$19 }, { "right": int_$19, optional: optional }]),

    nfc: makeFunc(processingProxy, "nfc", [{ "value": [int_$19, float_$17, list$5] }, { "right": int_$19, optional: optional }]),

    nfp: makeFunc(processingProxy, "nfp", [{ "value": [int_$19, float_$17, list$5] }, { "digits": int_$19 }, { "right": int_$19, optional: optional }]),

    nfs: makeFunc(processingProxy, "nfs", [{ "value": [int_$19, float_$17, list$5] }, { "digits": int_$19 }, { "right": int_$19, optional: optional }]),

    split: makeFunc(processingProxy, "split", [{ "string": str$12 }, { "delimiter": str$12 }]),

    splitTokens: makeFunc(processingProxy, "splitTokens", [{ "string": str$12 }, { "delimiter": str$12, optional: optional }]),

    trim: makeFunc(processingProxy, "trim", [{ "strOrArray": [str$12, list$5] }])
};

var _Sk$builtin$23 = Sk.builtin;
var int_$20 = _Sk$builtin$23.int_;
var object$2 = _Sk$builtin$23.object;
var P2D$1 = remappedConstants.P2D;
var JAVA2D$1 = remappedConstants.JAVA2D;
var WEBGL$1 = remappedConstants.WEBGL;
var P3D$1 = remappedConstants.P3D;
var OPENGL$1 = remappedConstants.OPENGL;
var PDF$1 = remappedConstants.PDF;
var DXF$1 = remappedConstants.DXF;


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

    requestNoLoop();
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

    size: makeFunc(size, "size", [{ "width": int_$20 }, { "height": int_$20 }, { "renderer": int_$20, allowed: [P2D$1, JAVA2D$1, WEBGL$1, P3D$1, OPENGL$1, PDF$1, DXF$1], optional: optional }]),

    exit: makeFunc(processingProxy, "exit"),

    redraw: makeFunc(processingProxy, "redraw"),

    pushStyle: cachedLazy(constructOptionalContectManager, [{
        __call__: makeFunc(function (self) {
            processingProxy.pushStyle();
            return self;
        }, "__call__", [self$1]),
        __enter__: makeFunc(function (self) {
            return self;
        }, "__enter__", [self$1]),
        __exit__: makeFunc(function () {
            return processingProxy.popStyle();
        }, "__exit__", [self$1, { "exc_type": object$2, ignored: ignored }, { "exc_value": object$2, ignored: ignored }, { "traceback": object$2, ignored: ignored }])
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

var _Sk$builtin$24 = Sk.builtin;
var float_$18 = _Sk$builtin$24.float_;
var int_$21 = _Sk$builtin$24.int_;
var object$3 = _Sk$builtin$24.object;


var transform = {
    applyMatrix: makeFunc(processingProxy, "applyMatrix", [{ "n00": [int_$21, float_$18] }, { "n01": [int_$21, float_$18] }, { "n02": [int_$21, float_$18] }, { "n03": [int_$21, float_$18] }, { "n04": [int_$21, float_$18] }, { "n05": [int_$21, float_$18] }, { "n06": [int_$21, float_$18] }, { "n07": [int_$21, float_$18] }, { "n08": [int_$21, float_$18] }, { "n09": [int_$21, float_$18] }, { "n10": [int_$21, float_$18] }, { "n11": [int_$21, float_$18] }, { "n12": [int_$21, float_$18] }, { "n13": [int_$21, float_$18] }, { "n14": [int_$21, float_$18] }, { "n15": [int_$21, float_$18] }]),

    popMatrix: makeFunc(processingProxy, "popMatrix"),
    printMatrix: makeFunc(processingProxy, "printMatrix"),

    pushMatrix: cachedLazy(constructOptionalContectManager, [{
        __call__: makeFunc(function (self) {
            processingProxy.pushMatrix();
            return self;
        }, "__call__", [self$1]),
        __enter__: makeFunc(function (self) {
            return self;
        }, "__enter__", [self$1]),
        __exit__: makeFunc(function () {
            return processingProxy.popMatrix();
        }, "__exit__", [self$1, { "exc_type": object$3, ignored: ignored }, { "exc_value": object$3, ignored: ignored }, { "traceback": object$3, ignored: ignored }])
    }, "pushMatrix"], "pushMatrix"),

    resetMatrix: makeFunc(processingProxy, "resetMatrix"),

    rotate: makeFunc(processingProxy, "rotate", [{ "angle": [int_$21, float_$18] }]),

    rotateX: makeFunc(processingProxy, "rotateX", [{ "angle": [int_$21, float_$18] }]),

    rotateY: makeFunc(processingProxy, "rotateY", [{ "angle": [int_$21, float_$18] }]),

    rotateZ: makeFunc(processingProxy, "rotateZ", [{ "angle": [int_$21, float_$18] }]),

    scale: makeFunc(processingProxy, "scale", [{ "size": [int_$21, float_$18] }, { "y": [int_$21, float_$18], optional: optional }, { "z": [int_$21, float_$18], optional: optional }]),

    translate: makeFunc(processingProxy, "translate", [{ "x": [int_$21, float_$18] }, { "y": [int_$21, float_$18] }, { "z": [int_$21, float_$18], optional: optional }])
};

var _Sk$builtin$25 = Sk.builtin;
var int_$22 = _Sk$builtin$25.int_;
var float_$19 = _Sk$builtin$25.float_;


var trigonometry = {
    degrees: makeFunc(processingProxy, "degrees", [{ "angle": [int_$22, float_$19] }]),

    radians: makeFunc(processingProxy, "radians", [{ "angle": [int_$22, float_$19] }]),

    cos: makeFunc(processingProxy, "cos", [{ "angle": [int_$22, float_$19] }]),

    sin: makeFunc(processingProxy, "sin", [{ "angle": [int_$22, float_$19] }]),

    tan: makeFunc(processingProxy, "tan", [{ "angle": [int_$22, float_$19] }]),

    acos: makeFunc(processingProxy, "acos", [{ "value": [int_$22, float_$19] }]),

    asin: makeFunc(processingProxy, "asin", [{ "value": [int_$22, float_$19] }]),

    atan: makeFunc(processingProxy, "tan", [{ "angle": [int_$22, float_$19] }]),

    atan2: makeFunc(processingProxy, "atan2", [{ "x": [int_$22, float_$19] }, { "y": [int_$22, float_$19] }])
};

var _Sk$builtin$26 = Sk.builtin;
var int_$23 = _Sk$builtin$26.int_;
var float_$20 = _Sk$builtin$26.float_;
var _Sk$misceval$5 = Sk.misceval;
var callsim$5 = _Sk$misceval$5.callsim;
var buildClass$9 = _Sk$misceval$5.buildClass;
var remapToPy$9 = Sk.ffi.remapToPy;


function vectorInit(self, x, y, z) {
    self.v = new processing.PVector(x, y, z);
}

function vectorSet(self, x, y, z) {
    self.v.set(x, y, z);
}

function vectorGet(self) {
    var vector = callsim$5(exports.PVector);
    vector.v = self.v.get();
    return vector;
}

function vectorAdd(self, vec) {
    var new_vec = callsim$5(exports.PVector);
    new_vec.v = self.v.add(vec);
    return new_vec;
}

function vectorSub(self, vec) {
    var new_vec = callsim$5(exports.PVector);
    new_vec.v = self.v.sub(vec);
    return new_vec;
}

function vectorMult(self, vec) {
    var new_vec = callsim$5(exports.PVector);
    new_vec.v = self.v.mult(vec);
    return new_vec;
}

function vectorDiv(self, vec) {
    var new_vec = callsim$5(exports.PVector);
    new_vec.v = self.v.div(vec);
    return new_vec;
}

function vectorDot(self, vec) {
    var new_vec = callsim$5(exports.PVector);
    new_vec.v = self.v.dot(vec);
    return new_vec;
}

function vectorCross(self, vec) {
    var new_vec = callsim$5(exports.PVector);
    new_vec.v = self.v.cross(vec);
    return new_vec;
}

function vectorDist(self, vec) {
    var new_vec = callsim$5(exports.PVector);
    new_vec.v = self.v.dist(vec);
    return new_vec;
}

function vectorAngleBetween(self, vec) {
    var new_vec = callsim$5(exports.PVector);
    new_vec.v = self.v.angleBetween(vec);
    return new_vec;
}

function vectorLimit(self, value) {
    self.v.limit(value);
}

function vectorClass($gbl, $loc) {
    $loc.__init__ = makeFunc(vectorInit, "__init__", [self$1, { "x": int_$23, optional: optional }, { "y": int_$23, optional: optional }, { "z": int_$23, optional: optional }]);

    $loc.__getattr__ = new Sk.builtin.func(function (self, key) {
        key = Sk.ffi.remapToJs(key);
        if (key === "x") {
            return remapToPy$9(self.v.x);
        } else if (key === "y") {
            return remapToPy$9(self.v.y);
        } else if (key === "z") {
            return Sk.builtin.assk$(self.v.z);
        }
    });

    $loc.get = makeFunc(vectorGet, "get", [self$1]), $loc.set = makeFunc(vectorSet, "set", [self$1, { "x": int_$23 }, { "x": int_$23, optional: optional }, { "x": int_$23, optional: optional }]);

    $loc.mag = makeFunc(function (self) {
        return self.v.mag();
    }, "mag", [self$1]);

    $loc.add = makeFunc(vectorAdd, "add", [self$1, { "vector": "PVector" }]);

    $loc.sub = makeFunc(vectorSub, "sub", [self$1, { "vector": "PVector" }]);

    $loc.mult = makeFunc(vectorMult, "mult", [self$1, { "vector": "PVector" }]);

    $loc.div = makeFunc(vectorDiv, "div", [self$1, { "vector": "PVector" }]);

    $loc.dist = makeFunc(vectorDist, "dist", [self$1, { "vector": "PVector" }]);

    $loc.dot = makeFunc(vectorDot, "dot", [self$1, { "x": [int_$23, float_$20] }, { "y": [int_$23, float_$20], optional: optional }, { "z": [int_$23, float_$20], optional: optional }]);

    $loc.cross = makeFunc(vectorCross, "cross", [self$1, { "vector": "PVector" }]);

    $loc.normalize = makeFunc(function (self) {
        return self.normalize();
    }, "normalize", [self$1]);

    $loc.limit = makeFunc(vectorLimit, "limit", [self$1, { "value": [int_$23, float_$20] }]);

    $loc.angleBetween = makeFunc(vectorAngleBetween, "angleBetween", [self$1, { "vector": "PVector" }]);

    $loc.array = makeFunc(function (self) {
        return self.v.array();
    }, "array", [self$1]);

    $loc.__repr__ = makeFunc(function (self) {
        return self.v.toString();
    }, "repr", [self$1]);
}

var vectorBuilder = (function (mod) {
    return buildClass$9(mod, vectorClass, "PVector", []);
});

var _Sk$builtin$27 = Sk.builtin;
var float_$21 = _Sk$builtin$27.float_;
var int_$24 = _Sk$builtin$27.int_;
var object$4 = _Sk$builtin$27.object;
var IMAGE = remappedConstants.IMAGE;
var NORMALIZED = remappedConstants.NORMALIZED;
var POINTS = remappedConstants.POINTS;
var LINES = remappedConstants.LINES;
var TRIANGLES = remappedConstants.TRIANGLES;
var TRIANGLE_FAN = remappedConstants.TRIANGLE_FAN;
var TRIANGLE_STRIP = remappedConstants.TRIANGLE_STRIP;
var QUADS = remappedConstants.QUADS;
var QUAD_STRIP = remappedConstants.QUAD_STRIP;
var CLOSE = remappedConstants.CLOSE;


var vertex = {
    beginShape: cachedLazy(constructOptionalContectManager, [{
        __call__: makeFunc(function (self, mode) {
            processingProxy.beginShape(mode);
            return self;
        }, "__call__", [self$1, { "MODE": int_$24, allowed: [POINTS, LINES, TRIANGLES, TRIANGLE_FAN, TRIANGLE_STRIP, QUADS, QUAD_STRIP], optional: optional }]),
        __enter__: makeFunc(function (self) {
            return self;
        }, "__enter__", [self$1]),
        __exit__: makeFunc(function () {
            return processingProxy.endShape;
        }, "__exit__", [self$1, { "exc_type": object$4, ignored: ignored }, { "exc_value": object$4, ignored: ignored }, { "traceback": object$4, ignored: ignored }])
    }, "beginShape"], "beginShape"),

    beginClosedShape: cachedLazy(constructOptionalContectManager, [{
        __call__: makeFunc(function (self, mode) {
            processingProxy.beginShape(mode);
            return self;
        }, "__call__", [self$1, { "MODE": int_$24, allowed: [POINTS, LINES, TRIANGLES, TRIANGLE_FAN, TRIANGLE_STRIP, QUADS, QUAD_STRIP], optional: optional }]),
        __enter__: makeFunc(function (self) {
            return self;
        }, "__enter__"[self$1]),
        __exit__: makeFunc(function () {
            return processingProxy.endShape(constants.CLOSE);
        }, "__exit__", [self$1, { "exc_type": object$4, ignored: ignored }, { "exc_value": object$4, ignored: ignored }, { "traceback": object$4, ignored: ignored }])
    }, "beginClosedShape"], "beginClosedShape"),

    endShape: makeFunc(processingProxy, "endShape", [{ "MODE": int_$24, allowed: [CLOSE], optional: optional }]),

    vertex: makeFunc(processingProxy, "vertex", [{ "x": [int_$24, float_$21] }, { "y": [int_$24, float_$21] }, { "z": [int_$24, float_$21], optional: optional }, { "u": [int_$24, float_$21], optional: optional }, { "v": [int_$24, float_$21], optional: optional }]),

    bezierVertex: makeFunc(processingProxy, "bezierVertex", [{ "cx1": [int_$24, float_$21] }, { "cy1": [int_$24, float_$21] }, { "cz1": [int_$24, float_$21] }, { "cx2": [int_$24, float_$21] }, { "cy2": [int_$24, float_$21] }, { "cz2": [int_$24, float_$21] }, { "x": [int_$24, float_$21], optional: optional }, { "y": [int_$24, float_$21], optional: optional }, { "z": [int_$24, float_$21], optional: optional }]),

    curveVertex: makeFunc(processingProxy, "curveVertex", [{ "x": [int_$24, float_$21] }, { "y": [int_$24, float_$21] }, { "z": [int_$24, float_$21], optional: optional }]),

    texture: makeFunc(processingProxy, "texture", [{ "img": "PImage" }]),

    textureMode: makeFunc(processingProxy, "textureMode", [{ "img": int_$24, allowed: [IMAGE, NORMALIZED] }])
};

var str$13 = Sk.builtin.str;


var web = {
    link: makeFunc(processingProxy, "link"[({ "url": str$13 }, { "target": str$13, optional: optional })]),
    status: makeFunc(processingProxy, "status", [{ "text": str$13 }])
};

var _Sk$misceval = Sk.misceval;
var callsim = _Sk$misceval.callsim;
var asyncToPromise = _Sk$misceval.asyncToPromise;
var callsimOrSuspend = _Sk$misceval.callsimOrSuspend;


var mod = {};

var noLoopAfterAsync = false;

exports.processingInstance = {};

function isInitialised() {
    return processing == null;
}

exports.PImage = void 0;
exports.PShape = void 0;
exports.PGraphics = void 0;
exports.PVector = void 0;
exports.PFont = void 0;

var processing = processingProxy;

var suspHandler = void 0;
var bHandler = void 0;

function init(path, suspensionHandler, breakHandler) {
    suspHandler = suspensionHandler;
    if (breakHandler !== undefined && typeof breakHandler !== "function") {
        throw new Error("breakHandler must be a function if anything");
    } else {
        bHandler = breakHandler;
    }

    Sk.externalLibraries = Sk.externalLibraries || {};

    Object.assign(Sk.externalLibraries, {
        processing: {
            path: path + "/__init__.js"
        }
    });
}

function requestNoLoop() {
    noLoopAfterAsync = true;
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
    var frameRate = callsim(FrameRate);
    var environment = callsim(Environment);

    var Mouse = MouseBuilder(mod);
    var mouse = callsim(Mouse);
    var Keyboard = KeyboardBuilder(mod);
    var keyboard = callsim(Keyboard);
    var Screen = ScreenBuilder(mod);
    var screen = callsim(Screen);

    initUtils(mod);

    Object.assign(mod, twodprimitives, threedprimitives, attributes, calculation, camera, ccreatingandreading, csetting, { color: color }, remappedConstants, coordinates, curves, { Environment: Environment, environment: environment, cursor: cursor, noCursor: noCursor, height: height, width: width, frameCount: frameCount, frameRate: frameRate, focused: focused }, files, fontattribues, fontmetrics, { PFont: exports.PFont, createFont: createFont, loadFont: loadFont, text: text, textFont: textFont }, { PGraphics: exports.PGraphics, createGraphics: createGraphics, hint: hint }, { PImage: exports.PImage }, { image: image, createImage: createImage, imageMode: imageMode, loadImage: loadImage,
        noTint: noTint, requestImage: requestImage, tint: tint, blend: blend, copy: copy, filter: filter, get: get$1, loadPixels: loadPixels, set: set$1, updatePixels: updatePixels, pixels: pixels }, { keyboard: keyboard, Keyboard: Keyboard, keyCode: keyCode, key: key, keyPressed: keyPressed }, lights, materialproperties, { Mouse: Mouse, mouse: mouse,
        mouseX: mouseX, mouseY: mouseY, pmouseX: pmouseX, pmouseY: pmouseY, mousePressed: mousePressed, mouseButton: mouseButton }, output, random, { Screen: Screen, screen: screen }, { PShape: exports.PShape }, structure, timeanddate, transform, trigonometry, { PVector: exports.PVector }, vertex, web, shape, stringFunctions);

    mod.run = new Sk.builtin.func(function () {
        noLoopAfterAsync = false;
        var susp = new Sk.misceval.Suspension();
        var exceptionOccurred = null;
        var finish = null;

        susp.resume = function () {
            if (susp.data["error"]) {
                throw susp.data["error"];
            }

            return Sk.builtin.none.none$;
        };

        susp.data = {
            type: "Sk.promise", promise: new Promise(function (resolve, reject) {
                exceptionOccurred = reject;
                finish = resolve;
            })
        };

        function sketchProc(proc) {
            var promisses = [];
            var wait = true;

            function throwAndExit(e) {
                exceptionOccurred(e);
                proc.exit();
            }

            exports.processingInstance = proc;

            proc.externals.sketch.onExit = finish;

            if (Sk.globals["setup"]) {
                promisses.push(asyncToPromise(function () {
                    return callsimOrSuspend(Sk.globals["setup"]);
                }, suspHandler));
            } else {
                promisses.push(Promise.resolve());
            }

            if (Sk.globals["draw"]) {
                proc.draw = function () {
                    if (promisses.length === 0) {
                        return;
                    }

                    // Here we wait till the setup promise is resolved if we have a draw function
                    // or we throw an error
                    Promise.all(promisses).then(function () {
                        return wait = false;
                    }).catch(throwAndExit);

                    // keep calling draw untill all promisses have been resolved
                    if (wait) {
                        return;
                    }

                    // if noLoop was called from python only stop looping after all
                    // async stuff happened.
                    if (noLoopAfterAsync && promisses.length > 1) {
                        proc.noLoop();
                        // Here we wait for the setup function promise and the previous
                        // draw function promise to resolve and throw an error if nessecairy
                        Promise.all(promisses).then(finish).catch(throwAndExit);
                        return;
                    }

                    // call the break handler every draw so the processing.sk is stoppable.
                    if (bHandler) {
                        try {
                            bHandler();
                        } catch (e) {
                            throwAndExit(e);
                        }
                    }

                    promisses.push(asyncToPromise(function () {
                        return callsimOrSuspend(Sk.globals["draw"]);
                    }, suspHandler));
                };
            } else {
                processing.noLoop();
                // If we don't have a draw function we don't have to loop.
                // procesing doesn't know that but we do that's why we call noLoop here.
                // we also wait for the setup function to complete and thow any errors
                Promise.all(promisses).then(finish).catch(throwAndExit);
            }

            var callBacks = ["mouseMoved", "mouseClicked", "mouseDragged", "mouseMoved", "mouseOut", "mouseOver", "mousePressed", "mouseReleased", "keyPressed", "keyReleased", "keyTyped"];

            for (var cb in callBacks) {
                if (Sk.globals[callBacks[cb]]) {
                    (function () {
                        var callback = callBacks[cb];
                        proc[callback] = function () {
                            try {
                                // event handlers can't be asynchronous.
                                Sk.misceval.callsim(Sk.globals[callback]);
                            } catch (e) {
                                throwAndExit(e);
                            }
                        };
                    })();
                }
            }
        }

        var canvas = document.getElementById(Sk.canvas);

        if (canvas.tagName !== "CANVAS") {
            var mydiv = canvas;
            canvas = document.createElement("canvas");
            while (mydiv.firstChild) {
                mydiv.removeChild(mydiv.firstChild);
            }

            mydiv.appendChild(canvas);
        }

        canvas.style.display = "block";

        // if a Processing instance already exists it's likely still running, stop it by exiting
        var instance = window.Processing.getInstanceById(Sk.canvas);
        if (instance) {
            instance.exit();
        }

        // ugly hack make it start the loopage!
        setTimeout(function () {
            mod.p = new window.Processing(canvas, sketchProc);
        }, 300);

        return susp;
    });

    return mod;
}

exports.isInitialised = isInitialised;
exports.processing = processing;
exports.init = init;
exports.requestNoLoop = requestNoLoop;
exports.main = main;

Object.defineProperty(exports, '__esModule', { value: true });

})));
