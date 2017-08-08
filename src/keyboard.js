keyboardClass = function ($gbl, $loc) {

    $loc.__getattr__ = new Sk.builtin.func(function (self, key) {
        key = Sk.ffi.remapToJs(key);
        if (key === "key") {
            return new Sk.builtin.str(mod.processing.key.toString());
        }
        else if (key === "keyCode") {
            return Sk.builtin.assk$(mod.processing.keyCode);
        }
        else if (key === "keyPressed") {
            return new Sk.builtin.str(mod.processing.keyPressed);
        } // todo bool
    });

};

mod.Keyboard = Sk.misceval.buildClass(mod, keyboardClass, "Keyboard", []);

mod.keyboard = Sk.misceval.callsim(mod.Keyboard);