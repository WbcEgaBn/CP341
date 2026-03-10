class Boid{
  //needs alignment, cohesion, separation
  constructor(x, y){
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.position = createVector(x, y);
    this.size = 10.0;

    // Maximum speed
    this.speed = 3;

    // Maximum steering force
    this.force = 0.05;
    //this.color = color(random(256), 255, 255);
    this.rotx = -150;
    this.roty = 50;
    this.rotz = 200;
    
  }
  
  goTime(boids) {
    this.flock(boids);
    this.drawBoid();
    this.update();
    this.borders();
  }
  
  flock(boids){
    let separation = this.separate(boids);
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);

    // Weight the forces to keep everyone together

    this.applyForce(separation);
    this.applyForce(alignment);
    this.applyForce(cohesion);

   
  }
  
//applyforces??
  applyForce(forces) {
    this.acceleration.add(forces);
  }
  
  update() {
    // Update velocity with acceleration
    if(this.velocity.x > 0){
      this.rotz = -180;
    }
    this.velocity.add(this.acceleration);

    
    //keep things moving!
    this.position.add(this.velocity);

    // Reset acceleration to 0 each cycle
    this.acceleration.mult(0);
  }

  
  seek(target) {
    // A vector pointing from the location to the target
    let desired = p5.Vector.sub(target, this.position);

    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.speed);

    // Steering = Desired minus Velocity
    let steer = p5.Vector.sub(desired, this.velocity);

    // Limit to maximum steering force
    steer.limit(this.force);
    return steer;
  }
  
  //controls how boids look
  drawBoid3d(){
  //  let trout;
    //trout = loadModel('trout.obj', true);
    
  
    
    //troutimg = loadImage('trout.jpeg');
    
    //fill(this.color);
    //stroke(255);
    //circle(this.position.x, this.position.y, this.size);
    push();
    
    //noStroke();
    //fill(20,200,20);
    //stroke();
    //circle(this.position.x, this.position.y, 10);
    translate(this.position.x-300, this.position.y-200, 0);
    rotateX(this.rotx);
    rotateY(this.roty);
    rotateZ(this.rotz);
    scale(5); 
  
  //texture(fishTexture);
    model(troutobj);
    
   // image(troutimg, this.position.x, this.position.y);
   // circle(this.position.x, this.position.y, this.size);
    pop();
  }
  drawBoidcircle() {
    push();
    
    //noStroke();
    fill(20,200,20);
    //stroke();
    circle(this.position.x, this.position.y, 10);
    
    pop();
  }
  drawBoid2D() {
    let ang = this.velocity.heading();
    
    push();
    translate(this.position.x, this.position.y);
    rotateZ(ang-PI); 
    imageMode(CENTER); 

    image(fishimg, 0, 0, 30, 15); 
    pop();
  }
  drawBoidCone() {
    let ang = this.velocity.heading();
    
    push();
    translate(this.position.x, this.position.y);
  
    rotateZ(ang); 
    rotateZ(-PI/2); 

    noStroke();
    fill(100, 200, 255);
    cone(5, 15); 
    pop();
  }
  drawBoid() {
    let ang = this.velocity.heading();
    
    push();
    translate(this.position.x, this.position.y);
    rotateZ(ang); 
    
    noStroke();
    fill(100, 200, 25);
    model(fishgeo); 
    pop();
  }
  
  
  
  separate(boids) {
    //help for this section from p5js example
    let steer = createVector(0, 0);
    let count = 0;

    // For every boid in the system, check if it's too close
    for (let boid of boids) {
      let distanceToNeighbor = p5.Vector.dist(this.position, boid.position);

      // If the distance is greater than 0 and less than an arbitrary amount (30 right now)
      if (distanceToNeighbor > 0 && distanceToNeighbor < 30) {
        // Calculate vector to get away
        let diff = p5.Vector.sub(this.position, boid.position);
        diff.normalize();

        // Scale by distance
        diff.div(distanceToNeighbor);
        steer.add(diff);

        // Keep track of how many
        count++;
      }
    }

    //get average
    if (count > 0) {
      steer.div(count);
    }

    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.speed);
      steer.sub(this.velocity);
      steer.limit(this.force);
    }
    return steer;
  }

  // Alignment
  align(boids) {
    let sum = createVector(0, 0);
    let count = 0;
    //between 0 and 50 (arbitrary) to check dist and stay aligned
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < 50) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.speed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.force);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  // Cohesion
  cohesion(boids) {
    let sum = createVector(0, 0); // Start with empty vector 
    let count = 0;
    //same neighbor dist as before- 50
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < 50) {
        sum.add(boids[i].position); // Add location
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum); // Steer towards the location
    } else {
      return createVector(0, 0);
    }
  }
  
  //simple borders and such
  borders() {
    let left = -windowWidth / 2;
    let right = windowWidth / 2;
    let top = -windowHeight / 2;
    let bottom = windowHeight / 2;

    if (this.position.x < left - 20) {
      this.position.x = right + 20;
    }
    if (this.position.y < top - 20) {
      this.position.y = bottom + 20;
    }
    if (this.position.x > right + 20) {
      this.position.x = left - 20;
    }
    if (this.position.y > bottom + 20) {
      this.position.y = top - 20;
    }
  }
}