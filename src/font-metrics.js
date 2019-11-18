import { processingProxy, makeFunc } from "./utils.js";

export default {
    textAscent: makeFunc(processingProxy, "textAscent"),
    textDescent: makeFunc(processingProxy, "textDescent")
};
