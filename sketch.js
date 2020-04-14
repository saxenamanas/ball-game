
let batX;
let batY;

let ballX;
let ballY;

let speedX;
let speedY;
let center;
let video;

let classifier;

function setup() {
  createCanvas(500, 600);
  video = createCapture(VIDEO);
  video.hide();
  classifyVideo();
  batX = width/2;
  batY = height-20;
  ballX = batX;
  ballY = 10;
  speedX = 0;
  speedY = 5;
}

function preload(){
  print('exec');
  classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/kAjr2zEIk/' + 'model.json');
}

function classifyVideo(){
  classifier.classify(video,gotResults);
}

function gotResults(){
  if(error){

  }else{
    print(results[0].label);
    classifyVideo();
  }
}

function ballMove(){
    ballY += speedY;
    ballX += speedX;
    print(ballX);
    if(ballX<=0){
        speedX=speedX*-1;
    }
    if(ballY<=0){
        speedY = speedY*-1;
    }
    if(ballX>=500){
      speedX = speedX*-1;
    }
}

function collide(){
    if((ballX)>=batX && (ballX)<=(batX+100) && (ballY+20)>=batY){
        speedY = speedY*-1;
        speedX = speedX + 0.05* -(ballX-center);
        print(speedX);
    }
}

function draw() {
    background(200);
    center = (batX+100)/2;
    if (keyIsDown(LEFT_ARROW)) {
        batX -= 5;
      }
    if (keyIsDown(RIGHT_ARROW)) {
        batX += 5;
      }
    ballMove();
    collide();
    circle(ballX,ballY,20);
    rect(batX,batY,100,20);
    if(ballY>600){
      noLoop();
    }
  }
  
