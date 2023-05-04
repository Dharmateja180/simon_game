var userClickedPattern = [];
var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var started=false;
var level = 0;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }
});

$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(lvl){
  if(gamePattern[lvl]=== userClickedPattern[lvl]){
    if (userClickedPattern.length === gamePattern.length){
    setTimeout(function(){
      nextSequence();
    },1000);
  }
}
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Gameover, Press any key to restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startedOver();
  }
}


function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
}

function animatePress(color){
  $("#"+color).addClass("pressed");
  setTimeout(function(){
    $("#"+color).removeClass("pressed")
  },100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startedOver(){
  level=0;
  gamePattern=[];
  started=false;
}