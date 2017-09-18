import twodprimitives from "./2dprimitives.js";
import threedprimitives from "./3dprimitives.js";
import attributes from "./attributes.js";
import calculation from "./calculation.js";
import camera from "./camera.js";
import ccreatingandreading from "./color-creatingandreading.js";
import csetting from "./color-setting.js";
import color from "./color.js";
import constants from "./constants.js";
import coordinates from "./coordinates.js";
import curves from "./curves.js";
import { Environment, environment, cursor, noCursor } from "./environment.js";
import files from "./files.js";
import fontattribues from "./font-attributes.js";
import fontmetrics from "./font-metrics.js";
import { PFont, createFont, loadFont, text, textFont } from "./font.js";
import { PGraphics, createGraphics, hint } from "./graphics.js";
import PImage, { image, createImage, imageMode, loadImage, noTint, requestImage, tint, blend, copy, filter, get, loadPixels, set, updatePixels } from "./image.js";
import { keyboard, Keyboard } from "./keyboard.js";
import lights from "./lights.js";
import materialproperties from "./materialproperties.js";
import { Mouse, mouse, mouseX, mouseY, pmouseX, pmouseY } from "./mouse.js";
import output from "./output.js";
import random from "./random.js";
import { Screen, screen } from "./screen.js";
import shape from "./shape.js";
import structure from "./structure.js";
import timeanddate from "./timeanddate.js";
import transform from "./transform.js";
import trigonometry from "./trigonometry.js";
import vector from "./vector.js";
import vertex from "./vertex.js";
import web from "./web.js";
import Sk from "./skulpt.js";

let looping = true;

const mod = {};

const processingInstance = null;

const imList = [];

export function isInitialised() {
    return processingInstance == null;
}

export function setProperty(name, value) {
    mod[name] = value;
}

export function setLooping(bool) {
    looping = bool;
}

export function pushImage(url) {
    imList.push(url);
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
    mod.run = new Sk.builtin.func(function () {
        function sketchProc(processing) {

            // processing.setup = function() {
            //     if Sk.globals["setup"]
            //         Sk.misceval.callsim(Sk.globals["setup"])
            // }
            Object.assign(mod, twodprimitives, threedprimitives, attributes, calculation, camera,
                ccreatingandreading, csetting, color, constants, coordinates, curves,
                { Environment, environment, cursor, noCursor }, files, fontattribues, fontmetrics,
                { PFont, createFont, loadFont, text, textFont }, { PGraphics, createGraphics, hint },
                PImage, { image, createImage, imageMode, loadImage, noTint, requestImage, tint, blend,
                    copy, filter, get, loadPixels, set, updatePixels }, { keyboard, Keyboard }, lights,
                materialproperties, { Mouse, mouse, mouseX, mouseY, pmouseX, pmouseY }, output, random,
                { Screen, screen }, shape, structure, timeanddate, transform, trigonometry, vector, vertex, web);

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

            var callBacks = [
                "setup", "mouseMoved", "mouseClicked", "mouseDragged", "mouseMoved", "mouseOut",
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
            canvas = document.createElement("canvas");
            while (mydiv.firstChild) {
                mydiv.removeChild(mydiv.firstChild);
            }
            mydiv.appendChild(canvas);
        }

        canvas.style.display = "block";

        window.Processing.logger = {
            log: function (message) {
                Sk.misceval.print_(message);
            }
        };

        // if a Processing instance already exists it's likely still running, stop it by exiting
        let instance = window.Processing.getInstanceById(Sk.canvas);
        if (instance) {
            instance.exit();
        }

        mod.p = new window.Processing(canvas, sketchProc);
    });

    return mod;
}

export default processingInstance;