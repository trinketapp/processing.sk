import processing from  'processing.js';
import Sk from 'skulpt.js';
import { makeFunc, optional } from 'utils.js';

const { int, str } = Sk.builtin;

export default {
    elipseMode: makeFunc(processing.elipseMode, [
        { "mode": int, allowed: [0, 1, 2, 3] }
    ]),

    noSmooth: makeFunc(processing.noSmooth),
    smooth: makeFunc(processing.smooth),

    rectMode: makeFunc(processing.rectMode, [
        { "mode": int, allowed: [0, 1, 2, 3] }
    ]),

    strokeCap: makeFunc(processing.strokeCap, [
        { "mode": str, allowed: ["round", "square", "butt"] }
    ]),

    strokeJoin: makeFunc(processing.strokeJoin, [
        { "mode": str, allowed: ["mitter", "bevel", "round"] }
    ]),

    strokeWeight: makeFunc(processing.strokeWeight, [
        { "width": int }
    ])
}