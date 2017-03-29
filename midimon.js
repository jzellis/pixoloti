var midi = require('midi'),
Lcd = require('lcd'),
lcd = new Lcd({
rs: 25,
e: 24,
data: [23, 17, 21, 22],
cols: 16,
rows: 2
}),
codes = {
  9: "",
  8: "",
  11: "CC"
},
notes = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

// Set up a new input.
var input = new midi.input();

var ip = require("ip");



function dec2bin(dec){
    return (dec >>> 0).toString(2);
}

// Count the available input ports.
var portCount = input.getPortCount();
console.log(portCount + " ports open");
let ports = [];

console.log("Ch Note/CC Val");

	lcd.on('ready', function() {
			lcd.clear();
		  lcd.setCursor(0,0);
	lcd.print(ip.address());
	  });

for(var i = 0; i < portCount; i++){
	console.log(input.getPortName(i));
  ports[i] = new midi.input();
  
  ports[i].on('message', function(deltaTime, msg) {
console.log(msg);
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


  }
  			//~ lcd.clear();
		  //~ lcd.setCursor(0,0);
	//~ lcd.print(ip.address());
	lcd.setCursor(0,1);
	lcd.print(formatted, function(err){
		if(err) throw err});
console.log(formatted);
});
  ports[i].openPort(i);

}


process.on('SIGINT', function(){
// Close the port when done.
// input.closePort();
for(var i = 0; i < portCount; i++){
ports[i].closePort()
}
lcd.clear();
lcd.close();
process.exit();
});
