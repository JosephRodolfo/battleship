const Gameboard = require("../Gameboard");

test("Test placeShip() function, returns new ship object", () => {
  let testBoard = new Gameboard();

  expect(testBoard.placeShip(5, [22, 23, 24, 25, 26, 27])).toEqual({
    lengthOfShip: 5,
    hits: [],
    position: [22, 23, 24, 25, 26, 27],
    sunk: false,
  });
});

test("Push (1) ship coordinates to gameboard memory", () => {
  let testBoard = new Gameboard();
  expect(
    testBoard.recordPlacements(testBoard.placeShip(5, [22, 23, 24, 25, 26]))
  ).toEqual([
    {
      lengthOfShip: 5,
      hits: [],
      position: [22, 23, 24, 25, 26],
      sunk: false,
    },
  ]);
});

test("Push (2) ship coordinates to gameboard memory", () => {
  let testBoard = new Gameboard();
  testBoard.recordPlacements(testBoard.placeShip(3, [13, 14, 15]));
  testBoard.recordPlacements(testBoard.placeShip(5, [22, 23, 24, 25, 26]));

  expect(testBoard.shipsPresent).toEqual([
    {
      lengthOfShip: 3,
      hits: [],
      position: [13, 14, 15],
      sunk: false,
    },
    {
      lengthOfShip: 5,
      hits: [],
      position: [22, 23, 24, 25, 26],
      sunk: false,
    }

  ]);
});

test("Test if ship was hit, expect a hit that pushes hit to ship.hits", () => {
  let testBoard = new Gameboard();
  testBoard.recordPlacements(testBoard.placeShip(5, [22, 23, 24, 25, 26]));
  testBoard.recordPlacements(testBoard.placeShip(3, [13, 14, 15]));

  expect(testBoard.receiveAttack(13)).toEqual(   {
    lengthOfShip: 3,
    hits: [13],
    position: [13, 14, 15],
    sunk: false,
  });
});

test("Test if ship was hit, expect a hit that pushes hit to ship.hits", () => {
  let testBoard = new Gameboard();
  testBoard.recordPlacements(testBoard.placeShip(5, [22, 23, 24, 25, 26]));
  testBoard.recordPlacements(testBoard.placeShip(3, [13, 14, 15]));

  expect(testBoard.receiveAttack(22)).toEqual(     {
    lengthOfShip: 5,
    hits: [22],
    position: [22, 23, 24, 25, 26],
    sunk: false,
  });
});


test("Test if ship was hit, expect a miss for this test which is pushed to this.missedShots", () => {
  let testBoard = new Gameboard();
  testBoard.recordPlacements(testBoard.placeShip(5, [22, 23, 24, 25, 26]));
  testBoard.recordPlacements(testBoard.placeShip(3, [13, 14, 15]));

  expect(testBoard.receiveAttack(31)).toEqual([31]);
});


