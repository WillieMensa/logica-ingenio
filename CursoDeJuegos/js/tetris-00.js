/*
	tetris.js
	a partir de juego-28 del curso de Udemy
  Tetris

  Optimizaciones
  crear function que genere tablero vacio

	para controlar botones habilitados/deshabilitados uso modelo de pentominos
	//	volteaPieza: boton para rotar piezzas
	volteaPieza = document.createElement("button");
	volteaPieza.innerHTML = dict.txtVoltear;
	document.body.appendChild(volteaPieza);
	volteaPieza.addEventListener ("click", function() { voltearPieza() } );
	volteaPieza.style.position = "absolute";
	volteaPieza.style.left	=	STAGE_OFFSET_X + 1.3 * dist_X - BLOCK_CELL_SIZE;	//	STAGE_OFFSET_X + 4.0 * BLOCK_CELL_SIZE;
	volteaPieza.style.top		= STAGE_OFFSET_Y + STAGE_Y - BLOCK_CELL_SIZE;	
	volteaPieza.style.visibility='hidden';

	para la habilitacion
	volteaPieza.disabled=false;
	volteaPieza.disabled=true;

touch
		.on('pointerdown click', function() {



*/

var canvas;
var ctx;
var FPS = 100;
var NPPF = 10;  // puntos otorgados por fila limpia
var nIntervId;  //  para detener juego cuando sea necesario

//DIMENSIONES DEL CANVAS
var anchoCanvas = 500;		//	400 para los graficos y 100 para informacion
var altoCanvas = 640;

//DIMENSIONES REALES DE CADA CUADRO DEL TABLERO (40x40 pixels)
//	var tamanyoFicha = 40;

//TABLERO (10x16)
var anchoTablero = 10;
var altoTablero = 20;

var margenSuperior = 4;

var anchoF = 40;
var altoF = 40;

var enPausa = true;		//asi arrancamos. En pausa
var nScore;
var maxScore;
var pausaBtn;				// boton para pausar juego


//  tablero 12 x 17 (real utilizado 10 x 16)
//LA MATRIZ ES MAYOR PORQUE AÑADIMOS MÁRGENES PARA LAS COLISIONES
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
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1]
];

var tableroCopia = [
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
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1]
];


//COLORES DE LAS FICHAS
var rojo = '#FF0000';
var morado = '#800080';
var naranja = '#FF8C00';
var amarillo = '#FFD700';
var verde = '#008000';
var cyan = '#00CED1';
var azul = '#0000CD';
var clrFondo = '#333';



// --------- inicio de funciones y objetos
function inicializa(){
	console.log('inicializando...');

  canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

  canvas.style.width = anchoCanvas;
  canvas.style.height = altoCanvas;

  pieza = new objPieza();

  inicializaTeclado();
  inicializaBotones();


  maxScore=getStorage('maxScore');
	nScore=0;

	//	aqui deberia estar listo para iniciar. Esperando boton Iniciar
	// que entonces, si deberia llamar a setInterval()
	// iniciar, continuar, correr
	// correr();

  borraCanvas();
	dibujaTablero();

}



function correr(){
	// corre el juego desde la posicion actual
	// puede ser iniciar de cero o reanudar
	btnPausar.disabled=false;
	console.log(btnPausar.disabled);

  nIntervId=setInterval(function(){
		principal();
	},1000/FPS);

}


function reseteaTablero(){
  console.log('resetea tablero');

  for(py=0;py<21;py++){
    for(px=0;px<12;px++){
      tablero[py][px]=tableroCopia[py][px];
    }
  }
}


var pieza;

