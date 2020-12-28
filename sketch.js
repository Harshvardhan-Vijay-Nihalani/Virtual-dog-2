var canvas;
var dog1Image;
var dog2Image;
var dog;
var count, foodS;
var life;
var database;
var button1, button2;
var lastFed, fedTime;
var foodObj;

function preload() {
	dog1Image = loadImage("images/dogImg.png");
	dog2Image = loadImage("images/dogImg1.png");
}

function setup() {
	canvas = createCanvas(800, 700);
	dog = createSprite(400, 350, 20, 30);
	dog.addImage("dog1Image", dog1Image);
	dog.addImage("dog2Image", dog2Image);
	dog.scale = 0.3;
	count = 20;
	life = 20;
	database = firebase.database();
	foodstock = database.ref('Food');
	foodstock.on("value", readstock);
	button1 = createButton('Add food');
	button2 = createButton('Feed dog');
	button1.position(840,100);
	button2.position(840,150);
	button1.mousePressed(addFood);
	button2.mousePressed(feedDog);
	foodObj = new Food();
}


function draw() {
	background(46, 139, 87);
	if(foodS === 0){
		dog.changeImage("dog1Image", dog1Image);
	}
	drawSprites();
	textSize(20);
	stroke('green');
	fill("blue");
	text("Food left = " + foodS, 20, 20);

	fedTime = database.ref('FeedTime');
	fedTime.on("value", function(data){
		lastFed = data.val();
	});
	foodObj.display();
	


	fill(255,255, 254);
	textSize(15);
	
	if(lastFed>=12){
		text("Last Fed : " + lastFed%12 + " PM", 350, 30);
	}else if(lastFed===0){
		text("Last Fed : 12 AM", 350, 30);
	}else{
		text("Last Fed : " + lastFed + "AM", 350, 30);
	}
}

function addFood(){
	foodS++;
	database.ref('/').update({
		Food:foodS
	})
}

function feedDog(){
	dog.addImage(dog2Image);

	foodObj.updateFood(foodObj.getFoodStock()-1);
	database.ref('/').update({
		Food:foodObj.getFoodStock(),
		FeedTime: hour()
	})
}

function readstock(data){

	foodS = data.val();
	foodObj.updateFood(foodS);
}

function writeStock(x){
	if(x<=0){
		x=0;
	}else{
		x-=1;
	}
	database.ref('/').update({
		'Food':x
	})
}