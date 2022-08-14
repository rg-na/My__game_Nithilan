var canvas;
var backgroundImage;
var bgImg;
var database, gameState;
var form, player;
var playerCount;
var game
var allPlayers;
var track, trackImg
var monster, monsterImg, human, humanImg
var ground
var characters=[]
var ball, ballImg

function preload() {
 trackImg = loadImage("./assets/track.png");
 backgroundImage =loadImage("./assets/background.jpg")
 ballImg = loadImage("./assets/ball.png")

  monsterImg = loadAnimation("./assets/Monster/Monster1.png", "./assets/Monster/Monster2.png", "./assets/Monster/Monster3.png", 
  "./assets/Monster/Monster4.png", "./assets/Monster/Monster5.png", "./assets/Monster/Monster6.png", "./assets/Monster/Monster7.png")
  
  humanImg = loadAnimation("./assets/Person/person1.png", "./assets/Person/person2.png","./assets/Person/person3.png","./assets/Person/person4.png",
  "./assets/Person/person5.png","./assets/Person/person6.png","./assets/Person/person7.png","./assets/Person/person8.png","./assets/Person/person9.png",
  "./assets/Person/person10.png","./assets/Person/person11.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  

  
}

function draw() {
  background(backgroundImage);
  if (playerCount === 2) {
    game.update(1);
  game.addBall()
  }

  if (gameState === 1) {
    
    game.play();
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
