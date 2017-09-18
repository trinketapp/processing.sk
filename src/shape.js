import processing from "./processing.js";
import Sk from "./skulpt.js";
import { optional, makeFunc, __name__, self } from "./utils.js";
import constants from "./constants.js";

const { CORNER, CORNERS, CENTER } = constants;
const { str, int, float, bool } = Sk.builtin;
const { remapToJs, remapToPy } = Sk.ffi;

function shapeIsVisible(self) {
    return self.v.isVisible();
}

function shapeSetVisible(self, value) {
    self.v.setVisible(value);
}

function shapeDisableStyle(self) {
    self.v.disableStyle();
}

function shapeEnableStyle(self) {
    self.v.enableStyle();
}

function shapeGetChild(self, shape) {
    // getChild() Returns a child element of a shape as a PShapeSVG object
    var child = self.v.getChild(shape);
    if (child != null) {
        // special method for Skulpt:
        var new_shape = Sk.misceval.callsim(PShape);
        // Now fill in value:
        new_shape.v = child;
        return new_shape;
    } else {
        return null;
    }
}

function shapeTranslate(self, x, y, z) {
    self.v.translate(x.v, y.v, z.v);
}

function shapeRotate(self, angle) {
    self.v.rotate(angle);
}

function shapeRotateX(self, angle) {
    self.v.rotateX(angle);
}

function shapeRotateY(self, angle) {
    self.v.rotateY(angle);
}

function shapeRotateZ(self, angle) {
    self.v.rotateZ(angle);
}

function shapeScale(self, x, y, z) {
    self.v.scale(x, y, z);
}

function shapeClass($gbl, $loc) {
    $loc.__getattr__ = new Sk.builtin.func(function (self, key) {
        key = remapToJs(key);
        switch (key) {
        case "width":
            return remapToPy(self.v.width);
        case "height":
            return remapToPy(self.v.height);
        }
    });

    $loc.isVisible = makeFunc(shapeIsVisible, "isVisible", [ self ]);

    $loc.setVisible = makeFunc(shapeSetVisible, "setVisible" [
        self,
        { "value": bool }
    ]);

    $loc.disableStyle = makeFunc(shapeDisableStyle, "disableStyle", [ self ]);

    $loc.enableStyle = makeFunc(shapeEnableStyle, "enableStyle", [ self ]);

    $loc.getChild = makeFunc(shapeGetChild, "getChild", [
        self,
        { "shape": PShape }
    ]);

    $loc.translate = makeFunc(shapeTranslate, "translate", [
        self,
        { "x": [ float, int ] },
        { "y": [ float, int ] },
        { "z": [ float, int ], optional }
    ]);

    $loc.rotate = makeFunc(shapeRotate, "rotate", [
        self,
        { "angle": float }
    ]);

    $loc.rotateX = makeFunc(shapeRotateX, "rotateX", [
        self,
        { "angle": float }
    ]);

    $loc.rotateY = makeFunc(shapeRotateY, "rotateY", [
        self,
        { "angle": float }
    ]);

    $loc.rotateZ = makeFunc(shapeRotateZ, "rotateZ", [
        self,
        { "angle": float }
    ]);

    $loc.scale = makeFunc(shapeScale, "scale" [
        self,
        { "x": float },
        { "y": float, optional },
        { "z": float, optional }
    ]);
}

export const PShape = Sk.misceval.buildClass({ __name__ }, shapeClass, "PShape", []);

export default {
    loadShape: makeFunc(processing.loadShape, "loadShape", [
        { "filename": str }
    ]),

    shape: makeFunc(processing.shape, [
        { "sh": PShape },
        { "x": float },
        { "y": float },
        { "width": float, optional },
        { "height": float, optional }
    ]),

    shapeMode: makeFunc(processing.shapeMode, [
        { "img": int, allowed: [ CORNER, CORNERS, CENTER ] }
    ])
};