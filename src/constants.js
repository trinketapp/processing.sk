export const X = new Sk.builtin.int_(0);
export const Y = new Sk.builtin.int_(1);
export const Z = new Sk.builtin.int_(2);

export const R = new Sk.builtin.int_(3);
export const G = new Sk.builtin.int_(4);
export const B = new Sk.builtin.int_(5);
export const A = new Sk.builtin.int_(6);

export const U = new Sk.builtin.int_(7);
export const V = new Sk.builtin.int_(8);

export const NX = new Sk.builtin.int_(9);
export const NY = new Sk.builtin.int_(10);
export const NZ = new Sk.builtin.int_(11);

export const EDGE = new Sk.builtin.int_(12);

// Stroke
export const SR = new Sk.builtin.int_(13);
export const SG = new Sk.builtin.int_(14);
export const SB = new Sk.builtin.int_(15);
export const SA = new Sk.builtin.int_(16);

export const SW = new Sk.builtin.int_(17);

// Transformations (2D and 3D)
export const TX = new Sk.builtin.int_(18);
export const TY = new Sk.builtin.int_(19);
export const TZ = new Sk.builtin.int_(20);

export const VX = new Sk.builtin.int_(21);
export const VY = new Sk.builtin.int_(22);
export const VZ = new Sk.builtin.int_(23);
export const VW = new Sk.builtin.int_(24);

// Material properties
export const AR = new Sk.builtin.int_(25);
export const AG = new Sk.builtin.int_(26);
export const AB = new Sk.builtin.int_(27);

export const DR = new Sk.builtin.int_(3);
export const DG = new Sk.builtin.int_(4);
export const DB = new Sk.builtin.int_(5);
export const DA = new Sk.builtin.int_(6);

export const SPR = new Sk.builtin.int_(28);
export const SPG = new Sk.builtin.int_(29);
export const SPB = new Sk.builtin.int_(30);

export const SHINE = new Sk.builtin.int_(31);

export const ER = new Sk.builtin.int_(32);
export const EG = new Sk.builtin.int_(33);
export const EB = new Sk.builtin.int_(34);

export const BEEN_LIT = new Sk.builtin.int_(35);

export const VERTEX_FIELD_COUNT = new Sk.builtin.int_(36);

// Shape drawing modes
export const CENTER = new Sk.builtin.int_(3);
export const RADIUS = new Sk.builtin.int_(2);
export const CORNERS = new Sk.builtin.int_(1);
export const CORNER = new Sk.builtin.int_(0);
export const DIAMETER = new Sk.builtin.int_(3);

// Text vertical alignment modes
// Default vertical alignment for text placement
export const BASELINE = new Sk.builtin.int_(0);
// Align text to the top
export const TOP = new Sk.builtin.int_(101);
// Align text from the bottom, using the baseline
export const BOTTOM = new Sk.builtin.int_(102);

// UV Texture coordinate modes
export const NORMAL = new Sk.builtin.int_(1);
export const NORMALIZED = new Sk.builtin.int_(1);
export const IMAGE = new Sk.builtin.int_(2);

// Text placement modes
export const MODEL = new Sk.builtin.int_(4);
export const SHAPE = new Sk.builtin.int_(5);

// Lighting modes
export const AMBIENT = new Sk.builtin.int_(0);
export const DIRECTIONAL = new Sk.builtin.int_(1);
//POINT:     2, Shared with Shape constant
export const SPOT = new Sk.builtin.int_(3);

// Color modes
export const RGB = new Sk.builtin.int_(1);
export const ARGB = new Sk.builtin.int_(2);
export const HSB = new Sk.builtin.int_(3);
export const ALPHA = new Sk.builtin.int_(4);
export const CMYK = new Sk.builtin.int_(5);

// Image file types
export const TIFF = new Sk.builtin.int_(0);
export const TARGA = new Sk.builtin.int_(1);
export const JPEG = new Sk.builtin.int_(2);
export const GIF = new Sk.builtin.int_(3);

// Stroke modes
export const MITER = new Sk.builtin.str("miter");
export const BEVEL = new Sk.builtin.str("bevel");
export const ROUND = new Sk.builtin.str("round");
export const SQUARE = new Sk.builtin.str("butt");
export const PROJECT = new Sk.builtin.str("square");

// Renderer modes
export const P2D = new Sk.builtin.int_(1);
export const JAVA2D = new Sk.builtin.int_(1);
export const WEBGL = new Sk.builtin.int_(2);
export const P3D = new Sk.builtin.int_(2);
export const OPENGL = new Sk.builtin.int_(2);
export const PDF = new Sk.builtin.int_(0);
export const DXF = new Sk.builtin.int_(0);

