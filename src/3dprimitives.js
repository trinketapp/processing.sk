import Sk from "./skulpt.js";
import { processingProxy, makeFunc, optional } from "./utils.js";

const { float_ } = Sk.builtin;

export default {
    box: makeFunc(processingProxy, "box", [
        { "width": float_ },
        { "height": float_, optional },
        { "depth": float_, optional }
    ]),

    sphere: makeFunc(processingProxy, "sphere", [
        { "radius": float_ }
    ]),

    sphereDetail: makeFunc(processingProxy, "sphereDetail", [
        { "ures": float_ },
        { "vres": float_, optional }
    ])
};
