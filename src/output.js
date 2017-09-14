import Sk from "./skulpt.js";
import processing from "./processing.js";
import { notImplemented, makeFunc } from "./utils.js";

const { object, str, list } = Sk.builtin;

export default {
    println: makeFunc(processing.println, "println", [
        { "data": object }
    ]),

    save: makeFunc(processing.save, "save", [
        { "filename": str }
    ]),

    saveFrame: makeFunc(processing.saveFrame, "saveFrame", [
        { "filename": str },
        { "ext": str, allowed: [ "tif", "tga", "jpg", "png" ] }
    ]),

    saveStrings: makeFunc(processing.saveStrings, "saveStrings", [
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