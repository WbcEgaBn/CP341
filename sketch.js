let sweed =[];
let mousexvel = 0;
let mouseyvel = 0;
let lastmousex = 0;
let lastmousey = 0;
let back_img;

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
  
  lightrays();
  
  fill(255); 
noStroke(); 
textSize(20);
text("FPS: " + nf(frameRate(), 2, 1), 20, 40);

}

function mouseClicked() {
  let weed = new seaweed(mouseX, mouseY, floor(random(5, 10)));
  sweed.push(weed); 
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