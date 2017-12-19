import Sk from "./skulpt.js";
import { processingProxy, makeFunc, optional, strToColor } from "./utils.js";

const { float_, int_, str, lng } = Sk.builtin;

export default makeFunc(processingProxy, "color", [
    { "value1": [ int_, float_, str, lng ], "converter": strToColor },
    { "value2": [ int_, float_ ], optional },
    { "value3": [ int_, float_ ], optional },
    { "alpha": [ int_, float_ ], optional }
]);