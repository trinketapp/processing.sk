mod.textAscent = new Sk.builtin.func(function () {
    // returns float
    return new Sk.builtin.float_(mod.processing.textAscent());
});

mod.textDescent = new Sk.builtin.func(function () {
    // returns float
    return new Sk.builtin.float_(mod.processing.textDescent());
});