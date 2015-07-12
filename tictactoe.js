$(document).ready(function() {
  var counter = 0;
  var gameBoard = [];

  $("div.box").on("click", function() {
    var player = counter % 2;
    var index = $("div.box").index(this);

    if (!legalMove(index)) return false;

    if (player) {
      $(this).addClass("superman");
    } else {
      $(this).addClass("batman");
    }

    placeTokenOnBoard(player, index);
    counter++;
  });

  function placeTokenOnBoard(player, position) {
    gameBoard[position] = player;
  }

  function legalMove(position) {
    return (gameBoard[position] === undefined);
  }
});