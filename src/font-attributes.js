mod.textAlign = new Sk.builtin.func(function (align, yalign) {
    // textAlign(ALIGN)
    // textAlign(ALIGN, YALIGN)
    // returns None
    if (typeof (yalign) === "undefined") {
        mod.processing.textAlign(align.v);
    } else {
        mod.processing.textAlign(align.v, yalign.v);
    }
});

mod.textLeading = new Sk.builtin.func(function (dist) {
    // textLeading(dist)
    // returns None
    mod.processing.textLeading(dist.v);
});

mod.textMode = new Sk.builtin.func(function (mode) {
    // textMode(MODE)
    // returns None
    mod.processing.textMode(mode.v);
});

mod.textSize = new Sk.builtin.func(function (size) {
    // textSize(size)
    // returns None
    mod.processing.textSize(size.v);
});

mod.textWidth = new Sk.builtin.func(function (data) {
    // textWidth(data)
    // returns float
    return new Sk.builtin.float_(mod.processing.textWidth(data.v));
});