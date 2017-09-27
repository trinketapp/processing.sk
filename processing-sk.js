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

var _Sk$builtin = Sk.builtin;
var str = _Sk$builtin.str;
var func = _Sk$builtin.func;
var NotImplementedError = _Sk$builtin.NotImplementedError;
var pyCheckArgs = _Sk$builtin.pyCheckArgs;
var _Sk$ffi = Sk.ffi;
var remapToJs = _Sk$ffi.remapToJs;
var remapToPy = _Sk$ffi.remapToPy;


var argsToArray = Array.from;

function countNonOptionalArgs(args) {
    args.filter(function (a) {
        return a.optional;
    }).length;
}

function join(func, arr1, arr2) {
    return arr1.map(function (v, i) {
        return func(v, arr2[i]);
    });
}

function pyCheckTypes(args) {
    args.forEach(function (a) {
        var _a = slicedToArray(a, 2),
            arg = _a[0],
            template = _a[1];

        var keys = Object.keys(template);
        var argName = keys[0];
        if (!(arg instanceof template[argName])) {
            throw new TypeError();
        }
    });
}

function makeFunc(thingToWrap, name, args_template) {
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

        var args = argsToArray(arguments);

        var js_args = args.filter(function (a, i) {
            return args_template[i] != self$1;
        }).map(remapToJs);

        pyCheckArgs(name, args, countNonOptionalArgs(args_template), args.length, true);

        pyCheckTypes(join(function (l, r) {
            return [l, r];
        }, args, args_template));

        var result = functionToWrap.apply(null, js_args);
        return remapToPy(result);
    };

    return new func(jsfunc);
}

var optional = true;

var self$1 = { "self": true };

var notImplemented = new func(function () {
    throw new NotImplementedError();
});

var __name__ = new str("processing");

var float = Sk.builtin.float;


var twodprimitives = {
    arc: makeFunc(exports.processing, "arc", [{ "x": float }, { "y": float }, { "width": float }, { "height": float }, { "start": float }, { "stop": float }]),

    ellipse: makeFunc(exports.processing, "ellipse", [{ "x": float }, { "y": float }, { "width": float }, { "height": float }]),

    line: makeFunc(exports.processing, "line", [{ "x1": float }, { "y1": float }, { "z1": float }, { "x2": float }, { "y2": float, optional: optional }, { "z2": float, optional: optional }]),

    point: makeFunc(exports.processing, "point", [{ "x": float }, { "y": float }, { "z": float, optional: optional }]),

    quad: makeFunc(exports.processing, "quad", [{ "x1": float }, { "y1": float }, { "x2": float }, { "y2": float }, { "x3": float }, { "y3": float }, { "x4": float }, { "y4": float }]),

    rect: makeFunc(exports.processing, "rect", [{ "x": float }, { "y": float }, { "width": float }, { "height": float }, { "tlradius": float, optional: optional }, { "trradius": float, optional: optional }, { "brradius": float, optional: optional }, { "blradius": float, optional: optional }]),

    triagle: makeFunc(exports.processing, "triangle", [{ "x1": float }, { "y1": float }, { "x2": float }, { "y2": float }, { "x3": float }, { "y3": float }])
};

var float$1 = Sk.builtin.float;


var threedprimitives = {
    box: makeFunc(exports.processing, "box", [{ "width": float$1 }, { "height": float$1, optional: optional }, { "depth": float$1, optional: optional }]),

    sphere: makeFunc(exports.processing, "sphere", [{ "radius": float$1 }]),

    sphereDetail: makeFunc(exports.processing, "sphereDetail", [{ "ures": float$1 }, { "vres": float$1, optional: optional }])
};

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

var _Sk$builtin$1 = Sk.builtin;
var int_ = _Sk$builtin$1.int_;
var str$1 = _Sk$builtin$1.str;
var ROUND = constants.ROUND;
var SQUARE = constants.SQUARE;
var BUTT = constants.BUTT;
var MITTER = constants.MITTER;
var BEVEL = constants.BEVEL;
var CENTER = constants.CENTER;
var RADIUS = constants.RADIUS;
var CORNER = constants.CORNER;
var CORNERS = constants.CORNERS;


var attributes = {
    elipseMode: makeFunc(exports.processing, "elipseMode", [{ "mode": int_, allowed: [CENTER, RADIUS, CORNER, CORNERS] }]),

    noSmooth: makeFunc(exports.processing, "noSmooth"),
    smooth: makeFunc(exports.processing, "smooth"),

    rectMode: makeFunc(exports.processing, "rectMode", [{ "mode": int_, allowed: [CENTER, RADIUS, CORNER, CORNERS] }]),

    strokeCap: makeFunc(exports.processing, "strokeCap", [{ "mode": str$1, allowed: [ROUND, SQUARE, BUTT] }]),

    strokeJoin: makeFunc(exports.processing, "strokeJoin", [{ "mode": str$1, allowed: [MITTER, BEVEL, ROUND] }]),

    strokeWeight: makeFunc(exports.processing, "strokeWeight", [{ "width": int_ }])
};

var _Sk$builtin$2 = Sk.builtin;
var int_$1 = _Sk$builtin$2.int_;
var float$2 = _Sk$builtin$2.float;


var calculation = {
    constrain: makeFunc(exports.processing, "contrain", [{ "value": [int_$1, float$2] }, { "min": [int_$1, float$2] }, { "max": [int_$1, float$2] }]),

    dist: makeFunc(exports.processing, "dist", [{ "x1": [int_$1, float$2] }, { "y1": [int_$1, float$2] }, { "z1": [int_$1, float$2] }, { "x2": [int_$1, float$2] }, { "y2": [int_$1, float$2], optional: optional }, { "z2": [int_$1, float$2], optional: optional }]),

    lerp: makeFunc(exports.processing, "lerp", [{ "value1": [int_$1, float$2] }, { "value2": [int_$1, float$2] }, { "amt": float$2 }]),

    mag: makeFunc(exports.processing, "mag", [{ "a": [int_$1, float$2] }, { "a": [int_$1, float$2] }, { "a": [int_$1, float$2], optional: optional }]),

    map: makeFunc(exports.processing, "map", [{ "value": float$2 }, { "low1": float$2 }, { "high1": float$2 }, { "low2": float$2 }, { "high2": float$2 }]),

    norm: makeFunc(exports.processing, "norm", [{ "value": float$2 }, { "low": float$2 }, { "high": float$2 }]),

    sq: makeFunc(exports.processing, "sq", [{ "value": [int_$1, float$2] }])
};

var float$3 = Sk.builtin.float;


