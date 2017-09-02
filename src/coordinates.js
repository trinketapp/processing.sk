mod.modelX = new Sk.builtin.func(function (x, y, z) {
    // modelX(x,y,z)
    // returns float
    return new Sk.builtin.float_(mod.processing.modelX(x.v, y.v, z.v));
});

mod.modelY = new Sk.builtin.func(function (x, y, z) {
    // modelY(x,y,z)
    // returns float
    return new Sk.builtin.float_(mod.processing.modelY(x.v, y.v, z.v));
});

mod.modelZ = new Sk.builtin.func(function (x, y, z) {
    // modelZ(x,y,z)
    // returns float
    return new Sk.builtin.float_(mod.processing.modelZ(x.v, y.v, z.v));
});

mod.screenX = new Sk.builtin.func(function (x, y, z) {
    // screenX(x,y,z)
    // returns float
    return new Sk.builtin.float_(mod.processing.screenX(x.v, y.v, z.v));
});

mod.screenY = new Sk.builtin.func(function (x, y, z) {
    // screenY(x,y,z)
    // returns float
    return new Sk.builtin.float_(mod.processing.screenY(x.v, y.v, z.v));
});

mod.screenZ = new Sk.builtin.func(function (x, y, z) {
    // screenZ(x,y,z)
    // returns float
    return new Sk.builtin.float_(mod.processing.screenZ(x.v, y.v, z.v));
});
