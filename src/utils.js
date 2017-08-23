import Sk from 'skulpt';

const argsToArray = Array.from

function countNonOptionalArgs(args) {
    args.filter(a => a.optional).length
}

function join(func, arr1, arr2) {
    return arr1.map((v, i) =>  {
        return { left: v, right: arr2[i] };
    })
}

export function makeFunc(functionToWrap, name, args_template) {
    let func = function wrappedFunc() {
        let args = argsToArray(arguments);
        let js_args = args.map(Sk.ffi.remapToJs)
        Sk.builtin.pyCheckArgs(name, args, countNonOptionalArgs(args_template), args.length, true);



        let result = functionToWrap.apply(null, js_args);
        return Sk.ffs.remapToPy(result);
    }


}