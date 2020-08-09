// Grabbed the original from https://codepen.io/P3R0/pen/MwgoKv

var c = document.getElementById("c");
var ctx = c.getContext("2d");

//making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;

var tokens = "0123456789ABCDEF";
var tokens2 = atob("TEFUNDQuNjMyNDUsTE9ORy0xMjMuMTAxOTc=")

var font_size = 10;
var columns = c.width/font_size; //number of columns for the rain
//an array of drops - one per column
var drops = [];
var offset = []
var tracks = []
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for(var x = 0; x < columns; x++) {
    drops[x] = -Math.floor(Math.random() * 150);
    offset[x] = Math.floor(Math.random() * tokens.length)
    if (Math.random() > 0.9) {
        tracks[x] = true;
    } else {
        tracks[x] = false;
    }
}




//drawing the characters
function draw()
{
    //Black BG for the canvas
    //translucent BG to show trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#0F0"; //green text
    ctx.font = font_size + "px monospace";
    //looping over drops
    for(var i = 0; i < drops.length; i++)
    {

        var text;
	//a random tokens character to print
        if (tracks[i]) {
            text = tokens2[(offset[i] + Math.floor(drops[i])) % tokens2.length]
        } else {
	    text = tokens[Math.floor(Math.random() * tokens.length)];
        }
	//var text = tokens[Math.floor(Math.random()*tokens.length)];
	//x = i*font_size, y = value of drops[i]*font_size
	ctx.fillText(text, i*font_size, drops[i]*font_size);

	//sending the drop back to the top randomly after it has crossed the screen
	//adding a randomness to the reset to make the drops scattered on the Y axis
	if(drops[i]*font_size > c.height && Math.random() > 0.975) {
	    drops[i] = 0;
            offset[i] = Math.floor(Math.random() * tokens.length)
        }

	//incrementing Y coordinate
	drops[i]++;
    }
}

setInterval(draw, 33);
