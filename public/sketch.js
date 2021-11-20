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

  getRandomStepSize() {
    const r1 = random(0, 10);
    const probability = r1 * r1;
    const r2 = random(0, 10);

    if (r2 < probability) {
      return r2;
    }

    return this.getRandomStepSize();
  }

  step() {
    const stepSize = this.getRandomStepSize();
    const stepX = random(-stepSize, stepSize);
    const stepY = random(-stepSize, stepSize);

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
