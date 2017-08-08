shapeClass = function ($gbl, $loc) {
    $loc.__init__ = new Sk.builtin.func(function (self, arg1, arg2, arg3) {
        if (typeof (arg1) === "undefined") {
            // special version for Skulpt
            self.v = null;
            // Will fill in manually in getChild()
        } else if (typeof (arg2) === "undefined") {
            self.v = new mod.processing.PShapeSVG(arg1.v);
        } else if (typeof (arg3) === "undefined") {
            self.v = new mod.processing.PShapeSVG(arg1.v, arg2.v);
        } else {
            self.v = new mod.processing.PShapeSVG(arg1.v, arg2.v, arg3.v);
        }
    });

    $loc.__getattr__ = new Sk.builtin.func(function (self, key) {
        key = Sk.ffi.remapToJs(key);
        if (key === "width") {
            return Sk.builtin.assk$(self.v.width);
        } else if (key === "height") {
            return Sk.builtin.assk$(self.v.height);
        }
    });

    $loc.isVisible = new Sk.builtin.func(function (self) {
        // isVisible() Returns a boolean value "true" if the image is set to be visible, "false" if not
        return new Sk.builtin.bool(self.v.isVisible());
    });

    $loc.setVisible = new Sk.builtin.func(function (self, value) {
        // setVisible() Sets the shape to be visible or invisible
        self.v.setVisible(value.v);
    });

    $loc.disableStyle = new Sk.builtin.func(function (self) {
        // disableStyle() Disables the shape's style data and uses Processing styles
        self.v.disableStyle();
    });

    $loc.enableStyle = new Sk.builtin.func(function (self) {
        // enableStyle() Enables the shape's style data and ignores the Processing styles
        self.v.enableStyle();
    });

    $loc.getChild = new Sk.builtin.func(function (self, shape) {
        // getChild() Returns a child element of a shape as a PShapeSVG object
        var child = self.v.getChild(shape.v);
        if (child != null) {
            // special method for Skulpt:
            var new_shape = Sk.misceval.callsim(mod.PShapeSVG);
            // Now fill in value:
            new_shape.v = child;
            return new_shape;
        } else {
            return null;
        }
    });

    $loc.translate = new Sk.builtin.func(function (self, x, y, z) {
        // translate() Displaces the shape
        // sh.translate(x,y)
        // sh.translate(x,y,z)
        if (typeof (z) === "undefined") {
            self.v.translate(x.v, y.v);
        } else {
            self.v.translate(x.v, y.v, z.v);
        }
    });

    $loc.rotate = new Sk.builtin.func(function (self, angle) {
        // rotate() Rotates the shape
        self.v.rotate(angle.v);
    });

    $loc.rotateX = new Sk.builtin.func(function (self, angle) {
        // rotateX() Rotates the shape around the x-axis
        self.v.rotateX(angle.v);
    });

    $loc.rotateY = new Sk.builtin.func(function (self) {
        // rotateY() Rotates the shape around the y-axis
        self.v.rotateY(angle.v);
    });

    $loc.rotateZ = new Sk.builtin.func(function (self) {
        // rotateZ() Rotates the shape around the z-axis
        self.v.rotateZ(angle.v);
    });

    $loc.scale = new Sk.builtin.func(function (self, x, y, z) {
        // scale() Increases and decreases the size of a shape
        // sh.scale(size)
        // sh.scale(x,y)
        // sh.scale(x,y,z)
        if (typeof (y) === "undefined") {
            self.v.scale(x.v);
        } else if (typeof (z) === "undefined") {
            self.v.scale(x.v, y.v);
        } else {
            self.v.scale(x.v, y.v, z.v);
        }
    });
};

mod.PShapeSVG = Sk.misceval.buildClass(mod, shapeClass, "PShapeSVG", []);
