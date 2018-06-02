document.addEventListener('DOMContentLoaded', start)

// const createBoard = require('./createBoard')
// const nextBoard = require('./nextBoard')
// const displayBoard = require('./displayBoard')

const size = 100
const refreshInterval = 200

let board = createBoard(size)

for (var i=0; i<size; i++){
  for (var j=0; j<size; j++){
    board[i][j] = Math.round(Math.random())
  }
}
//


function start() {
  var boardHTML = document.getElementById('board')
  for (var i=0; i < size; i++){
    boardHTML.innerHTML += '<div id="row'+i+'" class="row"></div>'
    var rowHTML = document.getElementById('row'+i)
    for (var j=0; j < size; j++){
      rowHTML.innerHTML += '<span id="row'+i+'col'+j+'" class="cell"></span>'
    }
  }
  setInterval(() => {
    displayBoard(board)
    board = nextBoard(board)
  }, refreshInterval)
}

function displayBoard () {
  for (var i=0; i<size; i++){
      for (var j=0; j<size; j++){
        var cell = document.getElementById('row'+i+'col'+j)
        if (board[i][j] == 1) {
          cell.classList.add('alive')
        }
        else {
          cell.classList.remove('alive')
        }
      }
    }
}

function createBoard (size) {
    var board = []
    for (var i=0; i < size; i++){
        var row = []
        for (var j=0; j < size; j++) {
            row.push(0)
        }
        board.push(row)
    }
    return board
}

function nextBoard (currentBoard) {
    var newBoard = createBoard(currentBoard.length)
    for (var i = 0; i < newBoard.length; i++) {
        for (var j = 0; j < newBoard.length; j++) {
            var row = i
            var column = j
            var aliveNeighbors = countAliveNeighbours(row, column, currentBoard)
            newBoard[row][column] = nextCellState(currentBoard[row][column], aliveNeighbors)
        }
    }
    return newBoard
}

function nextCellState (cellState, neighbourCount) {
    if (cellState) {
        return !isOverPopulated(neighbourCount) && !isUnderPopulated(neighbourCount)
    }return isRessurectable(neighbourCount)
}

function countAliveNeighbours (cellRow, cellColumn, board) {
    var neighbours = getNeighbours(cellRow, cellColumn, board)
    return neighbours.reduce((count, val) => count + val, 0)
}

function isOutOfBounds (index, array) {
    return (index < 0 || index > array.length-1)
}

function indicesAreOutOfBounds (rowIndex, columnIndex, array) {
    return (isOutOfBounds(rowIndex, array) || isOutOfBounds(columnIndex, array))
}

function isOverPopulated (neighbourCount) {
    return neighbourCount > 3
}

function isRessurectable (neighbourCount) {
    return neighbourCount == 3
}

function isUnderPopulated (neighbourCount) {
    return neighbourCount < 2
}

function getNeighbours (cellRow, cellColumn, board) {
    var neighbours = []
    for (var i=-1; i <= 1; i++){
        for (var j=-1; j <= 1; j++){
            if (!(i === 0 && j === 0)) { //dont check own position
            var neighbourRow = cellRow + i
            var neighbourCol = cellColumn + j
            if (!indicesAreOutOfBounds(neighbourRow, neighbourCol, board)) {
                neighbours.push(board[neighbourRow][neighbourCol])
            }
            }
        }
    }
    return neighbours
}
