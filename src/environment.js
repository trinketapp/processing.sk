import processing from 'processing.js';
import Sk from 'skulpt.js';
import __name__ from 'utils.js';

const { remapToPy, remapToJs } = Sk.ffi;
const { func } = Sk.builtin;

function environmentClass($gbl, $loc) {
    $loc.__getattr__ = new func(function (self, key) {
        switch(remapToJs(key)) {
            case "frameCount":
                return remapToPy(mod.processing.frameCount);
            case "frameRate":
                return remapToPy(mod.processing.frameRate);
            case "height":
                return remapToPy(mod.processing.height);
            case "width":
                return remapToPy(mod.processing.width);
            case "online":
                return remapToPy(mod.processing.online);
            case "focused":
                return remapToPy(mod.processing.focused);
            default:
                return undefined;
        }
    });

};

export const Environment = Sk.misceval.buildClass({ __name__ }, environmentClass, "Environment", []);

export const environment = Sk.misceval.callsim(Environment);

mod.cursor = new Sk.builtin.func(function (v, x, y) {
    // cursor()
    // cursor(MODE)
    // cursor(image,x,y)
    if (typeof (v) === "undefined") {
        mod.processing.cursor();
    } else if (typeof (x) === "undefined") {
        mod.processing.cursor(v.v);
    } else if (typeof (y) === "undefined") {
        mod.processing.cursor(v.v, x.v);
    } else {
        mod.processing.cursor(v.v, x.v, y.v);
    }
});

mod.noCursor = new Sk.builtin.func(function () {
    mod.processing.noCursor();
});