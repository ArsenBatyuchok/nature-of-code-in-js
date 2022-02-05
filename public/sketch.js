let p, s;

class Planet {
  constructor(size) {
    this.size = size;
  }

  update() {
    push();
      specularColor(255, 0, 0);
      pointLight(255, 0, 0, 0, -this.size * 3, this.size * 3);
      specularColor(0, 255, 0);
      pointLight(0, 255, 0, 0, this.size * 3, this.size * 3);
      ambientMaterial(255);
      rotateY(frameCount * 0.01);
      sphere(this.size);
    pop();
  }
}

class Sputnik {
  constructor(size, orbit) {
    this.size = size;
    this.orbit = orbit;
  }

  update() {
    push();
      specularMaterial(255);
      translate(sin(frameCount * 0.01) * 200, cos(frameCount * 0.01) * 200, sin(frameCount * 0.01) * 150);
      sphere(this.size);
    pop();
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(0);
  noStroke();
  p = new Planet(150);
  s = new Sputnik(10, 150);
}

function draw() {
  orbitControl();
  background(`rgba(0, 0, 0, 0.5)`);
  ambientLight(50);
  p.update();
  s.update();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}