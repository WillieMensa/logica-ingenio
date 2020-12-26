//Aliases
"use strict";

//=========
// constantes
//=========
const
	versionString = "0.3.0", //  lleva el numero de version actual
	DEBUG = false,
	//	DEBUG = true,
	NRO_PROB = 1,
	NDIG = 10; //	cantidad de dígitos

let
	cLetrasA = 'ABCDEFGHIJ',		//	cadena de letras del problema
	cLetrasB = "",
	cLetrasC = "",
	nroProbActual;										//	nro problema actual (el valor)

var
	//	nProblema,
	cNumA,		//	cadena de diez digitos diferentes
	cNumB, cNumC,
	ctx;			//	variable global para el canvas


//==================
// BEGIN
//==================
window.onload = function(){
	poneMenuPpal();
	init();
};


let 	canvas = document.getElementById('canvas');

function init() {
	nroProbActual = getNroProbl();			//	leer nro problema actual
	//	let input = document.getElementById("numero").value;
	document.getElementById("numero").value = nroProbActual;
	draw();

};


//	var canvas;

function draw() {
	//	canvas = document.getElementById('canvas');
	//	nroProbActual = getNroProbl();			//	leer nro problema actual
	//	poner el numero de problema en el input
	ctx = canvas.getContext('2d');
	dibujaFondo();
	limpiaCasillas();		//	limpiar casillas
	//	GeneraJuego();	//	generar juego
	leeJuegoSerie();		//	para que lea problemas ya preparados
	muestraFilaSol();		//	casillas de pista y solucion
	muestraFilProb();		//	casillas de digitos problema
}


function dibujaFondo() {
	//	rectangulo de fondo para que salga bien el .PNG
	ctx.fillStyle = 'rgb(240, 240, 240)';
	ctx.fillRect(0,0, 650, 325);				

	//	dibuja Grilla
	if (DEBUG)
		{
		ctx.beginPath();              
		ctx.lineWidth = "0.51";
		ctx.strokeStyle = "#6688aa";  // Green path
		for (var i=0;i<=650 ; i+=25 )
		{	//	lineas horizontales
			ctx.moveTo(0, i);
			ctx.lineTo(700, i);
			//	lineas verticales
			ctx.moveTo(i, 0);
			ctx.lineTo(i, 700);
		}
		ctx.stroke();  // Draw it
	}

		//	dos cuadraditos de muestra arriba derecha
	ctx.fillStyle = 'rgb(200, 0, 0)';
	ctx.fillRect( 10, 10, 50, 50);
	ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
	ctx.fillRect( 30, 30, 50, 50);


	// cambio estilo para casilleros
	ctx.lineWidth = "2";
	ctx.strokeStyle = "#888";  // Green path
	//	dibuja fila de casilleros pista y solución
	ctx.beginPath();
	for (var i=0;i<10;i++ )
	{
		ctx.rect(200+i*40, 25, 30, 30);
		ctx.rect(200+i*40, 60, 30, 30);
	}
	//	dibuja fila de casilleros del problema
	for (var i=0;i<10;i++ )
	{
		ctx.rect(100+i*50,150, 40, 40);
		ctx.rect(100+i*50,200, 40, 40);
		ctx.rect(100+i*50,260, 40, 40);
	}
	ctx.stroke();

	// cambio estilo para linea
	ctx.lineWidth = "4";
	ctx.strokeStyle = "#222";  // Green path
	ctx.beginPath();
	ctx.moveTo(50,250);
	ctx.lineTo(600,250);
	ctx.stroke();  // Draw it

};


function limpiaCasillas() {			//	limpiar pantalla
};



