let socket;
let address = 'http://localhost:3000';
const scl = 20;
let cols, rows;
const terrain = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  cols = width / scl;
  rows = height / scl;

  for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 0;
    }
  }

  socket = io();
  socket.on('mouse', incomingMouse);
}

function draw() {
  stroke(1);

  rotateX(PI / 3);
  fill(200, 200, 200, 150);

  let yOff = 0;

  for (let y = 0; y < rows; y++) {
    let xOff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xOff, yOff), 0, 1, -100, 100);
      xOff += 0.2;
    }
    yOff += 0.2;
  }

  background(0);
  translate(0, 50);
  rotateX(PI / 3);
  fill(200, 200, 200, 150);
  translate(-width / 2, -height / 2);

  for (let y = 0; y < rows; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
  // translate(width/2, height/2);
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
