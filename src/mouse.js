import processing from 'processing.js';
import Sk from 'skulpt.js';
import __name__ from 'utils.js';

const { remapToPy, remapToJs } = Sk.ffi;
const { func } = Sk.builtin;

function mouseClass($gbl, $loc) {
    $loc.__getattr__ = new func(function (self, key) {
        switch (remapToJs(key)) {
            case "x":
                return remapToPy(mod.processing.mouseX);
            case "y":
                return remapToPy(mod.processing.mouseY);
            case "px":
                return remapToPy(mod.processing.pmouseX);
            case "py":
                return remapToPy(mod.processing.pmouseY);
            case "pressed":
                return remapToPy(mod.processing.__mousePressed);
            case "button":
                return remapToPy(mod.processing.mouseButton);
            default:
                return undefined;
        }
    });
};

export const Mouse = Sk.misceval.buildClass({ __name__ }, mouseClass, "Mouse", []);
export const mouse = Sk.misceval.callsim(Mouse);

mod.mouseX = new Sk.builtin.func(function () {
    return new Sk.builtin.int_(mod.processing.mouseX);
});

mod.mouseY = new Sk.builtin.func(function () {
    return new Sk.builtin.int_(mod.processing.mouseY);
});

mod.pmouseX = new Sk.builtin.func(function () {
    return new Sk.builtin.int_(mod.processing.pmouseX);
});

mod.pmouseY = new Sk.builtin.func(function () {
    return new Sk.builtin.int_(mod.processing.pmouseY);
});
