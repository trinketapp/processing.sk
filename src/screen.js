import { __name__ } from "./utils.js";
import processing from "./processing.js";
import Sk from "./skulpt.js";

const { remapToJs, remapToPy } = Sk.ffi;
const { buildClass, callsim } = Sk.misceval;
const { list, func } = Sk.builtin;

function screenClass($gbl, $loc) {
    $loc.__init__ = new func(function (self) {
        self.pixels = null;
    });

    $loc.__getattr__ = new func(function (self, key) {
        key = remapToJs(key);
        switch (key) {
        case "height":
            return remapToPy(processing.height);
        case "width":
            return remapToPy(processing.width);
        case "pixels":
            if (self.pixels == null) {
                self.pixels = new list(processing.pixels.toArray());
            }
            return self.pixels;
        }
    });
}

export const ScreenBuilder = mod => buildClass(mod, screenClass, "Screen", []);