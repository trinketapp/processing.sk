mod.arc = makeFunc(mod.processing.arc, [
    { "x": float },
    { "y": float },
    { "width": float },
    { "height": float },
    { "start": float },
    { "stop": float }]);

mod.ellipse = makeFunc(mod.processing.ellipse, [
    { "x": float },
    { "y": float },
    { "width": float },
    { "height": float }]);

mod.line = makeFunc(mod.processing.line, [
    { "x1": float },
    { "y1": float },
    { "z1": float },
    { "x2": float },
    { "y2": float, optional },
    { "z2": float, optional }]);

mod.point = makeFunc(mod.processing.point, [
    { "x" : float },
    { "y" : float },
    { "z": float, optional }]);

mod.quad = makeFunc(mod.processing.quad, [
    { "x1": float },
    { "y1": float },
    { "x2": float },
    { "y2": float },
    { "x3": float },
    { "y3": float },
    { "x4": float },
    { "y4": float }]);

mod.rect = makeFunc(mod.processing.rect, [
    { "x": float },
    { "y": float },
    { "width": float },
    { "height": float },
    { "tlradius": float, optional },
    { "trradius": float, optional },
    { "brradius": float, optional },
    { "blradius": float, optional }]);

mod.triagle = makeFunc(mod.processing.triangle, [
    { "x1": float },
    { "y1": float },
    { "x2": float },
    { "y2": float },
    { "x3": float },
    { "y3": float }]);