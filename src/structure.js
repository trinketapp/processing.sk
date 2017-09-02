mod.loop = new Sk.builtin.func(function () {
    if (mod.processing === null) {
        throw new Sk.builtin.Exception("loop() should be called after run()");
    }
    looping = true;
    mod.processing.loop();
});

mod.noLoop = new Sk.builtin.func(function () {
    if (mod.processing === null) {
        throw new Sk.builtin.Exception("noLoop() should be called after run()");
    }
    looping = false;
    mod.processing.noLoop();
});

mod.width = new Sk.builtin.int_(100);
mod.height = new Sk.builtin.int_(100);

mod.size = new Sk.builtin.func(function (w, h, mode) {
    if (typeof (mode) === "undefined") {
        mode = mod.P2D;
    }
    mod.processing.size(w.v, h.v, mode.v);
    mod.width = new Sk.builtin.int_(mod.processing.width);
    mod.height = new Sk.builtin.int_(mod.processing.height);
});

mod.exit = new Sk.builtin.func(function (h, w) {
    mod.processing.exit();
});
