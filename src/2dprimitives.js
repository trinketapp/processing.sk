import processing from  'processing.js'
import Sk from 'skulpt.js'
import { makeFunc, optional } from 'utils.js'

const { float } = Sk.builtin;

export default {
    arc: makeFunc(processing.arc, "arc", [
        { "x": float },
        { "y": float },
        { "width": float },
        { "height": float },
        { "start": float },
        { "stop": float }]),

    ellipse: makeFunc(processing.ellipse, "ellipse", [
        { "x": float },
        { "y": float },
        { "width": float },
        { "height": float }]),

    line: makeFunc(processing.line, "line", [
        { "x1": float },
        { "y1": float },
        { "z1": float },
        { "x2": float },
        { "y2": float, optional },
        { "z2": float, optional }]),

    point: makeFunc(processing.point, "point", [
        { "x" : float },
        { "y" : float },
        { "z": float, optional }]),

    quad: makeFunc(processing.quad, "quad", [
        { "x1": float },
        { "y1": float },
        { "x2": float },
        { "y2": float },
        { "x3": float },
        { "y3": float },
        { "x4": float },
        { "y4": float }]),

    rect: makeFunc(processing.rect, "rect", [
        { "x": float },
        { "y": float },
        { "width": float },
        { "height": float },
        { "tlradius": float, optional },
        { "trradius": float, optional },
        { "brradius": float, optional },
        { "blradius": float, optional }]),

    triagle: makeFunc(processing.triangle, "triangle", [
        { "x1": float },
        { "y1": float },
        { "x2": float },
        { "y2": float },
        { "x3": float },
        { "y3": float }]),
}