var objPieza = function(){
  this.x = 0;
  this.y = 0;

  this.angulo = 0;
  this.tipo = 0;    //cual pieza

  this.retraso = 50;
  this.fotograma = 0;


  this.nueva = function(){
    this.tipo = Math.floor(Math.random()*7);
    this.y=0;
    this.x=4;
  }


  this.compruebaSiPierde = function(){
    var pierde = false;

    for(px=1;px<anchoTablero+1;px++){
      //  console.log('comprobando si pierde', tablero[2][px]);
      if(tablero[2][px]>0){
        pierde = true;
      }
    }
    return pierde;
  }


  this.limpia = function(){
    var filaCompleta;

    for(py=margenSuperior;py<altoTablero;py++){
      filaCompleta = true;

      for(px=1;px<anchoTablero+1;px++){
        if(tablero[py][px]==0){
          filaCompleta = false;
        }
      }

      //console.log('filaCompleta; ',py,filaCompleta);

      if(filaCompleta==true){
        for(px=1; px<anchoTablero+1; px++){
          tablero[py][px]=0;
        }
				//	eliminamos la filacompleta
				tablero.splice(py,1);
				// e insertamos una fila vacia al inicio
				tablero.unshift([1,0,0,0,0,0,0,0,0,0,0,1]);
        nScore += NPPF;
      }
    }
  }

  this.caer = function(){
    if(this.fotograma < this.retraso){
      this.fotograma++;
    }
    else {
      if(this.colision(this.angulo,this.y+1,this.x)==false){
        this.y++;
      }
      else{ // pieza cayó
        this.fijar();
        this.limpia();
        this.nueva();

        if(this.compruebaSiPierde()==true){
          guardaScore();
          reseteaTablero();
					clearInterval(nIntervId);
        }
      }
      this.fotograma = 0;
    }
  }


  this.fijar = function(){
    for(py=0;py<4;py++){
      for(px=0;px<4;px++){
        if(fichaGrafico[this.tipo][this.angulo][py][px]!=0){
          tablero[this.y+py][this.x+px] = fichaGrafico[this.tipo][this.angulo][py][px];
        }
      }
    }
  }

  this.colision = function(anguloNuevo, yNueva, xNueva){
    var resultado = false;
    for(py=0;py<4;py++){
      for(px=0;px<4;px++){
        if(fichaGrafico[this.tipo][anguloNuevo][py][px]){
          if(tablero[yNueva+py][xNueva+px]>0){
            resultado = true;
          }
        }
      }
    }
    return resultado;
  }

  this.dibuja = function(){
    for(py=0;py<4;py++){
      for(px=0;px<4;px++){
        //console.log(this.tipo,this.angulo,py,px);

        if(fichaGrafico[this.tipo][this.angulo][py][px]!=0){

          if(fichaGrafico[this.tipo][this.angulo][py][px]==1)
            ctx.fillStyle = morado;

          if(fichaGrafico[this.tipo][this.angulo][py][px]==2)
            ctx.fillStyle = naranja;

          if(fichaGrafico[this.tipo][this.angulo][py][px]==3)
            ctx.fillStyle = amarillo;

          if(fichaGrafico[this.tipo][this.angulo][py][px]==4)
            ctx.fillStyle = verde;

          if(fichaGrafico[this.tipo][this.angulo][py][px]==5)
            ctx.fillStyle = cyan;

          if(fichaGrafico[this.tipo][this.angulo][py][px]==6)
            ctx.fillStyle = azul;

          if(fichaGrafico[this.tipo][this.angulo][py][px]==7)
            ctx.fillStyle = rojo;

          ctx.fillRect((this.x + px - 1)*anchoF,(this.y + py - margenSuperior)*altoF,anchoF,altoF);
        }

      }
    }
  }

  //console.log('pieza creada');

  this.rotar = function(){
    var anguloNuevo = this.angulo
    if(anguloNuevo<3){
      anguloNuevo++;
    }
    else {
      anguloNuevo = 0;
    }

    if(this.colision(anguloNuevo,this.y,this.x)==false){
      this.angulo = anguloNuevo;
    }
    //console.log('rotar')
  }

  this.abajo = function(){
    if(this.colision(this.angulo,this.y+1,this.x)==false){
      this.y++;
    }
    //console.log('abajo')
  }

  this.derecha = function(){
    if(this.colision(this.angulo,this.y,this.x+1)==false){
      this.x++;
    }
    //console.log('derecha')
  }

  this.izquierda = function(){
    if(this.colision(this.angulo,this.y,this.x-1)==false){
      this.x--;
    }
    //console.log('izquierda')
  }

  this.nueva();

}



function dibujaTablero(){
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'black';
	ctx.fillStyle = clrFondo;
	ctx.fillRect(0,0, anchoTablero*anchoF, altoTablero*altoF);
	ctx.strokeRect(0,0,anchoTablero*anchoF, altoTablero*altoF);

  for(py=margenSuperior;py<altoTablero;py++){
    for(px=1;px<anchoTablero+1;px++){
      //console.log((this.x + px),(this.y + py),anchoF,altoF);

      if(tablero[py][px]!=0){

        if(tablero[py][px]==1)
          ctx.fillStyle = morado;

        if(tablero[py][px]==2)
          ctx.fillStyle = naranja;

        if(tablero[py][px]==3)
          ctx.fillStyle = amarillo;

        if(tablero[py][px]==4)
          ctx.fillStyle = verde;

        if(tablero[py][px]==5)
          ctx.fillStyle = cyan;

        if(tablero[py][px]==6)
          ctx.fillStyle = azul;

        if(tablero[py][px]==7)
          ctx.fillStyle = rojo;

        ctx.fillRect((px-1)*anchoF,(py-margenSuperior)*altoF,anchoF,altoF);
      }

    }
  }
  scoreActual=document.getElementById('scoreActual');
  scoreActual.innerHTML=nScore;

}



function inicializaTeclado(){
	console.log('inicializando teclado');

	//LECTURA DE TECLADO
  document.addEventListener('keydown',function(tecla){
    // agrego control de teclado para abandonar pausar

    //	console.log('tocó tecla...', tecla.keyCode);
  	//IZQUIERDA
  	if(tecla.keyCode==37){
      pieza.izquierda();
  	}

  	//ARRIBA
  	if(tecla.keyCode==38){
      pieza.rotar();
  	}

  	//DERECHA
  	if(tecla.keyCode==39){
      pieza.derecha();
  	}

  	//ABAJO
  	if(tecla.keyCode==40){
      pieza.abajo();
  	}

  });

}



