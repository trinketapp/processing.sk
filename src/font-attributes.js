import Sk from "./skulpt.js";
import { remappedConstants } from "./constants.js";
import { processingProxy, makeFunc } from "./utils.js";

const { LEFT, CENTER, RIGHT, TOP, BOTTOM, BASELINE,
    MODEL, SCREEN, SHAPE } = remappedConstants;
const { int_, float_, str } = Sk.builtin;

export default {
    textAlign: makeFunc(processingProxy, "textAlign", [
        { "ALIGN": int_, allowed: [ LEFT, CENTER, RIGHT ] },
        { "YALIGN": int_, allowed: [ TOP, BOTTOM, BASELINE, CENTER ] }
    ]),

    textLeading: makeFunc(processingProxy, "textLeading", [
        { "dist": [ int_, float_ ] }
    ]),

    textMode: makeFunc(processingProxy, "textMode", [
        { "MODE": int_, allowed: [ MODEL, SCREEN, SHAPE ] }
    ]),

    textSize: makeFunc(processingProxy, "textSize", [
        { "size":  [ int_, float_ ] }
    ]),

    textWidth: makeFunc(processingProxy, "textWidth", [
        { "width": str }
    ])
};