import processing from "./processing.js";
import Sk from "./skulpt.js";
import { makeFunc } from "./utils.js";

const { int, float } = Sk.builtin;

export default {
    degrees: makeFunc(processing.degrees, "degrees", [
        { "angle": [ int, float ] }
    ]),

    radians: makeFunc(processing.radians, "radians", [
        { "angle": [ int, float ] }
    ]),
};
