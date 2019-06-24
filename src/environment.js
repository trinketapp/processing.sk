import Sk from "./skulpt.js";
import { processingProxy, makeFunc, optional, self } from "./utils.js";
import { remappedConstants } from "./constants.js";

const { remapToPy, remapToJs } = Sk.ffi;
const { func, int_ } = Sk.builtin;
const { buildClass } = Sk.misceval;
const { ARROW, CROSS, HAND, MOVE, TEXT, WAIT } = remappedConstants;

function environmentClass($gbl, $loc) {
    $loc.__getattr__ = new func(function(self, key) {
        switch (remapToJs(key)) {
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

export const EnvironmentBuilder = mod =>
    buildClass(mod, environmentClass, "Environment", []);

function frameRateClass($gbl, $loc) {
    $loc.__init__ = makeFunc(
        self => {
            self.v = processingProxy.__frameRate;
        },
        "__init__",
        [self]
    );

    $loc.__call__ = makeFunc(
        (self, rate) => {
            processingProxy.frameRate(rate);
            self.v = rate;
        },
        "__call__",
        [self, { rate: int_ }]
    );
}

export const FrameRateBuilder = mod =>
    buildClass(mod, frameRateClass, "FrameRate", [int_]);

export const cursor = makeFunc(processingProxy, "cursor", [
    {
        image: ["PImage", int_],
        allowed: [ARROW, CROSS, HAND, MOVE, TEXT, WAIT],
        optional
    },
    { x: int_, optional },
    { y: int_, optional }
]);

export const noCursor = makeFunc(processingProxy, "noCursor");

export const height = () => remapToPy(processingProxy.height);
export const width = () => remapToPy(processingProxy.width);
export const frameCount = () => remapToPy(processingProxy.frameCount);
export const online = () => remapToPy(processingProxy.online);
export const focused = () => remapToPy(processingProxy.focused);
