// Grabbed the original from https://codepen.io/P3R0/pen/MwgoKv

var c = document.getElementById("c");
var ctx = c.getContext("2d");

//making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;
//
var tokens = "ｧｨｩｪｫｬｭｮｯｱｲｳｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾇﾈﾉﾊﾋｦﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾜﾝ";
var tokens2 = atob("TjQ0IDQuNDkxIFcxMjMgMi43NjUg")

var secret_ratio = 0.02;

var font_size = 24;
var columns = c.width/font_size; //number of columns for the rain
//an array of drops - one per column
var drops = [];
var offset = []
var tracks = []
var speed = []
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for(var i = 0; i < columns; i++) {
    drops[i] = -Math.floor(Math.random() * 150);
    speed[i] = 1 + Math.floor(Math.random() * Math.random() * 6);
    offset[i] = Math.floor(Math.random() * tokens2.length)
    if (Math.random() < secret_ratio) {
        tracks[i] = true;
    } else {
        tracks[i] = false;
    }
}

var counter = 0;

//drawing the characters
function draw()
{
    //Black BG for the canvas
    //translucent BG to show trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);

    //looping over drops
    for(var i = 0; i < drops.length; i++)
    {

        var text;
	//a random tokens character to print
        if (counter > 400 && (tracks[i] || 11600 < (counter % 12000))) {
            ctx.font = (font_size - 1) + "px Nanum Gothic Coding";
            text = tokens2[(offset[i] + counter) % tokens2.length]
        } else {
            ctx.font = font_size + "px monospace";
	    text = tokens[Math.floor(Math.random() * tokens.length)];
        }
	//var text = tokens[Math.floor(Math.random()*tokens.length)];
	//x = i*font_size, y = value of drops[i]*font_size
        if (Math.random() > 0.7) {
            ctx.fillStyle = "#0CC"; //blue-green text
        } else {
            ctx.fillStyle = "#0FA"; //green text
        }
	ctx.fillText(text, i*font_size, drops[i]*font_size);

	//sending the drop back to the top randomly after it has crossed the screen
	//adding a randomness to the reset to make the drops scattered on the Y axis
	if(drops[i]*font_size > c.height && Math.random() > 0.975) {
	    drops[i] = 0;
            speed[i] = 1 + Math.floor(Math.random() * Math.random() * 6);
            offset[i] = Math.floor(Math.random() * tokens2.length)
            if (Math.random() < secret_ratio){
                tracks[i] = true;
            } else {
                tracks[i] = false;
            }
        }

	//incrementing Y coordinate
        if (counter % speed[i] == 0) {
	    drops[i]++;
        }
    }
    counter++;
}

setInterval(draw, 40);
