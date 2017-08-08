screenClass = function ($gbl, $loc) {

    $loc.__init__ = new Sk.builtin.func(function (self) {
        self.pixels = null;
    });

    $loc.__getattr__ = new Sk.builtin.func(function (self, key) {
        key = Sk.ffi.remapToJs(key);
        if (key === "height") {
            return Sk.builtin.assk$(mod.processing.height);
        }
        else if (key === "width") {
            return Sk.builtin.assk$(mod.processing.width);
        }
        else if (key === "pixels") {
            if (self.pixels == null) {
                self.pixels = new Sk.builtin.list(mod.processing.pixels.toArray());
            }
        }
        return self.pixels;
    });

};

mod.Screen = Sk.misceval.buildClass(mod, screenClass, "Screen", []);

mod.screen = Sk.misceval.callsim(mod.Screen);