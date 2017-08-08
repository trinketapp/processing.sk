mod.elipseMode = makeFunc(mod.processing.elipseMode, [
    { "mode": int, allowed: [0, 1, 2, 3] }
]);

mod.noSmooth = makeFunc(mod.processing.noSmooth);
mod.smooth = makeFunc(mod.processing.smooth);

mod.rectMode = makeFunc(mod.processing.rectMode, [
    { "mode": int, allowed: [0, 1, 2, 3] }
]);

mod.strokeCap = makeFunc(mod.processing.strokeCap, [
    { "mode": str, allowed: ["round", "square", "butt"] }
]);

mod.strokeJoin = makeFunc(mod.processing.strokeJoin, [
    { "mode": str, allowed: ["mitter", "bevel", "round"] }
]);

mod.strokeWeight = makeFunc(mod.processing.strokeWeight, [
    { "width": int }
]);