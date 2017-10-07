import Sk from "./skulpt.js";
import { processingProxy, makeFunc, optional } from "./utils.js";

const { float_, int_ } = Sk.builtin;

export default {
    box: makeFunc(processingProxy, "box", [
        { "width": [ int_, float_ ] },
        { "height": [ int_, float_ ], optional },
        { "depth": [ int_, float_ ], optional }
    ]),

    sphere: makeFunc(processingProxy, "sphere", [
        { "radius": [ int_, float_ ] }
    ]),

    sphereDetail: makeFunc(processingProxy, "sphereDetail", [
        { "ures": int_ },
        { "vres": int_, optional }
    ])
};
