var randomNumber1 = Math.floor(Math.random() * 6 + 1);
var randomNumber2 = Math.floor(Math.random() * 6 + 1);

function setRandomImage(element, random) {
    element.setAttribute("src", "images/dice" + random + ".png")
}

setRandomImage(document.querySelector("div.container").children[1].children[1], randomNumber1)
setRandomImage(document.querySelector("div.container").children[2].children[1], randomNumber2)

var header = document.querySelector("div.container h1")
if (randomNumber1 == randomNumber2) {
    header.textContent = "Draw!"
} else {
    if (randomNumber1 > randomNumber2) {
        player = '<i class="fa fa-flag"></i> Player 1 Wins!'
    } else {
        player = 'Player 2 Wins! <i class="fa fa-flag"></i> ';
    }

    header.innerHTML = player
}