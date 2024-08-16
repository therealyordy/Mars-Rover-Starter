const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

// Test 1

describe("Command class", function () {
  it("throws error if command type is NOT passed into constructor as the first parameter", function () { //"it" is same as test, toThrow expects to throw an error
    //This test was already provided.
    expect(function () {
      new Command();
    }).toThrow(new Error("Command type required."));
  });
});

// Test 2
test("constructor sets command type", function () {
  let objCommand = new Command("move", 500);
  expect(objCommand.commandType).toBe("move");
});

//Test 3

test("constructor sets a value passed in as the 2nd argument", function () {
  let objCommand = new Command("move", 500);
  expect(objCommand.value).toBe(500);
});
