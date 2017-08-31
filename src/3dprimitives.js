import processing from  'processing.js'
import Sk from 'skulpt.js'
import { makeFunc, optional } from 'utils.js'

const { float } = Sk.builtin;

export default {
    box: makeFunc(processing.box, [
        { "width": float },
        { "height": float, optional },
        { "depth": float, optional }
    ]),

    sphere: makeFunc(processing.sphere, [
        { "radius": float }
    ]),

    sphereDetail: makeFunc(processing.sphereDetail, [
        { "ures": float },
        { "vres": float, optional }
    ])
}
