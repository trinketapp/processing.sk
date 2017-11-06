import Sk from "./skulpt.js";
import { processingProxy, makeFunc, ignored, optional } from "./utils.js";
import { remappedConstants } from "./constants.js";

const { int_, str, float_ } = Sk.builtin;
const { ROUND, SQUARE, BUTT, MITTER, BEVEL,
    CENTER, RADIUS, CORNER, CORNERS  } = remappedConstants;

export default {
    ellipseMode: makeFunc(processingProxy, "ellipseMode", [
        { "mode": int_, allowed: [ CENTER, RADIUS, CORNER, CORNERS ] }
    ]),

    noSmooth: makeFunc(processingProxy, "noSmooth"),

    smooth: makeFunc(processingProxy, "smooth", [
        { "level": int_, allows: [ 2, 4, 8 ], ignored, optional }
    ]),

    rectMode: makeFunc(processingProxy, "rectMode", [
        { "mode": int_, allowed: [ CENTER, RADIUS, CORNER, CORNERS ] }
    ]),

    strokeCap: makeFunc(processingProxy, "strokeCap", [
        { "mode": str, allowed: [ ROUND, SQUARE, BUTT ] }
    ]),

    strokeJoin: makeFunc(processingProxy, "strokeJoin", [
        { "mode": str, allowed: [ MITTER, BEVEL, ROUND ] }
    ]),

    strokeWeight: makeFunc(processingProxy, "strokeWeight", [
        { "width": [ int_, float_ ] }
    ])
};