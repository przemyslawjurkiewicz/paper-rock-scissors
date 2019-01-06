'use strict';
(function() {
  var params = {
    playerResult: 0,
    computerResult: 0,
    playerName: 'player',
    computerChoose: 'none',
    winner: 'none',
    roundsLimit: 0,
    round: 1,
    progres: []
  };
  var welcome = document.getElementById('welcome');
  var playerScoresBoard = document.getElementById('playerScores');
  var computerScoresBoard = document.getElementById('computerScores');
  var roundWinner = document.getElementById('result');
  var newGameButton = document.getElementById('new-game');
  var startGameButton = document.getElementById('start-game');
  var statsTable = document.getElementById('stats-table');

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

  //start game button
  startGameButton.addEventListener('click', function() {
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
    if (isNaN(params.roundsLimit)) {
      alert('It must be a number');
      return false;
    }
    if (params.roundsLimit % 1 != 0) {
      alert('It must be a whole number');
      return false;
    }
    //hide modal
    hideModal();
    ///reset params
    params.round = 1;
    params.playerResult = 0;
    params.computerResult = 0;
    params.progres = [];
    //reset display
    roundWinner.innerHTML = 'Here are the results.';
    document.getElementById('buttons').style.visibility = 'visible';
    displayScores(params.playerResult, params.computerResult);
    document.getElementById('computerChooseImage').src = 'images/comp.png';
    document.getElementById('playerChooseImage').src = 'images/player.png';
    welcome.innerHTML =
      '<p>Welcome ' +
      params.playerName +
      ' in the most popular game in the world.</p>';
  });

  //new game button
  newGameButton.addEventListener('click', function() {
    statsTable.innerHTML = '';
    hideModal();
    showModal('#qestions');
    document.querySelector('[name="rounds"]').value = params.roundsLimit;
    document.querySelector('[name="name"]').value = params.playerName;
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
    params.progres.push({
      roundNumber: params.round,
      playerMoveInRound: playerChoose,
      compMoveInRound: params.computerChoose,
      whoWinRound: params.winner
    });
    console.log(params.progres);
    //check if this is the last round
    if (params.round == params.roundsLimit) {
      whoWinsAll();
      showModal('#stats');
      modalStatsTable();
    } else {
      params.round += 1;
    }
  };

  var modalStatsTable = function() {
    statsTable.innerHTML =
      '<thead><tr><th>Round:</th><th>Your Move</th><th>Computer Move</th><th>Round Result</th></tr></thead>';
    for (var i = 0; i < params.progres.length; i++) {
      statsTable.innerHTML +=
        '<tr><td>' +
        params.progres[i].roundNumber +
        '</td><td>' +
        params.progres[i].playerMoveInRound +
        '</td><td>' +
        params.progres[i].compMoveInRound +
        '</td><td>' +
        params.progres[i].whoWinRound +
        '</td></tr>';
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
      showFunny('#remis');
    } else if (params.playerResult > params.computerResult) {
      showFunny('#player');
    } else {
      showFunny('#computer');
    }
  };

  //
  var hideFunny = function () {
    document.querySelectorAll('.funny').forEach(function(e) {
      e.classList.remove('visible');
      e.classList.add('hidden');
    });
  }

  //show funny donkey for 2 seconds
  var showFunny = function(selector) {
    document.querySelector(selector).classList.add('visible');
    console.log(document.querySelector(selector));
    document.getElementById('buttons').style.visibility = 'hidden';
    setTimeout(function() {
      hideFunny();
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
