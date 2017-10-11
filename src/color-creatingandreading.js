import Sk from "./skulpt.js";
import { processingProxy, makeFunc } from "./utils.js";
import { color } from "./processing.js";

import { remappedConstants } from "./constants.js";

const { BLEND, ADD, SUBTRACT, DARKEST, LIGHTEST, DIFFERENCE,
    EXLUSION, MULTIPLY, SCREEN, OVERLAY, HARD_LIGHT, SOFT_LIGHT, DODGE, BURN } = remappedConstants;
const { int_, float_ } = Sk.builtin;
const { callsim } = Sk.misceval;

function blendColor(c1, c2, mode) {
    var c = callsim(color, new int_(0), new int_(0), new int_(0));
    c.v = processingProxy.blendColor(c1, c2, mode);
    return c;
}

function lerpColor(c1, c2, mode) {
    var c = callsim(color, new int_(0), new int_(0), new int_(0));
    c.v = processingProxy.lerpColor(c1, c2, mode);
    return c;
}

export default {
    alpha: makeFunc(processingProxy, "alpha", [
        { "color": "color" }
    ]),

    blendColor: makeFunc(blendColor, "blendColor", [
        { "c1": "color" },
        { "c2": "color" },
        { "mode": int_, allowed: [ BLEND, ADD, SUBTRACT, DARKEST, LIGHTEST, DIFFERENCE,
            EXLUSION, MULTIPLY, SCREEN, OVERLAY, HARD_LIGHT, SOFT_LIGHT, DODGE, BURN ]}
    ]),

    blue: makeFunc(processingProxy, "blue", [
        { "color": "color" }
    ]),

    brightness: makeFunc(processingProxy, "brightness", [
        { "color": "color" }
    ]),

    green: makeFunc(processingProxy, "green", [
        { "color": "color" }
    ]),

    hue: makeFunc(processingProxy, "hue", [
        { "color": "color" }
    ]),

    lerpColor: makeFunc(lerpColor, "lerpColor", [
        { "c1": "color" },
        { "c2": "color" },
        { "amt": [ int_, float_ ] }
    ]),

    red: makeFunc(processingProxy, "red", [
        { "color": "color" }
    ]),

    saturation: makeFunc(processingProxy, "saturation", [
        { "color": "color" }
    ])
};