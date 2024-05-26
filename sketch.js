let img;
let numSegments = 50;
let segments = [];
let yellowCircles = [];
let redCircles = [];
let blueCircles = [];
let drawSegments = true;
let xOffset = 0;
let yOffset = 0;
let zOffset = 0;
let noiseScale = 0.02;
let gathering = false; // 控制聚集效果的变量
let bgTransition = 0; // 控制背景渐变的变量


//lets load the image from disk
function preload() {
  img = loadImage('Piet_Mondrian Broadway_Boogie_Woogie.jpeg');
}

function setup() {
  let canvasWidth = img.width / 2;
  let canvasHeight = img.height / 2;
  createCanvas(canvasWidth, canvasHeight);
  img.resize(canvasWidth, canvasHeight);
  
  background(255); // 设置初始背景为白色

  let segmentWidth = canvasWidth / numSegments;
  let segmentHeight = canvasHeight / numSegments;

  for (let segYPos = 0; segYPos < canvasHeight; segYPos += segmentHeight) {
    for (let segXPos = 0; segXPos < canvasWidth; segXPos += segmentWidth) {
      let segmentColour = img.get(segXPos + segmentWidth / 2, segYPos + segmentHeight / 2);
      let radius = random(1, segmentWidth / 2);
      let segment = new ImageSegment(segXPos, segYPos, segmentWidth, segmentHeight, segmentColour, radius);
      segments.push(segment);
    }
  }
}

function draw() {
  // 快速的从白到黑背景渐变
  if (bgTransition < 255) {
    let bgColor = 255 - bgTransition;
    background(bgColor);
    bgTransition += 10; // 增加这个值可以加快渐变速度
  } else {
    background(0); // 一旦完成渐变，背景就保持为黑色
  }

  if (drawSegments) {
    for (const segment of segments) {
      segment.draw();
    }
  } else {
    image(img, 0, 0);
  }
  
  // 绘制和更新黄色圆形
  for (const yellowCircle of yellowCircles) {
    yellowCircle.draw();
    yellowCircle.update();
  }

  // 绘制和更新红色圆形
  for (const redCircle of redCircles) {
    redCircle.draw();
    redCircle.update();
  }

  // 绘制和更新蓝色圆形
  for (const blueCircle of blueCircles) {
    blueCircle.draw();
    blueCircle.update();
  }

  // 延迟黄色圆圈的出现
  if (frameCount % 10 === 0) {
    let yellowCircle = new YellowCircle(random(width), height + random(100), random(5, 20));
    yellowCircles.push(yellowCircle);
  }
  
  // 创建新的红色和蓝色圆形
  if (frameCount % 20 === 0) {
    let redCircle = new RedCircle(random(width), height + random(100), random(5, 20));
    redCircles.push(redCircle);
  }

  if (frameCount % 30 === 0) {
    let blueCircle = new BlueCircle(random(width), height + random(100), random(5, 20));
    blueCircles.push(blueCircle);
  }

  xOffset += 0.01;
  yOffset += 0.01;
  zOffset += 0.01;

  if (gathering) {
    for (const segment of segments) {
      segment.startGathering();
    }
  }

  // 不需要移除超出画布的圆形
}

function keyPressed() {
  if (key == "1") {
    drawSegments = !drawSegments;
  } else if (key == "G" || key == "g") {
    gathering = !gathering;
    if (!gathering) {
      for (const segment of segments) {
        segment.reset();
      }
    }
  }
}

function mousePressed() {
  for (let segment of segments) {
    if (mouseX > segment.srcImgSegXPos && mouseX < segment.srcImgSegXPos + segment.srcImgSegWidth &&
        mouseY > segment.srcImgSegYPos && mouseY < segment.srcImgSegYPos + segment.srcImgSegHeight) {
      segment.changeColorRandom();
    }
  }
}

