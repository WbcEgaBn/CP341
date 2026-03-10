class Coral {
	constructor(x, y, sl) {
		this.x = x;
		this.y = y;
		this.s = [0.2, 0.5, 0.8][sl - 1];
		this.h = 90 * this.s;
		this.a = PI/4;
		this.d = 4;
		this.dx = PI;
	}

	update() {}

	display() {
		push();

		translate(this.x, this.y);

		let sindx = sin(frameCount * 0.03 + this.dx) * 0.2;
		rotate(sindx);
		this.drawBranch(this.h * 0.5, this.d);

		pop();
	}

	drawBranch(l, d) {
		stroke(255, 135, 135);
		strokeWeight(5);
		noFill();

		line(0, 0, 0, -l);
		translate(0, -l);

		if (d <= 0) return;

		push();
		//beginShape();
		rotate(this.a);
		this.drawBranch(l * 0.7, d - 1);
		//endShape();
		pop();
		
		push();
		//beginShape();
		rotate(-this.a);
		this.drawBranch(l * 0.7, d - 1);
		//endShape();
		pop();
	}
}