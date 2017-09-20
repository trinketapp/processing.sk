import processing from "./processing.js";
import Sk from "./skulpt.js";
import { makeFunc } from "./utils.js";
import constants from "./constants.js";

const { int_, str } = Sk.builtin;
const { ROUND, SQUARE, BUTT, MITTER, BEVEL,
    CENTER, RADIUS, CORNER, CORNERS  } = constants;

export default {
    elipseMode: makeFunc(processing, "elipseMode", [
        { "mode": int_, allowed: [ CENTER, RADIUS, CORNER, CORNERS ] }
    ]),

    noSmooth: makeFunc(processing, "noSmooth"),
    smooth: makeFunc(processing, "smooth"),

    rectMode: makeFunc(processing, "rectMode", [
        { "mode": int_, allowed: [ CENTER, RADIUS, CORNER, CORNERS ] }
    ]),

    strokeCap: makeFunc(processing, "strokeCap", [
        { "mode": str, allowed: [ ROUND, SQUARE, BUTT ] }
    ]),

    strokeJoin: makeFunc(processing, "strokeJoin", [
        { "mode": str, allowed: [ MITTER, BEVEL, ROUND ] }
    ]),

    strokeWeight: makeFunc(processing, "strokeWeight", [
        { "width": int_ }
    ])
};