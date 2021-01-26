/*
	tetris.js
	a partir de juego-28 del curso de Udemy
  Tetris

  Optimizaciones
  crear function que genere tablero vacio

*/

var canvas;
var ctx;
var FPS = 100;

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
var clrFondo = '#eeeeee';

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

      //console.log('filaCompleta; ',filaCompleta);

      if(filaCompleta==true){
        for(px=1; px<anchoTablero+1; px++){
          tablero[py][px]=0;
        }
				//	eliminamos la filacompleta
				tablero.splice(py,1);
				// e insertamos una fila vacia al inicio
				tablero.unshift([1,0,0,0,0,0,0,0,0,0,0,1]);
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
          reseteaTablero();
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

}


function inicializaTeclado(){
  //LECTURA DE TECLADO
  document.addEventListener('keydown',function(tecla){
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

function inicializa(){
  canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

  canvas.style.width = anchoCanvas;
  canvas.style.height = altoCanvas;

  pieza = new objPieza();

  inicializaTeclado();

  //console.log(tablero);

	setInterval(function(){
		principal();
	},1000/FPS);

}


function borraCanvas(){
	canvas.width = anchoCanvas;
	canvas.height = altoCanvas;
}


function principal(){
	//console.log(tablero);

	borraCanvas();
  dibujaTablero();
  pieza.caer();
  pieza.dibuja();
  // dibujaEscenario();
  // imagenAntorcha.dibuja();
  // protagonista.dibuja();

  // for(c=0; c < enemigo.length; c++){
  //   enemigo[c].mueve();
  //   enemigo[c].dibuja();
  // }

}
