import { drawGamesInfoTable, drawConcreteGameTable } from './View.js';

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let db;
export let currentId;
let gameInfo = document.getElementById("info");

let shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

shuffle(numbers);
export let hiddenNumber = [numbers[0], numbers[1], numbers[2]];
console.log(hiddenNumber);
hiddenNumber = hiddenNumber.join('');
hiddenNumber = hiddenNumber.split('');

export async function initializeDatabase()
{
    db = await idb.openDB('gamesDb', 1, { upgrade(db) {
        db.createObjectStore('gamesInfo', {keyPath: 'gameId', autoIncrement: true});
        db.createObjectStore('turnsInfo', {keyPath: 'id', autoIncrement: true});
    },
    }); 
    getCurrentId();
}

export async function getGames()
{
  let gamesList = await db.getAll('gamesInfo');
  drawGamesInfoTable(gameInfo, gamesList);
}

export async function createReplay(gameId)
{
  let cursor = await db.transaction('turnsInfo', 'readonly').store.openCursor();

  let concreteGameTurns = [];
  let indexForArray = 0;

  while (cursor) {
      if (cursor.value.gameId === gameId) {
          concreteGameTurns[indexForArray] = cursor.value;
          indexForArray++;
      }
      cursor = await cursor.continue();
  }

  drawConcreteGameTable(gameInfo, concreteGameTurns, gameId);
}

async function getCurrentId()
{
    let gamesList = await db.getAll('gamesInfo');
    currentId = gamesList.length + 1;
}

export async function writeGameInfo(username)
{
  let date = new Date().toLocaleString();
  let gameStatus = 'Не окончена';
  let computerNumber = hiddenNumber.join('');
  try {
      await db.add('gamesInfo', {username, date, computerNumber, gameStatus});
  } catch(err) {
      throw err;
  }
}

export async function updateGameStatus(gameStatus)
{
  let cursor = await db.transaction('gamesInfo', 'readwrite').store.openCursor();

  while (cursor) {
      if (cursor.value['gameId'] === currentId) {
          let updateData = cursor.value;
          updateData.gameStatus = gameStatus;
          cursor.update(updateData);
      }
      cursor = await cursor.continue();
  }    
}

export async function writeTurnInfo(gameId, gameStatus, turnNumber, guess)
{
    try {
        await db.add('turnsInfo', {gameId, turnNumber, guess, gameStatus});
    } catch(err) {
        throw err;
    }
} 