import Sk from "./skulpt.js";
import { processingProxy, makeFunc, optional } from "./utils.js";

const { float_, int_ } = Sk.builtin;

export default {
    arc: makeFunc(processingProxy, "arc", [
        { "x": [ int_, float_ ] },
        { "y": [ int_, float_ ] },
        { "width": [ int_, float_ ] },
        { "height": [ int_, float_ ] },
        { "start": [ int_, float_ ] },
        { "stop": [ int_, float_ ] }]),

    ellipse: makeFunc(processingProxy, "ellipse", [
        { "x": [ int_, float_ ] },
        { "y": [ int_, float_ ] },
        { "width": [ int_, float_ ] },
        { "height": [ int_, float_ ] }]),

    line: makeFunc(processingProxy, "line", [
        { "x1": [ int_, float_ ] },
        { "y1": [ int_, float_ ] },
        { "z1": [ int_, float_ ] },
        { "x2": [ int_, float_ ] },
        { "y2": [ int_, float_ ], optional },
        { "z2": [ int_, float_ ], optional }]),

    point: makeFunc(processingProxy, "point", [
        { "x" : [ int_, float_ ] },
        { "y" : [ int_, float_ ] },
        { "z": [ int_, float_ ], optional }]),

    quad: makeFunc(processingProxy, "quad", [
        { "x1": [ int_, float_ ] },
        { "y1": [ int_, float_ ] },
        { "x2": [ int_, float_ ] },
        { "y2": [ int_, float_ ] },
        { "x3": [ int_, float_ ] },
        { "y3": [ int_, float_ ] },
        { "x4": [ int_, float_ ] },
        { "y4": [ int_, float_ ] }]),

    rect: makeFunc(processingProxy, "rect", [
        { "x": [ int_, float_ ] },
        { "y": [ int_, float_ ] },
        { "width": [ int_, float_ ] },
        { "height": [ int_, float_ ] },
        { "tlradius": [ int_, float_ ], optional },
        { "trradius": [ int_, float_ ], optional },
        { "brradius": [ int_, float_ ], optional },
        { "blradius": [ int_, float_ ], optional }]),

    triangle: makeFunc(processingProxy, "triangle", [
        { "x1": [ int_, float_ ] },
        { "y1": [ int_, float_ ] },
        { "x2": [ int_, float_ ] },
        { "y2": [ int_, float_ ] },
        { "x3": [ int_, float_ ] },
        { "y3": [ int_, float_ ] }]),
};