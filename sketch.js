var foodStock,database,foodS,milk,food
var dog,happyDog,dogImg
var feedbutton,addbutton
var fedtime,lastFed,foodObj,foodstockimg
var gameState,changegamestate,readgamestate
var gardimg,washrimg,bedrimg,livingimg
var foodleft = "Food left : "

function preload(){
dogImg = loadImage("images/dogImg.png")
happyDogImg = loadImage("images/happydog.png")
gardimg = loadImage("images/Garden.png")
washrimg = loadImage("images/Wash Room.png")
bedrimg = loadImage("images/Bed Room.png")
livingimg = loadImage("images/Living Room.png")
}

function setup() {
  createCanvas(750,600);
  database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value",function(data){
    foodS = data.val();
  })

  food = new Food()
  feedbutton = createButton("Feed the Dog")
  feedbutton.position(450,95)
  feedbutton.mousePressed(feedDog)

  addbutton = createButton("Add Food")
  addbutton.position(550,95)
  addbutton.mousePressed(addfood)

  dog = createSprite(625,225,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.5;

  readgamestate=database.ref('gameState').on('value',(data)=>{
    gameState = data.val()
  })
}


function draw() {  
  background(46, 139, 87);
  drawSprites();
  stroke("black")
  food.display()
  database.ref('FedTime').on('value', function (data){
    lastFed = data.val()
  })
  fill(255,255,255)
  textSize(25)
  currentTime=hour()
  if (currentTime == (lastFed+1)){
    food.update("Playing")
    food.garden()
  }else if(currentTime == (lastFed+2)){
    food.update("Sleeping")
    food.bedroom()
  }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    food.update("Bathing")
    food.WashRoom()
  }else{
    food.update("Hungry")
    food.livingroom()
  }
  if(lastFed>=12){
    text("Last Fed: "+lastFed%12 + " PM",100,70);
    }else if(lastFed===0){
      text("Last Fed: 12AM",100,70);
    }else{
      text("Last Fed: "+lastFed + " AM",100,70);
    }
    if(gameState != "Hungry"){
      feedbutton.hide()
      addfood.hide()
    }
    text(foodleft + foodS,100,150)
}
 
function writeStock(x){
  if(x<0){
    x = 0;
  }
  else if(x>0){
    x = x-1 ;
  }
  database.ref('/').update({
    food:x
  })
}

function feedDog(){
  dog.addImage(happyDogImg)
  if(foodS<=0){
    foodS=0;
  }else{
    foodS = foodS-1;

  }  
    database.ref('/').update({
      FedTime:hour(),
      food : foodS
    }
    )
}

function addfood(){
  foodS = foodS+1
  database.ref('/').update({
    food : foodS
  })
}
