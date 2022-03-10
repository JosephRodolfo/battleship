import { drawBoard } from "./modules/drawBoard.js";
window.drawBoard = drawBoard;
import { Ship } from "./modules/Ship.js";
import { coordParse } from "./modules/coordParse.js";
import { Player } from "./modules/Player.js";
import { Gameboard } from "./modules/Gameboard.js";
import { coordParseReverse } from "./modules/coordParseReverse.js";
//const coordParse = require("./coordParse");
//const Player = require("./Player");
//const Ship = require("./Ship");
//const Gameboard = require("./Gameboard");

//drawBoard(10, 10);
//let playerOne = new Player;
//let playerTwo = new Player;
//let gameboardOne = new Gameboard;
//let gameboardTwo = new Gameboard;

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
    placeShipsHuman();
    //placeShipsComputer;
    //     for (let i=0; i<5; i++) {
    //create random ship list generator function
    //set up prompt for player to place ships

    /* let ship1 = gameboardOne.placeShip(3, ["x1y1", "x1y2", "x1y3"]);
    let ship2 = gameboardOne.placeShip(3, ["x2y1", "x2y2", "x2y3"]);
    let ship3 = gameboardOne.placeShip(4, ["x5y1", "x5y2", "x5y3", "x5y4"]);
    let ship4 = gameboardOne.placeShip(5, [
      "x1y8",
      "x1y7",
      "x1y6",
      "x1y5",
      "x1y4",
    ]);
    let ship5 = gameboardOne.placeShip(5, [
      "x3y1",
      "x3y2",
      "x3y3",
      "x3y4",
      "x3y5",
    ]);

    gameboardOne.recordPlacements(ship1);
    //gameboardOne.recordPlacements(ship2);
    // gameboardOne.recordPlacements(ship3);
    // gameboardOne.recordPlacements(ship4);
    // gameboardOne.recordPlacements(ship5);

    let ship11 = gameboardTwo.placeShip(3, ["x1y1", "x1y2", "x1y3"]);
    let ship22 = gameboardTwo.placeShip(3, ["x2y1", "x2y2", "x2y3"]);
    let ship33 = gameboardTwo.placeShip(4, ["x5y1", "x5y2", "x5y3", "x5y4"]);
    let ship44 = gameboardTwo.placeShip(5, [
      "x1y8",
      "x1y7",
      "x1y6",
      "x1y5",
      "x1y4",
    ]);
    let ship55 = gameboardTwo.placeShip(5, [
      "x3y1",
      "x3y2",
      "x3y3",
      "x3y4",
      "x3y5",
    ]);

    gameboardTwo.recordPlacements(ship11);
    gameboardTwo.recordPlacements(ship22);
    gameboardTwo.recordPlacements(ship33);
    gameboardTwo.recordPlacements(ship44);
    gameboardTwo.recordPlacements(ship55);*/

    //  }
  }

  function placeShipsHuman() {
    const rotateButton=document.getElementById("rotate-button");
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
    let rotateStatus = document.getElementById("rotate-button").classList =="true" ? true : false;
    let placedShipCoordsArray = displayController.calculateShipToProject(e.currentTarget.id, gameController.gameboardTwo, rotateStatus)

    if(checkForOccupied(placedShipCoordsArray, gameController.gameboardTwo) && checkForOffBoard(placedShipCoordsArray)){
        let ship =  gameboardTwo.placeShip(gameboardTwo.unplacedShipsInventory[gameboardTwo.unplacedShipsInventory.length - 1], placedShipCoordsArray);
      console.log(gameboardTwo.unplacedShipsInventory);
        gameboardTwo.recordPlacements(ship);
      displayController.printShip(e, true);

      gameboardTwo.unplacedShipsInventory.pop();


    }






//check forOffBoard takes array of proposed ship to see if it goes off board. Right now gameboard size is hardcoded. 


  //let placedShipCoordsArray = displayController.printShip(e);

//  console.log(placedShipCoordsArray);
}


