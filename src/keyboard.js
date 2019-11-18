import { processingProxy } from "./utils.js";
import constants from "./constants.js";
import Sk from "./skulpt.js";

const { CODED } = constants;
const { remapToPy, remapToJs } = Sk.ffi;
const { func } = Sk.builtin;
const { buildClass } = Sk.misceval;

function keyboardClass($gbl, $loc) {
    $loc.__getattr__ = new func(function(self, attr) {
        let l_attr = remapToJs(attr);
        if (l_attr === "key") {
            return key();
        } else if (l_attr === "keyCode") {
            return keyCode();
        } else if (l_attr === "keyPressed") {
            return keyPressed();
        }
    });
}

export const KeyboardBuilder = mod =>
    buildClass(mod, keyboardClass, "Keyboard", []);

export const key = () => {
    if (processingProxy.key.code === CODED) {
        return remapToPy(processingProxy.key.code);
    }

    return remapToPy(processingProxy.key.toString());
};

export const keyCode = () => remapToPy(processingProxy.keyCode);
export const keyPressed = () => remapToPy(processingProxy.__keyPressed);
