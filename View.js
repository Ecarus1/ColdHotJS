let gameField = document.getElementById("game");
let gameInfo = document.getElementById("info");
let headerBlock = document.getElementById("header");

export let hideElement = (element) => {
    element.classList.add('hidden');
}

export let unhideElement = (element) => {
    element.classList.remove('hidden');
}

export let drawGamesInfoTable = (element, array) => {
    hideElement(gameField, 'hidden');
    unhideElement(gameInfo, 'hidden');
    unhideElement(headerBlock, 'hidden');
    headerBlock.innerHTML = "<h2>Информация об играх</h2>";
    let html = "<table><tr>";
    html += "<th>id игры</th>";
    html += "<th>Имя игрока</th>";
    html += "<th>Дата игры</th>";
    html += "<th>Загаданное число</th>";
    html += "<th>Статус игры</th>";
    html += "</tr>";
    for(let i = 0; i < array.length; i++) {
        html += "<tr>";
        html += "<td>" + array[i]['gameId'] + "</td>";
        html += "<td>" + array[i]['username'] + "</td>";
        html += "<td>" + array[i]['date'] + "</td>";
        html += "<td>" + array[i]['computerNumber'] + "</td>";
        html += "<td>" + array[i]['gameStatus'] + "</td>";
        html += "</tr>";
    }
    html += "</table>";
    element.innerHTML = html;
}

export let drawConcreteGameTable = (element, array, gameId) => {
    hideElement(gameField, 'hidden');
    unhideElement(gameInfo, 'hidden');
    unhideElement(headerBlock, 'hidden');
    headerBlock.innerHTML = "<h2>Информация об игре с id = " + gameId + "</h2>";
    let html = "<table><tr>";
    html += "<th>Номер хода</th>";
    html += "<th>Введенное число</th>";
    html += "<th>Результат хода</th>";
    html += "</tr>";
    for(let i = 0; i < array.length; i++) {
        html += "<tr>";
        html += "<td>" + array[i]['turnNumber'] + "</td>";
        html += "<td>" + array[i]['guess'] + "</td>";
        html += "<td>" + array[i]['gameStatus'] + "</td>";
        html += "</tr>";
    }
    html += "</table>";
    element.innerHTML = html;
} 