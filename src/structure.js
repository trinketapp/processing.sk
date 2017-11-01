import { processing, setLooping, isInitialised } from "./processing.js";
import { processingProxy, makeFunc, optional } from "./utils.js";
import { remappedConstants } from "./constants.js";
import Sk from "./skulpt.js";

const { int_ } = Sk.builtin;
const { P2D, JAVA2D, WEBGL, P3D, OPENGL, PDF, DXF } = remappedConstants;

function loop() {
    if (isInitialised) {
        throw new Sk.builtin.Exception("loop() should be called after run()");
    }

    setLooping(true);
    processing.loop();
}

function noLoop() {
    if (isInitialised()) {
        throw new Sk.builtin.Exception("noLoop() should be called after run()");
    }

    setLooping(false);
    processing.noLoop();
}

function size(width, height, renderer) {
    processing.size(width, height, renderer);
}

export default {
    loop: makeFunc(loop, "loop"),
    noLoop: makeFunc(noLoop, "noLoop"),

    size: makeFunc(size, "size", [
        { "width": int_ },
        { "height": int_ },
        { "renderer": int_, allowed: [ P2D, JAVA2D, WEBGL, P3D, OPENGL, PDF, DXF ], optional }
    ]),

    exit: makeFunc(processingProxy, "exit")
};