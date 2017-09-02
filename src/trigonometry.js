mod.degrees = new Sk.builtin.func(function (angle) {
    // degrees(angle)
    return new Sk.builtin.float_(mod.processing.degrees(angle.v));
});

mod.radians = new Sk.builtin.func(function (angle) {
    // radians(angle)
    // returns int or float
    return new Sk.builtin.float_(mod.processing.radians(angle.v));
});
