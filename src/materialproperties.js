import Sk from "./skulpt.js";
import { processingProxy, makeFunc, optional } from "./utils.js";
import PColor from "./color.js";

const { int_, float_ } = Sk.builtin;

export default {
    ambient: makeFunc(processingProxy, "ambient", [
        { "gray": [ int_, float_, PColor ] },
        { "v1": [ int_, float_ ], optional },
        { "v2": [ int_, float_ ], optional },
        { "v3": [ int_, float_ ], optional },
    ]),

    emissive: makeFunc(processingProxy, "emissive", [
        { "gray": [ int_, float_, PColor ] },
        { "v1": [ int_, float_ ], optional },
        { "v2": [ int_, float_ ], optional },
        { "v3": [ int_, float_ ], optional },
    ]),

    shininess: makeFunc(processingProxy, "shininess", [
        { "shine": float_ }
    ]),

    specular: makeFunc(processingProxy, "specular", [
        { "gray": [ int_, float_, PColor ] },
        { "v1": [ int_, float_ ], optional },
        { "v2": [ int_, float_ ], optional },
        { "v3": [ int_, float_ ], optional },
    ])
};