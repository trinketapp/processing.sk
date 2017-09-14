import processing from "./processing.js";
import Sk from "./skulpt.js";
import { makeFunc, optional } from "./utils.js";

const { int, float } = Sk.builtin;

export default {
    bezier: makeFunc(processing.bezier, "bezier", [
        { "x1": [ int, float ] },
        { "y1": [ int, float ] },
        { "z1": [ int, float ] },
        { "cx1": [ int, float ] },
        { "cy1": [ int, float ] },
        { "cz1": [ int, float ] },
        { "cx2": [ int, float ] },
        { "cy2": [ int, float ] },
        { "cz2": [ int, float ], optional },
        { "x2": [ int, float ], optional },
        { "y2": [ int, float ], optional },
        { "z2": [ int, float ], optional }]),

    bezierDetail: makeFunc(processing.bezierDetail, "bezierDetail", [
        { "detail": int }]),

    bezierPoint: makeFunc(processing.bezierPoint, "bezierPoint", [
        { "a": [ int, float ] },
        { "b": [ int, float ] },
        { "c": [ int, float ] },
        { "d": [ int, float ] },
        { "t": float }]),

    bezierTangent: makeFunc(processing.bezierTangent, "bezierTangent", [
        { "a": [ int, float ] },
        { "b": [ int, float ] },
        { "c": [ int, float ] },
        { "d": [ int, float ] },
        { "t": float }]),

    curve: makeFunc(processing.curve, "curve", [
        { "x1": [ int, float ] },
        { "y1": [ int, float ] },
        { "z1": [ int, float ] },
        { "x2": [ int, float ] },
        { "y2": [ int, float ] },
        { "z2": [ int, float ] },
        { "x3": [ int, float ] },
        { "y3": [ int, float ] },
        { "z3": [ int, float ], optional },
        { "x4": [ int, float ], optional },
        { "y4": [ int, float ], optional },
        { "z4": [ int, float ], optional }]),

    curveDetail: makeFunc(processing.curveDetail, "curveDetail", [
        { "detail": int }]),

    curvePoint: makeFunc(processing.curvePoint, "curvePoint", [
        { "a": [ int, float ] },
        { "b": [ int, float ] },
        { "c": [ int, float ] },
        { "d": [ int, float ] },
        { "t": float }]),

    curveTangent: makeFunc(processing.curveTangent, "curveTangent" [
        { "a": [ int, float ] },
        { "b": [ int, float ] },
        { "c": [ int, float ] },
        { "d": [ int, float ] },
        { "t": float }]),

    curveTightness: makeFunc(processing.curveTightness, "curveTightness", [
        { "squishy": int }])
};