const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

// Test 7

describe("Rover class", function() {
  test("constructor sets position and default values for mode and generatorWatts", function(){
    let objRover = new Rover(2000);
    expect(objRover.position).toBe(2000); //number
    expect(objRover.mode).toBe('NORMAL'); //string Normal
    expect(objRover.generatorWatts).toBe(110); // defaul to number 110
  });

  // Test 8 

  test("response returned by receiveMessage contains the name of the message", function(){
    let objRover = new Rover(98382);
    let objCommand = new Command(new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK'));
    let msgObj = new Message("My Message", objCommand);
    expect(objRover.receiveMessage(msgObj).message).toEqual("My Message"); //parameter message is object of Message class
  });

  // Test 9

  test("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let objRover = new Rover(2000);
    let objCommand = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let msgObj = new Message("My Message", objCommand);
    
    let roverReceiveCommandLength = objRover.receiveMessage(msgObj).results.length;
    expect(roverReceiveCommandLength).toEqual(2);   
    });

    // Test 10

    test("responds correctly to the status check command", function (){ 
      let testStatusObj = {
        mode : "NORMAL",
        generatorWatts : 110,
        position : 2000
      };
    
      let objRover = new Rover(2000);
      let objCommand = [new Command('STATUS_CHECK')];
      let msgObj = new Message("My Message", objCommand);
      expect(objRover.receiveMessage(msgObj).results[0].completed).toEqual(true);
      expect(objRover.receiveMessage(msgObj).results[0].roverStatus).toEqual(testStatusObj);
    });

    // Test 11

    test("responds correctly to mode change command", function(){
      let objRover = new Rover(2000);
      let objCommand = [new Command('MODE_CHANGE', 'LOW_POWER')];
      let msgObj = new Message("My Message", objCommand);  
      expect(objRover.receiveMessage(msgObj).results[0].completed).toBe(true);
      expect(objRover.mode).toBe('LOW_POWER')
       
      objCommand = [new Command('MODE_CHANGE', 'LOW_POWER')];
      msgObj = new Message("My Message", objCommand);
      expect(objRover.receiveMessage(msgObj).results[0].completed).toBe(false);
      expect(objRover.mode).toBe('LOW_POWER')
    });

    // Test 12

    test("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
      let objRover = new Rover(2000);
      let objCommand = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 9000)];
      let msgObj = new Message("My Message", objCommand);  
      expect(objRover.receiveMessage(msgObj).results[1].completed).toBe(false);   // made change
      expect(objRover.position).toBe(2000);
    });

    // Test 13

    test('responds with the position for the move command', function(){
      let objRover = new Rover(2000);
      let objCommand = [ new Command('MOVE', 9000)];
      let msgObj = new Message("My Message", objCommand); 
      expect(objRover.receiveMessage(msgObj).results[0].completed).toBe(true);
      expect(objRover.position).toBe(9000);
    });
    
  });
