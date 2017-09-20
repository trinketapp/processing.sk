
import processing from "./processing.js";
import { makeFunc } from "./utils.js";

export default {
    textAscent: makeFunc(processing, "textAscent"),
    textDescent: makeFunc(processing, "textDescent")
};