// Variables
const gridCells = document.querySelectorAll('.grid-cell');
const gameGrid = document.getElementById('game-grid');
/**@type {HTMLElement} */
const playerTurn = document.getElementById('player-icon');
const winnerIcon = document.getElementById('winner-icon');
const winnerImage = document.getElementById('winner-image');


let oScore = document.getElementById('o-score');
let xScore = document.getElementById('x-score');
let catScore = document.getElementById('cat-score');
let modal = document.querySelector(".modal");
let trigger = document.querySelector(".trigger");
let closeButton = document.querySelector(".close-button");


let turn = 'o';
let foundWinner = false;
let catWins = false;
let winner = '';

// Possible win scenario indexes:
    // Horizontal
    // 0,1,2
    // 3,4,5
    // 6,7,8
    // Vertical
    // 0,3,6
    // 1,4,7
    // 2,5,8
    //Diagonal
    // 0,4,8
    // 2,4,6
let winningCombinations = new Array();
winningCombinations.push([0, 1, 2])
winningCombinations.push([3, 4, 5])
winningCombinations.push([6, 7, 8])
winningCombinations.push([0, 3, 6])
winningCombinations.push([1, 4, 7])
winningCombinations.push([2, 5, 8])
winningCombinations.push([0, 4, 8])
winningCombinations.push([2, 4, 6])


// console.log(gridCells);

//Add event listeners to each cell in the game grid

// gridCells.forEach(function(cell){
//     cell.addEventListener('click', markCell);
// });
gameGrid.addEventListener('click', markCell);


closeButton.addEventListener("click", resetGame);

/**
 * 
 * @param {Event} e 
 */
function markCell(e){

    /** @type{HTMLElement} */
    let cell = e.target;

    if(cell.getAttribute('marked') === null && cell.classList.contains('grid-cell')){

        if(turn === 'o'){
    
            cell.classList.add('pumpkin');
            cell.setAttribute('marked', 'o'); 
            playerTurn.className = 'skull_xbones';
            turn = 'x';
            checkForWin();
    
        }else{
            cell.classList.add('skull_xbones');
            playerTurn.className = 'pumpkin';
            cell.setAttribute('marked', 'x'); 
            turn = 'o';
            checkForWin();
        }

    }

}

function checkForWin(){ 

    winningCombinations.forEach(function(winningCombo){

        // console.log(`Checking ${winningCombo[0]}, ${winningCombo[1]}, ${winningCombo[2]}`);

        if (gridCells[winningCombo[0]].getAttribute('marked') != null && gridCells[winningCombo[1]].getAttribute('marked') != null && gridCells[winningCombo[2]].getAttribute('marked') != null) {

            console.log(winningCombo);
            console.log(gridCells[winningCombo[0]].getAttribute('marked'));
            console.log(gridCells[winningCombo[1]].getAttribute('marked'));
            console.log(gridCells[winningCombo[2]].getAttribute('marked'));

            if (gridCells[winningCombo[0]].getAttribute('marked') === gridCells[winningCombo[1]].getAttribute('marked') && gridCells[winningCombo[1]].getAttribute('marked') === gridCells[winningCombo[2]].getAttribute('marked')){
                
                foundWinner = true;
                winner = gridCells[winningCombo[0]].getAttribute('marked');
                
                if(winner === 'x'){
                    score = parseInt(xScore.textContent);
                    score++;
                    xScore.textContent = score;
                    winnerImage.classList.add('skull_xbones');
                    
                }else{
                    score = parseInt(oScore.textContent);
                    score++;
                    oScore.textContent = score;
                    winnerImage.classList.add('pumpkin');
                    
                }

                toggleModal();
                
            };

        }

        
    });

    if(!foundWinner){

        checkForCat();
    }
    
    
}

function checkForCat(){

    let markedCellCount = 0;

    if (!catWins) {
        // Check if all cells are marked and there is no winner
        gridCells.forEach(function (cell) {
            if (cell.getAttribute('marked') != null) {
                markedCellCount++;
            }
        });

        console.log(`Marked Cell Count ${markedCellCount}`);

        if (markedCellCount === 9) {
            // Cat wins
            console.log("Cat Wins!");
            catWins = true;
            let score = catScore.textContent;
            score++;
            catScore.textContent = score;
            winnerImage.classList.add('cat');
            toggleModal();

        }
    }

}

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function resetGame(){
    
    toggleModal();

    gridCells.forEach(function(cell){

        cell.removeAttribute('marked');
        cell.classList.remove('pumpkin', 'skull_xbones');
        winnerImage.classList.remove('cat', 'pumpkin', 'skull_xbones');
        foundWinner = false;
        catWins = false;
        winner = '';
    });

}