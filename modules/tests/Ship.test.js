const Ship = require("../Ship");
//let testShip = new Ship(3, [11, 12, 13], false);
//testShip.hits = [11, 13];

//let testShip2 = new Ship(4, [11, 12, 13, 14], false);
//testShip2.hits = [11, 12, 13, 14];
test("Test if Ship hit() function returns true or false on hit or miss", () => {
  let testShip = new Ship(3, ["x1y1", "x1y2", "x1y3"], false);
testShip.hits = ["x1y1", "x1y3"];
  expect(testShip.hit(1,3)).toBe("x1y3");
});

test("Test if Ship hit() function returns true or false on hit or miss", () => {
  
  let testShip = new Ship(3, ["x1y1", "x1y2", "x1y3"], false);
testShip.hits = ["x1y1", "x1y3"];

  expect(testShip.hit(3,5)).toBe(false);
});

test("Test if Ship isSunk() function counts correct number of hits to sink", () => {
  let testShip = new Ship(3, ["x1y1", "x1y2", "x1y3"], false);
testShip.hits = ["x1y1", "x1y3"];

  
  expect(testShip.isSunk()).toBe(false);
});

test("Test if Ship isSunk() function counts correct number of hits to sink", () => {
  let testShip2 = new Ship(4, ["x1y1", "x1y2", "x1y3", "x1y4"], false);
testShip2.hits = ["x1y1", "x1y2", "x1y3", "x1y4"];
  
  expect(testShip2.isSunk()).toBe(true);
});
