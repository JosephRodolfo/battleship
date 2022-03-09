//const Ship = require("./Ship");
//const coordParse = require("./coordParse");

export class Gameboard {
  constructor() {
    this.shipsPresent = [];

    this.missedShots = [];
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
    return this.missedShots;

    //  Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
  }

  missedAttack(coord) {
    //Gameboards should keep track of missed attacks so they can display them properly.
    //This was from odin project description but I think I initially misunderstood it. the gameboard
    //object can track this via the missedShots property which is an array, so it doesn't need to be
    //its own function
  }

  checkForAllSunk() {
    let shipsSunk = 0;
    this.shipsPresent.forEach((element) => {
      if (element.sunk) {
        shipsSunk++;
      }
    });

   return shipsSunk >= 5 ? true : false;
   // return winOrLoss;
  }
}

//module.exports = Gameboard;
