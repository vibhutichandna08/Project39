var monkey, monkey_walking;
var bananaGroup, bananaImage;
var stoneGroup, stoneImage;
var ground;
var score = 0;
var PlayButton, PlayButtonImage, PlayButtonImage2;
var restart, restartImage, restartImage2;
var backgroundImg;
var bananaSpeed = -5;
var stoneSpeed = -8;
var survivalTime = 0;
var numberCount = 0;

var START = 0;
var PLAY = 1;
var END = 2
var gameState = START;

function preload() {
  monkey_walking = loadAnimation("images/Monkey_01.png", "images/Monkey_02.png", "images/Monkey_03.png", "images/Monkey_04.png", "images/Monkey_05.png", "images/Monkey_06.png", "images/Monkey_07.png", "images/Monkey_08.png", "images/Monkey_09.png", "images/Monkey_10.png");

  bananaImage = loadImage("images/banana.png");

  stoneImage = loadImage("images/stone.png");

  PlayButtonImage = loadImage("images/monkey_head.png");

  PlayButtonImage2 = loadImage("images/monkey_head_hoverOver.png");

  restartImage = loadImage("images/sprite_0.png");

  restartImage2 = loadImage("images/sprite_1.png");

  backgroundImg = loadImage("images/BG.png");

}

function setup() {
  createCanvas(600, 400);

  PlayButton = createSprite(200, 250);
  PlayButton.x = width / 2;
  PlayButton.addImage("Play", PlayButtonImage);
  //PlayButton.debug = true;
  PlayButton.setCollider("circle", 0, 2.5, 45);
  PlayButton.scale = 0.65;

  restart = createSprite(10000, 10000);
  restart.x = width / 2;
  restart.addAnimation("Restart", restartImage);
  // restart.debug = true;
  restart.setCollider("rectangle", 0, -0.5, 72.5, 60);
  restart.scale = 0.75;
  restart.visible = false;

  monkey = createSprite(50, 200);
  monkey.addAnimation("walking", monkey_walking);
  monkey.scale = 0.15;
  monkey.visible = false;

  ground = createSprite(200, 350, 100, 20);
  ground.width = width + 5;
  ground.x = width / 2;
  ground.velocityX = 0;
  ground.visible = false;

  bananaGroup = new Group();
  stoneGroup = new Group();
}

function draw() {
  //background("black");
  background(backgroundImg);
  monkey.collide(ground);
  //console.log(monkey.y);

  if (gameState == START) {
    fill("#D97904");
    textSize(50);
    textFont("comic sans ms");
    textStyle("bold italic");
    //textStyle("italic");
    text("Banana", 175, 100);
    fill("#A64F03");
    text("Catcher", 275, 140);
    monkey.y = 250;

    if (mouseIsOver(PlayButton)) {
      PlayButton.addImage("Play", PlayButtonImage2);
    } else {
      PlayButton.addImage("Play", PlayButtonImage);
    }

    if (mousePressedOver(PlayButton)) {
      gameState = PLAY;
      //ground.velocityX = -14;
      monkey.visible = true;
      monkey.y = 250;
      ground.visible = true;
      PlayButton.visible = false
    }
  }

  if (gameState == PLAY) {
    //numbers = numbers + 1;
    camera.position.y = monkey.y - 75;
    fill("black");
    textFont("comic sans ms");
    textStyle("bold italic");
    textSize(20);
    text("Score: " + score, 25, camera.y - 150);
    text("Survival Time: " + survivalTime, 375, camera.y - 150);
    monkey.velocityY = monkey.velocityY + 0.8;

    if (survivalTime <= 10) {
      fill("black");
      textFont("comic sans ms");
      textStyle("bold italic");
      textSize(20);
      text("Press the [spacebar] to Jump", 25, camera.y - 50);
    }

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (keyWentDown("space") && monkey.y > 290) {
      monkey.velocityY = -12;
    }

    if (monkey.isTouching(bananaGroup)) {
      score = score + 4;
      bananaGroup.destroyEach();
    }

    if (monkey.isTouching(stoneGroup)) {
      gameState = END;
    }

    if (survivalTime / 10 === numberCount) {
      bananaSpeed = bananaSpeed - 2;
      stoneSpeed = stoneSpeed - 2;
      numberCount = numberCount + 1;
      console.log(numberCount);
    }

    //survivalTime = Math.ceil(frameCount / frameRate());

    if (frameCount % 20 === 0) {
      survivalTime = survivalTime + 1;
    }

    spawnBanana();
    spawnStone();

  }

  if (gameState == END) {
    fill("black");
    textSize(50);
    textFont("comic sans ms");
    textStyle("bold italic");
    //textStyle("bold");
    text("Game Over", width / 2 - 145, 125);
    textSize(25);
    textStyle("italic");
    text("> Score: " + score, width / 2 - 100, 300);
    text("> Survived Time: " + survivalTime, width / 2 - 100, 325);
    ground.velocityX = 0;
    monkey.visible = false;
    ground.visible = false;
    PlayButton.visible = false
    bananaGroup.destroyEach();
    stoneGroup.destroyEach();
    restart.visible = true;
    restart.x = width / 2;
    restart.y = 200;
    stoneSpeed = -8;
    bananaSpeed = -5;

    if (mouseIsOver(restart)) {
      restart.addImage("Restart", restartImage2);
    } else {
      restart.addImage("Restart", restartImage);
    }

    if (mousePressedOver(restart)) {
      gameState = START
      ground.velocityX = 0;
      monkey.visible = false;
      ground.visible = false;
      PlayButton.visible = true
      bananaGroup.destroyEach();
      stoneGroup.destroyEach();
      restart.visible = false;
      restart.x = 10000;
      restart.y = 10000;
      score = 0;
      survivalTime = 0;
    }
  }

  drawSprites();
}


function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
    var banana = createSprite(610, 275, 40, 10);
    banana.y = Math.round(random(135, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = bananaSpeed;

    //assign lifetime to the variable
    banana.lifetime = 200;

    //adjust the depth
    banana.depth = monkey.depth;

    //add each cloud to the group
    bananaGroup.add(banana);
  }
    //var h = hour()
}

function spawnStone() {
  if (frameCount % 120 === 0) {
    var stone = createSprite(610, 325, 10, 40);
    stone.velocityX = stoneSpeed;
    stone.setCollider("circle", 0, 0, 140);
    stone.addImage(stoneImage);

    //assign scale and lifetime to the obstacle 
    stone.depth = ground.depth + 1;
    stone.scale = 0.17;
    stone.lifetime = 300;
    //add each obstacle to the group
    stoneGroup.add(stone);
  }
}