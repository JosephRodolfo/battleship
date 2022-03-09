//const Ship = require("./Ship");
//const Gameboard = require("./Gameboard")
//const coordParse = require("./coordParse")


import {coordParse} from "./coordParse.js"
import {Gameboard} from "./Gameboard.js"
import {Ship} from "./Ship.js"


//Potentially add in ability to name players later
export class Player {
  constructor() {
      this.playedCoords = []
 
  }
//attack method records coordinate of attack; if not previously done, returns coordinates to be used
//in gameboard methods;
  attack(x, y){
  let coord=  coordParse(x, y);

    if(this.playedCoords.includes(coord)){

        alert("Already played these coordinates");
    } else {

        this.playedCoords.push(coord);
        return coord;

    }


  }

  randomAttack()   {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
      

     

let x=getRandomInt(10);
let y=getRandomInt(10);

let coord=x.toString().concat(y.toString());
let coordFinal =   parseInt(coord);


if(!(this.playedCoords.includes(coordFinal))){

return coordFinal;} else {


    this.randomAttack();
}
  }


}

//module.exports = Player;