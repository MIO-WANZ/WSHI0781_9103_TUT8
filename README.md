# WSHI0781_9103_Final
# Creative Ideas
## *Inspiration:*
Piet Mondrian's work is inspired by the urban rhythms and energy of New York with its unique geometric abstract style and vibrant colors, which I will use as inspiration for my secondary work using p5.js. I hope to present an exceptional understanding of the modern city in digital media that expresses its energy, complexity, and constant iteration. This project pays homage to Piet Mondrian's artistic style and gives it new life and expression through modern technology.

## *Screen Layout:*
The overall image will use a grid structure, with vertical and horizontal lines dividing the image to form a basic grid layout in the Mondrian style. The use of the primary colors of red, yellow and blue, as well as geometric shapes in white, black and gray, will change over time and with user interaction. To enhance immersion, the canvas will be created larger so that the viewer feels as if they are in the middle of it.

## *Light and Shadow Effects:*
I will be utilizing Perlin noise and randomness techniques to convey my understanding of the modern city. Again the abstract form of Neoplasticism will be used, although Piet Mondrian was keen to use simple colors, I comprehend the modern city to be diverse. Therefore, I will add randomness in color and size to increase the variability of the image. By introducing the Perlin noise algorithm, which dynamically adjusts the transparency, position, and size of the colors, I will add a sense of organicity and variety to the image and simulate the effect of light and shadow in the city at night.

## *Dynamic change:*
I wanted to express the city's changing from morning to night and translate it into the changing of the universe, just as Piet Mondrian explores the harmony and order of the town and the universe. To show the alternation of day and night and the integration and renewal of the city, the image will gradually change from a white background to black. Inspired by Yayoi Kusama's Infinity Mirrored Room, she creates a sense of endless space through infinite reflections and repetitive dots, where the viewer enters and feels like they are in an infinite universe. Therefore, I will blur the rectangles representing roads and vehicles in the original work and turn them into circles, presenting the effect of light and shadow and particles, as if it were a city at night.

## *Interactive Design:*
Using keyboard click responses, users can interactively change the position and color of the color blocks to experience the dynamic changes in Mondrian style. The keyboard "G" key is used to increase the interactivity and dynamism of the artwork. At night, the lighted circles of vehicles will begin to gather and disperse, as if in a universe with a big bang. The city is like the universe; the cars, roads, and people are like the planets in the universe, and the world is going round and round again and again. Finally, the image will slowly rise with yellow, red, and blue dots, returning to the simple three primary colors, expressing a sense of returning to the beginning to explore and express the harmony and order of the spiritual world.

# Source code changes
I tried to manage modularity on top of the source code for post go overall modification, but the iterative process didn't work. The source code created three different classes as different layers, but I tried to modify him as a whole. So I saved the existing created code as a photo for later writing, please go through the link for the exact iteration process.
  # Links
  [Source code iterative](https://www.figma.com/board/Pf0uPFYU1Q2Y1q3jysziFj/Source-code-modification?node-id=0-1&t=BCSOLV88MO6M7wCX-1)

# Programming concepts used
1. Variable declaration and initialization: Declare variables globally to store images, segments, circles, and control flags.
2. Functions: Use the preload, setup, and draw functions to load resources, initialize, and draw content.
3. Interaction Handling: Use the keyPressed and mousePressed functions to handle user keyboard and mouse events.
4. Classes and Objects: Define classes to create and manage image segments and circular objects, including constructors and methods.
5. Perlin Noise: Use the noise function to generate smooth random motion effects.
6. Array Manipulation: Use arrays to store and manage multiple image segments and circle objects.
7. Color operations: Get and set colors using the color, fill, red, green, and blue functions.
8. Linear interpolation (lerp): for smooth aggregation effects.
9. Random number generation: Use the random function to generate random positions, sizes and colors.
10. FrameCount: Use frameCount to control how often circles are generated.

# Code Structure
## *1. Global variable declarations* 
## *2. (‘preload’)* 
preloads the image file before the program starts.
# Code Blocks
backtick:
`function preload() {img = loadImage('Piet_Mondrian_Broadway_Boogie_Woogie.jpeg');}`
## *3. ('setup')* 
createCanvas: create the canvas.
img.resize: resize the image to fit the canvas.
background: sets the initial background color.
Loop over image segments: breaks the image into smaller pieces and stores them in the segments array.
## *4. ('draw')* 
Background Transition: Implement a gradient of the background from white to black.
Image Segment Drawing: Determines whether to draw image segments or the entire image based on the drawSegments flag.
Circle drawing and updating: draws and updates the position of yellow, red and blue circles.
Create New Circle: Timing to create a new circle based on frameCount.
Perlin Noise Offset: smooth random motion with Perlin noise.
Cluster Effect: Controls the clustering effect of image segments.
## *5. ('key/mousePressed')* 
Toggle drawing mode: Toggle the drawing mode of the image segments and the whole image with the key "1".
Toggle Gathering Effect: Toggle the gathering effect by pressing "G" or "g" and reset the segments when the gathering is stopped.
Change segment color: randomly change the color of an image segment when the mouse is clicked on it.
## *6. (ImageSegment)* 
Constructor: initialize the position, size, color and other properties of the segment.
draw method: draw the segment and modify its position and size by Perlin noise and gathering effect.
startGathering method: start the gathering effect.
reset method: reset the gathers.
changeColorRandom method: change the color of the segments randomly.
## *7. Class Definition Yellow/Red/Blue Circle* 
Constructor: initialize the position, radius and Perlin noise offset of the circle.
draw method: draw the circle.
update method: update the position of the circle with Perlin noise.

# Images Links
[Yayoi Kusama's Infinity Mirror Rooms](https://www.thebroad.org/visit/mirror-rooms)

## Header
# **Hola**
## *Global variable declarations*
*Hola in italic*

Unordered list
- item 1
 - Subitem
  - ## sub

  1. Number1
  2. Number 2

  # Links
  [What is github](https://www.youtube.com/watch?v=pBy1zgt0XPc)

# Images
from webpage

![A cat](https://placekitten.com/200/300)

# Images
custom
![A cat](readmeImages/karen.jpg)

# Code Blocks
backtick:
`print("Hello world")`

```
function helloWorld() {
console.log("Hello, world!");
}
```
# Blockquotes
> This is a blockquote