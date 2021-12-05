let m;

class Mover {
  constructor() {
    this.location = createVector(0, 0);
    this.velocity = createVector(1, 1);
    this.mouse = createVector(mouseX, mouseY);
    this.acceleration = createVector(0, 0);
    this.direction = createVector(0, 0);
  }

  setPropertiesOnUpdate() {
    this.velocity.limit(10);
    this.mouse.set(mouseX, mouseY);
    this.direction = p5.Vector.sub(this.mouse, this.location);
  }

  update() {
    this.setPropertiesOnUpdate();
    this.location.add(this.direction);
    this.acceleration.add(random(-3, 3), random(-3, 3));
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
  translate(0, 0);
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