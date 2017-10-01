import Sk from "./skulpt.js";
import { processingProxy, makeFunc, notImplemented } from "./utils.js";

const { str } = Sk.builtin;

export default {
    loadBytes: makeFunc(processingProxy, "loadBytes", [
        { "filename": str }
    ]),
    loadStrings: makeFunc(processingProxy, "loadStrings" [
        { "filename": str }
    ]),
    createInput: notImplemented,
    open: notImplemented,
    selectFolder: notImplemented,
    selectInput: notImplemented
};
