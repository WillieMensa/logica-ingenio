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

var protagonista;

var imagenAntorcha;

var enemigo = [];

var tileMap;

var escenario = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,2,2,0,0,0,2,2,2,2,0,0,2,2,0],
  [0,0,2,2,2,2,2,0,0,2,0,0,2,0,0],
  [0,0,2,0,0,0,2,2,0,2,2,2,2,0,0],
  [0,0,2,2,2,0,0,2,0,0,0,2,0,0,0],
  [0,2,2,0,0,0,0,2,0,0,0,2,0,0,0],
  [0,0,2,0,0,0,2,2,2,0,0,2,2,2,0],
  [0,2,2,2,0,0,2,0,0,0,1,0,0,2,0],
  [0,2,2,3,0,0,2,0,0,2,2,2,2,2,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

function dibujaEscenario(){

  for (y=0;y<10;y++){
    for (x=0;x<15;x++){
      //console.log(escenario[x][y])
      var tile = escenario[y][x];

      //ctx.fillStyle = color;
      //ctx.fillRect(x*anchoF,y*altoF,anchoF,altoF);

      //recorta y dibuja una parte del tileMap
      ctx.drawImage(tileMap,tile*32,0,32,32,anchoF*x,altoF*y,anchoF,altoF);
      // parametros:
      // tileMap   : variable que almacena la imagen
      // tile*32,0 : posicion en el tileMap
      // 32,32     : medidas a recortar
      // anchoF*x,altoF*y : posicion a darle en el tablero (canvas)
      // anchoF,altoF : medidas a darle en el tablero

    }
  }
}

var antorcha = function(x,y){
  this.x = x;
  this.y = y;

  this.retraso = 10;
  this.contador = 0;
  this.fotograma = 0;   // 0-3

  this.cambiaFotograma = function(){
    if(this.fotograma<3){
      this.fotograma++;
    }
    else{
      this.fotograma= 0;
    }
  }


  this.dibuja = function(){
    if(this.contador < this.retraso){
      this.contador++;
    } else{
      this.contador = 0;
      this.cambiaFotograma();

    }
    ctx.drawImage(tileMap,this.fotograma*32,64,32,32,anchoF*x,altoF*y,anchoF,altoF);
  }

}


//CLASE ENEMIGO
var malo = function(x,y){
  this.x = x;
  this.y = y;

  this.direccion = Math.floor(Math.random()*4);

  this.retraso = 50;
  this.fotograma = 0;

  this.dibuja = function(){
    ctx.drawImage(tileMap,0,32,32,32,this.x*anchoF,this.y*altoF,anchoF,altoF);
  }

  this.compruebaColision = function(x,y){
    var colisiona = false;
    if(escenario[y][x]==0){
      colisiona = true;
    }
    return colisiona;
  }

  this.mueve = function(){

    protagonista.colisionEnemigo(this.x,this.y);

    if(this.contador < this.retraso){
      this.contador++;
    }
    else {
      this.contador = 0;
      // ENEMIGO IZQUIERDA
      if(this.direccion==0){
        if(this.compruebaColision(this.x-1,this.y)==false){
          this.x--;
        }
        else {
          this.direccion = Math.floor(Math.random()*4);
        }
      }

      // ENEMIGO ARRIBA
      if(this.direccion==1){
        if(this.compruebaColision(this.x,this.y-1)==false){
          this.y--;
        }
        else {
          this.direccion = Math.floor(Math.random()*4);
        }
      }


      // ENEMIGO DERECHA
      if(this.direccion==2){
        if(this.compruebaColision(this.x+1,this.y)==false){
          this.x++;
        }
        else {
          this.direccion = Math.floor(Math.random()*4);
        }
      }

      // ENEMIGO ABAJO
      if(this.direccion==3){
        if(this.compruebaColision(this.x,this.y+1)==false){
          this.y++;
        }
        else {
          this.direccion = Math.floor(Math.random()*4);
        }
      }
    }
  }
}


//OBJETO JUGADOR
var jugador = function(){
  this.x = 1;
  this.y = 1;
  this.color = '#820c01';
  this.llave = false;

  this.dibuja = function(){
    ctx.drawImage(tileMap,32,32,32,32,this.x*anchoF,this.y*altoF,anchoF,altoF);
  }

  this.colisionEnemigo = function(x,y){
    if(this.x == x && this.y == y){
      this.muerte();
    }
  }

  //CONTROL NO SALIRSE DEL CAMINO
  this.margenes = function(x,y){
    var colision = false;
    if(escenario[y][x] == 0){
      colision = true;
    }
    return(colision);
  }

  this.arriba = function(){
    if(this.margenes(this.x,this.y-1)==false){
      this.y--;
      this.logicaOjetos()
    }
  }

  this.abajo = function(){
    if(this.margenes(this.x,this.y+1)==false){
      this.y++;
      this.logicaOjetos()
    }
  }

  this.izquierda = function(){
    if(this.margenes(this.x-1,this.y)==false){
      this.x--;
      this.logicaOjetos()
    }
  }

  this.derecha = function(){
    if(this.margenes(this.x+1,this.y)==false){
      this.x++;
      this.logicaOjetos()
    }
  }

  this.victoria = function(){
    console.log('Has ganado!');
    this.x = 1;
    this.y = 1;
    this.llave = false;
    escenario[8][3] = 3;
  }

  this.muerte = function(){
    console.log('Has perdido!');
    this.x = 1;
    this.y = 1;
    this.llave = false;
    escenario[8][3] = 3;
  }

  this.logicaOjetos = function(){
    var objeto = escenario[this.y][this.x];

    //OBTIENE LLAVE
    if (objeto==3){
      this.llave = true;
      escenario[this.y][this.x] = 2;
      console.log('Has obtenido la llave!!!');
    }

    //ABRIMOS LA PUERTA
    if(objeto==1){
      if(this.llave==true)
        this.victoria();
      else {
        console.log('TE FALTA LA LLAVE. NO PUEDES PASAR.')
      }

    }
  }

}

function inicializa(){
  canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

  tileMap = new Image();
  tileMap.src = 'img/tileMap.png'

  // CREAMOS EL JUGADOR
  protagonista = new jugador();

  //CREAMOS LA ANTORCHA
  imagenAntorcha = new antorcha(0,0);

  //CREAMOS ENEMIGOS
  enemigo.push(new malo(3,3));
  enemigo.push(new malo(5,5));
  enemigo.push(new malo(7,7));

  //LECTURA DE TECLADO
  document.addEventListener('keydown',function(tecla){
  	//IZQUIERDA
  	if(tecla.keyCode==37){
  		protagonista.izquierda();
  	}

  	//ARRIBA
  	if(tecla.keyCode==38){
      protagonista.arriba();
  	}

  	//DERECHA
  	if(tecla.keyCode==39){
  		protagonista.derecha();
  	}

  	//ABAJO
  	if(tecla.keyCode==40){
  		protagonista.abajo();
  	}

  });



	setInterval(function(){
		principal();
	},1000/FPS);

}


function borraCanvas(){
	canvas.width = 750;
	canvas.height = 500;
}


function principal(){
	// console.log('funcion');
	borraCanvas();
  dibujaEscenario();
  imagenAntorcha.dibuja();
  protagonista.dibuja();

  for(c=0; c < enemigo.length; c++){
    enemigo[c].mueve();
    enemigo[c].dibuja();
  }

}
