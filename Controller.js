import { currentId, hiddenNumber, initializeDatabase, getGames, createReplay, writeGameInfo, updateGameStatus, writeTurnInfo } from './Model.js';
import { hideElement, unhideElement } from './View.js';

let gameField = document.getElementById("game");
let gameInfo = document.getElementById("info");
let headerBlock = document.getElementById("header");

let startButton = document.getElementById("startGame");
let gamesButton = document.getElementById("showGames");
let replayButton = document.getElementById("showReplay");
let gameButton = document.getElementById("gameButton");

let turnNumber = 0;

window.onload = initializeDatabase;

let playGame = () => {
	let currentNumber = document.getElementById("guess").value;
	let currentCheckNumber = Number(currentNumber);

	if (!Number.isInteger(currentCheckNumber)) {
    	alert('Ошибка! Введите число.');
    	return;
  	}

	if (currentNumber.length != 3) { 
		alert('Ошибка! Число должно быть трехзначным');
		return;
	}

	currentNumber = currentNumber.split('');
	let heat_array = hiddenNumber.filter(value => currentNumber.includes(value));

	let currentStrNumber = currentNumber.toString();
	let hiddenStrNumber = hiddenNumber.toString();

	turnNumber++;


	if (currentStrNumber == hiddenStrNumber) {
		alert('Вы выиграли!');
		writeTurnInfo(currentId, 'Игра выиграна', turnNumber, currentNumber.join(''));
		updateGameStatus('Игра выиграна');
		turnNumber = 1;
	    hideElement(gameField);
	} else {
		let arr = coldHot(currentNumber, hiddenNumber);
		alert(arr);
	}

}

function coldHot(currentStrNumber, hiddenStrNumber)
{
	let arr = [];
	for (let i = 0; i < 3; i++) {
		if (currentStrNumber[i] == hiddenStrNumber[i]) {
			arr[i] = "Горячо!";
		} else if (
			currentStrNumber[i] == hiddenStrNumber[0] ||
			currentStrNumber[i] == hiddenStrNumber[1] ||
			currentStrNumber[i] == hiddenStrNumber[2]
		) {
			arr[i] = "Тепло!";
		} else {
			arr[i] = "Холодно!";
		}
	}
	return arr;
}

let startGame = () => {
	let username = prompt("Введите имя игрока");
	hideElement(gameInfo);
	unhideElement(gameField);
	hideElement(headerBlock);
	writeGameInfo(username);
}

let getReplay = () => {
	let gameId = +prompt("Введите id игры");
	createReplay(gameId);
}

startButton.onclick = startGame;
gamesButton.onclick = getGames;
gameButton.onclick = playGame;
replayButton.onclick = getReplay; 