var camera = {
    beginCamera: makeFunc(exports.processing, "beginCamera"),

    camera: makeFunc(exports.processing, "camera", [{ "eyeX": float$3, optional: optional }, { "eyeY": float$3, optional: optional }, { "eyeZ": float$3, optional: optional }, { "centerX": float$3, optional: optional }, { "centerY": float$3, optional: optional }, { "centerZ": float$3, optional: optional }, { "upX": float$3, optional: optional }, { "upY": float$3, optional: optional }, { "upZ": float$3, optional: optional }]),

    endCamera: makeFunc(exports.processing, "endCamera"),

    frustum: makeFunc(exports.processing, "frustum", [{ "left": float$3 }, { "right": float$3 }, { "bottom": float$3 }, { "top": float$3 }, { "near": float$3 }, { "far": float$3 }]),

    ortho: makeFunc(exports.processing, "ortho", [{ "left": float$3, optional: optional }, { "right": float$3, optional: optional }, { "bottom": float$3, optional: optional }, { "top": float$3, optional: optional }, { "near": float$3, optional: optional }, { "far": float$3, optional: optional }]),

    perspective: makeFunc(exports.processing, "perspective", [{ "fov": float$3, optional: optional }, { "aspect": float$3, optional: optional }, { "zNear": float$3, optional: optional }, { "zFar": float$3, optional: optional }]),

    printCamera: makeFunc(exports.processing, "printCamera"),

    printProjection: makeFunc(exports.processing, "printProjection")
};

var float$5 = Sk.builtin.float;
var buildClass = Sk.misceval.buildClass;


function colorInit(self, val1, val2, val3, alpha) {
    self.v = exports.processing.color(val1, val2, val3, alpha);
}

function colorClass($gbl, $loc) {
    $loc.__init__ = makeFunc(colorInit, [{ "gray": float$5 }, { "aplha": float$5, optional: optional }, { "value3": float$5, optional: optional }, { "hex": float$5, optional: optional }]);
}

var PColor$1 = (function (mod) {
    return buildClass(mod, colorClass, "color", []);
});

var BLEND = constants.BLEND;
var ADD = constants.ADD;
var SUBTRACT = constants.SUBTRACT;
var DARKEST = constants.DARKEST;
var LIGHTEST = constants.LIGHTEST;
var DIFFERENCE = constants.DIFFERENCE;
var EXLUSION = constants.EXLUSION;
var MULTIPLY = constants.MULTIPLY;
var SCREEN = constants.SCREEN;
var OVERLAY = constants.OVERLAY;
var HARD_LIGHT = constants.HARD_LIGHT;
var SOFT_LIGHT = constants.SOFT_LIGHT;
var DODGE = constants.DODGE;
var BURN = constants.BURN;
var _Sk$builtin$3 = Sk.builtin;
var int_$2 = _Sk$builtin$3.int_;
var float$4 = _Sk$builtin$3.float;
var callsim$1 = Sk.misceval.callsim;


function blendColor(c1, c2, mode) {
    var c = callsim$1(PColor$1, new int_$2(0), new int_$2(0), new int_$2(0));
    c.v = exports.processing.blendColor(c1, c2, mode);
    return c;
}

function lerpColor(c1, c2, mode) {
    var c = callsim$1(PColor$1, new int_$2(0), new int_$2(0), new int_$2(0));
    c.v = exports.processing.lerpColor(c1, c2, mode);
    return c;
}

var ccreatingandreading = {
    alpha: makeFunc(exports.processing, "alpha", [{ "color": PColor$1 }]),

    blendColor: makeFunc(blendColor, "blendColor", [{ "c1": PColor$1 }, { "c2": PColor$1 }, { "mode": int_$2, allowed: [BLEND, ADD, SUBTRACT, DARKEST, LIGHTEST, DIFFERENCE, EXLUSION, MULTIPLY, SCREEN, OVERLAY, HARD_LIGHT, SOFT_LIGHT, DODGE, BURN] }]),

    blue: makeFunc(exports.processing, "blue", [{ "color": PColor$1 }]),

    brightness: makeFunc(exports.processing, "brightness", [{ "color": PColor$1 }]),

    green: makeFunc(exports.processing, "green", [{ "color": PColor$1 }]),

    hue: makeFunc(exports.processing, "hue", [{ "color": PColor$1 }]),

    lerpColor: makeFunc(lerpColor, "lerpColor", [{ "c1": PColor$1 }, { "c2": PColor$1 }, { "amt": float$4 }]),

    red: makeFunc(exports.processing, "red", [{ "color": PColor$1 }]),

    saturation: makeFunc(exports.processing, "saturation", [{ "color": PColor$1 }])
};

var RGB = constants.RGB;
var HSB = constants.HSB;
var _Sk$builtin$4 = Sk.builtin;
var int_$3 = _Sk$builtin$4.int_;
var float$6 = _Sk$builtin$4.float;


var csetting = {
    background: makeFunc(exports.processing, "background", [{ "value1": [int_$3, float$6, PColor$1] }, { "value2": [int_$3, float$6], optional: optional }, { "value2": [int_$3, float$6], optional: optional }, { "alpha": [int_$3, float$6], optional: optional }]),

    colorMode: makeFunc(exports.processing, "colorMode", [{ "mode": int_$3, allowed: [RGB, HSB] }, { "range1": [int_$3, float$6], optional: optional }, { "range2": [int_$3, float$6], optional: optional }, { "range3": [int_$3, float$6], optional: optional }, { "range4": [int_$3, float$6], optional: optional }]),

    fill: makeFunc(exports.processing, "fill", [{ "value1": [int_$3, float$6, PColor$1] }, { "value2": [int_$3, float$6], optional: optional }, { "value2": [int_$3, float$6], optional: optional }, { "alpha": [int_$3, float$6], optional: optional }]),

    noFill: makeFunc(exports.processing, "noFill"),

    noStroke: makeFunc(exports.processing, "noStroke"),

    stroke: makeFunc(exports.processing, "stroke", [{ "value1": [int_$3, float$6, PColor$1] }, { "value2": [int_$3, float$6], optional: optional }, { "value2": [int_$3, float$6], optional: optional }, { "alpha": [int_$3, float$6], optional: optional }])
};

var _Sk$builtin$5 = Sk.builtin;
var int_$4 = _Sk$builtin$5.int_;
var float$7 = _Sk$builtin$5.float;


var coordinates = {
    modelX: makeFunc(exports.processing, "modelX", [{ "x": [int_$4, float$7] }, { "y": [int_$4, float$7] }, { "z": [int_$4, float$7] }]),

    modelY: makeFunc(exports.processing, "modelY", [{ "x": [int_$4, float$7] }, { "y": [int_$4, float$7] }, { "z": [int_$4, float$7] }]),

    modelZ: makeFunc(exports.processing, "modelZ", [{ "x": [int_$4, float$7] }, { "y": [int_$4, float$7] }, { "z": [int_$4, float$7] }]),

    screenX: makeFunc(exports.processing, "screenX", [{ "x": [int_$4, float$7] }, { "y": [int_$4, float$7] }, { "z": [int_$4, float$7] }]),

    screenY: makeFunc(exports.processing, "screenY", [{ "x": [int_$4, float$7] }, { "y": [int_$4, float$7] }, { "z": [int_$4, float$7] }]),

    screenZ: makeFunc(exports.processing, "screenZ", [{ "x": [int_$4, float$7] }, { "y": [int_$4, float$7] }, { "z": [int_$4, float$7] }])
};

var _Sk$builtin$6 = Sk.builtin;
var int_$5 = _Sk$builtin$6.int_;
var float$8 = _Sk$builtin$6.float;


