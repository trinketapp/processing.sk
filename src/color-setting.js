mod.background = new Sk.builtin.func(function (r, g, b) {
    if (typeof (g) !== "undefined") {
        g = g.v;
    }
    if (typeof (b) !== "undefined") {
        b = b.v;
    }

    mod.processing.background(r.v, g, b);

});

mod.colorMode = new Sk.builtin.func(function (mode, maxV, maxG, maxB, maxAlpha) {
    // mode is one of RGB or HSB
    // maxV is either the max value for all color elements
    // or the range for Red/Hue (depending on mode) if maxG and maxB are defined
    if (typeof (maxV) === "undefined") {
        maxV = 255;
    }
    else {
        maxV = maxV.v;
    }
    if (typeof (maxG) !== "undefined") {
        maxG = maxG.v;
    }
    if (typeof (maxB) !== "undefined") {
        maxB = maxB.v;
    }
    if (typeof (maxAlpha) !== "undefined") {
        maxAlpha = maxAlpha.v;
    }

    mod.processing.colorMode(mode.v, maxV, maxG, maxB, maxAlpha);
});

mod.fill = new Sk.builtin.func(function (r, g, b, alpha) {
    // r will be either:
    //      a number in which case the fill will be grayscale
    //      a color object
    // g, and b may be undefined.  If they hold values it will
    // be assumed that we have an r,g,b color tuple
    // alpha may also be undefined - if defined, it is the opacity of the fill
    if (typeof (g) !== "undefined") {
        g = g.v;
    }
    if (typeof (b) !== "undefined") {
        b = b.v;
    }
    if (typeof (alpha) !== "undefined") {
        alpha = alpha.v;
    }

    mod.processing.fill(r.v, g, b, alpha);
});

mod.noFill = new Sk.builtin.func(function () {
    mod.processing.noFill();
});

mod.noStroke = new Sk.builtin.func(function () {
    mod.processing.noStroke();
});

mod.stroke = new Sk.builtin.func(function (r, g, b) {

    if (typeof (g) !== "undefined") {
        g = g.v;
    }
    if (typeof (b) !== "undefined") {
        b = b.v;
    }

    mod.processing.stroke(r.v, g, b);

});