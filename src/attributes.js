import processing from  'processing.js';
import Sk from 'skulpt.js';
import { makeFunc, optional } from 'utils.js';
import { ROUND, SQUARE, BUTT, MITTER, BEVEL,
         CENTER, RADIUS, CORNER, CORNERS  } from "constants.js";

const { int, str } = Sk.builtin;

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
}