var curves = {
    bezier: makeFunc(exports.processing, "bezier", [{ "x1": [int_$5, float$8] }, { "y1": [int_$5, float$8] }, { "z1": [int_$5, float$8] }, { "cx1": [int_$5, float$8] }, { "cy1": [int_$5, float$8] }, { "cz1": [int_$5, float$8] }, { "cx2": [int_$5, float$8] }, { "cy2": [int_$5, float$8] }, { "cz2": [int_$5, float$8], optional: optional }, { "x2": [int_$5, float$8], optional: optional }, { "y2": [int_$5, float$8], optional: optional }, { "z2": [int_$5, float$8], optional: optional }]),

    bezierDetail: makeFunc(exports.processing, "bezierDetail", [{ "detail": int_$5 }]),

    bezierPoint: makeFunc(exports.processing, "bezierPoint", [{ "a": [int_$5, float$8] }, { "b": [int_$5, float$8] }, { "c": [int_$5, float$8] }, { "d": [int_$5, float$8] }, { "t": float$8 }]),

    bezierTangent: makeFunc(exports.processing, "bezierTangent", [{ "a": [int_$5, float$8] }, { "b": [int_$5, float$8] }, { "c": [int_$5, float$8] }, { "d": [int_$5, float$8] }, { "t": float$8 }]),

    curve: makeFunc(exports.processing, "curve", [{ "x1": [int_$5, float$8] }, { "y1": [int_$5, float$8] }, { "z1": [int_$5, float$8] }, { "x2": [int_$5, float$8] }, { "y2": [int_$5, float$8] }, { "z2": [int_$5, float$8] }, { "x3": [int_$5, float$8] }, { "y3": [int_$5, float$8] }, { "z3": [int_$5, float$8], optional: optional }, { "x4": [int_$5, float$8], optional: optional }, { "y4": [int_$5, float$8], optional: optional }, { "z4": [int_$5, float$8], optional: optional }]),

    curveDetail: makeFunc(exports.processing, "curveDetail", [{ "detail": int_$5 }]),

    curvePoint: makeFunc(exports.processing, "curvePoint", [{ "a": [int_$5, float$8] }, { "b": [int_$5, float$8] }, { "c": [int_$5, float$8] }, { "d": [int_$5, float$8] }, { "t": float$8 }]),

    curveTangent: makeFunc(exports.processing, "curveTangent"[({ "a": [int_$5, float$8] }, { "b": [int_$5, float$8] }, { "c": [int_$5, float$8] }, { "d": [int_$5, float$8] }, { "t": float$8 })]),

    curveTightness: makeFunc(exports.processing, "curveTightness", [{ "squishy": int_$5 }])
};

var _Sk$builtin$8 = Sk.builtin;
var func$2 = _Sk$builtin$8.func;
var int_$7 = _Sk$builtin$8.int_;
var list = _Sk$builtin$8.list;
var str$2 = _Sk$builtin$8.str;
var float$9 = _Sk$builtin$8.float;
var buildClass$2 = Sk.misceval.buildClass;
var _Sk$ffi$2 = Sk.ffi;
var remapToJs$2 = _Sk$ffi$2.remapToJs;
var remapToPy$2 = _Sk$ffi$2.remapToPy;
var BLEND$1 = constants.BLEND;
var ADD$1 = constants.ADD;
var SUBTRACT$1 = constants.SUBTRACT;
var LIGHTEST$1 = constants.LIGHTEST;
var DARKEST$1 = constants.DARKEST;
var DIFFERENCE$1 = constants.DIFFERENCE;
var EXCLUSION = constants.EXCLUSION;
var MULTIPLY$1 = constants.MULTIPLY;
var SCREEN$1 = constants.SCREEN;
var OVERLAY$1 = constants.OVERLAY;
var HARD = constants.HARD;
var LIGHT = constants.LIGHT;
var SOFT_LIGHT$1 = constants.SOFT_LIGHT;
var DODGE$1 = constants.DODGE;
var BURN$1 = constants.BURN;
var THRESHOLD = constants.THRESHOLD;
var GRAY = constants.GRAY;
var INVERT = constants.INVERT;
var POSTERIZE = constants.POSTERIZE;
var BLUR = constants.BLUR;
var OPAQUE = constants.OPAQUE;
var ERODE = constants.ERODE;
var DILATE = constants.DILATE;
var CORNER$1 = constants.CORNER;
var CORNERS$1 = constants.CORNERS;
var CENTER$1 = constants.CENTER;


function imageLoadImage(img) {
    var i = exports.processing.loadImage(img);
    pushImage(img);

    var image = Sk.misceval.callsim(exports.PImage);
    image.v = i;
    return image;
}

function imageRequestImage(filename, extension) {
    var image = Sk.misceval.callsim(exports.PImage);
    image.v = exports.processing.requestImage(filename, extension);
    return image;
}

function imageInit(self, arg1, arg2, arg3) {
    self.v = new exports.processing.PImage(arg1.v, arg2.v, arg3.v);
}

