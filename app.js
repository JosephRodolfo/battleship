import {drawBoard} from "./modules/drawBoard.js";
window.drawBoard = drawBoard;
import {Ship} from "./modules/Ship.js";
import {coordParse} from "./modules/coordParse.js";
import {Player} from "./modules/Player.js"
import {Gameboard} from "./modules/Gameboard.js"
//const coordParse = require("./coordParse");
//const Player = require("./Player");
//const Ship = require("./Ship");
//const Gameboard = require("./Gameboard");

//drawBoard(10, 10);
//let playerOne = new Player;
//let playerTwo = new Player;
//let gameboardOne = new Gameboard;
//let gameboardTwo = new Gameboard;

//drawBoard(10, 10, 1);
//drawBoard(10, 10, 2);
const gameController = (function () {
        let playerOne = new Player;
        let playerTwo = new Player;
        let gameboardOne = new Gameboard;
        let gameboardTwo = new Gameboard;
        let attackButton= document.getElementById("attack-button");
        let attackCoordsInput = document.getElementById("attack-coords-input");
    
    function initializeGame() {

        drawBoard(10, 10, 1);
        drawBoard(10, 10, 2);

        
   //     for (let i=0; i<5; i++) {
//create random ship list generator function
//set up prompt for player to place ships


         let ship1 =   gameboardOne.placeShip(3, ["x1y1", "x1y2", "x1y3"])
          let ship2=  gameboardOne.placeShip(4, ["x2y1", "x2y2", "x2y3"])
         let ship3=   gameboardOne.placeShip(4, ["x5y1", "x5y2", "x5y3", "x5y4"])
         let ship4=   gameboardOne.placeShip(5, ["x1y8 x1y7", "x1y6", "x1y5", "x1y4"])
         let ship5=   gameboardOne.placeShip(5, ["x3y1", "x3y2", "x3y3", "x3y4", "x3y5"])

         gameboardOne.recordPlacements(ship1);
         gameboardOne.recordPlacements(ship2);
         gameboardOne.recordPlacements(ship3);
         gameboardOne.recordPlacements(ship4);
         gameboardOne.recordPlacements(ship5);


         let ship11 =   gameboardTwo.placeShip(3, ["x1y1", "x1y2", "x1y3"])
         let ship22=  gameboardTwo.placeShip(4, ["x2y1", "x2y2", "x2y3"])
        let ship33=   gameboardTwo.placeShip(4, ["x5y1", "x5y2", "x5y3", "x5y4"])
        let ship44=   gameboardTwo.placeShip(5, ["x1y8", "x1y7", "x1y6", "x1y5", "x1y4"])
        let ship55=   gameboardTwo.placeShip(5, ["x3y1", "x3y2", "x3y3", "x3y4", "x3y5"])

        gameboardTwo.recordPlacements(ship11);
        gameboardTwo.recordPlacements(ship22);
        gameboardTwo.recordPlacements(ship33);
        gameboardTwo.recordPlacements(ship44);
        gameboardTwo.recordPlacements(ship55);



      //  }






      };

      function turnFlow(whichPlayer) {
      alert("Attack please");
      let attackCoords=attackCoordsInput.value;
      attackButton.addEventListener("click", submitAttack);

function submitAttack() {
     console.log(playerOne.attack(coordParseReverse(attackCoords)));
}
//console.log(nonUsedAttackCoords);


      }
        return {
        initializeGame: initializeGame,
        turnFlow: turnFlow,
        playerOne: playerOne,
        playerTwo: playerTwo,
        gameboardOne: gameboardOne,
        gameboardTwo: gameboardTwo

 
     
      
    };
  })();

  



  const displayController = (function () {



    function printShip(ship) {

       // const gameBoardGridContainer = document.getElementById("game-board-grid-one");

       ship.position.forEach((element) => {

        let square = document.getElementById(element);

        square.style.setProperty("background-color", "blue");
       })

        
    }








    return {
      printShip: printShip
    };
  })();

  gameController.initializeGame();
  gameController.turnFlow();
console.log(gameController)

for (let i=0; i<5; i++){
displayController.printShip(gameController.gameboardTwo.shipsPresent[i]);
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

