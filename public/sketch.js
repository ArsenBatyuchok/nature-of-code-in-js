let socket;
let address = 'http://localhost:3000';
let w;

class Walker {
  constructor() {
    this.x = width/2;
    this.y = height/2;
  }

  display() {
    stroke(255, 204, 0);
    strokeWeight(2);
    point(this.x, this.y);
  }
  step() {
    const stepX = random(-1, 1);
    const stepY = random(-1, 1);

    this.x += stepX + randomGaussian(0, 5);
    this.y += stepY + randomGaussian(0, 5);
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
