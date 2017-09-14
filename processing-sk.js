(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Processing = {})));
}(this, (function (exports) { 'use strict';

/* global Sk */

if (typeof require === 'function') {
    var fs = require('fs');
    var skulpt = fs.readFileSync('bower_components/skulpt/skulpt.min.js').toString();
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
var str$1 = _Sk$builtin.str;
var func = _Sk$builtin.func;
var NotImplementedError = _Sk$builtin.NotImplementedError;
var pyCheckArgs = _Sk$builtin.pyCheckArgs;
var _Sk$ffi = Sk.ffi;
var remapToJs$1 = _Sk$ffi.remapToJs;
var remapToPy$1 = _Sk$ffi.remapToPy;


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
        if (!arg instanceof template[argName]) {
            throw new TypeError();
        }
    });
}

function makeFunc$1(functionToWrap, name, args_template) {
    var func = function wrappedFunc() {
        var args = argsToArray(arguments);
        var js_args = args.map(remapToJs$1);
        pyCheckArgs(name, args, countNonOptionalArgs(args_template), args.length, true);

        pyCheckTypes(join(function (l, r) {
            return [l, r];
        }, args, args_template));

        var result = functionToWrap.apply(null, js_args);
        return remapToPy$1(result);
    };

    return new func(func);
}

var optional = true;

var notImplemented = new func(function () {
    throw new NotImplementedError();
});

var __name__$1 = new str$1("processing");

var float$1 = Sk.builtin.float;


{
    arc: makeFunc$1(processingInstance.arc, "arc", [{ "x": float$1 }, { "y": float$1 }, { "width": float$1 }, { "height": float$1 }, { "start": float$1 }, { "stop": float$1 }]),

    ellipse: makeFunc$1(processingInstance.ellipse, "ellipse", [{ "x": float$1 }, { "y": float$1 }, { "width": float$1 }, { "height": float$1 }]),

    line: makeFunc$1(processingInstance.line, "line", [{ "x1": float$1 }, { "y1": float$1 }, { "z1": float$1 }, { "x2": float$1 }, { "y2": float$1, optional: optional }, { "z2": float$1, optional: optional }]),

    point: makeFunc$1(processingInstance.point, "point", [{ "x": float$1 }, { "y": float$1 }, { "z": float$1, optional: optional }]),

    quad: makeFunc$1(processingInstance.quad, "quad", [{ "x1": float$1 }, { "y1": float$1 }, { "x2": float$1 }, { "y2": float$1 }, { "x3": float$1 }, { "y3": float$1 }, { "x4": float$1 }, { "y4": float$1 }]),

    rect: makeFunc$1(processingInstance.rect, "rect", [{ "x": float$1 }, { "y": float$1 }, { "width": float$1 }, { "height": float$1 }, { "tlradius": float$1, optional: optional }, { "trradius": float$1, optional: optional }, { "brradius": float$1, optional: optional }, { "blradius": float$1, optional: optional }]),

    triagle: makeFunc$1(processingInstance.triangle, "triangle", [{ "x1": float$1 }, { "y1": float$1 }, { "x2": float$1 }, { "y2": float$1 }, { "x3": float$1 }, { "y3": float$1 }])
};

var float$2 = Sk.builtin.float;


{
    box: makeFunc$1(processingInstance.box, "box", [{ "width": float$2 }, { "height": float$2, optional: optional }, { "depth": float$2, optional: optional }]),

    sphere: makeFunc$1(processingInstance.sphere, "sphere", [{ "radius": float$2 }]),

    sphereDetail: makeFunc$1(processingInstance.sphereDetail, "sphereDetail", [{ "ures": float$2 }, { "vres": float$2, optional: optional }])
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

    WHITESPACE: ' \t\n\r\f\xA0',

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
    SQUARE: 'butt',
    ROUND: 'round',
    PROJECT: 'square',
    MITER: 'miter',
    BEVEL: 'bevel',

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
    ARROW: 'default',
    CROSS: 'crosshair',
    HAND: 'pointer',
    MOVE: 'move',
    TEXT: 'text',
    WAIT: 'wait',
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
var int$1 = _Sk$builtin$1.int;
var str$2 = _Sk$builtin$1.str;
var ROUND = constants.ROUND;
var SQUARE = constants.SQUARE;
var BUTT = constants.BUTT;
var MITTER = constants.MITTER;
var BEVEL = constants.BEVEL;
var CENTER = constants.CENTER;
var RADIUS = constants.RADIUS;
var CORNER = constants.CORNER;
var CORNERS = constants.CORNERS;


{
    elipseMode: makeFunc$1(processingInstance.elipseMode, "elipseMode", [{ "mode": int$1, allowed: [CENTER, RADIUS, CORNER, CORNERS] }]),

    noSmooth: makeFunc$1(processingInstance.noSmooth, "noSmooth"),
    smooth: makeFunc$1(processingInstance.smooth, "smooth"),

    rectMode: makeFunc$1(processingInstance.rectMode, "rectMode", [{ "mode": int$1, allowed: [CENTER, RADIUS, CORNER, CORNERS] }]),

    strokeCap: makeFunc$1(processingInstance.strokeCap, "strokeCap", [{ "mode": str$2, allowed: [ROUND, SQUARE, BUTT] }]),

    strokeJoin: makeFunc$1(processingInstance.strokeJoin, "strokeJoin", [{ "mode": str$2, allowed: [MITTER, BEVEL, ROUND] }]),

    strokeWeight: makeFunc$1(processingInstance.strokeWeight, [{ "width": int$1 }])
};

var _Sk$builtin$2 = Sk.builtin;
var int$2 = _Sk$builtin$2.int;
var float$3 = _Sk$builtin$2.float;


{
    constrain: makeFunc$1(processingInstance.constrain, "contrain", [{ "value": [int$2, float$3] }, { "min": [int$2, float$3] }, { "max": [int$2, float$3] }]),

    dist: makeFunc$1(processingInstance.dist, "dist", [{ "x1": [int$2, float$3] }, { "y1": [int$2, float$3] }, { "z1": [int$2, float$3] }, { "x2": [int$2, float$3] }, { "y2": [int$2, float$3], optional: optional }, { "z2": [int$2, float$3], optional: optional }]),

    lerp: makeFunc$1(processingInstance.lerp, "lerp", [{ "value1": [int$2, float$3] }, { "value2": [int$2, float$3] }, { "amt": float$3 }]),

    mag: makeFunc$1(processingInstance.mag, "mag", [{ "a": [int$2, float$3] }, { "a": [int$2, float$3] }, { "a": [int$2, float$3], optional: optional }]),

    map: makeFunc$1(processingInstance.map, "map", [{ "value": float$3 }, { "low1": float$3 }, { "high1": float$3 }, { "low2": float$3 }, { "high2": float$3 }]),

    norm: makeFunc$1(processingInstance.norm, "norm", [{ "value": float$3 }, { "low": float$3 }, { "high": float$3 }]),

    sq: makeFunc$1(processingInstance.sq, "sq", [{ "value": [int$2, float$3] }])
};

var float$4 = Sk.builtin.float;


{
    beginCamera: makeFunc$1(processingInstance.beginCamera, "beginCamera"),

    camera: makeFunc$1(processingInstance.camera, "camera", [{ "eyeX": float$4, optional: optional }, { "eyeY": float$4, optional: optional }, { "eyeZ": float$4, optional: optional }, { "centerX": float$4, optional: optional }, { "centerY": float$4, optional: optional }, { "centerZ": float$4, optional: optional }, { "upX": float$4, optional: optional }, { "upY": float$4, optional: optional }, { "upZ": float$4, optional: optional }]),

    endCamera: makeFunc$1(processingInstance.endCamera, "endCamera"),

    frustum: makeFunc$1(processingInstance.frustum, "frustum", [{ "left": float$4 }, { "right": float$4 }, { "bottom": float$4 }, { "top": float$4 }, { "near": float$4 }, { "far": float$4 }]),

    ortho: makeFunc$1(processingInstance.ortho, "ortho", [{ "left": float$4, optional: optional }, { "right": float$4, optional: optional }, { "bottom": float$4, optional: optional }, { "top": float$4, optional: optional }, { "near": float$4, optional: optional }, { "far": float$4, optional: optional }]),

    perspective: makeFunc$1(processingInstance.perspective, "perspective", [{ "fov": float$4, optional: optional }, { "aspect": float$4, optional: optional }, { "zNear": float$4, optional: optional }, { "zFar": float$4, optional: optional }]),

    printCamera: makeFunc$1(processingInstance.printCamera, "printCamera"),

    printProjection: makeFunc$1(processingInstance.printProjection, "printProjection")
};

var _Sk$builtin$4 = Sk.builtin;
var float$6 = _Sk$builtin$4.float;
var buildClass = Sk.misceval.buildClass;


function colorInit(self, val1, val2, val3, alpha) {
    self.v = processingInstance.color(val1, val2, val3, alpha);
}

function colorClass($gbl, $loc) {
    $loc.__init__ = makeFunc$1(colorInit, [{ "gray": float$6 }, { "aplha": float$6, optional: optional }, { "value3": float$6, optional: optional }, { "hex": float$6, optional: optional }]);
}

var PColor = buildClass({ __name__: __name__$1 }, colorClass, "color", []);

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
var int$3 = _Sk$builtin$3.int;
var float$5 = _Sk$builtin$3.float;
var callsim = Sk.misceval.callsim;


function blendColor(c1, c2, mode) {
    var c = callsim(PColor, new int_(0), new int_(0), new int_(0));
    c.v = processingInstance.blendColor(c1, c2, mode);
    return c;
}

function lerpColor(c1, c2, mode) {
    var c = callsim(Pcolor, new int_(0), new int_(0), new int_(0));
    c.v = processingInstance.lerpColor(c1, c2, mode);
    return c;
}

{
    alpha: makeFunc$1(processingInstance.alpha, "alpha", [{ "color": PColor }]),

    blendColor: makeFunc$1(blendColor, "blendColor", [{ "c1": PColor }, { "c2": PColor }, { "mode": int$3, allowed: [BLEND, ADD, SUBTRACT, DARKEST, LIGHTEST, DIFFERENCE, EXLUSION, MULTIPLY, SCREEN, OVERLAY, HARD_LIGHT, SOFT_LIGHT, DODGE, BURN] }]),

    blue: makeFunc$1(processingInstance.blue, "blue", [{ "color": PColor }]),

    brightness: makeFunc$1(processingInstance.brightness, "brightness", [{ "color": PColor }]),

    green: makeFunc$1(processingInstance.green, "green", [{ "color": PColor }]),

    hue: makeFunc$1(processingInstance.hue, "hue", [{ "color": PColor }]),

    lerpColor: makeFunc$1(lerpColor, "lerpColor", [{ "c1": PColor }, { "c2": PColor }, { "amt": float$5 }]),

    red: makeFunc$1(processingInstance.red, "red", [{ "color": PColor }]),

    saturation: makeFunc$1(processingInstance.saturation, "saturation", [{ "color": PColor }])
};

var HSB = constants.HSB;
var _Sk$builtin$5 = Sk.builtin;
var int$4 = _Sk$builtin$5.int;
var float$7 = _Sk$builtin$5.float;


{
    background: makeFunc$1(processingInstance.background, "background", [{ "value1": [int$4, float$7, PColor] }, { "value2": [int$4, float$7], optional: optional }, { "value2": [int$4, float$7], optional: optional }, { "alpha": [int$4, float$7], optional: optional }]),

    colorMode: makeFunc$1(processingInstance.colorMode, "colorMode", [{ "mode": int$4, allowed: [RBG, HSB] }, { "range1": [int$4, float$7], optional: optional }, { "range2": [int$4, float$7], optional: optional }, { "range3": [int$4, float$7], optional: optional }, { "range4": [int$4, float$7], optional: optional }]),

    fill: makeFunc$1(processingInstance.fill, "fill", [{ "value1": [int$4, float$7, PColor] }, { "value2": [int$4, float$7], optional: optional }, { "value2": [int$4, float$7], optional: optional }, { "alpha": [int$4, float$7], optional: optional }]),

    noFill: makeFunc$1(processingInstance.noFill, "noFill"),

    noStroke: makeFunc$1(processingInstance.noStroke, "noStroke"),

    stroke: makeFunc$1(processingInstance.stroke, "stroke", [{ "value1": [int$4, float$7, PColor] }, { "value2": [int$4, float$7], optional: optional }, { "value2": [int$4, float$7], optional: optional }, { "alpha": [int$4, float$7], optional: optional }])
};

var _Sk$builtin$6 = Sk.builtin;
var int$5 = _Sk$builtin$6.int;
var float$8 = _Sk$builtin$6.float;


{
    modelX: makeFunc$1(processingInstance.modelX, "modelX", [{ "x": [int$5, float$8] }, { "y": [int$5, float$8] }, { "z": [int$5, float$8] }]),

    modelY: makeFunc$1(processingInstance.modelY, "modelY", [{ "x": [int$5, float$8] }, { "y": [int$5, float$8] }, { "z": [int$5, float$8] }]),

    modelZ: makeFunc$1(processingInstance.modelZ, "modelZ", [{ "x": [int$5, float$8] }, { "y": [int$5, float$8] }, { "z": [int$5, float$8] }]),

    screenX: makeFunc$1(processingInstance.screenX, "screenX", [{ "x": [int$5, float$8] }, { "y": [int$5, float$8] }, { "z": [int$5, float$8] }]),

    screenY: makeFunc$1(processingInstance.screenY, "screenY", [{ "x": [int$5, float$8] }, { "y": [int$5, float$8] }, { "z": [int$5, float$8] }]),

    screenZ: makeFunc$1(processingInstance.screenZ, "screenZ", [{ "x": [int$5, float$8] }, { "y": [int$5, float$8] }, { "z": [int$5, float$8] }])
};

var _Sk$builtin$7 = Sk.builtin;
var int$6 = _Sk$builtin$7.int;
var float$9 = _Sk$builtin$7.float;


{
    bezier: makeFunc$1(processingInstance.bezier, "bezier", [{ "x1": [int$6, float$9] }, { "y1": [int$6, float$9] }, { "z1": [int$6, float$9] }, { "cx1": [int$6, float$9] }, { "cy1": [int$6, float$9] }, { "cz1": [int$6, float$9] }, { "cx2": [int$6, float$9] }, { "cy2": [int$6, float$9] }, { "cz2": [int$6, float$9], optional: optional }, { "x2": [int$6, float$9], optional: optional }, { "y2": [int$6, float$9], optional: optional }, { "z2": [int$6, float$9], optional: optional }]),

    bezierDetail: makeFunc$1(processingInstance.bezierDetail, "bezierDetail", [{ "detail": int$6 }]),

    bezierPoint: makeFunc$1(processingInstance.bezierPoint, "bezierPoint", [{ "a": [int$6, float$9] }, { "b": [int$6, float$9] }, { "c": [int$6, float$9] }, { "d": [int$6, float$9] }, { "t": float$9 }]),

    bezierTangent: makeFunc$1(processingInstance.bezierTangent, "bezierTangent", [{ "a": [int$6, float$9] }, { "b": [int$6, float$9] }, { "c": [int$6, float$9] }, { "d": [int$6, float$9] }, { "t": float$9 }]),

    curve: makeFunc$1(processingInstance.curve, "curve", [{ "x1": [int$6, float$9] }, { "y1": [int$6, float$9] }, { "z1": [int$6, float$9] }, { "x2": [int$6, float$9] }, { "y2": [int$6, float$9] }, { "z2": [int$6, float$9] }, { "x3": [int$6, float$9] }, { "y3": [int$6, float$9] }, { "z3": [int$6, float$9], optional: optional }, { "x4": [int$6, float$9], optional: optional }, { "y4": [int$6, float$9], optional: optional }, { "z4": [int$6, float$9], optional: optional }]),

    curveDetail: makeFunc$1(processingInstance.curveDetail, "curveDetail", [{ "detail": int$6 }]),

    curvePoint: makeFunc$1(processingInstance.curvePoint, "curvePoint", [{ "a": [int$6, float$9] }, { "b": [int$6, float$9] }, { "c": [int$6, float$9] }, { "d": [int$6, float$9] }, { "t": float$9 }]),

    curveTangent: makeFunc$1(processingInstance.curveTangent, "curveTangent"[({ "a": [int$6, float$9] }, { "b": [int$6, float$9] }, { "c": [int$6, float$9] }, { "d": [int$6, float$9] }, { "t": float$9 })]),

    curveTightness: makeFunc$1(processingInstance.curveTightness, "curveTightness", [{ "squishy": int$6 }])
};

var _Sk$builtin$8 = Sk.builtin;
var func$3 = _Sk$builtin$8.func;
var int$8 = _Sk$builtin$8.int;
var list = _Sk$builtin$8.list;
var buildClass$1 = Sk.misceval.buildClass;
var _Sk$ffi$2 = Sk.ffi;
var remapToJs$3 = _Sk$ffi$2.remapToJs;
var remapToPy$3 = _Sk$ffi$2.remapToPy;
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
    var i = processingInstance.loadImage(imfile.v);
    imList.push(img);

    var image = Sk.misceval.callsim(mod.PImage);
    image.v = i;
    return image;
}

function imageRequestImage(filename, extension) {
    var image = Sk.misceval.callsim(mod.PImage);
    image.v = mod.processing.requestImage(filename, extension);
    return image;
}

function imageInit(self, arg1, arg2, arg3) {
    self.v = new mod.processing.PImage(arg1.v, arg2.v, arg3.v);
}

function imageGet(self, x, y, width, height) {
    return self.v.get(x, y, width, height);
}

function imageSet(self, x, y, color) {
    self.v.set(x, y, width, color);
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
    $loc.__init__ = makeFunc$1(imageInit, "__init__", [
    // TODO: implement [] in type in makefunt
    { "width": [int$8, str], optional: optional }, { "height": int$8, optional: optional }, { "format": int$8, allowed: [1, 2, 4] }]);

    $loc.__getattr__ = new func$3(function (self, key) {
        key = remapToJs$3(key);
        if (key === "width") {
            return remapToPy$3(self.v.width);
        }
        if (key === "height") {
            return remapToPy$3(self.v.height);
        }
        if (key === "pixels") {
            return remapToPy$3(self.v.pixels);
        }
    });

    $loc.get = makeFunc$1(imageGet, "get", [{ "x": int$8 }, { "y": int$8 }, { "width": int$8, optional: optional }, { "height": int$8, optional: optional }]);

    $loc.set = makeFunc$1(imageSet, "set", [{ "x": int$8 }, { "y": int$8 }, { "color": PColor }]);

    $loc.copy = makeFunc$1(imageCopy, "copy", [{ "srcImg": [int$8, PImage] }, { "sx": int$8 }, { "sy": int$8 }, { "swidth": int$8 }, { "sheight": int$8 }, { "dx": int$8 }, { "dy": int$8 }, { "dwidth": int$8 }, { "dheight": int$8, optional: optional }]);

    $loc.mask = makeFunc$1(imageMask, "mask", [{ "maskImg": [PImage, list] }]);

    $loc.blend = makeFunc$1(imageBlend, "blend", [{ "srcImg": [int$8, PImage] }, { "x": int$8 }, { "y": int$8 }, { "width": int$8 }, { "height": int$8 }, { "dx": int$8 }, { "dy": int$8 }, { "dwidth": int$8 }, { "dheight": int$8 }, { "MODE": int$8, optional: optional, allowed: [BLEND$1, ADD$1, SUBTRACT$1, LIGHTEST$1, DARKEST$1, DIFFERENCE$1, EXCLUSION, MULTIPLY$1, SCREEN$1, OVERLAY$1, HARD, LIGHT, SOFT_LIGHT$1, DODGE$1, BURN$1] }]);

    $loc.filter = makeFunc$1(imageFilter, "filter", [{ "MODE": int$8, allowed: [THRESHOLD, GRAY, INVERT, POSTERIZE, BLUR, OPAQUE, ERODE, DILATE] }, { "srcImg": PImage, optional: optional }]);

    $loc.save = makeFunc$1(imageSave, "save", [{ "filename": str }]);

    $loc.resize = makeFunc$1(imageResize, "resize", [{ "wide": int$8 }, { "high": int$8 }]);

    $loc.loadPixels = makeFunc$1(imageLoadPixels, "loadPixels");

    $loc.updatePixels = makeFunc$1(imageUpdatePixels, "updatePixels", [{ "x": int$8, optional: optional }, { "y": int$8, optional: optional }, { "w": int$8, optional: optional }, { "h": int$8, optional: optional }]);
}

var PImage = buildClass$1({ __name__: __name__$1 }, imageClass, "PImage", []);

var createImage = new Sk.builtin.func(function (width, height, format) {
    var image = Sk.misceval.callsim(mod.PImage);
    image.v = mod.processing.createImage(width.v, height.v, format.v);
    return image;
});

var image = makeFunc$1(processingInstance.image, "image", [{ "img": PImage }, { "x": int$8 }, { "y": int$8 }, { "width": int$8, optional: optional }, { "height": int$8, optional: optional }]);

var imageMode = makeFunc$1(processingInstance.imageMode, "imageMode", [{ "mode": int$8, allowed: [CORNER$1, CORNERS$1, CENTER$1] }]);

var loadImage = makeFunc$1(imageLoadImage, "loadImage", [{ "image": str }]);

var noTint = makeFunc$1(processingInstance.noTint, "noTint");

var requestImage = makeFunc$1(imageRequestImage, "requestImage", [{ "filename": str }, { "extension": str, optional: optional }]);

var tint = makeFunc$1(processingInstance.tint, "tint", [{ "value1": [PColor, int$8, float] }, { "value2": [int$8, float], optional: optional }, { "value3": [int$8, float], optional: optional }, { "alpha": [int$8, float], optional: optional }]);

var blend = makeFunc$1(processingInstance.blend, "blend", [{ "srcImg": [int$8, PImage] }, { "x": int$8 }, { "y": int$8 }, { "width": int$8 }, { "height": int$8 }, { "dx": int$8 }, { "dy": int$8 }, { "dwidth": int$8 }, { "dheight": int$8 }, { "MODE": int$8, optional: optional, allowed: [BLEND$1, ADD$1, SUBTRACT$1, LIGHTEST$1, DARKEST$1, DIFFERENCE$1, EXCLUSION, MULTIPLY$1, SCREEN$1, OVERLAY$1, HARD, LIGHT, SOFT_LIGHT$1, DODGE$1, BURN$1] }]);

var copy = makeFunc$1(processingInstance.copy, "copy", [{ "srcImg": [int$8, PImage] }, { "sx": int$8 }, { "sy": int$8 }, { "swidth": int$8 }, { "sheight": int$8 }, { "dx": int$8 }, { "dy": int$8 }, { "dwidth": int$8 }, { "dheight": int$8, optional: optional }]);

var filter = makeFunc$1(processingInstance.filter, "filter", [{ "MODE": int$8, allowed: [THRESHOLD, GRAY, INVERT, POSTERIZE, BLUR, OPAQUE, ERODE, DILATE] }, { "srcImg": PImage, optional: optional }]);

var get$1 = makeFunc$1(processingInstance.get, "get", [{ "x": int$8, optional: optional }, { "y": int$8, optional: optional }, { "width": int$8, optional: optional }, { "height": int$8, optional: optional }]);

var loadPixels = makeFunc$1(processingInstance.loadPixels, "loadPixels");

var set$1 = makeFunc$1(processingInstance.set, "set", [{ "x": int$8 }, { "y": int$8 }, { "image": [PColor, PImage] }]);

var updatePixels = makeFunc$1(processingInstance.updatePixels, "updatePixels");

var _Sk$ffi$1 = Sk.ffi;
var remapToPy$2 = _Sk$ffi$1.remapToPy;
var remapToJs$2 = _Sk$ffi$1.remapToJs;
var func$2 = Sk.builtin.func;
var int$7 = Sk.builtin.int;


function environmentClass($gbl, $loc) {
    $loc.__getattr__ = new func$2(function (self, key) {
        switch (remapToJs$2(key)) {
            case "frameCount":
                return remapToPy$2(mod.processing.frameCount);
            case "frameRate":
                return remapToPy$2(mod.processing.frameRate);
            case "height":
                return remapToPy$2(mod.processing.height);
            case "width":
                return remapToPy$2(mod.processing.width);
            case "online":
                return remapToPy$2(mod.processing.online);
            case "focused":
                return remapToPy$2(mod.processing.focused);
            default:
                return undefined;
        }
    });
}

var Environment = Sk.misceval.buildClass({ __name__: __name__$1 }, environmentClass, "Environment", []);

var environment = Sk.misceval.callsim(Environment);

var cursor = makeFunc$1(processingInstance.cursor, "cursor", [{ "image": [PImage, int$7], optional: optional }, { "x": int$7, optional: optional }, { "y": int$7, optional: optional }]);

var noCursor = makeFunc$1(processingInstance.noCursor, "noCursor");

var str$3 = Sk.builtin.str;


{
    loadBytes: makeFunc$1(processingInstance.loadBytes, "loadBytes", [{ "filename": str$3 }]),
    loadStrings: makeFunc$1(processingInstance.loadStrings, "loadStrings"[{ "filename": str$3 }]),
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
var int$9 = _Sk$builtin$9.int;
var float$10 = _Sk$builtin$9.float;
var str$4 = _Sk$builtin$9.str;


{
    textAlign: makeFunc(processingInstance.textAlign, "textAlign", [{ "ALIGN": int$9, allowed: [LEFT, CENTER$2, RIGHT] }, { "YALIGN": int$9, allowed: [TOP, BOTTOM, BASELINE, CENTER$2] }]),

    textLeading: makeFunc(processingInstance.textLeading, "textLeading", [{ "dist": [int$9, float$10] }]),

    textMode: makeFunc(processingInstance.textMode, "textMode", [{ "MODE": int$9, allowed: [MODEL, SCREEN$2, SHAPE] }]),

    textSize: makeFunc(processingInstance.textSize, "textSize", [{ "size": [int$9, float$10] }]),

    textWidth: makeFunc(processingInstance.textWidth, "textWidth", [{ "width": str$4 }])
};

{
    textAscent: makeFunc$1(processingInstance.textAscent, "textAscent"),
    textDescent: makeFunc$1(processingInstance.textDescent, "textDescent")
};

var _Sk$builtin$10 = Sk.builtin;
var func$4 = _Sk$builtin$10.func;
var float$11 = _Sk$builtin$10.float;
var list$1 = _Sk$builtin$10.list;
var buildClass$2 = Sk.misceval.buildClass;


function fontClass($gbl, $loc) {
    $loc.__init__ = makeFunc$1(function (self, input) {
        self.v = new processingInstance.PFont(input);
    }, "__init__", [{ "input ": str }]);

    $loc.list = new func$4(function (self) {
        return new list$1(self.v.list());
    });
}

var PFont = buildClass$2({ __name__: __name__$1 }, fontClass, "PFont", []);

var createFont = makeFunc$1(processingInstance.createFont, "createFont", [{ "name": str }, { "size": float$11 }, { "smooth": bool, optional: optional }, { "charset": str, optional: optional }]);

var loadFont = makeFunc$1(processingInstance.loadFont, "loadFont", [{ "fontname": str }]);

var text = makeFunc$1(processingInstance.text, "text", [{ "data": [str, int, float$11] }, { "x": [int, float$11] }, { "y": [int, float$11] }, { "z": [int, float$11], optional: optional }, { "height": [int, float$11], optional: optional }, { "z": [int, float$11], optional: optional }]);

var textFont = makeFunc$1(processingInstance.textFont, "textFont", [{ "font": PFont }, { "size": [int, float$11], optional: optional }]);

var PApplet$1 = PApplet = {};

var _Sk$builtin$11 = Sk.builtin;
var int$10 = _Sk$builtin$11.int;
var buildClass$3 = Sk.misceval.buildClass;


function graphicsInit(self, width, height, applet) {
    self.v = new processingInstance.PGraphics(width, height, applet);
}

function graphicsClass($gbl, $loc) {
    $loc.__init__ = makeFunc$1(graphicsInit, [{ "width": int$10 }, { "width": int$10 }, { "width": PApplet$1 }]);

    $loc.beginDraw = new Sk.builtin.func(function (self) {
        self.v.beginDraw();
    });

    $loc.endDraw = new Sk.builtin.func(function (self) {
        self.v.endDraw();
    });
}

var PGraphics = buildClass$3({ __name__: __name__$1 }, graphicsClass, "PGraphics", []);

var createGraphics = new Sk.builtin.func(function (width, height, renderer, filename) {
    // createGraphics(width, height, renderer)
    // createGraphics(width, height, renderer, filename)
    var graphics = Sk.misceval.callsim(mod.PGraphics);
    if (typeof filename === "undefined") {
        graphics.v = mod.processing.createGraphics(width.v, height.v, renderer.v);
    } else {
        graphics.v = mod.processing.createGraphics(width.v, height.v, renderer.v, filename.v);
    }
    return graphics;
});

var hint = new Sk.builtin.func(function (item) {
    // hint(item)
    mod.processing.hint(item);
});

var _Sk$ffi$3 = Sk.ffi;
var remapToPy$4 = _Sk$ffi$3.remapToPy;
var func$6 = Sk.builtin.func;


function keyboardClass($gbl, $loc) {
    $loc.__getattr__ = new func$6(function (self, key) {
        key = Sk.ffi.remapToJs(key);
        if (key === "key") {
            return remapToPy$4(mod.processing.key.toString());
        } else if (key === "keyCode") {
            return remapToPy$4(mod.processing.keyCode);
        } else if (key === "keyPressed") {
            return remapToPy$4(mod.processing.keyPressed);
        }
    });
}

var Keyboard = Sk.misceval.buildClass({ __name__: __name__$1 }, keyboardClass, "Keyboard", []);

var keyboard = Sk.misceval.callsim(Keyboard);

var _Sk$builtin$12 = Sk.builtin;
var int$11 = _Sk$builtin$12.int;
var float$12 = _Sk$builtin$12.float;


{
    ambientLight: makeFunc$1(processingInstance.ambientLight, "ambientLight", [{ "v1": [int$11, float$12] }, { "v2": [int$11, float$12] }, { "v3": [int$11, float$12] }, { "x": [int$11, float$12], optional: optional }, { "y": [int$11, float$12], optional: optional }, { "z": [int$11, float$12], optional: optional }]),

    directionalLight: makeFunc$1(processingInstance.directionalLight, "directionalLight", [{ "v1": [int$11, float$12] }, { "v2": [int$11, float$12] }, { "v3": [int$11, float$12] }, { "nx": [int$11, float$12], optional: optional }, { "ny": [int$11, float$12], optional: optional }, { "nz": [int$11, float$12], optional: optional }]),

    lightFalloff: makeFunc$1(processingInstance.lightFalloff, "lightFalloff", [{ "constant": [int$11, float$12] }, { "linear": [int$11, float$12] }, { "quardatic": [int$11, float$12] }]),

    lightSpecular: makeFunc$1(processingInstance.lightSpecular, "lightSpecular", [{ "v1": [int$11, float$12] }, { "v2": [int$11, float$12] }, { "v3": [int$11, float$12] }]),

    lights: makeFunc$1(processingInstance.lights, "lights"),

    noLights: makeFunc$1(processingInstance.noLights, "noLights"),

    normal: makeFunc$1(processingInstance.normal, "normal", [{ "nx": [int$11, float$12] }, { "ny": [int$11, float$12] }, { "nz": [int$11, float$12] }]),

    pointLight: makeFunc$1(processingInstance.pointLight, "pointLight", [{ "v1": [int$11, float$12] }, { "v2": [int$11, float$12] }, { "v3": [int$11, float$12] }, { "nx": [int$11, float$12] }, { "ny": [int$11, float$12] }, { "nz": [int$11, float$12] }]),

    spotLight: makeFunc$1(processingInstance.spotLight, "spotLight", [{ "v1": [int$11, float$12] }, { "v2": [int$11, float$12] }, { "v3": [int$11, float$12] }, { "nx": [int$11, float$12] }, { "ny": [int$11, float$12] }, { "nz": [int$11, float$12] }, { "angle": float$12 }, { "concentration": float$12 }])
};

var _Sk$builtin$13 = Sk.builtin;
var int$12 = _Sk$builtin$13.int;
var float$13 = _Sk$builtin$13.float;


{
    ambient: makeFunc$1(processingInstance.ambient, "ambient", [{ "gray": [int$12, float$13, color] }, { "v1": [int$12, float$13], optional: optional }, { "v2": [int$12, float$13], optional: optional }, { "v3": [int$12, float$13], optional: optional }]),

    emissive: makeFunc$1(processingInstance.emissive, "emissive", [{ "gray": [int$12, float$13, color] }, { "v1": [int$12, float$13], optional: optional }, { "v2": [int$12, float$13], optional: optional }, { "v3": [int$12, float$13], optional: optional }]),

    shininess: makeFunc$1(processingInstance.shininess, "shininess", [{ "shine": float$13 }]),

    specular: makeFunc$1(processingInstance.specular, "specular", [{ "gray": [int$12, float$13, PColor] }, { "v1": [int$12, float$13], optional: optional }, { "v2": [int$12, float$13], optional: optional }, { "v3": [int$12, float$13], optional: optional }])
};

var _Sk$ffi$4 = Sk.ffi;
var remapToPy$5 = _Sk$ffi$4.remapToPy;
var remapToJs$5 = _Sk$ffi$4.remapToJs;
var _Sk$builtin$14 = Sk.builtin;
var func$7 = _Sk$builtin$14.func;
var int_$1 = _Sk$builtin$14.int_;


function mouseClass($gbl, $loc) {
    $loc.__getattr__ = new func$7(function (self, key) {
        switch (remapToJs$5(key)) {
            case "x":
                return remapToPy$5(mod.processing.mouseX);
            case "y":
                return remapToPy$5(mod.processing.mouseY);
            case "px":
                return remapToPy$5(mod.processing.pmouseX);
            case "py":
                return remapToPy$5(mod.processing.pmouseY);
            case "pressed":
                return remapToPy$5(mod.processing.__mousePressed);
            case "button":
                return remapToPy$5(mod.processing.mouseButton);
            default:
                return undefined;
        }
    });
}

var Mouse = Sk.misceval.buildClass({ __name__: __name__$1 }, mouseClass, "Mouse", []);
var mouse = Sk.misceval.callsim(Mouse);

var mouseX = new func$7(function () {
    return new int_$1(mod.processing.mouseX);
});

var mouseY = new func$7(function () {
    return new int_$1(mod.processing.mouseY);
});

var pmouseX = new func$7(function () {
    return new int_$1(mod.processing.pmouseX);
});

var pmouseY = new func$7(function () {
    return new int_$1(mod.processing.pmouseY);
});

var _Sk$builtin$15 = Sk.builtin;
var object = _Sk$builtin$15.object;
var str$5 = _Sk$builtin$15.str;
var list$2 = _Sk$builtin$15.list;


{
    println: makeFunc$1(processing.println, "println", [{ "data": object }]),

    save: makeFunc$1(processing.save, "save", [{ "filename": str$5 }]),

    saveFrame: makeFunc$1(processing.saveFrame, "saveFrame", [{ "filename": str$5 }, { "ext": str$5, allowed: ["tif", "tga", "jpg", "png"] }]),

    saveStrings: makeFunc$1(processing.saveStrings, "saveStrings", [{ "filename": str$5 }, { "strings": list$2 }]),

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

var _Sk$builtin$16 = Sk.builtin;
var float$14 = _Sk$builtin$16.float;
var int$13 = _Sk$builtin$16.int;


{
    noise: makeFunc$1(processingInstance.noise, "noise", [{ "x": float$14 }, { "y": float$14, optional: optional }, { "z": float$14, optional: optional }]),

    noiseDetail: makeFunc$1(processingInstance.noiseDetail, "noiseDetail", [{ "octave": int$13 }, { "falloff": float$14 }]),

    noiseSeed: makeFunc$1(processingInstance.noiseSeed, "noiseSeed", [{ "value": int$13 }]),

    randomSeed: makeFunc$1(processingInstance.randomSeed, "randomSeed", [{ "value": int$13 }]),

    random: makeFunc$1(processingInstance.random, "random", [{ low: [int$13, float$14] }, { high: [int$13, float$14], optional: optional }])
};

var _Sk$ffi$5 = Sk.ffi;
var remapToJs$6 = _Sk$ffi$5.remapToJs;
var remapToPy$6 = _Sk$ffi$5.remapToPy;
var _Sk$misceval = Sk.misceval;
var buildClass$4 = _Sk$misceval.buildClass;
var callsim$1 = _Sk$misceval.callsim;
var _Sk$builtin$17 = Sk.builtin;
var list$3 = _Sk$builtin$17.list;
var func$8 = _Sk$builtin$17.func;


function screenClass($gbl, $loc) {
    $loc.__init__ = new func$8(function (self) {
        self.pixels = null;
    });

    $loc.__getattr__ = new func$8(function (self, key) {
        key = remapToJs$6(key);
        switch (key) {
            case "height":
                return remapToPy$6(processingInstance.height);
            case "width":
                return remapToPy$6(processingInstance.width);
            case "pixels":
                if (self.pixels == null) {
                    self.pixels = new list$3(processingInstance.pixels.toArray());
                }
                return self.pixels;
        }
    });
}

var Screen = buildClass$4({ __name__: __name__$1 }, screenClass, "Screen", []);

var screen = callsim$1(Screen);

var CORNER$2 = constants.CORNER;
var CORNERS$2 = constants.CORNERS;
var CENTER$3 = constants.CENTER;
var _Sk$builtin$18 = Sk.builtin;
var str$6 = _Sk$builtin$18.str;
var int$14 = _Sk$builtin$18.int;
var float$15 = _Sk$builtin$18.float;


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
        var new_shape = Sk.misceval.callsim(PShape);
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
        key = remapToJs(key);
        switch (key) {
            case "width":
                return remapToPy(self.v.width);
            case "height":
                return remapToPy(self.v.height);
        }
    });

    $loc.isVisible = makeFunc$1(shapeIsVisible, "isVisible");

    $loc.setVisible = makeFunc$1(shapeSetVisible, "setVisible"[{ "value": bool }]);

    $loc.disableStyle = makeFunc$1(shapeDisableStyle, "disableStyle");

    $loc.enableStyle = makeFunc$1(shapeEnableStyle, "enableStyle");

    $loc.getChild = makeFunc$1(shapeGetChild, "getChild", [{ "shape": PShape }]);

    $loc.translate = makeFunc$1(shapeTranslate, "translate", [{ "x": [float$15, int$14] }, { "y": [float$15, int$14] }, { "z": [float$15, int$14], optional: optional }]);

    $loc.rotate = makeFunc$1(shapeRotate, "rotate", [{ "angle": float$15 }]);

    $loc.rotateX = makeFunc$1(shapeRotateX, "rotateX", [{ "angle": float$15 }]);

    $loc.rotateY = makeFunc$1(shapeRotateY, "rotateY", [{ "angle": float$15 }]);

    $loc.rotateZ = makeFunc$1(shapeRotateZ, "rotateZ", [{ "angle": float$15 }]);

    $loc.scale = makeFunc$1(shapeScale, "scale"[({ "x": float$15 }, { "y": float$15, optional: optional }, { "z": float$15, optional: optional })]);
}

