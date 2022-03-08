const Gameboard = require("../Gameboard");

test("Test placeShip() function, returns new ship object", () => {
  let testBoard = new Gameboard();

  expect(testBoard.placeShip(5, ["x2y2", "x2y3", "x2y4", "x2y5", "x2y6", "x2y7"])).toEqual({
    lengthOfShip: 5,
    hits: [],
    position: ["x2y2", "x2y3", "x2y4", "x2y5", "x2y6", "x2y7"],
    sunk: false,
  });
});

test("Push (1) ship coordinates to gameboard memory", () => {
  let testBoard = new Gameboard();
  expect(
    testBoard.recordPlacements(testBoard.placeShip(5, ["x2y2", "x2y3", "x2y4", "x2y5", "x2y6"]))
  ).toEqual([
    {
      lengthOfShip: 5,
      hits: [],
      position: ["x2y2", "x2y3", "x2y4", "x2y5", "x2y6"],
      sunk: false,
    },
  ]);
});

test("Push (2) ship coordinates to gameboard memory", () => {
  let testBoard = new Gameboard();
  testBoard.recordPlacements(testBoard.placeShip(3, ["x1y3", "x1y4", "x1y5"]));
  testBoard.recordPlacements(testBoard.placeShip(5, ["x2y2", "x2y3", "x2y4", "x2y5", "x2y6"]));

  expect(testBoard.shipsPresent).toEqual([
    {
      lengthOfShip: 3,
      hits: [],
      position: ["x1y3", "x1y4", "x1y5"],
      sunk: false,
    },
    {
      lengthOfShip: 5,
      hits: [],
      position: ["x2y2", "x2y3", "x2y4", "x2y5", "x2y6"],
      sunk: false,
    }

  ]);
});

test("Test if ship was hit, expect a hit that pushes hit to ship.hits", () => {
  let testBoard = new Gameboard();
  testBoard.recordPlacements(testBoard.placeShip(5, ["x2y2", "x2y3", "x2y4", "x2y5", "x2y6"]));
  testBoard.recordPlacements(testBoard.placeShip(3, ["x1y3", "x1y4", "x1y5"]));

  expect(testBoard.receiveAttack(1, 3)).toEqual(   {
    lengthOfShip: 3,
    hits: ["x1y3"],
    position: ["x1y3", "x1y4", "x1y5"],
    sunk: false,
  });
});

test("Test if ship was hit, expect a hit that pushes hit to ship.hits", () => {
  let testBoard = new Gameboard();
  testBoard.recordPlacements(testBoard.placeShip(5, ["x2y2", "x2y3", "x2y4", "x2y5", "x2y6"]));
  testBoard.recordPlacements(testBoard.placeShip(3, ["x1y3", "x1y4", "x1y5"]));

  expect(testBoard.receiveAttack(2, 2)).toEqual(     {
    lengthOfShip: 5,
    hits: ["x2y2"],
    position: ["x2y2", "x2y3", "x2y4", "x2y5", "x2y6"],
    sunk: false,
  });
});


test("Test if ship was hit, expect a miss for this test which is pushed to this.missedShots", () => {
  let testBoard = new Gameboard();
  testBoard.recordPlacements(testBoard.placeShip(5, ["x2y2", "x2y3", "x2y4", "x2y5", "x2y6"]));
  testBoard.recordPlacements(testBoard.placeShip(3, ["x1y3", "x1y4", "x1y5"]));

  expect(testBoard.receiveAttack(3, 1)).toEqual(["x3y1"]);
});


test("Test checkForAllSunk(), returns true if all 5 ships sunk, false if not, in this case none sank", () => {
  let testBoard = new Gameboard();
  testBoard.recordPlacements(testBoard.placeShip(5, ["x2y2", "x2y3", "x2y4", "x2y5", "x2y6"]));
  testBoard.recordPlacements(testBoard.placeShip(3, ["x1y3", "x1y4", "x1y5"]));
  testBoard.recordPlacements(testBoard.placeShip(5, ["x2y2", "x2y3", "x2y4", "x2y5", "x2y6"]));
  testBoard.recordPlacements(testBoard.placeShip(3, ["x1y3", "x1y4", "x1y5"]));
  testBoard.recordPlacements(testBoard.placeShip(5, ["x2y2", "x2y3", "x2y4", "x2y5", "x2y6"]));



  expect(testBoard.checkForAllSunk()).toBe(false);
});

test("Test checkForAllSunk(), returns true if all 5 ships sunk, false if not, in this case all sunk", () => {
  let testBoard = new Gameboard();
  testBoard.recordPlacements(testBoard.placeShip(5, ["x2y2", "x2y3", "x2y4", "x2y5", "x2y6"]));
  testBoard.recordPlacements(testBoard.placeShip(3, ["x1y3", "x1y4", "x1y5"]));
  testBoard.recordPlacements(testBoard.placeShip(5, ["x2y2", "x2y3", "x2y4", "x2y5", "x2y6"]));
  testBoard.recordPlacements(testBoard.placeShip(3, ["x1y3", "x1y4", "x1y5"]));
  testBoard.recordPlacements(testBoard.placeShip(5, ["x2y2", "x2y3", "x2y4", "x2y5", "x2y6", "x2y7"]));

  testBoard.shipsPresent.forEach(element => element.sunk = true);


  expect(testBoard.checkForAllSunk()).toBe(true);
});