function leeJuegoSerie() {		// recupera datos de un juego de serie
	let
		numA = 0,
		numB = 0,
		numC = 0;		//	los numeros que operan: sumando 1, sumando2 y resultado

	if (DEBUG){
		console.log('--- inmediatemente antes de leer ---');
		console.log("nroProbActual: ", nroProbActual );
	}
	cNumA = problemas[nroProbActual-1].cDigA;	//	cadena de digitos del primer sumando
	cNumB = problemas[nroProbActual-1].cDigB;	//	cadena de digitos del primer sumando
	//	calculo del numero valor A
	for (let i = 0; i < cNumA.length; i++) {
		numA += cNumA[i] * Math.pow(10, (9 - i));
	}
	for (let i = 0; i < cNumB.length; i++) {
			numB += cNumB[i] * Math.pow(10, (9 - i));
	}
	numC = numA + numB;

	//	aqui tenemos calculados los tres numeros
	cNumC = ("0".repeat(10) + numC.toString()).substr(-10);

	cLetrasB = "";
	cLetrasC = "";
	// comenzamos a colocar las letras
	// armar array de equivalencias
	for (let i = 0; i < cNumA.length; i++) {
		//	console.log(i, " cNumB[i]: ", cNumB[i], cLetrasA[cNumA.indexOf( cNumB[i] )] );
		cLetrasB += cLetrasA[cNumA.indexOf( cNumB[i] )];
		cLetrasC += cLetrasA[cNumA.indexOf( cNumC[i] )];
	}

	if (DEBUG){
		console.log("cNumA: ", cNumA);
		console.log("cNumB: ", cNumB);
		console.log("cNumC: ", cNumC);
		console.log("cLetrasB: ", cLetrasB);
	}

}



/**
* @function GeneraJuego() 
* funciones para preparar nuevo juego
* generar un array con todos los digitos en orden aleatorio
* generar 2 cadenas o array diez digitos aleatorios
* Usa la mayor como cadena resultado (para nunca exceder los diez digitos
* usa la menor como cadena A
* calcula cadena B como diferencia de las anteriosres
*/
function GeneraJuego() //	genera un nuevo juego
{
	var
			aDigitosA,	//	array con digitos del numero A
			aDigitosB,	//	array con digitos del numero B
			aDigitosC,	//	array con digitos del numero C
			numA, numB, numC;	//	los numeros que operan: sumando 1, sumando2 y resultado

	if (DEBUG){var nPasadas = 1};

	do
	{	// repetir hasta que numA < numC para que todos los numeros sean positivos
		//	aDigitosA = [];											//	arrancar con array vacioarray
		numA = 0;
		numC = 0;
		aDigitosA = GeneraLineaDigitos();		//	array con los digitos diferentes en orden aleatorio
		aDigitosC = genCadena10();
		
		//	calculo del numero A
		for (var i = 0; i < NDIG; i++) {
				numA += aDigitosA[i] * Math.pow(10, (9 - i));
		}

		//	calculo del numero C
		for (var i = 0; i < NDIG; i++) {
				numC += aDigitosC[i] * Math.pow(10, (9 - i));
		}
	}
	while ( numA > numC );
	numB = numC - numA;
	//	aqui tenemos calculados los tres numeros

	if (DEBUG) { console.log( 
		"pasadas:", nPasadas,
		"\naDigitosA: ", aDigitosA,
		"\nnumA: ", numA,
		"\nnumC: ", numC )};

	cNumA = ("0".repeat(10) + numA.toString()).substr(-10); //	cadena de digitos del numero A
	cNumB = ("0".repeat(10) + numB.toString()).substr(-10);
	cNumC = ("0".repeat(10) + numC.toString()).substr(-10);

	if (DEBUG) { console.log( "numB: " + numB )};

	// comenzamos a colocar las letras
	//	armar array de equivalencias
	if (DEBUG){
		console.log("cNumA: ", cNumA);
		console.log("cLetrasA: ", cLetrasA);
	}

	for (var i = 0; i < NDIG; i++) {
			cLetrasB += cLetrasA[cNumA.indexOf( cNumB[i] )];
			cLetrasC += cLetrasA[cNumA.indexOf( cNumC[i] )];
	}

}



