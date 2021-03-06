import { drawBoard } from "./modules/drawBoard.js";
import { Ship } from "./modules/Ship.js";
import { coordParse } from "./modules/coordParse.js";
import { Player } from "./modules/Player.js";
import { Gameboard } from "./modules/Gameboard.js";
import { coordParseReverse } from "./modules/coordParseReverse.js";
import {calculateShipToProject} from "./modules/calculateShipToProject.js"

const gameController = (function () {
  let playerOne = new Player("human");
  let playerTwo = new Player("computer");
  let gameboardOne = new Gameboard("computer");

  let gameboardTwo = new Gameboard("human");
  let attackButton = document.getElementById("attack-button");
  let attackCoordsInput = document.getElementById("attack-coords-input");

  function initializeGame() {
    drawBoard(10, 10, 1);
    drawBoard(10, 10, 2);
    placeShips();
  }

  function placeShips() {
    const rotateButton = document.getElementById("rotate-button");
    rotateButton.addEventListener("click", displayController.toggleRotate);

    const gridBoards = document.querySelectorAll(
      "#game-board-grid-1 > .game-board-grid-item"
    );
    gridBoards.forEach((element) => {
      element.addEventListener("mouseenter", displayController.projectShip);
      element.addEventListener(
        "mouseout",
        displayController.removeProjectedShip
      );
      element.addEventListener("click", gameController.placeShipHandlerHuman);
    });
  }

  function placeShipHandlerHuman(e) {
    let rotateStatus =
      document.getElementById("rotate-button").classList == "true"
        ? true
        : false;
    let placedShipCoordsArray = calculateShipToProject(
      e.currentTarget.id,
      gameController.gameboardTwo,
      rotateStatus
    );

    if (
      gameController.gameboardTwo.checkForOccupied(
        placedShipCoordsArray,
        gameController.gameboardTwo
      ) &&
      gameController.gameboardTwo.checkForOffBoard(placedShipCoordsArray)
    ) {
      let ship = gameboardTwo.placeShip(
        gameboardTwo.unplacedShipsInventory[
          gameboardTwo.unplacedShipsInventory.length - 1
        ],
        placedShipCoordsArray
      );
      gameboardTwo.recordPlacements(ship);
      displayController.printShip(e, true);

      gameboardTwo.unplacedShipsInventory.pop();
    }

    if (gameboardTwo.unplacedShipsInventory.length == 0) {
      alert("stop placing ships!");
      placeShipsComputer();
    }

    //check forOffBoard takes array of proposed ship to see if it goes off board. Right now gameboard size is hardcoded.
  }

  function placeShipsComputer() {
    while (gameboardOne.unplacedShipsInventory.length > 0) {
      let randomCoord = playerTwo.getRandomCoords();

      function getRandomBool() {
        let oneOrTwo = Math.floor(Math.random() * 2);
        if (oneOrTwo == 1) {
          return true;
        } else {
          return false;
        }
      }

      let randomBool = getRandomBool();

      //let rotateStatus = document.getElementById("rotate-button").classList =="true" ? true : false;
      let placedShipCoordsArray = calculateShipToProject(
        randomCoord,
        gameController.gameboardOne,
        randomBool
      );

      if (
        gameController.gameboardOne.checkForOccupied(
          placedShipCoordsArray,
          gameController.gameboardOne
        ) &&
        gameController.gameboardOne.checkForOffBoard(placedShipCoordsArray)
      ) {
        let ship = gameboardOne.placeShip(
          gameboardOne.unplacedShipsInventory[
            gameboardOne.unplacedShipsInventory.length - 1
          ],
          placedShipCoordsArray
        );
        gameboardOne.recordPlacements(ship);
        //  displayController.printShip(e, true);

        gameboardOne.unplacedShipsInventory.pop();
      }
    }

    if (gameboardOne.unplacedShipsInventory.length == 0) {
      //Displays computer ship placements for testing purposes
      /*   for (
        let i = 0;
        i < gameController.gameboardOne.shipsPresent.length;
        i++
      ) {
        displayController.printShipFake(
          gameController.gameboardOne.shipsPresent[i],
          2
        );
      }*/

      const gridBoards = document.querySelectorAll(
        "#game-board-grid-1 > .game-board-grid-item"
      );

      gridBoards.forEach((element) => {
        element.removeEventListener(
          "mouseenter",
          displayController.projectShip
        );
        element.removeEventListener(
          "mouseout",
          displayController.removeProjectedShip
        );
        element.removeEventListener(
          "click",
          gameController.placeShipHandlerHuman
        );
      });

      gameController.turnFlow();
    }
  }

  function resetGame() {
    displayController.resetBoard();
    playerOne.playedCoords = [];
    playerTwo.playedCoords = [];
    gameboardOne.shipsPresent = [];
    gameboardOne.missedShots = [];
    gameboardOne.unplacedShipsInventory = [5, 4, 4, 3, 3];

    gameboardTwo.shipsPresent = [];
    gameboardTwo.missedShots = [];
    gameboardTwo.unplacedShipsInventory = [5, 4, 4, 3, 3];
    initializeGame();
  }

  function turnFlow(whichPlayer) {
    const gridBoard = document.querySelectorAll(
      "#game-board-grid-2 > .game-board-grid-item"
    );
    gridBoard.forEach((element) => {
      element.addEventListener("click", getAttackCoordListener);
    });

    alert("Attack please");

    function getAttackCoordListener(e) {
      let attackCoord = e.currentTarget.id;
      submitAttack(
        gameController.playerOne,
        gameController.gameboardTwo,
        attackCoord
      );
    }
    //right submitAttack now function happens when you submit attack coords, for now button manual entered
    //kicks off the main attack sequence of the game. coordinates are put in attack functino which
    //determines if it's a hit or a miss/already used. If a hit, gameboard takes it and
    //correct ship records the hit. ship then checks if sunk or not, and finally the board checks if
    //all ships are sunk or not.
    function submitAttack(player, gameboard, attackValue) {
      //  let attackCoords = attackValue;
      let coordsArray = [];

      if (player.name == "human") {
        coordsArray = coordParseReverse(attackValue);
      } else if (player.name == "computer") {
        coordsArray = coordParseReverse(playerTwo.getRandomCoords(playerTwo));

      }

      let x = coordsArray[0];
      let y = coordsArray[1];
      let attackResult = "";

      if (player.name == "human") {
        attackResult = player.attack(x, y);
      } else if (player.name == "computer") {
        attackResult = true;
      }

      if (attackResult !== false) {
        let hitOrMissedShip = undefined;
        if (player.name == "human") {
          hitOrMissedShip = gameController.gameboardOne.receiveAttack(x, y);
        } else if (player.name == "computer") {
          hitOrMissedShip = gameController.gameboardTwo.receiveAttack(x, y);
        }

        if (hitOrMissedShip !== false) {
          hitOrMissedShip.sunk = hitOrMissedShip.isSunk();
          displayController.displayHitOrMiss(true, coordParse(x, y), gameboard);
        } else {
          displayController.displayHitOrMiss(
            false,
            coordParse(x, y),
            gameboard
          );
        }
      } else if (attackResult == false) {
        attackCoordsInput.value = "";
        alert("please try again with a new set of coordinates");
        return;
      }
      if (gameboard.checkForAllSunk(gameboard.shipsPresent.length)) {
        alert("You win!");
        resetGame();
      } else {
        if (player.name == "computer") {
          alert("attack again please");
        } else if (player.name == "human") {
          submitAttack(gameController.playerTwo, gameController.gameboardOne);
        }
      }
    }
  }
  return {
    initializeGame: initializeGame,
    turnFlow: turnFlow,
    resetGame: resetGame,
    placeShipHandlerHuman: placeShipHandlerHuman,
    playerOne: playerOne,
    playerTwo: playerTwo,
    gameboardOne: gameboardOne,
    gameboardTwo: gameboardTwo,
  };
})();