var PShape = Sk.misceval.buildClass({ __name__: __name__ }, shapeClass, "PShape", []);

{
    loadShape: makeFunc$1(processingInstance.loadShape, "loadShape", [{ "filename": str$6 }]),

    shape: makeFunc$1(processingInstance.shape, [{ "sh": PShape }, { "x": float$15 }, { "y": float$15 }, { "width": float$15, optional: optional }, { "height": float$15, optional: optional }]),

    shapeMode: makeFunc$1(processingInstance.shapeMode, [{ "img": int$14, allowed: [CORNER$2, CORNERS$2, CENTER$3] }])
};

var int$15 = Sk.builtin.int;


function loop() {
    if (isInitialised) {
        throw new Sk.builtin.Exception("loop() should be called after run()");
    }

    setLooping(true);
    processingInstance.loop();
}

function noLoop() {
    if (isInitialised()) {
        throw new Sk.builtin.Exception("noLoop() should be called after run()");
    }

    setLooping(false);
    processingInstance.noLoop();
}

{
    loop: makeFunc$1(loop, "loop"),
    noLoop: makeFunc$1(noLoop, "noLoop"),

    width: makeFunc$1(function () {
        return processingInstance.width;
    }, "width"),
    height: makeFunc$1(function () {
        return processingInstance.height;
    }, "height"),

    size: makeFunc$1(processingInstance.size, "size", [{ "width": int$15 }, { "height": int$15 }]),

    exit: makeFunc$1(processingInstance.exit)
};

