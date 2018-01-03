import { PImage } from "./processing.js";
import Sk from "./skulpt.js";
import { processingProxy, makeFunc, optional, ignored, self, strToColor } from "./utils.js";
import { remappedConstants } from "./constants.js";

const { func, int_, list, str, float_, lng, IOError } = Sk.builtin;
const { sattr } = Sk.abstr;
const { buildClass, callsim, Suspension } = Sk.misceval;
const { remapToJs, remapToPy } = Sk.ffi;
const { BLEND, ADD, SUBTRACT, LIGHTEST, DARKEST, DIFFERENCE, EXCLUSION,
    MULTIPLY, SCREEN, OVERLAY, HARD, LIGHT, SOFT_LIGHT, DODGE, BURN,
    THRESHOLD, GRAY, INVERT, POSTERIZE, BLUR, OPAQUE, ERODE, DILATE,
    CORNER, CORNERS, CENTER, RGB, ARGB, ALPHA} = remappedConstants;

let PixelProxy = null;

function imageLoadImage(img) {

    let imageUrl = img;

    if (typeof Sk.imageProxy === "function") {
        imageUrl = Sk.imageProxy(img);
    }

    let susp = new Suspension();

    susp.resume = function() {
        if (susp.data["error"]) {
            throw susp.data["error"];
        }

        return susp.data["result"];
    };

    susp.data = {
        type: "Sk.promise",
        promise: Promise.race([
            new Promise(resolve => setTimeout(resolve, 3000)),
            new Promise(resolve => {
                var image = callsim(PImage);
                var i = processingProxy.loadImage(imageUrl, {}, () => {
                    image.v = i;
                    resolve(image);
                });
            })
        ]).then(image => {
            if (!image) {
                throw new IOError(`[Errno 2] No such file or directory: '${img}'`);
            } else {
                return image;
            }
        })
    };

    return susp;
}

function imageRequestImage(filename, extension) {
    var image = Sk.misceval.callsim(PImage);
    image.v = processingProxy.requestImage(filename, extension);
    return image;
}

function imageInit(self, arg1, arg2, arg3) {
    self.v = new processingProxy.PImage(arg1, arg2, arg3);
    sattr(self, "pixels", callsim(PixelProxy, self));
}

function imageGet(self, x, y, width, height) {
    var args = [x, y, width, height].filter(a => a !== undefined);
    if (args.length == 2) {
        return self.v.get.apply(self.v, args);
    }

    var image = callsim(PImage);
    image.v = self.v.get.apply(self.v, args);
    sattr(image, "pixels", callsim(PixelProxy, image));
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
    $loc.__init__ = makeFunc(function(self, image) {
        self.image = image;
    }, "__init__", [
        self,
        { "image": "PImage", optional }
    ]);

    $loc.__getitem__ = makeFunc(function(self, index) {
        return self.image.pixels[index];
    }, "__getitem__", [ self, { "index": int_ }]);

    $loc.__setitem__ = makeFunc(function(self, index, color) {
        return self.image.pixels[index] = color;
    }, "__setitem__", [ self, { "index": int_ }, { "color": [ int_, lng, float_, str ], converter: strToColor }]);

    $loc.__len__ = makeFunc(self => self.image.width * self.image.height, "__len__", [ self ]);
}

function imageClass($gbl, $loc) {
    $loc.__init__ = makeFunc(imageInit, "__init__", [
        self,
        { "width": [ int_, str ], optional },
        { "height": int_, optional },
        { "format": int_, allowed: [ 1, 2, 4 ], optional }
    ]);

    $loc.__getattr__ = new func(function (self, key) {
        key = remapToJs(key);
        if (key === "width") {
            return remapToPy(self.v.width);
        }
        if (key === "height") {
            return remapToPy(self.v.height);
        }
    });

    $loc.get = makeFunc(imageGet, "get", [
        self,
        { "x": int_ },
        { "y": int_ },
        { "width": int_, optional },
        { "height": int_, optional }
    ]);

    $loc.set = makeFunc(imageSet, "set", [
        self,
        { "x": int_ },
        { "y": int_ },
        { "color": [ int_, lng, float_, str ], converter: strToColor }
    ]);

    $loc.copy = makeFunc(imageCopy, "copy", [
        self,
        { "srcImg": [ int_, "PImage" ]},
        { "sx": int_ },
        { "sy": int_ },
        { "swidth": int_ },
        { "sheight": int_ },
        { "dx": int_ },
        { "dy": int_ },
        { "dwidth": int_ },
        { "dheight": int_, optional }
    ]);

    $loc.mask = makeFunc(imageMask, "mask", [
        self,
        { "maskImg": ["PImage", list] }
    ]);

    $loc.blend = makeFunc(imageBlend, "blend", [
        self,
        { "srcImg": [ int_, "PImage" ]},
        { "x": int_ },
        { "y": int_ },
        { "width": int_ },
        { "height": int_ },
        { "dx": int_ },
        { "dy": int_ },
        { "dwidth": int_ },
        { "dheight": int_ },
        { "MODE": int_, optional, allowed: [ BLEND, ADD, SUBTRACT, LIGHTEST, DARKEST, DIFFERENCE, EXCLUSION,
            MULTIPLY, SCREEN, OVERLAY, HARD, LIGHT, SOFT_LIGHT, DODGE, BURN ]}
    ]);

    $loc.filter = makeFunc(imageFilter, "filter", [
        self,
        { "MODE": int_, allowed: [ THRESHOLD, GRAY, INVERT, POSTERIZE, BLUR, OPAQUE, ERODE, DILATE ]},
        { "srcImg": "PImage", optional }
    ]);

    $loc.save = makeFunc(imageSave, "save", [
        self,
        { "filename": str }
    ]);

    $loc.resize = makeFunc(imageResize, "resize", [
        self,
        { "wide": int_ },
        { "high": int_ }
    ]);

    $loc.loadPixels = makeFunc(imageLoadPixels, "loadPixels");

    $loc.updatePixels = makeFunc(imageUpdatePixels, "updatePixels", [
        self,
        { "x": int_, optional },
        { "y": int_, optional },
        { "w": int_, optional },
        { "h": int_, optional }
    ]);
}

