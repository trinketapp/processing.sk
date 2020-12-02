import Sk from "./skulpt.js";
import { processing, PVector } from "./processing.js";
import { makeFunc, optional, self } from "./utils.js";

const { int_, float_ } = Sk.builtin;
const { callsim, buildClass } = Sk.misceval;
const { remapToPy } = Sk.ffi;


function vectorInit(self, x, y, z) {
    self.v = new processing.PVector(x, y, z);
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
        { "x": [ int_, float_ ], optional },
        { "y": [ int_, float_ ], optional },
        { "z": [ int_, float_ ], optional }
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
        { "x": [ int_, float_ ] },
        { "x": [ int_, float_ ], optional },
        { "x": [ int_, float_ ], optional }
    ]);

    $loc.mag = makeFunc(self => self.v.mag(), "mag", [ self ]);

    $loc.add = makeFunc(vectorAdd, "add", [
        self,
        { "vector": "PVector" }
    ]);

    $loc.sub = makeFunc(vectorSub, "sub", [
        self,
        { "vector": "PVector" }
    ]);

    $loc.mult = makeFunc(vectorMult, "mult", [
        self,
        { "vector": "PVector" }
    ]);

    $loc.div = makeFunc(vectorDiv, "div", [
        self,
        { "vector": "PVector" }
    ]);

    $loc.dist = makeFunc(vectorDist, "dist", [
        self,
        { "vector": "PVector" }
    ]);

    $loc.dot = makeFunc(vectorDot, "dot", [
        self,
        { "x": [ int_, float_ ] },
        { "y": [ int_, float_ ], optional },
        { "z": [ int_, float_ ], optional }
    ]);

    $loc.cross = makeFunc(vectorCross, "cross", [
        self,
        { "vector": "PVector" }
    ]);

    $loc.normalize = makeFunc(self => self.normalize(), "normalize", [ self ]);

    $loc.limit = makeFunc(vectorLimit, "limit", [
        self,
        { "value": [ int_, float_ ] }
    ]);

    $loc.angleBetween = makeFunc(vectorAngleBetween, "angleBetween", [
        self,
        { "vector": "PVector" }
    ]);

    $loc.array = makeFunc(self => self.v.array(), "array", [ self ]);

    $loc.__repr__ = makeFunc(self => self.v.toString(), "repr", [ self ]);
}

export default mod => buildClass(mod, vectorClass, "PVector", []);
