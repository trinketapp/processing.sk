import processing from "./processing.js";
import Sk from "./skulpt.js";
import { makeFunc, optional } from "./utils.js";

const { float } = Sk.builtin;

export default {
    beginCamera: makeFunc(processing.beginCamera, "beginCamera"),

    camera: makeFunc(processing.camera, "camera", [
        { "eyeX": float, optional },
        { "eyeY": float, optional },
        { "eyeZ": float, optional },
        { "centerX": float, optional },
        { "centerY": float, optional },
        { "centerZ": float, optional },
        { "upX": float, optional },
        { "upY": float, optional },
        { "upZ": float, optional }
    ]),

    endCamera: makeFunc(processing.endCamera, "endCamera"),

    frustum: makeFunc(processing.frustum, "frustum", [
        { "left": float },
        { "right": float },
        { "bottom": float },
        { "top": float },
        { "near": float },
        { "far": float }
    ]),

    ortho: makeFunc(processing.ortho, "ortho", [
        { "left": float, optional },
        { "right": float, optional },
        { "bottom": float, optional },
        { "top": float, optional },
        { "near": float, optional },
        { "far": float, optional }
    ]),

    perspective: makeFunc(processing.perspective, "perspective", [
        { "fov": float, optional },
        { "aspect": float, optional },
        { "zNear": float, optional },
        { "zFar": float, optional }
    ]),

    printCamera: makeFunc(processing.printCamera, "printCamera"),

    printProjection: makeFunc(processing.printProjection, "printProjection")
};