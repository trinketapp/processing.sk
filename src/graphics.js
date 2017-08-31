import processing from  'processing.js';
import Sk from 'skulpt.js';
import { makeFunc, optional, __name__ } from 'utils.js';
import PApplet from 'applet.js';

const { func, int } = Sk.builtin;
const { buildClass } = Sk.misceval;

function graphicsInit(self, width, height, applet) {
    self.v = new processing.PGraphics(width, height, applet);
}

function graphicsClass($gbl, $loc) {
    $loc.__init__ = makeFunc(graphicsInit, [
        { "width": int },
        { "width": int },
        { "width": PApplet }
    ]);

    $loc.beginDraw = new Sk.builtin.func(function (self) {
        self.v.beginDraw();
    });

    $loc.endDraw = new Sk.builtin.func(function (self) {
        self.v.endDraw();
    });
};

export default buildClass({ __name__ }, graphicsClass, "PGraphics", []);