function checkForOccupied(array, gameboard) {
  for ( let i = 0; i < gameboard.shipsPresent.length; i++ ) {
    for (let t = 0; t < array.length; t++) {
      if (
        gameboard.shipsPresent[i].position.includes(
          array[t]
        )
      ) { 
        alert("Already a ship here!")
        return false;
      } 
    }
  }
  return true;
}

function checkForOffBoard(array) {
  for (let i=0;i<array.length;i++){
  let temp = coordParseReverse(array[i]);
  if(temp[0]>9 || temp[0]<0 || temp[1]>9 || temp[0]<0){
    alert("ship is off board, try again")
    return false;
  }

  } return true;
    
    


}

  function resetGame() {
    displayController.resetBoard();
    initializeGame();
  }

  function turnFlow(whichPlayer) {
    alert("Attack please");
    /* let attackCoords=attackCoordsInput.value;
      let coordsArray = coordParse(attackCoords);
      let x= coordsArray[0];
      let y=coordsArray[1];*/

    attackButton.addEventListener("click", function () {
      submitAttack(gameController.playerOne, gameController.gameboardTwo);
    });
    //right submitAttack now function happens when you submit attack coords, for now button manual entered
    //kicks off the main attack sequence of the game. coordinates are put in attack functino which
    //determines if it's a hit or a miss/already used. If a hit, gameboard takes it and
    //correct ship records the hit. ship then checks if sunk or not, and finally the board checks if
    //all ships are sunk or not.
    function submitAttack(player, gameboard) {
      let attackCoords = attackCoordsInput.value;
      let coordsArray = [];

      if (player.name == "human") {
        coordsArray = coordParseReverse(attackCoords);
      } else if (player.name == "computer") {
        coordsArray = playerTwo.randomAttack();
        attackCoords = coordsArray;
        coordsArray = coordParseReverse(coordsArray);
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
          //  hitOrMissedShip.isSunk();
          displayController.displayHitOrMiss(true, attackCoords, gameboard);
        } else {
          displayController.displayHitOrMiss(false, attackCoords, gameboard);
        }
      } else if (attackResult == false) {
        attackCoordsInput.value = "";
        alert("please try again with a new set of coordinates");
        return;
        //       submitAttack(gameController.playerOne, gameController.gameboardTwo);
      }
      console.log(gameboard);
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
    placeShipHandlerHuman,
    placeShipHandlerHuman,
    playerOne: playerOne,
    playerTwo: playerTwo,
    gameboardOne: gameboardOne,
    gameboardTwo: gameboardTwo
  };
})();

