/*
	juego-14.js
	del curso de Udemy
*/

var miCanvas;

var fps = 10;
var xEscenario = 0;

function inicializar(){
	console.log("Cargado");
	miCanvas = document.getElementById('canvas');

	miCanvas.addEventListener('mousedown',clickRaton,false)
	miCanvas.addEventListener('mouseup',sueltaRaton,false)
	miCanvas.addEventListener('mousemove',posicionRaton,false)

}


function posicionRaton(e){
	var x = e.pageX;
	var y = e.pageY;
	console.log('x: ' + x + ' - y: ' + y)

}

function clickRaton(e){
	console.log('Pulsado raton');
}

function sueltaRaton(e){
	console.log('Raton liberado');
}

/*
function mueveEscenario() {
	xEscenario++;
	console.log(xEscenario);
}

// BUCLE PRINCIPAL
function principal() {
	mueveEscenario();
}

setInterval(principal, 1000/fps);

*/
