$('document').ready(init)

let size = 100
let refreshInterval = 100
let boardSize = 800
let running = false

let board = [] 

function init() {
  board = conways.createBoard(size)
  populateBoard()
  buildBoardHTML() 
  $('#startButton').off()
  $('#startButton').on('click', start) 
  $('#startButton').text('Start')
}

function start(){
  $('#startButton').text('Clear')
  $('#startButton').off()
  $('#startButton').on('click', clearBoard) 
  running = true;
  sequence = setInterval(() => {
    displayBoard(board)
    board = conways.nextBoard(board)
  }, refreshInterval)
}

function displayBoard () {
  for (let i=0; i<size; i++){
      for (let j=0; j<size; j++){
        let cell = $('#row'+i+'col'+j)
        if (board[i][j] == 1) {
          cell.addClass('alive')
        }
        else {
          cell.removeClass('alive')
        }
      }
    }
}

function buildBoardHTML() {
  let boardHTML = $('#board')
  boardHTML.html('')
  boardHTML.css('width',boardSize+'px')  
  let cellsize = boardSize/size+'px'
  for (let i=0; i < size; i++){        
    let row = '<div id="row'+i+'" class="row">'  
    for (let j=0; j < size; j++){      
      row += '<span id="row'+i+'col'+j+'" class="cell""></span>'      
    }
    boardHTML.append(row+'</div>')
  }
  $('.row').css('height', cellsize)
  $('.cell').css('height', cellsize)
  $('.cell').css('width', cellsize)
}

function populateBoard() {
  for (let i=0; i<size; i++){
    for (let j=0; j<size; j++){
      board[i][j] = Math.round(Math.random())
    }
  }
}

function changeGridSize() {
  size = $('#gridSize').val()
  if (running) clearInterval(sequence)
  running = false;
  init()
  }

function changeBoardSize() {
  boardSize = $('#boardSize').val()
  if (running) clearInterval(sequence)
  running = false;
  init()  
}

function changeRefresh() {
  refreshInterval = $('#refresh').val() 
  if (running) { clearInterval(sequence)  
  start()
  }
}

function clearBoard() {
  if (running) clearInterval(sequence)
  running = false;
  board = conways.createBoard(size)
  populateBoard()
  $('.cell').removeClass('alive')
  $('#startButton').off()
  $('#startButton').text('Start')
  $('#startButton').on('click', start)  
}
