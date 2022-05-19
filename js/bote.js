class Bote{
constructor(x,y,w,h,posiciónBote,animacionMataVacas){
    var options={
        restitution:0.8,
        friction:1.0,
density:1.0
    }
    this.animacionMataVacas=animacionMataVacas;
    this.speed=0.05
    this.body=Bodies.rectangle(x,y,w,h,options);
    this.w=w;
    this.h=h;
    this.image=loadImage("./assets/boat.png");
    this.posiciónBote=posiciónBote;
    World.add(world,this.body);
}
flash(){
    this.speed=this.speed+0.05;
}
remove(indice){
    setTimeout(()=> {
    Matter.World.remove(wolrd,botes[indice].body);
    delete botes[indice];
    },2000);
}
display(){
    var pos=this.body.position;
    var angulo=this.body.angle;
    var indice=floor(this.speed % this.animacionMataVacas.lenght);
    push();
    translate(pos.x,pos.y);
    rotate(angulo);
    imageMode(CENTER);
    image(this.animacionMataVacas[indice],0,this.posiciónBote,this.w,this.h);
 pop();
}
}