function imageGet(self, x, y, width, height) {
    return self.v.get(x, y, width, height);
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

function imageClass($gbl, $loc) {
    /* images are loaded async.. so its best to preload them */
    $loc.__init__ = makeFunc(imageInit, "__init__", [
    // TODO: implement [] in type in makefunt
    { "width": [int_$7, str$2], optional: optional }, { "height": int_$7, optional: optional }, { "format": int_$7, allowed: [1, 2, 4] }]);

    $loc.__getattr__ = new func$2(function (self, key) {
        key = remapToJs$2(key);
        if (key === "width") {
            return remapToPy$2(self.v.width);
        }
        if (key === "height") {
            return remapToPy$2(self.v.height);
        }
        if (key === "pixels") {
            return remapToPy$2(self.v.pixels);
        }
    });

    $loc.get = makeFunc(imageGet, "get", [self$1, { "x": int_$7 }, { "y": int_$7 }, { "width": int_$7, optional: optional }, { "height": int_$7, optional: optional }]);

    $loc.set = makeFunc(imageSet, "set", [self$1, { "x": int_$7 }, { "y": int_$7 }, { "color": PColor$1 }]);

    $loc.copy = makeFunc(imageCopy, "copy", [self$1, { "srcImg": [int_$7, exports.PImage] }, { "sx": int_$7 }, { "sy": int_$7 }, { "swidth": int_$7 }, { "sheight": int_$7 }, { "dx": int_$7 }, { "dy": int_$7 }, { "dwidth": int_$7 }, { "dheight": int_$7, optional: optional }]);

    $loc.mask = makeFunc(imageMask, "mask", [self$1, { "maskImg": [exports.PImage, list] }]);

    $loc.blend = makeFunc(imageBlend, "blend", [self$1, { "srcImg": [int_$7, exports.PImage] }, { "x": int_$7 }, { "y": int_$7 }, { "width": int_$7 }, { "height": int_$7 }, { "dx": int_$7 }, { "dy": int_$7 }, { "dwidth": int_$7 }, { "dheight": int_$7 }, { "MODE": int_$7, optional: optional, allowed: [BLEND$1, ADD$1, SUBTRACT$1, LIGHTEST$1, DARKEST$1, DIFFERENCE$1, EXCLUSION, MULTIPLY$1, SCREEN$1, OVERLAY$1, HARD, LIGHT, SOFT_LIGHT$1, DODGE$1, BURN$1] }]);

    $loc.filter = makeFunc(imageFilter, "filter", [self$1, { "MODE": int_$7, allowed: [THRESHOLD, GRAY, INVERT, POSTERIZE, BLUR, OPAQUE, ERODE, DILATE] }, { "srcImg": exports.PImage, optional: optional }]);

    $loc.save = makeFunc(imageSave, "save", [self$1, { "filename": str$2 }]);

    $loc.resize = makeFunc(imageResize, "resize", [self$1, { "wide": int_$7 }, { "high": int_$7 }]);

    $loc.loadPixels = makeFunc(imageLoadPixels, "loadPixels");

    $loc.updatePixels = makeFunc(imageUpdatePixels, "updatePixels", [self$1, { "x": int_$7, optional: optional }, { "y": int_$7, optional: optional }, { "w": int_$7, optional: optional }, { "h": int_$7, optional: optional }]);
}

var PImageBuilder = function PImageBuilder(mod) {
    return buildClass$2(mod, imageClass, "PImage", []);
};

var createImage = new Sk.builtin.func(function (width, height, format) {
    var image = Sk.misceval.callsim(exports.PImage);
    image.v = exports.processing.createImage(width.v, height.v, format.v);
    return image;
});

var image = makeFunc(exports.processing, "image", [{ "img": "PImage" }, { "x": int_$7 }, { "y": int_$7 }, { "width": int_$7, optional: optional }, { "height": int_$7, optional: optional }]);

var imageMode = makeFunc(exports.processing, "imageMode", [{ "mode": int_$7, allowed: [CORNER$1, CORNERS$1, CENTER$1] }]);

var loadImage = makeFunc(imageLoadImage, "loadImage", [{ "image": str$2 }]);

var noTint = makeFunc(exports.processing, "noTint");

var requestImage = makeFunc(imageRequestImage, "requestImage", [{ "filename": str$2 }, { "extension": str$2, optional: optional }]);

var tint = makeFunc(exports.processing, "tint", [{ "value1": ["PColor", int_$7, float$9] }, { "value2": [int_$7, float$9], optional: optional }, { "value3": [int_$7, float$9], optional: optional }, { "alpha": [int_$7, float$9], optional: optional }]);

var blend = makeFunc(exports.processing, "blend", [{ "srcImg": [int_$7, "PImage"] }, { "x": int_$7 }, { "y": int_$7 }, { "width": int_$7 }, { "height": int_$7 }, { "dx": int_$7 }, { "dy": int_$7 }, { "dwidth": int_$7 }, { "dheight": int_$7 }, { "MODE": int_$7, optional: optional, allowed: [BLEND$1, ADD$1, SUBTRACT$1, LIGHTEST$1, DARKEST$1, DIFFERENCE$1, EXCLUSION, MULTIPLY$1, SCREEN$1, OVERLAY$1, HARD, LIGHT, SOFT_LIGHT$1, DODGE$1, BURN$1] }]);

var copy = makeFunc(exports.processing, "copy", [{ "srcImg": [int_$7, "PImage"] }, { "sx": int_$7 }, { "sy": int_$7 }, { "swidth": int_$7 }, { "sheight": int_$7 }, { "dx": int_$7 }, { "dy": int_$7 }, { "dwidth": int_$7 }, { "dheight": int_$7, optional: optional }]);

var filter = makeFunc(exports.processing, "filter", [{ "MODE": int_$7, allowed: [THRESHOLD, GRAY, INVERT, POSTERIZE, BLUR, OPAQUE, ERODE, DILATE] }, { "srcImg": "PImage", optional: optional }]);

var get$1 = makeFunc(exports.processing, "get", [{ "x": int_$7, optional: optional }, { "y": int_$7, optional: optional }, { "width": int_$7, optional: optional }, { "height": int_$7, optional: optional }]);

var loadPixels = makeFunc(exports.processing, "loadPixels");

var set$1 = makeFunc(exports.processing, "set", [{ "x": int_$7 }, { "y": int_$7 }, { "image": [PColor$1, "PImage"] }]);

var updatePixels = makeFunc(exports.processing, "updatePixels");

var _Sk$ffi$1 = Sk.ffi;
var remapToPy$1 = _Sk$ffi$1.remapToPy;
var remapToJs$1 = _Sk$ffi$1.remapToJs;
var _Sk$builtin$7 = Sk.builtin;
var func$1 = _Sk$builtin$7.func;
var int_$6 = _Sk$builtin$7.int_;
var buildClass$1 = Sk.misceval.buildClass;


function environmentClass($gbl, $loc) {
    $loc.__getattr__ = new func$1(function (self, key) {
        switch (remapToJs$1(key)) {
            case "frameCount":
                return remapToPy$1(exports.processing.frameCount);
            case "frameRate":
                return remapToPy$1(exports.processing.frameRate);
            case "height":
                return remapToPy$1(exports.processing.height);
            case "width":
                return remapToPy$1(exports.processing.width);
            case "online":
                return remapToPy$1(exports.processing.online);
            case "focused":
                return remapToPy$1(exports.processing.focused);
            default:
                return undefined;
        }
    });
}

var EnvironmentBuilder = function EnvironmentBuilder(mod) {
    return buildClass$1(mod, environmentClass, "Environment", []);
};

var cursor = makeFunc(exports.processing, "cursor", [{ "image": [PImageBuilder, int_$6], optional: optional }, { "x": int_$6, optional: optional }, { "y": int_$6, optional: optional }]);

var noCursor = makeFunc(exports.processing, "noCursor");

var str$3 = Sk.builtin.str;


var files = {
    loadBytes: makeFunc(exports.processing, "loadBytes", [{ "filename": str$3 }]),
    loadStrings: makeFunc(exports.processing, "loadStrings"[{ "filename": str$3 }]),
    createInput: notImplemented,
    open: notImplemented,
    selectFolder: notImplemented,
    selectInput: notImplemented
};

var LEFT = constants.LEFT;
var CENTER$2 = constants.CENTER;
var RIGHT = constants.RIGHT;
var TOP = constants.TOP;
var BOTTOM = constants.BOTTOM;
var BASELINE = constants.BASELINE;
var MODEL = constants.MODEL;
var SCREEN$2 = constants.SCREEN;
var SHAPE = constants.SHAPE;
var _Sk$builtin$9 = Sk.builtin;
var int_$8 = _Sk$builtin$9.int_;
var float$10 = _Sk$builtin$9.float;
var str$4 = _Sk$builtin$9.str;


var fontattribues = {
    textAlign: makeFunc(exports.processing, "textAlign", [{ "ALIGN": int_$8, allowed: [LEFT, CENTER$2, RIGHT] }, { "YALIGN": int_$8, allowed: [TOP, BOTTOM, BASELINE, CENTER$2] }]),

    textLeading: makeFunc(exports.processing, "textLeading", [{ "dist": [int_$8, float$10] }]),

    textMode: makeFunc(exports.processing, "textMode", [{ "MODE": int_$8, allowed: [MODEL, SCREEN$2, SHAPE] }]),

    textSize: makeFunc(exports.processing, "textSize", [{ "size": [int_$8, float$10] }]),

    textWidth: makeFunc(exports.processing, "textWidth", [{ "width": str$4 }])
};

var fontmetrics = {
    textAscent: makeFunc(exports.processing, "textAscent"),
    textDescent: makeFunc(exports.processing, "textDescent")
};

var _Sk$builtin$10 = Sk.builtin;
var func$3 = _Sk$builtin$10.func;
var float$11 = _Sk$builtin$10.float;
var list$1 = _Sk$builtin$10.list;
var str$5 = _Sk$builtin$10.str;
var bool = _Sk$builtin$10.bool;
var int_$9 = _Sk$builtin$10.int_;
var buildClass$3 = Sk.misceval.buildClass;


function fontClass($gbl, $loc) {
    $loc.__init__ = makeFunc(function (self, input) {
        self.v = new exports.processing.PFont(input);
    }, "__init__", [self$1, { "input ": str$5 }]);

    $loc.list = new func$3(function (self) {
        return new list$1(self.v.list());
    });
}

var PFontBuilder = function PFontBuilder(mod) {
    return buildClass$3(mod, fontClass, "PFont", []);
};

var createFont = makeFunc(exports.processing, "createFont", [{ "name": str$5 }, { "size": float$11 }, { "smooth": bool, optional: optional }, { "charset": str$5, optional: optional }]);

var loadFont = makeFunc(exports.processing, "loadFont", [{ "fontname": str$5 }]);

var text = makeFunc(exports.processing, "text", [{ "data": [str$5, int_$9, float$11] }, { "x": [int_$9, float$11] }, { "y": [int_$9, float$11] }, { "z": [int_$9, float$11], optional: optional }, { "height": [int_$9, float$11], optional: optional }, { "z": [int_$9, float$11], optional: optional }]);

var textFont = makeFunc(exports.processing, "textFont", [{ "font": "PFont" }, { "size": [int_$9, float$11], optional: optional }]);

var int_$10 = Sk.builtin.int_;
var buildClass$4 = Sk.misceval.buildClass;


function graphicsInit(self, width, height, applet) {
    self.v = new exports.processing.PGraphics(width, height, applet);
}

function graphicsClass($gbl, $loc) {
    $loc.__init__ = makeFunc(graphicsInit, [self$1, { "width": int_$10 }, { "width": int_$10 }, { "width": "PApplet" }]);

    $loc.beginDraw = new Sk.builtin.func(function (self) {
        self.v.beginDraw();
    });

    $loc.endDraw = new Sk.builtin.func(function (self) {
        self.v.endDraw();
    });
}

var PGraphicsBuilder = function PGraphicsBuilder(mod) {
    return buildClass$4(mod, graphicsClass, "PGraphics", []);
};

var createGraphics = new Sk.builtin.func(function (width, height, renderer, filename) {
    // createGraphics(width, height, renderer)
    // createGraphics(width, height, renderer, filename)
    var graphics = Sk.misceval.callsim(exports.PGraphics);
    if (typeof filename === "undefined") {
        graphics.v = exports.processing.createGraphics(width.v, height.v, renderer.v);
    } else {
        graphics.v = exports.processing.createGraphics(width.v, height.v, renderer.v, filename.v);
    }
    return graphics;
});

var hint = new Sk.builtin.func(function (item) {
    // hint(item)
    exports.processing.hint(item);
});

var _Sk$ffi$3 = Sk.ffi;
var remapToPy$3 = _Sk$ffi$3.remapToPy;
var remapToJs$3 = _Sk$ffi$3.remapToJs;
var func$4 = Sk.builtin.func;
var buildClass$5 = Sk.misceval.buildClass;


function keyboardClass($gbl, $loc) {
    $loc.__getattr__ = new func$4(function (self, key) {
        key = remapToJs$3(key);
        if (key === "key") {
            return remapToPy$3(exports.processing.key.toString());
        } else if (key === "keyCode") {
            return remapToPy$3(exports.processing.keyCode);
        } else if (key === "keyPressed") {
            return remapToPy$3(exports.processing.keyPressed);
        }
    });
}

var KeyboardBuilder = function KeyboardBuilder(mod) {
    return buildClass$5(mod, keyboardClass, "Keyboard", []);
};

var _Sk$builtin$11 = Sk.builtin;
var int_$11 = _Sk$builtin$11.int_;
var float$12 = _Sk$builtin$11.float;


var lights = {
    ambientLight: makeFunc(exports.processing, "ambientLight", [{ "v1": [int_$11, float$12] }, { "v2": [int_$11, float$12] }, { "v3": [int_$11, float$12] }, { "x": [int_$11, float$12], optional: optional }, { "y": [int_$11, float$12], optional: optional }, { "z": [int_$11, float$12], optional: optional }]),

    directionalLight: makeFunc(exports.processing, "directionalLight", [{ "v1": [int_$11, float$12] }, { "v2": [int_$11, float$12] }, { "v3": [int_$11, float$12] }, { "nx": [int_$11, float$12], optional: optional }, { "ny": [int_$11, float$12], optional: optional }, { "nz": [int_$11, float$12], optional: optional }]),

    lightFalloff: makeFunc(exports.processing, "lightFalloff", [{ "constant": [int_$11, float$12] }, { "linear": [int_$11, float$12] }, { "quardatic": [int_$11, float$12] }]),

    lightSpecular: makeFunc(exports.processing, "lightSpecular", [{ "v1": [int_$11, float$12] }, { "v2": [int_$11, float$12] }, { "v3": [int_$11, float$12] }]),

    lights: makeFunc(exports.processing, "lights"),

    noLights: makeFunc(exports.processing, "noLights"),

    normal: makeFunc(exports.processing, "normal", [{ "nx": [int_$11, float$12] }, { "ny": [int_$11, float$12] }, { "nz": [int_$11, float$12] }]),

    pointLight: makeFunc(exports.processing, "pointLight", [{ "v1": [int_$11, float$12] }, { "v2": [int_$11, float$12] }, { "v3": [int_$11, float$12] }, { "nx": [int_$11, float$12] }, { "ny": [int_$11, float$12] }, { "nz": [int_$11, float$12] }]),

    spotLight: makeFunc(exports.processing, "spotLight", [{ "v1": [int_$11, float$12] }, { "v2": [int_$11, float$12] }, { "v3": [int_$11, float$12] }, { "nx": [int_$11, float$12] }, { "ny": [int_$11, float$12] }, { "nz": [int_$11, float$12] }, { "angle": float$12 }, { "concentration": float$12 }])
};

var _Sk$builtin$12 = Sk.builtin;
var int_$12 = _Sk$builtin$12.int_;
var float$13 = _Sk$builtin$12.float;


var materialproperties = {
    ambient: makeFunc(exports.processing, "ambient", [{ "gray": [int_$12, float$13, PColor$1] }, { "v1": [int_$12, float$13], optional: optional }, { "v2": [int_$12, float$13], optional: optional }, { "v3": [int_$12, float$13], optional: optional }]),

    emissive: makeFunc(exports.processing, "emissive", [{ "gray": [int_$12, float$13, PColor$1] }, { "v1": [int_$12, float$13], optional: optional }, { "v2": [int_$12, float$13], optional: optional }, { "v3": [int_$12, float$13], optional: optional }]),

    shininess: makeFunc(exports.processing, "shininess", [{ "shine": float$13 }]),

    specular: makeFunc(exports.processing, "specular", [{ "gray": [int_$12, float$13, PColor$1] }, { "v1": [int_$12, float$13], optional: optional }, { "v2": [int_$12, float$13], optional: optional }, { "v3": [int_$12, float$13], optional: optional }])
};

var _Sk$ffi$4 = Sk.ffi;
var remapToPy$4 = _Sk$ffi$4.remapToPy;
var remapToJs$4 = _Sk$ffi$4.remapToJs;
var _Sk$builtin$13 = Sk.builtin;
var func$5 = _Sk$builtin$13.func;
var int_$13 = _Sk$builtin$13.int_;
var buildClass$6 = Sk.misceval.buildClass;


function mouseClass($gbl, $loc) {
    $loc.__getattr__ = new func$5(function (self, key) {
        switch (remapToJs$4(key)) {
            case "x":
                return remapToPy$4(exports.processing.mouseX);
            case "y":
                return remapToPy$4(exports.processing.mouseY);
            case "px":
                return remapToPy$4(exports.processing.pmouseX);
            case "py":
                return remapToPy$4(exports.processing.pmouseY);
            case "pressed":
                return remapToPy$4(exports.processing.__mousePressed);
            case "button":
                return remapToPy$4(exports.processing.mouseButton);
            default:
                return undefined;
        }
    });
}

var MouseBuilder = function MouseBuilder(mod) {
    return buildClass$6(mod, mouseClass, "Mouse", []);
};

var mouseX = new func$5(function () {
    return new int_$13(exports.processing.mouseX);
});

var mouseY = new func$5(function () {
    return new int_$13(exports.processing.mouseY);
});

var pmouseX = new func$5(function () {
    return new int_$13(exports.processing.pmouseX);
});

var pmouseY = new func$5(function () {
    return new int_$13(exports.processing.pmouseY);
});

var _Sk$builtin$14 = Sk.builtin;
var object = _Sk$builtin$14.object;
var str$6 = _Sk$builtin$14.str;
var list$2 = _Sk$builtin$14.list;


var output = {
    println: makeFunc(exports.processing, "println", [{ "data": object }]),

    save: makeFunc(exports.processing, "save", [{ "filename": str$6 }]),

    saveFrame: makeFunc(exports.processing, "saveFrame", [{ "filename": str$6 }, { "ext": str$6, allowed: ["tif", "tga", "jpg", "png"] }]),

    saveStrings: makeFunc(exports.processing, "saveStrings", [{ "filename": str$6 }, { "strings": list$2 }]),

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

var _Sk$builtin$15 = Sk.builtin;
var float$14 = _Sk$builtin$15.float;
var int_$14 = _Sk$builtin$15.int_;


var random = {
    noise: makeFunc(exports.processing, "noise", [{ "x": float$14 }, { "y": float$14, optional: optional }, { "z": float$14, optional: optional }]),

    noiseDetail: makeFunc(exports.processing, "noiseDetail", [{ "octave": int_$14 }, { "falloff": float$14 }]),

    noiseSeed: makeFunc(exports.processing, "noiseSeed", [{ "value": int_$14 }]),

    randomSeed: makeFunc(exports.processing, "randomSeed", [{ "value": int_$14 }]),

    random: makeFunc(exports.processing, "random", [{ low: [int_$14, float$14] }, { high: [int_$14, float$14], optional: optional }])
};

var _Sk$ffi$5 = Sk.ffi;
var remapToJs$5 = _Sk$ffi$5.remapToJs;
var remapToPy$5 = _Sk$ffi$5.remapToPy;
var buildClass$7 = Sk.misceval.buildClass;
var _Sk$builtin$16 = Sk.builtin;
var list$3 = _Sk$builtin$16.list;
var func$6 = _Sk$builtin$16.func;


function screenClass($gbl, $loc) {
    $loc.__init__ = new func$6(function (self) {
        self.pixels = null;
    });

    $loc.__getattr__ = new func$6(function (self, key) {
        key = remapToJs$5(key);
        switch (key) {
            case "height":
                return remapToPy$5(exports.processing.height);
            case "width":
                return remapToPy$5(exports.processing.width);
            case "pixels":
                if (self.pixels == null) {
                    self.pixels = new list$3(exports.processing.pixels.toArray());
                }
                return self.pixels;
        }
    });
}

var ScreenBuilder = function ScreenBuilder(mod) {
    return buildClass$7(mod, screenClass, "Screen", []);
};

var CORNER$2 = constants.CORNER;
var CORNERS$2 = constants.CORNERS;
var CENTER$3 = constants.CENTER;
var _Sk$builtin$17 = Sk.builtin;
var str$7 = _Sk$builtin$17.str;
var int_$15 = _Sk$builtin$17.int_;
var float$15 = _Sk$builtin$17.float;
var bool$1 = _Sk$builtin$17.bool;
var _Sk$ffi$6 = Sk.ffi;
var remapToJs$6 = _Sk$ffi$6.remapToJs;
var remapToPy$6 = _Sk$ffi$6.remapToPy;
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
        key = remapToJs$6(key);
        switch (key) {
            case "width":
                return remapToPy$6(self.v.width);
            case "height":
                return remapToPy$6(self.v.height);
        }
    });

    $loc.isVisible = makeFunc(shapeIsVisible, "isVisible", [self$1]);

    $loc.setVisible = makeFunc(shapeSetVisible, "setVisible"[(self$1, { "value": bool$1 })]);

    $loc.disableStyle = makeFunc(shapeDisableStyle, "disableStyle", [self$1]);

    $loc.enableStyle = makeFunc(shapeEnableStyle, "enableStyle", [self$1]);

    $loc.getChild = makeFunc(shapeGetChild, "getChild", [self$1, { "shape": exports.PShape }]);

    $loc.translate = makeFunc(shapeTranslate, "translate", [self$1, { "x": [float$15, int_$15] }, { "y": [float$15, int_$15] }, { "z": [float$15, int_$15], optional: optional }]);

    $loc.rotate = makeFunc(shapeRotate, "rotate", [self$1, { "angle": float$15 }]);

    $loc.rotateX = makeFunc(shapeRotateX, "rotateX", [self$1, { "angle": float$15 }]);

    $loc.rotateY = makeFunc(shapeRotateY, "rotateY", [self$1, { "angle": float$15 }]);

    $loc.rotateZ = makeFunc(shapeRotateZ, "rotateZ", [self$1, { "angle": float$15 }]);

    $loc.scale = makeFunc(shapeScale, "scale"[(self$1, { "x": float$15 }, { "y": float$15, optional: optional }, { "z": float$15, optional: optional })]);
}