const PImageBuilder = mod => {
    PixelProxy = buildClass(mod, pixelProxy, "ImageProxy", []);
    return buildClass(mod, imageClass, "PImage", []);
};

export default PImageBuilder;

export const createImage = makeFunc(function (width, height, format) {
    let image = Sk.misceval.callsim(PImage);
    image.v = processingProxy.createImage(width, height, format);
    sattr(image, "pixels", callsim(PixelProxy, image));
    return image;
}, "createFunc", [
    { "width": int_ },
    { "height": int_ },
    { "format": int_, allowed: [ RGB, ARGB, ALPHA ] }
]);

export const image = makeFunc(processingProxy, "image", [
    { "img": [ "PImage", "PGraphics"] },
    { "x": [ int_, float_ ] },
    { "y": [ int_, float_ ] },
    { "width": [ int_, float_ ], optional },
    { "height": [ int_, float_ ], optional }
]);

export const imageMode = makeFunc(processingProxy, "imageMode", [
    { "mode": int_, allowed: [ CORNER, CORNERS, CENTER ] }
]);

export const loadImage = makeFunc(imageLoadImage, "loadImage", [
    { "image": str },
    { "extension": str, optional, ignored }
]);

export const noTint = makeFunc(processingProxy, "noTint");

export const requestImage = makeFunc(imageRequestImage, "requestImage", [
    { "filename": str },
    { "extension": str, optional }
]);

export const tint = makeFunc(processingProxy, "tint", [
    { "value1": [ int_, lng, float_, str ], converter: strToColor },
    { "value2": [ int_, float_ ], optional },
    { "value3": [ int_, float_ ], optional },
    { "alpha": [ int_, float_ ], optional }
]);

export const blend = makeFunc(processingProxy, "blend", [
    { "srcImg": [ int_, "PImage" ]},
    { "x": int_ },
    { "y": int_ },
    { "width": int_ },
    { "height": int_ },
    { "dx": int_ },
    { "dy": int_ },
    { "dwidth": int_ },
    { "dheight": int_ },
    { "MODE": int_, optional, allowed: [ BLEND, ADD, SUBTRACT, LIGHTEST, DARKEST, DIFFERENCE, EXCLUSION,
        MULTIPLY, SCREEN, OVERLAY, HARD, LIGHT, SOFT_LIGHT, DODGE, BURN ]}
]);

export const copy = makeFunc(processingProxy, "copy", [
    { "srcImg": [ int_, "PImage" ]},
    { "sx": int_ },
    { "sy": int_ },
    { "swidth": int_ },
    { "sheight": int_ },
    { "dx": int_ },
    { "dy": int_ },
    { "dwidth": int_ },
    { "dheight": int_, optional }
]);

export const filter = makeFunc(processingProxy, "filter", [
    { "MODE": int_, allowed: [ THRESHOLD, GRAY, INVERT, POSTERIZE, BLUR, OPAQUE, ERODE, DILATE ]},
    { "srcImg": "PImage", optional }
]);

export const get = makeFunc(processingProxy, "get", [
    { "x": int_, optional },
    { "y": int_, optional },
    { "width": int_, optional },
    { "height": int_, optional },
]);

export const loadPixels = makeFunc(processingProxy, "loadPixels");

export const set = makeFunc(processingProxy, "set", [
    { "x": int_ },
    { "y": int_ },
    { "image": [ "PImage", int_, lng, float_, str ], converter: strToColor  },
]);

export const updatePixels = makeFunc(processingProxy, "updatePixels");

export function pixels() {
    let pp = callsim(PixelProxy);
    pp.image = {
        pixels: processingProxy.pixels
    };
    return pp;
}