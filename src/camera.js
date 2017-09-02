mod.beginCamera = new Sk.builtin.func(function () {
    mod.processing.beginCamera();
});


mod.camera = new Sk.builtin.func(function (eyeX, eyeY, eyeZ,
    centerX, centerY, centerZ,
    upX, upY, upZ) {
    // camera()
    // camera(eyeX, eyeY, eyeZ,centerX, centerY, centerZ,upX, upY, upZ)
    if (typeof (eyeX) === "undefined") {
        mod.processing.camera();
    } else {
        mod.processing.camera(eyeX.v, eyeY.v, eyeZ.v,
            centerX.v, centerY.v, centerZ.v,
            upX.v, upY.v, upZ.v);
    }
});

mod.endCamera = new Sk.builtin.func(function () {
    // endCamera()
    mod.processing.endCamera();
});

mod.frustum = new Sk.builtin.func(function (left, right, bottom, top, near, far) {
    // frustum(left, right, bottom,top, near, far)
    mod.processing.frustum(left, right, bottom, top, near, far);
});

mod.ortho = new Sk.builtin.func(function (left, right, bottom, top, near, far) {
    // ortho(left, right, bottom,top, near,far)
    // returns None
    mod.processing.ortho(left.v, right.v, bottom.v, top.v, near.v, far.v);
});

mod.perspective = new Sk.builtin.func(function (fov, aspect, zNear, zFar) {
    // perspective()
    // perspective(fov, aspect, zNear, zFar)
    // returns None
    if (typeof (fov) === "undefined") {
        mod.processing.perspective();
    } else if (typeof (aspect) === "undefined") {
        mod.processing.perspective(fov.v);
    } else if (typeof (zNear) === "undefined") {
        mod.processing.perspective(fov.v, aspect.v);
    } else if (typeof (zFar) === "undefined") {
        mod.processing.perspective(fov.v, aspect.v, zNear.v);
    } else {
        mod.processing.perspective(fov.v, aspect.v, zNear.v, zFar.v);
    }
});


mod.printCamera = new Sk.builtin.func(function () {
    // printCamera()
    // returns None
    mod.processing.printCamera();
});


mod.printProjection = new Sk.builtin.func(function () {
    // printProjection()
    // returns None
    mod.processing.printProjection();
});