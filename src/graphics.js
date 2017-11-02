import { PGraphics } from "./processing.js";
import Sk from "./skulpt.js";
import { processingProxy, makeFunc, self, optional } from "./utils.js";
import constants from "./constants.js";

const { P2D, JAVA2D, WEBGL, P3D, OPENGL, PDF, DXF } = constants;
const { int_, func } = Sk.builtin;
const { buildClass, callsim } = Sk.misceval;
const { remapToPy, remapToJs } = Sk.ffi;

function graphicsInit(self, width, height, renderer) {
    self.v = processingProxy.createGraphics(width, height, renderer);
    if (renderer === undefined || renderer === P2D || renderer === JAVA2D) {
        // monkey patching image to make sure toImageData returns something.
        // 2017 Chrome 64 doesn't always return something the first call.
        // this is a VERY HACKY way to deal with that synchronously.
        self.v.toImageData = function(x, y, w, h) {
            x = x !== undefined ? x : 0;
            y = y !== undefined ? y : 0;
            w = w !== undefined ? w : processingProxy.width;
            h = h !== undefined ? h : processingProxy.height;
            let res = undefined;
            while (res === undefined) {
                res = self.v.externals.context.getImageData(x, y, w, h);
            }
            return res;
        };
    }
}

function graphicsClass($gbl, $loc) {
    $loc.__init__ = makeFunc(graphicsInit, "__init__", [
        self,
        { "width": int_ },
        { "height": int_ },
        { "renderer": int_, allowed: [ P2D, JAVA2D, WEBGL, P3D, OPENGL, PDF, DXF ], optional }
    ]);

    $loc.beginDraw = new func(function (self) {
        self.v.beginDraw();
    });

    $loc.endDraw = new func(function (self) {
        self.v.endDraw();
    });

    $loc.__getattr__ = new func(function(self, key) {
        let prop = self.v[remapToJs(key)];
        if (prop !== undefined) {
            if (typeof prop === "function") {
                return new func(function(self) {
                    let args = Array.from(arguments).map(remapToJs);
                    return remapToPy(prop.apply(self.v, args));
                });
            }

            return remapToPy(prop);
        }
    });
}

export const PGraphicsBuilder = mod => buildClass(mod, graphicsClass, "PGraphics", []);

export const createGraphics = new func(function (width, height, renderer) {
    return callsim(PGraphics, width, height, renderer);
});

export const hint = new func(function (item) {
    // hint(item)
    processingProxy.hint(item);
});
