//const Ship = require("./Ship");
//const Gameboard = require("./Gameboard")
//const coordParse = require("./coordParse")

import { coordParse } from "./coordParse.js";
import { Gameboard } from "./Gameboard.js";
import { Ship } from "./Ship.js";

//Potentially add in ability to name players later
export class Player {
  constructor(name) {
    (this.playedCoords = []), (this.name = name);
  }
  //attack method records coordinate of attack; if not previously done, returns coordinates to be used
  //in gameboard methods;
  attack(x, y) {
    let coord = coordParse(x, y);

    if (this.playedCoords.includes(coord)) {
      alert(this.playedCoords + "Already played these coordinates");
      return false;
    } else {
      this.playedCoords.push(coord);
      return coord;
    }
  }

  getRandomCoords() {
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    let x = getRandomInt(10);
    let y = getRandomInt(10);
    let parsedCoord = coordParse(x, y);

    if (!(this.playedCoords.includes(parsedCoord))) {
      this.playedCoords.push(parsedCoord);
      console.log(parsedCoord);
      return parsedCoord;
    } else {
      console.log("retry");
     return this.getRandomCoords();
    }
  }
}

//module.exports = Player;
