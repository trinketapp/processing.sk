colorClass = function ($gbl, $loc) {
    /* images are loaded async.. so its best to preload them */
    $loc.__init__ = new Sk.builtin.func(function (self, val1, val2, val3, alpha) {
        if (typeof (val2) !== "undefined") {
            val2 = val2.v;
        }
        if (typeof (val3) !== "undefined") {
            val3 = val3.v;
        }
        if (typeof (alpha) !== "undefined") {
            alpha = alpha.v;
        }
        self.v = mod.processing.color(val1.v, val2, val3, alpha);
    });

};

mod.color = Sk.misceval.buildClass(mod, colorClass, "color", []);