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
let timeElapsed = 0;
let gameRunning = false;

// Fonction pour démarrer le jeu
function startGame() {
    hunterScore = 0;
    duckScore = 0;
    timeElapsed = 0;
    hunterPoints.textContent = hunterScore;
    duckPoints.textContent = duckScore;
    timing.textContent = `${timeElapsed}s`;
    
    // Lancer un timer de 1 seconde pour l'horloge
    timerInterval = setInterval(() => {
        timeElapsed++;
        timing.textContent = `${timeElapsed}s`;
    }, 1000);

    // Rendre l'oie visible et la faire apparaître aléatoirement
    duck.style.display = 'block';
    moveDuck();

    // Mettre à jour le jeu
    gameInterval = setInterval(moveDuck, 1000 + Math.random() * 2000); // L'oie se déplace toutes les 1 à 3 secondes

    gameRunning = true;
}

// Fonction pour déplacer l'oie
function moveDuck() {
    const maxX = window.innerWidth - duckImg.width;
    const maxY = window.innerHeight - duckImg.height;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // Positionner l'oie à une position aléatoire dans la fenêtre
    duck.style.left = `${randomX}px`;
    duck.style.top = `${randomY}px`;
}

// Fonction pour arrêter le jeu
function stopGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    duck.style.display = 'none';
    gameRunning = false;
}


// Fonction pour simuler une pause (quand le joueur clique sur "Break")
function breakGame() {
    stopGame();
    alert("Jeu en pause. Cliquez sur 'Start' pour reprendre.");
}

// Ajouter un événement pour attraper l'oie
duckImg.addEventListener("click", function () {
    if (gameRunning) {
        duckScore++;
        duckPoints.textContent = duckScore;
        moveDuck(); // Déplacer l'oie après l'avoir attrapée
    }
});

// Ajouter des événements aux boutons
startBtn.addEventListener("click", startGame);
stopBtn.addEventListener("click", stopGame);
breakBtn.addEventListener("click", breakGame);
