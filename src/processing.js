/*
  Skulpt Processing

  Testing/debugging:

  ProcessingJS from Skulpt:
  Sk.misceval.callsim(Sk.globals.processing.$d.PShapeSVG,
      new Sk.builtin.str("string"),
      new Sk.builtin.str("bot1.svg"))

  ProcessingJS direct:
  p = Processing.instances[0]
  p.PShapeSVG("string", "bot1.svg")
*/

export function main(name) {
    var mod = {};
    var imList = [];
    var looping = true;
    var instance = null;

    // We need this to store a reference to the actual processing object which is not created
    // until the run function is called.  Even then the processing object is passed by the
    // processing-js sytem as a parameter to the sketchProc function.  Why not set it to None here
    //

    // See:  http://processingjs.org/reference/

    mod.processing = null;
    mod.p = null;

    //  //////////////////////////////////////////////////////////////////////
    //  Run
    //
    //  Create the processing context and setup of calls to setup, draw etc.
    //
    //
    //  //////////////////////////////////////////////////////////////////////
    mod.run = new Sk.builtin.func(function () {
        function sketchProc(processing) {
            mod.processing = processing;

            // processing.setup = function() {
            //     if Sk.globals["setup"]
            //         Sk.misceval.callsim(Sk.globals["setup"])
            // }


            // FIXME if no Sk.globals["draw"], then no need for this
            processing.draw = function () {
                // if there are pending image loads then just use the natural looping calls to
                // retry until all the images are loaded.  If noLoop was called in setup then make
                // sure to revert to that after all the images in hand.
                var wait = false;
                for (var i in imList) {
                    if (imList[i].width === 0) {
                        wait = true;
                    }
                }
                if (wait === true) {
                    if (looping === true) {
                        return;
                    }
                    else {
                        processing.loop();
                        return;
                    }

                } else {
                    if (looping === false) {
                        processing.noLoop();
                    }
                }

                mod.frameCount = processing.frameCount;
                if (Sk.globals["draw"]) {
                    try {
                        Sk.misceval.callsim(Sk.globals["draw"]);
                    }
                    catch (e) {
                        Sk.uncaughtException(e);
                    }
                }
            };

            var callBacks = ["setup", "mouseMoved", "mouseClicked", "mouseDragged", "mouseMoved", "mouseOut",
                "mouseOver", "mousePressed", "mouseReleased", "keyPressed", "keyReleased", "keyTyped"
            ];
            for (var cb in callBacks) {
                if (Sk.globals[callBacks[cb]]) {
                    processing[callBacks[cb]] = new Function("try {Sk.misceval.callsim(Sk.globals['" + callBacks[cb] + "']);} catch(e) {Sk.uncaughtException(e);}");
                }
            }
        }

        var canvas = document.getElementById(Sk.canvas);
        if (canvas.tagName !== "CANVAS") {
            var mydiv = canvas;
            canvas = document.createElement('canvas');
            while (mydiv.firstChild) {
                mydiv.removeChild(mydiv.firstChild);
            }
            mydiv.appendChild(canvas);
        }
        window.$(canvas).show();
        window.Processing.logger = {
            log: function (message) {
                Sk.misceval.print_(message);
            }
        };
        // if a Processing instance already exists it's likely still running, stop it by exiting
        instance = window.Processing.getInstanceById(Sk.canvas);
        if (instance) {
            instance.exit();
        }
        mod.p = new window.Processing(canvas, sketchProc);
    });

    return mod;
};