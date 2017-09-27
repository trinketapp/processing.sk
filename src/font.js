import { processing } from "./processing.js";
import Sk from "./skulpt.js";
import { makeFunc, optional, self } from "./utils.js";

const { func, float, list, str, bool, int_ } = Sk.builtin;
const { buildClass } = Sk.misceval;

function fontClass ($gbl, $loc) {
    $loc.__init__ = makeFunc(function (self, input) {
        self.v = new processing.PFont(input);
    }, "__init__", [
        self,
        { "input ": str }
    ]);

    $loc.list = new func((self) => new list(self.v.list()));
}

export const PFontBuilder = mod => buildClass(mod, fontClass, "PFont", []);

export const createFont = makeFunc(processing, "createFont", [
    { "name": str },
    { "size": float},
    { "smooth": bool, optional },
    { "charset": str, optional }
]);

export const loadFont = makeFunc(processing, "loadFont", [
    { "fontname": str }
]);

export const text = makeFunc(processing, "text", [
    { "data": [ str, int_, float ] },
    { "x": [ int_, float ] },
    { "y": [ int_, float ] },
    { "z": [ int_, float ], optional },
    { "height": [ int_, float ], optional },
    { "z": [ int_, float ], optional }
]);

export const textFont = makeFunc(processing, "textFont", [
    { "font": "PFont" },
    { "size": [ int_, float  ], optional }
]);