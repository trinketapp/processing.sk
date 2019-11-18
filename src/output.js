import Sk from "./skulpt.js";
import { processingProxy, notImplemented, makeFunc } from "./utils.js";

const { object, str, list } = Sk.builtin;
const { print_ } = Sk.misceval;

export default {
    println: makeFunc(
        o => {
            print_(o);
            print_("\n");
        },
        "println",
        [{ data: object }]
    ),

    save: makeFunc(processingProxy, "save", [{ filename: str }]),

    saveFrame: makeFunc(processingProxy, "saveFrame", [
        { filename: str },
        { ext: str, allowed: ["tif", "tga", "jpg", "png"] }
    ]),

    saveStrings: makeFunc(processingProxy, "saveStrings", [
        { filename: str },
        { strings: list }
    ]),

    PrintWriter: notImplemented,
    beginRaw: notImplemented,
    beginRecord: notImplemented,
    createOutput: notImplemented,
    createReader: notImplemented,
    createWriter: notImplemented,
    endRaw: notImplemented,
    endRecord: notImplemented,
    saveBytes: notImplemented,
    saveStream: notImplemented,
    selectOuput: notImplemented
};
