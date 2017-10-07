import Sk from "./skulpt.js";
import { processingProxy, makeFunc, optional } from "./utils.js";

const { int_, float_ } = Sk.builtin;

export default {
    ambientLight: makeFunc(processingProxy, "ambientLight", [
        { "v1": [ int_, float_ ] },
        { "v2": [ int_, float_ ] },
        { "v3": [ int_, float_ ] },
        { "x": [ int_, float_ ], optional },
        { "y": [ int_, float_ ], optional },
        { "z": [ int_, float_ ], optional }
    ]),

    directionalLight: makeFunc(processingProxy, "directionalLight", [
        { "v1": [ int_, float_ ] },
        { "v2": [ int_, float_ ] },
        { "v3": [ int_, float_ ] },
        { "nx": [ int_, float_ ], optional },
        { "ny": [ int_, float_ ], optional },
        { "nz": [ int_, float_ ], optional }
    ]),

    lightFalloff: makeFunc(processingProxy, "lightFalloff", [
        { "constant": [ int_, float_ ] },
        { "linear": [ int_, float_ ] },
        { "quardatic": [ int_, float_ ] }
    ]),

    lightSpecular: makeFunc(processingProxy, "lightSpecular", [
        { "v1": [ int_, float_ ] },
        { "v2": [ int_, float_ ] },
        { "v3": [ int_, float_ ] }
    ]),

    lights: makeFunc(processingProxy, "lights"),

    noLights: makeFunc(processingProxy, "noLights"),

    normal: makeFunc(processingProxy, "normal", [
        { "nx": [ int_, float_ ] },
        { "ny": [ int_, float_ ] },
        { "nz": [ int_, float_ ] }
    ]),

    pointLight: makeFunc(processingProxy, "pointLight", [
        { "v1": [ int_, float_ ] },
        { "v2": [ int_, float_ ] },
        { "v3": [ int_, float_ ] },
        { "nx": [ int_, float_ ] },
        { "ny": [ int_, float_ ] },
        { "nz": [ int_, float_ ] }
    ]),

    spotLight: makeFunc(processingProxy, "spotLight", [
        { "v1": [ int_, float_ ] },
        { "v2": [ int_, float_ ] },
        { "v3": [ int_, float_ ] },
        { "nx": [ int_, float_ ] },
        { "ny": [ int_, float_ ] },
        { "nz": [ int_, float_ ] },
        { "angle": [ int_, float_ ] },
        { "concentration": [ int_, float_ ] }
    ])
};