import Sk from "./skulpt.js";
import { processingProxy, makeFunc, optional } from "./utils.js";

const { float_ } = Sk.builtin;

export default {
    beginCamera: makeFunc(processingProxy, "beginCamera"),

    camera: makeFunc(processingProxy, "camera", [
        { "eyeX": float_, optional },
        { "eyeY": float_, optional },
        { "eyeZ": float_, optional },
        { "centerX": float_, optional },
        { "centerY": float_, optional },
        { "centerZ": float_, optional },
        { "upX": float_, optional },
        { "upY": float_, optional },
        { "upZ": float_, optional }
    ]),

    endCamera: makeFunc(processingProxy, "endCamera"),

    frustum: makeFunc(processingProxy, "frustum", [
        { "left": float_ },
        { "right": float_ },
        { "bottom": float_ },
        { "top": float_ },
        { "near": float_ },
        { "far": float_ }
    ]),

    ortho: makeFunc(processingProxy, "ortho", [
        { "left": float_, optional },
        { "right": float_, optional },
        { "bottom": float_, optional },
        { "top": float_, optional },
        { "near": float_, optional },
        { "far": float_, optional }
    ]),

    perspective: makeFunc(processingProxy, "perspective", [
        { "fov": float_, optional },
        { "aspect": float_, optional },
        { "zNear": float_, optional },
        { "zFar": float_, optional }
    ]),

    printCamera: makeFunc(processingProxy, "printCamera"),

    printProjection: makeFunc(processingProxy, "printProjection")
};