class ImageSegment {
  constructor(srcImgSegXPosInPrm, srcImgSegYPosInPrm, srcImgSegWidthInPrm, srcImgSegHeightInPrm, srcImgSegColourInPrm, radiusInPrm) {
    this.srcImgSegXPos = srcImgSegXPosInPrm;
    this.srcImgSegYPos = srcImgSegYPosInPrm;
    this.srcImgSegWidth = srcImgSegWidthInPrm;
    this.srcImgSegHeight = srcImgSegHeightInPrm;
    this.srcImgSegColour = srcImgSegColourInPrm;
    this.radius = radiusInPrm;
    this.xOffset = random(1000);
    this.yOffset = random(1000);
    this.zOffset = random(1000);
    this.isGathering = false; 
    this.gatherStartTime = random(0, 100);
    this.gatherTime = 0;
  }

  draw() {
    let noiseX = noise(this.xOffset + xOffset);
    let noiseY = noise(this.yOffset + yOffset);
    let noiseZ = noise(this.zOffset + zOffset);

    let posX = this.srcImgSegXPos + noiseX * 10 - 5;
    let posY = this.srcImgSegYPos + noiseY * 10 - 5;
    let radius = this.radius * (0.5 + noiseZ);

    let centerX = width / 2;
    let centerY = height / 2;

    if (this.isGathering) {
      let gatherX = lerp(posX, centerX, this.gatherTime);
      let gatherY = lerp(posY, centerY, this.gatherTime);
      posX = gatherX;
      posY = gatherY;
      this.gatherTime += 0.05; 
    }

    let r = red(this.srcImgSegColour) + random(-30, 30);
    let g = green(this.srcImgSegColour) + random(-30, 30);
    let b = blue(this.srcImgSegColour) + random(-30, 30);

    fill(r, g, b);
    ellipse(posX + this.srcImgSegWidth / 2, posY + this.srcImgSegHeight / 2, radius * 2, radius * 2);
  }

  startGathering() {
    if (this.gatherStartTime <= 0 && !this.isGathering) {
      this.isGathering = true;
    } else if (this.gatherStartTime > 0) {
      this.gatherStartTime -= 1;
    }
  }

  reset() {
    this.isGathering = false;
    this.gatherStartTime = random(0, 100);
    this.gatherTime = 0;
  }

  changeColorRandom() {
    this.srcImgSegColour = color(random(255), random(255), random(255));
  }
}

class YellowCircle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.xOffset = random(1000);
    this.yOffset = random(1000);
  }

  draw() {
    fill(255, 255, 0); // 去掉 alpha，让圆圈不会淡化
    noStroke();
    ellipse(this.x, this.y, this.radius * 2);
  }

  update() {
    let noiseX = noise(this.xOffset + xOffset);
    let noiseY = noise(this.yOffset + yOffset);

    this.x += noiseX * 8 - 4; // 更快速的横向移动
    this.y -= noiseY * 20; // 更快速的纵向移动

    this.xOffset += 0.02; // 加快 x 方向的噪声变化速度
    this.yOffset += 0.02; // 加快 y 方向的噪声变化速度
  }
}

class RedCircle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.xOffset = random(1000);
    this.yOffset = random(1000);
  }

  draw() {
    fill(255, 0, 0); // 红色圆圈
    noStroke();
    ellipse(this.x, this.y, this.radius * 2);
  }

  update() {
    let noiseX = noise(this.xOffset + xOffset);
    let noiseY = noise(this.yOffset + yOffset);

    this.x += noiseX * 8 - 4; // 更快速的横向移动
    this.y -= noiseY * 20; // 更快速的纵向移动

    this.xOffset += 0.02; // 加快 x 方向的噪声变化速度
    this.yOffset += 0.02; // 加快 y 方向的噪声变化速度
  }
}

class BlueCircle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.xOffset = random(1000);
    this.yOffset = random(1000);
  }

  draw() {
    fill(0, 0, 255); // 蓝色圆圈
    noStroke();
    ellipse(this.x, this.y, this.radius * 2);
  }

  update() {
    let noiseX = noise(this.xOffset + xOffset);
    let noiseY = noise(this.yOffset + yOffset);

    this.x += noiseX * 8 - 4; // 更快速的横向移动
    this.y -= noiseY * 20; // 更快速的纵向移动

    this.xOffset += 0.02; // 加快 x 方向的噪声变化速度
    this.yOffset += 0.02; // 加快 y 方向的噪声变化速度
  }
}