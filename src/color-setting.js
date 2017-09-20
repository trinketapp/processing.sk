import processing from "./processing.js";
import Sk from "./skulpt.js";
import { makeFunc, optional } from "./utils.js";
import constants from "./constants.js";
import PColor from "./color.js";

const { RGB, HSB } = constants;
const { int_, float } = Sk.builtin;

export default {
    background: makeFunc(processing, "background", [
        { "value1": [ int_, float, PColor ] },
        { "value2": [ int_, float ], optional },
        { "value2": [ int_, float ], optional },
        { "alpha": [ int_, float ], optional }
    ]),

    colorMode: makeFunc(processing, "colorMode", [
        { "mode": int_, allowed: [ RGB, HSB ] },
        { "range1": [ int_, float ], optional },
        { "range2": [ int_, float ], optional },
        { "range3": [ int_, float ], optional },
        { "range4": [ int_, float ], optional }
    ]),

    fill: makeFunc(processing, "fill", [
        { "value1": [ int_, float, PColor ] },
        { "value2": [ int_, float ], optional },
        { "value2": [ int_, float ], optional },
        { "alpha": [ int_, float ], optional }
    ]),

    noFill: makeFunc(processing, "noFill"),

    noStroke: makeFunc(processing, "noStroke"),

    stroke: makeFunc(processing, "stroke", [
        { "value1": [ int_, float, PColor ] },
        { "value2": [ int_, float ], optional },
        { "value2": [ int_, float ], optional },
        { "alpha": [ int_, float ], optional }
    ])
};