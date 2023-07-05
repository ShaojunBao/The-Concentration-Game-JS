document.addEventListener("DOMContentLoaded", () => {
// constants:
const cardsValue = [
    'imags/bacon.png',
    'imags/bread.png',
    'imags/egg.png',
    'imags/hamburger.png',
    'imags/noodles.png',
    'imags/pizza.png',
    'imags/ramen.png',
    'imags/rice.png',
]

// app's state (variables)
let cards = [];
let flippedCards = [];
let matchedCards = [];

// cached element references:
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

// event listeners:
startBtn.addEventListener('click',startGame);
resetBtn.addEventListener('click',stopGame);


//Initialize the game



// Function to create the game board
function createBoard(){
    const deck = document.querySelector('.deck');

    //Generate the card deck 
    for(let i=0; i<cardsValue.length; i++){
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = 'images/face.png';
        img.alt = 'Deafult image';

        card.appendChild(img);
        deck.appendChild(card);
        cards.push(card);
    }
}

// Function to shuffle the card values


//Function to start the game

function startGame(){
// Reset the game 
    flippedCards = [];
    matchedCards = [];

    createBoard();
}

//Function to stop the game
function stopGame(){
    flippedCards = [];
    matchedCards = [];

    createBoard();
}
});