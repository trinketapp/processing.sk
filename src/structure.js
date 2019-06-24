import { processing } from "./processing.js";
import {
    processingProxy,
    makeFunc,
    optional,
    self,
    constructOptionalContectManager,
    cachedLazy,
    ignored,
    __isinitialised__
} from "./utils.js";
import { remappedConstants } from "./constants.js";
import Sk from "./skulpt.js";

const { int_, object } = Sk.builtin;
const { P2D, JAVA2D, WEBGL, P3D, OPENGL, PDF, DXF } = remappedConstants;

function loop() {
    if (processingProxy[__isinitialised__]) {
        throw new Sk.builtin.Exception("loop() should be called after run()");
    }

    processing.loop();
}

function noLoop() {
    if (processingProxy[__isinitialised__]) {
        throw new Sk.builtin.Exception("noLoop() should be called after run()");
    }

    processingProxy.noLoop();
}

function size(width, height, renderer) {
    if (renderer === undefined || renderer === P2D || renderer === JAVA2D) {
    // monkey patching image to make sure toImageData returns something.
    // 2017 Chrome 64 doesn't always return something the first call.
    // this is a VERY HACKY way to deal with that synchronously.
        processing.toImageData = function(x, y, w, h) {
            x = x !== undefined ? x : 0;
            y = y !== undefined ? y : 0;
            w = w !== undefined ? w : processing.width;
            h = h !== undefined ? h : processing.height;
            let res = undefined;
            while (res === undefined) {
                res = processing.externals.context.getImageData(x, y, w, h);
            }
            return res;
        };
    }
    processing.size(width, height, renderer);
}

export default {
    loop: makeFunc(loop, "loop"),
    noLoop: makeFunc(noLoop, "noLoop"),

    size: makeFunc(size, "size", [
        { width: int_ },
        { height: int_ },
        {
            renderer: int_,
            allowed: [P2D, JAVA2D, WEBGL, P3D, OPENGL, PDF, DXF],
            optional
        }
    ]),

    exit: makeFunc(processingProxy, "exit"),

    redraw: makeFunc(processingProxy, "redraw"),

    pushStyle: cachedLazy(
        constructOptionalContectManager,
        [
            {
                __call__: makeFunc(
                    self => {
                        processingProxy.pushStyle();
                        return self;
                    },
                    "__call__",
                    [self]
                ),
                __enter__: makeFunc(self => self, "__enter__", [self]),
                __exit__: makeFunc(() => processingProxy.popStyle(), "__exit__", [
                    self,
                    { exc_type: object, ignored },
                    { exc_value: object, ignored },
                    { traceback: object, ignored }
                ])
            },
            "pushStyle"
        ],
        "pushStyle"
    ),

    popStyle: makeFunc(processingProxy, "popStyle")
};
