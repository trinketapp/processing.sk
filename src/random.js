import { makeFunc, optional } from "./utils.js";
import Sk from "./skulpt.js";
import processing from "./processing.js";

const { float, int } = Sk.builtin;

export default {
    noise: makeFunc(processing.noise, "noise", [
        { "x": float },
        { "y": float, optional },
        { "z": float, optional },
    ]),

    noiseDetail: makeFunc(processing.noiseDetail, "noiseDetail", [
        { "octave": int },
        { "falloff": float }
    ]),

    noiseSeed: makeFunc(processing.noiseSeed, "noiseSeed", [
        { "value": int }
    ]),

    randomSeed: makeFunc(processing.randomSeed, "randomSeed", [
        { "value": int }
    ]),

    random: makeFunc(processing.random, "random", [
        { low: [ int, float ] },
        { high: [ int, float ], optional }
    ])
};
