let sweed =[];
let mousexvel = 0;
let mouseyvel = 0;
let lastmousex = 0;
let lastmousey = 0;
let back_img;

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

function preload(){
  back_img = loadImage("water2.jpg");
}

function setup() {
  createCanvas(1920, 1080);
  back_img.resize(1920, 1080);
}



function draw() {
  background(back_img);
  
  for(let i = 0; i < sweed.length; i++ ){
    sweed[i].dra();
  }
  
  mousexvel = lastmousex - mouseX;
  lastmousex = mouseX;

  for (let obj of objects) {
		obj.update();
		obj.display();
	}

	drawEditorUI();

  
  lightrays();

  
  fill(255); 
noStroke(); 
textSize(20);
text("FPS: " + nf(frameRate(), 2, 1), 100, 40);

}

function mouseClicked() {
  ; 

  if (!editorMode) return;

	if (selectedTool === 1) {
		objects.push(new BubbleGroup(mouseX, mouseY));
	}

	if (selectedTool === 2) {
		//objects.push(new Seaweed(mouseX, mouseY));
    let weed = new seaweed(mouseX, mouseY, floor(random(5, 10)));
  sweed.push(weed)
	}

	if (selectedTool === 3) {
		objects.push(new Coral(mouseX, mouseY, coralSize));
	}

	if (selectedTool === 4) {
		objects.push(new Fish(mouseX, mouseY));
	}
}

function lightrays() {
  push(); 
  blendMode(SCREEN);
  noStroke();
  let t = frameCount * 0.001;

  for (let i = 0; i < 6; i++) {
    let topX =  660 + (i*100);//noise(i, t) * width * 1.5 - (width * 0.25);
    let bottomX = topX + (noise(i + 10, t) - 0.5) * 2000; 
    let alpha = noise(i + 20, t * 3) * 25;
    fill(180, 255, 255, alpha); 
    
    beginShape();
    vertex(topX, -50);
    vertex(topX + 200, -50);
    vertex(bottomX + 600, height + 50);
    vertex(bottomX, height + 50);
    endShape(CLOSE);
  }
  

  blendMode(MULTIPLY); 
  let pulse = map(sin(frameCount * 0.02), -1, 1, 0, 20);
  fill(0, 30, 60, 30 + pulse);
  rect(0, 0, width, height);
  pop();
}

class seaweed {
  constructor(x, y, heig){
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
    this.psway =[];
    
    this.poix.push(this.x);
    this.poiy.push(this.y);
    this.psway.push(0);
    
    for (let i = 0; i < this.h; ++i){
      this.poix.push(this.x);
      this.poiy.push(this.y - (i * 30));
      this.psway.push(0); 
    }
  }
  
  mcheck(){
    for (let i = 0; i < this.poix.length; ++i){
      this.di = dist(this.poix[i], this.poiy[i], mouseX, mouseY);
      if(this.di < 10){
        this.swa -= (mousexvel / 10);
      }
    }
  }
  
  sway(){
    this.swa += this.sr;
    
    for (let i = 0; i < this.psway.length - 1; i++){
      this.psway[i] = this.psway[i+1];
    }
    
    this.psway[this.psway.length - 1] = this.swa;
    
    for (let i = this.poix.length - 1; i > 1; i--){
      this.poix[i] += this.psway[i]; 
    }
    

    if(this.poix[this.poix.length - 2] > this.x + 2){
      this.sr = -0.2;
      this.swa = this.swa * 0.9;
       if(this.poix[this.poix.length - 2] > this.x + 6){
         this.swa = 0;
       }
    } else if(this.poix[this.poix.length - 2] < this.x - 2){
      this.sr = 0.2;
      this.swa = this.swa * 0.9;
      if(this.poix[this.poix.length - 2] < this.x - 6){
        this.swa = 0;
      }
    }
  }
  
  dra(){
    strokeWeight(20);
    this.mcheck();
    stroke(0, this.gree, this.blu);
    
    if(this.sc > 3){
      this.sway();
      this.sc = 0;
    } else {
      this.sc++;
    }
  
    for (let i = 1; i < this.poix.length; ++i){
      line(this.poix[i-1], this.poiy[i-1], this.poix[i], this.poiy[i]);
    }
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


class Coral {
	constructor(x, y, sl) {
		this.x = x;
		this.y = y;
		this.s = [0.2, 0.5, 0.8][sl - 1];
		this.h = random(60, 120) * this.s;
		this.a = random(PI / 6, PI / 3);
		this.d = random(6, 10);
		this.dx = random(TWO_PI);
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
		stroke(240 + 15 * random(),
			120 + 15 * random(),
			120 + 15 * random());
		strokeWeight(5);
		noFill();

		line(0, 0, 0, -l);
		translate(0, -l);

		if (d <= 0) return;

		push();
		rotate(this.a);
		this.drawBranch(l * 0.7 + random() * 0.2, d - 1);
		pop();

		push();
		rotate(-this.a);
		this.drawBranch(l * 0.7 + random() * 0.2, d - 1);
		pop();
	}
}
