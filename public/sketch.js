let vLocation, velocity;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(0)

  vLocation = createVector(0, 0, 0);
  velocity = createVector(15, 10, 50);
}

function draw() {
  vLocation.add(velocity);
  // translate(0, 0, 0);

  if (vLocation.x > width || vLocation.x < 0) {
    velocity.x *= -1;
  }
  if (vLocation.y > height || vLocation.y < 0) {
    velocity.y *= -1;
  }

  if (vLocation.z < -3500 || vLocation.z > 0) {
    velocity.z *= -1;
  }
  push();
    stroke(map(vLocation.x, 0, width, 0, 255), map(vLocation.y, 0, height, 0, 255), map(vLocation.z, 0, 3500, 0, 255))
    noFill()
    translate(vLocation.x - width/2, vLocation.y - height/2, vLocation.z);
    sphere(50, 3, 3);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
