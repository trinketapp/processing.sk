import { processing } from "./processing.js";
import Sk from "./skulpt.js";
import { makeFunc } from "./utils.js";

const { int_, float } = Sk.builtin;

export default {
    modelX: makeFunc(processing, "modelX", [
        { "x": [ int_, float ]},
        { "y": [ int_, float ]},
        { "z": [ int_, float ]}
    ]),

    modelY: makeFunc(processing, "modelY", [
        { "x": [ int_, float ]},
        { "y": [ int_, float ]},
        { "z": [ int_, float ]}
    ]),

    modelZ: makeFunc(processing, "modelZ", [
        { "x": [ int_, float ]},
        { "y": [ int_, float ]},
        { "z": [ int_, float ]}
    ]),

    screenX: makeFunc(processing, "screenX", [
        { "x": [ int_, float ]},
        { "y": [ int_, float ]},
        { "z": [ int_, float ]}
    ]),

    screenY: makeFunc(processing, "screenY", [
        { "x": [ int_, float ]},
        { "y": [ int_, float ]},
        { "z": [ int_, float ]}
    ]),

    screenZ: makeFunc(processing, "screenZ", [
        { "x": [ int_, float ]},
        { "y": [ int_, float ]},
        { "z": [ int_, float ]}
    ])
};
