// Palabras para el juego
const words = ["javascript", "html", "css", "developer", "nao", "ornito", "Lety"];

// Elementos del juego
const hangmanImage = document.getElementById("hangman-image");
const maskedWord = document.getElementById("masked-word");
const guessedLetters = document.getElementById("guessed-letters");
const message = document.getElementById("message");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
const restartButton = document.getElementById("restart-button");

// Variables del juego
let word = "";
let masked = "";
let guesses = 7;
let guessed = [];

// Función para iniciar el juego
function init() {
    word = getRandomWord();
    masked = getMaskedWord(word);
    guesses = 7;
    guessed = [];

    hangmanImage.src = "assets/img/hangman.png";
    maskedWord.textContent = masked;
    guessedLetters.textContent = "";
    guessInput.value = "";
    message.textContent = "";

    guessInput.disabled = false;
    guessButton.disabled = false;

    guessInput.focus();
}

// Obtener una palabra aleatoria
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Obtener la palabra con las letras adivinadas mostradas y las demás letras ocultas
function getMaskedWord(word) {
    let masked = "";
    for (let i = 0; i < word.length; i++) {
        if (guessed.includes(word[i])) {
            masked += word[i];
        } else {
            masked += "_";
        }
    }
    return masked;
}

// Verificar si la letra adivinada está en la palabra
function guessLetter() {
    const guess = guessInput.value.toLowerCase();
    guessInput.value = "";

    if (!guess) {
        return;
    }

    if (guessed.includes(guess)) {
        message.textContent = "Ya has adivinado esa letra. Intenta con otra.";
        return;
    }

    guessed.push(guess);

    if (word.includes(guess)) {
        masked = getMaskedWord(word);
        maskedWord.textContent = masked;
        checkWin();
    } else {
        guesses--;
        displayHangman();
        checkLoss();
    }

    guessedLetters.textContent = `Letras adivinadas: ${guessed.join(", ")}`;

    if (guesses === 0) {
        guessInput.disabled = true;
        guessButton.disabled = true;
    }

    guessInput.focus();
}

// Verificar si se ha ganado el juego
function checkWin() {
    if (!masked.includes("_")) {
        message.textContent = "¡Felicidades! Has ganado el juego.";
        guessInput.disabled = true;
        guessButton.disabled = true;
    }
}

// Verificar si se ha perdido el juego
function checkLoss() {
    if (guesses === 0) {
        message.textContent = "Oh no, has perdido. Inténtalo de nuevo.";
    }
}

// Mostrar el dibujo del ahorcado según las oportunidades restantes
function displayHangman() {
    hangmanImage.src = `assets/img/hangman${7 - guesses}.png`;
}

// Reiniciar el juego
function restartGame() {
    init();
}

// Event listeners
guessButton.addEventListener("click", guessLetter);
guessInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        guessLetter();
    }
});
restartButton.addEventListener("click", restartGame);

// Iniciar el juego al cargar la página
window.addEventListener("DOMContentLoaded", init);
