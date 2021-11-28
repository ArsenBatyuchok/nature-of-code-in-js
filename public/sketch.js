let m, pressedKey;

class Mover {
  constructor() {
    this.location = createVector(0, 0);
    this.velocity = createVector(1, 0);
    this.acceleration = 0;
  }

  update() {
    console.log(this.velocity);
    this.velocity.limit(10);
    this.location.add(this.velocity);
    this.velocity.x = this.velocity.x + this.acceleration;
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

  checkForKeyPressed() {
    if (!keyIsPressed) {
      this.velocity.x = 1;
    }

    if (keyCode === LEFT_ARROW) {
      this.velocity.x -= 0.02;
    } else if (keyCode === RIGHT_ARROW) {
      this.velocity.x += 0.02;
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
  translate(0, height/2)
  background(0);
  m.checkForKeyPressed();
  m.update();
  m.checkEdges();
  m.display();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {

}