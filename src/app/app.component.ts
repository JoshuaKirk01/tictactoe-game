import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'tictactoe-game';

    currentTurn = "X";

    boards = new Array(9);

    ngOnInit() {
        for(let i = 0; i < this.boards.length; i++) {
            var cells = [{"token":" "},{"token":" "},{"token":" "},
            {"token":" "},{"token":" "},{"token":" "},
            {"token":" "},{"token":" "},{"token":" "}];

            this.boards[i] = cells;
        }
    }

    onCellClick(board: any, cell: any) {
        // Check if clicked board is enabled       
        if(this.isEnabled(board)) {
            console.log(board, cell);

            for(let i = 0; i < this.boards.length; i++) {
                var checkedBoard = document.getElementById(`${i}`);
                checkedBoard?.classList.remove("disabled");
            }

            if(this.boards[board][cell].token == " ") { // Valid cell
                this.boards[board][cell].token = this.currentTurn; // Place token

                if(this.checkForBoardWin(this.boards[board])) {
                    console.log(this.currentTurn + " wins in board " + board);

                    var boardClass = (this.currentTurn == "X") ? "completedX" : "completedO"; // Set class of board based on player
                    document.getElementById(board)?.classList.add(boardClass);
                }

                if(this.checkForGameWin(this.currentTurn)) {
                    console.log(this.currentTurn + " wins!");
                }

                this.currentTurn = (this.currentTurn == "X") ? "O" : "X"; // Swap player

                for(let i = 0; i < this.boards.length; i++) {
                    var checkedBoard = document.getElementById(`${i}`);
                    if(checkedBoard?.id != cell) {
                        checkedBoard?.classList.add("disabled"); // Disable all boards except for matching one
                    }
                }
            } else {
                console.log("Cell is occupied");
            }
        } else {
            console.log("Board disabled");
        }

        // Check if destination is completed
        if(this.isCompleted(cell)) {
            for(let i = 0; i < this.boards.length; i++) {
                var checkedBoard = document.getElementById(`${i}`);
                if(!checkedBoard?.classList.contains("completed")) {
                    checkedBoard?.classList.remove("disabled"); // Enable all boards except for completed ones
                }
            }
        }
    }

    isEnabled(board: any) {
        if(document.getElementById(board)?.classList.contains("disabled")) {
            return false;
        } else {
            return true;
        }
    }

    isCompleted(board: any) {
        if(document.getElementById(board)?.classList.contains("completedX") || document.getElementById(board)?.classList.contains("completedO")) {
            return true;
        } else {
            return false;
        }
    }

    checkForBoardWin(board: any) {
        if(board[0].token === board[1].token && board[0].token === board[2].token && board[0].token !== " ") { // Top Row
            return true;
        } else if(board[3].token === board[4].token && board[3].token === board[5].token && board[3].token !== " ") { // Middle Row
            return true;
        } else if(board[6].token === board[7].token && board[6].token === board[8].token && board[6].token !== " ") { // Bottom Row
            return true;
        } else if(board[0].token === board[3].token && board[0].token === board[6].token && board[0].token !== " ") { // Left Column
            return true;
        } else if(board[1].token === board[4].token && board[1].token === board[7].token && board[1].token !== " ") { // Middle Column
            return true;
        } else if(board[2].token === board[5].token && board[2].token === board[8].token && board[2].token !== " ") { // Right Column
            return true;
        } else if(board[0].token === board[4].token && board[0].token === board[8].token && board[0].token !== " ") { // Down Right Diagonal
            return true;
        } else if(board[2].token === board[4].token && board[2].token === board[6].token && board[2].token !== " ") { // Down Left Diagonal
            return true;
        } else {
            return false;
        }
    }

    checkForGameWin(player: any) {
        var boardClass = (player === "X") ? "completedX" : "completedO";
        if(document.getElementById("0")!.classList.contains(boardClass) && document.getElementById("1")!.classList.contains(boardClass) && document.getElementById("2")!.classList.contains(boardClass)) { // Top Row
            return true;
        } else if(document.getElementById("3")!.classList.contains(boardClass) && document.getElementById("4")!.classList.contains(boardClass) && document.getElementById("5")!.classList.contains(boardClass)) { // Middle Row
            return true;
        } else if(document.getElementById("6")!.classList.contains(boardClass) && document.getElementById("7")!.classList.contains(boardClass) && document.getElementById("8")!.classList.contains(boardClass)) { // Bottom Row
            return true;
        } else if(document.getElementById("0")!.classList.contains(boardClass) && document.getElementById("3")!.classList.contains(boardClass) && document.getElementById("6")!.classList.contains(boardClass)) { // Left Column
            return true;
        } else if(document.getElementById("1")!.classList.contains(boardClass) && document.getElementById("4")!.classList.contains(boardClass) && document.getElementById("7")!.classList.contains(boardClass)) { // Middle Column
            return true;
        } else if(document.getElementById("2")!.classList.contains(boardClass) && document.getElementById("5")!.classList.contains(boardClass) && document.getElementById("8")!.classList.contains(boardClass)) { // Right Column
            return true;
        } else if(document.getElementById("0")!.classList.contains(boardClass) && document.getElementById("4")!.classList.contains(boardClass) && document.getElementById("8")!.classList.contains(boardClass)) { // Down Right Diagonal
            return true;
        } else if(document.getElementById("2")!.classList.contains(boardClass) && document.getElementById("4")!.classList.contains(boardClass) && document.getElementById("6")!.classList.contains(boardClass)) { // Down Left Diagonal
            return true;
        } else {
            return false;
        }
    }
}