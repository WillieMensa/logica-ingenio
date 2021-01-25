var canvas;
var ctx;
var FPS = 50;

var anchoF = 50;
var altoF = 50;



//PARA LA CÁMARA
var anchoEscenario = 25;
var altoEscenario = 20;


var muro = '#044f14';
var puerta = '#3a1700';
var tierra = '#c6892f';
var llave = '#c6bc00';


var imgTilemap;


var escenario = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,2,2,0,0,0,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,0,2,2,2,2,2,2,0,2,0,0,2,2,0,0,0,2,0,0,2,0,0,0,0],
  [0,0,2,0,0,2,2,2,0,2,2,2,2,2,0,0,0,0,0,0,2,2,2,0,0],
  [0,0,2,2,2,0,2,2,0,0,2,2,2,0,0,0,2,2,2,2,2,0,2,0,0],
  [0,2,2,0,0,0,0,2,0,0,0,2,0,0,0,0,2,0,0,2,0,0,2,0,0],
  [0,0,2,0,0,0,2,2,2,0,0,2,2,2,0,0,2,0,0,0,0,0,2,0,0],
  [0,2,2,2,0,0,2,0,0,2,2,2,2,2,2,2,2,0,0,2,2,0,2,0,0],
  [0,2,2,3,0,0,2,0,0,1,2,2,2,2,0,0,0,0,2,2,2,2,2,0,0],
  [0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0],
  [0,2,2,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0],
  [0,2,0,2,2,2,0,0,0,0,0,2,2,2,2,0,0,0,0,0,2,2,2,0,0],
  [0,2,0,2,2,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,2,2,0,0],
  [0,2,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,2,0,0,0],
  [0,2,0,0,0,2,0,0,0,0,0,2,0,0,2,2,0,0,2,0,0,2,0,0,0],
  [0,2,2,2,0,2,0,0,0,0,0,2,0,0,2,2,0,0,2,0,0,2,0,0,0],
  [0,2,0,2,0,0,0,0,0,0,0,2,0,0,2,2,0,0,2,0,0,2,0,0,0],
  [0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,2,2,2,2,0,0,2,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];




//----------------------------------------------
//ancho: anchura de la cámara
//alto: altura de la cámara
//tableroX: coordenadas x de la cámara
//tableroY: coordenadas y de la cámara
//pantallaX: coordenadasX dentro de la pantalla física
//pantallaY: coordenadasY dentro de la pantalla física


var camaraObj = function(ancho,alto,tableroX,tableroY,pantallaX,pantallaY){
  this.anchoCamara = ancho;
  this.altoCamara = alto;

  this.posX = tableroX;
  this.posY = tableroY;

  //Margenes en pixels, para hacer la animación fluida
  this.posXPixel = 0;
  this.posYPixel = 0;

  this.pantallaX = pantallaX;
  this.pantallaY = pantallaY;

  this.dibuja = function(){
    var textura;

    for(y=this.posY;y<(this.posY + this.altoCamara);y++){
      for(x=this.posX;x<(this.posX + this.anchoCamara);x++){
        textura = escenario[y][x];
        ctx.drawImage(imgTilemap,textura*32,0,32,32,(this.pantallaX + x - this.posX)*anchoF,(this.pantallaY + y - this.posY)*altoF,anchoF,altoF);
      }
    }

  }


  this.arriba = function(){
    if(this.posY > 0){
      this.posY--;
    }
  }

  this.abajo = function(){

    if(this.posY < altoEscenario - this.altoCamara){
      this.posY++;
    }
  }

  this.derecha = function(){
    if(this.posX < anchoEscenario - this.anchoCamara){
      this.posX++;
    }
  }

  this.izquierda = function(){
    if(this.posX > 0){
      this.posX--;
    }
  }



}

//----------------------------------------------




var camara;
var camara2;





function inicializa(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  //CARGAMOS LA IMAGEN DEL TILEMAP
  imgTilemap = new Image();
  imgTilemap.src = 'img/tilemap.png';


  camara = new camaraObj(5,10,3,3,0,0);
  camara2 = new camaraObj(5,5,3,3,6,0);


  //LECTURA DEL TECLADO
  document.addEventListener('keydown',function(tecla){

    if(tecla.keyCode == 38){
      camara.arriba();
    }

    if(tecla.keyCode == 40){
      camara.abajo();
    }

    if(tecla.keyCode == 37){
      camara.izquierda();
    }

    if(tecla.keyCode == 39){
      camara.derecha();
    }

  });

  setInterval(function(){
    principal();
  },1000/FPS);
}


function borraCanvas(){
  canvas.width=750;
  canvas.height=500;
}




function principal(){
  borraCanvas();
  camara.dibuja();
  camara2.dibuja();
  //dibujaEscenario();


}
