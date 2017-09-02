import processing from 'processing.js';
import Sk from 'skulpt.js';
import __name__ from 'utils.js';

const { remapToPy, remapToJs } = Sk.ffi;
const { func } = Sk.builtin;

function keyboardClass ($gbl, $loc) {
    $loc.__getattr__ = new func(function (self, key) {
        key = Sk.ffi.remapToJs(key);
        if (key === "key") {
            return remapToPy(mod.processing.key.toString());
        }
        else if (key === "keyCode") {
            return remapToPy(mod.processing.keyCode);
        }
        else if (key === "keyPressed") {
            return remapToPy(mod.processing.keyPressed);
        }
    });
};

export const Keyboard = Sk.misceval.buildClass({ __name__ }, keyboardClass, "Keyboard", []);

export const keyboard = Sk.misceval.callsim(Keyboard);