let p, s = [];

class Planet {
  constructor(size) {
    this.size = size;
    this.r = random(255);
    this.g = random(100, 200);
    this.b = random(100, 200);
    this.r1 = random(255);
    this.g1 = random(100, 200);
    this.b1 = random(100, 200);
  }

  update() {
    push();
      pointLight(this.r, this.g, this.b, 0, -this.size * 3, this.size * 3);
      pointLight(this.r1, this.g1, this.b1, 0, this.size * 3, this.size * 3);
      ambientMaterial(255);
      sphere(this.size);
    pop();
  }
}

class Sputnik {
  constructor(planetSize) {
    this.size = random(8, 15);
    this.orbitDistance = random(50, 150);
    this.orbit = planetSize + this.orbitDistance;
    this.speed = map(this.orbitDistance, 50, 150, 150, 50) * 0.0002;
    this.rotate = random(5, 10);
    this.additionalFC = random(2, 10);
  }

  update() {
    push();
      pointLight(255, 0, 0, 0, -this.size * 3, this.size * 3);
      pointLight(0, 255, 0, 0, this.size * 3, this.size * 3);
      rotateX(this.rotate);
      translate(sin((this.additionalFC + frameCount) * this.speed) * this.orbit, cos((this.additionalFC + frameCount) * this.speed) * this.orbit, 0);
      sphere(this.size);
    pop();
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(0);
  noStroke();
  const planetSize = 150;
  p = new Planet(planetSize);
  s = Array.from({ length: Math.floor(random(0, 4)) }, (_, i) => new Sputnik(planetSize));
}

function draw() {
  background(0);
  orbitControl();
  ambientLight(50);
  p.update();
  s.forEach(sp => {
    sp.update();
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}