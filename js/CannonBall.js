class CannonBall {
  constructor(x, y) {
    var options = {
      isStatic: true
    };
    this.r = 30;
    this.body = Bodies.circle(x, y, this.r, options);
    this.image = loadImage("./assets/cannonball.png");
    this.trajectory=[];
    World.add(world, this.body);
  }

shoot(){
  var newAngle=cannon.angle-28;
  newAngle=newAngle*(3.14/180);
  var velocidad=p5.Vector.fromAngle(newAngle);
  velocidad.mult(0.5);
  Matter.Body.setStatic(this.body,false);
  Matter.Body.setVelocity(this.body,{x:velocidad.x*(180/3.14),y:velocidad.y*(180/3.14)});
}

remove(indice){
  this.isSink=true;
  Matter.Body.setVelocity(this.body,{x:0,y:0});
  this.animation=balaCayendoAlAgua;
  this.r=150;
  setTimeout(()=> {
    Matter.World.remove(world,this.body);
    delete balasDeCañon[indice];
  },30);
}
animacion(){this.speed+=0.05}
  display() 
  {
    var pos = this.body.position;
    var angle=this.body.angle;
    var index=floor(this.speed% this.animation.length);
    push();
    imageMode(CENTER);
    image(this.animation[index], 0, 0, this.r, this.r);
    pop();
    if (this.body.velocity.x>0 && pos.x>10){
var pocición=[pos.x,pos.y];
this.trajectory.push(pocición);

}
//for (var i=0;i<this.trajectory.length;i++){
  for (var i = 0; i < this.trajectory.length; i++) {
  image(this.image,this.trajectory[i][0],this.trajectory[i][1],5.5,5);
}
  }

}
