const gameControler = ((() => {
  let gameBoard = [['', '', ''], ['', '', ''], ['', '', '']];
  let isPlayerOneTurn = true;
  const divGameBoard = document.querySelectorAll('.container button');
  const title = document.querySelector('h1');
  const btnRestart = document.querySelector('#restart');

  function displayBoard() {
    for (let i = 0; i < gameBoard.length; i += 1) {
      for (let j = 0; j < gameBoard[i].length; j += 1) {
        divGameBoard[i * 3 + j].innerHTML = gameBoard[i][j];
      }
    }
  }

  function checkWin() {
    let emptySpaces = 0;

    for (let i = 0; i < gameBoard.length; i += 1) {
      if (gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2] && gameBoard[i][0] !== '') return 1;
    }

    for (let j = 0; j < gameBoard.length; j += 1) {
      if (gameBoard[0][j] === gameBoard[1][j] && gameBoard[1][j] === gameBoard[2][j] && gameBoard[0][j] !== '') return 1;
    }

    if (gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2] && gameBoard[1][1] !== '') return 1;
    if (gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0] && gameBoard[1][1] !== '') return 1;

    for (let i = 0; i < gameBoard.length; i += 1) {
      for (let j = 0; j < gameBoard[i].length; j += 1) {
        if (gameBoard[i][j] === '') emptySpaces += 1;
      }
    }

    if (emptySpaces === 0) { return 2; }

    return 0;
  }

  function endGame() {
    for (let i = 0; i < divGameBoard.length; i += 1) {
      divGameBoard[i].disabled = true;
    }
  }

  function markSpot(evt) {
    const { x } = evt.currentTarget;
    const { y } = evt.currentTarget;

    if (gameBoard[x][y] !== '') return;

    if (isPlayerOneTurn) gameBoard[x][y] = 'X';
    else gameBoard[x][y] = 'O';

    displayBoard();

    const result = checkWin();

    if (result === 1) {
      if (isPlayerOneTurn) title.innerHTML = 'Player 1 wins!';
      else title.innerHTML = 'Player 2 wins!';
      endGame();
      return;
    } if (result === 2) {
      title.innerHTML = 'It\'s a tie';
      endGame();
      return;
    }

    isPlayerOneTurn = !isPlayerOneTurn;
    if (isPlayerOneTurn) title.innerHTML = 'Player 1 turn';
    else title.innerHTML = 'Player 2 turn';
  }

  function restart() {
    gameBoard = [['', '', ''], ['', '', ''], ['', '', '']];
    for (let i = 0; i < divGameBoard.length; i += 1) {
      divGameBoard[i].disabled = false;
    }
    displayBoard();
  }

  for (let i = 0; i < gameBoard.length; i += 1) {
    for (let j = 0; j < gameBoard[i].length; j += 1) {
      divGameBoard[i * 3 + j].addEventListener('click', markSpot);
      divGameBoard[i * 3 + j].x = i;
      divGameBoard[i * 3 + j].y = j;
    }
  }

  for (let i = 0; i < divGameBoard.length; i += 1) {
    divGameBoard[i].disabled = false;
  }

  title.innerHTML = 'Player 1 turn';

  btnRestart.addEventListener('click', restart);

  displayBoard();
}));

gameControler();
