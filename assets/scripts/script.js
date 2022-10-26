let elemTitle = document.getElementById("title");
let elemScreenText = document.getElementById("screen");
let elemOldText = document.getElementById("old-screen");

let displayText = "";
let oldText = "";

// for the dvd bounce
let main = document.getElementById("main");
let x_incr = 1;
let y_incr = 1;

const titles = ["CALCULATOR", "KALKULATOR", "KALCULATOR", "CALKULATOR"]

setInterval(function () {
    random = Math.floor(Math.random() * titles.length);
    elemTitle.innerText = titles[random];

}, 10000);

// adds a blinking underscore to the end of displayText
setInterval(function () {
    if (displayText.endsWith("_")) {
        displayText = displayText.slice(0, -1);
    } else {
        displayText += "_";
    }
    updateDisplay();
}, 500);


function buttonClick(input) {
    // If displayText is ERR and another input is detected
    // it clears displayText and then adds the input onto the now empty string
    removeUnderScore();
    if (displayText == "ERR") {
        displayText = "";
        displayText += input;
        updateDisplay();
    }

    else {
        displayText += input;
        updateDisplay();
    }
}

function functionClick(operator) {
    if (operator == 'AC') {
        // doesn't update oldText if displayText is ERR
        if (displayText == "ERR") {
            displayText = "";
            updateDisplay();
        }
        removeUnderScore();
        oldText = displayText;
        displayText = "";
        updateDisplay();
    }

    else if (operator == 'DEL') {
        removeUnderScore();
        if (displayText == "ERR") {
            displayText = displayText.slice(0, -3);
            updateDisplay();
        }

        displayText = displayText.slice(0, -1);
        updateDisplay();
    }

    else if (operator == 'ANS') {
        try {
            removeUnderScore();
            if (displayText == "" && oldText) {
                displayText += oldText;
            }

            else if (displayText == "") {
                displayText = "0";
            }

            oldText = displayText;
            displayText = displayText.replaceAll("^", "**")
            displayText = eval(displayText);
            displayText += "";
            updateDisplay();
        }

        catch {
            displayText = "ERR";
            updateDisplay();
        }
    }

    else if (operator == "DVD") {
        dvdInit();
    }
}

function updateDisplay() {
    elemScreenText.innerText = displayText;
    elemOldText.innerText = oldText;
}

function removeUnderScore() {
    if (displayText.endsWith("_")) {
        displayText = displayText.slice(0, -1);
    }
    updateDisplay();
}

//Make the DIV element draggagle:
dragElement(document.getElementById("main"));

function dragElement(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(element.id + "header")) {
        // if present, the header is where you move the DIV from
        document.getElementById(element.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV
        element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function dvdInit() {
    setInterval(frame, 5);
    console.log("bouncing");
}

function handle_collision() {
    let main_height = main.offsetHeight;
    let main_width = main.offsetWidth;
    let left = main.offsetLeft;
    let top = main.offsetTop;
    let win_height = window.innerHeight;
    let win_width = window.innerWidth;

    if (left <= 0 || left + main_width >= win_width) {
        x_incr = ~x_incr + 1;
    }
    if (top <= 0 || top + main_height >= win_height) {
        y_incr = ~y_incr + 1;
    }
}

function frame() {
    handle_collision();
    main.style.top = `${main.offsetTop + y_incr}px`;
    main.style.left = `${main.offsetLeft + x_incr}px`;
}