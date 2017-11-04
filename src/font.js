import Sk from "./skulpt.js";
import { processingProxy, makeFunc, optional, self } from "./utils.js";
import { PFont } from "./processing.js";
const { func, float_, list, str, bool, int_ } = Sk.builtin;
const { buildClass, callsim, loadname } = Sk.misceval;


function createFontFunction (name, size, smooth, charset) {
    let font = processingProxy.createFont(name, size, smooth, charset);
    let pfont = callsim(PFont);
    pfont.v = font;
    return pfont;
}

function fontClass ($gbl, $loc) {
    $loc.__init__ = makeFunc(function (self, input) {
        if (input) {
            self.v = new processingProxy.PFont(input);
        }
    }, "__init__", [
        self,
        { "input ": str, optional }
    ]);

    let staticmethod = loadname("staticmethod", $gbl);
    let list_func = new func(() => new list(processingProxy.PFont.list()));
    $loc.list = callsim(staticmethod, list_func);
}

export const PFontBuilder = mod => buildClass(mod, fontClass, "PFont", []);

export const createFont = makeFunc(createFontFunction, "createFont", [
    { "name": str },
    { "size": [ int_, float_ ]},
    { "smooth": bool, optional },
    { "charset": str, optional }
]);

export const loadFont = makeFunc(processingProxy, "loadFont", [
    { "fontname": str }
]);

export const text = makeFunc(processingProxy, "text", [
    { "data": [ str, int_, float_ ] },
    { "x": [ int_, float_ ] },
    { "y": [ int_, float_ ] },
    { "z": [ int_, float_ ], optional },
    { "height": [ int_, float_ ], optional },
    { "z": [ int_, float_ ], optional }
]);

export const textFont = makeFunc(processingProxy, "textFont", [
    { "font": "PFont" },
    { "size": [ int_, float_  ], optional }
]);