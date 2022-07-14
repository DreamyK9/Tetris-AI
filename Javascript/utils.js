"use strict";

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

//! WIP
const levelElement = document.querySelector(".level");
const linesElement = document.querySelector(".lines");
const scoreElement = document.querySelector(".score");
const playButton = document.querySelector(".playButton");
const displayNext = document.querySelector(".next");

playButton.addEventListener("click", function handleClick(event) {
    updatePauseInfo();
});

function updateNext() {
    //display image of next piece
    displayNext.innerHTML =
        '<img src="Assets/Pieces/' + nextType + '.png" alt="next piece">';
}

function updatePauseInfo() {
    GAME.paused = !GAME.paused;
    playButton.classList.toggle("paused");
}

function updateScore(lines) {
    if (lines == 0) return;
    GAME.score += scoreMultiplier[lines] * (GAME.level + 1);
    //add trailing zeros to score up to 7 digits
    scoreElement.textContent = GAME.score.toString().padStart(7, "0");
}

function updateLines() {
    linesElement.textContent = "Lines: " + ++GAME.linescleared;
}

function updateLevel() {
    levelElement.textContent = ++GAME.level;

    // increase game speed depending on gameSpeed
    if (GAME.level > 28) {
        DROP_INTERVAL = 17;
    } else {
        DROP_INTERVAL = gameSpeed[GAME.level];
    }
}

const scoreMultiplier = {
    1: 40,
    2: 100,
    3: 300,
    4: 1200,
};

// Tetris NES sec/drop table
const gameSpeed = {
    1: 715,
    2: 632,
    3: 549,
    4: 466,
    5: 383,
    6: 300,
    7: 216,
    8: 133,
    9: 100,
    10: 83,
    11: 83,
    12: 83,
    13: 67,
    14: 67,
    15: 67,
    16: 50,
    17: 50,
    18: 50,
    19: 33,
    20: 33,
    21: 33,
    22: 33,
    23: 33,
    24: 33,
    25: 33,
    26: 33,
    27: 33,
    28: 33,
};
