//const Ship = require("./Ship");
//const coordParse = require("./coordParse");
import {Ship} from "./Ship.js";
import { coordParse } from "./coordParse.js";
import { coordParseReverse } from "./coordParseReverse.js";

export class Gameboard {
  constructor(name) {
    this.name = name,
    this.shipsPresent = [],

    this.missedShots = [],
    this.unplacedShipsInventory = [5, 4, 4, 3, 3]
  //  this.unplacedShipsInventory = [3]

  }
  //returns a ship object.
  placeShip(lengthOfShip, position) {
    let newShip = new Ship(lengthOfShip, position);

    return newShip;
    //Gameboards should be able to place ships at specific coordinates by calling the ship factory function.
  }

  recordPlacements(createdShip) {
    {
      this.shipsPresent.push(createdShip);
    }
    return this.shipsPresent;
  }

  receiveAttack(x, y) {
    let coord = coordParse(x, y);

    for (let i = 0; i < this.shipsPresent.length; i++) {
      if (this.shipsPresent[i].position.includes(coord)) {
        this.shipsPresent[i].hits.push(coord);
        return this.shipsPresent[i];
      }  
    }

    this.missedShots.push(coord);
    return false;

    //  Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
  }
   checkForOccupied(array, gameboard) {
    if (array == undefined) {
      return;
    }
    for (let i = 0; i < gameboard.shipsPresent.length; i++) {
      for (let t = 0; t < array.length; t++) {
        if (gameboard.shipsPresent[i].position.includes(array[t])) {
          alert("Already a ship here!");
          return false;
        }
      }
    }
    return true;
  }

  missedAttack(coord) {
    //Gameboards should keep track of missed attacks so they can display them properly.
    //This was from odin project description but I think I initially misunderstood it. the gameboard
    //object can track this via the missedShots property which is an array, so it doesn't need to be
    //its own function
  }


  checkForOffBoard(array) {
    for (let i = 0; i < array.length; i++) {
      let temp = coordParseReverse(array[i]);
      if (temp[0] > 9 || temp[0] < 0 || temp[1] > 9 || temp[0] < 0) {
        alert("ship is off board, try again");
        return false;
      }
    }
    return true;
  }

  checkForAllSunk(numberOfShips) {
    let shipsSunk = 0;
    this.shipsPresent.forEach((element) => {
      if (element.sunk) {
        shipsSunk++;
      }
    });

   return shipsSunk >= numberOfShips ? true : false;
   // return winOrLoss;
  }
}

//module.exports = Gameboard;
