//Primeiro projeto em Javascript desenvolvido por Lucas Pereira de Medeiros como parte do curso de Lógica de programação da Alura. Patch 1.0.0

//variaveis da bola
let xbolinha = 400;
let ybolinha = 300;
let diametro = 30;
let raio = diametro/2;

//velocidade da bola
let velocidadex = 7;
let velocidadey = 7;

//variaveis raquete
let xraquete = 10;
let yraquete = 240; 
let raquetelength = 15;
let raqueteheight = 120;

//variaveis da raquete do oponente
let xraqueteop = 770;
let yraqueteop = 240;
let velocidaderaqueteop;

//placar do jogo
let meuspontos = 0;
let pontosoponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(800, 600);
  //trilha.loop();
}

function draw() {
  background(0);
  mostraabola();
  movimentaabola();
  verificacolisao();
  mostraraquete(xraquete, yraquete);
  movimentaraquete();
  colisaoraquete();
  mostraraquete(xraqueteop, yraqueteop);
  //movimentaraqueteop();
  colisaoraqueteop();
  incluiplacar();
  marcaponto();
}

function mostraabola(){
  circle(xbolinha,ybolinha,diametro);
}

function movimentaabola(){
  xbolinha += velocidadex;
  ybolinha += velocidadey;
}

function verificacolisao(){
  if (xbolinha + raio > width || xbolinha - raio < 0){
    velocidadex *= -1;
  }
  if (ybolinha + raio > height || ybolinha - raio < 0){
    velocidadey*= -1;
  }
}

function mostraraquete(x,y){
  rect(x, y, raquetelength, raqueteheight)
}

function movimentaraquete(){
  if (keyIsDown(UP_ARROW)){
    yraquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yraquete += 10;
  }
}

function colisaoraquete(){
  if (xbolinha - raio < xraquete + raquetelength && ybolinha - raio < yraquete + raqueteheight && ybolinha + raio > yraquete){
    velocidadex *= -1;
    raquetada.play();
    xbolinha = 50;
  }
}

function movimentaraqueteop(){
  velocidaderaqueteop = ybolinha - raqueteheight/2;
  yraqueteop = velocidaderaqueteop;
}

function colisaoraqueteop(){
  if (xbolinha + raio > xraqueteop && ybolinha - raio < yraqueteop + raqueteheight && ybolinha + raio > yraqueteop){
    velocidadex *= -1;
    raquetada.play();
    xbolinha = 750;
  }
}

function incluiplacar(){
  textAlign(CENTER);
  textSize(20);
  fill(color(255, 140, 0));
  rect(170, 10, 60, 35);
  fill(color(255, 140, 0));
  rect(570, 10, 60, 35);
  fill(255);
  text(meuspontos, 200, 35);
  text(pontosoponente, 600, 35)
}

function marcaponto(){
  if (xbolinha - raio < 0){
    pontosoponente += 1;
    ponto.play();
  }
  if (xbolinha + raio > width){
    meuspontos += 1;
    ponto.play();
  }
}