{
    day: makeFunc$1(processingInstance.day),
    hour: makeFunc$1(processingInstance.hour),
    millis: makeFunc$1(processingInstance.millis),
    minute: makeFunc$1(processingInstance.minute),
    month: makeFunc$1(processingInstance.month),
    second: makeFunc$1(processingInstance.second),
    year: makeFunc$1(processingInstance.year)
};

var float$16 = Sk.builtin.float;


{
    applyMatrix: makeFunc$1(processingInstance.applyMatrix, "applyMatrix", [{ "n00": float$16 }, { "n01": float$16 }, { "n02": float$16 }, { "n03": float$16 }, { "n04": float$16 }, { "n05": float$16 }, { "n06": float$16 }, { "n07": float$16 }, { "n08": float$16 }, { "n09": float$16 }, { "n10": float$16 }, { "n11": float$16 }, { "n12": float$16 }, { "n13": float$16 }, { "n14": float$16 }, { "n15": float$16 }]),

    popMatrix: makeFunc$1(processingInstance.popMatrix, "popMatrix"),
    printMatrix: makeFunc$1(processingInstance.printMatrix, "printMatrix"),
    pushMatrix: makeFunc$1(processingInstance.pushMatrix, "pushMatrix"),
    resetMatrix: makeFunc$1(processingInstance.resetMatrix, "resetMatrix"),

    rotate: makeFunc$1(processingInstance.rotate, "rotate", [{ "angle": float$16 }]),

    rotateX: makeFunc$1(processingInstance.rotateX, "rotateX", [{ "angle": float$16 }]),

    rotateY: makeFunc$1(processingInstance.rotateY, "rotateY", [{ "angle": float$16 }]),

    rotateZ: makeFunc$1(processingInstance.rotateZ, "rotateZ", [{ "angle": float$16 }]),

    scale: makeFunc$1(processingInstance.scale, "scale", [{ "size": float$16 }, { "y": float$16, optional: optional }, { "z": float$16, optional: optional }]),

    translate: makeFunc$1(processingInstance.translate, "translate", [{ "x": float$16 }, { "y": float$16 }, { "z": float$16, optional: optional }])
};

