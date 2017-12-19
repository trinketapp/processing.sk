import Sk from "./skulpt.js";
import { processingProxy, makeFunc, strToColor } from "./utils.js";
import { remappedConstants } from "./constants.js";

const { BLEND, ADD, SUBTRACT, DARKEST, LIGHTEST, DIFFERENCE,
    EXLUSION, MULTIPLY, SCREEN, OVERLAY, HARD_LIGHT, SOFT_LIGHT, DODGE, BURN } = remappedConstants;
const { int_, float_, lng, str } = Sk.builtin;

export default {
    alpha: makeFunc(processingProxy, "alpha", [
        { "color": [ int_, lng, float_, str ], converter: strToColor }
    ]),

    blendColor: makeFunc(processingProxy, "blendColor", [
        { "c1": [ int_, lng, float_, str ], converter: strToColor },
        { "c2": [ int_, lng, float_, str ], converter: strToColor },
        { "mode": int_, allowed: [ BLEND, ADD, SUBTRACT, DARKEST, LIGHTEST, DIFFERENCE,
            EXLUSION, MULTIPLY, SCREEN, OVERLAY, HARD_LIGHT, SOFT_LIGHT, DODGE, BURN ]}
    ]),

    blue: makeFunc(processingProxy, "blue", [
        { "color": [ int_, lng, float_, str ], converter: strToColor }
    ]),

    brightness: makeFunc(processingProxy, "brightness", [
        { "color": [ int_, lng, float_, str ], converter: strToColor }
    ]),

    green: makeFunc(processingProxy, "green", [
        { "color": [ int_, lng, float_, str ], converter: strToColor }
    ]),

    hue: makeFunc(processingProxy, "hue", [
        { "color": [ int_, lng, float_, str ], converter: strToColor }
    ]),

    lerpColor: makeFunc(processingProxy, "lerpColor", [
        { "c1": [ int_, lng, float_, str ], converter: strToColor },
        { "c2": [ int_, lng, float_, str ], converter: strToColor },
        { "amt": [ int_, float_ ] }
    ]),

    red: makeFunc(processingProxy, "red", [
        { "color": [ int_, lng, float_, str ], converter: strToColor }
    ]),

    saturation: makeFunc(processingProxy, "saturation", [
        { "color": [ int_, lng, float_, str ], converter: strToColor }
    ])
};