var buttonColours = ['red', 'blue', 'green', 'yellow'];
var randomChosenColour;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour= buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    let btn = $('#' + randomChosenColour);
    animate(btn);
    playAudio(btn.attr('id'));
    updateLevelTitle();
    level++;
}

function playAudio(btnId) {
    var audio = new Audio('sounds/' + btnId + '.mp3');
    audio.play();
}

function animate(btn) {
    btn.fadeOut(100).fadeIn(100);
}

function updateLevelTitle(isReset) {
    let title = $('#level-title');
    if (isReset) {
        title.text('Game Over, Press Any Key to Restart');
    } else {
        title.text('Level ' + level);
    }
}

function isValid() {
    for(var i = 0; i < userClickedPattern.length; i++) {
        if (gamePattern[i] != userClickedPattern[i]) {
            return false;
        }
    }

    return true;
}

function reset() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    updateLevelTitle(true);
}

$(function() {
    $('.btn').on('click', function(event) {
        var id = $(event.target).attr('id');
        userClickedPattern.push(id);
        animate($(event.target));

        if (!isValid()) {
            playAudio('wrong');
            $(document.body).addClass('game-over');
            setTimeout(function() {
                $(document.body).removeClass('game-over');
            }, 50);
            reset();
            return false;
        }

        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function() {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    });

    $(document).on('keypress', function(event) {
        reset();
        nextSequence();
    })
});