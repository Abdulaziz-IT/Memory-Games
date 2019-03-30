//Compare between 2 cards
function checkCards(evt) {
    const elem = evt.target;
    console.log(elem);
    if (elem.nodeName === "LI") {
        if (playable && elem.classList.length === 1) {
            elem.classList.add("open");
            elem.classList.add("show");
            if (openedCards.length !== 0) {
                playable = false;
                if (openedCards[0].firstElementChild.classList[1] === elem.firstElementChild.classList[1]) {
                    successMoves++;
                    matched(elem);
                    if (successMoves == 8) {
                        setTimeout(won, 500);
                    }
                } else {
                    setTimeout(function () {
                        unMatched(elem)
                    }, 500);
                }
                moves.textContent = Number(moves.textContent) + 1;
                if (Number(moves.textContent) === 12 || Number(moves.textContent) === 20) {
                    const stars = document.getElementsByClassName("stars")[0];
                    stars.children[numOfStars - 1].style.display = "none";
                    numOfStars--;
                }
            } else {
                openedCards.push(elem);
            }
        }
    }
}

//Change classes of matches cards and pop them.
function matched(elem) {
    openedCards[0].classList.remove("open", "show");
    elem.classList.remove("open", "show");
    openedCards[0].classList.add("match");
    elem.classList.add("match");
    openedCards.pop();
    playable = true;
}

//Close the un-matched cards.
function unMatched(elem) {
    openedCards[0].classList.remove("open", "show");
    elem.classList.remove("open", "show");
    openedCards.pop();
    playable = true;
}

//Display an alert after winning, and stop the timing then ask if the user wants to play again.
function won() {
    clearInterval(timer);
    const finishTime = Number(min.textContent) * 60 + Number(sec.textContent);
    const message = `You have successfully finished the game in ${finishTime} seconds!
You have made ${Number(moves.textContent)} moves, and kept ${numOfStars} star(s)!
Woud you like to play again?!`;
    if (confirm(message)) {
        restartGame();
    } else {
        playable = false;
    }
}

//Display an alert after losing, and stop the timing then ask if the user wants to play again.
function lost() {
    const message = `You lost the game :(
Even though, you got ${successMoves} move(s) correct.
Would you like to play again?!`;
    if (confirm(message)) {
        restartGame();
    } else {
        playable = false;
    }
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Get the HTMLCollection to an array.
function getCardsToArray() {
    const arr = [];
    for (let index = 0; index < cardsElements.length; index++) {
        arr.push(cardsElements[index]);
    }
    return arr;
}


//Display the structure of the deck.
function cleanCards() {
    for (let index = 0; index < cards.length; index++) {
        cards[index].className = "card";
    }
    shuffle(cards);
    while (deck.firstChild) {
        deck.removeChild(deck.firstChild);
    }
    for (let index = 0; index < cards.length; index++) {
        const element = cards[index];
        deck.appendChild(element);
    }
}

//Set the timer of the game.
function setTimer() {
    const time = 90;
    const minTimer = Math.floor(time / 60);
    const secTimer = time % 60;

    min.textContent = minTimer;
    sec.textContent = secTimer;
    timer = setInterval(startTimer, 1000);
}

//Decrease 1 second everytime this function is used.
function startTimer() {
    if (sec.textContent == "0" && min.textContent == "0") {
        clearInterval(timer);
        if (successMoves == 8) {
            setTimeout(won, 500);
        } else {
            setTimeout(lost, 500);
        }
    } else if (sec.textContent == "0") {
        min.textContent = Number(min.textContent) - 1;
        sec.textContent = Number(59);
    } else {
        sec.textContent = Number(sec.textContent) - 1;
    }
}

//Restarting the game and resetting the variables
function restartGame() {
    clearInterval(timer);
    cleanCards();
    setTimer();
    playable = true;
    successMoves = 0;
    numOfStars = 3;
    moves.textContent = 0;

    //Re-creating the stars.
    const stars = document.getElementsByClassName("stars")[0];
    for (let index = 0; index < 3; index++) {
        stars.children[index].style.display = "inline-block";
    }
}

//Declaring and initializing variables
const moves = document.getElementsByClassName("moves")[0];
let successMoves = 0;
let numOfStars = 3;
const deck = document.getElementsByClassName("deck")[0];
const openedCards = [];
const cardsElements = document.getElementsByClassName("card");
let timer;
let playable = true;
const restartButton = document.getElementsByClassName("restart")[0];
const min = document.getElementsByClassName("min")[0];
const sec = document.getElementsByClassName("sec")[0];

restartButton.addEventListener("click", restartGame);

//Add an event listener on the deck (Event Delegation is applied here).
deck.addEventListener("click", checkCards);

//Start the game
let cards = getCardsToArray();
cleanCards();
setTimer();
