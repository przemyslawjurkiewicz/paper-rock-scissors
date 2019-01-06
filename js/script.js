'use strict';
(function() {
  var params = {
    playerResult: 0,
    computerResult: 0,
    playerName: 'player',
    computerChoose: 'none',
    winner: 'none',
    roundsLimit: 0,
    round: 1
  };
  var welcome = document.querySelector('header');
  var playerScoresBoard = document.getElementById('playerScores');
  var computerScoresBoard = document.getElementById('computerScores');
  var roundWinner = document.getElementById('result');
  var newGameButton = document.getElementById('new-game');
  var hiddenElements = document.getElementsByClassName('hidden');

  //question about the name after load
  window.onload = function() {
    showModal('#qestions');
  };

  //Show modal function
  var showModal = function(modal) {
    //Dodanie klasy show do overlay.
    document.querySelector('#modal-overlay').classList.add('visible');
    //Dodanie klasy show do pobranego modala.
    document.querySelector(modal).classList.add('visible');
  };

  //Hide all modals function
  var hideModal = function() {
    document.querySelectorAll('.modal').forEach(function(modal) {
      modal.classList.remove('visible');
    });
    document.querySelector('#modal-overlay').classList.remove('visible');
  };

  //new game button
  newGameButton.addEventListener('click', function() {
    //Question about the name and number of rounds
    params.playerName = document.querySelector('[name="name"]').value;
    if (params.playerName == '') {
      alert('Name must be filled out');
      return false;
    }
    if (params.playerName.length < 3) {
      alert('Name must be min 3 scharset');
      return false;
    }
    params.roundsLimit = document.querySelector('[name="rounds"]').value;
    if (params.roundsLimit == '') {
      alert('Number of rounds must be filled');
      return false;
    }
    //hide modal  
    hideModal();
    ///reset params
    params.round = 1;
    params.playerResult = 0;
    params.computerResult = 0;
    //reset display
    roundWinner.innerHTML = 'Here are the results.';
    displayScores(params.playerResult, params.computerResult);
    document.getElementById('computerChooseImage').src = 'images/comp.png';
    document.getElementById('playerChooseImage').src = 'images/player.png';
    welcome.insertAdjacentHTML(
      'beforeend',
      `<p>Welcome  ${
        params.playerName
      } in the most popular game in the world.</p>`
    );
  });

  
  //score boards
  var displayScores = function(playerResult, computerResult) {
    playerScoresBoard.innerHTML = `<p>${
      params.playerName
    }: </p><p> ${playerResult}</p>`;
    computerScoresBoard.innerHTML = `<p>COMPUTER: </p><p> ${computerResult}</p>`;
  };

  //player move after click 'choose butoons'
  var playerMove = function(playerChoose) {
    playerImagesShow(playerChoose);
    computerMove();
    if (playerChoose == params.computerChoose) {
      params.winner = 'remis';
    } else if (
      (playerChoose == 'rock' && params.omputerChoose == 'scissors') ||
      (playerChoose == 'paper' && params.computerChoose == 'rock') ||
      (playerChoose == 'scissors' && params.computerChoose == 'paper')
    ) {
      params.playerResult += 1;
      params.winner = 'player';
    } else {
      params.computerResult += 1;
      params.winner = 'computer';
    }
    displayScores(params.playerResult, params.computerResult);
    displayWinner(params.winner);
    //check if this is the last round
    if (params.round == params.roundsLimit) {
      whoWinsAll();
    } else {
      params.round += 1;
      console.log(params.round);
    }
  };

  //display who win the round
  var displayWinner = function(win) {
    if (win == 'player') {
      roundWinner.innerHTML = `Round ${params.round}/${
        params.roundsLimit
      }: win ${params.playerName}`;
    } else if (win == 'computer') {
      roundWinner.innerHTML = `Round ${params.round}/${
        params.roundsLimit
      }: win Computer`;
    } else {
      roundWinner.innerHTML = `Round ${params.round}/${
        params.roundsLimit
      }: Remis`;
    }
  };

  //who wins all rounds
  var whoWinsAll = function() {
    if (params.playerResult == params.computerResult) {
      allRemis();
    } else if (params.playerResult > params.computerResult) {
      allPlayer();
    } else {
      allComputer();
    }
  };

  var allRemis = function() {
    showFunny();
    document.getElementById('funny').src = 'images/haha1.png';
  };

  var allPlayer = function() {
    showFunny();
    document.getElementById('funny').src = 'images/haha2.png';
  };

  var allComputer = function() {
    showFunny();
    document.getElementById('funny').src = 'images/haha3.png';
  };

  //show funny donkey for 2 seconds
  var showFunny = function() {
    document.getElementById('funny').style.visibility = 'visible';
    document.getElementById('buttons').style.visibility = 'hidden';
    setTimeout(function() {
      document.getElementById('funny').style.visibility = 'hidden';
      newGameButton.classList.toggle('hidden');
      var i;
      for (i = 0; i < hiddenElements.length; i++) {
        hiddenElements[i].classList.remove('visible');
      }
    }, 2000);
  };

  //computer move after player move
  var computerMove = function() {
    var x = Math.floor(Math.random() * 3 + 1);
    //transform numbers to names of moves
    switch (x) {
      case 1:
        params.computerChoose = 'rock';
        compImagesShow(params.computerChoose);
        break;
      case 2:
        params.computerChoose = 'paper';
        compImagesShow(params.computerChoose);
        break;
      case 3:
        params.computerChoose = 'scissors';
        compImagesShow(params.computerChoose);
        break;
    }
  };

  //Change pictures for comp move
  function compImagesShow(compChooseed) {
    document.querySelectorAll('.comp-image').forEach(function(e) {
      //reset images
      e.classList.remove('visible');
      e.classList.add('hidden');
    });
    //visible image to choosed move
    var selector = '#' + compChooseed;
    document
      .querySelector('#computerChooseImage')
      .querySelector(selector)
      .classList.add('visible');
  }

  //Change pictures for player move
  function playerImagesShow(playerChooseed) {
    //reset images
    document.querySelectorAll('.player-image').forEach(function(e) {
      e.classList.remove('visible');
      e.classList.add('hidden');
    });
    //visible image to choosed move
    var selector = '#' + playerChooseed;
    document
      .querySelector('#playerChooseImage')
      .querySelector(selector)
      .classList.add('visible');
  }

  //player choose butoons
  document.querySelectorAll('.player-move').forEach(function(e) {
    e.addEventListener('click', function() {
      playerMove(e.getAttribute('data-move'));
    });
  });

  //IT IS GOOD TOO
  /* var chooseButtons = document.querySelectorAll('.player-move');
  for (var i = 0; i < chooseButtons.length; i++) {
    var choosed = chooseButtons[i].getAttribute('data-move');
    chooseButtons[i].addEventListener('click', function() {
      playerMove(choosed);
    });
  }
*/
})();
