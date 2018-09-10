import Sk from "./skulpt.js";
import { processingInstance } from "./processing.js";

const {
    str,
    func,
    NotImplementedError,
    pyCheckArgs,
    ValueError,
    TypeError
} = Sk.builtin;

const {
    remapToJs,
    remapToPy
} = Sk.ffi;

const { buildClass, callsim } = Sk.misceval;

const { assign, keys } = Object;

const argsToArray = Array.from;

const cache = new Map();

export const __isinitialised__ = "__isinitialised__";

let OptionalContextManager;

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

        if (typeof thingToWrap !== "function") {
            if (!thingToWrap[__isinitialised__]) {
                throw new Error(`cannot call "${name}" outside "draw", "setup" or event handlers`);
            }
  
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

        pyCheckArgs(name, args, countNonOptionalArgs(largs_template), largs_template.length, false);

        pyCheckTypes(name, join((l, r) => [l,r], args, largs_template));

        let js_args =
            args.filter((a, i) => largs_template[i].ignored === undefined || ! largs_template[i].ignored)
                .map((a, i) => {
                    let template = largs_template[i];

                    if (template === self) {
                        return a;
                    }

                    if (template.converter) {
                        return template.converter(remapToJs(a));
                    }

                    return remapToJs(a);
                });

        let result = functionToWrap.apply(null, js_args);

        return remapToPy(result);
    };

    return new func(jsfunc);
}

export function strToColor(input) {
    if (typeof input === "string") {
        let res = /#([A-F0-9]{6})/g.exec(input);
        if (res.length !== 2) {
            throw new ValueError(`${input} not in the correct format for a color expecting "#AB12F4"`);
        }

        return parseInt(res[1], 16) + 0xFF000000;
    }

    return input;
}

export const optional = true;

export const ignored = true;

export const self = { "self": true };

export const notImplemented = new func(() => { throw new NotImplementedError(); });

export const __name__ = new str("processing");

export const processingProxy = new Proxy({}, {
    get(target, name) {
        if (name === __isinitialised__) {
            return processingInstance === null;
        }

        return processingInstance[name];
    }
});

function optionalContextManager(loc){
    return ($glb, $loc) => {
        assign($loc, loc);
    };
}

export function initUtils(mod) {
    OptionalContextManager = (loc, name) => buildClass(mod, optionalContextManager(loc), "OptionalContextManager_" + name, []);
}

export function constructOptionalContectManager(loc, name) {
    let funcs = keys(loc);

    if (!funcs.includes("__call__") || !funcs.includes("__enter__") || !funcs.includes("__exit__")) {
        throw new Error("The optional context manager needs a __call__, __enter__ and __exit__ function.");
    }

    return callsim(OptionalContextManager(loc, name));
}

export function cachedLazy(func, args, id) {
    return () => {
        if (cache.has(id)) {
            return cache.get(id);
        }

        let res = func.apply(null, args);

        cache.set(id, res);

        return res;
    };
}