var _Sk$builtin$19 = Sk.builtin;
var int$16 = _Sk$builtin$19.int;
var float$17 = _Sk$builtin$19.float;


{
    degrees: makeFunc$1(processingInstance.degrees, "degrees", [{ "angle": [int$16, float$17] }]),

    radians: makeFunc$1(processingInstance.radians, "radians", [{ "angle": [int$16, float$17] }])
};

var _Sk$builtin$20 = Sk.builtin;
var int$17 = _Sk$builtin$20.int;
var float$18 = _Sk$builtin$20.float;
var callsim$2 = Sk.misceval.callsim;


function vectorInit(self, x, y, z) {
    self.v = processingInstance.PVector(x, y, z);
}

function vectorSet(self, x, y, z) {
    self.v.set(x, y, z);
}

function vectorGet(self) {
    var vector = callsim$2(PVector);
    vector.v = self.v.get();
    return vector;
}

function vectorAdd(self, vec) {
    var new_vec = callsim$2(mod.PVector);
    new_vec.v = self.v.add(vec);
    return new_vec;
}

function vectorSub(self, vec) {
    var new_vec = callsim$2(mod.PVector);
    new_vec.v = self.v.sub(vec);
    return new_vec;
}

function vectorMult(self, vec) {
    var new_vec = callsim$2(mod.PVector);
    new_vec.v = self.v.mult(vec);
    return new_vec;
}