// Platform IDs
export const OTHER = new Sk.builtin.int_(0);
export const WINDOWS = new Sk.builtin.int_(1);
export const MAXOSX = new Sk.builtin.int_(2);
export const LINUX = new Sk.builtin.int_(3);

export const EPSILON = new Sk.builtin.float_(0.0001);

export const MAX_FLOAT = new Sk.builtin.float_(3.4028235e+38);
export const MIN_FLOAT = new Sk.builtin.float_(-3.4028235e+38);
export const MAX_INT = new Sk.builtin.int_(2147483647);
export const MIN_INT = new Sk.builtin.int_(-2147483648);

// Constants
export const HALF_PI = new Sk.builtin.float_(Math.PI / 2.0);
export const THIRD_PI = new Sk.builtin.float_(Math.PI / 3.0);
export const PI = new Sk.builtin.float_(Math.PI);
export const TWO_PI = new Sk.builtin.float_(Math.PI * 2.0);
export const TAU = new Sk.builtin.float_(Math.PI * 2.0);
export const QUARTER_PI = new Sk.builtin.float_(Math.PI / 4.0);

export const DEG_TO_RAD = new Sk.builtin.float_(Math.PI / 180);
export const RAD_TO_DEG = new Sk.builtin.float_(180 / Math.PI);

export const WHITESPACE = Sk.builtin.str(" \t\n\r\f\u00A0");
// Shape modes
export const POINT = new Sk.builtin.int_(2);
export const POINTS = new Sk.builtin.int_(2);
export const LINE = new Sk.builtin.int_(4);
export const LINES = new Sk.builtin.int_(4);
export const TRIANGLE = new Sk.builtin.int_(8);
export const TRIANGLES = new Sk.builtin.int_(9);
export const TRIANGLE_FAN = new Sk.builtin.int_(11);
export const TRIANGLE_STRIP = new Sk.builtin.int_(10);
export const QUAD = new Sk.builtin.int_(16);
export const QUADS = new Sk.builtin.int_(16);
export const QUAD_STRIP = new Sk.builtin.int_(17);
export const POLYGON = new Sk.builtin.int_(20);

export const PATH = new Sk.builtin.int_(21);
export const RECT = new Sk.builtin.int_(30);
export const ELLIPSE = new Sk.builtin.int_(31);
export const ARC = new Sk.builtin.int_(32);
export const SPHERE = new Sk.builtin.int_(40);
export const BOX = new Sk.builtin.int_(41);

export const GROUP = new Sk.builtin.int_(0);
export const PRIMITIVE = new Sk.builtin.int_(1);
//PATH:         21, // shared with Shape PATH
export const GEOMETRY = new Sk.builtin.int_(3);

// Shape Vertex
export const VERTEX = new Sk.builtin.int_(0);
export const BEZIER_VERTEX = new Sk.builtin.int_(1);
export const CURVE_VERTEX = new Sk.builtin.int_(2);
export const BREAK = new Sk.builtin.int_(3);
export const CLOSESHAPE = new Sk.builtin.int_(4);

// Blend modes
export const REPLACE = new Sk.builtin.int_(0);
export const BLEND = new Sk.builtin.int_(1 << 0);
export const ADD = new Sk.builtin.int_(1 << 1);
export const SUBTRACT = new Sk.builtin.int_(1 << 2);
export const LIGHTEST = new Sk.builtin.int_(1 << 3);
export const DARKEST = new Sk.builtin.int_(1 << 4);
export const DIFFERENCE = new Sk.builtin.int_(1 << 5);
export const EXCLUSION = new Sk.builtin.int_(1 << 6);
export const MULTIPLY = new Sk.builtin.int_(1 << 7);
export const SCREEN = new Sk.builtin.int_(1 << 8);
export const OVERLAY = new Sk.builtin.int_(1 << 9);
export const HARD_LIGHT = new Sk.builtin.int_(1 << 10);
export const SOFT_LIGHT = new Sk.builtin.int_(1 << 11);
export const DODGE = new Sk.builtin.int_(1 << 12);
export const BURN = new Sk.builtin.int_(1 << 13);

// Color component bit masks
export const ALPHA_MASK = new Sk.builtin.int_(0xff000000);
export const RED_MASK = new Sk.builtin.int_(0x00ff0000);
export const GREEN_MASK = new Sk.builtin.int_(0x0000ff00);
export const BLUE_MASK = new Sk.builtin.int_(0x000000ff);

// Projection matrices
export const CUSTOM = new Sk.builtin.int_(0);
export const ORTHOGRAPHIC = new Sk.builtin.int_(2);
export const PERSPECTIVE = new Sk.builtin.int_(3);

// Cursors
export const ARROW = new Sk.builtin.str("default");
export const CROSS = new Sk.builtin.str("crosshair");
export const HAND = new Sk.builtin.str("pointer");
export const MOVE = new Sk.builtin.str("move");
export const TEXT = new Sk.builtin.str("text");
export const WAIT = new Sk.builtin.str("wait");
export const NOCURSOR = Sk.builtin.assk$("url('data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='), auto", Sk.builtin.nmber.str);

