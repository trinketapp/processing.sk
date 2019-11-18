import Sk from "./skulpt.js";
import {
    processingProxy,
    makeFunc,
    optional,
    self,
    constructOptionalContextManager,
    cachedLazy,
    ignored
} from "./utils.js";

const { float_, int_, object } = Sk.builtin;

export default {
    beginCamera: cachedLazy(
        constructOptionalContextManager,
        [
            {
                __call__: makeFunc(
                    self => {
                        processingProxy.beginCamera();
                        return self;
                    },
                    "__call__",
                    [self]
                ),
                __enter__: makeFunc(self => self, "__enter__", [self]),
                __exit__: makeFunc(() => processingProxy.endCamera(), "__exit__", [
                    self,
                    { exc_type: object, ignored },
                    { exc_value: object, ignored },
                    { traceback: object, ignored }
                ])
            },
            "beginCamera"
        ],
        "beginCamera"
    ),

    endCamera: makeFunc(processingProxy, "endCamera"),

    camera: makeFunc(processingProxy, "camera", [
        { eyeX: [int_, float_], optional },
        { eyeY: [int_, float_], optional },
        { eyeZ: [int_, float_], optional },
        { centerX: [int_, float_], optional },
        { centerY: [int_, float_], optional },
        { centerZ: [int_, float_], optional },
        { upX: [int_, float_], optional },
        { upY: [int_, float_], optional },
        { upZ: [int_, float_], optional }
    ]),

    frustum: makeFunc(processingProxy, "frustum", [
        { left: [int_, float_] },
        { right: [int_, float_] },
        { bottom: [int_, float_] },
        { top: [int_, float_] },
        { near: [int_, float_] },
        { far: [int_, float_] }
    ]),

    ortho: makeFunc(processingProxy, "ortho", [
        { left: [int_, float_], optional },
        { right: [int_, float_], optional },
        { bottom: [int_, float_], optional },
        { top: [int_, float_], optional },
        { near: [int_, float_], optional },
        { far: [int_, float_], optional }
    ]),

    perspective: makeFunc(processingProxy, "perspective", [
        { fov: [int_, float_], optional },
        { aspect: [int_, float_], optional },
        { zNear: [int_, float_], optional },
        { zFar: [int_, float_], optional }
    ]),

    printCamera: makeFunc(processingProxy, "printCamera"),

    printProjection: makeFunc(processingProxy, "printProjection")
};