function vectorDiv(self, vec) {
    var new_vec = callsim$2(mod.PVector);
    new_vec.v = self.v.div(vec);
    return new_vec;
}

function vectorDist(self, vec) {
    var new_vec = callsim$2(mod.PVector);
    new_vec.v = self.v.dist(vec);
    return new_vec;
}

function vectorAngleBetween(self, vec) {
    var new_vec = callsim$2(mod.PVector);
    new_vec.v = self.v.angleBetween(vec);
    return new_vec;
}

function vectorLimit(self, value) {
    self.v.limit(value);
}

function vectorClass($gbl, $loc) {
    $loc.__init__ = makeFunc$1(vectorInit, "__init__", [{ "x": int$17 }, { "y": int$17, optional: optional }, { "z": int$17, optional: optional }]);

    $loc.__getattr__ = new Sk.builtin.func(function (self, key) {
        key = Sk.ffi.remapToJs(key);
        if (key === "x") {
            return remapToPy(self.v.x);
        } else if (key === "y") {
            return remapToPy(self.v.y);
        } else if (key === "z") {
            return Sk.builtin.assk$(self.v.z);
        }
    });

    $loc.get = makeFunc$1(vectorGet, "get"), $loc.set = makeFunc$1(vectorSet, "set", [{ "x": int$17 }, { "x": int$17, optional: optional }, { "x": int$17, optional: optional }]);

    $loc.mag = makeFunc$1(function (self) {
        return self.v.mag();
    }, "mag");

    $loc.add = makeFunc$1(vectorAdd, "add", [{ "vector": PVector }]);

    $loc.sub = makeFunc$1(vectorSub, "sub", [{ "vector": PVector }]);

    $loc.mult = makeFunc$1(vectorMult, "mult", [{ "vector": PVector }]);

    $loc.div = makeFunc$1(vectorDiv, "div", [{ "vector": PVector }]);

    $loc.dist = makeFunc$1(vectorDist, "dist", [{ "vector": PVector }]);

    $loc.dot = makeFunc$1(vectorDot, "dot", [{ "x": [int$17, float$18] }, { "y": [int$17, float$18], optional: optional }, { "z": [int$17, float$18], optional: optional }]);

    $loc.cross = makeFunc$1(vectorCross, "cross", [{ "vector": PVector }]);

    $loc.normalize = makeFunc$1(function (self) {
        return self.normalize();
    }, "normalize");

    $loc.limit = makeFunc$1(vectorLimit, "limit", [{ "value": float$18 }]);

    $loc.angleBetween = makeFunc$1(vectorAngleBetween, "angleBetween", [{ "vector": PVector }]);

    $loc.array = makeFunc$1(function (self) {
        return self.v.array();
    }, "array");
}

