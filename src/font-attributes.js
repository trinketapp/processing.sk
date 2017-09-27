import { processing } from "./processing.js";
import Sk from "./skulpt.js";
import constants from "./constants.js";
import { makeFunc } from "./utils.js";

const { LEFT, CENTER, RIGHT, TOP, BOTTOM, BASELINE,
    MODEL, SCREEN, SHAPE } = constants;
const { int_, float, str } = Sk.builtin;

export default {
    textAlign: makeFunc(processing, "textAlign", [
        { "ALIGN": int_, allowed: [ LEFT, CENTER, RIGHT ] },
        { "YALIGN": int_, allowed: [ TOP, BOTTOM, BASELINE, CENTER ] }
    ]),

    textLeading: makeFunc(processing, "textLeading", [
        { "dist": [ int_, float ] }
    ]),

    textMode: makeFunc(processing, "textMode", [
        { "MODE": int_, allowed: [ MODEL, SCREEN, SHAPE ] }
    ]),

    textSize: makeFunc(processing, "textSize", [
        { "size":  [ int_, float ] }
    ]),

    textWidth: makeFunc(processing, "textWidth", [
        { "width": str }
    ])
};