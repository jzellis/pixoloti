var midi = require('midi'),
codes = {
  9: "",
  8: "",
  11: "CC"
},
notes = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

// Set up a new input.
var input = new midi.input();

var ip = require("ip");
console.log ( ip.address() );


function dec2bin(dec){
    return (dec >>> 0).toString(2);
}

// Count the available input ports.
var portCount = input.getPortCount();
console.log(portCount + " ports open");
let ports = [];

console.log("Ch Note/CC Val");


for(var i = 0; i < portCount; i++){
  ports[i] = new midi.input();
  ports[i].on('message', function(deltaTime, msg) {

event = parseInt((dec2bin(msg[0]) + "0000").substring(0,4),2);
channel = parseInt("0000" + dec2bin(msg[0]).substring(4),2);
if(event != 8){
    if(event == 9){
      rawNote = parseInt(msg[1]);
      var octave = parseInt((rawNote / 12) - 1);
      note = notes[parseInt(rawNote % 12)];

      value = note + octave;
    }else{
      value = msg[1];
    }
    formatted = channel + " " + codes[event] + value + " " + msg[2]
console.log(formatted);
}
  });
  ports[i].openPort(i);

}

// Close the port when done.
// input.closePort();
