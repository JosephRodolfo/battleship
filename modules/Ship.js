//const coordParse   = require("./coordParse");

import {coordParse} from "./coordParse.js";
import {Gameboard} from "./Gameboard.js";

export class Ship {
  constructor(lengthOfShip, position) {
    this.lengthOfShip = lengthOfShip;
    this.hits = [];

    //position is an array with the coordinates eg., [x1y1, x1y2, x1y3]
    this.position = position;

    this.sunk = false;

    //	this.firstName = firstName;
    //	this.lastName = lastName;
  }
  //takes coordinate of attack. If hit, returns coordinate, if miss returns false;
  hit(x, y) {
    let coord = coordParse(x, y);


    if (this.hits.indexOf(coord) !== -1) {
     this.hits.push(coord);
      return coord;
    } else {
      return false;
      ////Ships should have a hit() function that takes a number and then marks that position as ‘hit’.
    }
  }
  //checks if hits.length is equal to lengthOfShip, i.e., if ship is sunk
  //returns true if so, false if not;
  isSunk() {
    if (this.hits.length == this.lengthOfShip) {
  //    this.sunk = true;
      return true;
    } else {
      return false;
    }
    //isSunk() should be a function that calculates it based on their length and whether all of their positions are ‘hit’.
  }
}
/*
module.exports = Ship;*/

/*   0    1    2    3    4    5   6   7
0  
1
2
3
4
5
6
7*/
