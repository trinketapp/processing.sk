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
        { "x": int },
        { "y": int },
        { "width": int, optional },
        { "height": int, optional }
    ]);

    $loc.set = makeFunc(imageSet, "set", [
        { "x": int },
        { "y": int },
        { "color": PColor }
    ]);

    $loc.copy = makeFunc(imageCopy, "copy", [
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
        { "maskImg": [PImage, list] }
    ]);

    $loc.blend = makeFunc(imageBlend, "blend", [
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
        { "MODE": int, allowed: [ THRESHOLD, GRAY, INVERT, POSTERIZE, BLUR, OPAQUE, ERODE, DILATE ]},
        { "srcImg": PImage, optional }
    ]);

    $loc.save = makeFunc(imageSave, "save", [
        { "filename": str }
    ]);

    $loc.resize = makeFunc(imageResize, "resize", [
        { "wide": int },
        { "high": int }
    ])

    $loc.loadPixels = makeFunc(imageLoadPixels, "loadPixels");

    $loc.updatePixels = makeFunc(imageUpdatePixels, "updatePixels", [
        { "x": int, optional},
        { "y": int, optional},
        { "w": int, optional},
        { "h": int, optional}
    ]);
};

const PImage = buildClass({ __name__ }, imageClass, "PImage", []);

export default PImage

export const createImage = new Sk.builtin.func(function (width, height, format) {
    var image = Sk.misceval.callsim(mod.PImage);
    image.v = mod.processing.createImage(width.v, height.v, format.v);
    return image;
});

mod.image = new Sk.builtin.func(function (im, x, y, w, h) {
    // image(img, x, y)
    // image(img, x, y, width, height)
    if (typeof (w) === "undefined") {
        mod.processing.image(im.v, x.v, y.v);
    } else {
        mod.processing.image(im.v, x.v, y.v, w.v, h.v);
    }
});

mod.imageMode = new Sk.builtin.func(function (mode) {
    mod.processing.imageMode(mode.v);
});

mod.loadImage = new Sk.builtin.func(function (imfile) {
    var i = mod.processing.loadImage(imfile.v);
    imList.push(i);
    var image = Sk.misceval.callsim(mod.PImage);
    image.v = i;
    return image;
});

mod.noTint = new Sk.builtin.func(function () {
    mod.processing.noTint();
});

mod.requestImage = new Sk.builtin.func(function (filename, extension) {
    // requestImage(filename)
    // requestImage(filename, extension)
    var image = Sk.misceval.callsim(mod.PImage);
    if (typeof (extension) === "undefined") {
        image.v = mod.processing.requestImage(filename.v);
    } else {
        image.v = mod.processing.requestImage(filename.v, extension.v);
    }
    return image;
});

mod.tint = new Sk.builtin.func(function (v1, v2, v3, v4) {
    // tint(gray)
    // tint(gray, alpha)
    // tint(value1, value2, value3)
    // tint(value1, value2, value3, alpha)
    // tint(color)
    // tint(color, alpha)
    // tint(hex)
    // tint(hex, alpha)
    if (typeof (v2) === "undefined") {
        mod.processing.tint(v1.v);
    } else if (typeof (v3) === "undefined") {
        mod.processing.tint(v1.v, v2.v);
    } else if (typeof (v4) === "undefined") {
        mod.processing.tint(v1.v, v2.v, v3.v);
    } else {
        mod.processing.tint(v1.v, v2.v, v3.v, v4.v);
    }
});

mod.blend = new Sk.builtin.func(function (v1, v2, v3, v4, v5,
    v6, v7, v8, v9, v10) {
    if (other instanceof Sk.builtin.int_ || other instanceof Sk.builtin.float_) {
        // blend(x,     y,width,height,dx,    dy,dwidth,dheight,MODE)
        mod.processing.blend(v1.v, v2.v, v3.v, v4.v, v5.v,
            v6.v, v7.v, v8.v, v9.v);
    } else {
        // blend(srcImg,x,y,    width, height,dx,dy,    dwidth, dheight,MODE)
        mod.processing.blend(v1.v, v2.v, v3.v, v4.v, v5.v,
            v6.v, v7.v, v8.v, v9.v, v10.v);
    }
});

mod.copy = new Sk.builtin.func(function (v1, v2, v3, v4, v5,
    v6, v7, v8, v9) {
    if (other instanceof Sk.builtin.int_ || other instanceof Sk.builtin.float_) {
        // copy(x,     y,width,height,dx,    dy,dwidth,dheight)
        mod.processing.copy(v1.v, v2.v, v3.v, v4.v, v5.v,
            v6.v, v7.v, v8.v);
    } else {
        // copy(srcImg,x,y,    width, height,dx,dy,    dwidth, dheight)
        mod.processing.copy(v1.v, v2.v, v3.v, v4.v, v5.v,
            v6.v, v7.v, v8.v, v9.v);
    }
});

mod.filter = new Sk.builtin.func(function (mode, srcImg) {
    // filter(MODE)
    // filter(MODE, srcImg)
    if (typeof (srcImg) === "undefined") {
        mod.processing.filter(mode.v);
    } else {
        mod.processing.filter(mode.v, srcImg.v);
    }
});

mod.get = new Sk.builtin.func(function (x, y) {
    var clr = mod.processing.get(x.v, y.v);
    return Sk.misceval.callsim(mod.color,
        new Sk.builtin.int_(mod.processing.red(clr)),
        new Sk.builtin.int_(mod.processing.green(clr)),
        new Sk.builtin.int_(mod.processing.blue(clr)));
});

mod.loadPixels = new Sk.builtin.func(function () {
    mod.processing.loadPixels();
});

mod.set = new Sk.builtin.func(function (x, y, color) {
    mod.processing.set(x.v, y.v, color.v);
});

mod.updatePixels = new Sk.builtin.func(function () {
    // updatePixels()
    mod.processing.updatePixels();
});