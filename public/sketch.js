let m;
let time = 0;

class Mover {
  constructor() {
    this.location = createVector(0, 0);
    this.velocity = createVector(1, 0);
    this.mouse = createVector(mouseX, mouseY);
    this.acceleration = 0;
  }

  update(time) {
    this.mouse.set(mouseX, mouseY);
    this.velocity.limit(10);
    this.location.add(this.velocity);
    this.acceleration = map(noise(time), 0, 1, -1, 4);
    this.velocity.x = 1 + this.acceleration;
  }

  checkEdges() {
    this.checkEdge('x', width);
    this.checkEdge('y', height);
  }

  checkEdge(axis, maxValue) {
    if (this.location[axis] > maxValue) {
      this.location[axis] = 0;
    } else if (this.location[axis] < 0) {
      this.location[axis] = maxValue;
    }
  }

  display() {
    fill(255);
    circle(this.location.x, this.location.y, 20);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  m = new Mover();
}

function draw() {
  time = time + 0.1;
  translate(0, height/2)
  background(0);
  m.update(time);
  m.checkEdges();
  m.display();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {

}