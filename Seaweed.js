class Seaweed {
	constructor(x, y, heig) {
		this.x = x;
		this.y = y;
		this.h = heig;
		this.swa = 0;
		this.sr = 0.2;
		this.gree = random(70, 100);
		this.blu = random(5, 20);
		this.sc = 0;
		this.di = 0;

		this.poix = [];
		this.poiy = [];
		this.psway = [];

		this.poix.push(this.x);
		this.poiy.push(this.y);
		this.psway.push(0);

		for (let i = 0; i < this.h; ++i) {
			this.poix.push(this.x);
			this.poiy.push(this.y - (i * 30));
			this.psway.push(0);
		}
	}

	mcheck() {
		for (let i = 0; i < this.poix.length; ++i) {
			this.di = dist(this.poix[i], this.poiy[i], mouseX, mouseY);
			if (this.di < 10) {
				this.swa -= (mousexvel / 10);
			}
		}
	}

	sway() {
		this.swa += this.sr;

		for (let i = 0; i < this.psway.length - 1; i++) {
			this.psway[i] = this.psway[i + 1];
		}

		this.psway[this.psway.length - 1] = this.swa;

		for (let i = this.poix.length - 1; i > 1; i--) {
			this.poix[i] += this.psway[i];
		}

		if (this.poix[this.poix.length - 2] > this.x + 2) {
			this.sr = -0.2;
			this.swa = this.swa * 0.9;
			if (this.poix[this.poix.length - 2] > this.x + 6) {
				this.swa = 0;
			}
		} else if (this.poix[this.poix.length - 2] < this.x - 2) {
			this.sr = 0.2;
			this.swa = this.swa * 0.9;
			if (this.poix[this.poix.length - 2] < this.x - 6) {
				this.swa = 0;
			}
		}
	}
	update() {}
	displax() {
		strokeWeight(20);
		//this.mcheck();
		stroke(0, this.gree, this.blu);
		//noStroke()
		if (this.sc > 3) {
			this.sway();
			this.sc = 0;
		} else {
			this.sc++;
		}

		for (let i = 1; i < this.poix.length; ++i) {
			line(this.poix[i - 1], this.poiy[i - 1], this.poix[i], this.poiy[i]);
		}
	}
	display() {
		push(); 
		strokeWeight(20);
		stroke(0, this.gree, this.blu);
		noFill(); 

		if (this.sc > 3) {
			this.sway();
			this.sc = 0;
		} else {
			this.sc++;
		}

		//
		beginShape();
		for (let i = 0; i < this.poix.length; ++i) {
			vertex(this.poix[i], this.poiy[i]);
		}
		endShape();
		pop(); 
	}
}