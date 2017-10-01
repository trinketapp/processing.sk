import Sk from "./skulpt.js";
import { processingProxy, makeFunc, optional } from "./utils.js";
import constants from "./constants.js";
import PColor from "./color.js";

const { RGB, HSB } = constants;
const { int_, float_ } = Sk.builtin;

export default {
    background: makeFunc(processingProxy, "background", [
        { "value1": [ int_, float_, PColor ] },
        { "value2": [ int_, float_ ], optional },
        { "value2": [ int_, float_ ], optional },
        { "alpha": [ int_, float_ ], optional }
    ]),

    colorMode: makeFunc(processingProxy, "colorMode", [
        { "mode": int_, allowed: [ RGB, HSB ] },
        { "range1": [ int_, float_ ], optional },
        { "range2": [ int_, float_ ], optional },
        { "range3": [ int_, float_ ], optional },
        { "range4": [ int_, float_ ], optional }
    ]),

    fill: makeFunc(processingProxy, "fill", [
        { "value1": [ int_, float_, PColor ] },
        { "value2": [ int_, float_ ], optional },
        { "value2": [ int_, float_ ], optional },
        { "alpha": [ int_, float_ ], optional }
    ]),

    noFill: makeFunc(processingProxy, "noFill"),

    noStroke: makeFunc(processingProxy, "noStroke"),

    stroke: makeFunc(processingProxy, "stroke", [
        { "value1": [ int_, float_, PColor ] },
        { "value2": [ int_, float_ ], optional },
        { "value2": [ int_, float_ ], optional },
        { "alpha": [ int_, float_ ], optional }
    ])
};