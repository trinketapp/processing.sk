import processing from "./processing.js";
import Sk from "./skulpt.js";
import { makeFunc } from "./utils.js";
import PColor from "./color.js";

import constants from "./constants.js";

const { BLEND, ADD, SUBTRACT, DARKEST, LIGHTEST, DIFFERENCE,
    EXLUSION, MULTIPLY, SCREEN, OVERLAY, HARD_LIGHT, SOFT_LIGHT, DODGE, BURN } = constants;
const { int_, float } = Sk.builtin;
const { callsim } = Sk.misceval;

function blendColor(c1, c2, mode) {
    var c = callsim(PColor, new int_(0), new int_(0), new int_(0));
    c.v = processing.blendColor(c1, c2, mode);
    return c;
}

function lerpColor(c1, c2, mode) {
    var c = callsim(PColor, new int_(0), new int_(0), new int_(0));
    c.v = processing.lerpColor(c1, c2, mode);
    return c;
}

export default {
    alpha: makeFunc(processing, "alpha", [
        { "color": PColor }
    ]),

    blendColor: makeFunc(blendColor, "blendColor", [
        { "c1": PColor },
        { "c2": PColor },
        { "mode": int_, allowed: [ BLEND, ADD, SUBTRACT, DARKEST, LIGHTEST, DIFFERENCE,
            EXLUSION, MULTIPLY, SCREEN, OVERLAY, HARD_LIGHT, SOFT_LIGHT, DODGE, BURN ]}
    ]),

    blue: makeFunc(processing, "blue", [
        { "color": PColor }
    ]),

    brightness: makeFunc(processing, "brightness", [
        { "color": PColor }
    ]),

    green: makeFunc(processing, "green", [
        { "color": PColor }
    ]),

    hue: makeFunc(processing, "hue", [
        { "color": PColor }
    ]),

    lerpColor: makeFunc(lerpColor, "lerpColor", [
        { "c1": PColor },
        { "c2": PColor },
        { "amt": float }
    ]),

    red: makeFunc(processing, "red", [
        { "color": PColor }
    ]),

    saturation: makeFunc(processing, "saturation", [
        { "color": PColor }
    ])
};