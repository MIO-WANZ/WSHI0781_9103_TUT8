let img; // Variable to hold the image
let numSegments = 50; // Number of segments to divide the image into
let segments = []; // Array to hold the image segments
let yellowCircles = []; // Array to hold the yellow circles
let redCircles = []; // Array to hold the red circles
let blueCircles = []; // Array to hold the blue circles
let drawSegments = true; // Flag to control drawing segments or the full image
let xOffset = 0; // Offset for Perlin noise in the x-direction
let yOffset = 0; // Offset for Perlin noise in the y-direction
let zOffset = 0; // Offset for Perlin noise in the z-direction
let noiseScale = 0.02; // Scale for Perlin noise
let gathering = false; // Flag to control the gathering effect
let bgTransition = 0; // Variable to control background transition

//lets load the image from disk
function preload() {
  img = loadImage('Source code image.png');
}

function setup() {
  let canvasWidth = img.width / 2; // Set canvas width to half the image width
  let canvasHeight = img.height / 2; // Set canvas height to half the image height
  createCanvas(canvasWidth, canvasHeight); // Create canvas
  img.resize(canvasWidth, canvasHeight); // Resize the image to fit the canvas

  background(255); // Set initial background to white

  let segmentWidth = canvasWidth / numSegments; // Width of each segment
  let segmentHeight = canvasHeight / numSegments; // Height of each segment

  // Loop through the image and create segments
  for (let segYPos = 0; segYPos < canvasHeight; segYPos += segmentHeight) {
    for (let segXPos = 0; segXPos < canvasWidth; segXPos += segmentWidth) {
      let segmentColour = img.get(segXPos + segmentWidth / 2, segYPos + segmentHeight / 2); // Get color of the segment
      let radius = random(1, segmentWidth / 2); // Random radius for the segment
      let segment = new ImageSegment(segXPos, segYPos, segmentWidth, segmentHeight, segmentColour, radius); // Create new segment
      segments.push(segment); // Add segment to the array
    }
  }
}

function draw() {
  // Quick background transition from white to black
  if (bgTransition < 255) {
    let bgColor = 255 - bgTransition;
    background(bgColor); // Set background color
    bgTransition += 10; // Increase transition speed
  } else {
    background(0); // Once transition is complete, keep background black
  }

  if (drawSegments) {
    for (const segment of segments) {
      segment.draw(); // Draw each segment
    }
  } else {
    image(img, 0, 0); // Draw the full image
  }

  // Draw and update yellow circles
  for (const yellowCircle of yellowCircles) {
    yellowCircle.draw();
    yellowCircle.update();
  }

  // Draw and update red circles
  for (const redCircle of redCircles) {
    redCircle.draw();
    redCircle.update();
  }

  // Draw and update blue circles
  for (const blueCircle of blueCircles) {
    blueCircle.draw();
    blueCircle.update();
  }

  // Delay the appearance of yellow circles
  if (frameCount % 10 === 0) {
    let yellowCircle = new YellowCircle(random(width), height + random(100), random(5, 20)); // Create new yellow circle
    yellowCircles.push(yellowCircle); // Add to the array
  }

  // Create new red and blue circles
  if (frameCount % 20 === 0) {
    let redCircle = new RedCircle(random(width), height + random(100), random(5, 20)); // Create new red circle
    redCircles.push(redCircle); // Add to the array
  }

  if (frameCount % 30 === 0) {
    let blueCircle = new BlueCircle(random(width), height + random(100), random(5, 20)); // Create new blue circle
    blueCircles.push(blueCircle); // Add to the array
  }

  xOffset += 0.01; // Increment x-offset for Perlin noise
  yOffset += 0.01; // Increment y-offset for Perlin noise
  zOffset += 0.01; // Increment z-offset for Perlin noise

  if (gathering) {
    for (const segment of segments) {
      segment.startGathering(); // Start gathering effect for each segment
    }
  }
}

// Function to handle key press events
function keyPressed() {
  if (key == "1") {
    drawSegments = !drawSegments; // Toggle drawing segments
  } else if (key == "G" || key == "g") {
    gathering = !gathering; // Toggle gathering effect
    if (!gathering) {
      for (const segment of segments) {
        segment.reset(); // Reset segments if gathering is stopped
      }
    }
  }
}

// Function to handle mouse press events
function mousePressed() {
  for (let segment of segments) {
    if (mouseX > segment.srcImgSegXPos && mouseX < segment.srcImgSegXPos + segment.srcImgSegWidth &&
        mouseY > segment.srcImgSegYPos && mouseY < segment.srcImgSegYPos + segment.srcImgSegHeight) {
      segment.changeColorRandom(); // Change color of the segment if mouse is pressed on it
    }
  }
}

// Class to represent an image segment
class ImageSegment {
  constructor(srcImgSegXPosInPrm, srcImgSegYPosInPrm, srcImgSegWidthInPrm, srcImgSegHeightInPrm, srcImgSegColourInPrm, radiusInPrm) {
    this.srcImgSegXPos = srcImgSegXPosInPrm; // X position of the segment
    this.srcImgSegYPos = srcImgSegYPosInPrm; // Y position of the segment
    this.srcImgSegWidth = srcImgSegWidthInPrm; // Width of the segment
    this.srcImgSegHeight = srcImgSegHeightInPrm; // Height of the segment
    this.srcImgSegColour = srcImgSegColourInPrm; // Color of the segment
    this.radius = radiusInPrm; // Radius of the segment
    this.xOffset = random(1000); // X offset for Perlin noise
    this.yOffset = random(1000); // Y offset for Perlin noise
    this.zOffset = random(1000); // Z offset for Perlin noise
    this.isGathering = false; // Flag to control gathering effect
    this.gatherStartTime = random(0, 100); // Random start time for gathering
    this.gatherTime = 0; // Time elapsed during gathering
  }