const displayController = (function () {
  function projectShip(e) {
    let rotateStatus =
      document.getElementById("rotate-button").classList == "true"
        ? true
        : false;
    let projectShipCoords = calculateShipToProject(
      e.currentTarget.id,
      gameController.gameboardTwo,
      rotateStatus
    );

    // if (e.currentTarget.style.backgroundColor !== "blue") {
    printProjectedShip(projectShipCoords);
    // }
  }


  function toggleRotate() {
    this.classList.toggle("true");
  }
  function removeProjectedShip(e) {
    let allGridItems = document.querySelectorAll(
      "#game-board-grid-1 > .game-board-grid-item"
    );
    allGridItems.forEach((element) => {
      if (element.style.backgroundColor == "green") {
        element.style.setProperty("background-color", "orange");
      }
      if (element.style.backgroundColor == "red") {
        element.style.setProperty("background-color", "blue");
      }
    });
  }
  function printShip(e, bool) {
    let rotateStatus =
      document.getElementById("rotate-button").classList == "true"
        ? true
        : false;
    let projectShipCoords = calculateShipToProject(
      e.currentTarget.id,
      gameController.gameboardTwo,
      rotateStatus
    );

    if (bool) {
      projectShipCoords.forEach((element) => {
        let coord = "#game-board-grid-1" + " > #" + element.toString();
        let square = document.querySelector(coord);

        square.style.setProperty("background-color", "blue");
        if (e.currentTarget.style.backgroundColor == "blue") {
          e.currentTarget.style.backgroundColor == "red";
        }
      });
    } else {
      return projectShipCoords;
    }
  }

  function printShipFake(ship, number) {
    ship.position.forEach((element) => {
      let coord =
        "#game-board-grid-" + number.toString() + " > #" + element.toString();
      let square = document.querySelector(coord);

      square.style.setProperty("background-color", "blue");
    });
  }

  function printProjectedShip(array) {
    array.forEach((element) => {
      let coord = "#game-board-grid-1" + " > #" + element.toString();
      let square = document.querySelector(coord);
      if (square === null) {
        return;
      }
      if (square.style.backgroundColor !== "blue") {
        square.style.setProperty("background-color", "green");
      }

      if (square.style.backgroundColor == "blue") {
        square.style.setProperty("background-color", "red");
      }
    });
  }

  function displayHitOrMiss(bool, coordsString, gameboard) {
    let coord = "";
    if (gameboard.name == "human") {
      coord = "#game-board-grid-2 > #" + coordsString;
    } else if (gameboard.name == "computer") {
      coord = "#game-board-grid-1 > #" + coordsString;
    }

    let square = document.querySelector(coord);
    if (bool) {
      square.style.setProperty("background-color", "red");
    } else {
      square.style.setProperty("background-color", "white");
    }
  }

  function resetBoard() {
    const gameBoardGridContainers = document.querySelectorAll(".board-grids");
    gameBoardGridContainers.forEach((element) => (element.innerHTML = ""));
  }

  return {
    printShip: printShip,
    displayHitOrMiss: displayHitOrMiss,
    resetBoard: resetBoard,
    projectShip: projectShip,
    removeProjectedShip: removeProjectedShip,
    toggleRotate: toggleRotate,
    printShipFake: printShipFake,
  };
})();
//Follows this flow: initlializeGame, placeShips (first human place ships, then computerplace ships),
//turnFlow, which sets up computer/human taking turns, finally reset game at win, calls
//initalizeGame
gameController.initializeGame();
//gameController.turnFlow();

//for (let i = 0; i < gameController.gameboardTwo.shipsPresent.length; i++) {
//  displayController.printShip(gameController.gameboardTwo.shipsPresent[i], 1);
//}

//for (let i = 0; i < gameController.gameboardOne.shipsPresent.length; i++) {
//  displayController.printShipFake(gameController.gameboardOne.shipsPresent[i], 2);
//}
