// Variable to hold the loaded image
let img;

// Number of segments in each dimension (50x50 grid, total 2500 segments)
// This means we will cut the image into 50 pieces horizontally and 50 pieces vertically.
let numSegments = 50;

// Array to store the segments
// Each segment will be a small part of the image.
let segments = [];
let drawSegments = true; // This boolean will toggle between showing the segments or the whole image

// Perlin noise offset variables to create smooth random movement
let xOffset = 0;
let yOffset = 0;
let zOffset = 0; // Adding zOffset for 3D Perlin noise
let noiseScale = 0.02; // Scale for the Perlin noise effect

//lets load the image from disk
function preload() {
  img = loadImage('Piet_Mondrian Broadway_Boogie_Woogie.jpeg');
}

function setup() {
  // Create a canvas that is half the size of the original image
  let canvasWidth = img.width / 2;
  let canvasHeight = img.height / 2;
  createCanvas(canvasWidth, canvasHeight); // Create the canvas
  img.resize(canvasWidth, canvasHeight); // Resize the image to fit the new canvas size

  // Calculate the width and height of each segment
  let segmentWidth = canvasWidth / numSegments;
  let segmentHeight = canvasHeight / numSegments;

  // Loop through each segment position in the grid
  for (let segYPos = 0; segYPos < canvasHeight; segYPos += segmentHeight) {
    for (let segXPos = 0; segXPos < canvasWidth; segXPos += segmentWidth) {
      // Get the color of the center pixel of the segment
      let segmentColour = img.get(segXPos + segmentWidth / 2, segYPos + segmentHeight / 2);

      // Generate a random radius for the segment
      let radius = random(1, segmentWidth / 2);

      // Create a new ImageSegment object
      let segment = new ImageSegment(segXPos, segYPos, segmentWidth, segmentHeight, segmentColour, radius);
      segments.push(segment); // Add the segment to the array
    }
  }
}

function draw() {
  background(0); // Clear the background to black
  
  // Check whether to draw the segments or the original image
  if (drawSegments) {
    // Loop through each segment and draw it
    for (const segment of segments) {
      segment.draw();
    }
  } else {
    // Draw the original image if drawSegments is false
    image(img, 0, 0);
  }
  
  // Update the Perlin noise offsets to animate the effect
  xOffset += 0.01;
  yOffset += 0.01;
  zOffset += 0.01; // Update zOffset for 3D Perlin noise
}

// Toggle between drawing segments and the full image when the '1' key is pressed
function keyPressed() {
  if (key == "1") {
    drawSegments = !drawSegments; // Toggle the drawSegments variable
  }
}

// Change the color of a segment to a random color when clicked
function mousePressed() {
  // Check each segment to see if the mouse is within its bounds
  for (let segment of segments) {
    if (mouseX > segment.srcImgSegXPos && mouseX < segment.srcImgSegXPos + segment.srcImgSegWidth &&
        mouseY > segment.srcImgSegYPos && mouseY < segment.srcImgSegYPos + segment.srcImgSegHeight) {
      segment.changeColorRandom(); // Change the segment's color
    }
  }
}

// Class to represent a segment of the image
class ImageSegment {
  constructor(srcImgSegXPosInPrm, srcImgSegYPosInPrm, srcImgSegWidthInPrm, srcImgSegHeightInPrm, srcImgSegColourInPrm, radiusInPrm) {
    // Initialize the segment's properties
    this.srcImgSegXPos = srcImgSegXPosInPrm;
    this.srcImgSegYPos = srcImgSegYPosInPrm;
    this.srcImgSegWidth = srcImgSegWidthInPrm;
    this.srcImgSegHeight = srcImgSegHeightInPrm;
    this.srcImgSegColour = srcImgSegColourInPrm;
    this.radius = radiusInPrm;

    // Initial Perlin noise offsets for each segment
    this.xOffset = random(1000);
    this.yOffset = random(1000);
    this.zOffset = random(1000); // Adding zOffset for 3D Perlin noise
  }

  // Method to draw the segment
  draw() {
    stroke(0); // Set the outline color to black

    // Apply 3D Perlin noise to the position and size of the segment
    let noiseX = noise(this.xOffset + xOffset);
    let noiseY = noise(this.yOffset + yOffset);
    let noiseZ = noise(this.zOffset + zOffset); // Adding 3D noise

    // Calculate the new position based on Perlin noise
    let posX = this.srcImgSegXPos + noiseX * 10 - 5;
    let posY = this.srcImgSegYPos + noiseY * 10 - 5;
    let radius = this.radius * (0.5 + noiseZ); // Modify the size based on noise

    // Apply a slight random effect to the color
    let r = red(this.srcImgSegColour) + random(-30, 30);
    let g = green(this.srcImgSegColour) + random(-30, 30);
    let b = blue(this.srcImgSegColour) + random(-30, 30);

    fill(r, g, b); // Set the fill color with the random effect
    // Draw the segment as an ellipse
    ellipse(posX + this.srcImgSegWidth / 2, posY + this.srcImgSegHeight / 2, radius * 2, radius * 2);
  }

  // Method to change the segment's color to a random RGB color
  changeColorRandom() {
    this.srcImgSegColour = color(random(255), random(255), random(255));
  }
}