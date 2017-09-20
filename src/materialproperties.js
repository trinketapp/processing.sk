import processing from "./processing.js";
import Sk from "./skulpt.js";
import { makeFunc, optional } from "./utils.js";
import PColor from "./color.js";

const { int_, float } = Sk.builtin;

export default {
    ambient: makeFunc(processing.ambient, "ambient", [
        { "gray": [ int_, float, PColor ] },
        { "v1": [ int_, float ], optional },
        { "v2": [ int_, float ], optional },
        { "v3": [ int_, float ], optional },
    ]),

    emissive: makeFunc(processing.emissive, "emissive", [
        { "gray": [ int_, float, PColor ] },
        { "v1": [ int_, float ], optional },
        { "v2": [ int_, float ], optional },
        { "v3": [ int_, float ], optional },
    ]),

    shininess: makeFunc(processing.shininess, "shininess", [
        { "shine": float }
    ]),

    specular: makeFunc(processing.specular, "specular", [
        { "gray": [ int_, float, PColor ] },
        { "v1": [ int_, float ], optional },
        { "v2": [ int_, float ], optional },
        { "v3": [ int_, float ], optional },
    ])
};