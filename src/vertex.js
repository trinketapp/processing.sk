import Sk from "./skulpt.js";
import { remappedConstants } from "./constants.js";
import PImage from "./image.js";
import { processingProxy, makeFunc, optional } from "./utils.js";

const { float_, int_ } = Sk.builtin;
const { IMAGE, NORMALIZED } = remappedConstants;

export default {
    beginShape: makeFunc(processingProxy, "beginShape"),

    endShape: makeFunc(processingProxy, "endShape"),

    vertex: makeFunc(processingProxy, "vertex", [
        { "x": float_ },
        { "y": float_ },
        { "z": float_ },
        { "u": float_, optional },
        { "v": float_, optional }
    ]),

    bezierVertex: makeFunc(processingProxy, "bezierVertex", [
        { "cx1": float_ },
        { "cy1": float_ },
        { "cz1": float_ },
        { "cx2": float_ },
        { "cy2": float_ },
        { "cz2": float_ },
        { "x": float_, optional },
        { "y": float_, optional },
        { "z": float_, optional }
    ]),

    curveVertex: makeFunc(processingProxy, "curveVertex", [
        { "x": float_ },
        { "y": float_ },
        { "z": float_, optional }
    ]),

    texture: makeFunc(processingProxy, "texture" [
        { "img": PImage }
    ]),

    textureMode: makeFunc(processingProxy, "textureMode", [
        { "img": int_, allowed: [ IMAGE, NORMALIZED ] }
    ])
};