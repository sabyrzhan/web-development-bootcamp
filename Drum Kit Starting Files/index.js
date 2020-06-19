var buttons = document.querySelectorAll(".drum");
var buttonsSize = buttons.length;

for(var i = 0; i < buttonsSize; i++) {
    buttons[i].addEventListener("click", handleClick)
}

function handleClick() {
    var letter = this.innerHTML;
    handleKeyPress(letter);
}

function handleKeyPress(key) {
    var fileName = '';
    switch (key) {
        case 'w':
            fileName = 'crash.mp3';
            break;
        case 'a':
            fileName = 'kick-bass.mp3';
            break;
        case 's':
            fileName = 'snare.mp3';
            break;
        case 'd':
            fileName = 'tom-1.mp3';
            break;
        case 'j':
            fileName = 'tom-2.mp3';
            break;
        case 'k':
            fileName = 'tom-3.mp3';
            break;
        case 'l':
            fileName = 'tom-4.mp3';
            break;
    }

    if (fileName != '') {
        var audio = new Audio("sounds/" + fileName);
        audio.play()
        buttonAnimation(key);
    }
}

document.addEventListener('keypress', function(event) {
    handleKeyPress(event.key);
});

function buttonAnimation(key) {
    var button = document.querySelector('.' + key);
    if (button) {
        button.classList.add('pressed');
        setTimeout(function() {
            button.classList.remove('pressed');
        }, 100);
    }
}