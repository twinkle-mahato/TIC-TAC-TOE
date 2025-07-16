const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
// creating a variable named gameGrid that is meant to hold the game’s playing area — like a grid, board, or matrix.
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// create a function to initialise the game
function initGame() {
    currentPlayer = "X";  //Sets the starting player to "X"
    gameGrid = ["","","","","","","","",""];  //Initializes an empty 3x3 grid represented as an array of 9 empty strings
//UI pr empty bhi karna padega boxes ko
// Loops through all 9 boxes in the Tic-Tac-Toe board
    boxes.forEach((box, index) => {
        box.innerText = ""; //Clears the displayed text (removes "X" or "O") from each box.
        boxes[index].style.pointerEvents = "all";  //Re-enables clicking on the box (in case it was disabled after a win/tie).
// Resets the class list of each box, Removes any previous classes like win or highlight Restores base styling-.box box1, .box box2, ..., .box box9,initialise box with css properties again

        box.classList = `box box${index+1}`;
    });
// Hides the "New Game" button, assuming it's shown only after a game ends.
    newGameBtn.classList.remove("active");
// A template literal that inserts the value of currentPlayer dynamically.
// (.innerText:) property that sets or gets the visible text inside that element
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();  // function Call

 function swapTurn(){
// Checks who's the current player, If it’s "X", change to "O". If it’s "O", change to "X".   

    if(currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
// UI Update - shows the updated current player in the gameInfo element.
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

 }


function checkGameOver(){

// This creates a variable answer to store the winner — "X" or "O". Initially, it's empty because no one has won yet.
     let answer="";
// looping over all the winning combinations (like [0,1,2], [3,4,5], etc.) using forEach. Each position is an array of 3 indexes (box numbers on the board).
    winningPositions.forEach((position) => {
//This checks if all 3 boxes in the current winning position, if 3 boxes Are not empty And have the same symbol ("X" or "O") Only then it's a win.
         if( (gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "") 
             && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {
// check if winner is X if X is found is 0 position means 1 and 2 also X then winner also same as "o"
                if(gameGrid[position[0]] === "X") 
                    answer = "X";
                else {
                    answer = "O";
                } 

// disable pointer events for each box on the grid when winner is found 
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

// now we know X/O is a winner than add class win and then it show green background color
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

// it means we have a winner
// This checks if a winner has been found means answer is not empty
    if(answer !== "" ) {
 // innerText sets the visible text content in the HTML element with class .game-info which is show as a UI  
        gameInfo.innerText = `Winner Player - ${answer}`;
// "active" class to the "New Game" button so it becomes visible (unhides it).
        newGameBtn.classList.add("active");
        return;
    }

    //We know, NO Winner Found, let's check whether there is tie

    let fillCount = 0; // This initializes a counter to keep track of how many boxes are filled (not empty).

// Loops through each box in your game grid (an array of 9 strings).Each box contains either "X", "O", or an empty string "".
    gameGrid.forEach((box) => {
//If the box is not empty (it contains "X" or "O"), increase fillCount by 1.At the end of the loop- fillCount will be 9 if all boxes are filled Less than 9 if the game is still ongoing.
        if(box !== "" )
            fillCount++;
    });

// If all 9 boxes are filled and no one has won, it's a tie.
    if(fillCount === 9) {
// Updates the UI to show "Game Tied !" to the user
        gameInfo.innerText = "Game Tied !";
// Shows the "New Game" button so the player can restart the game
        newGameBtn.classList.add("active");
                    
             }
}
     



// This function runs when a player clicks a box on the board.The index is the position of the box (from 0 to 8).
function handleClick(index){

//"Is the box empty? If it's empty, the player is allowed to mark it. If not (already "X" or "O"), nothing happens (prevents overwriting a move).
    if(gameGrid[index]===""){

//boxes is a NodeList of all 9 box elements (the 3×3 grid). boxes[index] gets the specific box that was clicked, .innerText sets the text content of that box (what the user sees). currentPlayer is either "X" or "O" — the player making the move.So this line displays the player's symbol (X or O) in the box they clicked.
     boxes[index].innerText=currentPlayer;  
     gameGrid[index]=currentPlayer;        //  Updates the internal game state array (gameGrid)
//A player clicks on a box. if You mark it with "X" or "O".Then that box can't clickable thats why we write pointer events:none
       boxes[index].style.pointerEvents = "none";
//This switches the current player between "X" and "O" after each valid move.
        swapTurn();
// // If a winner is found, end the game
        checkGameOver(); 
    }
}

// adds a click event listener to each box
boxes.forEach((box, index) => {
    // Adds a function that runs when a box is clicked.
    box.addEventListener("click", () => {
    // When a box is clicked, it calls the handleClick() function and passes its index.
        handleClick(index);
    })
});


// When the New Game button is clicked,The function initGame() is called,Which resets the game board, player, and UI.
newGameBtn.addEventListener("click", initGame);