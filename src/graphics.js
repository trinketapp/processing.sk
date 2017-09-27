import processing, { PGraphics } from "./processing.js";
import Sk from "./skulpt.js";
import { makeFunc, self } from "./utils.js";

const { int_ } = Sk.builtin;
const { buildClass } = Sk.misceval;

function graphicsInit(self, width, height, applet) {
    self.v = new processing.PGraphics(width, height, applet);
}

function graphicsClass($gbl, $loc) {
    $loc.__init__ = makeFunc(graphicsInit, [
        self,
        { "width": int_ },
        { "width": int_ },
        { "width": "PApplet" }
    ]);

    $loc.beginDraw = new Sk.builtin.func(function (self) {
        self.v.beginDraw();
    });

    $loc.endDraw = new Sk.builtin.func(function (self) {
        self.v.endDraw();
    });
}

export const PGraphicsBuilder = mod => buildClass(mod, graphicsClass, "PGraphics", []);

export const createGraphics = new Sk.builtin.func(function (width, height, renderer, filename) {
    // createGraphics(width, height, renderer)
    // createGraphics(width, height, renderer, filename)
    var graphics = Sk.misceval.callsim(PGraphics);
    if (typeof (filename) === "undefined") {
        graphics.v = processing.createGraphics(width.v, height.v, renderer.v);
    } else {
        graphics.v = processing.createGraphics(width.v, height.v, renderer.v, filename.v);
    }
    return graphics;
});


export const hint = new Sk.builtin.func(function (item) {
    // hint(item)
    processing.hint(item);
});
