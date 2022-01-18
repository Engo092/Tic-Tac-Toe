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

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    let p1Name = document.querySelector(".p1").value;
    if (p1Name == "") {
        p1Name = "Player 1"
    }
    let p2Name = document.querySelector(".p2").value;
    if (p2Name == "") {
        p2Name = "Player 2"
    }
    let player1 = Players(p1Name, "X");
    let player2 = Players(p2Name, "O");
    
    document.querySelector(".board").classList.remove("noDisplay");
    document.querySelector(".form").classList.add("noDisplay");
    document.querySelector("h1").classList.add("noDisplay");

    playControl.playGame(player1, player2);
})

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

    // Checks which player will make the next move
    const activePlayer = (board, player1, player2) => {
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

    // Updates board visually
    const updateBoard = (board, squares, player1, player2) => {
        let currentPlayer = activePlayer(board, player1, player2);

        let column = squares.id.charAt(0);
        let square = squares.id.charAt(2);
        if (!validatePlay(column, square, board)){
            return board;
        }
        board[column][square] = currentPlayer.side;
        squares.innerText = currentPlayer.side;
        return board;
    }

    const tieCheck = (board) => {
        let nullCount = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == null) {
                    nullCount++;
                }
            }
        }
        if (nullCount == 0) {
            return true;
        }
        return false;
    }

    const checkWin = (board) => {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] == "X" && board[i][1] == "X" && board[i][2] == "X") {
                return "X";
            }
            if (board[i][0] == "O" && board[i][1] == "O" && board[i][2] == "O") {
                return "O";
            }
            if (board[0][i] == "X" && board[1][i] == "X" && board[2][i] == "X") {
                return "X";
            }
            if (board[0][i] == "O" && board[1][i] == "O" && board[2][i] == "O") {
                return "O";
            }
        }
        if (board[0][0] == "X" && board[1][1] == "X" && board[2][2] == "X") {
            return "X";
        }
        if (board[0][0] == "O" && board[1][1] == "O" && board[2][2] == "O") {
            return "O";
        }
        if (board[0][2] == "X" && board[1][1] == "X" && board[2][0] == "X") {
            return "X"
        }
        if (board[0][2] == "O" && board[1][1] == "O" && board[2][0] == "O") {
            return "O"
        }
        
        let isTie = tieCheck(board);
        if (isTie) {
            return "Tie!";
        }
        return false;
    }

    return { displayBoard,
            updateBoard,
            checkWin,
        };
})();

const playControl = (() => {
     
    const displayWinner = (winner, player1, player2) => {
        let winDisplay = document.querySelector(".winDisplay");
        if (winner == "Tie!") {
            winDisplay.innerText = `${winner}`;
        }
        else {
            if (winner == player1.side) {
                winDisplay.innerText = `${player1.name} Wins the Game!`;
            }
            if (winner == player2.side) {
                winDisplay.innerText = `${player2.name} Wins the Game!`;
            }
        }
        let restart = document.querySelector(".restart");
        restart.classList.remove("noDisplay");
        restart.addEventListener("click", function() {
            window.location.reload();
        });
    };
    
    const playGame = (player1, player2) => {
        let currentBoard = GameBoard.gameBoard;
        displayController.displayBoard(currentBoard);
    
        let squares = document.querySelectorAll(".square");
            for (let i = 0; i < squares.length; i++) {
                    squares[i].addEventListener('click', function() {
                        if (document.querySelector(".winDisplay").innerText == "") {
                            currentBoard = displayController.updateBoard(currentBoard, squares[i], player1, player2);
                            
                            let winner = displayController.checkWin(currentBoard);
                            if (winner != false) {
                                displayWinner(winner, player1, player2);
                            }
                        }
                    });
            };
    };
    
    return { playGame };
})();