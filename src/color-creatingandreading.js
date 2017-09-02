mod.alpha = new Sk.builtin.func(function (r, g, b) {
    // r will be either:
    //      a number in which case the fill will be grayscale
    //      a color object
    // g, and b may be undefined.  If they hold values it will
    // be assumed that we have an r,g,b color tuple
    if (typeof (g) === "undefined") {
        return new Sk.builtin.float_(mod.processing.alpha(r.v));
    } else if (typeof (b) === "undefined") {
        return new Sk.builtin.float_(mod.processing.alpha(r.v, g.v));
    } else {
        return new Sk.builtin.float_(mod.processing.alpha(r.v, g.v, b.v));
    }
});

mod.blendColor = new Sk.builtin.func(function (c1, c2, mode) {
    // blendColor(c1,c2,MODE)
    var c = Sk.misceval.callsim(mod.color,
        new Sk.builtin.int_(0),
        new Sk.builtin.int_(0),
        new Sk.builtin.int_(0));
    c.v = mod.processing.blendColor(c1.v, c2.v, mode.v);
    return c;
});

mod.blue = new Sk.builtin.func(function (clr) {
    return new Sk.builtin.int_(mod.processing.blue(clr.v));
});

mod.brightness = new Sk.builtin.func(function (r, g, b) {
    if (typeof (g) === "undefined") {
        return new Sk.builtin.float_(mod.processing.brightness(r.v));
    } else if (typeof (b) === "undefined") {
        return new Sk.builtin.float_(mod.processing.brightness(r.v, g.v));
    } else {
        return new Sk.builtin.float_(mod.processing.brightness(r.v, g.v, b.v));
    }
});

mod.green = new Sk.builtin.func(function (clr) {
    return new Sk.builtin.int_(mod.processing.green(clr.v));
});

mod.hue = new Sk.builtin.func(function (color) {
    // hue(color)
    return new Sk.builtin.float_(mod.processing.hue(color.v));
});

mod.lerpColor = new Sk.builtin.func(function (c1, c2, amt) {
    // lerpColor(c1, c2, amt)
    // returns color
    var c = Sk.misceval.callsim(mod.color,
        new Sk.builtin.int_(0),
        new Sk.builtin.int_(0),
        new Sk.builtin.int_(0));
    c.v = mod.processing.lerpColor(c1.v, c2.v, amt.v);
    return c;
});

mod.red = new Sk.builtin.func(function (clr) {
    return new Sk.builtin.int_(mod.processing.red(clr.v));
});

mod.saturation = new Sk.builtin.func(function (color) {
    // saturation(color)
    // returns float
    return new Sk.builtin.float_(mod.processing.saturation(color.v));
});