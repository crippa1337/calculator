const titles = ["CALCULATOR", "KALKULATOR", "KALCULATOR", "CALKULATOR"]
let elemTitle = document.getElementById("title");
let elemScreen = document.getElementById("screen");
let displayText = ""

setInterval(function () {
    random = Math.floor(Math.random() * titles.length);
    elemTitle.innerText = titles[random];

}, 10000);

function buttonClick(input) {
    // If displayText is ERR and another input is detected
    // it clears displayText and then adds the input onto the now empty string
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
        displayText = "";
        updateDisplay();
    }

    else if (operator == 'DEL') {
        if (displayText == "ERR") {
            displayText = displayText.slice(0, -3);
            updateDisplay();
        }

        displayText = displayText.slice(0, -1);
        updateDisplay();
    }

    else if (operator == 'ANS') {
        try {
            displayText = displayText.replaceAll("^", "**")
            displayText = eval(displayText);
            updateDisplay();
        }

        catch {
            displayText = "ERR";
            updateDisplay();
        }
    }
}

function updateDisplay() {
    elemScreen.innerText = displayText;
}