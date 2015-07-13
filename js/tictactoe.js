$(document).ready(function() {
  var counter, gameBoard, scores, turn, winner, winningMoves;
  var scores = [0, 0];

  function newGame() {
    counter = 0;
    gameBoard = [];
    turn = Math.round(Math.random());
    winner = undefined;
    winningMoves = undefined;

    var players = $("aside");
    players.removeClass("selected");
    players.eq(turn).addClass("selected");

    $("#winner").removeClass("batman superman");
    $("div.box").removeClass("batman superman loser");

    displayScores();

    var first = (turn) ? "Superman" : "Batman";
    $("header.message").html(first + " gets to play first.");
  }

  function displayScores() {
    for (var i = 0; i < 2; i++) {
      $("div.score").eq(i).html(scores[i]);
    }
  }

  function selectedPlayer() {
    if (turn === 0) {
      $("aside").eq(1).removeClass("selected");
      $("aside").eq(0).addClass("selected");
    } else {
      $("aside").eq(0).removeClass("selected");
      $("aside").eq(1).addClass("selected");
    }
  }

  function switchTurn() {
    if (turn == 0) {
      turn = 1;
    } else {
      turn = 0;
    }
    selectedPlayer();
  }

  function placeTokenOnBoard(player, position) {
    gameBoard[position] = player;
  }

  function legalMove(position) {
    return (gameBoard[position] === undefined);
  }

  function checkRow(i) {
    return checkThreeValues((i * 3), (i * 3) + 1, (i * 3) + 2);
  }

  function checkColumn(i) {
    return checkThreeValues(i, i + 3, i + 6);
  }

  function checkDiagonal() {
    if (checkThreeValues(0, 4, 8)) {
      return true;
    }

    if (checkThreeValues(2, 4, 6)) {
      return true;
    }
  }

  function checkThreeValues(one, two, three) {
    if ( (gameBoard[one] !== undefined)
      && (gameBoard[one] == gameBoard[two])
      && (gameBoard[one] == gameBoard[three])) {
      winner = gameBoard[one];
      winningMoves = [one, two, three];
      return true;
    }
  }

  function showWinner(winner) {
    var message = $("header.message"),
        banner = $("#winner");

    if (winner !== undefined) {
      $("aside.player").addClass("selected");

      if (winner) {
        banner.addClass("superman");
        message.html("Superman defeats Batman!");
        switchTurn();
      } else {
        banner.addClass("batman");
        message.html("Batman defeats Superman!");
        switchTurn();
      }

      scores[winner]++;
      displayScores();

      for (var x = 0; x < 9; x++) {
        if (winningMoves.indexOf(x) == -1) {
          $("div.box").eq(x).addClass("loser");
        }
      }
    } else {
      $("aside").removeClass("selected");
      $("div.box").addClass("loser");
      message.html("The game has ended in a draw");
    }
  }

  $("#new-game").on("click", function(e) {
    newGame();
    e.preventDefault();
  });

  $("div.box").on("click", function() {
    var index = $("div.box").index(this);
    var row = Math.floor(index / 3);
    var column = index % 3;

    $("header.message").html("");

    if (winner !== undefined) return false;
    if (!legalMove(index)) return false;

    (turn) ? $(this).addClass("superman") : $(this).addClass("batman");

    placeTokenOnBoard(turn, index);

    if ((checkRow(row)) || (checkColumn(column)) || (checkDiagonal())) {
      showWinner(winner);
    }

    switchTurn();

    if ((counter === 8) && (winner === undefined)) {
      showWinner(undefined)
    }

    counter++;
  });

  newGame();
  selectedPlayer();
});