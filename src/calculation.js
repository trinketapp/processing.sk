import { processing } from "./processing.js";
import Sk from "./skulpt.js";
import { makeFunc, optional } from "./utils.js";

const { int_, float } = Sk.builtin;

export default {
    constrain: makeFunc(processing, "contrain", [
        { "value": [ int_, float ] },
        { "min" : [ int_, float ] },
        { "max": [ int_, float ] }
    ]),

    dist: makeFunc(processing, "dist", [
        { "x1": [ int_, float ] },
        { "y1": [ int_, float ] },
        { "z1": [ int_, float ] },
        { "x2": [ int_, float ] },
        { "y2": [ int_, float ], optional },
        { "z2": [ int_, float ], optional }
    ]),

    lerp: makeFunc(processing, "lerp", [
        { "value1": [ int_, float ] },
        { "value2": [ int_, float ] },
        { "amt": float }
    ]),

    mag: makeFunc(processing, "mag", [
        { "a": [ int_, float ] },
        { "a": [ int_, float ] },
        { "a": [ int_, float ], optional }
    ]),

    map: makeFunc(processing, "map", [
        { "value": float },
        { "low1": float },
        { "high1": float },
        { "low2": float },
        { "high2": float },
    ]),

    norm: makeFunc(processing, "norm", [
        { "value": float },
        { "low": float },
        { "high": float }
    ]),

    sq: makeFunc(processing, "sq", [
        { "value": [ int_, float ] }
    ])
};


