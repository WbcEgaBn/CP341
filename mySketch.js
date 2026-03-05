let bubbleGroups = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(10, 60, 120);

  for (let group of bubbleGroups) {
    group.update();
    group.display();
  }
}

function mousePressed() {
  bubbleGroups.push(new BubbleGroup(mouseX, mouseY));
}