var PShapeBuilder = function PShapeBuilder(mod) {
    return buildClass$8(mod, shapeClass, "PShape", []);
};

var shape = {
    loadShape: makeFunc(exports.processing, "loadShape", [{ "filename": str$7 }]),

    shape: makeFunc(exports.processing, "shape", [{ "sh": "PShape" }, { "x": float$15 }, { "y": float$15 }, { "width": float$15, optional: optional }, { "height": float$15, optional: optional }]),

    shapeMode: makeFunc(exports.processing, "shapeMode", [{ "img": int_$15, allowed: [CORNER$2, CORNERS$2, CENTER$3] }])
};

var int_$16 = Sk.builtin.int_;


function loop() {
    if (isInitialised) {
        throw new Sk.builtin.Exception("loop() should be called after run()");
    }

    setLooping(true);
    exports.processing.loop();
}

function noLoop() {
    if (isInitialised()) {
        throw new Sk.builtin.Exception("noLoop() should be called after run()");
    }

    setLooping(false);
    exports.processing.noLoop();
}

function size(width, height) {
    exports.processing.size(width, height);
    setProperty("width", exports.processing.width);
    setProperty("height", exports.processing.height);
}

var structure = {
    loop: makeFunc(loop, "loop"),
    noLoop: makeFunc(noLoop, "noLoop"),

    width: makeFunc(function () {
        return exports.processing.width;
    }, "width"),
    height: makeFunc(function () {
        return exports.processing.height;
    }, "height"),

    size: makeFunc(size, "size", [{ "width": int_$16 }, { "height": int_$16 }]),

    exit: makeFunc(exports.processing, "exit")
};

