function setup() {
  createCanvas(windowWidth, windowHeight);
  // background(0)

  vLocation = createVector(0, 0);
  velocity = createVector(15, 10, 50);
}

function draw() {
  background(255)
  const mouse = createVector(mouseX, mouseY);
  const center = createVector(width/2, height/2);

  mouse.sub(center)
  mouse.normalize()
  mouse.mult(50)

  translate(width/2, height/2);

  line(0, 0, mouse.x, mouse.y)

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
