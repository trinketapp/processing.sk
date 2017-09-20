import Sk from "./skulpt.js";
import processing from "./processing.js";
import { notImplemented, makeFunc } from "./utils.js";

const { object, str, list } = Sk.builtin;

export default {
    println: makeFunc(processing, "println", [
        { "data": object }
    ]),

    save: makeFunc(processing, "save", [
        { "filename": str }
    ]),

    saveFrame: makeFunc(processing, "saveFrame", [
        { "filename": str },
        { "ext": str, allowed: [ "tif", "tga", "jpg", "png" ] }
    ]),

    saveStrings: makeFunc(processing, "saveStrings", [
        { "filename": str },
        { "strings": list }
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