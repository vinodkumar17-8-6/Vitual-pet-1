var database;
var dog, dogImage, happyDogImage;
var food, foodImage, foodRef, foodStock;
var bgImage;
var milk,milkImage;
var milk2;
var bathImage;
var sleepImage;
var playImage;
var quoteImage;
var quote;

function preload(){

   dogImage = loadImage("dogimg.png");
   happyDogImage = loadImage("happyDog.png");
   bgImage = loadImage("bg.png");
   milkImage = loadImage("milk.png");
   bathImage = loadImage("bath.png");
   sleepImage = loadImage("sleep.png");
   playImage = loadImage("play.png");
   quoteImage = loadImage("quote.png");

  }

function setup() {

  database = firebase.database();

  foodRef = database.ref('Food');
  foodRef.on("value",read);

  foodRef.set(20);

  createCanvas(800, 700);
  
  dog = createSprite(600,300);
  dog.addImage(dogImage);
  dog.scale = 0.25;
  textSize(30);

  milk = createSprite(600,600,0,0);
  milk.addImage(milkImage);
  milk.scale = 0.04;

  quote = createSprite(200,300,0,0);
  quote.addImage(quoteImage);
  quote.scale = 0.3;

  milk2 = createSprite(510,365,0.01,0.01);

}

function draw() {  

  background(bgImage);

  fill("Purple")
  text("Milk bottles in stock "+ foodStock,230,620);
  
  if(foodStock===0){
    foodStock = 20;
    milk2.visible = false;
  }

  if (keyWentDown(LEFT_ARROW)){
    dog.addImage(bathImage);
    milk2.visible = false;
  }

  if (keyWentDown(RIGHT_ARROW)){
    dog.addImage(sleepImage);
    milk2.visible = false;
  }

  if (keyWentDown(DOWN_ARROW)){
    dog.addImage(playImage);
    
    milk2.visible = false;
  }

  drawSprites();

  decreaseFood();

}

function read(data){

  foodStock = data.val();

}

function decreaseFood(){
  if(keyWentDown(UP_ARROW)){
    
    milk2.addImage(milkImage);
    milk2.scale = 0.03;
    foodRef = database.ref("Food");
    foodStock = foodStock - 1;
    foodRef.set(foodStock);
    dog.addImage(happyDogImage);
  
  }
}