const displayController = (function () {
  function projectShip(e) {
    let rotateStatus = document.getElementById("rotate-button").classList =="true" ? true : false;
    let projectShipCoords = calculateShipToProject(e.currentTarget.id, gameController.gameboardTwo, rotateStatus);

    if (e.currentTarget.style.backgroundColor !== "blue") {
      printProjectedShip(projectShipCoords);
    }
    // e.currentTarget.style.setProperty("background-color", 'green');
  }

  function calculateShipToProject(stringCoord, gameboard, rotate) {
    let positionsToProject = gameboard.unplacedShipsInventory;
    let coordArray = coordParseReverse(stringCoord);
    let blankArray = [];
    if (rotate){
      coordArray[1]=coordArray[1]-1;
    } else {

      coordArray[0]=coordArray[0]-1;

    }


    let tempY = coordArray[1];
    let tempX = coordArray[0];

    for (let i = 0; i < (positionsToProject[positionsToProject.length-1]); i++) {
     if(rotate){
tempY = tempY + 1;
console.log("y rotated");

     } else {
tempX= tempX + 1;
console.log("x rotate");
     }
    //  let newTemp = tempX + i;
      let tempCoordArr = [tempX, tempY];

      blankArray.push(coordParse(tempCoordArr[0], tempCoordArr[1]));
    }

    return blankArray;
  }

  function toggleRotate(){

    this.classList.toggle("true");

   



  }
  function removeProjectedShip(e) {
    //e.currentTarget.style.setProperty("background-color", 'orange');
    let allGridItems = document.querySelectorAll(
      "#game-board-grid-1 > .game-board-grid-item"
    );
    allGridItems.forEach((element) => {
      if (element.style.backgroundColor == "green") {
        element.style.setProperty("background-color", "orange");
      }
    });
  }
  //I won't need this when I set up entering ship locations manually.
  function printShip(e, bool) {
    let rotateStatus = document.getElementById("rotate-button").classList =="true" ? true : false;
    let projectShipCoords = calculateShipToProject(e.currentTarget.id, gameController.gameboardTwo, rotateStatus);
    console.log(projectShipCoords);

    //  const gameBoardGridContainer = document.getElementById("game-board-grid-one");
    if (bool) {
      projectShipCoords.forEach((element) => {
        let coord = "#game-board-grid-1" + " > #" + element.toString();
        let square = document.querySelector(coord);

        square.style.setProperty("background-color", "blue");
      });
    } else {
      return projectShipCoords;
    }
  }

  function printShipFake(ship, number) {
    //  const gameBoardGridContainer = document.getElementById("game-board-grid-one");

    ship.position.forEach((element) => {
      let coord =
        "#game-board-grid-" + number.toString() + " > #" + element.toString();
      let square = document.querySelector(coord);

      square.style.setProperty("background-color", "blue");
    });
  }

  function printProjectedShip(array) {
    //  const gameBoardGridContainer = document.getElementById("game-board-grid-one");

    array.forEach((element) => {
      let coord = "#game-board-grid-1" + " > #" + element.toString();
      let square = document.querySelector(coord);
      if (square.style.backgroundColor !== "blue") {
        square.style.setProperty("background-color", "green");
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

    //let square = document.getElementById(coordsString);

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
    calculateShipToProject: calculateShipToProject,
    toggleRotate: toggleRotate
  };
})();

gameController.initializeGame();
//gameController.turnFlow();

for (let i = 0; i < gameController.gameboardTwo.shipsPresent.length; i++) {
  displayController.printShip(gameController.gameboardTwo.shipsPresent[i], 1);
}

for (let i = 0; i < gameController.gameboardOne.shipsPresent.length; i++) {
  displayController.printShip(gameController.gameboardOne.shipsPresent[i], 2);
}

/* Sample Ship list 
[{
lengthOfShip: 3,
   hits = [],

    //position is an array with the coordinates eg., [x1y1, x1y2, x1y3]
    position: [x1y1, x1y2, x1y3],

  sunk = false



},
{
lengthOfShip: 3,
   hits = [],

    //position is an array with the coordinates eg., [x1y1, x1y2, x1y3]
    position: [x1y1, x1y2, x1y3],

  sunk = false



},{
lengthOfShip: 3,
   hits = [],

    //position is an array with the coordinates eg., [x1y1, x1y2, x1y3]
    position: [x1y1, x1y2, x1y3],

  sunk = false



},{
lengthOfShip: 3,
   hits = [],

    //position is an array with the coordinates eg., [x1y1, x1y2, x1y3]
    position: [x1y1, x1y2, x1y3],

  sunk = false



},{
lengthOfShip: 3,
   hits = [],

    //position is an array with the coordinates eg., [x1y1, x1y2, x1y3]
    position: [x1y1, x1y2, x1y3],

  sunk = false



}





]

 



*/

//drawBoard
//create 2 Players and 2 gameboards
//Place 10 Ships, 5 each
//Present, accept, interpret, calculate, repeat
//Loop Begins

//Player 1 places piece
//hit or miss

//Player 2 places piece

//hit or miss

//etc. until all 5 ships are sunk first
