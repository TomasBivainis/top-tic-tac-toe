const gameControler = ((() => {
  let gameBoard = [['', '', ''], ['', '', ''], ['', '', '']];
  let isPlayerOneTurn = true;
  const divGameBoard = document.querySelectorAll('.container button');
  const labelTitle = document.querySelector('h1');
  const btnRestart = document.querySelector('#restart');
  const btnStart = document.querySelector('#start');
  const btnMenu = document.querySelector('#menu');
  let name1 = 'Player 1';
  let name2 = 'Player 2';

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
      if (isPlayerOneTurn) labelTitle.innerHTML = `${name1} wins!`;
      else labelTitle.innerHTML = `${name2} wins!`;
      endGame();
      return;
    } if (result === 2) {
      labelTitle.innerHTML = 'It\'s a tie';
      endGame();
      return;
    }

    isPlayerOneTurn = !isPlayerOneTurn;
    if (isPlayerOneTurn) labelTitle.innerHTML = `${name1} turn`;
    else labelTitle.innerHTML = `${name2} turn`;
  }

  function restart() {
    gameBoard = [['', '', ''], ['', '', ''], ['', '', '']];

    for (let i = 0; i < divGameBoard.length; i += 1) {
      divGameBoard[i].disabled = false;
    }

    displayBoard();
  }

  btnStart.addEventListener('click', () => {
    name1 = document.querySelector('#name1').value;
    name2 = document.querySelector('#name2').value;

    const divMenu = document.querySelector('#start-menu');
    divMenu.style.display = 'none';

    const divGame = document.querySelector('#game');
    divGame.style.display = 'flex';

    labelTitle.innerHTML = `${name1} turn`;

    restart();
  });

  btnMenu.addEventListener('click', () => {
    const divMenu = document.querySelector('#start-menu');
    divMenu.style.display = 'flex';

    const divGame = document.querySelector('#game');
    divGame.style.display = 'none';
  });

  btnRestart.addEventListener('click', restart);

  for (let i = 0; i < gameBoard.length; i += 1) {
    for (let j = 0; j < gameBoard[i].length; j += 1) {
      divGameBoard[i * 3 + j].addEventListener('click', markSpot);
      divGameBoard[i * 3 + j].x = i;
      divGameBoard[i * 3 + j].y = j;
    }
  }
}));

gameControler();
