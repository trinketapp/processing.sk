import processing from "./processing.js";
import Sk from "./skulpt.js";
import { __name__, makeFunc, optional } from "./utils.js";
import PImage from "./image.js";

const { remapToPy, remapToJs } = Sk.ffi;
const { func, int_ } = Sk.builtin;

function environmentClass($gbl, $loc) {
    $loc.__getattr__ = new func(function (self, key) {
        switch(remapToJs(key)) {
        case "frameCount":
            return remapToPy(processing.frameCount);
        case "frameRate":
            return remapToPy(processing.frameRate);
        case "height":
            return remapToPy(processing.height);
        case "width":
            return remapToPy(processing.width);
        case "online":
            return remapToPy(processing.online);
        case "focused":
            return remapToPy(processing.focused);
        default:
            return undefined;
        }
    });

}

export const Environment = Sk.misceval.buildClass({ __name__ }, environmentClass, "Environment", []);

export const environment = Sk.misceval.callsim(Environment);

export const cursor = makeFunc(processing, "cursor", [
    { "image": [ PImage, int_ ], optional },
    { "x": int_, optional },
    { "y": int_, optional }
]);

export const noCursor = makeFunc(processing, "noCursor");