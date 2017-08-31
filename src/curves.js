import processing from  'processing.js';
import Sk from 'skulpt.js';
import { makeFunc, optional } from 'utils.js';

const { int, float } = Sk.builtin;

export default {
    bezier: makeFunc(processing.bezier, [
        { "x1": float },
        { "y1": float },
        { "z1": float },
        { "cx1": float },
        { "cy1": float },
        { "cz1": float },
        { "cx2": float },
        { "cy2": float },
        { "cz2": float, optional },
        { "x2": float, optional },
        { "y2": float, optional },
        { "z2": float, optional }]),

    bezierDetail: makeFunc(processing.bezierDetail, [
        { "detail": int }]),

    bezierPoint: makeFunc(processing.bezierPoint, [
        { "a": float },
        { "b": float },
        { "c": float },
        { "d": float },
        { "t": float }]),

    bezierTangent: makeFunc(processing.bezierTangent, [
        { "a": float },
        { "b": float },
        { "c": float },
        { "d": float },
        { "t": float }]),

    curve: makeFunc(processing.curve, [
        { "x1": float },
        { "y1": float },
        { "z1": float },
        { "x2": float },
        { "y2": float },
        { "z2": float },
        { "x3": float },
        { "y3": float },
        { "z3": float, optional },
        { "x4": float, optional },
        { "y4": float, optional },
        { "z4": float, optional }]),

    curveDetail: makeFunc(processing.curveDetail, [
        { "detail": int }]),

    curvePoint: makeFunc(processing.curvePoint, [
        { "a": float },
        { "b": float },
        { "c": float },
        { "d": float },
        { "t": float }]),

    curveTangent: makeFunc(processing.curveTangent, [
        { "a": float },
        { "b": float },
        { "c": float },
        { "d": float },
        { "t": float }]),

    curveTightness: makeFunc(processing.curveTightness, [
        { "squishy": int }])
};