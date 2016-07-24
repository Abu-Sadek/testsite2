var can = document.getElementById('canvas1');
var ctx = can.getContext('2d');

ctx.translate(20,20); // just to get it away from the edge


var greenPart = ctx.createLinearGradient(0,0,0,100);
greenPart.addColorStop(0, '#3499DA');
greenPart.addColorStop(1, '#32ACB3');

var whitePart = ctx.createLinearGradient(0,0,0,100);
whitePart.addColorStop(0, '#2FBF8B');
whitePart.addColorStop(1, '#32ACB3');


var width = 20;
ctx.lineWidth = width;

// First we make a clipping region for the left half
ctx.save();
ctx.beginPath();
ctx.rect(-width, -width, 50+width, 100 + width*2);
ctx.clip();

// Then we draw the left half
ctx.strokeStyle = greenPart;
ctx.beginPath();
ctx.arc(50,50,50,0,Math.PI*2, false);
ctx.stroke();

ctx.restore(); // restore clipping region to default

// Then we make a clipping region for the right half
ctx.save();
ctx.beginPath();
ctx.rect(50, -width, 50+width, 100 + width*2);
ctx.clip();

// Then we draw the right half
ctx.strokeStyle = whitePart;
ctx.beginPath();
ctx.arc(50,50,50,0,Math.PI*2, false);
ctx.stroke();

ctx.restore(); // restore clipping region to default
