<?php

    require __DIR__ . '/../vendor/autoload.php';

    use Slim\Factory\AppFactory;
    use SQLite3;

    $app = AppFactory::create();
    $app->addErrorMiddleware(true, true, true);

    // $app->redirect('/', '/index.html');

    $app->get('/', function ($request, $response) {
        return $response->withHeader('Location', 'index.html');
    });

    $app->get('/games', function ($request, $response) {
        $a = showList();
        $response->getBody()->write($a);
        return $response->withHeader('Content-Type', 'application/json');
    });

    $app->get('/games/{id}', function ($request, $response, array $args) {
        showReplay($args['id']);
        return $response;
    });

    $app->post('/games', function ($request, $response) {
        $currentNumber = random_int(100, 999);
        insertDB($currentNumber);
        $db = openDB();
        $id = $db->querySingle("SELECT gameId FROM games ORDER BY gameId DESC LIMIT 1");
        $param = ['id' => $id, 'num' => $currentNumber];
        return $response->withJson($param);
    });

    $app->post('/steps/{id}', function ($request, $response, array $args) {
        $a = $request->getBody();
        var_dump($a);
        print_r($args['id']);
        return $response;
    });

    $app->run();

    function coldHot($numberArray, $currentNumber): string
    {
        $result = "Исходы:";
        for ($i = 0; $i < 3; $i++) {
            if ($numberArray[$i] == $currentNumber[$i]) {
                $result .= " Горячо!;";
            } elseif (
                $numberArray[$i] == $currentNumber[0] ||
                $numberArray[$i] == $currentNumber[1] ||
                $numberArray[$i] == $currentNumber[2]
            ) {
                $result .= " Тепло!;";
                // echo "Тепло!\n";
            } else {
                $result .= " Холодно!;";
                // echo "Холодно!\n";
            }
        }
        return $result;
    }

    function startGame($currentNumber)
    {
//         showGame();
        $number = $currentNumber;
        $db = openDB();
        $turn = 0;

        $currentNumber = str_split($currentNumber);
        $id = $db->querySingle("SELECT gameId FROM games ORDER BY gameId DESC LIMIT 1");

        while ($number != $currentNumber) {
            if (is_numeric($number)) {
                // if (strlen($number) != 3) {
                //     echo "Ошибка! Число должно быть трехзначным\n";
                // } else {
                $numberArray = str_split($number);
                if ($numberArray == $currentNumber) {
                    // echo "Вы выиграли!\n";
                    $result = "Победа";
                    updateDB($id, $result);
                    $turn++;
                    $turnRes = coldHot($numberArray, $currentNumber);
                    $turnResult = $turn . " | " . $number . " | " . $turnRes;
                    insertReplay($id, $turnResult);
                } else {
                    $turn++;
                    $turnRes = coldHot($numberArray, $currentNumber);
                    $turnResult = $turn . " | " . $number . " | " . $turnRes;
                    insertReplay($id, $turnResult);
                }
                // }
            } else {
//                echo "Ошибка! Введите число.\n";
            }
        }
        return $id;
    }

    function openDB()
    {
        if (!file_exists("../db/gameDB.db")) {
            $db = createDB();
        } else {
            $db = new SQLite3("../db/gameDB.db");
        }
        return $db;
    }

    function createDB()
    {
        $db = new SQLite3("../db/gameDB.db");

        $game = "CREATE TABLE games(
            gameId INTEGER PRIMARY KEY,
            gameDate DATE,
            gameTime TIME,
            playerName TEXT,
            secretNumber INTEGER,
            gameResult TEXT
        )";
        $db->exec($game);

        $turns = "CREATE TABLE info(
            gameId INTEGER,
            gameResult TEXT
        )";
        $db->exec($turns);

        return $db;
    }

    function insertDB($currentNumber)
    {
        $db = openDB();

        date_default_timezone_set("Europe/Moscow");
        $gameData = date("d") . "." . date("m") . "." . date("Y");
        $gameTime = date("H") . ":" . date("i") . ":" . date("s");
        $playerName = getenv("username");

        $db->exec("INSERT INTO games (
            gameDate, 
            gameTime,
            playerName,
            secretNumber,
            gameResult
            ) VALUES (
            '$gameData', 
            '$gameTime',
            '$playerName',
            '$currentNumber',
            'Не закончено'
            )");

        return $db;
    }

    function updateDB($id, $result)
    {
        $db = openDB();
        $db -> exec("UPDATE games
            SET gameResult = '$result'
            WHERE gameId = '$id'");
    }

    function showList()
    {
        $json = '';
        $db = openDB();
        $query = $db->query('SELECT Count(*) FROM games');
        $DBcheck = $query->fetchArray();
        $query = $db->query('SELECT * FROM games');
        if ($DBcheck[0] != 0) {
            echo"<table>";
            echo"<tr><td>ID</td><td>Дата</td><td>Имя</td><td>Число</td><td>Результат</td></tr>";
            while ($row = $query->fetchArray()) {
                echo("<tr><td>$row[0]</td><td>$row[1]</td><td>$row[2]</td> 
    <td>$row[3]</td><td>$row[4]</td><td>$row[5]</td><tr>");
            }
            echo"</table>";
        } else {
            $json = ("База данных пуста.");
        }
        return $json;
    }

    function insertReplay($id, $turnResult)
    {
        $db = openDB();
        $db -> exec("INSERT INTO info (
        gameID,
        gameResult
        ) VALUES (
        '$id',
        '$turnResult')");
    }

    function showReplay($id)
    {
        $db = openDB();
        $query = $db->query("SELECT Count(*) FROM info WHERE gameID = '$id'");
        $DBcheck = $query->fetchArray();
        if ($DBcheck[0] != 0) {
            echo("Повтор игры с id = " . $id);
            $query = $db->query("SELECT gameResult FROM info WHERE gameID = '$id'");
            echo "<table>";
            while ($row = $query->fetchArray()) {
                echo "<tr><td>$row[0]</td></tr>";
            }
            echo "</table>";
        } else {
            echo("База данных пуста, либо не правильный id игры.");
        }
    }