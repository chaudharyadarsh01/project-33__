const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var particles = [];
var divisions = [];
var plinkos = [];
var divisionHeight=300;
var line;

var gameState = "PLAY";

var particle
var count = 0;
var score = 0;

function setup(){
    var canvas = createCanvas(600,600);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(400,600,800,20);

    for (var k = 0; k <=width; k = k + 80) {
      divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  for (var j = 150; j <=width-100; j=j+70) 
    {
    
       plinkos.push(new Plinko(j,100));
    }

    for (var j = 25; j <=width-10; j=j+60) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

    for (var j = 70; j <=width-20; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,260));
    }  

}

function draw(){
  background("black");  

    Engine.update(engine);

    text("Score : "+score,20,40);
    fill("red");
    
    textSize(25)
    text(" 500 ", 5, 440);
    text(" 500 ", 80, 440);
    text(" 500 ", 160, 440);
    text(" 100 ", 240, 440);
    text(" 100 ", 320, 440);
    text(" 100 ", 400, 440);
    text(" 200 ", 480, 440);
    text(" 200 ", 560, 440);
   
    ground.display();

    for (var i = 0; i < plinkos.length; i++) {

        plinkos[i].display();
    }

    if(frameCount%60===0){
      particles.push(new Particle(random(100, 700), 10,10));
    }

    for (var j = 0; j < particles.length; j++){

      particles[j].display();
    }

    if(particle!=null)
    {
       particle.display();
        
        if (particle.body.position.y>700)
        {
              if (particle.body.position.x < 300) 
              {
                  score=score+500;      
                  particle=null;
                  if ( count>= 5) gameState ="END";                          
              }


              else if (particle.body.position.x < 600 && particle.body.position.x > 301 ) 
              {
                    score = score + 100;
                    particle=null;
                    if ( count>= 5) gameState ="END";

              }
              else if (particle.body.position.x < 900 && particle.body.position.x > 601 )
              {
                    score = score + 200;
                    particle=null;
                    if ( count>= 5)  gameState ="END";

              }      
              
        }
    }

    for (var k = 0; k < divisions.length; k++) {

      divisions[k].display();
    }


}

function mousePressed() {
  if(gameState !== "END") {
      count++;
  particle = new Particle(mouseX, 50, 10, 10);
  }
}