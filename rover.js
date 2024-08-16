const Message = require("./message");
const Command = require("./command.js");

class Rover {
  constructor(position) {  //set this.position to positon Sets this.mode to Normal, sets default value for gerarotWatts
    this.mode = "NORMAL";
    this.generatorWatts = 110;
    this.position = position;
  }
// new object for processing each Command o.
// 1 property
  modeChangeRover(commandValue) {     
    let roverProcessCommand = {     
      completed: false,               
    };
// Mode Change uncessful, status will appear to false
    if (this.mode === commandValue) {
      roverProcessCommand.completed = false;
      // if successful, it will set to true 
    } else {
      this.mode = commandValue;
      roverProcessCommand.completed = true;
    }

    return roverProcessCommand;
  }
// will have 2 properties: completed rover status
  statusCheckRover() {
    let roverProcessCommand = {
      completed: false,
    };
// object created for when command is status check
// 3 properties
    let roverStatusProperties = {
      mode: this.mode,
      generatorWatts: this.generatorWatts,
      position: this.position,
    };

    roverProcessCommand.completed = true;
    roverProcessCommand.roverStatus = roverStatusProperties;

    return roverProcessCommand;
  }

  moveRover(commandValue) {
    let roverProcessCommand = {
      completed: false,
    };

    if (this.mode === "LOW_POWER") {
      roverProcessCommand.completed = false;
    }

    if (this.mode === "NORMAL") {
      this.position = commandValue;
      roverProcessCommand.completed = true;
    }

    return roverProcessCommand;
  }
// roverResults.resukts [] is an array of objects , respond to command objects
  receiveMessage(messageObject) {
    let i = 0;

    let roverResults = {
      message: messageObject.message,
      results: [],
    };
// while loop through i until it is less than the lenght of commands array in messageobject
// executes until code with boolean condition is executed
    while (i < messageObject.commands.length) { 
      let aCommand = messageObject.commands[i];

      if (aCommand.commandType === "MODE_CHANGE") {
        roverResults.results.push(this.modeChangeRover(aCommand.value));
      }
// commandtype of aCommand is status_check the metheod this.status_check is called with no arguments. then its pushed into results 
// array of roverResults 
      if (aCommand.commandType === "STATUS_CHECK") {
        roverResults.results.push(this.statusCheckRover());
      }

      if (aCommand.commandType === "MOVE") {
        roverResults.results.push(this.moveRover(aCommand.value));
      }

      i++;
    }
    return roverResults;
  }
}
// message oject will contain message, name and result array 

let commands = [
  new Command("MODE_CHANGE", "LOW_POWER"),
  new Command("STATUS_CHECK"),
];
let messageObj = new Message("Test message with Two commands", commands);

let rover = new Rover(98382);
let response = rover.receiveMessage(messageObj);

// console.log(JSON.stringify(response, null, 2));

module.exports = Rover;
