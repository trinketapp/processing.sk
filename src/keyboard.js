import { processing } from "./processing.js";
import Sk from "./skulpt.js";

const { remapToPy, remapToJs } = Sk.ffi;
const { func } = Sk.builtin;
const { buildClass } = Sk.misceval;

function keyboardClass ($gbl, $loc) {
    $loc.__getattr__ = new func(function (self, key) {
        key = remapToJs(key);
        if (key === "key") {
            return remapToPy(processing.key.toString());
        }
        else if (key === "keyCode") {
            return remapToPy(processing.keyCode);
        }
        else if (key === "keyPressed") {
            return remapToPy(processing.keyPressed);
        }
    });
}

export const KeyboardBuilder = mod => buildClass(mod, keyboardClass, "Keyboard", []);