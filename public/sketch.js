const STEP = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);

  vLocation = createVector(0, 0);
  velocity = createVector(15, 10, 50);
}

function draw() {
  background(255)
  for (let x = 0; x < width; x+=STEP) {
    for (let y = 0; y < height; y+=STEP) {
      const mouse = createVector(mouseX, mouseY);
      const position = createVector(x, y);
      const center = createVector(x, y);

      mouse.sub(center);
      mouse.normalize();
      mouse.mult(35);

      drawArrow(
          position,
          mouse,
          color(
              map(mouseY, 0, height, 0, 255),
              map(mouseX, 0, height, 255, 0),
              map(x, 0, width, 0, 255)));
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawArrow(base, vec, color) {
  push();
    stroke(color);
    strokeWeight(3);
    fill(color);
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 4;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}