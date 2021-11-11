import { startGame } from './Controller.js';

const gameButton = document.getElementById("button");

gameButton.onclick = () => {
    startGame();
}