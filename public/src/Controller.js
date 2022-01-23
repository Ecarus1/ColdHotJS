import { hiddenNumber, currentId, initializeDatabase, getGames, createReplay, writeGameInfo, updateGameStatus, writeTurnInfo } from './Model.js';
import { hide, show } from "./View.js";

let field = document.getElementById("game");
let info = document.getElementById("info");
let header = document.getElementById("header");
let startBt = document.getElementById("startGame");
let gamesBt = document.getElementById("showGames");
let replayBt = document.getElementById("showReplay");
let menu = document.getElementById("menu");
let playBt = document.getElementById("button");
let t = 1;
window.onload = initializeDatabase;

let coldHot = (currentStrNumber, hiddenStrNumber) => {
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
	let username = prompt("Введите своё имя");
	hide(info);
	hide(menu);
	hide(header);
	show(field);
	writeGameInfo(username);
}

let play = () => {
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
	let currentStrNumber = currentNumber.toString();
	let hiddenStrNumber = hiddenNumber.toString();

	if (currentStrNumber == hiddenStrNumber && t <= 10) {
		alert("Победа!");
		writeTurnInfo(currentId, "Победа!", t, currentNumber.join(""));
		updateGameStatus("Победа!");
		location.reload();
	} else if (t < 10) {
		let arr = coldHot(currentNumber, hiddenNumber);
		writeTurnInfo(currentId, arr.join(","), t, currentNumber.join(""));
		alert(arr);
		t++;
	} else {
		alert("Поражение!");
		writeTurnInfo(currentId, "Поражение!", t, currentNumber.join(""));
		updateGameStatus("Поражение!");
		location.reload();
	}
}

let getReplay = () => {
	let gameId = +prompt("Введите id игры");
	createReplay(gameId);
}

startBt.onclick = startGame;
gamesBt.onclick = getGames;
playBt.onclick = play;
replayBt.onclick = getReplay; 