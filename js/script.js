"use strict";
(function() {
  var playerResult;
  var computerResult;
  var playerName;
  var computerChoose;
  var winner;
  var welcome = document.querySelector("header");
  var playerScoresBoard = document.getElementById("playerScores");
  var computerScoresBoard = document.getElementById("computerScores");
  var chooseRockButton = document.getElementById("chooseRock");
  var choosePaperkButton = document.getElementById("choosePaper");
  var chooseScissorsButton = document.getElementById("chooseScissors");
  var roundWinner = document.getElementById("result");

  document.addEventListener("DOMContentLoaded", function() {
    playerName = window.prompt("Add your Name:");
    welcome.insertAdjacentHTML(
      "beforeend",
      "<p>Welcome " + playerName + " in the most popular game in the world.</p>"
    );
    playerResult = 0;
    computerResult = 0;
    displayScores(playerResult, computerResult);
  });

  var displayScores = function(playerResult, computerResult) {
    playerScoresBoard.innerHTML =
      "<p>" + playerName + " :</p><p>" + playerResult + "</p>";
    computerScoresBoard.innerHTML =
      "<p>COMPUTER: </p><p>" + computerResult + "</p>";
  };

  var displayWinner = function (winner){
    roundWinner.innerHTML = winner == "player" ? "Player win" : (winner == "computer" ? "Computer win": "Remis");
  }

  var playerMove = function(playerChoose) {
    console.log("player" + playerChoose);
    computerMove();
    playerChoose == computerChoose
      ? (winner="remis")
      : (playerChoose == "rock" && computerChoose == "scissors") ||
        (playerChoose == "paper" && computerChoose == "rock") ||
        (playerChoose == "scissors" && computerChoose == "paper")
      ? (playerResult += 1, winner="player")
      : (computerResult += 1, winner="computer");
    console.log(playerResult);
    console.log(computerResult);
    displayScores(playerResult, computerResult);
    displayWinner(winner);
  };

  var computerMove = function() {
    var x = Math.floor(Math.random() * 3 + 1);
    console.log(x);
    switch (x) {
      case 1:
        computerChoose = "rock";
        break;
      case 2:
        computerChoose = "paper";
        break;
      case 3:
        computerChoose = "scissors";
        break;
    }
    console.log("comp:" + computerChoose);
  };

  chooseRockButton.addEventListener("click", function() {
    playerMove("rock");
  });

  choosePaperkButton.addEventListener("click", function() {
    playerMove("paper");
  });

  chooseScissorsButton.addEventListener("click", function() {
    playerMove("scissors");
  });
})();
