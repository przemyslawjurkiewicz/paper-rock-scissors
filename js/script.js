"use strict";
(function() {
  //declarations of global variables
  var playerResult;
  var computerResult;
  var playerName;
  var computerChoose;
  var winner;
  var roundsLimit;
  var round;
  var welcome = document.querySelector("header");
  var playerScoresBoard = document.getElementById("playerScores");
  var computerScoresBoard = document.getElementById("computerScores");
  var chooseRockButton = document.getElementById("chooseRock");
  var choosePaperkButton = document.getElementById("choosePaper");
  var chooseScissorsButton = document.getElementById("chooseScissors");
  var roundWinner = document.getElementById("result");
  var newGameButton = document.getElementById("new-game");
  var hiddenElements = document.getElementsByClassName("hidden");

  //question about the name after load
  document.addEventListener("DOMContentLoaded", function() {
    playerName = window.prompt("Enter your Name:");
    welcome.insertAdjacentHTML(
      "beforeend",
      "<p>Welcome " + playerName + " in the most popular game in the world.</p>"
    );
  });

  //new game button
  newGameButton.addEventListener("click", function() {
    //question about round limit
    enterRoundLimit();
    //change visible elements hidden after the page has been loaded
    for (var i = 0; i < hiddenElements.length; i++) {
      hiddenElements[i].classList.add("visible");
    }
    //reset variables
    round = 1;
    playerResult = 0;
    computerResult = 0;
    roundWinner.innerHTML = "Here are the results.";
    displayScores(playerResult, computerResult);
    document.getElementById("computerChooseImage").src = "images/comp.png";
    document.getElementById("playerChooseImage").src = "images/player.png";
    //hide new game button
    this.classList.toggle("hidden");
    //showing the buttons with a choice
    document.getElementById("buttons").style.visibility = "visible";
  });

  //question about round limit
  var enterRoundLimit = function() {
    //if limit is wrong
    roundsLimit = window.prompt("Enter the limit of rounds:");
    isNaN(roundsLimit) || !roundsLimit
      ? (alert("Enter the number !!!"), enterRoundLimit())
      : roundsLimit;
  };

  //score boards
  var displayScores = function(playerResult, computerResult) {
    playerScoresBoard.innerHTML =
      "<p>" + playerName + " :</p><p>" + playerResult + "</p>";
    computerScoresBoard.innerHTML =
      "<p>COMPUTER: </p><p>" + computerResult + "</p>";
  };

  //display who win the round
  var displayWinner = function(winner) {
    roundWinner.innerHTML =
      winner == "player"
        ? "Round " + round + "/" + roundsLimit + ": win " + playerName
        : winner == "computer"
        ? "Round " + round + "/" + roundsLimit + ": win Computer "
        : "Round " + round + "/" + roundsLimit + ": Remis ";
  };

  //player move after click "choose butoons"
  var playerMove = function(playerChoose) {
    computerMove();
    playerChoose == computerChoose
      ? (winner = "remis")
      : (playerChoose == "rock" && computerChoose == "scissors") ||
        (playerChoose == "paper" && computerChoose == "rock") ||
        (playerChoose == "scissors" && computerChoose == "paper")
      ? ((playerResult += 1), (winner = "player"))
      : ((computerResult += 1), (winner = "computer"));
    displayScores(playerResult, computerResult);
    displayWinner(winner);
    //check if this is the last round
    round == roundsLimit ? whoWinsAll() : (round += 1);
  };

  //who wins all rounds
  var whoWinsAll = function() {
    playerResult == computerResult
      ? allRemis()
      : playerResult > computerResult
      ? allPlayer()
      : allComputer();
  };

  var allRemis = function() {
    showFunny();
    document.getElementById("funny").src = "images/haha1.png";
  };

  var allPlayer = function() {
    showFunny();
    document.getElementById("funny").src = "images/haha2.png";
  };

  var allComputer = function() {
    showFunny();
    document.getElementById("funny").src = "images/haha3.png";
  };

  //show funny donkey for 2 seconds
  var showFunny = function() {
    document.getElementById("funny").style.visibility = "visible";
    document.getElementById("buttons").style.visibility = "hidden";
    setTimeout(function() {
      document.getElementById("funny").style.visibility = "hidden";
      newGameButton.classList.toggle("hidden");
      var i;
      for (i = 0; i < hiddenElements.length; i++) {
        hiddenElements[i].classList.remove("visible");
      }
    }, 2000);
  };

  //computer move after player move
  var computerMove = function() {
    var x = Math.floor(Math.random() * 3 + 1);
    //display computer choise picture
    switch (x) {
      case 1:
        computerChoose = "rock";
        document.getElementById("computerChooseImage").src = "images/rocki.png";
        break;
      case 2:
        computerChoose = "paper";
        document.getElementById("computerChooseImage").src =
          "images/paperi.png";
        break;
      case 3:
        computerChoose = "scissors";
        document.getElementById("computerChooseImage").src =
          "images/scissorsi.png";
        break;
    }
  };

  //player chooise butoons, change pictures
  chooseRockButton.addEventListener("click", function() {
    playerMove("rock");
    document.getElementById("playerChooseImage").src = "images/rocki.png";
  });

  choosePaperkButton.addEventListener("click", function() {
    playerMove("paper");
    document.getElementById("playerChooseImage").src = "images/paperi.png";
  });

  chooseScissorsButton.addEventListener("click", function() {
    playerMove("scissors");
    document.getElementById("playerChooseImage").src = "images/scissorsi.png";
  });
})();
