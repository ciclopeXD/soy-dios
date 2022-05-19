const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balasDeCañon=[];
var boteIMG,boteJason;
var balaAlAgua,balaJason;
var destructorDeBarcos,rotoJason;

var cannonBall;
var bote;
var balas=[];
var botes=[];
var animacionBienChula=[];
var boteDestuido= [];
var balaCayendoAlAgua = [];
function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  boteJason= loadJSON("assets/boat/boat.json");
  boteIMG=loadImage("assets/boat/boat.png");
  balaAlAgua=loadImage("assets/waterSplash/waterSplash.png");
  balaJason=loadJSON("assets/waterSplash/waterSplash.json");
  destructorDeBarcos=loadImage("assets/boat/brokenBoat.png");
  rotoJason=loadJSON("assets/boat/brokenBoat.json");

}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 20

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
  var asesinoDeDioses=boteJason.frames;
  for (var i=0;i<asesinoDeDioses.length;i++){
    var pos=asesinoDeDioses[i].position;
    var img=boteIMG.get(pos.x,pos.y,pos.w,pos.h);
    animacionBienChula.push(img);
  }
  var broken=rotoJason.frames;
  for(i=0;i<broken.length;i++){
    var pos=broken[i].position;
     var img=destructorDeBarcos.get(pos.x,pos.y,pos.w,pos.h);
     boteDestuido.push(img);
  }
  var brokenBalas=balaJason.frames;
  for (var i=0;i<brokenBalas.length;i++){
    varpos=brokenBalas[i].position;
    var img=balaAlAgua.get(pos.x,pos.y,pos.w,pos.h);
    balaCayendoAlAgua.push(img);
  }
  cannonBall = new CannonBall(cannon.x, cannon.y);
  
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  rect(ground.position.x, ground.position.y, width * 2, 1);
  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();
showBotes();
  for (var i=0; i<balasDeCañon.length; i++){
    multibalas(balasDeCañon[i],i);
    juanitoComePapas(i);
  }
  cannon.display();
  //cannonBall.display();
 
 /* Matter.Body.setVelocity(bote.body,{
    x:-0.9,y:0 });
  bote.display();*/
 
}


function keyReleased() {
   if (keyCode === 32 || keyCode == "Space") {
      balasDeCañon[balasDeCañon.length-1].shoot(); }
    
     }
    function multibalas(bala,i){
if (bala){
bala.display();
bala.animacion();
if (bala.body.position.x >=width || bala.body.position.y >=height-50){
bala.remove(i);
}
}
    }
    function keyPressed(){
      var bala=new CannonBall(cannon.x,cannon.y);
      balasDeCañon.push(bala);
    }
    function showBotes(){
      if(botes.length>0){
if(botes[botes.length-1] === undefined || botes[botes.length-1].body.position.x<width-300){
var pociciones=[-40,-60,-70,-20];
var pocicion=random(pociciones)
bote= new Bote(width,height-10,170,170,pocicion,animacionBienChula);
        botes.push(bote);
}
        for(var i=0;i<botes.length;i++){
          if(botes[i]){
            Matter.Body.setVelocity(botes[i].body,{x:-0.9,y:0});
          botes[i].display();
         
       bote[i].flash();
}else{botes[i]}
      }}else{
        bote= new Bote(width-70,height-60,170,170,-80,animacionBienChula);
        botes.push(bote);
      }
    }
function juanitoComePapas(indice){
  for(var i=0;i<botes.length;i++){
if(balas[indice]!== undefined && botes[indice!== undefined]){
var colicion=Matter.SAT.collides(balas.body,botes.body);
if(colicion.cillided){
botes[i].remove(i);
bala.remove(i);
Matter.World.remove(world,balas[indice].body);
delete balas[indice]
}
}
  }
}