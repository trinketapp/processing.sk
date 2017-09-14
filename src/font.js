import processing from "./processing.js";
import Sk from "./skulpt.js";
import { makeFunc, optional, __name__ } from "./utils.js";

const { func, float, list } = Sk.builtin;
const { buildClass } = Sk.misceval;

function fontClass ($gbl, $loc) {
    $loc.__init__ = makeFunc(function (self, input) {
        self.v = new processing.PFont(input);
    }, "__init__", [ { "input ": str } ]);

    $loc.list = new func((self) => new list(self.v.list()));
}

export const PFont = buildClass({ __name__ }, fontClass, "PFont", []);

export const createFont = makeFunc(processing.createFont, "createFont", [
    { "name": str },
    { "size": float},
    { "smooth": bool, optional },
    { "charset": str, optional }
]);

export const loadFont = makeFunc(processing.loadFont, "loadFont", [
    { "fontname": str }
]);

export const text = makeFunc(processing.text, "text", [
    { "data": [ str, int, float ] },
    { "x": [ int, float ] },
    { "y": [ int, float ] },
    { "z": [ int, float ], optional },
    { "height": [ int, float ], optional },
    { "z": [ int, float ], optional }
]);

export const textFont = makeFunc(processing.textFont, "textFont", [
    { "font": PFont },
    { "size": [ int, float  ], optional }
]);