# WSHI0781_9103_Final
# Creative Ideas
## *Inspiration:*
Piet Mondrian's work is inspired by the urban rhythms and energy of New York with its unique geometric abstract style and vibrant colors, which I will use as inspiration for my secondary work using p5.js. I hope to present an exceptional understanding of the modern city in digital media that expresses its energy, complexity, and constant iteration. This project pays homage to Piet Mondrian's artistic style and gives it new life and expression through modern technology.

## *Screen Layout:*
The overall image will use a grid structure, with vertical and horizontal lines dividing the image to form a basic grid layout in the Mondrian style. The use of the primary colors of red, yellow and blue, as well as geometric shapes in white, black and gray, will change over time and with user interaction. To enhance immersion, the canvas will be created at the same size as the original, allowing for a better view of the overall changes and making the viewer feel as if they were there.

## *Light and Shadow Effects:*
I will be utilizing Perlin noise and randomness techniques to convey my understanding of the modern city. Again the abstract form of Neoplasticism will be used, although Piet Mondrian was keen to use simple colors, I comprehend the modern city to be diverse. Therefore, I will add randomness in color and size to increase the variability of the image. By introducing the Perlin noise algorithm, which dynamically adjusts the transparency, position, and size of the colors, I will add a sense of organicity and variety to the image and simulate the effect of light and shadow in the city at night.

## *Dynamic change:*
I wanted to express the city's changing from morning to night and translate it into the changing of the universe, just as Piet Mondrian explores the harmony and order of the town and the universe. To show the alternation of day and night and the integration and renewal of the city, the image will gradually change from a white background to black. Inspired by Yayoi Kusama's Infinity Mirrored Room, she creates a sense of endless space through infinite reflections and repetitive dots, where the viewer enters and feels like they are in an infinite universe. Therefore, I will blur the rectangles representing roads and vehicles in the original work and turn them into circles, presenting the effect of light and shadow and particles, as if it were a city at night.

## *Interactive Design:*
Using keyboard click responses, users can interactively change the position and color of the color blocks to experience the dynamic changes in Mondrian style. The keyboard "G" key is used to increase the interactivity and dynamism of the artwork. At night, the lighted circles of vehicles will begin to gather and disperse, as if in a universe with a big bang. The city is like the universe; the cars, roads, and people are like the planets in the universe, and the world is going round and round again and again. Finally, the image will slowly rise with yellow, red, and blue dots, returning to the simple three primary colors, expressing a sense of returning to the beginning to explore and express the harmony and order of the spiritual world.

# Source code changes
I tried to manage modularity on top of the source code for post go overall modification, but the iterative process didn't work. The source code created three different classes as different layers, but I tried to modify it as a whole. So I saved the existing created code as a photo for later writing, please go through the link for the exact iteration process.
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
`function preload() {img = loadImage('Source code image.png');}`
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
[Piet Mondrian. Broadway Boogie Woogie. 1942-43](https://www.moma.org/audio/playlist/296/196)

# Code using & Reference
[Simple Shapes](https://p5js.org/examples/hello-p5-simple-shapes.html)
[loop](https://p5js.org/examples/structure-loop.html)
[coordinates](https://p5js.org/examples/structure-coordinates.html)
[function](https://p5js.org/examples/structure-functions.html)
[set up and draw](https://p5js.org/examples/structure-setup-and-draw.html)
[shape primitives](https://p5js.org/examples/form-shape-primitives.html)
[ture and false](https://p5js.org/examples/data-true-and-false.html)
[variable scope](https://p5js.org/examples/data-variable-scope.html)
[numbers](https://p5js.org/examples/data-numbers.html)
[array](https://p5js.org/examples/arrays-array.html)
[iteration](https://p5js.org/examples/control-iteration.html)
[embedded iteration](https://p5js.org/examples/control-embedded-iteration.html)
[conditionals 1](https://p5js.org/examples/control-conditionals-1.html)
[conditionals 2](https://p5js.org/examples/control-conditionals-2.html)
[logical operators](https://p5js.org/examples/control-logical-operators.html)
[logical operators 2](https://p5js.org/examples/control-logical-operators-2.html)
[load and display image](https://p5js.org/examples/image-load-and-display-image.html)
[random](https://p5js.org/examples/math-random.html)
1. Randomizing Segment Radius
2. Random Start Time for Gathering Effect
3. Random Offsets for Perlin Noise
[increment decrement](https://p5js.org/examples/math-increment-decrement.html)
1. Incrementing bgTransition, xOffset, yOffset,zOffset, this.gatherTime in the ImageSegment class
2. Decrementing this.gatherStartTime in the ImageSegment class
[Operator Precedence](https://p5js.org/examples/math-operator-precedence.html)
1. Combining Noise and Arithmetic Operations
2. Logical Operators with Comparison
[distance](https://p5js.org/examples/math-distance-1d.html)
1. Distance Calculation for Gathering Effect
2. Mouse Interaction with Segments
[Double Random](https://p5js.org/examples/math-double-random.html)
1. Creating Circles with Random Initial Positions and Sizes
2. Randomizing Segment Color Components
[noise 1d](https://p5js.org/examples/math-noise1d.html)
1. When updating the positions and sizes of the segments and circles, the code uses 1D Perlin noise to generate smooth random values that change over time.
[noise 2d](https://p5js.org/examples/math-noise2d.html)
1. Achieved by combining 1D noise values for both X and Y positions, creating a smooth, continuous effect across two dimensions.
[Objects](https://p5js.org/examples/objects-objects.html)
1. Class Definitions, such as image segments and colored circles. 
2. Creating and Managing Objects in the setup() and draw() functions
3. Response to events like key presses and mouse presses.
[Multiple Objects](https://p5js.org/examples/objects-multiple-objects.html)
1. Creating Multiple Instances of Objects
2. Arrays to Manage Multiple Objects
3. Looping Through Arrays to Update and Draw Objects
[Array of Objects](https://p5js.org/examples/objects-array-of-objects.html)
1. Defines arrays to hold instances of ImageSegment, YellowCircle, RedCircle, and BlueCircle.
[keyboard](https://p5js.org/examples/input-keyboard.html)
1. The keyPressed() function toggles between drawing segments and the full image when the "1" key is pressed.
2. The same function also toggles the gathering effect when the "G" or "g" key is pressed.
[Mouse Press](https://p5js.org/examples/input-mouse-press.html)
1. Change Segment Color on Mouse Press
[Interactivity 1](https://p5js.org/examples/hello-p5-interactivity-1.html)
1. Detecting Mouse Press on Segments
2. Changing the Color of a Segment
[animation](https://p5js.org/examples/hello-p5-animation.html)
1. where circles (represented by instances of the YellowCircle, RedCircle, and BlueCircle classes) moved base on perlin noise.


