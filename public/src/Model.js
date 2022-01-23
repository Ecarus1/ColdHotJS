import { showAllInfo, showGameInfo } from "./View.js";

let n = Math.floor(Math.random() * (1000 - 100)) + 100;
export var hiddenNumber = n.toString().split('').map(Number);
let db;
export let currentId;
console.log(hiddenNumber);

export async function initializeDatabase()
{
    db = await idb.openDB('games', 1, { upgrade(db) {
            db.createObjectStore('gamesInfo', {keyPath: 'gameId', autoIncrement: true});
            db.createObjectStore('turnsInfo', {keyPath: 'id', autoIncrement: true});
        },
    }); 
    getCurrentId();
}

export async function getGames()
{
    let gamesList = await db.getAll('gamesInfo');
    showAllInfo(gamesList);
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

  showGameInfo(concreteGameTurns, gameId);
}

async function getCurrentId()
{
    let gamesList = await db.getAll('gamesInfo');
    currentId = gamesList.length + 1;
}

export async function writeGameInfo(username)
{
    let date = new Date().toLocaleString();
    let gameStatus = 'Не окончена!';
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