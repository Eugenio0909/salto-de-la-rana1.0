var towerImg, tower;
var troncoImg, tronco, troncoGroup;
//var ramaImg, rama, ramaGroup;
var rana, ranaImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("bg.png");
  troncoImg = loadImage("tronco.png");
  //ramaImg = loadImage("rama.png");
  ranaImg = loadImage("rana.png");
  spookySound = loadSound("spooky.wav");
}
//climber
function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300, 300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  troncosGroup = new Group();
  //ramaGroup = new Group();
  invisibleBlockGroup = new Group();
  
  rana = createSprite(200,200,50,50);
  rana.scale = 0.3;
  rana.addImage("rana", ranaImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      rana.x = rana.x - 3;
    }
    
    if(keyDown("right_arrow")){
      rana.x = rana.x + 3;
    }
    
    if(keyDown("space")){
      rana.velocityY = -10;
    }
    
    rana.velocityY = rana.velocityY + 0.8
    
    if(tower.y > 380){
      tower.y = 300
    }
    spawntronco();

   
    //ramaGroup.collide(ghost);
    if(troncoGroup.isTouching(rana)){
      rana.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(rana) || rana.y > 600){
      rana.destroy();
      gameState = "end"
    }
    //rama
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawntronco() {
  //escribir código aquí para aparecer puertas en la torre.
  if (frameCount % 240 === 0) {
    var tronco = createSprite(200, -50);
    tronco.scale = 0.7
    //var rama = (300,10);
    //rama.scale = 0.06
    var invisibleBlock = createSprite(200,15);
    //invisibleBlock.width = rama.width;
    invisibleBlock.height = 2;
    
    tronco.x = Math.round(random(120,400));
    //x = tronco.x;
    invisibleBlock.x = tronco.x;
  
    tronco.addImage(troncoImg);
    //rama.addImage(ramaImg);
    
    tronco.velocityY = 1;
    //rama.velocityY = 1;
    invisibleBlock.velocityY = 1;
    //climber
    rana.depth = tronco.depth;
    rana.depth +=1;
   
    //asignar tiempo de vida a la variable
    tronco.lifetime = 800;
    //rama.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //agregar cada puerta al grupo.
    troncosGroup.add(tronco);
    invisibleBlock.debug = true;
    //ramaGroup.add(rama);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

