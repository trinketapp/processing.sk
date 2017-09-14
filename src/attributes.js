import processing from "./processing.js";
import Sk from "./skulpt.js";
import { makeFunc } from "./utils.js";
import constants from "./constants.js";

const { int, str } = Sk.builtin;
const { ROUND, SQUARE, BUTT, MITTER, BEVEL,
    CENTER, RADIUS, CORNER, CORNERS  } = constants;

export default {
    elipseMode: makeFunc(processing.elipseMode, "elipseMode", [
        { "mode": int, allowed: [ CENTER, RADIUS, CORNER, CORNERS ] }
    ]),

    noSmooth: makeFunc(processing.noSmooth, "noSmooth"),
    smooth: makeFunc(processing.smooth, "smooth"),

    rectMode: makeFunc(processing.rectMode, "rectMode", [
        { "mode": int, allowed: [ CENTER, RADIUS, CORNER, CORNERS ] }
    ]),

    strokeCap: makeFunc(processing.strokeCap, "strokeCap", [
        { "mode": str, allowed: [ ROUND, SQUARE, BUTT ] }
    ]),

    strokeJoin: makeFunc(processing.strokeJoin, "strokeJoin", [
        { "mode": str, allowed: [ MITTER, BEVEL, ROUND ] }
    ]),

    strokeWeight: makeFunc(processing.strokeWeight, [
        { "width": int }
    ])
};