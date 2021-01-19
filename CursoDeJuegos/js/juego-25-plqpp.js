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


//COLORES DE PIEZAS
var rojo = '#FF0000';
var morado = '#800080';
var naranja = '#FFBC00';
var amarillo = '#FFD700';
var verde = '#008000';
var cyan = '#00CED1';
var azul = '#0000CD';


var fichaGrafico = [
  [ //  PIEZA 1 : CUADRADO : O
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

  [ //  PIEZA 2 :  I
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

  [ //  PIEZA 3 : S
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

  [ //  PIEZA 4 : Z
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

  [ //  PIEZA 5 : L
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
      [0,0,0,0],
      [0,0,0,5],
      [0,5,5,5],
      [0,0,0,0]
    ],
    [
      [0,5,5,0],
      [0,0,5,0],
      [0,0,5,0],
      [0,0,0,0]
    ]
  ],

  [ //  PIEZA 6 : L REFLEJADA
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

  [ //  PIEZA 7 : T
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

var objPieza = function(){
  this.x = 0;
  this.y = 0;

  this.angulo = 0;
  this.tipo = 6;    //cual pieza

  this.dibuja = function(){
    for(py=0;py<4;py++){
      for(px=0;px<4;px++){
        //console.log((this.x + px),(this.y + py),anchoF,altoF);

        if(fichaGrafico[this.tipo][this.angulo][px][py]!=0){

          if(fichaGrafico[this.tipo][this.angulo][px][py]==1)
            ctx.fillStyle = morado;

          if(fichaGrafico[this.tipo][this.angulo][px][py]==2)
            ctx.fillStyle = naranja;

          if(fichaGrafico[this.tipo][this.angulo][px][py]==3)
            ctx.fillStyle = amarillo;

          if(fichaGrafico[this.tipo][this.angulo][px][py]==4)
            ctx.fillStyle = verde;

          if(fichaGrafico[this.tipo][this.angulo][px][py]==5)
            ctx.fillStyle = cyan;

          if(fichaGrafico[this.tipo][this.angulo][px][py]==6)
            ctx.fillStyle = azul;

          if(fichaGrafico[this.tipo][this.angulo][px][py]==7)
            ctx.fillStyle = rojo;

          ctx.fillRect((this.x + px)*anchoF,(this.y + py)*altoF,anchoF,altoF);
        }

      }
    }
  }

  console.log('pieza creada');

  this.rotar = function(){
    console.log('rotar')
  }
  this.abajo = function(){
    console.log('abajo')
  }
  this.derecha = function(){
    console.log('derecha')
  }
  this.izquierda = function(){
    console.log('izquierda')
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
  pieza.dibuja();
  // dibujaEscenario();
  // imagenAntorcha.dibuja();
  // protagonista.dibuja();

  // for(c=0; c < enemigo.length; c++){
  //   enemigo[c].mueve();
  //   enemigo[c].dibuja();
  // }

}
