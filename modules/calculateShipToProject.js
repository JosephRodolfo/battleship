//Function takes a single random coordinate and orientation and produces array of where the ship should go
//used for both computer and human

import { coordParseReverse } from "./coordParseReverse.js";
import { coordParse } from "./coordParse.js";
export function calculateShipToProject(stringCoord, gameboard, rotate) {
    let positionsToProject = gameboard.unplacedShipsInventory;
    let coordArray = coordParseReverse(stringCoord);
    if (coordArray == undefined) {
      return;
    }
    let blankArray = [];
    if (rotate) {
      coordArray[1] = coordArray[1] - 1;
    } else {
      coordArray[0] = coordArray[0] - 1;
    }

    let tempY = coordArray[1];
    let tempX = coordArray[0];

    for (
      let i = 0;
      i < positionsToProject[positionsToProject.length - 1];
      i++
    ) {
      if (rotate) {
        tempY = tempY + 1;
      } else {
        tempX = tempX + 1;
      }
      let tempCoordArr = [tempX, tempY];

      blankArray.push(coordParse(tempCoordArr[0], tempCoordArr[1]));
    }

    return blankArray;
  }