const titles = ["CALCULATOR", "KALKULATOR", "KALCULATOR", "CALKULATOR"]
let elemTitle = document.getElementById("title");
let elemScreenText = document.getElementById("screen");
let displayText = "";
let elemOldText = document.getElementById("old-screen");
let oldText = "";

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