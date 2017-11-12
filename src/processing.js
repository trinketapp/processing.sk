import twodprimitives from "./2dprimitives.js";
import threedprimitives from "./3dprimitives.js";
import attributes from "./attributes.js";
import calculation from "./calculation.js";
import camera from "./camera.js";
import ccreatingandreading from "./color-creatingandreading.js";
import csetting from "./color-setting.js";
import colorBuilder from "./color.js";
import { remappedConstants } from "./constants.js";
import coordinates from "./coordinates.js";
import curves from "./curves.js";
import { EnvironmentBuilder, cursor, noCursor, height, width, frameCount, frameRate, focused } from "./environment.js";
import files from "./files.js";
import fontattribues from "./font-attributes.js";
import fontmetrics from "./font-metrics.js";
import { PFontBuilder, createFont, loadFont, text, textFont } from "./font.js";
import { PGraphicsBuilder, createGraphics, hint } from "./graphics.js";
import PImageBuilder, { image, createImage, imageMode, loadImage, noTint, requestImage,
    tint, blend, copy, filter, get, loadPixels, set, updatePixels, pixels } from "./image.js";
import { KeyboardBuilder, keyCode, key, keyPressed } from "./keyboard.js";
import lights from "./lights.js";
import materialproperties from "./materialproperties.js";
import { MouseBuilder, mouseX, mouseY, pmouseX, pmouseY, mousePressed, mouseButton } from "./mouse.js";
import output from "./output.js";
import random from "./random.js";
import { ScreenBuilder } from "./screen.js";
import shape, { PShapeBuilder } from "./shape.js";
import stringFunctions from "./string-functions.js";
import structure from "./structure.js";
import timeanddate from "./timeanddate.js";
import transform from "./transform.js";
import trigonometry from "./trigonometry.js";
import vectorBuilder from "./vector.js";
import vertex from "./vertex.js";
import web from "./web.js";
import Sk from "./skulpt.js";
import { processingProxy } from "./utils.js";

const { callsim, asyncToPromise, callsimOrSuspend } = Sk.misceval;

const mod = {};

let noLoopAfterAsync = false;

export let processingInstance = {};

export function isInitialised() {
    return processing == null;
}

export let color;
export let PImage;
export let PShape;
export let PGraphics;
export let PVector;
export let PFont;

export let processing = processingProxy;

let suspHandler;
let bHandler;

export function init(path, suspensionHandler, breakHandler) {
    suspHandler = suspensionHandler;
    if (breakHandler !== undefined && typeof breakHandler !== "function") {
        throw new Error("breakHandler must be a function if anything");
    } else {
        bHandler = breakHandler;
    }

    Sk.externalLibraries = Sk.externalLibraries || {};

    Object.assign(Sk.externalLibraries, {
        processing: {
            path: `${path}/__init__.js`,
        },
    });
}

export function requestNoLoop() {
    noLoopAfterAsync = true;
}

