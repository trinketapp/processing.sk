mod.beginShape = makeFunc(mod.processing.beginShape);

mod.endShape = makeFunc(mod.processing.endShape);

mod.vertex = makeFunc(mod.processing.vertex, [
    { "x": float },
    { "y": float },
    { "z": float },
    { "u": float, optional },
    { "v": float, optional }
]);

mod.bezierVertex = makeFunc(mod.processing.bezierVertex, [
    { "cx1": float },
    { "cy1": float },
    { "cz1": float },
    { "cx2": float },
    { "cy2": float },
    { "cz2": float },
    { "x": float, optional },
    { "y": float, optional },
    { "z": float, optional }
]);

mod.curveVertex = makeFunc(mod.processing.curveVertex, [
    { "x": float },
    { "y": float },
    { "z": float, optional }
]);

mod.texture = makeFunc(mod.texture, [
    { "img": PImage }
]);

mod.textureMode = makeFunc(mod.textureMode, [
    { "img": int, allowed: [1, 2] }
]);
