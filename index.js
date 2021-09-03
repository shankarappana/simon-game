
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;



$(".btn").click(function() {	
	var userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


function nextSequence() {

  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  level++;
  $("h1").text("Level " + level);
    
  playSound(randomChosenColour);
}

function playSound(name) {
  $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);
  
  animatePress(name);

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
   setTimeout(function(){
         $("#" + currentColor).removeClass("pressed");
    }, 50);
}

$(document).keypress(function(event) {
  if(!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if(gamePattern.length === userClickedPattern.length) {
         setTimeout(function(){
          nextSequence();
    }, 1000);
    }
  } else {
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
}