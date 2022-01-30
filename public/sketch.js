const fishes = [];
let time = 0.01;
const waveTime = 1000;

// should pass start position and velocity
// should preserve direction

class Fish {
  constructor(location, velocity, size, color) {
    this.location = location;
    this.velocity = velocity;
    this.acceleration = createVector(0, 0);
    this.lastRender = Date.now();
    this.rads = velocity.heading();
    this.size = size;
    this.color = color;
  }

  update() {
    const diff = Date.now() - this.lastRender;
    this.lastRender += diff;
    this.rads += diff / waveTime * (Math.PI * 2);
    const vxs = this.velocity.x >= 0 ? 1 : -1;
    const vys = this.velocity.y >= 0 ? 1 : -1;
    this.acceleration.x = vxs * Math.abs(Math.cos(this.rads));
    this.acceleration.y = vys * Math.abs(Math.sin(this.rads));

    const v = this.velocity.copy();
    v.limit(20);
    v.add(this.acceleration);
    this.location.add(v);
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
    fill(this.color);
    circle(this.location.x, this.location.y, this.size);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke()

  for (let i = 0; i < 20; i += 1) {
    fishes.push(new Fish(
      // location
      createVector(random(0, width), random(0, height)),
      // velocity
      createVector(random(5, -5), random(5, -5)),
      // fish size
      random(4, 16),
      // color
      color(255, 204, 0)
    ));
  }
}

function draw() {
  time += 0.01;
  background('rgba(0, 0, 0, 0.15)');
  fishes.forEach(f => {
    f.update();
    f.checkEdges();
    f.display();
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {

}