const float = Sk.builtin.float_;
const optional = true;

mod.bezier = makeFunc(mod.processing.bezier, [
    { "x1": float },
    { "y1": float },
    { "z1": float },
    { "cx1": float },
    { "cy1": float },
    { "cz1": float },
    { "cx2": float },
    { "cy2": float },
    { "cz2": float, optional },
    { "x2": float, optional },
    { "y2": float, optional },
    { "z2": float, optional }]);

mod.bezierDetail = makeFunc(mod.processing.bezierDetail, [
    { "detail": int }]);

mod.bezierPoint = makeFunc(mod.processing.bezierPoint, [
    { "a": float },
    { "b": float },
    { "c": float },
    { "d": float },
    { "t": float }]);

mod.bezierTangent = makeFunc(mod.processing.bezierTangent, [
    { "a": float },
    { "b": float },
    { "c": float },
    { "d": float },
    { "t": float }]);

mod.curve = makeFunc(mod.processing.curve, [
    { "x1": float },
    { "y1": float },
    { "z1": float },
    { "x2": float },
    { "y2": float },
    { "z2": float },
    { "x3": float },
    { "y3": float },
    { "z3": float, optional },
    { "x4": float, optional },
    { "y4": float, optional },
    { "z4": float, optional }]);

mod.curveDetail = makeFunc(mod.processing.curveDetail, [
    { "detail": int }]);

mod.curvePoint = makeFunc(mod.processing.curvePoint, [
    { "a": float },
    { "b": float },
    { "c": float },
    { "d": float },
    { "t": float }]);

mod.curveTangent = makeFunc(mod.processing.curveTangent, [
    { "a": float },
    { "b": float },
    { "c": float },
    { "d": float },
    { "t": float }]);

mod.curveTightness = makeFunc(mod.processing.curveTightness, [
    { "squishy": int }]);