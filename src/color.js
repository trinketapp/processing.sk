import processing from  'processing.js';
import Sk from 'skulpt.js';
import { makeFunc, optional, __name__ } from 'utils.js';

const { func, float } = Sk.builtin;
const { buildClass } = Sk.misceval;

function colorInit(self, val1, val2, val3, alpha) {
    self.v = processing.color(val1, val2, val3, alpha);
}

function colorClass($gbl, $loc) {
    $loc.__init__ = makeFunc(colorInit, [
        { "gray": float },
        { "aplha": float, optional },
        { "value3": float, optional },
        { "hex": float, optional }
    ]);
}

export default buildClass({ __name__ }, colorClass, "color", []);