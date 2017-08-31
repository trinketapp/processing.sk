import processing from  'processing.js';
import Sk from 'skulpt.js';
import { makeFunc, optional, __name__ } from 'utils.js';

const { func, float, list } = Sk.builtin;
const { buildClass } = Sk.misceval;

function fontClass ($gbl, $loc) {
    $loc.__init__ = new Sk.builtin.func(function (self, input) {
        // PFont()
        // PFont(input)
        if (typeof (input) === "undefined") {
            self.v = new processing.PFont();
        } else {
            self.v = new processing.PFont(input.v);
        }
    });

    $loc.list = new func(function (self) {
        // font.list()
        return new list(self.v.list());
    });
};

export default buildClass({ __name__ }, fontClass, "PFont", []);
