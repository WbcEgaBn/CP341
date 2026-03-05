let objects = [];

let editorMode = false;
let selectedTool = 1;
let coralSize = 2;

let toolNames = {
	1: "Bubbles",
	2: "Seaweed",
	3: "Coral",
	4: "Fish"
};

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {

	background(10, 60, 120);

	for (let obj of objects) {
		obj.update();
		obj.display();
	}

	drawEditorUI();
}

function mousePressed() {

	if (!editorMode) return;

	if (selectedTool === 1) {
		objects.push(new BubbleGroup(mouseX, mouseY));
	}

	if (selectedTool === 2) {
		objects.push(new Seaweed(mouseX, mouseY));
	}

	if (selectedTool === 3) {
		objects.push(new Coral(mouseX, mouseY, coralSize));
	}

	if (selectedTool === 4) {
		objects.push(new Fish(mouseX, mouseY));
	}
}

function keyPressed() {

	if (key === 'e' || key === 'E') {
		editorMode = !editorMode;
	}

	if (key === 'c' || key === 'C') {
		objects = [];
	}

	if (editorMode) {

		if (key >= '1' && key <= '4') {
			selectedTool = int(key);
		}

		if (selectedTool === 3) {
			if (keyCode === UP_ARROW || keyCode === LEFT_ARROW) {
				coralSize = max(1, coralSize - 1);
			}
			if (keyCode === DOWN_ARROW || keyCode === RIGHT_ARROW) {
				coralSize = min(3, coralSize + 1);
			}

		}
	}
}

function drawEditorUI() {

	if (!editorMode) return;

	fill(0, 150);
	rect(10, 10, 210, 110, 10);

	fill(255);
	textSize(14);

	text("EDITOR MODE", 20, 30);

	for (let i = 1; i <= 4; i++) {
		let marker = (i === selectedTool) ? ">" : " ";
		text(marker + " " + i + ": " + toolNames[i], 20, 30 + i * 18);
	}

	if (selectedTool === 3) {

		fill(0, 150);
		rect(10, 130, 210, 90, 10);

		fill(255);

		text("Coral Size", 20, 150);

		let sizes = ["Small", "Medium", "Large"];

		for (let i = 0; i < 3; i++) {

			let marker = (coralSize === i + 1) ? ">" : " ";

			text(marker + " " + sizes[i], 20, 170 + i * 18);
		}
	}
}
