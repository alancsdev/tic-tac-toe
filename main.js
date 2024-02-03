const playerScreen = document.getElementById('player');

const showWinner = document.querySelector('.winner h2');

const buttonReset = document.querySelector('.reset');

const board = [null, null, null, null, null, null, null, null, null];

const winningCombinations = [
  //hotizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //diagonal
  [0, 4, 8],
  [2, 4, 6],
];

const boardEl = document.getElementById('board-game');

let player = 'X';
let hasAWinner = false;
let plays = 0;

const spanEl = Array.from(document.querySelectorAll('span'));
const spanElDraw = document.querySelectorAll('span');

render = () => {
  spanEl.map((el, index) => {
    el.addEventListener('click', () => {
      clickedPosition(index);
    });
  });
};

clickedPosition = (index) => {
  //console.log('Position: ' + index);
  if (!hasAWinner && board[index] === null && plays <= 8) {
    if (player === 'X') {
      board[index] = 'X';
      spanEl[index].textContent = '❌';
      playerScreen.textContent = '⭕️';
      player = 'O';
      checkWinner();
      plays += 1;
      if (plays > 8) {
        showWinner.textContent = 'Draw!';
      }
    } else {
      board[index] = 'O';
      spanEl[index].textContent = '⭕️';
      playerScreen.textContent = '❌';
      player = 'X';
      checkWinner();
      plays += 1;
      if (plays > 8) {
        showWinner.textContent = 'Draw!';
      }
    }
  } else {
    return;
  }
};

let combinations;

checkWinner = () => {
  for (combinations of winningCombinations) {
    if (
      board[combinations[0]] === 'X' &&
      board[combinations[1]] === 'X' &&
      board[combinations[2]] === 'X'
    ) {
      drawLine();
      hasAWinner = true;
      showWinner.textContent = 'Winner: ❌';
      //console.log(combinations);
    } else if (
      board[combinations[0]] === 'O' &&
      board[combinations[1]] === 'O' &&
      board[combinations[2]] === 'O'
    ) {
      hasAWinner = true;
      showWinner.textContent = 'Winner: ⭕️';
      drawLine();
    }
  }
  console.log(board);
};

buttonReset.addEventListener('click', () => {
  showWinner.textContent = '';

  for (let i = 0; i < board.length; i++) {
    board[i] = null;
    spanEl[i].textContent = '';
    spanEl[i].classList = '';
  }
  playerScreen.textContent = '❌';
  plays = 0;
  player = 'X';
  hasAWinner = false;
  console.log(board);
});

drawLine = () => {
  function isArrayEqual(array1, array2) {
    return (
      array1.length === array2.length &&
      array1.every((element, index) => element === array2[index])
    );
  }
  let index = -1;
  console.log(combinations);
  for (let i = 0; i < winningCombinations.length; i++) {
    if (isArrayEqual(combinations, winningCombinations[i])) {
      index = i;
      break;
    }
  }

  if (index < 3) {
    for (let i = 0; i < 3; i++) {
      spanEl[combinations[i]].classList.add('horizontal');
    }
  } else if (index < 6) {
    for (let i = 0; i < 3; i++) {
      spanEl[combinations[i]].classList.add('vertical');
    }
  } else if (index < 7) {
    for (let i = 0; i < 3; i++) {
      spanEl[combinations[i]].classList.add('diagonal1');
    }
  } else if (index < 8) {
    for (let i = 0; i < 3; i++) {
      spanEl[combinations[i]].classList.add('diagonal2');
    }
  }

  console.log(index);
};

render();
