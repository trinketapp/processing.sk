import processing from "./processing.js";
import Sk from "./skulpt.js";
import { makeFunc, optional } from "./utils.js";
import constants from "./constants.js";
import PColor from "./color.js";

const { RGB, HSB } = constants;
const { int, float } = Sk.builtin;

export default {
    background: makeFunc(processing.background, "background", [
        { "value1": [ int, float, PColor ] },
        { "value2": [ int, float ], optional },
        { "value2": [ int, float ], optional },
        { "alpha": [ int, float ], optional }
    ]),

    colorMode: makeFunc(processing.colorMode, "colorMode", [
        { "mode": int, allowed: [ RGB, HSB ] },
        { "range1": [ int, float ], optional },
        { "range2": [ int, float ], optional },
        { "range3": [ int, float ], optional },
        { "range4": [ int, float ], optional }
    ]),

    fill: makeFunc(processing.fill, "fill", [
        { "value1": [ int, float, PColor ] },
        { "value2": [ int, float ], optional },
        { "value2": [ int, float ], optional },
        { "alpha": [ int, float ], optional }
    ]),

    noFill: makeFunc(processing.noFill, "noFill"),

    noStroke: makeFunc(processing.noStroke, "noStroke"),

    stroke: makeFunc(processing.stroke, "stroke", [
        { "value1": [ int, float, PColor ] },
        { "value2": [ int, float ], optional },
        { "value2": [ int, float ], optional },
        { "alpha": [ int, float ], optional }
    ])
};