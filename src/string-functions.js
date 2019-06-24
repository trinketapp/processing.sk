import Sk from "./skulpt.js";
import { processingProxy, makeFunc, optional } from "./utils.js";

const { int_, float_, str, list } = Sk.builtin;

export default {
    join: makeFunc(processingProxy, "join", [
        { stringArray: list },
        { separator: str }
    ]),

    match: makeFunc(processingProxy, "match", [{ str: str }, { regexp: str }]),

    matchAll: makeFunc(processingProxy, "matchAll", [
        { str: str },
        { regexp: str }
    ]),

    nf: makeFunc(processingProxy, "nf", [
        { value: [int_, float_, list] },
        { digits: int_ },
        { right: int_, optional }
    ]),

    nfc: makeFunc(processingProxy, "nfc", [
        { value: [int_, float_, list] },
        { right: int_, optional }
    ]),

    nfp: makeFunc(processingProxy, "nfp", [
        { value: [int_, float_, list] },
        { digits: int_ },
        { right: int_, optional }
    ]),

    nfs: makeFunc(processingProxy, "nfs", [
        { value: [int_, float_, list] },
        { digits: int_ },
        { right: int_, optional }
    ]),

    split: makeFunc(processingProxy, "split", [
        { string: str },
        { delimiter: str }
    ]),

    splitTokens: makeFunc(processingProxy, "splitTokens", [
        { string: str },
        { delimiter: str, optional }
    ]),

    trim: makeFunc(processingProxy, "trim", [{ strOrArray: [str, list] }])
};