function inicializaBotones(){
	btnPausar = document.getElementById("btnPausar");
	enPausa=true;   //false;

	btnPausar  = document.getElementById("btnPausar");
	btnDetener = document.getElementById("btnDetener");
	//	btnOtro    = document.getElementById("btnOtro");
	btnIzq     = document.getElementById("btnIzq");
	btnAba     = document.getElementById("btnAba");
	btnDer     = document.getElementById("btnDer");
	btnHelp    = document.getElementById("btnHelp");
	btnGiro    = document.getElementById("btnGiro");
	btnCorrer  = document.getElementById("btnCorrer");

	btnPausar.addEventListener ('pointerdown click', togglePausa())
	btnDetener.addEventListener ('pointerdown click', togglePausa())
	//	btnOtro   .addEventListener ('pointerdown click', togglePausa())
	btnIzq.addEventListener ('pointerdown click', togglePausa())
	btnAba    .addEventListener ('pointerdown click', togglePausa())
	btnDer    .addEventListener ('pointerdown click', togglePausa())
	btnHelp   .addEventListener ('pointerdown click', togglePausa())
	btnGiro   .addEventListener ('pointerdown click', togglePausa())
	btnCorrer .addEventListener ('pointerdown click', togglePausa())

/*	
togglePausa()" ibtnCorrerd="btnPausar">
detenerJuego();"btnCorrer id="btnDetener">
otroJuego()" id=btnCorrer"btnOtroIzq">
"otroJuego()" idbtnCorrer="btnAba">
"detenerJuego();btnCorrer" id="btnDer">
"detenerJuego();btnCorrer" id="btnHelp">
"detenerJuego();btnCorrer" id="btnGiro">
"correr();" id="btnCorrer">


.on('pointerdown click', function() {
*/

}



function borraCanvas(){
	canvas.width = anchoCanvas;
	canvas.height = altoCanvas;
}


function togglePausa(){
  pausaBtn = document.getElementById("btnPausar");
  // voteable = (age < 18) ? "Too young":"Old enough";
  enPausa = !enPausa;
  if(enPausa){
		pausaBtn.innerHTML =
			'Pausar<br>'+
			'<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 0 24 24" width="48">'+
				'<path d="M0 0h24v24H0z" fill="none"/><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'

			} else {
		//REANUDA
		//	pausaBtn.disabled=false;
		pausaBtn.innerHTML =
			'Iniciar<br>' +
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="black" width="48px" height="48px">' +
			'<path d="M 10,8 v32 l 28,-16 z" /></svg>'
  }
	console.log( enPausa);

}



function detenerJuego() {
  console.log(nIntervId);
  clearInterval(nIntervId);

}



function principal(){
	//console.log(tablero);
  if(!enPausa){
    borraCanvas();
    dibujaTablero();
    pieza.caer();
    pieza.dibuja();
  }
}


/*
  valores a guardar
    nombreJugador
    maxScore

*/

function guardaScore(){
  maxScore = Math.max( nScore, maxScore);
  setStorage('maxScore', maxScore);
}



//---------------------------------------
// funciones auxiliares comunes

//=======================================
// BEGIN for set|get|clear localstorage
//=======================================
function setStorage(key, value){
	if(typeof(window.localStorage) != 'undefined'){
		window.localStorage.setItem(key,value);
	}
}

function getStorage(key){
	var value = null;
	if(typeof(window.localStorage) != 'undefined'){
		value = window.localStorage.getItem(key);
	}
	return value;
}

function clearStorage(key)
{
	if(typeof(window.localStorage) != 'undefined'){
		window.localStorage.removeItem(key);
	}
}


/* function in this file

(7,9):  crear function que genere tablero vacio
(14,41):	volteaPieza.addEventListener ("click", function() { voltearPieza() } );
(25,28):		.on('pointerdown click', function() {
(123,1):function inicializa(){
(153,1):function correr(){
(159,25):  nIntervId=setInterval(function(){
(166,1):function reseteaTablero(){
(179,16):var objPieza = function(){
(190,16):  this.nueva = function(){
(197,28):  this.compruebaSiPierde = function(){
(210,17):  this.limpia = function(){
(237,15):  this.caer = function(){
(261,16):  this.fijar = function(){
(271,19):  this.colision = function(anguloNuevo, yNueva, xNueva){
(285,17):  this.dibuja = function(){
(322,16):  this.rotar = function(){
(337,16):  this.abajo = function(){
(344,18):  this.derecha = function(){
(351,20):  this.izquierda = function(){
(364,1):function dibujaTablero(){
(410,1):function inicializaTeclado(){
(414,39):  document.addEventListener('keydown',function(tecla){
(444,1):function inicializaBotones(){
(479,26):.on('pointerdown click', function() {
(486,1):function borraCanvas(){
(492,1):function togglePausa(){
(506,1):function detenerJuego() {
(514,1):function principal(){
(532,1):function guardaScore(){
(545,1):function setStorage(key, value){
(551,1):function getStorage(key){
(559,1):function clearStorage(key)
(567,4):/* function in this file

*/