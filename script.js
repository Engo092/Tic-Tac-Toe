const GameBoard = (() => {
     let gameBoard = [[null, null, null], 
                     [null, null, null],
                     [null, null, null]];     
    return { gameBoard }
})();


const Players = (name, side, truePlayer) => {
    return { name, side, truePlayer };
};


document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".side").classList.add("noDisplay");
    document.getElementById("human").checked = true;
});


document.getElementById("human").addEventListener("change", function() {
    document.querySelector(".side").classList.add("noDisplay");
});

document.getElementById("computer").addEventListener("change", function() {
    document.querySelector(".side").classList.remove("noDisplay");
});


document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();

    let players = playControl.startGame();
    
    document.querySelector(".board").classList.remove("noDisplay");
    document.querySelector(".form").classList.add("noDisplay");
    document.querySelector("h1").classList.add("noDisplay");
    
    let currentBoard = GameBoard.gameBoard;
    displayControl.displayBoard(currentBoard);
    playControl.playGame(currentBoard, players.player1, players.player2);
})



const displayControl = (() => {

    const displayBoard = (gameBoard) => {
        let board = document.querySelector(".board");
        board.innerHTML = "";
        
        // Following is a private function whose purpose is to correctly label each square's classes
        const checkSquareClasses = (square, i, j) => {
            if (i == 0 && j == 1) {
                square.classList.remove("noBorder");
                square.classList.add("cornerT");
            } else if (i == 1) {
                if (j == 0) {
                    square.classList.remove("noBorder");
                    square.classList.add("cornerL");
                }
                if (j == 2) {
                    square.classList.remove("noBorder");
                    square.classList.add("cornerR");
                }
            } else if (i == 2 && j == 1) {
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
                    } else if (gameBoard[i][j] == "O") {
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
        } else {
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
            activePlayer
        };
})();



const playControl = (() => {

    const startGame = () => {
        let p1Name = document.querySelector(".p1").value;
        if (p1Name == "") {
            p1Name = "Player 1"
        }
        let p2Name = document.querySelector(".p2").value;
        if (p2Name == "") {
            p2Name = "Player 2"
        }
    
        let player1;
        let player2;
        if (document.getElementById("computer").checked) {
            if (document.getElementById("xSide").checked) {
                player1 = Players(p1Name, "X", "human");
                player2 = Players(p2Name, "O", "computer");
            } else {
                player1 = Players(p1Name, "X", "computer");
                player2 = Players(p2Name, "O", "human");
            }
        } else {
            player1 = Players(p1Name, "X", "human");
            player2 = Players(p2Name, "O", "human");
        }
        return {player1 : player1, player2 : player2}
    }
     
    const displayWinner = (winner, player1, player2) => {
        let winDisplay = document.querySelector(".winDisplay");
        if (winner == "Tie!") {
            winDisplay.innerText = `${winner}`;
        } else {
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

    // Updates board and possible winner after a play
    const playerPlay = (board, square, player1, player2) => {
        let currentBoard = displayControl.updateBoard(board, square, player1, player2);
        let winner = displayControl.checkWin(currentBoard);
        if (winner != false) {
            displayWinner(winner, player1, player2);
        }
    };
    
    // Main playing dynamics
    const playGame = (currentBoard, player1, player2) => {
        let activePlayer = displayControl.activePlayer(currentBoard, player1, player2);
        
        if (activePlayer.truePlayer != "computer") {
            let squares = document.querySelectorAll(".square");
            for (let i = 0; i < squares.length; i++) {
                squares[i].addEventListener('click', function() {
                    if (document.querySelector(".winDisplay").innerText == "") {
                        playerPlay(currentBoard, squares[i], player1, player2);
                        playGame(currentBoard, player1, player2);
                    }
                });
            }
        } else {
            if (document.querySelector(".winDisplay").innerText == "") {
                let copy = copyBoard(currentBoard);
                let play = aiPlay.minimax(copy, activePlayer);
                playerPlay(currentBoard, play, player1, player2);
                playGame(currentBoard, player1, player2);
            }
        }
    };

    const copyBoard = (currentBoard) => {
        let copy = [];
        for (let i = 0; i < currentBoard.length; i++) { 
            copy[i] = currentBoard[i].slice();
        }
        return copy;
    }
    
    return { playGame, startGame };
})();



const aiPlay = (() => {

    // Returns all possible plays
    const playCheck = (board) => {
        let plays = []
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == null) {
                    plays.push([[i],[j]]);
                }
            }
        }
        return plays;
    }

    // Returns result of playing a certain square on the board
    const playResult = (board, column, square, side) => {
        let copy = []
        for (let i = 0; i < board.length; i++) {
            copy[i] = board[i].slice();
        }
        copy[column][square] = side;
        return copy;
    }

    // Checks for winner
    const boardWin = (board) => {
        let winner = displayControl.checkWin(board);
        if (winner) {
            if (winner == "X") {
                return 3;
            }
            if (winner == "O") {
                return 1;
            } else {
                return 2;
            }
        }
        return false;
    }
    
    // Tries to maximize plays as much as possible
    const maxPlay = (board) => {
        if (boardWin(board)) {
            return boardWin(board);
        }
        let max = -9999;
        let plays = playCheck(board);
        for (let i = 0; i < plays.length; i++) {
            let result = minPlay(playResult(board, plays[i][0], plays[i][1], "X"));
            if (result > max) {
                max = result;
            }
            if (max == 3) {
                return max;
            }
        }
        return max;
    }

    // Tries to minimize plays as much as possible
    const minPlay = (board) => {
        if (boardWin(board)) {
            return boardWin(board);
        }
        let min = 9999;
        let plays = playCheck(board);
        for (let i = 0; i < plays.length; i++) {
            let result = maxPlay(playResult(board, plays[i][0], plays[i][1], "O"));
            if (result < min) {
                min = result;
            }
            if (min == 1) {
                return min;
            }
        }
        return min;
    }

    const minimax = (board, aiPlayer) => {
        let choice = [];
        let plays = playCheck(board);

        if (aiPlayer.side == "X") {
            let max = maxPlay(board, "X");
            for (let i = 0; i < plays.length; i++) {
                let result = minPlay(playResult(board, plays[i][0], plays[i][1], "X"));
                if (result == max) {
                    choice = plays[i];
                    let squares = document.querySelectorAll(".square");
                    for (let i = 0; i < squares.length; i++) {
                        let column = squares[i].id.charAt(0);
                        let square = squares[i].id.charAt(2);

                        if (column == choice[0] && square == choice[1]) {
                            return squares[i];
                        }
                    }
                }
            }
        } else {
            let min = minPlay(board, "O");
            for (let i = 0; i < plays.length; i++) {
                let result = maxPlay(playResult(board, plays[i][0], plays[i][1], "O"));
                if (result == min) {
                    choice = plays[i];
                    let squares = document.querySelectorAll(".square");
                    for (let i = 0; i < squares.length; i++) {
                        let column = squares[i].id.charAt(0);
                        let square = squares[i].id.charAt(2);

                        if (column == choice[0] && square == choice[1]) {
                            return squares[i];
                        }
                    }
                }
            }
        }
    };

    return { minimax }
})();