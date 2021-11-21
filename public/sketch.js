let socket;
let address = 'http://localhost:3000';
let xOff = 0;
let yOff = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noiseDetail(8, 0.65);


  socket = io();
  socket.on('mouse', incomingMouse);
}

function draw() {
  noStroke();
  xOff = xOff + 0.01;
  yOff = yOff + 0.01;
  for (let x = 0; x < 300; x+=3) {
    for (let y = 0; y < 250; y+=3) {
      const n = map(noise(x/150 + xOff, y/25), 0, 1, 0, 255);
      fill(color(n, n, n));
      rect(x, y, 3, 3);
    }
  }
  translate(width/2, height/2);
}

function incomingMouse(data) {
  fill(255);
  circle(data.x, data.y, 20);
}

function mouseDragged() {
  let data = {
    x: mouseX,
    y: mouseY
  }

  socket.emit('mouse', data);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
