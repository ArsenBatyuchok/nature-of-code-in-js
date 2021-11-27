let vLocation, velocity;

function setup() {
  createCanvas(windowWidth, windowHeight);

  vLocation = createVector(0, 0);
  velocity = createVector(1, 2);
}

function draw() {
  vLocation.add(velocity);

  if (vLocation.x > width || vLocation.x < 0) {
    velocity.x *= -1;
  }
  if (vLocation.y > height || vLocation.y < 0) {
    velocity.y *= -1;
  }
  background(0)
  fill(255)
  circle(vLocation.x, vLocation.y, 50);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
