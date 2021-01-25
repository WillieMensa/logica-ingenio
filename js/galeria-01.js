/*
	galeria.js
*/

var canvas;
var ctx;
var FPS = 50;

var anchoF = 120;
var altoF = 160;


var tileMap;


function inicializar(){
  canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

  //LECTURA PULSACIONES RATON
  canvas.addEventListener('mousedown',clickRaton,false);

  tileMap = new Image();   // Create new img element
  tileMap.addEventListener('load', function() {
    // execute drawImage statements here
    ctx.drawImage(tileMap,0,0);
  }, false);
  tileMap.src='images/personajes/galeria-publicos.webp'; // Set source path

  console.log('pagina inicializada!');


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

}

function clickRaton(e){
  var x = e.pageX;
	var y = e.pageY;
	console.log('x: ' + x + ' - y: ' + y);

  var fila = Math.floor(y/128) ;
  var colu = Math.floor(x/96);

}


function principal(){

}



function myFunction(imgs) {
  var expandImg = document.getElementById("expandedImg");
  var imgText = document.getElementById("imgtext");
  expandImg.src = imgs.src;
  imgText.innerHTML = imgs.alt;
  expandImg.parentElement.style.display = "block";
}
