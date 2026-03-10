
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
    
    
    
    
    if(this.position.x < -9){
     
      this.position.x = 9
      this.position.y = random(-2,2)
      this.position.z = random(-2,2)
    
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