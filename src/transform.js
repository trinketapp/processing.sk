import Sk from "./skulpt.js";
import { processingProxy, makeFunc, optional } from "./utils.js";

const { float_ } = Sk.builtin;

export default {
    applyMatrix: makeFunc(processingProxy, "applyMatrix", [
        { "n00": float_ },
        { "n01": float_ },
        { "n02": float_ },
        { "n03": float_ },
        { "n04": float_ },
        { "n05": float_ },
        { "n06": float_ },
        { "n07": float_ },
        { "n08": float_ },
        { "n09": float_ },
        { "n10": float_ },
        { "n11": float_ },
        { "n12": float_ },
        { "n13": float_ },
        { "n14": float_ },
        { "n15": float_ }
    ]),

    popMatrix: makeFunc(processingProxy, "popMatrix"),
    printMatrix: makeFunc(processingProxy, "printMatrix"),
    pushMatrix: makeFunc(processingProxy, "pushMatrix"),
    resetMatrix: makeFunc(processingProxy, "resetMatrix"),

    rotate: makeFunc(processingProxy, "rotate", [
        { "angle": float_ }
    ]),

    rotateX: makeFunc(processingProxy, "rotateX", [
        { "angle": float_ }
    ]),

    rotateY: makeFunc(processingProxy, "rotateY", [
        { "angle": float_ }
    ]),

    rotateZ: makeFunc(processingProxy, "rotateZ", [
        { "angle": float_ }
    ]),

    scale: makeFunc(processingProxy, "scale", [
        { "size": float_ },
        { "y": float_, optional },
        { "z": float_, optional }
    ]),

    translate: makeFunc(processingProxy, "translate", [
        { "x": float_ },
        { "y": float_ },
        { "z": float_, optional }
    ])
};