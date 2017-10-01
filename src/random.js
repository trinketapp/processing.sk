import { processingProxy, makeFunc, optional } from "./utils.js";
import Sk from "./skulpt.js";

const { float_, int_ } = Sk.builtin;

export default {
    noise: makeFunc(processingProxy, "noise", [
        { "x": float_ },
        { "y": float_, optional },
        { "z": float_, optional },
    ]),

    noiseDetail: makeFunc(processingProxy, "noiseDetail", [
        { "octave": int_ },
        { "falloff": float_ }
    ]),

    noiseSeed: makeFunc(processingProxy, "noiseSeed", [
        { "value": int_ }
    ]),

    randomSeed: makeFunc(processingProxy, "randomSeed", [
        { "value": int_ }
    ]),

    random: makeFunc(processingProxy, "random", [
        { low: [ int_, float_ ] },
        { high: [ int_, float_ ], optional }
    ])
};
