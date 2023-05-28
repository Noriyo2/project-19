var zombie, zombieImg;
var backgroundImg;
var brainImg;
var brainsGroup;
var gameState;

function preload() {
  zombieImg = loadImage("Zombie.png");
  backgroundImg = loadImage("BackGround.jpg");
  brainImg = loadImage("brain.png");
}

function setup() {
  createCanvas(600, 600);

  backgroundSprite = createSprite(300, 200);
  backgroundSprite.addImage(backgroundImg);
  backgroundSprite.scale = 1.5;

  brainsGroup = new Group();

  zombie = createSprite(300, 300);
  zombie.addImage(zombieImg);
  zombie.scale = 0.2;

  gameState = "play"; // Initialize gameState as "play"
}

function draw() {
  background("black");

  drawSprites();

  if (frameCount % 90 === 0) {
    var brain = createSprite(random(100, 500), 0);
    brain.addImage(brainImg);
    brain.velocityY = random(2, 6);
    brainsGroup.add(brain);
    brain.scale = 0.2;
  }

  if (gameState === "play") { // Check if gameState is "play"
    if (keyDown(RIGHT_ARROW) && zombie.x < 550) {
      zombie.x += 8;
    }

    if (keyDown(LEFT_ARROW) && zombie.x > 50) {
      zombie.x -= 5;
    }

    if (brainsGroup.collide(zombie)) {
      gameState = "end"; // Change gameState to "end" if zombie collides with brain
    }
  } else if (gameState === "end") { // Check if gameState is "end"
    brainsGroup.destroyEach();
    textSize(60);
    text("Game Over !!", 130, 300);
    zombie.destroy();
  }
}
