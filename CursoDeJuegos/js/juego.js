var canvas;
var ctx;
var FPS = 50;

//DIMENSIONES DEL CANVAS
var anchoCanvas = 400;
var altoCanvas = 640;

//DIMENSIONES REALES DE CADA CUADRO DEL TABLERO (40x40 pixels)
var tamanyoFicha = 40;

//TABLERO (10x16)
var anchoTablero = 10;
var altoTablero = 20;		//es 20 porque el suelo no se dibuja


var margenSuperior = 4;

//COLORES DE LAS FICHAS
var rojo = "#FF0000";
var morado = "#800080";
var naranja = "#FF8C00";
var amarillo = "#FFD700";
var verde = "#008000";
var cyan = "#00CED1";
var azul = "#0000CD";


//MATRIZ TABLERO (12x21)
//LA MATRIZ ES MAYOR PORQUE AÑADIMOS MÁRGENES PARA LAS COLISIONES

var tablero = [
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,,0,0,0,0,0,1],
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

//COPIA DEL TABLERO PARA PARTIDA NUEVA
var tableroNuevo = [
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


//DIBUJO DE LAS PIEZAS (Matriz de 4 dimensiones)
// fichaGrafico [Pieza] [Posición/rotación] [y] [x]

var fichaGrafico= [
[
	[
	[0,0,0,0],
	[0,1,1,0],
	[0,1,1,0],
	[0,0,0,0]
	],

	[
	[0,0,0,0],
	[0,1,1,0],
	[0,1,1,0],
	[0,0,0,0]
	],

	[
	[0,0,0,0],
	[0,1,1,0],
	[0,1,1,0],
	[0,0,0,0]
	],

	[
	[0,0,0,0],
	[0,1,1,0],
	[0,1,1,0],
	[0,0,0,0]
	]
],

[
	[
	[0,0,0,0],
	[2,2,2,2],
	[0,0,0,0],
	[0,0,0,0]
	],

	[
	[0,0,2,0],
	[0,0,2,0],
	[0,0,2,0],
	[0,0,2,0]
	],

	[
	[0,0,0,0],
	[2,2,2,2],
	[0,0,0,0],
	[0,0,0,0]
	],

	[
	[0,0,2,0],
	[0,0,2,0],
	[0,0,2,0],
	[0,0,2,0]
	]

],

[
	[
	[0,0,0,0],
	[0,0,3,3],
	[0,3,3,0],
	[0,0,0,0]
	],

	[
	[0,0,3,0],
	[0,0,3,3],
	[0,0,0,3],
	[0,0,0,0]
	],

	[
	[0,0,0,0],
	[0,0,3,3],
	[0,3,3,0],
	[0,0,0,0]
	],

	[
	[0,0,3,0],
	[0,0,3,3],
	[0,0,0,3],
	[0,0,0,0]
	]

],

[
	[
	[0,0,0,0],
	[0,4,4,0],
	[0,0,4,4],
	[0,0,0,0]
	],

	[
	[0,0,0,4],
	[0,0,4,4],
	[0,0,4,0],
	[0,0,0,0]
	],

	[
	[0,0,0,0],
	[0,4,4,0],
	[0,0,4,4],
	[0,0,0,0]
	],

	[
	[0,0,0,4],
	[0,0,4,4],
	[0,0,4,0],
	[0,0,0,0]
	]

],

[
	[
	[0,0,0,0],
	[0,5,5,5],
	[0,5,0,0],
	[0,0,0,0]
	],

	[
	[0,0,5,0],
	[0,0,5,0],
	[0,0,5,5],
	[0,0,0,0]
	],

	[
	[0,0,0,5],
	[0,5,5,5],
	[0,0,0,0],
	[0,0,0,0]
	],

	[
	[0,5,5,0],
	[0,0,5,0],
	[0,0,5,0],
	[0,0,0,0]
	]

],

[
	[
	[0,0,0,0],
	[0,6,6,6],
	[0,0,0,6],
	[0,0,0,0]
	],

	[
	[0,0,6,6],
	[0,0,6,0],
	[0,0,6,0],
	[0,0,0,0]
	],

	[
	[0,6,0,0],
	[0,6,6,6],
	[0,0,0,0],
	[0,0,0,0]
	],

	[
	[0,0,6,0],
	[0,0,6,0],
	[0,6,6,0],
	[0,0,0,0]
	]
],


[
	[
	[0,0,0,0],
	[0,7,7,7],
	[0,0,7,0],
	[0,0,0,0]
	],

	[
	[0,0,7,0],
	[0,0,7,7],
	[0,0,7,0],
	[0,0,0,0]
	],

	[
	[0,0,7,0],
	[0,7,7,7],
	[0,0,0,0],
	[0,0,0,0]
	],

	[
	[0,0,7,0],
	[0,7,7,0],
	[0,0,7,0],
	[0,0,0,0]
	]
]
];





var pieza;


//OBJETO PIEZA
var objPieza = function(){
  this.x = 4;
  this.y = 0;

  this.tipo = 0;		//7 posibilidades (0-6)
	this.angulo = 0;	//4 posibilidades (0-3)

	this.retraso = 50;
	this.fotograma = 0;



	//CREAMOS UNA NUEVA PIEZA ALEATORIA
	this.nueva = function(){
		this.tipo = Math.floor((Math.random() * 7));
		this.fotograma = 0;
		this.x = 4;
		this.y = 0;
	}


  this.rotar = function(){
		if(this.angulo < 3)
			anguloNuevo = this.angulo + 1;
		else
			anguloNuevo=0;

		//SI LA FUNCIÓN DEVUELVE UN VALOR FALSO (NO HAY COLISIÓN, CAMBIAMOS EL ÁNGULO)
		if(this.colision(anguloNuevo, this.x, this.y)==false){
			this.angulo = anguloNuevo;
		}

  }



	this.colision = function(anguloNuevo, xNueva, yNueva){
		var resultado = false;

		//COMPROBAMOS LA COLISIÓN CON EL TABLERO
		for(py=0;py<4;py++){
			for(px=0;px<=4;px++){

				if(fichaGrafico[this.tipo][anguloNuevo][py][px]>0){
					if(tablero[yNueva + py][xNueva + px]>0){
						resultado = true;
					}

				}
			}
		}

		//Devolvemos el resultado a la función principal
		return resultado;

	};







  this.izquierda = function(){

		if(this.colision(this.angulo, this.x - 1, this.y)==false){
			this.x = this.x - 1;
		}
    console.log("izquierda");
  }



  this.derecha = function(){

		if(this.colision(this.angulo, this.x + 1, this.y)==false){
			this.x = this.x + 1;
		}
    console.log("derecha");
  }



  this.abajo = function(){

		if(this.colision(this.angulo, this.x, this.y +1)==false){
			this.y = this.y + 1;
		}
    console.log("abajo");
  }





	//SI LA FILA 2 TIENE ALGO QUE NO SEA CEROS, TERMINA LA PARTIDA
	this.compruebaSiPierde = function(){

		var pierde = false;

		for(px=1; px<anchoTablero+1; px++){
			if(tablero[2][px] > 0){
				pierde = true;
			}
		}

		return(pierde);
	};



	//COMPROBAMOS SI HAY QUE LIMPIAR ALGUNA FILA
	this.limpiaFilas = function(){

		var filaCompleta;

		for(py=margenSuperior;py<altoTablero;py++){

			filaCompleta = true;	//asumimos que la fila está completa

			for(px=1;px<=anchoTablero;px++){
				if(tablero[py][px]==0){
					filaCompleta = false;
				}
			}

			//SI TRAS REVISAR LA FILA, ESTÁ COMPLETA (NO HAY HUECOS) LA BORRAMOS
			if(filaCompleta == true){
				console.log("limpia");
				for(px=1;px<=anchoTablero;px++){
					tablero[py][px] = 0;
				}
			}


		}//fin segundo for

	};




	//FIJAMOS LA PIEZA AL TABLERO
	this.fijar = function(){

		for(py=0;py<4;py++){
			for(px=0;px<=4;px++){

				if(fichaGrafico[this.tipo][this.angulo][py][px]>0){
					tablero[this.y + py][this.x + px] = fichaGrafico[this.tipo][this.angulo][py][px];
				}
			}
		}

	}




	//FUNCIÓN CAER DE LA PIEZA
	this.caer = function(){

		if(this.fotograma >= this.retraso){
				this.fotograma = 0;

				//ANTES DE CAER COMPROBAMOS LA COLISIÓN
				if(this.colision(this.angulo, this.x, this.y +1)==false){
					this.y = this.y + 1;
				}
				else{
					this.fijar();		//SI NO PUEDE CAER MÁS, HAY QUE FIJAR LA PIEZA AL TABLERO

					this.nueva();					//RESETEAMOS LA FICHA PARA QUE VUELVA A CAER CON OTRA FORMA
					this.limpiaFilas();		//COMPROBAMOS SI HAY ALGUNA LÍNEA COMPLETA

					if(this.compruebaSiPierde()){
						reiniciaTablero();
						console.log("pierde");
					}
				}

		}

		else{
			this.fotograma++;
		}

	};




  //DIBUJAMOS LA PIEZA EN PANTALLA
  this.dibuja = function(){
    for(py=0;py<4;py++){
			for(px=0;px<=4;px++){


				if(fichaGrafico[this.tipo][this.angulo][py][px]>0){

				if(fichaGrafico[this.tipo][this.angulo][py][px]==1)
					ctx.fillStyle=rojo;
				if(fichaGrafico[this.tipo][this.angulo][py][px]==2)
					ctx.fillStyle=morado;
				if(fichaGrafico[this.tipo][this.angulo][py][px]==3)
					ctx.fillStyle=naranja;
				if(fichaGrafico[this.tipo][this.angulo][py][px]==4)
					ctx.fillStyle=amarillo;
				if(fichaGrafico[this.tipo][this.angulo][py][px]==5)
					ctx.fillStyle=verde;
				if(fichaGrafico[this.tipo][this.angulo][py][px]==6)
					ctx.fillStyle=cyan;
				if(fichaGrafico[this.tipo][this.angulo][py][px]==7)
					ctx.fillStyle=azul;

				//a this.py le restamos el margen superior para que aparezca en la posición correcta
				ctx.fillRect(((this.x + px - 1)*tamanyoFicha),(((this.y-margenSuperior)+py)*tamanyoFicha),tamanyoFicha,tamanyoFicha);

				}
			}
		}
  };

	//AL CREAR EL OBJETO PIEZA, LO HACEMOS DE FORMA ALEATORIA
	this.nueva();

}


//COPIAMOS EL TABLERO ÍNTEGRO
function reiniciaTablero(){
	for(py=0;py<21;py++){
		for(px=0;px<12;px++){
			tablero[py][px] = tableroNuevo[py][px];
		}
	}
}




//DIBUJA EL TABLERO CON TODAS LAS FICHAS QUE YA HAN CAÍDO
function dibujaTablero(){
	for(py=margenSuperior;py<=altoTablero;py++){
		for(px=1;px<=anchoTablero;px++){

			if(tablero[py][px]>0){
				if(tablero[py][px]==1)
					ctx.fillStyle=rojo;
				if(tablero[py][px]==2)
					ctx.fillStyle=morado;
				if(tablero[py][px]==3)
					ctx.fillStyle=naranja;
				if(tablero[py][px]==4)
					ctx.fillStyle=amarillo;
				if(tablero[py][px]==5)
					ctx.fillStyle=verde;
				if(tablero[py][px]==6)
					ctx.fillStyle=cyan;
				if(tablero[py][px]==7)
					ctx.fillStyle=azul;

				//A la posición this.py le restamos el margen superior para que dibuje en la zona de la pantalla física que toque
				ctx.fillRect(((this.px-1)*tamanyoFicha),((this.py-margenSuperior)*tamanyoFicha),tamanyoFicha,tamanyoFicha);
			}
		}
	}
}




function inicializaTeclado(){
  //LECTURA DEL TECLADO
  document.addEventListener('keydown',function(tecla){

    if(tecla.keyCode == 38){
      pieza.rotar();
    }

    if(tecla.keyCode == 40){
      pieza.abajo();
    }

    if(tecla.keyCode == 37){
      pieza.izquierda();
    }

    if(tecla.keyCode == 39){
      pieza.derecha();
    }

  });
}




function inicializa(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  document.getElementById('canvas').style.width = anchoCanvas;
  document.getElementById('canvas').style.height = altoCanvas;

  //CREAMOS LA PIEZA
  pieza = new objPieza();

  inicializaTeclado();


  setInterval(function(){
    principal();
  },1000/FPS);
}


function borraCanvas(){
  canvas.width=anchoCanvas;
  canvas.height=altoCanvas;
}


function principal(){
  borraCanvas();
  dibujaTablero();
	pieza.caer();
  pieza.dibuja();
}
