import Sk from "./skulpt.js";
import { processingProxy, makeFunc } from "./utils.js";

const { int_, float_ } = Sk.builtin;

export default {
    modelX: makeFunc(processingProxy, "modelX", [
        { x: [int_, float_] },
        { y: [int_, float_] },
        { z: [int_, float_] }
    ]),

    modelY: makeFunc(processingProxy, "modelY", [
        { x: [int_, float_] },
        { y: [int_, float_] },
        { z: [int_, float_] }
    ]),

    modelZ: makeFunc(processingProxy, "modelZ", [
        { x: [int_, float_] },
        { y: [int_, float_] },
        { z: [int_, float_] }
    ]),

    screenX: makeFunc(processingProxy, "screenX", [
        { x: [int_, float_] },
        { y: [int_, float_] },
        { z: [int_, float_] }
    ]),

    screenY: makeFunc(processingProxy, "screenY", [
        { x: [int_, float_] },
        { y: [int_, float_] },
        { z: [int_, float_] }
    ]),

    screenZ: makeFunc(processingProxy, "screenZ", [
        { x: [int_, float_] },
        { y: [int_, float_] },
        { z: [int_, float_] }
    ])
};
