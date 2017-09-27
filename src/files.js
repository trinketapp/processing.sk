import { processing } from "./processing.js";
import Sk from "./skulpt.js";
import { makeFunc, notImplemented } from "./utils.js";

const { str } = Sk.builtin;

export default {
    loadBytes: makeFunc(processing, "loadBytes", [
        { "filename": str }
    ]),
    loadStrings: makeFunc(processing, "loadStrings" [
        { "filename": str }
    ]),
    createInput: notImplemented,
    open: notImplemented,
    selectFolder: notImplemented,
    selectInput: notImplemented
};
