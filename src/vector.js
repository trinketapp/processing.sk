import Sk from "./skulpt.js";
import processing from "./processing.js";
import { makeFunc, optional, __name__ } from "./utils.js";

const { int, float } = Sk.builtin;
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
        { "x": int },
        { "y": int, optional },
        { "z": int, optional }
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

    $loc.get = makeFunc(vectorGet, "get"),

    $loc.set = makeFunc(vectorSet, "set", [
        { "x": int },
        { "x": int, optional },
        { "x": int, optional }
    ]);

    $loc.mag = makeFunc(self => self.v.mag(), "mag");

    $loc.add = makeFunc(vectorAdd, "add", [
        { "vector": PVector }
    ]);

    $loc.sub = makeFunc(vectorSub, "sub", [
        { "vector": PVector }
    ]);

    $loc.mult = makeFunc(vectorMult, "mult", [
        { "vector": PVector }
    ]);

    $loc.div = makeFunc(vectorDiv, "div", [
        { "vector": PVector }
    ]);

    $loc.dist = makeFunc(vectorDist, "dist", [
        { "vector": PVector }
    ]);

    $loc.dot = makeFunc(vectorDot, "dot", [
        { "x": [ int, float ] },
        { "y": [ int, float ], optional },
        { "z": [ int, float ], optional }
    ]);

    $loc.cross = makeFunc(vectorCross, "cross", [
        { "vector": PVector }
    ]);

    $loc.normalize = makeFunc(self => self.normalize(), "normalize");

    $loc.limit = makeFunc(vectorLimit, "limit", [
        { "value": float }
    ]);

    $loc.angleBetween = makeFunc(vectorAngleBetween, "angleBetween", [
        { "vector": PVector }
    ]);

    $loc.array = makeFunc(self => self.v.array(), "array");
}

const PVector = Sk.misceval.buildClass({ __name__ }, vectorClass, "PVector", []);

export default PVector;
