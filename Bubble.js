class Bubble {
	constructor(x, y) {
		this.x = x + random(-20, 20);
		this.y = y + random(-20, 20);
		this.s = random(8, 25);
		this.v = random(0.5, 1.5);
		this.dx = random(TWO_PI);
		this.sindx = random(0.3, 0.5);
	}

	update() {
		this.y -= this.v;
		this.x += sin(frameCount * 0.05 + this.dx) * this.sindx;
	}

	display() {
		noFill();
		stroke(255, 120);
		strokeWeight(1.5);
		ellipse(this.x, this.y, this.s);
		noStroke();
		fill(255, 70);
		ellipse(
			this.x - this.s * 0.25,
			this.y - this.s * 0.25,
			this.s * 0.25
		);
	}
}