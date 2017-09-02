mod.ambient = new Sk.builtin.func(function (r, g, b) {
    // ambient(gray)
    // ambient(red, green blue)
    // r will be either:
    //      a number in which case the fill will be grayscale
    //      a color object
    // g, and b may be undefined.  If they hold values it will
    // be assumed that we have an r,g,b color tuple
    if (typeof (g) === "undefined") {
        mod.processing.ambient(r.v);
    } else if (typeof (b) === "undefined") {
        mod.processing.ambient(r.v, g.v);
    } else {
        mod.processing.ambient(r.v, g.v, b.v);
    }
});

mod.emissive = new Sk.builtin.func(function (v1, v2, v3) {
    // emissive(gray)
    // emissive(color)
    // emissive(v1,v2,v3)
    if (typeof (v2) === "undefined") {
        mod.processing.emissive(v1.v);
    } else if (typeof (v3) === "undefined") {
        mod.processing.emissive(v1.v, v2.v);
    } else {
        mod.processing.emissive(v1.v, v2.v, v3.v);
    }
});

mod.shininess = new Sk.builtin.func(function (shine) {
    // shininess(shine)
    // returns None
    mod.processing.shininess(shine.v);
});

mod.specular = new Sk.builtin.func(function (v1, v2, v3) {
    // specular(gray)
    // specular(color)
    // specular(v1,v2,v3)
    if (typeof (v2) === "undefined") {
        mod.processing.specular(v1.v);
    } else if (typeof (v3) === "undefined") {
        mod.processing.specular(v1.v, v2.v);
    } else {
        mod.processing.specular(v1.v, v2.v, v3.v);
    }
});
