import Sk from "./skulpt.js";
import constants, { remappedConstants } from "./constants.js";
import { processingProxy, makeFunc, optional, constructOptionalContectManager, self } from "./utils.js";

const { float_, int_ } = Sk.builtin;
const { IMAGE, NORMALIZED, POINTS, LINES, TRIANGLES, TRIANGLE_FAN, TRIANGLE_STRIP,
    QUADS, QUAD_STRIP, CLOSE } = remappedConstants;

export default {
    beginShape: constructOptionalContectManager({
        __call__: makeFunc((self, mode) => processingProxy.beginShape(mode), "__call__", [
            self,
            { "MODE": int_, allowed: [ POINTS, LINES, TRIANGLES, TRIANGLE_FAN,
                TRIANGLE_STRIP, QUADS, QUAD_STRIP ], optional }
        ]),
        __enter__: makeFunc((self, mode) => processingProxy.beginShape(mode), "__enter__", [
            self,
            { "MODE": int_, allowed: [ POINTS, LINES, TRIANGLES, TRIANGLE_FAN,
                TRIANGLE_STRIP, QUADS, QUAD_STRIP ], optional }
        ]),
        __exit__: makeFunc(() => processingProxy.endShape, "__exit__", [ self ])
    }, "beginShape"),

    beginClosedShape: constructOptionalContectManager({
        __call__: makeFunc((self, mode) => processingProxy.beginShape(mode), "__call__", [
            self,
            { "MODE": int_, allowed: [ POINTS, LINES, TRIANGLES, TRIANGLE_FAN,
                TRIANGLE_STRIP, QUADS, QUAD_STRIP ], optional }
        ]),
        __enter__: makeFunc((self, mode) => processingProxy.beginShape(mode), "__enter__", [
            self,
            { "MODE": int_, allowed: [ POINTS, LINES, TRIANGLES, TRIANGLE_FAN,
                TRIANGLE_STRIP, QUADS, QUAD_STRIP ], optional }
        ]),
        __exit__: makeFunc(() => processingProxy.endShape(constants.CLOSE), "__exit__", [ self ])
    }, "beginClosedShape"),

    endShape: makeFunc(processingProxy, "endShape", [
        { "MODE": int_, allowed: [ CLOSE ], optional }
    ]),

    vertex: makeFunc(processingProxy, "vertex", [
        { "x": [ int_, float_ ] },
        { "y": [ int_, float_ ] },
        { "z": [ int_, float_ ], optional },
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

    texture: makeFunc(processingProxy, "texture", [
        { "img": "PImage" }
    ]),

    textureMode: makeFunc(processingProxy, "textureMode", [
        { "img": int_, allowed: [ IMAGE, NORMALIZED ] }
    ])
};