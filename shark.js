
class Shark{
  constructor(x, y, z){
    this.position = createVector(x, y, z);
    this.rotx = 200;
    //this.position.x = this.position.x -0.01
    
  //  translate(this.position.x, this.position.y);
    
  }
  
  drawShark(){
    
 
    
   
      this.position.x = this.position.x -0.01
    
      translate(this.position.x, this.position.y);
    
    
    
    
    if(this.position.x < -11.5){
     
      this.position.x = 11.5
      this.position.y = random(-3,3);
      this.position.z = 2;
    
   // translate(this.position.x, this.position.y, this.position.z);
       
      }
    print(this.position.x, this.position.y, this.position.z);
   

    
    
    this.roty = 200;
    
    scale(1); 
  
  //texture(fishTexture);
    model(shark1);
    
  
  //  pop();
  }


  
}