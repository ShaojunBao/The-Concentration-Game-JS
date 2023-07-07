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
let gameStarted = false;
let time = 0;
let moveCount = 0;
let timerId = null;


// cached element references:
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const timeDisplay = document.getElementById('timer');
const moveCountDisplay = document.getElementById('move-counter');

// event listeners:
startBtn.addEventListener('click',startGame);
stopBtn.addEventListener('click',stopGame);

//Initialize the game
startGame();

// Function to create the game board
function createBoard(cardsValueShuffled){
    const deck = document.querySelector('.deck');

    // reset the current cards to prevent duplicate images
    cards = [];
    deck.innerHTML = '';

    //Generate the card deck 
    for(let i=0; i<cardsValueShuffled.length; i++){
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = cardsValueShuffled[i];

        const img = document.createElement('img');
        img.src = 'imags/face.png';
        img.alt = 'Default image';

        card.appendChild(img);
        deck.appendChild(card);
        cards.push(card);
    }
}

// Function to shuffle the card values using Fisher-Yates algorithm
function shuffle(arry){
    let currentIdx = arry.length, randomIdx, temporary;

    while(--currentIdx >= 0){
        randomIdx = Math.floor(Math.random()*(currentIdx+1));
        temporary = arry[randomIdx];
        
        arry[randomIdx] = arry[currentIdx];
        arry[currentIdx] = temporary;
    }
    return arry;
}

//Function to start the game
function startGame(){
    // Reset the game 
    flippedCards = [];
    matchedCards = [];
    gameStarted = false;
    moveCount = 0;
    time = 0;
    timeDisplay.textContent = "Time: 0s";
    moveCountDisplay.textContent = "Moves: 0";

    let cardsValuePickList = [...cardsValue,...cardsValue];
    let shuffled = shuffle(cardsValuePickList);

    createBoard(shuffled);

    //Add OnClick event listener to every card.
    for (let card of cards) {
        card.addEventListener('click', function(){
        flipCard(card);
      });
    }
}

//Function to flip the card 
function flipCard(card) {
  //Start the time when the first card is fliped
    if(!gameStarted){
      gameStarted = true;
      startTimer();
    }

    //Ensure the flipped card and matched cards cannot be refliped.
    if (card.classList.contains('flipped') || card.classList.contains('matched')) {
      return;
    }
    card.classList.add('flipped');
    

    const img = card.querySelector('img');
    // Set the src to card's value
    img.src = card.dataset.value;
    
    // Add the flipped card to the flippedCards array
    flippedCards.push(card);
  
    if (flippedCards.length === 2) {
      // Count to the Moves when flip 2 cards
      moveCount++;
      moveCountDisplay.textContent = `Moves: ${moveCount}`;
      
      disableCardFlipping(true);
      
      setTimeout(() =>{
        // Two cards are flipped, check for a match
      checkForMatch();
      //enable card flipping after delay
      disableCardFlipping(false);
      },1000);
      
    }

  }

  //Function to match the card
  function checkForMatch() {
    const card1 = flippedCards[0];
    const card2 = flippedCards[1];
  
    const img1 = card1.querySelector('img');
    const img2 = card2.querySelector('img');
  
    if (img1.src === img2.src) {
      // The cards are a match
      card1.classList.add('matched');
      card2.classList.add('matched');
      matchedCards.push(card1, card2);
      
    } else {
      // The cards are not a match
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        //Change the img back to defalut img
        img1.src = 'imags/face.png';
        img2.src = 'imags/face.png';
      }, 1000);
    }
  
    // Clear the flippedCards array
    flippedCards = [];
  }

  //Function to start the timer
  function startTimer(){
    timerId = setInterval(() =>{
      time++;
      timeDisplay.textContent = `Time: ${time}s`;
    }, 1000);
  }

  //Function to reset the timer
  function stopTimer(){
    clearInterval(timerId);
  }

//Function to stop the game
function stopGame(){
    flippedCards = [];
    matchedCards = [];
    stopTimer();
    let cardsValuePickList = [...cardsValue,...cardsValue];
    let shuffled = shuffle(cardsValuePickList);

    createBoard(shuffled);
}

//Function to disable or enable card flipping
function disableCardFlipping(disable){
  for(let card of cards){
    card.removeEventListener('click',flipCard);
    if(disable){
      card.style.pointerEvents = 'none';
    } else{
      card.addEventListener('click',flipCard);
      card.style.pointerEvents = 'auto'
    }
  }
}
