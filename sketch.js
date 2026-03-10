let objects = [];
let sweed =[];
let mousexvel = 0;
let mouseyvel = 0;
let lastmousex = 0;
let lastmousey = 0;
let back_img;
let editorMode = false;
let selectedTool = 1;
let coralSize = 2;
let bubbleDuration = 1;
let uiFont;
let flock;
let troutobj;
let shark;
// let troutobj = loadModel('fish.obj');
// let shark = loadModel('SHARK.obj');

let toolNames = {
	1: "Bubbles",
	2: "Seaweed",
	3: "Coral",
	4: "Fish"
};

function preload() {
  uiFont = loadFont('assets/roboto.ttf');
  back_img = loadImage("water2.jpg");
}

function setup() {
	//createCanvas(400, 400, WEBGL);

	createCanvas(windowWidth, windowHeight, WEBGL);
	textFont(uiFont);
	back_img.resize(windowWidth, windowHeight);
	imageMode(CORNER);

	//boid logic
  
    troutobj = loadModel('fish2.obj');
    shark = loadModel('SHARK.obj');
    flock = new Group();

  // Add an initial set of boids into the system
    for (let i = 0; i < 100; i++) {
    let b = new Boid(random(0, 600), random(0,500));
    flock.addBoid(b);
  }
	//troutimg = loadImage('trout.jpeg');
}

function draw() {
  
  for(let i = 0; i < sweed.length; i++ ){
    sweed[i].dra();
  }
  
  mousexvel = lastmousex - mouseX;
  lastmousex = mouseX;

	//background(10, 60, 120);
	//background(back_img);
	push();
  resetMatrix(); 
  image(back_img, -(width/2), -(height/2), windowWidth, windowHeight);
  pop();

	for (let obj of objects) {
		obj.update();
		obj.display();
	}
	lightrays();

	fill(255);
	noStroke();
	textSize(20);
	text("FPS: " + nf(frameRate(), 2, 1), width/2 - 120, -height/2 + 30);

	//for boids
   flock.goTime();
  
    push();

	// if (objects.some(obj => obj instanceof Group)) {
	// 	flock.goTime();

	// 	push();

	// 	scale(100);
	// 	rotateX(frameCount * 0.01);
	// 	ambientLight(150);          // add light for shading
	// 	directionalLight(255, 255, 255, 0, -1, 0); // extra light
	// 	ambientMaterial(150);  
	// 	texture(myTexture);
	// 	model(shark);
	// 	pop();
	// }


	drawEditorUI();
}

function lightrays() {
  push();
  blendMode(SCREEN);
  noStroke();
  let t = frameCount * 0.001;

  for (let i = 0; i < 6; i++) {
    let topX = -width/2 + 660 + (i * 100);
    let bottomX = topX + (noise(i + 10, t) - 0.5) * 2000;
    let alpha = noise(i + 20, t * 3) * 25;
    fill(180, 255, 255, alpha);

    beginShape();
    vertex(topX, -height/2 - 50);
    vertex(topX + 200, -height/2 - 50);
    vertex(bottomX + 600, height/2 + 50);
    vertex(bottomX, height/2 + 50);
    endShape(CLOSE);
  }

  blendMode(MULTIPLY);
  let pulse = map(sin(frameCount * 0.02), -1, 1, 0, 20);
  fill(0, 30, 60, 30 + pulse);
  rect(-width/2, -height/2, width, height);
  pop();
}

function mousePressed() {

	if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
		let fs = fullscreen();
		fullscreen(true);
	}

	if (!editorMode) return;

	let x = mouseX - width / 2;
	let y = mouseY - height / 2;

	if (selectedTool === 1) {
		objects.push(new BubbleGroup(x, y, bubbleDuration));
	}

	if (selectedTool === 2) {
		objects.push(new Seaweed(x, y, 10));
	}

	if (selectedTool === 3) {
		objects.push(new Coral(x, y, coralSize));
	}

	if (selectedTool === 4) {
		flock = new Group();

		//Add an initial set of boids into the system
		for (let i = 0; i < 50; i++) {
			let b = new Boid(random(0, 600), random(0, 500));
			flock.addBoid(b);
		}
		objects.push(flock);
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
		if (selectedTool === 1) {
			if (keyCode === UP_ARROW || keyCode === LEFT_ARROW) {
				bubbleDuration = max(1, bubbleDuration - 1);
			}
			if (keyCode === DOWN_ARROW || keyCode === RIGHT_ARROW) {
				bubbleDuration = min(2, bubbleDuration + 1);
			}
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

	let left = -width / 2 + 10;
	let top = -height / 2 + 10;

	fill(0, 150);
	rect(left, top, 210, 110, 10);
	fill(255);
	textSize(14);
	text("EDITOR MODE", left + 10, top + 20);

	for (let i = 1; i <= 4; i++) {
		let marker = (i === selectedTool) ? ">" : " ";
		text(marker + " " + i + ": " + toolNames[i], left + 10, top + 20 + i * 18);
	}

	if (selectedTool === 1) {
		fill(0, 150);
		rect(left, top + 120, 210, 90, 10);
		fill(255);
		text("Bubble Duration", left + 10, top + 140);
		let durations = ["Temporary", "Permanent"]
		for (let i = 0; i < 2; i++) {
			let marker = (bubbleDuration === i + 1) ? ">" : " ";
			text(marker + " " + durations[i], left + 10, top + 160 + i * 18);
		}
	}

	if (selectedTool === 3) {
		fill(0, 150);
		rect(left, top + 120, 210, 90, 10);
		fill(255);
		text("Coral Size", left + 10, top + 140);
		let sizes = ["Small", "Medium", "Large"];
		for (let i = 0; i < 3; i++) {
			let marker = (coralSize === i + 1) ? ">" : " ";
			text(marker + " " + sizes[i], left + 10, top + 160 + i * 18);
		}
	}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}