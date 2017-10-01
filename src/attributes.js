import Sk from "./skulpt.js";
import { processingProxy, makeFunc } from "./utils.js";
import constants from "./constants.js";

const { int_, str } = Sk.builtin;
const { ROUND, SQUARE, BUTT, MITTER, BEVEL,
    CENTER, RADIUS, CORNER, CORNERS  } = constants;

export default {
    elipseMode: makeFunc(processingProxy, "elipseMode", [
        { "mode": int_, allowed: [ CENTER, RADIUS, CORNER, CORNERS ] }
    ]),

    noSmooth: makeFunc(processingProxy, "noSmooth"),
    smooth: makeFunc(processingProxy, "smooth"),

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
        { "width": int_ }
    ])
};