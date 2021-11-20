let socket;
let address = 'http://localhost:3000';
let w;

class Walker {
  constructor() {
    this.x = width/2;
    this.y = height/2;
    this.noiseOff = 0;
  }

  display() {
    stroke(255, 204, 0);
    strokeWeight(2);
    point(this.x, this.y);
  }

  step() {
    const stepSize = map(noise(this.noiseOff), 0, 1, 0, 8);
    const stepX = random(-stepSize, stepSize);
    const stepY = random(-stepSize, stepSize);

    this.noiseOff += 0.01;

    this.x += stepX;
    this.y += stepY;
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