export function main() {
    // We need this to store a reference to the actual processing object which is not created
    // until the run function is called.  Even then the processing object is passed by the
    // processing-js sytem as a parameter to the sketchProc function.  Why not set it to None here
    //

    // See:  http://processingjs.org/reference/

    //  //////////////////////////////////////////////////////////////////////
    //  Run
    //
    //  Create the processing context and setup of calls to setup, draw etc.
    //
    //
    //  //////////////////////////////////////////////////////////////////////

    color = colorBuilder(mod);
    PImage = PImageBuilder(mod);
    PShape = PShapeBuilder(mod);
    PGraphics = PGraphicsBuilder(mod);
    PVector = vectorBuilder(mod);
    PFont = PFontBuilder(mod);

    let Environment = EnvironmentBuilder(mod);
    let environment = callsim(Environment);
    let Mouse = MouseBuilder(mod);
    let mouse = callsim(Mouse);
    let Keyboard = KeyboardBuilder(mod);
    let keyboard = callsim(Keyboard);
    let Screen = ScreenBuilder(mod);
    let screen = callsim(Screen);

    Object.assign(mod, twodprimitives, threedprimitives, attributes, calculation, camera,
        ccreatingandreading, csetting, { color }, remappedConstants, coordinates, curves,
        { Environment, environment, cursor, noCursor, height, width, frameCount, frameRate, focused },
        files, fontattribues, fontmetrics, { PFont, createFont, loadFont, text, textFont },
        { PGraphics, createGraphics, hint }, { PImage }, { image, createImage, imageMode, loadImage,
            noTint, requestImage, tint, blend, copy, filter, get, loadPixels, set, updatePixels, pixels },
        { keyboard, Keyboard, keyCode, key, keyPressed }, lights, materialproperties, { Mouse, mouse,
            mouseX, mouseY, pmouseX, pmouseY, mousePressed, mouseButton }, output, random, { Screen, screen }, { PShape }, structure,
        timeanddate, transform, trigonometry, { PVector }, vertex, web, shape, stringFunctions);

    mod.run = new Sk.builtin.func(function () {
        noLoopAfterAsync = false;
        let susp = new Sk.misceval.Suspension();
        let exceptionOccurred = null;
        let finish = null;

        susp.resume = function() {
            if (susp.data["error"]) {
                throw susp.data["error"];
            }

            return Sk.builtin.none.none$;
        };

        susp.data = {
            type: "Sk.promise", promise: new Promise(function(resolve, reject) {
                exceptionOccurred = reject;
                finish = resolve;
            })
        };

        function sketchProc(proc) {
            let promisses = [];
            let wait = true;

            processingInstance = proc;

            proc.externals.sketch.onExit = finish;

            if (Sk.globals["setup"]) {
                promisses.push(asyncToPromise(() => callsimOrSuspend(Sk.globals["setup"]), suspHandler));
            } else {
                promisses.push(Promise.resolve());
            }

            if (Sk.globals["draw"]) {
                proc.draw = function () {
                    if (promisses.length === 0) {
                        return;
                    }

                    Promise.all(promisses)
                        .then(() => wait = false)
                        .catch(e => {
                            exceptionOccurred(e);
                            proc.exit();
                        });

                    // keep calling draw untill all promisses have been resolved
                    if (wait) {
                        return;
                    }

                    // if noLoop was called from python only stop looping after all
                    // async stuff happened.
                    if (noLoopAfterAsync) {
                        proc.noLoop();
                        Promise.all(promisses)
                            .then(finish)
                            .catch((e) => {
                                exceptionOccurred(e);
                                proc.exit();
                            });
                        return;
                    }

                    // call the break handler every draw so the processing.sk is stoppable.
                    if (bHandler) {
                        try {
                            bHandler();
                        } catch (e) {
                            exceptionOccurred(e);
                            proc.exit();
                        }
                    }

                    promisses.push(asyncToPromise(() => callsimOrSuspend(Sk.globals["draw"]), suspHandler));
                };
            } else {
                processing.noLoop();
                Promise.all(promisses)
                    .then(finish)
                    .catch((e) => {
                        exceptionOccurred(e);
                        proc.exit();
                    });
            }

            var callBacks = [
                "mouseMoved", "mouseClicked", "mouseDragged", "mouseMoved", "mouseOut",
                "mouseOver", "mousePressed", "mouseReleased", "keyPressed", "keyReleased", "keyTyped"
            ];

            for (var cb in callBacks) {
                if (Sk.globals[callBacks[cb]]) {
                    (() => {
                        let callback = callBacks[cb];
                        proc[callback] = () =>  {
                            try {
                                // event handlers can't be asynchronous.
                                Sk.misceval.callsim(Sk.globals[callback]);
                            } catch(e) {
                                exceptionOccurred(e);
                                if (processingInstance) {
                                    processingInstance.exit();
                                }
                            }
                        };
                    })();
                }
            }
        }

        var canvas = document.getElementById(Sk.canvas);

        if (canvas.tagName !== "CANVAS") {
            var mydiv = canvas;
            canvas = document.createElement("canvas");
            while (mydiv.firstChild) {
                mydiv.removeChild(mydiv.firstChild);
            }

            mydiv.appendChild(canvas);
        }

        canvas.style.display = "block";

        // if a Processing instance already exists it's likely still running, stop it by exiting
        let instance = window.Processing.getInstanceById(Sk.canvas);
        if (instance) {
            instance.exit();
        }

        mod.p = new window.Processing(canvas, sketchProc);

        return susp;
    });

    return mod;
}