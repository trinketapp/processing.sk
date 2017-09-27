import { makeFunc, optional } from "./utils.js";
import Sk from "./skulpt.js";
import { processing } from "./processing.js";

const { float, int_ } = Sk.builtin;

export default {
    noise: makeFunc(processing, "noise", [
        { "x": float },
        { "y": float, optional },
        { "z": float, optional },
    ]),

    noiseDetail: makeFunc(processing, "noiseDetail", [
        { "octave": int_ },
        { "falloff": float }
    ]),

    noiseSeed: makeFunc(processing, "noiseSeed", [
        { "value": int_ }
    ]),

    randomSeed: makeFunc(processing, "randomSeed", [
        { "value": int_ }
    ]),

    random: makeFunc(processing, "random", [
        { low: [ int_, float ] },
        { high: [ int_, float ], optional }
    ])
};
