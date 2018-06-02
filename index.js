document.addEventListener('DOMContentLoaded', start)

const size = 200
const refreshInterval = 100

let board = createBoard(size)
for (let i=0; i<size; i++){
  for (let j=0; j<size; j++){
    board[i][j] = Math.round(Math.random())
  }
}

function start() {
  let boardHTML = document.getElementById('board')
  let boardSize = boardHTML.offsetWidth
  let cellsize = Number(boardSize)/size+'px'
  // for (let i=0; i < size; i++){
  //   boardHTML.innerHTML += '<div id="row'+i+'" style="height: '+cellsize+';"></div>'
  //   let rowHTML = document.getElementById('row'+i)
  //   //rowHTML.style.height = cellsize
  //   for (let j=0; j < size; j++){
  //     rowHTML.innerHTML += '<span id="row'+i+'col'+j+'" class="cell" style="height: '+cellsize+'; width: '+cellsize+'"></span>'
  //     // let cell = document.getElementById('row'+i+'col'+j)
  //     // cell.style.height = cellsize
  //     // cell.style.width = cellsize
  //   }
  // }
  for (let i=0; i < size; i++){    
    let row = '<div id="row'+i+'" style="height: '+cellsize+';">'   
    for (let j=0; j < size; j++){
      row += '<span id="row'+i+'col'+j+'" class="cell" style="height: '+cellsize+'; width: '+cellsize+'"></span>'      
    }
    boardHTML.innerHTML += row+'</div>'
  }

  setInterval(() => {
    displayBoard(board)
    board = nextBoard(board)
  }, refreshInterval)
}

function displayBoard () {
  for (let i=0; i<size; i++){
      for (let j=0; j<size; j++){
        let cell = document.getElementById('row'+i+'col'+j)
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
    let board = []
    for (let i=0; i < size; i++){
        let row = []
        for (let j=0; j < size; j++) {
            row.push(0)
        }
        board.push(row)
    }
    return board
}

function nextBoard (currentBoard) {
    let newBoard = createBoard(currentBoard.length)
    for (let i = 0; i < newBoard.length; i++) {
        for (let j = 0; j < newBoard.length; j++) {
            let row = i
            let column = j
            let aliveNeighbors = countAliveNeighbours(row, column, currentBoard)
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
    let neighbours = getNeighbours(cellRow, cellColumn, board)
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
    let neighbours = []
    for (let i=-1; i <= 1; i++){
        for (let j=-1; j <= 1; j++){
            if (!(i === 0 && j === 0)) { //dont check own position
            let neighbourRow = cellRow + i
            let neighbourCol = cellColumn + j
            if (!indicesAreOutOfBounds(neighbourRow, neighbourCol, board)) {
                neighbours.push(board[neighbourRow][neighbourCol])
            }
            }
        }
    }
    return neighbours
}
