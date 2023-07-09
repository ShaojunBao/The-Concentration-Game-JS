// constants:
const cardsValue = [
  'images/bacon.png',
  'images/bread.png',
  'images/egg.png',
  'images/hamburger.png',
  'images/noodles.png',
  'images/pizza.png',
  'images/ramen.png',
  'images/rice.png',
];

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
const timeDisplay = document.getElementById('timer');
const moveCountDisplay = document.getElementById('move-counter');
const deck = document.querySelector('.deck');
const statusElement  = document.querySelector('.statusCheck');

// event listener:
startBtn.addEventListener('click', startGame);


//Initialize the game
startGame();

// Function to create the game board
function createBoard(cardsValueShuffled) {
  // reset the current cards to prevent duplicate images
  cards = [];
  deck.innerHTML = '';

  // Generate the card deck
  for (let i = 0; i < cardsValueShuffled.length; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = cardsValueShuffled[i];

    const img = document.createElement('img');
    img.src = 'images/face.png';
    img.alt = 'Default image';

    card.appendChild(img);
    deck.appendChild(card);
    cards.push(card);
  }

  // Add OnClick event listener to every card.
  cards.forEach((card) => {
    card.addEventListener('click', function () {
      // Start the timer only if it hasn't been started yet
      if (!gameStarted) {
        gameStarted = true;
        startTimer();
      }
      flipCard(card);
    });
  });
}

// Function to shuffle the card values using Fisher-Yates algorithm
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex,
    temporary;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporary = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporary;
  }

  return array;
}

// Function to start the game
function startGame() {
  stopTimer();
  flippedCards = [];
  matchedCards = [];
  gameStarted = false;
  moveCount = 0;
  time = 0;
  timeDisplay.textContent = 'Time: 0s';
  moveCountDisplay.textContent = 'Moves: 0';
  statusElement .textContent = '';

  let cardsValuePickList = [...cardsValue, ...cardsValue];
  let shuffled = shuffle(cardsValuePickList);

  createBoard(shuffled);
}

// Function to flip the card
function flipCard(card) {
  // Ensure the flipped card and matched cards cannot be re-flipped.
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
    // Count the moves when two cards are flipped
    moveCount++;
    moveCountDisplay.textContent = `Moves: ${moveCount}`;

    disableCardFlipping(true);

    setTimeout(() => {
      // Two cards are flipped, check for a match
      checkForMatch();
      // Enable card flipping after delay
      disableCardFlipping(false);
    }, 1000);
  }
}

// Function to match the cards
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
      // Change the img back to default img
      img1.src = 'images/face.png';
      img2.src = 'images/face.png';
    }, 1000);
  }

  // Clear the flippedCards array
  flippedCards = [];

  //Check if all cards are matched
  if(matchedCards.length === cards.length){
    stopTimer();
    statusElement .textContent = 'Congratulations! You win!'
  }
}

// Function to start the timer
function startTimer() {
  timerId = setInterval(() => {
    time++;
    timeDisplay.textContent = `Time: ${time}s`;
  }, 1000);
}

// Function to reset the timer
function stopTimer() {
  clearInterval(timerId);
}



// Function to disable or enable card flipping
function disableCardFlipping(disable) {
  cards.forEach((card) => {
    if (disable) {
      card.style.pointerEvents = 'none';
    } else {
      card.style.pointerEvents = 'auto';
    }
  });
}
