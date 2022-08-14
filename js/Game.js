class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
    
  }

  start() {
    form = new Form();
    form.display();
    player = new Player();
    playerCount = player.getCount();
    
    ground = createSprite(width/2, height/2)
    ground.addImage(trackImg)
    ground.scale = 1.3;
    
   
    monster = createSprite(500, 500)
    monster.addAnimation("monster", monsterImg)
    monster.scale=0.4

    human = createSprite(500, 500)
    human.addAnimation("human", humanImg)
    
    ball = createSprite(900,400)
    ball.addImage("ball", ballImg)
    ball.scale= 0.135

    characters =[human,monster];
    
  }
  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {},
      //  carsAtEnd: 0
      });
      window.location.reload();
    });
  }
  
  handlePlayerControls() {
    
    if (keyIsDown(UP_ARROW)) {
     
      player.positionY += 5;
      player.update();
    }

    if (keyIsDown(RIGHT_ARROW)) {
      
      player.positionX += 5;
      player.update();
    }

    if (keyIsDown(LEFT_ARROW)) {
      
      player.positionX -= 5;
      player.update();
    }
             if (keyIsDown(DOWN_ARROW)){
      
      player.positionY -= 5;
      player.update();
    }
  }

  play() {
    drawSprites();
    this.handleElements();
    this.handleResetButton();
    this.getBallPosition();
    Player.getPlayersInfo();
   // player.getCarsAtEnd();

    if (allPlayers !== undefined) {
       image(trackImg, 0, -height * 2, width, height * 1);

      // this.showFuelBar();
      // this.showLife();
      // this.showLeaderboard();

      //index of the array
      var index = 0;
      for (var plr in allPlayers) {
      //   //add 1 to the index for every loop
        index = index + 1;

        //use data form the database to display the cars in x and y direction
         var x = allPlayers[plr].positionX;
         var y = height - allPlayers[plr].positionY;
         
         characters[index - 1].position.x = x;
         characters[index - 1].position.y = y;
         

          if (index === player.index) {
        //  stroke(10);
        //    fill("red");
        //   ellipse(x, y, 150, 150);

          this.handleBall(index);
      //     this.handlePowerCoins(index);

      //     // Changing camera position in y direction
      //     camera.position.y = cars[index - 1].position.y;
        }
        // if(this.isPlayerMoving){
        //   player.positionY+=5
        //   player.update();
        // }
        
      }

      // handling keyboard events
      this.handlePlayerControls();

      // Finshing Line
      // const finshLine = height * 6 - 100;

      // if (player.positionY > finshLine) {
      //   gameState = 2;
      //   player.rank += 1;
      //   Player.updateCarsAtEnd(player.rank);
      //   player.update();
      //   this.showRank();
      // }

    //   if(player.isTouching(ball)){
    //    player.position.x = ball.position.x
    //    player.position.y = ball.position.y
    //   }
      }
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
    this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100);
  }
  update(state){
    
    database.ref("/").update({
    gameState:state  
    })
  
    }


    
    ballUpdate(x,y){
      console.log(x)
        console.log(y)
      database.ref("ball").update({
      
        positionX:x,
      positionY:y
      
    })
   
     }
     getBallPosition() {
      var ballRef = database.ref("ball");
      ballRef.on("value", data => {
        var ballPosition = data.val();
        console.log(ballPosition)
        ball.position.x = ballPosition.positionX;
        ball.position.y = ballPosition.positionY;
      });
    }

    handleBall(index) {
      var x,y;
      characters[index-1].overlap(ball,function(collecter,collected) {
        // ball.position.x = player.positionX + 20
        // ball.position.y = player.positionY
        x = player.positionX+20
        y = player.positionY
        
        player.update()
      
    })

    if (x!==undefined){
      
      this.ballUpdate(x,y)
    }
    

  }
  addBall() {
    var ballIndex = "ball"


    database.ref(ballIndex).set({
      positionX: 900,
      positionY: 400
    });
  }

  

}