const Player = require("../Player");

test("Test randomAttack() function, returns random, not previously used, valid coords()", () => {
  let testPlayer = new Player();

  expect(testPlayer.randomAttack()).toBeLessThan(100);
});




