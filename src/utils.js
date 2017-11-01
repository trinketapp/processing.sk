import Sk from "./skulpt.js";
import { processingInstance } from "./processing.js";

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
    return args === undefined ? 0 : args.filter(a => !a.optional).length;
}

function join(func, arr1, arr2) {
    return arr1.map((v, i) => func(v, arr2[i]));
}

function pyCheckTypes(name, args) {
    args.forEach((a) => {
        let [arg, template] = a;
        let keys = Object.keys(template);
        let argName = keys[0];

        if (!Array.isArray(template[argName])) {
            template[argName] = [ template[argName] ];
        }

        // if a is true i.e. a short cut if you don't want the type to be checked Any or self.
        // and it has to be really true not just truthy.
        if (!template[argName].some(a => {
            if (a === true) {
                return true;
            }

            if (typeof a === "string") {
                return arg.tp$name === a;
            }

            return arg instanceof a && (!a.allowed || arg in a.allowed);
        })) {
            throw new TypeError(`${name}: ${argName} (value: ${remapToJs(arg)}) not of type ${template[argName].map(t => t.tp$name)}`);
        }
    });
}

export function makeFunc(thingToWrap, name, args_template) {
    let largs_template = args_template || [];

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

        let args = argsToArray(arguments).filter(a => a !== undefined);

        let js_args = args.map((a, i) => largs_template[i] === self ? a : remapToJs(a));

        pyCheckArgs(name, args, countNonOptionalArgs(largs_template), largs_template.length, true);

        pyCheckTypes(name, join((l, r) => [l,r], args, largs_template));

        let result = functionToWrap.apply(null, js_args);

        return remapToPy(result);
    };

    return new func(jsfunc);
}

export const optional = true;

export const self = { "self": true };

export const notImplemented = new func(() => { throw new NotImplementedError(); });

export const __name__ = new str("processing");

export const processingProxy = new Proxy({}, {
    get(target, name) {
        return processingInstance[name];
    }
});