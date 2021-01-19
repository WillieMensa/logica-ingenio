/*
	juego-13.js
	SESION 13 del curso de Udemy
	programa-tus-primeros-juegos-html5-con-javascript
*/

var configTeclado = { prevent_repeat: true }

var eventoTeclado = new window.keypress.Listener(this,configTeclado);


function pulsaA(){
	console.log('Has pulsado A'	);
}

function pulsaAB(){
	console.log('Has pulsado A y B simultaneamente'	);
}

eventoTeclado.simple_combo('a',pulsaA);

eventoTeclado.simple_combo('a b',pulsaAB);


