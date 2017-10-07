import Sk from "./skulpt.js";
import { processingProxy, makeFunc } from "./utils.js";
import PColor from "./color.js";

import { remappedConstants } from "./constants.js";

const { BLEND, ADD, SUBTRACT, DARKEST, LIGHTEST, DIFFERENCE,
    EXLUSION, MULTIPLY, SCREEN, OVERLAY, HARD_LIGHT, SOFT_LIGHT, DODGE, BURN } = remappedConstants;
const { int_, float_ } = Sk.builtin;
const { callsim } = Sk.misceval;

function blendColor(c1, c2, mode) {
    var c = callsim(PColor, new int_(0), new int_(0), new int_(0));
    c.v = processingProxy.blendColor(c1, c2, mode);
    return c;
}

function lerpColor(c1, c2, mode) {
    var c = callsim(PColor, new int_(0), new int_(0), new int_(0));
    c.v = processingProxy.lerpColor(c1, c2, mode);
    return c;
}

export default {
    alpha: makeFunc(processingProxy, "alpha", [
        { "color": PColor }
    ]),

    blendColor: makeFunc(blendColor, "blendColor", [
        { "c1": PColor },
        { "c2": PColor },
        { "mode": int_, allowed: [ BLEND, ADD, SUBTRACT, DARKEST, LIGHTEST, DIFFERENCE,
            EXLUSION, MULTIPLY, SCREEN, OVERLAY, HARD_LIGHT, SOFT_LIGHT, DODGE, BURN ]}
    ]),

    blue: makeFunc(processingProxy, "blue", [
        { "color": PColor }
    ]),

    brightness: makeFunc(processingProxy, "brightness", [
        { "color": PColor }
    ]),

    green: makeFunc(processingProxy, "green", [
        { "color": PColor }
    ]),

    hue: makeFunc(processingProxy, "hue", [
        { "color": PColor }
    ]),

    lerpColor: makeFunc(lerpColor, "lerpColor", [
        { "c1": PColor },
        { "c2": PColor },
        { "amt": [ int_, float_ ] }
    ]),

    red: makeFunc(processingProxy, "red", [
        { "color": PColor }
    ]),

    saturation: makeFunc(processingProxy, "saturation", [
        { "color": PColor }
    ])
};