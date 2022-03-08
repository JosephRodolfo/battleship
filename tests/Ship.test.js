const Ship = require("../Ship");
//let testShip = new Ship(3, [11, 12, 13], false);
//testShip.hits = [11, 13];

//let testShip2 = new Ship(4, [11, 12, 13, 14], false);
//testShip2.hits = [11, 12, 13, 14];
test("Test if Ship hit() function returns true or false on hit or miss", () => {
  let testShip = new Ship(3, [11, 12, 13], false);
testShip.hits = [11, 13];
  expect(testShip.hit(13)).toBe(13);
});

test("Test if Ship hit() function returns true or false on hit or miss", () => {
  
  let testShip = new Ship(3, [11, 12, 13], false);
testShip.hits = [11, 13];

  expect(testShip.hit(35)).toBe(false);
});

test("Test if Ship isSunk() function counts correct number of hits to sink", () => {
  let testShip = new Ship(3, [11, 12, 13], false);
testShip.hits = [11, 13];

  
  expect(testShip.isSunk()).toBe(false);
});

test("Test if Ship isSunk() function counts correct number of hits to sink", () => {
  let testShip2 = new Ship(4, [11, 12, 13, 14], false);
testShip2.hits = [11, 12, 13, 14];
  
  expect(testShip2.isSunk()).toBe(true);
});