var timeanddate = {
    day: makeFunc(exports.processing, "day"),
    hour: makeFunc(exports.processing, "hour"),
    millis: makeFunc(exports.processing, "millis"),
    minute: makeFunc(exports.processing, "minute"),
    month: makeFunc(exports.processing, "month"),
    second: makeFunc(exports.processing, "second"),
    year: makeFunc(exports.processing, "year")
};

var float$16 = Sk.builtin.float;


var transform = {
    applyMatrix: makeFunc(exports.processing, "applyMatrix", [{ "n00": float$16 }, { "n01": float$16 }, { "n02": float$16 }, { "n03": float$16 }, { "n04": float$16 }, { "n05": float$16 }, { "n06": float$16 }, { "n07": float$16 }, { "n08": float$16 }, { "n09": float$16 }, { "n10": float$16 }, { "n11": float$16 }, { "n12": float$16 }, { "n13": float$16 }, { "n14": float$16 }, { "n15": float$16 }]),

    popMatrix: makeFunc(exports.processing, "popMatrix"),
    printMatrix: makeFunc(exports.processing, "printMatrix"),
    pushMatrix: makeFunc(exports.processing, "pushMatrix"),
    resetMatrix: makeFunc(exports.processing, "resetMatrix"),

    rotate: makeFunc(exports.processing, "rotate", [{ "angle": float$16 }]),

    rotateX: makeFunc(exports.processing, "rotateX", [{ "angle": float$16 }]),

    rotateY: makeFunc(exports.processing, "rotateY", [{ "angle": float$16 }]),

    rotateZ: makeFunc(exports.processing, "rotateZ", [{ "angle": float$16 }]),

    scale: makeFunc(exports.processing, "scale", [{ "size": float$16 }, { "y": float$16, optional: optional }, { "z": float$16, optional: optional }]),

    translate: makeFunc(exports.processing, "translate", [{ "x": float$16 }, { "y": float$16 }, { "z": float$16, optional: optional }])
};

