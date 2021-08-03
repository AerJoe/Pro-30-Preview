const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var leftwall, rightwall
var ground
var link
var bridge
var bridge_con
var bridge_con1
var stones=[]
var bg_img
var axe_img
var food
var zombie
var zombie1, zombie2, zombie3, zombie4
var breakButton
var backgroundimg



function preload() {
zombie1 = loadImage("./assets/zombie1.png")
zombie2 = loadImage("./assets/zombie2.png")
zombie3 = loadImage("./assets/zombie3.png")
zombie4 = loadImage(".assets/zombie4.png")
backgroundimg = loadImage("./assets/background.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  rightwall = new Base(width-240, height/2 + 50, 600, 100, "#8d6e63", true)
  leftwall = new Base(240, height/2 + 50, 800, 100, "#8d6e63", true)
  ground = new Base(0, height-10, width * 2, 20, "#795548", true)
  bridge = new Bridge(20, {x: width/2 - 350, y: height/2})
  bridge_con1 = new Link(bridge, leftwall)
  bridge_con = new Link(bridge, rightwall)
    
  for(i=0; i<=8;i++) {
  var x = random (width/2-200,width/2+300)
  var y = random (-10, 140)
  var stone = new Stone(x, y, 80, 80)
  stones.push(stone)
}

zombie = createSprite(width/2, height - 110)
zombie.addAnimation("left_to_right", zombie1, zombie2, zombie1)
zombie.addAnimation("right_to_left",zombie3, zombie4, zombie3)
zombie.scale = 0.08
zombie.velocityX = 8

breakButton = createButton("")
breakButton.position(width - 200, height/2 - 50)
breakButton.class("breakbutton")
breakButton.mousePressed(handleButtonPress)
}

function draw() {
  background(51);
  Engine.update(engine);
  leftwall.display()
  rightwall.display()
  ground.display()
  bridge.display()
  for(var stone of stones ){
    stone.display()
  }

  if(zombie.position.x >= width-300) {
    zombie.velocityX = -8
    zombie.changeAnimation("right_to_left")
  }

  if(zombie.position.x <= 300) {
    zombie.velocityX = 8
    zombie.changeAnimation("left_to_right")
  }
  drawSprites()
}

function handleButtonPress() {
bridge_con.detach()
setTimeout(() => {
  bridge.break();
  }, 1500)
}