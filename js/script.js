"use strict";
(function() {
  var playerResult;
  var computerResult;
  var playerName;

  var welcome = document.querySelector("header");
  var playerScoresBoard = document.getElementById("playerScores");
  var computerScoresBoard = document.getElementById("computerScores");

  document.addEventListener("DOMContentLoaded", function() {
    playerName = window.prompt("Add your Name:");
    welcome.insertAdjacentHTML(
      "beforeend",
      "<p>Welcome " + playerName + " in the most popular game in the world.</p>"
    );
    displayScores(0, 0);
  });

  var displayScores = function(playerResult, computerResult) {
    playerScoresBoard.insertAdjacentHTML(
      "afterbegin",
      "<p>" + playerName + "</p><p>" + playerResult + "</p>"
    );
    computerScoresBoard.insertAdjacentHTML(
        "afterbegin",
        "<p>COMPUTER: </p><p>" + computerResult + "</p>"
      );
  };
})();