  // Method to draw the segment
  draw() {
    let noiseX = noise(this.xOffset + xOffset);
    let noiseY = noise(this.yOffset + yOffset);
    let noiseZ = noise(this.zOffset + zOffset);

    let posX = this.srcImgSegXPos + noiseX * 10 - 5; // X position with noise
    let posY = this.srcImgSegYPos + noiseY * 10 - 5; // Y position with noise
    let radius = this.radius * (0.5 + noiseZ); // Radius with noise

    let centerX = width / 2; // Center X position
    let centerY = height / 2; // Center Y position

    if (this.isGathering) {
      let gatherX = lerp(posX, centerX, this.gatherTime); // Linear interpolation for X position
      let gatherY = lerp(posY, centerY, this.gatherTime); // Linear interpolation for Y position
      posX = gatherX;
      posY = gatherY;
      this.gatherTime += 0.05; // Increment gather time
    }

    let r = red(this.srcImgSegColour) + random(-30, 30); // Randomize red component
    let g = green(this.srcImgSegColour) + random(-30, 30); // Randomize green component
    let b = blue(this.srcImgSegColour) + random(-30, 30); // Randomize blue component

    fill(r, g, b); // Set fill color
    ellipse(posX + this.srcImgSegWidth / 2, posY + this.srcImgSegHeight / 2, radius * 2, radius * 2); // Draw ellipse
  }

  // Method to start gathering effect
  startGathering() {
    if (this.gatherStartTime <= 0 && !this.isGathering) {
      this.isGathering = true; // Start gathering if start time is reached
    } else if (this.gatherStartTime > 0) {
      this.gatherStartTime -= 1; // Decrease start time
    }
  }

  // Method to reset the segment
  reset() {
    this.isGathering = false; // Stop gathering
    this.gatherStartTime = random(0, 100); // Reset start time
    this.gatherTime = 0; // Reset gather time
  }

  // Method to change the color of the segment randomly
  changeColorRandom() {
    this.srcImgSegColour = color(random(255), random(255), random(255)); // Set random color
  }
}

// Class to represent a yellow circle
class YellowCircle {
  constructor(x, y, radius) {
    this.x = x; // X position
    this.y = y; // Y position
    this.radius = radius; // Radius
    this.xOffset = random(1000); // X offset for Perlin noise
    this.yOffset = random(1000); // Y offset for Perlin noise
  }

  // Method to draw the yellow circle
  draw() {
    fill(255, 255, 0); // Yellow color
    noStroke(); // No outline
    ellipse(this.x, this.y, this.radius * 2); // Draw ellipse
  }

  // Method to update the position of the yellow circle
  update() {
    let noiseX = noise(this.xOffset + xOffset);
    let noiseY = noise(this.yOffset + yOffset);

    this.x += noiseX * 8 - 4; // Move horizontally
    this.y -= noiseY * 20; // Move vertically

    this.xOffset += 0.02; // Increment x-offset
    this.yOffset += 0.02; // Increment y-offset
  }
}

// Class to represent a red circle
class RedCircle {
  constructor(x, y, radius) {
    this.x = x; // X position
    this.y = y; // Y position
    this.radius = radius; // Radius
    this.xOffset = random(1000); // X offset for Perlin noise
    this.yOffset = random(1000); // Y offset for Perlin noise
  }

  // Method to draw the red circle
  draw() {
    fill(255, 0, 0); // Red color
    noStroke(); // No outline
    ellipse(this.x, this.y, this.radius * 2); // Draw ellipse
  }

  // Method to update the position of the red circle
  update() {
    let noiseX = noise(this.xOffset + xOffset);
    let noiseY = noise(this.yOffset + yOffset);

    this.x += noiseX * 8 - 4; // Move horizontally
    this.y -= noiseY * 20; // Move vertically

    this.xOffset += 0.02; // Increment noise change in the  x-offset
    this.yOffset += 0.02; // Increment noise change in the  y-offset
  }
}

// Class to represent a blue circle
class BlueCircle {
  constructor(x, y, radius) {
    this.x = x; // X position
    this.y = y; // Y position
    this.radius = radius; // Radius
    this.xOffset = random(1000); // X offset for Perlin noise
    this.yOffset = random(1000); // Y offset for Perlin noise
  }

  // Method to draw the blue circle
  draw() {
    fill(0, 0, 255); // Blue color
    noStroke(); // No outline
    ellipse(this.x, this.y, this.radius * 2); // Draw ellipse
  }

  // Method to update the position of the blue circle
  update() {
    let noiseX = noise(this.xOffset + xOffset);
    let noiseY = noise(this.yOffset + yOffset);

    this.x += noiseX * 8 - 4; // Move Faster horizontally
    this.y -= noiseY * 20; // Move Faster vertically

    this.xOffset += 0.02; // Increment x-offset
    this.yOffset += 0.02; // Increment y-offset
  }
}