function muestraFilaSol() {		//	muestra las dos primeras filas con pista lugar para solucion
	//	relleno casillero de pista y solución
	ctx.font = '2.0em fredoka-one';
	ctx.fillStyle = '#123';
	ctx.textAlign = "center";
	for (var i=0;i<10;i++ )
	{
		ctx.fillText( cLetrasA[i],215+i*40, 50);
	}
	ctx.fillText(cNumA[0],215, 85);
}


function muestraFilProb() {
	//	relleno casillero del problema
	//	ctx.font = '2rem cursive';   // esto va bien para la solucion escrita a mano
	//	ctx.font = '2rem Impact';
	//	ctx.font = '2rem Showcard Gothic';
	ctx.font = '3.0em fredoka-one';
	ctx.fillStyle = '#123';
	for (var i=0;i<10;i++ )
	{
		ctx.fillText( cLetrasA[i],120+i*50,185);
		ctx.fillText( cLetrasB[i],120+i*50,235);
		ctx.fillText( cLetrasC[i],120+i*50,295);
	}
	ctx.fillText('+',70,210);
	ctx.fillText('=',70,295);
};


function GeneraLineaDigitos() {  // genera array 10 digitos diferentes orden aleatorio
	var aVertex = [];

	for (var i = 0; i < NDIG; i++) {
			aVertex.push(i);
	}

	//	shuffle the vertex
	//	Scheitelpunkte vermischen
	for (i = 0; i < 50; i++) {
			var from = Math.floor(Math.random() * NDIG);
			var to = Math.floor(Math.random() * NDIG);
			var tmp = aVertex[from];
			aVertex[from] = aVertex[to];
			aVertex[to] = tmp;
	}
	return aVertex;
}


function genCadena10() {  // genera cadena 10 digitos aleatorios
	var
			aCadena = [], 
			nAleatorio = undefined;
	for (var i = 0; i < NDIG; i++) {
			nAleatorio = Math.floor(Math.random() * NDIG);
			aCadena.push( (nAleatorio).toString());
	}
	return aCadena;
}



function muestraSolucion() {

	//	relleno casillero de pista y solución
	ctx.font = '2.0em fredoka-one';
	ctx.fillStyle = '#123';
	ctx.textAlign = "center";
	for (var i=0;i<10;i++ )
	{
		ctx.fillText(cNumA[i],215+i*40, 85);
	}
}



function limpiaSoluc() {		//	limpia casillas con digitos de solución

	if (DEBUG) { console.log('voy a limpiar solucion ....')};
	ctx.beginPath();
	for (var i=1;i<10;i++ )
	{
		ctx.fillStyle = 'rgb(240, 240, 240)';
		ctx.fillRect(200+i*40, 60, 30, 30);
	}
	ctx.stroke;
}


//	manejo del nro de problema
//----------------------------------
// save nro problema to localstorage
//----------------------------------
function setNroProbl() {
	if (DEBUG)	{	console.log('en setNroProbl()\nnro de problema : ', nroProbActual );	}
	setStorage("nroSumaOculta", nroProbActual);
	if (DEBUG)	{	console.log('nro de problema fijado: ' + nroProbActual);	}
	//	console.trace();
}

//-------------------------------------------
// get nro problema from localstorage
//-------------------------------------------
function getNroProbl()
{
	let nCual = getStorage("nroSumaOculta");
	if (DEBUG) { 	console.log('nCual: ' + nCual ); 	};
	if(isNaN(nCual) || nCual < NRO_PROB )
	{
		nCual = NRO_PROB;
	}
	return (nCual)
}

//=======================================
// BEGIN for set|get|clear localstorage
//=======================================
function setStorage(key, value)
{
	if(typeof(window.localStorage) != 'undefined'){
		window.localStorage.setItem(key,value);
	}
}

function getStorage(key)
{
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



function ajustaNumProb() {
	let input = document.getElementById("numero")
	nroProbActual = input.value;
	setNroProbl();
	if (DEBUG) { console.log('ajustando nroProbActual: ', nroProbActual )};
	draw();

}

