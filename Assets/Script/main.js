// Initialisation des éléments du DOM
const startBtn = document.getElementById("start_btn");
const stopBtn = document.getElementById("stop_btn");
const restartBtn = document.getElementById("restart_btn");
const breakBtn = document.getElementById("break_btn");
const hunterPoints = document.querySelector(".hunter_points");
const duckPoints = document.querySelector(".duck_points");
const timing = document.querySelector(".timing");
const duck = document.querySelector(".duck");
const duckImg = document.querySelector(".duck_img");
const scoreboard = document.getElementById("scoreboard");

// Variables du jeu
let hunterScore = 0;
let duckScore = 0;
let gameInterval;
let timerInterval;
let timeElapsed = 30; // Le timer commence à 30 secondes
let gameRunning = false;
let duckSpeed = 1; // Initialisation de la vitesse du canard

// Fonction pour démarrer le jeu
function startGame() {
    hunterScore = 0;
    duckScore = 0;
    timeElapsed = 30; // Réinitialiser le timer à 30 secondes
    hunterPoints.textContent = hunterScore;
    duckPoints.textContent = duckScore;
    timing.textContent = `${timeElapsed}s`;
    
    // Lancer un timer de 1 seconde pour l'horloge
    timerInterval = setInterval(() => {
        timeElapsed--;
        timing.textContent = `${timeElapsed}s`;
        if (timeElapsed <= 0) {
            stopGame(); // Arrêter le jeu quand le temps est écoulé
        }
    }, 1000);

    // Lancer l'intervalle pour le déplacement du canard
    duck.style.display = 'block';
    moveDuck(); // Positionner le canard pour commencer
    gameInterval = setInterval(moveDuck, 1000 / duckSpeed); // Plus le score de l'Hunter est élevé, plus le canard se déplace vite

    gameRunning = true;
}

// Fonction pour déplacer l'oie à l'intérieur de la div game
function moveDuck() {
    const gameArea = document.querySelector('.game'); // Récupérer la div de jeu
    const maxX = gameArea.offsetWidth - duckImg.width;  // Largeur de la div .game moins la largeur de l'oie
    const maxY = gameArea.offsetHeight - duckImg.height; // Hauteur de la div .game moins la hauteur de l'oie
    const randomX = Math.random() * maxX;  // Calculer la position X aléatoire dans la zone
    const randomY = Math.random() * maxY;  // Calculer la position Y aléatoire dans la zone

    // Positionner l'oie à une position aléatoire dans la zone de jeu
    duck.style.left = `${randomX}px`;
    duck.style.top = `${randomY}px`;
}

// Fonction pour arrêter le jeu
function stopGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    duck.style.display = 'none';  // Cacher l'oie
    gameRunning = false;
}

// Fonction pour simuler une pause (quand le joueur clique sur "Break")
function breakGame() {
    stopGame();
}

// Ajouter un événement pour attraper l'oie
duckImg.addEventListener("click", function () {
    if (gameRunning) {
        hunterScore++; // Incrémenter le score de l'Hunter
        hunterPoints.textContent = hunterScore;
        duckSpeed = 1 + hunterScore / 10; // Augmenter la vitesse du canard en fonction du score de l'Hunter
        moveDuck(); // Déplacer l'oie après l'avoir attrapée
    }
});

// Ajouter un événement pour cliquer ailleurs et augmenter le score du canard
document.querySelector('.game').addEventListener("click", function (event) {
    if (!event.target.classList.contains('duck_img') && gameRunning) {
        duckScore++; // Incrémenter le score du Duck quand on clique ailleurs
        duckPoints.textContent = duckScore;
    }
});

// Ajouter des événements aux boutons
startBtn.addEventListener("click", startGame);
stopBtn.addEventListener("click", stopGame);
breakBtn.addEventListener("click", breakGame);
