import { hiddenNumber } from './Model.js';

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

export function startGame()
{
	let currentNumber = document.getElementById("guess").value;
	let currentCheckNumber = Number(currentNumber);

	if (!Number.isInteger(currentCheckNumber)) {
    	alert('Ошибка! Введите число!.');
    	return;
  	}

	if (currentNumber.length != 3) { 
		alert('Ошибка! Число должно быть трехзначным!');
		return;
	}

	currentNumber = currentNumber.split('');
	let currentStrNumber = currentNumber.toString();
	let hiddenStrNumber = hiddenNumber.toString();

	if (currentStrNumber == hiddenStrNumber) {
		alert("Вы выиграли!");
		location.reload();
	} else {
		let arr = coldHot(currentNumber, hiddenNumber);
		alert(arr);
	}
}