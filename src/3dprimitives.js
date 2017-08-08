mod.box = makeFunc(mod.processing.box, [
    { "width": float },
    { "height": float, optional },
    { "depth": float, optional }
]);

mod.sphere = makeFunc(mod.processing.sphere, [
    { "radius": float }
]);

mod.sphereDetaul = makeFunc(mod.processing.sphere, [
    { "ures": float },
    { "vres": float, optional }
]);
