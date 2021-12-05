let m;

class Mover {
  constructor() {
    this.location = createVector(0, 0);
    this.velocity = createVector(1, 1);
    this.mouse = createVector(mouseX, mouseY);
    this.acceleration = createVector(0, 0);
    this.direction = createVector(0, 0);
  }

  setDirectionProperties() {
    this.mouse.set(mouseX, mouseY);
    this.direction = p5.Vector.sub(this.mouse, this.location);
    this.direction.normalize();
  }

  update() {
    this.velocity.limit(10);
    this.setDirectionProperties();
    const distance = p5.Vector.sub(this.mouse, this.location).mag();
    this.direction.mult(map(distance, Math.max(width, height), 0, 0, 1));
    this.acceleration = this.direction;
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
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
  background(0);
  m.update();
  m.checkEdges();
  m.display();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {

}