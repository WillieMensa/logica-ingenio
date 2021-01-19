/*
	keycode_test.js
	detectar codigo de tecla pulsada
*/

var canvas;
var ctx;
var FPS = 50;

var imgRex;


function inicializa(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	// CARGAMOS IMAGEN
	imgRex = new Image();
	imgRex.src = 'img/AlbertoF.webp';

	setInterval(function(){
		principal();
	},1000/FPS);
}



document.addEventListener('keydown',function(tecla){
	console.log(tecla.keyCode);

});



function borraCanvas(){
	canvas.width = 500;
	canvas.height = 400;
}


function principal(){
	// console.log('funcion');
	borraCanvas();

}
