import Sk from "./skulpt.js";
import { processingProxy, makeFunc, optional } from "./utils.js";

const { str } = Sk.builtin;

export default {
    link: makeFunc(processingProxy, "link" [
        { "url": str },
        { "target": str, optional }
    ]),
    status: makeFunc(processingProxy, "status", [
        { "text": str }
    ])
};