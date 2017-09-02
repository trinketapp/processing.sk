mod.applyMatrix = new Sk.builtin.func(function () {
    var args = Array.prototype.slice.call(arguments, 0, 16),
        i;

    for (i = 0; i < args.length; i++) {
        args[i] = typeof (args[i]) === "undefined" ? 0.0 : args[i].v;
    }

    mod.processing.applyMatrix.apply(mod.processing, args);
});

mod.popMatrix = new Sk.builtin.func(function () {
    mod.processing.popMatrix();
});

mod.printMatrix = new Sk.builtin.func(function () {
    return Sk.ffi.remapToPy(mod.processing.printMatrix());
});

mod.pushMatrix = new Sk.builtin.func(function () {
    mod.processing.pushMatrix();
});

mod.resetMatrix = new Sk.builtin.func(function () {
    mod.processing.resetMatrix();
});

mod.rotate = new Sk.builtin.func(function (rads) {
    // rotation in radians
    mod.processing.rotate(rads.v);
});

mod.rotateX = new Sk.builtin.func(function (rads) {
    mod.processing.rotateX(rads.v);
});

mod.rotateY = new Sk.builtin.func(function (rads) {
    mod.processing.rotateY(rads.v);
});

mod.rotateZ = new Sk.builtin.func(function (rads) {
    mod.processing.rotateZ(rads.v);
});

mod.scale = new Sk.builtin.func(function (sx, sy, sz) {
    if (typeof (sy) === "undefined") {
        sy = 1.0;
    } else {
        sy = sy.v;
    }
    if (typeof (sz) === "undefined") {
        sz = 1.0;
    } else {
        sz = sz.v;
    }
    mod.processing.scale(sx.v, sy, sz);
});

mod.translate = new Sk.builtin.func(function (sx, sy, sz) {
    if (typeof (sy) === "undefined") {
        sy = 1.0;
    } else {
        sy = sy.v;
    }
    if (typeof (sz) === "undefined") {
        sz = 1.0;
    } else {
        sz = sz.v;
    }
    mod.processing.translate(sx.v, sy, sz);
});