var _Sk$builtin$18 = Sk.builtin;
var int_$17 = _Sk$builtin$18.int_;
var float$17 = _Sk$builtin$18.float;


var trigonometry = {
    degrees: makeFunc(exports.processing, "degrees", [{ "angle": [int_$17, float$17] }]),

    radians: makeFunc(exports.processing, "radians", [{ "angle": [int_$17, float$17] }])
};

var _Sk$builtin$19 = Sk.builtin;
var int_$18 = _Sk$builtin$19.int_;
var float$18 = _Sk$builtin$19.float;
var _Sk$misceval = Sk.misceval;
var callsim$2 = _Sk$misceval.callsim;
var buildClass$9 = _Sk$misceval.buildClass;
var remapToPy$7 = Sk.ffi.remapToPy;


function vectorInit(self, x, y, z) {
    self.v = exports.processing.PVector(x, y, z);
}

function vectorSet(self, x, y, z) {
    self.v.set(x, y, z);
}

function vectorGet(self) {
    var vector = callsim$2(exports.PVector);
    vector.v = self.v.get();
    return vector;
}

function vectorAdd(self, vec) {
    var new_vec = callsim$2(exports.PVector);
    new_vec.v = self.v.add(vec);
    return new_vec;
}

function vectorSub(self, vec) {
    var new_vec = callsim$2(exports.PVector);
    new_vec.v = self.v.sub(vec);
    return new_vec;
}

function vectorMult(self, vec) {
    var new_vec = callsim$2(exports.PVector);
    new_vec.v = self.v.mult(vec);
    return new_vec;
}

function vectorDiv(self, vec) {
    var new_vec = callsim$2(exports.PVector);
    new_vec.v = self.v.div(vec);
    return new_vec;
}

function vectorDot(self, vec) {
    var new_vec = callsim$2(exports.PVector);
    new_vec.v = self.v.dot(vec);
    return new_vec;
}

function vectorCross(self, vec) {
    var new_vec = callsim$2(exports.PVector);
    new_vec.v = self.v.cross(vec);
    return new_vec;
}

function vectorDist(self, vec) {
    var new_vec = callsim$2(exports.PVector);
    new_vec.v = self.v.dist(vec);
    return new_vec;
}

function vectorAngleBetween(self, vec) {
    var new_vec = callsim$2(exports.PVector);
    new_vec.v = self.v.angleBetween(vec);
    return new_vec;
}

function vectorLimit(self, value) {
    self.v.limit(value);
}

function vectorClass($gbl, $loc) {
    $loc.__init__ = makeFunc(vectorInit, "__init__", [self, { "x": int_$18 }, { "y": int_$18, optional: optional }, { "z": int_$18, optional: optional }]);

    $loc.__getattr__ = new Sk.builtin.func(function (self, key) {
        key = Sk.ffi.remapToJs(key);
        if (key === "x") {
            return remapToPy$7(self.v.x);
        } else if (key === "y") {
            return remapToPy$7(self.v.y);
        } else if (key === "z") {
            return Sk.builtin.assk$(self.v.z);
        }
    });

    $loc.get = makeFunc(vectorGet, "get", [self]), $loc.set = makeFunc(vectorSet, "set", [self, { "x": int_$18 }, { "x": int_$18, optional: optional }, { "x": int_$18, optional: optional }]);

    $loc.mag = makeFunc(function (self) {
        return self.v.mag();
    }, "mag", [self]);

    $loc.add = makeFunc(vectorAdd, "add", [self, { "vector": "PVector" }]);

    $loc.sub = makeFunc(vectorSub, "sub", [self, { "vector": "PVector" }]);

    $loc.mult = makeFunc(vectorMult, "mult", [self, { "vector": "PVector" }]);

    $loc.div = makeFunc(vectorDiv, "div", [self, { "vector": "PVector" }]);

    $loc.dist = makeFunc(vectorDist, "dist", [self, { "vector": "PVector" }]);

    $loc.dot = makeFunc(vectorDot, "dot", [self, { "x": [int_$18, float$18] }, { "y": [int_$18, float$18], optional: optional }, { "z": [int_$18, float$18], optional: optional }]);

    $loc.cross = makeFunc(vectorCross, "cross", [self, { "vector": "PVector" }]);

    $loc.normalize = makeFunc(function (self) {
        return self.normalize();
    }, "normalize", [self]);

    $loc.limit = makeFunc(vectorLimit, "limit", [self, { "value": float$18 }]);

    $loc.angleBetween = makeFunc(vectorAngleBetween, "angleBetween", [self, { "vector": "PVector" }]);

    $loc.array = makeFunc(function (self) {
        return self.v.array();
    }, "array", [self]);
}