// Hints
export const DISABLE_OPENGL_2X_SMOOTH = new Sk.builtin.int_(1);
export const ENABLE_OPENGL_2X_SMOOTH = new Sk.builtin.int_(-1);
export const ENABLE_OPENGL_4X_SMOOTH = new Sk.builtin.int_(2);
export const ENABLE_NATIVE_FONTS = new Sk.builtin.int_(3);
export const DISABLE_DEPTH_TEST = new Sk.builtin.int_(4);
export const ENABLE_DEPTH_TEST = new Sk.builtin.int_(-4);
export const ENABLE_DEPTH_SORT = new Sk.builtin.int_(5);
export const DISABLE_DEPTH_SORT = new Sk.builtin.int_(-5);
export const DISABLE_OPENGL_ERROR_REPORT = new Sk.builtin.int_(6);
export const ENABLE_OPENGL_ERROR_REPORT = new Sk.builtin.int_(-6);
export const ENABLE_ACCURATE_TEXTURES = new Sk.builtin.int_(7);
export const DISABLE_ACCURATE_TEXTURES = new Sk.builtin.int_(-7);
export const HINT_COUNT = new Sk.builtin.int_(10);

// Shape closing modes
export const OPEN = new Sk.builtin.int_(1);
export const CLOSE = new Sk.builtin.int_(2);

// Filter/convert types
export const BLUR = new Sk.builtin.int_(11);
export const GRAY = new Sk.builtin.int_(12);
export const INVERT = new Sk.builtin.int_(13);
export const OPAQUE = new Sk.builtin.int_(14);
export const POSTERIZE = new Sk.builtin.int_(15);
export const THRESHOLD = new Sk.builtin.int_(16);
export const ERODE = new Sk.builtin.int_(17);
export const DILATE = new Sk.builtin.int_(18);

// Both key and keyCode will be equal to these values
export const BACKSPACE = new Sk.builtin.int_(8);
export const TAB = new Sk.builtin.int_(9);
export const ENTER = new Sk.builtin.int_(10);
export const RETURN = new Sk.builtin.int_(13);
export const ESC = new Sk.builtin.int_(27);
export const DELETE = new Sk.builtin.int_(127);
export const CODED = new Sk.builtin.int_(0xffff);

// p.key will be CODED and p.keyCode will be this value
export const SHIFT = new Sk.builtin.int_(16);
export const CONTROL = new Sk.builtin.int_(17);
export const ALT = new Sk.builtin.int_(18);
export const CAPSLK = new Sk.builtin.int_(20);
export const PGUP = new Sk.builtin.int_(33);
export const PGDN = new Sk.builtin.int_(34);
export const END = new Sk.builtin.int_(35);
export const HOME = new Sk.builtin.int_(36);
export const LEFT = new Sk.builtin.int_(37);
export const UP = new Sk.builtin.int_(38);
export const RIGHT = new Sk.builtin.int_(39);
export const DOWN = new Sk.builtin.int_(40);
export const F1 = new Sk.builtin.int_(112);
export const F2 = new Sk.builtin.int_(113);
export const F3 = new Sk.builtin.int_(114);
export const F4 = new Sk.builtin.int_(115);
export const F5 = new Sk.builtin.int_(116);
export const F6 = new Sk.builtin.int_(117);
export const F7 = new Sk.builtin.int_(118);
export const F8 = new Sk.builtin.int_(119);
export const F9 = new Sk.builtin.int_(120);
export const F10 = new Sk.builtin.int_(121);
export const F11 = new Sk.builtin.int_(122);
export const F12 = new Sk.builtin.int_(123);
export const NUMLK = new Sk.builtin.int_(144);
export const META = new Sk.builtin.int_(157);
export const INSERT = new Sk.builtin.int_(155);

// PJS defined constants
export const SINCOS_LENGTH = new Sk.builtin.int_(720);
export const PRECISIONB = new Sk.builtin.int_(15);
export const PRECISIONF = new Sk.builtin.int_(1 << 15);
export const PREC_MAXVAL = new Sk.builtin.int_((1 << 15) - 1);
export const PREC_ALPHA_SHIFT = new Sk.builtin.int_(24 - 15);
export const PREC_RED_SHIFT = new Sk.builtin.int_(16 - 15);
export const NORMAL_MODE_AUTO = new Sk.builtin.int_(0);
export const NORMAL_MODE_SHAPE = new Sk.builtin.int_(1);
export const NORMAL_MODE_VERTEX = new Sk.builtin.int_(2);
export const MAX_LIGHTS = new Sk.builtin.int_(8);