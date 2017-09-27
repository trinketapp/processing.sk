import { processing } from "./processing.js";
import Sk from "./skulpt.js";
import { makeFunc, optional } from "./utils.js";

const { int_, float } = Sk.builtin;

export default {
    bezier: makeFunc(processing, "bezier", [
        { "x1": [ int_, float ] },
        { "y1": [ int_, float ] },
        { "z1": [ int_, float ] },
        { "cx1": [ int_, float ] },
        { "cy1": [ int_, float ] },
        { "cz1": [ int_, float ] },
        { "cx2": [ int_, float ] },
        { "cy2": [ int_, float ] },
        { "cz2": [ int_, float ], optional },
        { "x2": [ int_, float ], optional },
        { "y2": [ int_, float ], optional },
        { "z2": [ int_, float ], optional }]),

    bezierDetail: makeFunc(processing, "bezierDetail", [
        { "detail": int_ }]),

    bezierPoint: makeFunc(processing, "bezierPoint", [
        { "a": [ int_, float ] },
        { "b": [ int_, float ] },
        { "c": [ int_, float ] },
        { "d": [ int_, float ] },
        { "t": float }]),

    bezierTangent: makeFunc(processing, "bezierTangent", [
        { "a": [ int_, float ] },
        { "b": [ int_, float ] },
        { "c": [ int_, float ] },
        { "d": [ int_, float ] },
        { "t": float }]),

    curve: makeFunc(processing, "curve", [
        { "x1": [ int_, float ] },
        { "y1": [ int_, float ] },
        { "z1": [ int_, float ] },
        { "x2": [ int_, float ] },
        { "y2": [ int_, float ] },
        { "z2": [ int_, float ] },
        { "x3": [ int_, float ] },
        { "y3": [ int_, float ] },
        { "z3": [ int_, float ], optional },
        { "x4": [ int_, float ], optional },
        { "y4": [ int_, float ], optional },
        { "z4": [ int_, float ], optional }]),

    curveDetail: makeFunc(processing, "curveDetail", [
        { "detail": int_ }]),

    curvePoint: makeFunc(processing, "curvePoint", [
        { "a": [ int_, float ] },
        { "b": [ int_, float ] },
        { "c": [ int_, float ] },
        { "d": [ int_, float ] },
        { "t": float }]),

    curveTangent: makeFunc(processing, "curveTangent" [
        { "a": [ int_, float ] },
        { "b": [ int_, float ] },
        { "c": [ int_, float ] },
        { "d": [ int_, float ] },
        { "t": float }]),

    curveTightness: makeFunc(processing, "curveTightness", [
        { "squishy": int_ }])
};