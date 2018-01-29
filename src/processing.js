import twodprimitives from "./2dprimitives.js";
import threedprimitives from "./3dprimitives.js";
import attributes from "./attributes.js";
import calculation from "./calculation.js";
import camera from "./camera.js";
import ccreatingandreading from "./color-creatingandreading.js";
import csetting from "./color-setting.js";
import color from "./color.js";
import { remappedConstants } from "./constants.js";
import coordinates from "./coordinates.js";
import curves from "./curves.js";
import { EnvironmentBuilder, cursor, noCursor, height, width, frameCount, focused, FrameRateBuilder } from "./environment.js";
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
import { processingProxy, initUtils } from "./utils.js";

const { callsim, asyncToPromise, callsimOrSuspend } = Sk.misceval;

const mod = {};

export let processingInstance = {};

export function isInitialised() {
    return processing == null;
}

export let PImage;
export let PShape;
export let PGraphics;
export let PVector;
export let PFont;

export let processing = processingProxy;

let suspHandler;
let bHandler;

let seenCanvas = null;
let doubleBuffered = true;
let eventPred = () => true;

export function init(path, suspensionHandler, breakHandler, eventPredicate) {
    suspHandler = suspensionHandler;
    if (breakHandler !== undefined && typeof breakHandler !== "function") {
        throw new Error("breakHandler must be a function if anything");
    } else {
        bHandler = breakHandler;
    }

    Sk.externalLibraries = Sk.externalLibraries || {};

    Object.assign(Sk.externalLibraries, {
        "./processing/__init__.js": {
            path: `${path}/__init__.js`,
        },
    });

    if (typeof eventPredicate === "function") {
        eventPred = eventPredicate;
    }
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

    PImage = PImageBuilder(mod);
    PShape = PShapeBuilder(mod);
    PGraphics = PGraphicsBuilder(mod);
    PVector = vectorBuilder(mod);
    PFont = PFontBuilder(mod);

    let Environment = EnvironmentBuilder(mod);
    let FrameRate = FrameRateBuilder(mod);
    let frameRate = callsim(FrameRate);
    let environment = callsim(Environment);

    let Mouse = MouseBuilder(mod);
    let mouse = callsim(Mouse);
    let Keyboard = KeyboardBuilder(mod);
    let keyboard = callsim(Keyboard);
    let Screen = ScreenBuilder(mod);
    let screen = callsim(Screen);

    initUtils(mod);

    Object.assign(mod, twodprimitives, threedprimitives, attributes, calculation, camera,
        ccreatingandreading, csetting, { color }, remappedConstants, coordinates, curves,
        { Environment, environment, cursor, noCursor, height, width, frameCount, frameRate, focused },
        files, fontattribues, fontmetrics, { PFont, createFont, loadFont, text, textFont },
        { PGraphics, createGraphics, hint }, { PImage }, { image, createImage, imageMode, loadImage,
            noTint, requestImage, tint, blend, copy, filter, get, loadPixels, set, updatePixels, pixels },
        { keyboard, Keyboard, keyCode, key, keyPressed }, lights, materialproperties, { Mouse, mouse,
            mouseX, mouseY, pmouseX, pmouseY, mousePressed, mouseButton }, output, random, { Screen, screen }, { PShape }, structure,
        timeanddate, transform, trigonometry, { PVector }, vertex, web, shape, stringFunctions);

    mod.disableDoubleBuffer = new Sk.builtin.func(function() {
        doubleBuffered = false;
        return Sk.builtin.none.none$;
    });

    mod.run = new Sk.builtin.func(function () {
        let susp = new Sk.misceval.Suspension();
        let exceptionOccurred = null;
        let finish = null;
        let canvas = null;
        let parentNode = null;

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

        let sketchProc = new window.Processing.Sketch(function sketchProcFunc(proc) {
            function throwAndExit(e) {
                exceptionOccurred(e);
                proc.exit();
            }

            processingInstance = proc;

            if (Sk.globals["setup"]) {
                proc.setup = function () {
                    return asyncToPromise(() => callsimOrSuspend(Sk.globals["setup"]), suspHandler);
                };
            }

            if (Sk.globals["draw"]) {
                proc.draw = function () {
                    // call the break handler every draw so the processing.sk is stoppable.
                    if (bHandler) {
                        try {
                            bHandler();
                        } catch (e) {
                            throwAndExit(e);
                        }
                    }

                    return asyncToPromise(
                        () => callsimOrSuspend(Sk.globals["draw"]), suspHandler
                    );
                };
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
                                throwAndExit(e);
                            }
                        };
                    })();
                }
            }
        });

        sketchProc.options.globalKeyEvents = true;
        sketchProc.options.eventPredicate = eventPred;
        sketchProc.onExit = e => {
            if (e) {
                exceptionOccurred(e);
            } else {
                finish();
            }
        };

        sketchProc.onSetup = e => {
            if (e) {
                exceptionOccurred(e);
            }
        };

        let canvasContainer = document.getElementById(Sk.canvas);

        // this shouldn't be the case but added for backwards compat
        // may have strange results when this hits.
        if (canvasContainer.tagName === "CANVAS") {
            parentNode = canvasContainer.parentNode;
            parentNode.removeChild(canvasContainer);
            canvasContainer = parentNode;
        }

        canvas = document.createElement("canvas");
        canvas.id = Sk.canvas + "-psk";

        while (canvasContainer.firstChild) {
            canvasContainer.removeChild(canvasContainer.firstChild);
        }

        if (doubleBuffered) {
            canvas.style = "display:none";
            seenCanvas = document.createElement("canvas");
            canvasContainer.appendChild(seenCanvas);
        } else {
            canvasContainer.appendChild(canvas);
        }

        // if a Processing instance already exists it's likely still running, stop it by exiting
        let instance = window.Processing.getInstanceById(Sk.canvas + "-psk");
        if (instance) {
            instance.exit();
        }

        // ugly hack make it start the loopage!
        setTimeout(() => {
            mod.p = new window.Processing(canvas, sketchProc, null, seenCanvas);
        }, 300);

        return susp;
    });

    return mod;
}