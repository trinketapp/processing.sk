environmentClass = function ($gbl, $loc) {

    $loc.__getattr__ = new Sk.builtin.func(function (self, key) {
        key = Sk.ffi.remapToJs(key);
        if (key === "frameCount") {
            return Sk.builtin.assk$(mod.processing.frameCount);
        }
        else if (key === "frameRate") {
            return Sk.builtin.assk$(mod.processing.frameRate);
        }
        else if (key === "height") {
            return Sk.builtin.assk$(mod.processing.height);
        }
        else if (key === "width") {
            return Sk.builtin.assk$(mod.processing.width);
        }
        else if (key === "online") {
            return new Sk.builtin.bool(mod.processing.online);
        }
        else if (key === "focused") {
            return new Sk.builtin.bool(mod.processing.focused);
        }
    });

};

mod.Environment = Sk.misceval.buildClass(mod, environmentClass, "Environment", []);

mod.environment = Sk.misceval.callsim(mod.Environment);
