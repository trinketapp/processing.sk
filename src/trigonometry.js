import Sk from "./skulpt.js";
import { processingProxy, makeFunc } from "./utils.js";

const { int_, float_ } = Sk.builtin;

export default {
    degrees: makeFunc(processingProxy, "degrees", [
        { "angle": [ int_, float_ ] }
    ]),

    radians: makeFunc(processingProxy, "radians", [
        { "angle": [ int_, float_ ] }
    ]),
};
