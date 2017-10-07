import Sk from "./skulpt.js";
import { processingProxy, makeFunc, optional } from "./utils.js";

const { float_, int_ } = Sk.builtin;
const { buildClass } = Sk.misceval;

function colorInit(self, val1, val2, val3, alpha) {
    self.v = processingProxy.color(val1, val2, val3, alpha);
}

function colorClass($gbl, $loc) {
    $loc.__init__ = makeFunc(colorInit, [
        { "gray": [ int_, float_ ] },
        { "aplha": [ int_, float_ ], optional },
        { "value3": [ int_, float_ ], optional },
        { "hex": [ int_, float_ ], optional }
    ]);
}

export default mod => buildClass(mod, colorClass, "color", []);