Sk.misceval.buildClass({ __name__: __name__$1 }, vectorClass, "PVector", []);

var _Sk$builtin$21 = Sk.builtin;
var float$19 = _Sk$builtin$21.float;
var int$18 = _Sk$builtin$21.int;
var IMAGE = constants.IMAGE;
var NORMALIZED = constants.NORMALIZED;


{
    beginShape: makeFunc$1(prcessing.beginShape, "beginShape"),

    endShape: makeFunc$1(prcessing.endShape, "endShape"),

    vertex: makeFunc$1(prcessing.vertex, "vertex", [{ "x": float$19 }, { "y": float$19 }, { "z": float$19 }, { "u": float$19, optional: optional }, { "v": float$19, optional: optional }]),

    bezierVertex: makeFunc$1(prcessing.bezierVertex, "bezierVertex", [{ "cx1": float$19 }, { "cy1": float$19 }, { "cz1": float$19 }, { "cx2": float$19 }, { "cy2": float$19 }, { "cz2": float$19 }, { "x": float$19, optional: optional }, { "y": float$19, optional: optional }, { "z": float$19, optional: optional }]),

    curveVertex: makeFunc$1(prcessing.curveVertex, "curveVertex", [{ "x": float$19 }, { "y": float$19 }, { "z": float$19, optional: optional }]),

    texture: makeFunc$1(texture, "texture"[{ "img": PImage }]),

    textureMode: makeFunc$1(textureMode, "textureMode", [{ "img": int$18, allowed: [IMAGE, NORMALIZED] }])
};

