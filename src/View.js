let field = document.getElementById("game");
let info = document.getElementById("info");
let header = document.getElementById("header");

export let hide = (element) => {
    element.classList.add("hidden");
}

export let show = (element) => {
    element.classList.remove("hidden");
}

export let showAllInfo = (array) => {
    hide(field, "hidden");
    show(info, "hidden");
    show(header, "hidden");
    header.innerHTML = "<h2>Информация об играх</h2>";
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
    info.innerHTML = html;
}

export let showGameInfo = (array, gameId) => {
    hide(field, 'hidden');
    show(info, 'hidden');
    show(header, 'hidden');
    header.innerHTML = "<h2>Информация об игре с id = " + gameId + "</h2>";
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
    info.innerHTML = html;
} 