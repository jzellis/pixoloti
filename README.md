# pixoloti

This is a tiny little utility that will display the current IP address of the machine along with any current MIDI messages. Displays the channel, the note or CC number, and the value. Currently it logs it to the console, but I'm going to rewrite it to display to an LCD, to make it super easy to use with a Raspberry Pi connected up to an Axoloti digital audio prototyping board.

The only really cool thing here is my little parser that unpacks the raw MIDI binary data. Other than that it's just a little utility for me to play around with on the Pi, since I'm not a Python dude.
