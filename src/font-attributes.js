import processing from "./processing.js";
import Sk from "./skulpt.js";
import constants from "./constants.js";
import { makeFunc } from "./utils.js";

const { LEFT, CENTER, RIGHT, TOP, BOTTOM, BASELINE,
    MODEL, SCREEN, SHAPE } = constants;
const { int, float, str } = Sk.builtin;

export default {
    textAlign: makeFunc(processing.textAlign, "textAlign", [
        { "ALIGN": int, allowed: [ LEFT, CENTER, RIGHT ] },
        { "YALIGN": int, allowed: [ TOP, BOTTOM, BASELINE, CENTER ] }
    ]),

    textLeading: makeFunc(processing.textLeading, "textLeading", [
        { "dist": [ int, float ] }
    ]),

    textMode: makeFunc(processing.textMode, "textMode", [
        { "MODE": int, allowed: [ MODEL, SCREEN, SHAPE ] }
    ]),

    textSize: makeFunc(processing.textSize, "textSize", [
        { "size":  [ int, float ] }
    ]),

    textWidth: makeFunc(processing.textWidth, "textWidth", [
        { "width": str }
    ])
};