var vectorBuilder = (function (mod) {
    return buildClass$9(mod, vectorClass, "PVector", []);
});

var _Sk$builtin$20 = Sk.builtin;
var float$19 = _Sk$builtin$20.float;
var int_$19 = _Sk$builtin$20.int_;
var IMAGE = constants.IMAGE;
var NORMALIZED = constants.NORMALIZED;


var vertex = {
    beginShape: makeFunc(exports.processing, "beginShape"),

    endShape: makeFunc(exports.processing, "endShape"),

    vertex: makeFunc(exports.processing, "vertex", [{ "x": float$19 }, { "y": float$19 }, { "z": float$19 }, { "u": float$19, optional: optional }, { "v": float$19, optional: optional }]),

    bezierVertex: makeFunc(exports.processing, "bezierVertex", [{ "cx1": float$19 }, { "cy1": float$19 }, { "cz1": float$19 }, { "cx2": float$19 }, { "cy2": float$19 }, { "cz2": float$19 }, { "x": float$19, optional: optional }, { "y": float$19, optional: optional }, { "z": float$19, optional: optional }]),

    curveVertex: makeFunc(exports.processing, "curveVertex", [{ "x": float$19 }, { "y": float$19 }, { "z": float$19, optional: optional }]),

    texture: makeFunc(exports.processing, "texture"[{ "img": PImageBuilder }]),

    textureMode: makeFunc(exports.processing, "textureMode", [{ "img": int_$19, allowed: [IMAGE, NORMALIZED] }])
};

var str$8 = Sk.builtin.str;


var web = {
    link: makeFunc(exports.processing, "link"[({ "url": str$8 }, { "target": str$8, optional: optional })]),
    status: makeFunc(exports.processing, "status", [{ "text": str$8 }])
};

var callsim = Sk.misceval.callsim;


var looping = true;

var mod = {};

var imList = [];

function isInitialised() {
    return exports.processing == null;
}

function setProperty(name, value) {
    mod[name] = value;
}

function setLooping(bool) {
    looping = bool;
}

function pushImage(url) {
    imList.push(url);
}

exports.PColor = void 0;
exports.PImage = void 0;
exports.PShape = void 0;
exports.PGraphics = void 0;
exports.PVector = void 0;
exports.processing = void 0;

function init(path) {
    Sk.externalLibraries = Sk.externalLibraries || {};

    Object.assign(Sk.externalLibraries, {
        processing: {
            path: path + "/__init__.js"
        }
    });
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

    exports.PColor = PColor$1(mod);
    exports.PImage = PImageBuilder(mod);
    exports.PShape = PShapeBuilder(mod);
    exports.PGraphics = PGraphicsBuilder(mod);
    exports.PVector = vectorBuilder(mod);

    var Environment = EnvironmentBuilder(mod);
    var environment = callsim(Environment);
    var PFont = PFontBuilder(mod);
    var Mouse = MouseBuilder(mod);
    var mouse = callsim(Mouse);
    var Keyboard = KeyboardBuilder(mod);
    var keyboard = callsim(Keyboard);
    var Screen = ScreenBuilder(mod);
    var screen = callsim(Screen);

    Object.assign(mod, twodprimitives, threedprimitives, attributes, calculation, camera, ccreatingandreading, csetting, exports.PColor, constants, coordinates, curves, { Environment: Environment, environment: environment, cursor: cursor, noCursor: noCursor }, files, fontattribues, fontmetrics, { PFont: PFont, createFont: createFont, loadFont: loadFont, text: text, textFont: textFont }, { PGraphics: exports.PGraphics, createGraphics: createGraphics, hint: hint }, exports.PImage, { image: image, createImage: createImage, imageMode: imageMode, loadImage: loadImage, noTint: noTint, requestImage: requestImage, tint: tint, blend: blend,
        copy: copy, filter: filter, get: get$1, loadPixels: loadPixels, set: set$1, updatePixels: updatePixels }, { keyboard: keyboard, Keyboard: Keyboard }, lights, materialproperties, { Mouse: Mouse, mouse: mouse, mouseX: mouseX, mouseY: mouseY, pmouseX: pmouseX, pmouseY: pmouseY }, output, random, { Screen: Screen, screen: screen }, exports.PShape, structure, timeanddate, transform, trigonometry, exports.PVector, vertex, web, shape);

    mod.run = new Sk.builtin.func(function () {
        function sketchProc(processingInstance) {
            exports.processing = processingInstance;

            // processing.setup = function() {
            //     if Sk.globals["setup"]
            //         Sk.misceval.callsim(Sk.globals["setup"])
            // }
            // initialise classes

            // FIXME if no Sk.globals["draw"], then no need for this
            exports.processing.draw = function () {
                // if there are pending image loads then just use the natural looping calls to
                // retry until all the images are loaded.  If noLoop was called in setup then make
                // sure to revert to that after all the images in hand.
                var wait = false;

                for (var i in imList) {
                    if (imList[i].width === 0) {
                        wait = true;
                    }
                }

                if (wait === true) {
                    if (looping === true) {
                        return;
                    } else {
                        exports.processing.loop();
                        return;
                    }
                } else {
                    if (looping === false) {
                        exports.processing.noLoop();
                    }
                }

                mod.frameCount = exports.processing.frameCount;
                if (Sk.globals["draw"]) {
                    try {
                        Sk.misceval.callsim(Sk.globals["draw"]);
                    } catch (e) {
                        Sk.uncaughtException(e);
                    }
                }
            };

            var callBacks = ["setup", "mouseMoved", "mouseClicked", "mouseDragged", "mouseMoved", "mouseOut", "mouseOver", "mousePressed", "mouseReleased", "keyPressed", "keyReleased", "keyTyped"];

            for (var cb in callBacks) {
                if (Sk.globals[callBacks[cb]]) {
                    exports.processing[callBacks[cb]] = new Function("try {Sk.misceval.callsim(Sk.globals['" + callBacks[cb] + "']);} catch(e) {Sk.uncaughtException(e);}");
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

        window.Processing.logger = {
            log: function log(message) {
                Sk.misceval.print_(message);
            }
        };

        // if a Processing instance already exists it's likely still running, stop it by exiting
        var instance = window.Processing.getInstanceById(Sk.canvas);
        if (instance) {
            instance.exit();
        }

        mod.p = new window.Processing(canvas, sketchProc);
    });

    return mod;
}

exports.isInitialised = isInitialised;
exports.setProperty = setProperty;
exports.setLooping = setLooping;
exports.pushImage = pushImage;
exports.init = init;
exports.main = main;

Object.defineProperty(exports, '__esModule', { value: true });

})));
