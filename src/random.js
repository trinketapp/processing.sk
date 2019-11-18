import { processingProxy, makeFunc, optional } from "./utils.js";
import Sk from "./skulpt.js";

const { float_, int_ } = Sk.builtin;

export default {
    noise: makeFunc(processingProxy, "noise", [
        { x: [int_, float_] },
        { y: [int_, float_], optional },
        { z: [int_, float_], optional }
    ]),

    noiseDetail: makeFunc(processingProxy, "noiseDetail", [
        { octave: int_ },
        { falloff: [int_, float_], optional }
    ]),

    noiseSeed: makeFunc(processingProxy, "noiseSeed", [{ value: int_ }]),

    randomSeed: makeFunc(processingProxy, "randomSeed", [{ value: int_ }]),

    random: makeFunc(processingProxy, "random", [
        { low: [int_, float_] },
        { high: [int_, float_], optional }
    ]),

    randomGaussian: makeFunc(processingProxy, "randomGaussian")
};
