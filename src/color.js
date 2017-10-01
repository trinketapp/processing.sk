import Sk from "./skulpt.js";
import { processingProxy, makeFunc, optional } from "./utils.js";

const { float_ } = Sk.builtin;
const { buildClass } = Sk.misceval;

function colorInit(self, val1, val2, val3, alpha) {
    self.v = processingProxy.color(val1, val2, val3, alpha);
}

function colorClass($gbl, $loc) {
    $loc.__init__ = makeFunc(colorInit, [
        { "gray": float_ },
        { "aplha": float_, optional },
        { "value3": float_, optional },
        { "hex": float_, optional }
    ]);
}

export default mod => buildClass(mod, colorClass, "color", []);