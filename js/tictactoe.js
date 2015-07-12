$(document).ready(function() {
  var counter = 0;
  var gameBoard = [];
  var winner = undefined;
  var turn = 0;
  var winningMoves;

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

  selectedPlayer();

  $("div.box").on("click", function() {
    var player = counter % 2;
    var index = $("div.box").index(this);
    var row = Math.floor(index / 3);
    var column = index % 3;

    if (winner !== undefined) return false;
    if (!legalMove(index)) return false;

    (player) ? $(this).addClass("superman") : $(this).addClass("batman");

    placeTokenOnBoard(player, index);

    if ((checkRow(row)) || (checkColumn(column)) || (checkDiagonal())) {
      showWinner(winner);
    }

    counter++;
    switchTurn();
  });

  function placeTokenOnBoard(player, position) {
    gameBoard[position] = player;
  }

  function legalMove(position) {
    return (gameBoard[position] === undefined);
  }

  function checkRow(i) {
    return checkValuesForThreeBoxes((i * 3), (i * 3) + 1, (i * 3) + 2);
  }

  function checkColumn(i) {
    return checkValuesForThreeBoxes(i, i + 3, i + 6);
  }

  function checkDiagonal() {
    if (checkValuesForThreeBoxes(0, 4, 8)) {
      return true;
    }

    if (checkValuesForThreeBoxes(2, 4, 6)) {
      return true;
    }
  }

  function checkValuesForThreeBoxes(one, two, three) {
    if ( (gameBoard[one] !== undefined)
      && (gameBoard[one] == gameBoard[two])
      && (gameBoard[one] == gameBoard[three])) {
      winner = gameBoard[one];
      winningMoves = [one, two, three];
      return true;
    }
  }

  function showWinner(winner) {
    if (winner) {
      console.log("Winner: Superman");
    } else {
      console.log("Winner: Batman");
    }

    for (var x = 0; x < 9; x++) {
      if (winningMoves.indexOf(x) == -1) {
        $("div.box").eq(x).addClass("loser");
      }
    }
  }
});