import Sk from "./skulpt.js";

const {
    str,
    func,
    NotImplementedError,
    pyCheckArgs,
} = Sk.builtin;

const {
    remapToJs,
    remapToPy
} = Sk.ffi;

const argsToArray = Array.from;

function countNonOptionalArgs(args) {
    args.filter(a => a.optional).length;
}

function join(func, arr1, arr2) {
    return arr1.map((v, i) => func(v, arr2[i]));
}

function pyCheckTypes(args) {
    args.forEach((a) => {
        let [arg, template] = a;
        let keys = Object.keys(template);
        let argName = keys[0];
        if (!(arg instanceof template[argName])) {
            throw new TypeError();
        }
    });
}

export function makeFunc(thingToWrap, name, args_template) {
    let jsfunc = function wrappedFunc() {
        let functionToWrap = null;

        if (typeof thingToWrap != "function") {
            if (thingToWrap[name]) {
                functionToWrap = thingToWrap[name];
            }
        } else {
            functionToWrap = thingToWrap;
        }

        if (functionToWrap == null) {
            throw new Error("Couldn't infer function to wrap");
        }

        let args = argsToArray(arguments);

        let js_args = args.filter((a, i) => args_template[i] != self).map(remapToJs);

        pyCheckArgs(name, args, countNonOptionalArgs(args_template), args.length, true);

        pyCheckTypes(join((l, r) => [l,r], args, args_template));

        let result = functionToWrap.apply(null, js_args);
        return remapToPy(result);
    };

    return new func(jsfunc);
}

export const optional = true;

export const self = { "self": true };

export const notImplemented = new func(() => { throw new NotImplementedError(); });

export const __name__ = new str("processing");