import Sk from "./skulpt.js";
import { processingProxy, makeFunc, optional } from "./utils.js";

const { int_, float_ } = Sk.builtin;

export default {
    constrain: makeFunc(processingProxy, "contrain", [
        { "value": [ int_, float_ ] },
        { "min" : [ int_, float_ ] },
        { "max": [ int_, float_ ] }
    ]),

    dist: makeFunc(processingProxy, "dist", [
        { "x1": [ int_, float_ ] },
        { "y1": [ int_, float_ ] },
        { "z1": [ int_, float_ ] },
        { "x2": [ int_, float_ ] },
        { "y2": [ int_, float_ ], optional },
        { "z2": [ int_, float_ ], optional }
    ]),

    lerp: makeFunc(processingProxy, "lerp", [
        { "value1": [ int_, float_ ] },
        { "value2": [ int_, float_ ] },
        { "amt": [ int_, float_ ] }
    ]),

    mag: makeFunc(processingProxy, "mag", [
        { "a": [ int_, float_ ] },
        { "a": [ int_, float_ ] },
        { "a": [ int_, float_ ], optional }
    ]),

    map: makeFunc(processingProxy, "map", [
        { "value": [ int_, float_ ] },
        { "low1": [ int_, float_ ] },
        { "high1": [ int_, float_ ] },
        { "low2": [ int_, float_ ] },
        { "high2": [ int_, float_ ] },
    ]),

    norm: makeFunc(processingProxy, "norm", [
        { "value": [ int_, float_ ] },
        { "low": [ int_, float_ ] },
        { "high": [ int_, float_ ] }
    ]),

    sq: makeFunc(processingProxy, "sq", [
        { "value": [ int_, float_ ] }
    ])
};


