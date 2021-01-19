/*
	juego-19.js
	del curso de Udemy
*/

var canvas;
var ctx;
var FPS = 50;

var anchoF = 50;
var altoF = 50;

var muro   = '#044f14';
var puerta = '#3a1700';
var tierra = '#c6892f'
var llave  = '#c6bc00';

var color prota = '#820c01';

var escenario = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,2,2,0,0,0,2,2,0,0],
  [0,0,2,2,2,2,2,0,0,0],
  [0,0,2,0,0,0,2,2,0,0],
  [0,0,2,2,2,0,0,2,0,0],
  [0,2,2,0,0,0,0,2,0,0],
  [0,0,2,0,0,0,2,2,2,0],
  [0,2,2,2,0,0,2,0,0,0],
  [0,2,2,2,0,0,2,0,0,0],
  [0,0,0,0,0,0,0,0,0,0]
];

function dibujaEscenario(){
  var color;

  for (y=0;y<5;y++){
    for (x=0;x<5;x++){
      //console.log(escenario[x][y])
      if (escenario[y][x] == 0)
        color = cesped;
      if (escenario[y][x] == 1)
        color = agua;
      if (escenario[y][x] == 2)
        color = tierra;

      ctx.fillStyle = color;
      ctx.fillRect(x*anchoF,y*altoF,anchoF,altoF);

    }
  }
}

function inicializa(){
  canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	setInterval(function(){
		principal();
	},1000/FPS);

}


function borraCanvas(){
	canvas.width = 500;
	canvas.height = 400;
}


function principal(){
	// console.log('funcion');
	borraCanvas();
  dibujaEscenario();

}
