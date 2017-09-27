import { processing } from "./processing.js";
import Sk from "./skulpt.js";
import { makeFunc } from "./utils.js";

const { int_, float } = Sk.builtin;

export default {
    degrees: makeFunc(processing, "degrees", [
        { "angle": [ int_, float ] }
    ]),

    radians: makeFunc(processing, "radians", [
        { "angle": [ int_, float ] }
    ]),
};
