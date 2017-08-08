mod.loadShape = makeFunc(mod.loadShape, [
    { "filename": str }
], PShape);

mod.shape = makeFunc(mod.shape, [
    { "sh": PShape },
    { "x": float },
    { "y": float },
    { "width": float, optional },
    { "height": float, optional }
]);

mod.shapeMode = makeFunc(mod.shapeMode, [
    { "img": int, allowed: [0, 1, 3] }
]);