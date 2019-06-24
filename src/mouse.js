import { processingProxy } from "./utils.js";
import Sk from "./skulpt.js";

const { remapToPy, remapToJs } = Sk.ffi;
const { func } = Sk.builtin;
const { buildClass } = Sk.misceval;

function mouseClass($gbl, $loc) {
    $loc.__getattr__ = new func(function(self, key) {
        switch (remapToJs(key)) {
        case "x":
            return remapToPy(processingProxy.mouseX);
        case "y":
            return remapToPy(processingProxy.mouseY);
        case "px":
            return remapToPy(processingProxy.pmouseX);
        case "py":
            return remapToPy(processingProxy.pmouseY);
        case "pressed":
            return remapToPy(processingProxy.__mousePressed);
        case "button":
            return remapToPy(processingProxy.mouseButton);
        default:
            return undefined;
        }
    });
}

export const MouseBuilder = mod => buildClass(mod, mouseClass, "Mouse", []);

export const mouseX = () => remapToPy(processingProxy.mouseX);
export const mouseY = () => remapToPy(processingProxy.mouseY);
export const pmouseX = () => remapToPy(processingProxy.pmouseX);
export const pmouseY = () => remapToPy(processingProxy.pmouseY);
export const mousePressed = () => remapToPy(processingProxy.__mousePressed);
export const mouseButton = () => remapToPy(processingProxy.mouseButton);
