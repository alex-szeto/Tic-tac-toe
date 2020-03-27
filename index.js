let currentGame = false
let board = [...Array(3)].map(e => Array(3).fill(".")) 
let turn = "undefined"

$("#boardContainer").on("click", (event) => {
    if(currentGame == false) return alert("You need to start the game first!")
    if(event.target.className != "boardElement" || event.target.innerText.length != 0) return

    const selectedSquare = [event.target.id.match(/^\d/)[0], event.target.id.match(/\d$/)[0]]

    if(turn == "blue"){
        event.target.innerText = "X"
        event.target.style.color = "blue"
        board[selectedSquare[0]][selectedSquare[1]] = "X"
    } else if(turn == "red"){
        event.target.innerText = "O"
        event.target.style.color = "red"
        board[selectedSquare[0]][selectedSquare[1]] = "O"
    }
    
    if(validateBoard(selectedSquare)){
        alert(`Game over! ${turn.charAt(0).toLocaleUpperCase() + turn.slice(1,turn.length)} has won!`)
        currentGame = false
        $("#turn").text("Undefined")
        $("#turn").css("color", "")
        return
    } else {
        updateTurn(turn)
    }
})

function validateBoard(curr){
    let move
    turn === "blue" ? move = "X" : move = "O"

    let [horizontal, vertical] = [true, true]
    let diag = (move == board[0][0] && move==board[1][1] && move == board[2][2]) || (move == board[0][2] && move == board[1][1] && move == board[2][0])

    for(let i = 0; board.length > i; i++){
        if(board[i][curr[1]] != move) vertical = false
        if(board[curr[0]][i] != move) horizontal = false
    }

    return horizontal || vertical || diag

}

function updateTurn(prev="nil"){
    switch(prev){
        case "nil":
            Math.random() > 0.5 ? updateTurn("blue") : updateTurn("red")
        break;
        case "blue":
            turn = "red"
            $("#turn").text("Red (O)")
            $("#turn").css("color", "red")
        break;
        case "red":
            turn = "blue"
            $("#turn").text("Blue (X)")
            $("#turn").css("color", "blue")
        break;
    }
}

$("#startGame").on("click", () =>{
    if(currentGame == false){
        board = [...Array(3)].map(e => Array(3).fill("."))

        for(let i = 0; board.length > i; i++){
            for(let j = 0; board[i].length > j ; j++){ 
                $("#"+i+"_"+j).text("")
            }
        }

        updateTurn()
        $("#startGame").text("End Game")
        currentGame = true
    } else{
        $("#startGame").text("Start Game")
        currentGame = false
        turn = "undefined"
        $("#turn").text("Undefined")
        $("#turn").css("color", "")
    }
})