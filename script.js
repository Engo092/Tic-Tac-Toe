// Initializes game board as an array
const GameBoard = (() => {
     let gameBoard = [[null, null, null], 
                     [null, null, null],
                     [null, null, null]];     
    return {
        gameBoard
    }
})();



const Players = (name, side) => {
    return { name, side };
};



const displayController = (() => {
    const displayBoard = (gameBoard) => {
        let board = document.querySelector(".board");
        board.innerHTML = "";
        
        // Following is a private function whose purpose is to correctly label each square's classes
        const checkSquareClasses = (square, i, j) => {
            if (i == 0 && j == 1) {
                square.classList.remove("noBorder");
                square.classList.add("cornerT");
            }
            else if (i == 1) {
                if (j == 0) {
                    square.classList.remove("noBorder");
                    square.classList.add("cornerL");
                }
                if (j == 2) {
                    square.classList.remove("noBorder");
                    square.classList.add("cornerR");
                }
            }
            else if (i == 2 && j == 1) {
                square.classList.remove("noBorder");
                square.classList.add("cornerB");
            }

            return square;
        }

        // Loads board into HTML
        for (let i = 0; i < 3; i++) {
            let column = document.createElement("div");
            column.classList.add("column");
            for (let j = 0; j < 3; j++) {
                let square = document.createElement("div");
                square.classList.add("square", "noBorder");
                square = checkSquareClasses(square, i, j);
                square.id = `${i},${j}`
                if (gameBoard[i][j] != null) {
                    if (gameBoard[i][j] == "X") {
                        square.innerText = "X";
                    }
                    else if (gameBoard[i][j] == "O") {
                        square.innerText = "O";
                    }
                }
                column.appendChild(square);
            }
            board.appendChild(column);
        }
    };

    const activePlayer = (board) => {
        let count = 0;
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if (board[i][j] != null) {
                    count++;
                }
            }
        }
        if (count % 2 == 0) {
            return player1;
        }
        else {
            return player2;
        }
    }

    const validatePlay = (i, j, board) => {
        if (board[i][j] != null) {
            return false;
        }
        return true;
    }

    const updateBoard = (board, squares) => {
        let currentPlayer = activePlayer(board);

        let column = squares.id.charAt(0);
        let square = squares.id.charAt(2);
        if (!validatePlay(column, square, board)){
            return board;
        }
        board[column][square] = currentPlayer.side;
        squares.innerText = currentPlayer.side;
        return board;
    }

    return { displayBoard,
            updateBoard 
        };
})();

let currentBoard = GameBoard.gameBoard;
displayController.displayBoard(currentBoard);
let player1 = Players("Player1", "X");
let player2 = Players("Player2", "O");

let squares = document.querySelectorAll(".square");
for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', function() {
        currentBoard = displayController.updateBoard(currentBoard, squares[i]);
    })
};