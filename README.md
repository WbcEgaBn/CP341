# An Underwater Simulation 

This repository holds the files to create an interactive sea environment in p5.js. 

## To run the program 

1) Install p5.js 
2) Clone this repository 
3) Open this repository in VS code 
4) Install the P5 Server extension by osteele and Live Server extension by Ritwick Dey 
5) Click Go Live 
### Features 

To keep the program as interactive as possible, there is a scene editor that allows the user to place bubbles, seaweed, and coral. To enter or exit edit mode, type `e`. To clear all objects from the screen, type `c`. To place objects selected, simply click. To pick between different parameters, you can select using the arrow keys. 

#### Bubbles 

The user can type `1` while in edit mode to select and place bubbles. There are two bubble settings, `temporary` and `permanent`. Temporary bubbles rise up while permanent bubbles create a constant source of rising bubbles. 

#### Seaweed 

The user can type `2` while in edit mode to select and place seaweed. Seaweed can sway if you pass your mouse through it! 

#### Coral 

The user can type `3` while in edit mode to select and place coral. You can select between `small`, `medium`, and `large`.  

#### Boids 

The fish travel in boid patterns. Their movement is handeled in the `Boid` and `Group` class. Although this motion looks random, it is actually follows a general algorithm!

#### Shark 

The shark appears on screen occasionally. This makes waiting for it exciting! 

### Credits go to our wonderful project members :) 
