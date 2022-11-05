const elemTitle = document.getElementById('title');
const elemScreenText = document.getElementById('screen');
const elemOldText = document.getElementById('old-screen');
let displayText = '';
let oldText = '';

const titles = ['CALCULATOR', 'KALKULATOR', 'KALCULATOR', 'CALKULATOR'];
setInterval(() => {
    random = Math.floor(Math.random() * titles.length);
    elemTitle.innerText = titles[random];
}, 10000);

// adds a blinking underscore to the end of displayText
setInterval(() => {
    if (displayText.endsWith('_')) {
        displayText = displayText.slice(0, -1);
    } else {
        displayText += '_';
    }
    updateDisplay();
}, 500);

function removeUnderScore() {
    if (displayText.endsWith('_')) {
        displayText = displayText.slice(0, -1);
    }
    updateDisplay();
}

function updateDisplay() {
    elemScreenText.innerText = displayText;
    elemOldText.innerText = oldText;
}

function buttonClick(input) {
    // If displayText is ERR and another input is detected
    // clear displayText and then add the input onto the now empty string
    removeUnderScore();
    if (displayText == 'ERR') {
        displayText = '';
        displayText += input;
        updateDisplay();
        return;
    }
    displayText += input;
    updateDisplay();
}

function functionClick(operator) {
    removeUnderScore();
    switch (operator) {
        case 'ERR': {
            displayText = '';
            break
        }

        case 'DEL': {
            displayText = displayText.slice(0, -1);
            break
        }

        case 'AC': {
            displayText = '';
            oldText = '';
            break
        }

        case 'DVD': {
            if (isBouncing) {
                isBouncing = false;
                clearInterval(bouncer);
                break
            } else {
                isBouncing = true;
                dvdInit();
                break
            }
        }

        case 'ANS': {
            try {
                if (displayText === '') {
                    if (oldText) {
                        displayText = oldText;
                    } else {
                        displayText = '0'
                    }
                }
                oldText = displayText;
                displayText = displayText.replaceAll('^', '**');
                displayText = eval(displayText);
                displayText = displayText.toString();
            } catch {
                displayText = 'ERR';
            }
        }
    }
    updateDisplay();
}

//Make the DIV element draggagle:
dragElement(document.getElementById('main'));
function dragElement(element) {
    let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(element.id + 'header')) {
        // if present, the header is where you move the DIV from
        document.getElementById(element.id + 'header').onmousedown = dragMouseDown;
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
        element.style.top = element.offsetTop - pos2 + 'px';
        element.style.left = element.offsetLeft - pos1 + 'px';
    }

    function closeDragElement() {
        // stop moving when mouse button is released
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

const main = document.getElementById('main');
let x_incr = 1;
let y_incr = 1;
let isBouncing = false;
let dvdStopCount = 0;
let bouncer;
// dvdInit() is called when the DVD button is pressed
function dvdInit() {
    // assigns an interval to bouncer that calls frame() every 5ms
    bouncer = setInterval(frame, 5);
}

// handle_collision() is called everytime frame() is called to check if the dvd is colliding with the edges of the screen
function handle_collision() {
    let main_height = main.offsetHeight;
    let main_width = main.offsetWidth;
    let left = main.offsetLeft;
    let top = main.offsetTop;
    let win_height = window.innerHeight;
    let win_width = window.innerWidth;

    // if the dvd is colliding with the top or bottom edge of the screen, invert x_incr
    if (left <= 0 || left + main_width >= win_width) {
        x_incr = ~x_incr + 1;
    }

    // if the dvd is colliding with the top or bottom edge of the screen, invert y_incr
    if (top <= 0 || top + main_height >= win_height) {
        y_incr = ~y_incr + 1;
    }
}

function frame() {
    // calls handle_collision() to check if the dvd is colliding with the edges of the screen
    handle_collision();
    // moves the dvd by x_incr and y_incr pixels
    main.style.top = `${main.offsetTop + y_incr}px`;
    main.style.left = `${main.offsetLeft + x_incr}px`;
}
