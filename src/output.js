mod.println = new Sk.builtin.func(function (data) {
    // println(data)
    mod.processing.println(data.v);
});

mod.save = new Sk.builtin.func(function (filename) {
    // save(filename)
    // returns None
    mod.processing.save(filename.v);
});

mod.saveFrame = new Sk.builtin.func(function (filename) {
    // saveFrame()
    // saveFrame(filename-####.ext)
    // returns None
    if (typeof (filename) === "undefined") {
        mod.processing.saveFrame();
    } else {
        mod.processing.saveFrame(filename.v);
    }
});


mod.saveStrings = new Sk.builtin.func(function (filename, strings) {
    // saveStrings(filename,strings)
    mod.processing.saveStrings(filename.v, strings.v);
});

PrintWriter
beginRaw
beginRecord
createOutput
createReader
createWriter
endRaw
endRecord
saveBytes
saveStream
selectOuput