import { processingProxy, makeFunc } from "./utils.js";

export default {
    day: makeFunc(processingProxy, "day"),
    hour: makeFunc(processingProxy, "hour"),
    millis: makeFunc(processingProxy, "millis"),
    minute: makeFunc(processingProxy, "minute"),
    month: makeFunc(processingProxy, "month"),
    second: makeFunc(processingProxy, "second"),
    year: makeFunc(processingProxy, "year")
};
