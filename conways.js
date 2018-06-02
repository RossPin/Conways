var conways = {
  createBoard: createBoard,
  nextBoard: nextBoard
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
