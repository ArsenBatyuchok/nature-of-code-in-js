let socket;
let address = 'http://localhost:3000';
let w;

class Walker {
  constructor() {
    this.x = width/2;
    this.y = height/2;
    this.xOff = 0;
    this.yOff = 10;
  }

  display() {
    stroke(255, 204, 0);
    strokeWeight(2);
    point(this.x, this.y);
    // NOTE: uncomment the next line to see the same drawing even after page refresh
    // noiseSeed(5);
  }

  step() {
    const stepSize = 4;
    const stepX = map(noise(this.xOff), 0, 1, -stepSize, stepSize);
    const stepY = map(noise(this.yOff), 0, 1, -stepSize, stepSize);

    this.x += stepX;
    this.y += stepY;

    this.xOff += 0.1;
    this.yOff += 0.1;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  w = new Walker();

  socket = io();
  socket.on('mouse', incomingMouse);
}

function draw() {
  w.step();
  w.display();
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
