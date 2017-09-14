import processing from "./processing.js";
import Sk from "./skulpt.js";
import { makeFunc, optional } from "./utils.js";

const { float } = Sk.builtin;

export default {
    applyMatrix: makeFunc(processing.applyMatrix, "applyMatrix", [
        { "n00": float },
        { "n01": float },
        { "n02": float },
        { "n03": float },
        { "n04": float },
        { "n05": float },
        { "n06": float },
        { "n07": float },
        { "n08": float },
        { "n09": float },
        { "n10": float },
        { "n11": float },
        { "n12": float },
        { "n13": float },
        { "n14": float },
        { "n15": float }
    ]),

    popMatrix: makeFunc(processing.popMatrix, "popMatrix"),
    printMatrix: makeFunc(processing.printMatrix, "printMatrix"),
    pushMatrix: makeFunc(processing.pushMatrix, "pushMatrix"),
    resetMatrix: makeFunc(processing.resetMatrix, "resetMatrix"),

    rotate: makeFunc(processing.rotate, "rotate", [
        { "angle": float }
    ]),

    rotateX: makeFunc(processing.rotateX, "rotateX", [
        { "angle": float }
    ]),

    rotateY: makeFunc(processing.rotateY, "rotateY", [
        { "angle": float }
    ]),

    rotateZ: makeFunc(processing.rotateZ, "rotateZ", [
        { "angle": float }
    ]),

    scale: makeFunc(processing.scale, "scale", [
        { "size": float },
        { "y": float, optional },
        { "z": float, optional }
    ]),

    translate: makeFunc(processing.translate, "translate", [
        { "x": float },
        { "y": float },
        { "z": float, optional }
    ])
};