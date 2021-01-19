/*
	juego-15.js
	del curso de Udemy
*/

var miCanvas;

var personaje = function(x,y,nombre){
	this.x = x;
	this.y = y;
	this.nombre = nombre;

	// metodo abajo
	this.abajo = function(){
		this.y += 10;
	}

	// METODO HABLAR
	this.hablar = function(){
		console.log('Hola amigo. Mi nombre es ' + this.nombre )
	}
}

var personaje1 = new personaje(10,100,'Frodo');
var personaje2 = new personaje(150,210,'Sam');


function inicializar(){
	console.log("Cargado");
	miCanvas = document.getElementById('canvas');

}
