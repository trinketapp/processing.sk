import Sk from "./skulpt.js";
import { processingProxy, makeFunc, optional } from "./utils.js";

const { int_, float_, list } = Sk.builtin;

export default {
    abs: makeFunc(processingProxy, "abs", [
        { "value": [ int_, float_ ] }
    ]),

    ceil: makeFunc(processingProxy, "ceil", [
        { "value": [ int_, float_ ] }
    ]),

    constrain: makeFunc(processingProxy, "constrain", [
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

    exp: makeFunc(processingProxy, "exp", [
        { "value": [ int_, float_ ] }
    ]),

    floor: makeFunc(processingProxy, "floor", [
        { "value": [ int_, float_ ] }
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

    max: makeFunc(processingProxy, "max", [
        { "values": [ list, int_, float_  ] },
        { "b": [ int_, float_  ], optional },
        { "c": [ int_, float_  ], optional }
    ]),

    min: makeFunc(processingProxy, "min", [
        { "values": [ list, int_, float_  ] },
        { "b": [ int_, float_  ], optional },
        { "c": [ int_, float_  ], optional }
    ]),

    norm: makeFunc(processingProxy, "norm", [
        { "value": [ int_, float_ ] },
        { "low": [ int_, float_ ] },
        { "high": [ int_, float_ ] }
    ]),

    pow:  makeFunc(processingProxy, "pow", [
        { "n": [ int_, float_ ] },
        { "e": [ int_, float_ ] },
    ]),

    round: makeFunc(processingProxy, "round", [
        { "value": [ int_, float_ ] }
    ]),

    sq: makeFunc(processingProxy, "sq", [
        { "value": [ int_, float_ ] }
    ]),

    sqrt: makeFunc(processingProxy, "sq", [
        { "value": [ int_, float_ ] }
    ]),
};


