import processing, { pushImage } from "./processing.js";
import Sk from "./skulpt.js";
import { makeFunc, optional, __name__, self } from "./utils.js";
import PColor from "./color.js";
import constants from "./constants.js";

const { func, int, list, str, float } = Sk.builtin;
const { buildClass } = Sk.misceval;
const { remapToJs, remapToPy } = Sk.ffi;
const { BLEND, ADD, SUBTRACT, LIGHTEST, DARKEST, DIFFERENCE, EXCLUSION,
    MULTIPLY, SCREEN, OVERLAY, HARD, LIGHT, SOFT_LIGHT, DODGE, BURN,
    THRESHOLD, GRAY, INVERT, POSTERIZE, BLUR, OPAQUE, ERODE, DILATE,
    CORNER, CORNERS, CENTER } = constants;

function imageLoadImage(img) {
    var i = processing.loadImage(img);
    pushImage(img);

    var image = Sk.misceval.callsim(PImage);
    image.v = i;
    return image;
}

function imageRequestImage(filename, extension) {
    var image = Sk.misceval.callsim(PImage);
    image.v = processing.requestImage(filename, extension);
    return image;
}

function imageInit(self, arg1, arg2, arg3) {
    self.v = new processing.PImage(arg1.v, arg2.v, arg3.v);
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
        { "width": [ int, str ], optional },
        { "height": int, optional },
        { "format": int, allowed: [ 1, 2, 4 ] }
    ]);

    $loc.__getattr__ = new func(function (self, key) {
        key = remapToJs(key);
        if (key === "width") {
            return remapToPy(self.v.width);
        }
        if (key === "height") {
            return remapToPy(self.v.height);
        }
        if (key === "pixels") {
            return remapToPy(self.v.pixels);
        }
    });

    $loc.get = makeFunc(imageGet, "get", [
        self,
        { "x": int },
        { "y": int },
        { "width": int, optional },
        { "height": int, optional }
    ]);

    $loc.set = makeFunc(imageSet, "set", [
        self,
        { "x": int },
        { "y": int },
        { "color": PColor }
    ]);

    $loc.copy = makeFunc(imageCopy, "copy", [
        self,
        { "srcImg": [ int, PImage ]},
        { "sx": int },
        { "sy": int },
        { "swidth": int },
        { "sheight": int },
        { "dx": int },
        { "dy": int },
        { "dwidth": int },
        { "dheight": int, optional }
    ]);

    $loc.mask = makeFunc(imageMask, "mask", [
        self,
        { "maskImg": [PImage, list] }
    ]);

    $loc.blend = makeFunc(imageBlend, "blend", [
        self,
        { "srcImg": [ int, PImage ]},
        { "x": int },
        { "y": int },
        { "width": int },
        { "height": int },
        { "dx": int },
        { "dy": int },
        { "dwidth": int },
        { "dheight": int },
        { "MODE": int, optional, allowed: [ BLEND, ADD, SUBTRACT, LIGHTEST, DARKEST, DIFFERENCE, EXCLUSION,
            MULTIPLY, SCREEN, OVERLAY, HARD, LIGHT, SOFT_LIGHT, DODGE, BURN ]}
    ]);

    $loc.filter = makeFunc(imageFilter, "filter", [
        self,
        { "MODE": int, allowed: [ THRESHOLD, GRAY, INVERT, POSTERIZE, BLUR, OPAQUE, ERODE, DILATE ]},
        { "srcImg": PImage, optional }
    ]);

    $loc.save = makeFunc(imageSave, "save", [
        self,
        { "filename": str }
    ]);

    $loc.resize = makeFunc(imageResize, "resize", [
        self,
        { "wide": int },
        { "high": int }
    ]);

    $loc.loadPixels = makeFunc(imageLoadPixels, "loadPixels");

    $loc.updatePixels = makeFunc(imageUpdatePixels, "updatePixels", [
        self,
        { "x": int, optional},
        { "y": int, optional},
        { "w": int, optional},
        { "h": int, optional}
    ]);
}

const PImage = buildClass({ __name__ }, imageClass, "PImage", []);

export default PImage;

export const createImage = new Sk.builtin.func(function (width, height, format) {
    var image = Sk.misceval.callsim(PImage);
    image.v = processing.createImage(width.v, height.v, format.v);
    return image;
});

export const image = makeFunc(processing.image, "image", [
    { "img": PImage },
    { "x": int },
    { "y": int },
    { "width": int, optional },
    { "height": int, optional }
]);

export const imageMode = makeFunc(processing.imageMode, "imageMode", [
    { "mode": int, allowed: [ CORNER, CORNERS, CENTER ] }
]);

export const loadImage = makeFunc(imageLoadImage, "loadImage", [
    { "image": str }
]);

export const noTint = makeFunc(processing.noTint, "noTint");

export const requestImage = makeFunc(imageRequestImage, "requestImage", [
    { "filename": str },
    { "extension": str, optional }
]);

export const tint = makeFunc(processing.tint, "tint", [
    { "value1": [ PColor, int, float ] },
    { "value2": [ int, float ], optional },
    { "value3": [ int, float ], optional },
    { "alpha": [ int, float ], optional }
]);

export const blend = makeFunc(processing.blend, "blend", [
    { "srcImg": [ int, PImage ]},
    { "x": int },
    { "y": int },
    { "width": int },
    { "height": int },
    { "dx": int },
    { "dy": int },
    { "dwidth": int },
    { "dheight": int },
    { "MODE": int, optional, allowed: [ BLEND, ADD, SUBTRACT, LIGHTEST, DARKEST, DIFFERENCE, EXCLUSION,
        MULTIPLY, SCREEN, OVERLAY, HARD, LIGHT, SOFT_LIGHT, DODGE, BURN ]}
]);

export const copy = makeFunc(processing.copy, "copy", [
    { "srcImg": [ int, PImage ]},
    { "sx": int },
    { "sy": int },
    { "swidth": int },
    { "sheight": int },
    { "dx": int },
    { "dy": int },
    { "dwidth": int },
    { "dheight": int, optional }
]);

export const filter = makeFunc(processing.filter, "filter", [
    { "MODE": int, allowed: [ THRESHOLD, GRAY, INVERT, POSTERIZE, BLUR, OPAQUE, ERODE, DILATE ]},
    { "srcImg": PImage, optional }
]);

export const get = makeFunc(processing.get, "get", [
    { "x": int, optional },
    { "y": int, optional },
    { "width": int, optional },
    { "height": int, optional },
]);

export const loadPixels = makeFunc(processing.loadPixels, "loadPixels");

export const set = makeFunc(processing.set, "set", [
    { "x": int },
    { "y": int },
    { "image": [ PColor, PImage ] },
]);

export const updatePixels = makeFunc(processing.updatePixels, "updatePixels");