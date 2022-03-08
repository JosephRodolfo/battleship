const Ship = require("./Ship");
const Gameboard = require("./Gameboard")

class Player {
  constructor() {
      this.playedCoords = []
 
  }
//attack method records coordinate of attack; if not previously done, returns coordinates to be used
//in gameboard methods;
  attack(coord){

    if(this.playedCoords.includes(coord)){

        alert("Already played these coordinates")
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

module.exports = Player;