import Sk from "./skulpt.js";
import { processingProxy, makeFunc } from "./utils.js";

const { int_, float_ } = Sk.builtin;

export default {
    degrees: makeFunc(processingProxy, "degrees", [{ angle: [int_, float_] }]),

    radians: makeFunc(processingProxy, "radians", [{ angle: [int_, float_] }]),

    cos: makeFunc(processingProxy, "cos", [{ angle: [int_, float_] }]),

    sin: makeFunc(processingProxy, "sin", [{ angle: [int_, float_] }]),

    tan: makeFunc(processingProxy, "tan", [{ angle: [int_, float_] }]),

    acos: makeFunc(processingProxy, "acos", [{ value: [int_, float_] }]),

    asin: makeFunc(processingProxy, "asin", [{ value: [int_, float_] }]),

    atan: makeFunc(processingProxy, "tan", [{ angle: [int_, float_] }]),

    atan2: makeFunc(processingProxy, "atan2", [
        { x: [int_, float_] },
        { y: [int_, float_] }
    ])
};
