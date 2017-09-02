mod.ambientLight = new Sk.builtin.func(function (v1, v2, v3, x, y, z) {
    // ambientLight(v1,v2,v3)
    // ambientLight(v1,v2,v3,x,y,z)
    if (typeof (x) === "undefined") {
        mod.processing.ambientLight(v1.v, v2.v, v3.v);
    } else if (typeof (y) === "undefined") {
        mod.processing.ambientLight(v1.v, v2.v, v3.v, x.v);
    } else if (typeof (z) === "undefined") {
        mod.processing.ambientLight(v1.v, v2.v, v3.v, x.v, y.v);
    } else {
        mod.processing.ambientLight(v1.v, v2.v, v3.v, x.v, y.v, z.v);
    }
});

mod.directionalLight = new Sk.builtin.func(function (v1, v2, v3, nx, ny, nz) {
    // directionalLight(v1,v2,v3,nx,ny,nz)
    mod.processing.directionalLight(v1.v, v2.v, v3.v, nx.v, ny.v, nz.v);
});

mod.lightFalloff = new Sk.builtin.func(function (constant, linear, quadratic) {
    // lightFalloff(constant,linear,quadratic)
    mod.processing.lightFalloff(constant.v, linear.v, quadratic.v);
});

mod.lightSpecular = new Sk.builtin.func(function (v1, v2, v3) {
    // lightSpecular(v1,v2,v3)
    mod.processing.lightSpecular(v1.v, v2.v, v3.v);
});

mod.lights = new Sk.builtin.func(function () {
    mod.processing.lights();
});

mod.noLights = new Sk.builtin.func(function () {
    mod.processing.noLights();
});

mod.normal = new Sk.builtin.func(function (nx, ny, nz) {
    // normal(nx,ny,nz)
    // returns None
    mod.processing.normal(nx.v, ny.v, nz.v);
});

mod.pointLight = new Sk.builtin.func(function (v1, v2, v3, nx, ny, nz) {
    // pointLight(v1,v2,v3,nx,ny,nz)
    // returns None
    mod.processing.pointLight(v1.v, v2.v, v3.v, nx.v, ny.v, nz.v);
});

mod.spotLight = new Sk.builtin.func(function (v1, v2, v3, nx, ny, nz, angle, concentration) {
    // spotLight(v1,v2,v3,nx,ny,nz,angle,concentration)
    // returns None
    mod.processing.spotLight(v1.v, v2.v, v3.v, nx.v, ny.v, nz.v, angle.v, concentration.v);
});