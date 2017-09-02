import processing from  'processing.js'
import Sk from 'skulpt.js'
import { makeFunc, notImplemented, optional } from 'utils.js'

const { str } = Sk.builtin;

export default {
    link: makeFunc(processing.link, [
        { "url": str },
        { "target": str, optional }
    ]),
    status: makeFunc(processing.status, [
        { "text": str }
    ])
}