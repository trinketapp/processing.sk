import processing from "./processing.js";
import Sk from "./skulpt.js";
import constants from "./constants.js";
import PImage from "./image.js";
import { makeFunc, optional } from "./utils.js";

const { float, int_ } = Sk.builtin;
const { IMAGE, NORMALIZED } = constants;

export default {
    beginShape: makeFunc(processing, "beginShape"),

    endShape: makeFunc(processing, "endShape"),

    vertex: makeFunc(processing, "vertex", [
        { "x": float },
        { "y": float },
        { "z": float },
        { "u": float, optional },
        { "v": float, optional }
    ]),

    bezierVertex: makeFunc(processing, "bezierVertex", [
        { "cx1": float },
        { "cy1": float },
        { "cz1": float },
        { "cx2": float },
        { "cy2": float },
        { "cz2": float },
        { "x": float, optional },
        { "y": float, optional },
        { "z": float, optional }
    ]),

    curveVertex: makeFunc(processing, "curveVertex", [
        { "x": float },
        { "y": float },
        { "z": float, optional }
    ]),

    texture: makeFunc(processing, "texture" [
        { "img": PImage }
    ]),

    textureMode: makeFunc(processing, "textureMode", [
        { "img": int_, allowed: [ IMAGE, NORMALIZED ] }
    ])
};