var str$7 = Sk.builtin.str;


{
    link: makeFunc$1(processingInstance.link, [{ "url": str$7 }, { "target": str$7, optional: optional }]),
    status: makeFunc$1(processingInstance.status, [{ "text": str$7 }])
};

var looping = true;

var mod$1 = {};

var processingInstance = null;

var imList$1 = [];

function isInitialised() {
    return processingInstance == null;
}

function setProperty(name, value) {
    mod$1[name] = value;
}

function setLooping(bool) {
    looping = bool;
}

function pushImage(url) {
    imList$1.push(url);
}

function main(name) {
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
    mod$1.run = new Sk.builtin.func(function () {
        function sketchProc(processing) {

            // processing.setup = function() {
            //     if Sk.globals["setup"]
            //         Sk.misceval.callsim(Sk.globals["setup"])
            // }


            // FIXME if no Sk.globals["draw"], then no need for this
            processing.draw = function () {
                // if there are pending image loads then just use the natural looping calls to
                // retry until all the images are loaded.  If noLoop was called in setup then make
                // sure to revert to that after all the images in hand.
                var wait = false;

                for (var i in imList$1) {
                    if (imList$1[i].width === 0) {
                        wait = true;
                    }
                }

                if (wait === true) {
                    if (looping === true) {
                        return;
                    } else {
                        processing.loop();
                        return;
                    }
                } else {
                    if (looping === false) {
                        processing.noLoop();
                    }
                }

                mod$1.frameCount = processing.frameCount;
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
                    processing[callBacks[cb]] = new Function("try {Sk.misceval.callsim(Sk.globals['" + callBacks[cb] + "']);} catch(e) {Sk.uncaughtException(e);}");
                }
            }
        }

        var canvas = document.getElementById(Sk.canvas);
        if (canvas.tagName !== "CANVAS") {
            var mydiv = canvas;
            canvas = document.createElement('canvas');
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

        mod$1.p = new window.Processing(canvas, sketchProc);
    });

    return mod$1;
}

exports.isInitialised = isInitialised;
exports.setProperty = setProperty;
exports.setLooping = setLooping;
exports.pushImage = pushImage;
exports.main = main;
exports['default'] = processingInstance;

Object.defineProperty(exports, '__esModule', { value: true });

})));
