import processing from "./processing.js";
import Sk from "./skulpt.js";

const { remapToPy, remapToJs } = Sk.ffi;
const { func, int_ } = Sk.builtin;
const { buildClass } = Sk.misceval;

function mouseClass($gbl, $loc) {
    $loc.__getattr__ = new func(function (self, key) {
        switch (remapToJs(key)) {
        case "x":
            return remapToPy(processing.mouseX);
        case "y":
            return remapToPy(processing.mouseY);
        case "px":
            return remapToPy(processing.pmouseX);
        case "py":
            return remapToPy(processing.pmouseY);
        case "pressed":
            return remapToPy(processing.__mousePressed);
        case "button":
            return remapToPy(processing.mouseButton);
        default:
            return undefined;
        }
    });
}

export const MouseBuilder = mod => buildClass(mod, mouseClass, "Mouse", []);

export const mouseX = new func(function () {
    return new int_(processing.mouseX);
});

export const mouseY = new func(function () {
    return new int_(processing.mouseY);
});

export const pmouseX = new func(function () {
    return new int_(processing.pmouseX);
});

export const pmouseY = new func(function () {
    return new int_(processing.pmouseY);
});
