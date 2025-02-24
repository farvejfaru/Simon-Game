// Stores the game-generated sequence
let gameSeq = [];
// Stores the user input sequence
let userSeq = [];

// Array of button colors
let btns = ["red", "yellow", "green", "purple"];

let started = false; // Tracks if the game has started
let level = 0; // Tracks the current level

let h2 = document.querySelector("h2"); // Selects the heading element

// Detects key press to start the game
document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game is Started");
        started = true;
        levelUp();
    }
});

// Flashes a button when the game plays a sequence
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

// Flashes a button when the user clicks it
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}

// Increases the level and adds a new random button to the sequence
function levelUp() {
    userSeq = []; // Reset user's sequence
    level++;
    h2.innerText = `Level ${level}`;

    // Select a random button from the array
    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    
    gameSeq.push(randColor); // Add the color to the game sequence
    console.log(gameSeq);
    
    gameFlash(randBtn); // Flash the chosen button
}

// Checks if the user's input matches the game sequence
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start`;
        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

// Handles user's button click
function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

// Adds event listeners to all buttons
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Resets the game
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}