import Sk from "./skulpt.js";
import { processingProxy, makeFunc, optional } from "./utils.js";

const { int_, float_ } = Sk.builtin;

export default {
    bezier: makeFunc(processingProxy, "bezier", [
        { "x1": [ int_, float_ ] },
        { "y1": [ int_, float_ ] },
        { "z1": [ int_, float_ ] },
        { "cx1": [ int_, float_ ] },
        { "cy1": [ int_, float_ ] },
        { "cz1": [ int_, float_ ] },
        { "cx2": [ int_, float_ ] },
        { "cy2": [ int_, float_ ] },
        { "cz2": [ int_, float_ ], optional },
        { "x2": [ int_, float_ ], optional },
        { "y2": [ int_, float_ ], optional },
        { "z2": [ int_, float_ ], optional }]),

    bezierDetail: makeFunc(processingProxy, "bezierDetail", [
        { "detail": int_ }]),

    bezierPoint: makeFunc(processingProxy, "bezierPoint", [
        { "a": [ int_, float_ ] },
        { "b": [ int_, float_ ] },
        { "c": [ int_, float_ ] },
        { "d": [ int_, float_ ] },
        { "t": [ int_, float_ ] }]),

    bezierTangent: makeFunc(processingProxy, "bezierTangent", [
        { "a": [ int_, float_ ] },
        { "b": [ int_, float_ ] },
        { "c": [ int_, float_ ] },
        { "d": [ int_, float_ ] },
        { "t": [ int_, float_ ] }]),

    curve: makeFunc(processingProxy, "curve", [
        { "x1": [ int_, float_ ] },
        { "y1": [ int_, float_ ] },
        { "z1": [ int_, float_ ] },
        { "x2": [ int_, float_ ] },
        { "y2": [ int_, float_ ] },
        { "z2": [ int_, float_ ] },
        { "x3": [ int_, float_ ] },
        { "y3": [ int_, float_ ] },
        { "z3": [ int_, float_ ], optional },
        { "x4": [ int_, float_ ], optional },
        { "y4": [ int_, float_ ], optional },
        { "z4": [ int_, float_ ], optional }]),

    curveDetail: makeFunc(processingProxy, "curveDetail", [
        { "detail": int_ }]),

    curvePoint: makeFunc(processingProxy, "curvePoint", [
        { "a": [ int_, float_ ] },
        { "b": [ int_, float_ ] },
        { "c": [ int_, float_ ] },
        { "d": [ int_, float_ ] },
        { "t": [ int_, float_ ] }]),

    curveTangent: makeFunc(processingProxy, "curveTangent" [
        { "a": [ int_, float_ ] },
        { "b": [ int_, float_ ] },
        { "c": [ int_, float_ ] },
        { "d": [ int_, float_ ] },
        { "t": [ int_, float_ ] }]),

    curveTightness: makeFunc(processingProxy, "curveTightness", [
        { "squishy": [ int_, float_ ] }])
};