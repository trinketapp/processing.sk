vectorClass = function ($gbl, $loc) {
    $loc.__init__ = new Sk.builtin.func(function (self, x, y, z) {
        // PVector()
        // PVector(x,y)
        // PVector(x,y,z)
        if (typeof (x) === "undefined") {
            self.v = new mod.processing.PVector();
        } else if (typeof (z) === "undefined") {
            self.v = new mod.processing.PVector(x.v, y.v);
        } else {
            self.v = new mod.processing.PVector(x.v, y.v, z.v);
        }
    });

    $loc.__getattr__ = new Sk.builtin.func(function (self, key) {
        key = Sk.ffi.remapToJs(key);
        if (key === "x") {
            return Sk.builtin.assk$(self.v.x);
        } else if (key === "y") {
            return Sk.builtin.assk$(self.v.y);
        } else if (key === "z") {
            return Sk.builtin.assk$(self.v.z);
        }
    });

    $loc.get = new Sk.builtin.func(function (self) {
        // get() Gets a copy of the vector
        var new_vec = Sk.misceval.callsim(mod.PVector);
        new_vec.v = self.v.get();
        return new_vec;
    });

    $loc.set = new Sk.builtin.func(function (self, x, y, x) {
        // set() Sets the x, y, z component of the vector
        if (typeof (z) === "undefined") {
            self.v.set(x.v, y.v);
        } else {
            self.v.set(x.v, y.v, z.v);
        }
    });

    $loc.mag = new Sk.builtin.func(function (self) {
        // mag() Calculates the magnitude (length) of the vector
        // and returns the result as a float
        return Sk.builtin.assk$(self.v.mag());
    });

    $loc.add = new Sk.builtin.func(function (self, vec) {
        // add()	Adds one vector to another
        var new_vec = Sk.misceval.callsim(mod.PVector);
        new_vec.v = self.v.add(vec.v);
        return new_vec;
    });

    $loc.sub = new Sk.builtin.func(function (self, vec) {
        // sub()	Subtracts one vector from another
        var new_vec = Sk.misceval.callsim(mod.PVector);
        new_vec.v = self.v.sub(vec.v);
        return new_vec;
    });

    $loc.mult = new Sk.builtin.func(function (self, vec) {
        // mult()	Multiplies the vector by a scalar
        var new_vec = Sk.misceval.callsim(mod.PVector);
        new_vec.v = self.v.mult(vec.v);
        return new_vec;
    });

    $loc.div = new Sk.builtin.func(function (self, vec) {
        // div()	Divides the vector by a scalar
        var new_vec = Sk.misceval.callsim(mod.PVector);
        new_vec.v = self.v.dic(vec.v);
        return new_vec;
    });

    $loc.dist = new Sk.builtin.func(function (self, vec) {
        // dist()	Calculate the Euclidean distance between two points
        return Sk.builtin.assk$(self.v.dist(vec.v));
    });

    $loc.dot = new Sk.builtin.func(function (self, v1, v2, v3) {
        // dot()	Calculates the dot product
        // returns float
        // vec.dot(x,y,z)
        // vec.dot(v)
        if (typeof (v2) === 'undefined') {
            return Sk.builtin.assk$(self.v.dot(v1.v));
        } else {
            return Sk.builtin.assk$(self.v.dot(v1.v, v2.v, v3.v));
        }
    });

    $loc.cross = new Sk.builtin.func(function (self, vec) {
        // cross()	Calculates the cross product
        var new_vec = Sk.misceval.callsim(mod.PVector);
        new_vec.v = self.v.cross(vec.v);
        return new_vec;
    });

    $loc.normalize = new Sk.builtin.func(function (self) {
        // normalize()	Normalizes the vector
        self.v.normalize();
    });

    $loc.limit = new Sk.builtin.func(function (self, value) {
        // limit()	Limits the magnitude of the vector
        self.v.limit(value.v);
    });

    $loc.angleBetween = new Sk.builtin.func(function (self, vec) {
        // angleBetween()	Calculates the angle between two vectors
        return Sk.builtin.assk$(self.v.angleBetween(vec.v));
    });

    $loc.array = new Sk.builtin.func(function (self) {
        // array()
        return new Sk.builtin.list(self.v.array());
    });
};

mod.PVector = Sk.misceval.buildClass(mod, vectorClass, "PVector", []);
