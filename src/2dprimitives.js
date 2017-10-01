import Sk from "./skulpt.js";
import { processingProxy, makeFunc, optional } from "./utils.js";

const { float_ } = Sk.builtin;

export default {
    arc: makeFunc(processingProxy, "arc", [
        { "x": float_ },
        { "y": float_ },
        { "width": float_ },
        { "height": float_ },
        { "start": float_ },
        { "stop": float_ }]),

    ellipse: makeFunc(processingProxy, "ellipse", [
        { "x": float_ },
        { "y": float_ },
        { "width": float_ },
        { "height": float_ }]),

    line: makeFunc(processingProxy, "line", [
        { "x1": float_ },
        { "y1": float_ },
        { "z1": float_ },
        { "x2": float_ },
        { "y2": float_, optional },
        { "z2": float_, optional }]),

    point: makeFunc(processingProxy, "point", [
        { "x" : float_ },
        { "y" : float_ },
        { "z": float_, optional }]),

    quad: makeFunc(processingProxy, "quad", [
        { "x1": float_ },
        { "y1": float_ },
        { "x2": float_ },
        { "y2": float_ },
        { "x3": float_ },
        { "y3": float_ },
        { "x4": float_ },
        { "y4": float_ }]),

    rect: makeFunc(processingProxy, "rect", [
        { "x": float_ },
        { "y": float_ },
        { "width": float_ },
        { "height": float_ },
        { "tlradius": float_, optional },
        { "trradius": float_, optional },
        { "brradius": float_, optional },
        { "blradius": float_, optional }]),

    triagle: makeFunc(processingProxy, "triangle", [
        { "x1": float_ },
        { "y1": float_ },
        { "x2": float_ },
        { "y2": float_ },
        { "x3": float_ },
        { "y3": float_ }]),
};