/*
	juego-23.js
	del curso de Udemy
  Tetris
*/

var canvas;
var ctx;
var FPS = 50;

var anchoCanvas = 400;
var altoCanvas = 640;

var anchoTablero = 10;
var altoTablero = 16;

var anchoF = 40;
var altoF = 40;

//  tablero 12 x 17 (real utilizado 10 x 16)
var tablero = [
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1]
];


var pieza;

var objPieza = function(){
  this.x = 0;
  this.Y = 0;

  console.log('pieza creada');
}

function inicializaTeclado(){
  //LECTURA DE TECLADO
  document.addEventListener('keydown',function(tecla){
  	//IZQUIERDA
  	if(tecla.keyCode==37){
      console.log('izquierda')
  		//protagonista.izquierda();
  	}

  	//ARRIBA
  	if(tecla.keyCode==38){
      console.log('arriba')
  		//protagonista.arriba();
  	}

  	//DERECHA
  	if(tecla.keyCode==39){
      console.log('derecha')
  		//protagonista.derecha();
  	}

  	//ABAJO
  	if(tecla.keyCode==40){
      console.log('abajo')
  		//protagonista.abajo();
  	}

  });

}

function inicializa(){
  canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

  canvas.style.width = anchoCanvas;
  canvas.style.height = altoCanvas;

  pieza = new objPieza();

  inicializaTeclado();

	setInterval(function(){
		principal();
	},1000/FPS);

}


function borraCanvas(){
	canvas.width = anchoCanvas;
	canvas.height = altoCanvas;
}


function principal(){
	// console.log('bucle');
	borraCanvas();
  // dibujaEscenario();
  // imagenAntorcha.dibuja();
  // protagonista.dibuja();

  // for(c=0; c < enemigo.length; c++){
  //   enemigo[c].mueve();
  //   enemigo[c].dibuja();
  // }

}
