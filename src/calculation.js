import processing from "./processing.js";
import Sk from "./skulpt.js";
import { makeFunc, optional } from "./utils.js";

const { int, float } = Sk.builtin;

export default {
    constrain: makeFunc(processing.constrain, "contrain", [
        { "value": [ int, float ] },
        { "min" : [ int, float ] },
        { "max": [ int, float ] }
    ]),

    dist: makeFunc(processing.dist, "dist", [
        { "x1": [ int, float ] },
        { "y1": [ int, float ] },
        { "z1": [ int, float ] },
        { "x2": [ int, float ] },
        { "y2": [ int, float ], optional },
        { "z2": [ int, float ], optional }
    ]),

    lerp: makeFunc(processing.lerp, "lerp", [
        { "value1": [ int, float ] },
        { "value2": [ int, float ] },
        { "amt": float }
    ]),

    mag: makeFunc(processing.mag, "mag", [
        { "a": [ int, float ] },
        { "a": [ int, float ] },
        { "a": [ int, float ], optional }
    ]),

    map: makeFunc(processing.map, "map", [
        { "value": float },
        { "low1": float },
        { "high1": float },
        { "low2": float },
        { "high2": float },
    ]),

    norm: makeFunc(processing.norm, "norm", [
        { "value": float },
        { "low": float },
        { "high": float }
    ]),

    sq: makeFunc(processing.sq, "sq", [
        { "value": [ int, float ] }
    ])
};


