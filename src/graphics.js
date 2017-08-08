graphicsClass = function ($gbl, $loc) {
    $loc.__init__ = new Sk.builtin.func(function (self, x, y, z) {
        // PGraphics()
        // PGraphics(width,height)
        // PGraphics(width,height,applet)
        if (typeof (x) === "undefined") {
            self.v = new mod.processing.PVector();
        } else if (typeof (z) === "undefined") {
            self.v = new mod.processing.PVector(x.v, y.v);
        } else {
            self.v = new mod.processing.PVector(x.v, y.v, z.v);
        }
    });

    $loc.beginDraw = new Sk.builtin.func(function (self) {
        self.v.beginDraw();
    });

    $loc.endDraw = new Sk.builtin.func(function (self) {
        self.v.endDraw();
    });
};

mod.PGraphics = Sk.misceval.buildClass(mod, graphicsClass, "PGraphics", []);
