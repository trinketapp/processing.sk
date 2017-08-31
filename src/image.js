import processing from  'processing.js';
import Sk from 'skulpt.js';
import { makeFunc, optional, __name__ } from 'utils.js';
import PColor from 'color.js';
import { BLEND, ADD, SUBTRACT, LIGHTEST, DARKEST, DIFFERENCE, EXCLUSION,
         MULTIPLY, SCREEN, OVERLAY, HARD, LIGHT, SOFT_LIGHT, DODGE, BURN,
         THRESHOLD, GRAY, INVERT, POSTERIZE, BLUR, OPAQUE, ERODE, DILATE } from 'constants.js'

const { func, int, list } = Sk.builtin;
const { buildClass } = Sk.misceval;
const { remapToJs, remapToPy } = Sk.ffi;

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
    $loc.__init__ = makeFunc(imageInit, [
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

    $loc.get = makeFunc(imageGet, [
        { "x": int },
        { "y": int },
        { "width": int, optional },
        { "height": int, optional }
    ]);

    $loc.set = makeFunc(imageSet, [
        { "x": int },
        { "y": int },
        { "color": PColor }
    ]);

    $loc.copy = makeFunc(imageCopy, [
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

    $loc.mask = makeFunc(imageMask, [
        { "maskImg": [PImage, list] }
    ]);

    $loc.blend = makeFunc(imageBlend, [
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

    $loc.filter = makeFunc(imageFilter, [
        { "MODE": int, allowed: [ THRESHOLD, GRAY, INVERT, POSTERIZE, BLUR, OPAQUE, ERODE, DILATE ]},
        { "srcImg": PImage, optional }
    ]);

    $loc.save = makeFunc(imageSave, [
        { "filename": str }
    ]);

    $loc.resize = makeFunc(imageResize, [
        { "wide": int },
        { "high": int }
    ])

    $loc.loadPixels = makeFunc(imageLoadPixels);

    $loc.updatePixels = makeFunc(imageUpdatePixels, [
        { "x": int, optional},
        { "y": int, optional},
        { "w": int, optional},
        { "h": int, optional}
    ]);
};

const PImage = buildClass({ __name__ }, imageClass, "PImage", []);

export default PImage
