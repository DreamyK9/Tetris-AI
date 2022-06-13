"use strict";

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

//! WIP
const pauseInfo = document.querySelector('.paused');
// generator for toggling "paused" info text
function updatePauseInfo () {
    if (paused) {
        pauseInfo.textContent = 'Paused';
    } else {
        pauseInfo.textContent = 'Playing';
    }
}
