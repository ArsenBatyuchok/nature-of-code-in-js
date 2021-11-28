let m;

class Mover {
  constructor() {
    this.location = createVector(0, 0);
    this.velocity = createVector(1, 1);
    this.acceleration = createVector(0.001, 0.01);
  }

  update() {
    this.location.add(this.velocity);
    this.velocity = this.limit(this.velocity, 10);
    this.velocity.add(this.acceleration);
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

  // this custom method can be easily replaced by calling a `limit` method on a createVector
  limit(vector, max) {
    return createVector(Math.min(vector.x, max), Math.min(vector.y, max));
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
  // background(0);
  m.update();
  m.checkEdges();
  m.display();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
