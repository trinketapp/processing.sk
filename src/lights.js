import processing from "./processing.js";
import Sk from "./skulpt.js";
import { makeFunc, optional } from "./utils.js";

const { int_, float } = Sk.builtin;

export default {
    ambientLight: makeFunc(processing, "ambientLight", [
        { "v1": [ int_, float ] },
        { "v2": [ int_, float ] },
        { "v3": [ int_, float ] },
        { "x": [ int_, float ], optional },
        { "y": [ int_, float ], optional },
        { "z": [ int_, float ], optional }
    ]),

    directionalLight: makeFunc(processing, "directionalLight", [
        { "v1": [ int_, float ] },
        { "v2": [ int_, float ] },
        { "v3": [ int_, float ] },
        { "nx": [ int_, float ], optional },
        { "ny": [ int_, float ], optional },
        { "nz": [ int_, float ], optional }
    ]),

    lightFalloff: makeFunc(processing, "lightFalloff", [
        { "constant": [ int_, float ] },
        { "linear": [ int_, float ] },
        { "quardatic": [ int_, float ] }
    ]),

    lightSpecular: makeFunc(processing, "lightSpecular", [
        { "v1": [ int_, float ] },
        { "v2": [ int_, float ] },
        { "v3": [ int_, float ] }
    ]),

    lights: makeFunc(processing, "lights"),

    noLights: makeFunc(processing, "noLights"),

    normal: makeFunc(processing, "normal", [
        { "nx": [ int_, float ] },
        { "ny": [ int_, float ] },
        { "nz": [ int_, float ] }
    ]),

    pointLight: makeFunc(processing, "pointLight", [
        { "v1": [ int_, float ] },
        { "v2": [ int_, float ] },
        { "v3": [ int_, float ] },
        { "nx": [ int_, float ] },
        { "ny": [ int_, float ] },
        { "nz": [ int_, float ] }
    ]),

    spotLight: makeFunc(processing, "spotLight", [
        { "v1": [ int_, float ] },
        { "v2": [ int_, float ] },
        { "v3": [ int_, float ] },
        { "nx": [ int_, float ] },
        { "ny": [ int_, float ] },
        { "nz": [ int_, float ] },
        { "angle": float },
        { "concentration": float }
    ])
};