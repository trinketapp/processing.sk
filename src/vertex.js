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
        { "x": [ int_, float_ ] },
        { "y": [ int_, float_ ] },
        { "z": [ int_, float_ ] },
        { "u": [ int_, float_ ], optional },
        { "v": [ int_, float_ ], optional }
    ]),

    bezierVertex: makeFunc(processingProxy, "bezierVertex", [
        { "cx1": [ int_, float_ ] },
        { "cy1": [ int_, float_ ] },
        { "cz1": [ int_, float_ ] },
        { "cx2": [ int_, float_ ] },
        { "cy2": [ int_, float_ ] },
        { "cz2": [ int_, float_ ] },
        { "x": [ int_, float_ ], optional },
        { "y": [ int_, float_ ], optional },
        { "z": [ int_, float_ ], optional }
    ]),

    curveVertex: makeFunc(processingProxy, "curveVertex", [
        { "x": [ int_, float_ ] },
        { "y": [ int_, float_ ] },
        { "z": [ int_, float_ ], optional }
    ]),

    texture: makeFunc(processingProxy, "texture" [
        { "img": PImage }
    ]),

    textureMode: makeFunc(processingProxy, "textureMode", [
        { "img": int_, allowed: [ IMAGE, NORMALIZED ] }
    ])
};