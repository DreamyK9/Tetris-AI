"use strict";
import {togglePause} from "./Utils.mjs";


export const PLAY_BTN = document.querySelector("#play-btn");

PLAY_BTN.addEventListener("click", togglePause);
