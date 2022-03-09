const coordParse = require("../coordParse");

test("test function coordParse to see if it returns a string in format e.g. x7y11 from x y inputs", () => {
  expect(coordParse(5, 7)).toBe("x5y7");
});
