import processing from "./processing.js";
import Sk from "./skulpt.js";
import { makeFunc } from "./utils.js";

const { int, float } = Sk.builtin;

export default {
    modelX: makeFunc(processing.modelX, "modelX", [
        { "x": [ int, float ]},
        { "y": [ int, float ]},
        { "z": [ int, float ]}
    ]),

    modelY: makeFunc(processing.modelY, "modelY", [
        { "x": [ int, float ]},
        { "y": [ int, float ]},
        { "z": [ int, float ]}
    ]),

    modelZ: makeFunc(processing.modelZ, "modelZ", [
        { "x": [ int, float ]},
        { "y": [ int, float ]},
        { "z": [ int, float ]}
    ]),

    screenX: makeFunc(processing.screenX, "screenX", [
        { "x": [ int, float ]},
        { "y": [ int, float ]},
        { "z": [ int, float ]}
    ]),

    screenY: makeFunc(processing.screenY, "screenY", [
        { "x": [ int, float ]},
        { "y": [ int, float ]},
        { "z": [ int, float ]}
    ]),

    screenZ: makeFunc(processing.screenZ, "screenZ", [
        { "x": [ int, float ]},
        { "y": [ int, float ]},
        { "z": [ int, float ]}
    ])
};
