import processing from  'processing.js';
import Sk from 'skulpt.js';
import { makeFunc, optional, __name__ } from 'utils.js';

const { func, float, list } = Sk.builtin;
const { buildClass } = Sk.misceval;

function fontClass ($gbl, $loc) {
    $loc.__init__ = makeFunc(function (self, input) {
        self.v = new processing.PFont(input);
    }, "__init__", [ { "input ": str } ]);

    $loc.list = new func((self) => new list(self.v.list()));
};

export default buildClass({ __name__ }, fontClass, "PFont", []);


mod.createFont = new Sk.builtin.func(function (name, size, smooth, charset) {
    // createFont(name, size)
    // createFont(name, size, smooth)
    // createFont(name, size, smooth, charset)
    var font = Sk.misceval.callsim(mod.PFont);
    if (typeof (smooth) === "undefined") {
        font.v = mod.processing.createFont(name.v, size.v);
    } else if (typeof (charset) === "undefined") {
        font.v = mod.processing.createFont(name.v, size.v, smooth.v);
    } else {
        font.v = mod.processing.createFont(name.v, size.v, smooth.v, charset.v);
    }
    return font;
});

mod.loadFont = new Sk.builtin.func(function (fontname) {
    // loadFont(fontname)
    // returns font
    var font = Sk.misceval.callsim(mod.PFont);
    font.v = mod.processing.loadFont(fontname.v);
    return font;
});

mod.text = new Sk.builtin.func(function (theText, x, y) {
    mod.processing.text(theText.v, x.v, y.v);
});

mod.textFont = new Sk.builtin.func(function (font, size) {
    // textFont(font)
    // textFont(font, size)
    if (typeof (size) === "undefined") {
        mod.processing.textFont(font.v);
    } else {
        mod.processing.textFont(font.v, size.v);
    }
});