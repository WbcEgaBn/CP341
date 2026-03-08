class BubbleGroup {
	constructor(x, y, d = 1) {
		this.x = x;
		this.y = y;
		this.mode = d;
		this.bubbles = [];
		if (this.mode !== 2) {
			let count = floor(random(8, 20));
			for (let i = 0; i < count; i++) {
				this.bubbles.push(new Bubble(this.x, this.y));
			}
		}
	}

	update() {
		if (this.mode === 2) {
			if (frameCount % 10 === 0) {
				this.bubbles.push(new Bubble(this.x, this.y));
			}
		}

		for (let i = this.bubbles.length - 1; i >= 0; i--) {
			let b = this.bubbles[i];
			b.update();
			if (b.y <-windowHeight- 20) {
				this.bubbles.splice(i, 1);
			}
		}
	}

	display() {
		for (let b of this.bubbles) {
			b.display();
		}
	}
}