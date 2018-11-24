"use strict";
(function() {
  var welcome = document.querySelector("header");

  document.addEventListener("DOMContentLoaded", function() {
    var playerName = window.prompt("Add your Name:");
    welcome.insertAdjacentHTML(
      "beforeend",
      "<p>Welcome " + playerName + " in the most popular game in the world.</p>"
    );
  });
})();
