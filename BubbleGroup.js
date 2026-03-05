class BubbleGroup {
  constructor(x, y) {
    this.bubbles = [];
    let count = random(8, 20);
    for (let i = 0; i < count; i++) {
      this.bubbles.push(new Bubble(x, y));
    }
  }

  update() {
    for (let b of this.bubbles) {
      b.update();
    }
  }

  display() {
    for (let b of this.bubbles) {
      b.display();
    }
  }
}
