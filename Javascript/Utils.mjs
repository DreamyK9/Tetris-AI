"use strict";
import {PLAY_BTN } from "./UI.mjs";

export const GAME = {
    paused: false,
    controlsLocked: false,
};

export class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export function togglePause() {
    if (GAME.paused) {
        PLAY_BTN.innerHTML = "Resume";
        GAME.paused = false;
    } else {
        PLAY_BTN.innerHTML = "Pause";
        GAME.paused = true;
    }
}
