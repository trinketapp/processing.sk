import { processing, setProperty, setLooping, isInitialised } from "./processing.js";
import { processingProxy, makeFunc } from "./utils.js";
import Sk from "./skulpt.js";

const { int_ } = Sk.builtin;

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

function size(width, height) {
    processing.size(width, height);
    setProperty("width", processing.width);
    setProperty("height", processing.height);
}

export default {
    loop: makeFunc(loop, "loop"),
    noLoop: makeFunc(noLoop, "noLoop"),

    width: makeFunc(() => processing.width, "width"),
    height: makeFunc(() => processing.height, "height"),

    size: makeFunc(size, "size", [
        { "width": int_ },
        { "height": int_ },
    ]),

    exit: makeFunc(processingProxy, "exit")
};