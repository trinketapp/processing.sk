// Image class and functions
//
imageClass = function ($gbl, $loc) {
    /* images are loaded async.. so its best to preload them */
    $loc.__init__ = new Sk.builtin.func(function (self, arg1, arg2, arg3) {
        // PImage()
        // PImage(img)
        // PImage(width,height)
        // PImage(width,height,format)
        if (typeof (arg1) === "undefined") {
            self.v = new mod.processing.PImage();
        } else if (typeof (arg2) === "undefined") {
            self.v = new mod.processing.PImage(arg1.v);
        } else if (typeof (arg3) === "undefined") {
            self.v = new mod.processing.PImage(arg1.v, arg2.v);
        } else {
            self.v = new mod.processing.PImage(arg1.v, arg2.v, arg3.v);
        }
    });

    $loc.__getattr__ = new Sk.builtin.func(function (self, key) {
        key = Sk.ffi.remapToJs(key);
        if (key === "width") {
            return Sk.builtin.assk$(self.v.width);
        }
        if (key === "height") {
            return Sk.builtin.assk$(self.v.height);
        }
    });
};

mod.PImage = Sk.misceval.buildClass(mod, imageClass, "PImage", []);
