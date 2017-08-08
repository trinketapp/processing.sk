fontClass = function ($gbl, $loc) {
    $loc.__init__ = new Sk.builtin.func(function (self, input) {
        // PFont()
        // PFont(input)
        if (typeof (input) === "undefined") {
            self.v = new mod.processing.PFont();
        } else {
            self.v = new mod.processing.PVector(input.v);
        }
    });

    $loc.list = new Sk.builtin.func(function (self) {
        // font.list()
        return new Sk.builtin.list(self.v.list());
    });
};

mod.PFont = Sk.misceval.buildClass(mod, fontClass, "PFont", []);
