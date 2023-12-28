
var numSelected = null;
var tileSelected = null;
var errors = 0;

var isValid = function(board, x, y, c){
    let rowStart = Math.floor(x/3) * 3;
    let colStart = Math.floor(y/3) * 3;
    
    for(let i=0; i<9; i++){
        if(board[i][y] === c || board[x][i] === c) return false;
    }
    
    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            if(board[rowStart+i][colStart+j] === c) return false;
        }
    }
    
    return true;
}

var solve = function(board, row, col){
    
    for(let i=row; i<9; i++, col=0){
        for(let j=col; j<9; j++){
            if(board[i][j] !== '-') continue;
            for(let c=1; c<=9; c++){
                if(isValid(board, i, j, c.toString())){
                    board[i][j] = c.toString();
                    
                    if(solve(board, i, j+1)){
                        return true;
                    }
                    board[i][j] = '-';
                }
            }
            return false;
        }
    }
    return true;
}

var solveSudoku = function(board) {
    solve(board, 0, 0);
};

var board =    [["5","3","-","-","7","-","-","-","-"],
                ["6","-","-","1","9","5","-","-","-"],
                ["-","9","8","-","-","-","-","6","-"],
                ["8","-","-","-","6","-","-","-","3"],
                ["4","-","-","8","-","3","-","-","1"],
                ["7","-","-","-","2","-","-","-","6"],
                ["-","6","-","-","-","-","2","8","-"],
                ["-","-","-","4","1","9","-","-","5"],
                ["-","-","-","-","8","-","-","7","9"]]

var solution = [["5","3","-","-","7","-","-","-","-"],
                ["6","-","-","1","9","5","-","-","-"],
                ["-","9","8","-","-","-","-","6","-"],
                ["8","-","-","-","6","-","-","-","3"],
                ["4","-","-","8","-","3","-","-","1"],
                ["7","-","-","-","2","-","-","-","6"],
                ["-","6","-","-","-","-","2","8","-"],
                ["-","-","-","4","1","9","-","-","5"],
                ["-","-","-","-","8","-","-","7","9"]]

solveSudoku(solution);

// var board = [
//     "--74916-5",
//     "2---6-3-9",
//     "-----7-1-",
//     "-586----4",
//     "--3----9-",
//     "--62--187",
//     "9-4-7---2",
//     "67-83----",
//     "81--45---"
// ]

// var solution = [
//     "387491625",
//     "241568379",
//     "569327418",
//     "758619234",
//     "123784596",
//     "496253187",
//     "934176852",
//     "675832941",
//     "812945763"
// ]


function checkGameComplete() {
    console.log("ck");
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] === "-") {
                return false;
            }
        }
    }
    return true;
}


window.onload = function() {
    setGame();
}

function setGame() {
    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        //<div id="1" class="number">1</div>
        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber(){
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }

        // "0-0" "0-1" .. "3-1"
        let coords = this.id.split("-"); //["0", "0"]
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
            board[r][c] = numSelected.id;
        }
        else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
    if (checkGameComplete()) {
        alert("Game Complete! Errors: " + errors);
        window.location.reload();
    }
}
