import Sk from "./skulpt.js";
import { processingProxy, makeFunc, optional } from "./utils.js";
import PImage from "./image.js";

const { remapToPy, remapToJs } = Sk.ffi;
const { func, int_ } = Sk.builtin;
const { buildClass } = Sk.misceval;


function environmentClass($gbl, $loc) {
    $loc.__getattr__ = new func(function (self, key) {
        switch(remapToJs(key)) {
        case "frameCount":
            return remapToPy(processingProxy.frameCount);
        case "frameRate":
            return remapToPy(processingProxy.frameRate);
        case "height":
            return remapToPy(processingProxy.height);
        case "width":
            return remapToPy(processingProxy.width);
        case "online":
            return remapToPy(processingProxy.online);
        case "focused":
            return remapToPy(processingProxy.focused);
        default:
            return undefined;
        }
    });

}

export const EnvironmentBuilder = mod => buildClass(mod, environmentClass, "Environment", []);

export const cursor = makeFunc(processingProxy, "cursor", [
    { "image": [ PImage, int_ ], optional },
    { "x": int_, optional },
    { "y": int_, optional }
]);

export const noCursor = makeFunc(processingProxy, "noCursor");