import processing from  'processing.js'
import Sk from 'skulpt.js'
import { makeFunc } from 'utils.js'

export default {
    day: makeFunc(processing.day),
    hour: makeFunc(processing.hour),
    millis: makeFunc(processing.millis),
    minute: makeFunc(processing.minute),
    month: makeFunc(processing.month),
    second: makeFunc(processing.second),
    year: makeFunc(processing.year)
}