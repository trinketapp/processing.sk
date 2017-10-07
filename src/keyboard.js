import { processingProxy } from "./utils.js";
import Sk from "./skulpt.js";

const { remapToPy, remapToJs } = Sk.ffi;
const { func } = Sk.builtin;
const { buildClass } = Sk.misceval;

function keyboardClass ($gbl, $loc) {
    $loc.__getattr__ = new func(function (self, key) {
        key = remapToJs(key);
        if (key === "key") {
            return remapToPy(processingProxy.key.toString());
        }
        else if (key === "keyCode") {
            return remapToPy(processingProxy.keyCode);
        }
        else if (key === "keyPressed") {
            return remapToPy(processingProxy.__keyPressed);
        }
    });
}

export const KeyboardBuilder = mod => buildClass(mod, keyboardClass, "Keyboard", []);

export const key = () => remapToPy(processingProxy.key.toString());
export const keyCode = () => remapToPy(processingProxy.keyCode);
export const keyPressed = () => remapToPy(processingProxy.__keyPressed);
