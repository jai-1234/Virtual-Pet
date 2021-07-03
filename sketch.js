var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,lastfeed;




function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  Feed = createButton('Feed the Dog')
  Feed.position(800,95)
  Feed.mousePressed(feedDog )
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  FeedTime= database.ref('FeedTime')
  FeedTime.all("value",function(data){
  lastfeed=data.val()
  }
  )
  textSize(10)
  if(lastfeed>=12){ 
    text("Last Feed"+lastfeed%12+"pm",350,30)
   }else if (lastfeed==0){
     text("Last Feed :12 AM",350,30)
   }else{
         text("Last Feed"+lastfeed+"am",350,30)
   }


 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog)
  
  var food_stock_val = foodObj.getFoodStock()
  if(food_stock_val <=0){
     foodObj.updateFoodStock(food_stock_val*0);    
  }else{
    foodObj.updateFoodStock(food_stock_val-1)
  }


   }
 



//function to add food in stock
function addFoods(){
  foodS++;

  var food_stock_val = foodObj.getFoodStock()
  if(food_stock_val <=0){
     foodObj.updateFoodStock(food_stock_val*0);    
  }else{
    foodObj.updateFoodStock(food_stock_val-1)
  }

  database.ref('/').update({
  })
}
