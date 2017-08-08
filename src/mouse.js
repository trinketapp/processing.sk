mouseClass = function ($gbl, $loc) {

    $loc.__getattr__ = new Sk.builtin.func(function (self, key) {
        key = Sk.ffi.remapToJs(key);
        if (key === "x") {
            return Sk.builtin.assk$(mod.processing.mouseX);
        }
        else if (key === "y") {
            return Sk.builtin.assk$(mod.processing.mouseY);
        }
        else if (key === "px") {
            return Sk.builtin.assk$(mod.processing.pmouseX);
        }
        else if (key === "py") {
            return Sk.builtin.assk$(mod.processing.pmouseY);
        }
        else if (key === "pressed") {
            return new Sk.builtin.bool(mod.processing.__mousePressed);
        }
        else if (key === "button") {
            return Sk.builtin.assk$(mod.processing.mouseButton);
        }
    });

};

mod.Mouse = Sk.misceval.buildClass(mod, mouseClass, "Mouse", []);
mod.mouse = Sk.misceval.callsim(mod.Mouse);