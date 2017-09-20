import Sk from "./skulpt.js";
import processing from "./processing.js";
import { makeFunc, optional, __name__ } from "./utils.js";

const { int_, float } = Sk.builtin;
const { callsim } = Sk.misceval;
const { remapToPy } = Sk.ffi;

function vectorInit(self, x, y, z) {
    self.v = processing.PVector(x, y, z);
}

function vectorSet(self, x, y, z) {
    self.v.set(x, y, z);
}

function vectorGet(self) {
    let vector = callsim(PVector);
    vector.v = self.v.get();
    return vector;
}

function vectorAdd(self, vec) {
    var new_vec = callsim(PVector);
    new_vec.v = self.v.add(vec);
    return new_vec;
}

function vectorSub(self, vec) {
    var new_vec = callsim(PVector);
    new_vec.v = self.v.sub(vec);
    return new_vec;
}

function vectorMult(self, vec) {
    var new_vec = callsim(PVector);
    new_vec.v = self.v.mult(vec);
    return new_vec;
}

function vectorDiv(self, vec) {
    var new_vec = callsim(PVector);
    new_vec.v = self.v.div(vec);
    return new_vec;
}

function vectorDot(self, vec) {
    var new_vec = callsim(PVector);
    new_vec.v = self.v.dot(vec);
    return new_vec;
}

function vectorCross(self, vec) {
    var new_vec = callsim(PVector);
    new_vec.v = self.v.cross(vec);
    return new_vec;
}

function vectorDist(self, vec) {
    var new_vec = callsim(PVector);
    new_vec.v = self.v.dist(vec);
    return new_vec;
}

function vectorAngleBetween(self, vec) {
    var new_vec = callsim(PVector);
    new_vec.v = self.v.angleBetween(vec);
    return new_vec;
}

function vectorLimit(self, value) {
    self.v.limit(value);
}

function vectorClass($gbl, $loc) {
    $loc.__init__ = makeFunc(vectorInit, "__init__", [
        self,
        { "x": int_ },
        { "y": int_, optional },
        { "z": int_, optional }
    ]);

    $loc.__getattr__ = new Sk.builtin.func(function (self, key) {
        key = Sk.ffi.remapToJs(key);
        if (key === "x") {
            return remapToPy(self.v.x);
        } else if (key === "y") {
            return remapToPy(self.v.y);
        } else if (key === "z") {
            return Sk.builtin.assk$(self.v.z);
        }
    });

    $loc.get = makeFunc(vectorGet, "get", [ self ]),

    $loc.set = makeFunc(vectorSet, "set", [
        self,
        { "x": int_ },
        { "x": int_, optional },
        { "x": int_, optional }
    ]);

    $loc.mag = makeFunc(self => self.v.mag(), "mag", [ self ]);

    $loc.add = makeFunc(vectorAdd, "add", [
        self,
        { "vector": PVector }
    ]);

    $loc.sub = makeFunc(vectorSub, "sub", [
        self,
        { "vector": PVector }
    ]);

    $loc.mult = makeFunc(vectorMult, "mult", [
        self,
        { "vector": PVector }
    ]);

    $loc.div = makeFunc(vectorDiv, "div", [
        self,
        { "vector": PVector }
    ]);

    $loc.dist = makeFunc(vectorDist, "dist", [
        self,
        { "vector": PVector }
    ]);

    $loc.dot = makeFunc(vectorDot, "dot", [
        self,
        { "x": [ int_, float ] },
        { "y": [ int_, float ], optional },
        { "z": [ int_, float ], optional }
    ]);

    $loc.cross = makeFunc(vectorCross, "cross", [
        self,
        { "vector": PVector }
    ]);

    $loc.normalize = makeFunc(self => self.normalize(), "normalize", [ self ]);

    $loc.limit = makeFunc(vectorLimit, "limit", [
        self,
        { "value": float }
    ]);

    $loc.angleBetween = makeFunc(vectorAngleBetween, "angleBetween", [
        self,
        { "vector": PVector }
    ]);

    $loc.array = makeFunc(self => self.v.array(), "array", [ self ]);
}

const PVector = Sk.misceval.buildClass({ __name__ }, vectorClass, "PVector", []);

export default PVector;
