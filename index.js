let currentGame = false
let board = [...Array(3)].map(e => Array(3).fill(".")) 
let turn = "undefined"

$("#boardContainer").on("click", (event) => {
    if(currentGame == false) return alert("You need to start the game first!")
    if(event.target.className != "boardElement" || event.target.innerText.length != 0) return

    const selectedSquare = [event.target.id.match(/^\d/)[0], event.target.id.match(/\d$/)[0]]
    console.log(board)

    if(turn == "blue"){
        event.target.innerText = "X"
        board[selectedSquare[0]][selectedSquare[1]] = "X"
    } else if(turn == "red"){
        event.target.innerText = "O"
        board[selectedSquare[0]][selectedSquare[1]] = "O"
    }
    
    updateTurn(turn)
})

function updateTurn(prev="nil"){
    switch(prev){
        case "nil":
            Math.random() > 0.5 ? updateTurn("blue") : updateTurn("red")
        break;
        case "blue":
            turn = "red"
            $("#turn").text("Red")
            $("#turn").css("color", "red")
        break;
        case "red":
            turn = "blue"
            $("#turn").text("Blue")
            $("#turn").css("color", "blue")
        break;
    }
}

$("#startGame").on("click", () =>{
    if(currentGame == false){
        board = [...Array(3)].map(e => Array(3).fill("."))

        updateTurn()
        $("#startGame").text("End Game")
        currentGame = true
    } else{
        $("#startGame").text("Start Game")
        currentGame = false
        turn = "undefined"
    }
})