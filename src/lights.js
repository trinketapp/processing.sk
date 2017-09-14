import processing from "./processing.js";
import Sk from "./skulpt.js";
import { makeFunc, optional } from "./utils.js";

const { int, float } = Sk.builtin;

export default {
    ambientLight: makeFunc(processing.ambientLight, "ambientLight", [
        { "v1": [ int, float ] },
        { "v2": [ int, float ] },
        { "v3": [ int, float ] },
        { "x": [ int, float ], optional },
        { "y": [ int, float ], optional },
        { "z": [ int, float ], optional }
    ]),

    directionalLight: makeFunc(processing.directionalLight, "directionalLight", [
        { "v1": [ int, float ] },
        { "v2": [ int, float ] },
        { "v3": [ int, float ] },
        { "nx": [ int, float ], optional },
        { "ny": [ int, float ], optional },
        { "nz": [ int, float ], optional }
    ]),

    lightFalloff: makeFunc(processing.lightFalloff, "lightFalloff", [
        { "constant": [ int, float ] },
        { "linear": [ int, float ] },
        { "quardatic": [ int, float ] }
    ]),

    lightSpecular: makeFunc(processing.lightSpecular, "lightSpecular", [
        { "v1": [ int, float ] },
        { "v2": [ int, float ] },
        { "v3": [ int, float ] }
    ]),

    lights: makeFunc(processing.lights, "lights"),

    noLights: makeFunc(processing.noLights, "noLights"),

    normal: makeFunc(processing.normal, "normal", [
        { "nx": [ int, float ] },
        { "ny": [ int, float ] },
        { "nz": [ int, float ] }
    ]),

    pointLight: makeFunc(processing.pointLight, "pointLight", [
        { "v1": [ int, float ] },
        { "v2": [ int, float ] },
        { "v3": [ int, float ] },
        { "nx": [ int, float ] },
        { "ny": [ int, float ] },
        { "nz": [ int, float ] }
    ]),

    spotLight: makeFunc(processing.spotLight, "spotLight", [
        { "v1": [ int, float ] },
        { "v2": [ int, float ] },
        { "v3": [ int, float ] },
        { "nx": [ int, float ] },
        { "ny": [ int, float ] },
        { "nz": [ int, float ] },
        { "angle": float },
        { "concentration": float }
    ])
};