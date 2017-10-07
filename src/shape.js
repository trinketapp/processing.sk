import { PShape } from "./processing.js";
import Sk from "./skulpt.js";
import { processingProxy, optional, makeFunc, self } from "./utils.js";
import { remappedConstants } from "./constants.js";

const { CORNER, CORNERS, CENTER } = remappedConstants;
const { str, int_, float_, bool } = Sk.builtin;
const { remapToJs, remapToPy } = Sk.ffi;
const { buildClass } = Sk.misceval;

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
        { "x": [ int_, float_ ] },
        { "y": [ int_, float_ ] },
        { "z": [ int_, float_ ], optional }
    ]);

    $loc.rotate = makeFunc(shapeRotate, "rotate", [
        self,
        { "angle": [ int_, float_ ] }
    ]);

    $loc.rotateX = makeFunc(shapeRotateX, "rotateX", [
        self,
        { "angle": [ int_, float_ ] }
    ]);

    $loc.rotateY = makeFunc(shapeRotateY, "rotateY", [
        self,
        { "angle": [ int_, float_ ] }
    ]);

    $loc.rotateZ = makeFunc(shapeRotateZ, "rotateZ", [
        self,
        { "angle": [ int_, float_ ] }
    ]);

    $loc.scale = makeFunc(shapeScale, "scale" [
        self,
        { "x": [ int_, float_ ] },
        { "y": [ int_, float_ ], optional },
        { "z": [ int_, float_ ], optional }
    ]);
}

export const PShapeBuilder = mod => buildClass(mod, shapeClass, "PShape", []);

export default {
    loadShape: makeFunc(processingProxy, "loadShape", [
        { "filename": str }
    ]),

    shape: makeFunc(processingProxy, "shape", [
        { "sh": "PShape" },
        { "x": [ int_, float_ ] },
        { "y": [ int_, float_ ] },
        { "width": [ int_, float_ ], optional },
        { "height": [ int_, float_ ], optional }
    ]),

    shapeMode: makeFunc(processingProxy, "shapeMode", [
        { "img": int_, allowed: [ CORNER, CORNERS, CENTER ] }
    ])
};