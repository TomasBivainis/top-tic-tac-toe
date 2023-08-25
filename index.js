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
  let isSinglePlayer = false;

  function displayBoard() {
    for (let i = 0; i < gameBoard.length; i += 1) {
      for (let j = 0; j < gameBoard[i].length; j += 1) {
        divGameBoard[i * 3 + j].innerHTML = gameBoard[i][j];
      }
    }
  }

  function evaluateBotPosition(board) {
    let emptySpaces = 0;

    for (let i = 0; i < board.length; i += 1) {
      if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] === 'O') return 2;
    }

    for (let j = 0; j < board.length; j += 1) {
      if (board[0][j] === board[1][j] && board[1][j] === board[2][j] && board[0][j] === 'O') return 2;
    }

    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[1][1] === 'O') return 2;
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[1][1] === 'O') return 2;

    for (let i = 0; i < board.length; i += 1) {
      for (let j = 0; j < board[i].length; j += 1) {
        if (board[i][j] === '') emptySpaces += 1;
      }
    }

    if (emptySpaces === 0) { return 1; }

    return 0;
  }

  function checkWin(board = gameBoard) {
    let emptySpaces = 0;

    for (let i = 0; i < board.length; i += 1) {
      if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') return 2;
    }

    for (let j = 0; j < board.length; j += 1) {
      if (board[0][j] === board[1][j] && board[1][j] === board[2][j] && board[0][j] !== '') return 2;
    }

    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[1][1] !== '') return 2;
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[1][1] !== '') return 2;

    for (let i = 0; i < board.length; i += 1) {
      for (let j = 0; j < board[i].length; j += 1) {
        if (board[i][j] === '') emptySpaces += 1;
      }
    }

    if (emptySpaces === 0) { return 1; }

    return 0;
  }

  function endGame() {
    for (let i = 0; i < divGameBoard.length; i += 1) {
      divGameBoard[i].disabled = true;
    }
  }

  function getPossibleMoves(board) {
    const possibleMoves = [];

    for (let i = 0; i < board.length; i += 1) {
      for (let j = 0; j < board[i].length; j += 1) {
        if (board[i][j] === '') {
          possibleMoves.unshift(JSON.parse(JSON.stringify(board)));
          possibleMoves[0][i][j] = 'O';
        }
      }
    }

    return possibleMoves;
  }

  function minmax(board, depth, maximizingPlayer) {
    const possibleMoves = getPossibleMoves(board);

    if (depth === 0 || possibleMoves.length === 0 || checkWin(board)) {
      return [evaluateBotPosition(board), board];
    }

    if (maximizingPlayer) {
      let value = -1;
      let bestMove;

      for (let i = 0; i < possibleMoves.length; i += 1) {
        const tmp = minmax(possibleMoves[i], depth - 1, false)[0];
        if (value < tmp) {
          value = tmp;
          bestMove = possibleMoves[i];
        }
      }

      return [value, bestMove];
    }

    let value = 3;
    let bestMove;

    for (let i = 0; i < possibleMoves.length; i += 1) {
      const tmp = minmax(possibleMoves[i], depth - 1, true)[0];

      if (value > tmp) {
        value = tmp;
        bestMove = possibleMoves[i];
      }
    }

    return [value, bestMove];
  }

  function getMove(board) {
    for (let i = 0; i < gameBoard.length; i += 1) {
      for (let j = 0; j < gameBoard[i].length; j += 1) {
        if (gameBoard[i][j] !== board[i][j]) return [i, j];
      }
    }

    return [-1, -1];
  }

  function botMarkSpot() {
    const bestBoard = minmax(gameBoard, 5, true)[1];

    const move = getMove(bestBoard);

    gameBoard[move[0]][move[1]] = 'O';

    displayBoard();

    const result = checkWin();

    if (result === 2) {
      if (isPlayerOneTurn) labelTitle.innerHTML = `${name1} wins!`;
      else labelTitle.innerHTML = `${name2} wins!`;
      endGame();
    } if (result === 1) {
      labelTitle.innerHTML = 'It\'s a tie';
      endGame();
    }

    return true;
  }

  function markSpot(evt) {
    const { x } = evt.currentTarget;
    const { y } = evt.currentTarget;

    if (gameBoard[x][y] !== '') return;

    if (isPlayerOneTurn) gameBoard[x][y] = 'X';
    else gameBoard[x][y] = 'O';

    displayBoard();

    const result = checkWin();

    if (result === 2) {
      if (isPlayerOneTurn) labelTitle.innerHTML = `${name1} wins!`;
      else labelTitle.innerHTML = `${name2} wins!`;
      endGame();
      return;
    } if (result === 1) {
      labelTitle.innerHTML = 'It\'s a tie';
      endGame();
      return;
    }

    if (isSinglePlayer) {
      botMarkSpot();
    } else {
      isPlayerOneTurn = !isPlayerOneTurn;
      if (isPlayerOneTurn) labelTitle.innerHTML = `${name1} turn`;
      else labelTitle.innerHTML = `${name2} turn`;
    }
  }

  function restart() {
    gameBoard = [['', '', ''], ['', '', ''], ['', '', '']];

    for (let i = 0; i < divGameBoard.length; i += 1) {
      divGameBoard[i].disabled = false;
    }

    isPlayerOneTurn = true;

    displayBoard();
  }

  function start() {
    name1 = document.querySelector('#name1').value;
    name2 = document.querySelector('#name2').value;
    isSinglePlayer = document.querySelector('#checkbox').checked;

    const divMenu = document.querySelector('#start-menu');
    divMenu.style.display = 'none';

    const divGame = document.querySelector('#game');
    divGame.style.display = 'flex';

    labelTitle.innerHTML = `${name1} turn`;

    restart();
  }

  function menu() {
    const divMenu = document.querySelector('#start-menu');
    divMenu.style.display = 'flex';

    const divGame = document.querySelector('#game');
    divGame.style.display = 'none';
  }

  btnStart.addEventListener('click', start);
  btnMenu.addEventListener('click', menu);
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
