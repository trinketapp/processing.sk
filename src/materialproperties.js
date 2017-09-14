import processing from "./processing.js";
import Sk from "./skulpt.js";
import { makeFunc, optional } from "./utils.js";
import PColor from "./color.js";

const { int, float } = Sk.builtin;

export default {
    ambient: makeFunc(processing.ambient, "ambient", [
        { "gray": [ int, float, PColor ] },
        { "v1": [ int, float ], optional },
        { "v2": [ int, float ], optional },
        { "v3": [ int, float ], optional },
    ]),

    emissive: makeFunc(processing.emissive, "emissive", [
        { "gray": [ int, float, PColor ] },
        { "v1": [ int, float ], optional },
        { "v2": [ int, float ], optional },
        { "v3": [ int, float ], optional },
    ]),

    shininess: makeFunc(processing.shininess, "shininess", [
        { "shine": float }
    ]),

    specular: makeFunc(processing.specular, "specular", [
        { "gray": [ int, float, PColor ] },
        { "v1": [ int, float ], optional },
        { "v2": [ int, float ], optional },
        { "v3": [ int, float ], optional },
    ])
};