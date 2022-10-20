let elemTitle = document.getElementById("title");
console.log(elemTitle);

//every 10 seconds there is a 30% chance that the letter C in the title
//will be replaced with a k and vice versa
setInterval(function() {
    if (Math.random() < 0.3) {
        elemTitle = elemTitle.replace("C", "k");
        elemTitle = elemTitle.replace("c", "k");
        elemTitle = elemTitle.replace("K", "c");
        elemTitle = elemTitle.replace("k", "c");
        document.getElementById("title").innerHTML = elemTitle;
    }
}, 10000);