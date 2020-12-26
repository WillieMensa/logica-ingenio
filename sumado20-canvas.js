/*
	sumado20-canvas.js
	2020.12.11 
*/

window.onload = start;

const
	NCOL = 3,
	NFIL = 3,
	NPOLIG = 8,
	NVERT=9,
	paso = 80,		//	separacion entre vertices
	radio = 16,
	DEBUG = false;
	//	DEBUG = true;

let 
	aVertex,					//	para ubicar numeros aleatoriamente
	nroPagina = 1,
	lConSoluc,				//	indicador esta mostrando solución
	nPagActual,				//	nro problema actual (el valor)
	//	posX = undefined,
	//	posY = undefined,
	aSuma, aVert,
	c = document.getElementById("canvas1"),
	ctx = c.getContext("2d");

	//	posiciones donde colocar las sumas
	let aPosSumas = {
		'RA':[
			[0.32*paso, 0.68*paso],
			[0.68*paso, 0.32*paso],
			[1.32*paso, 0.32*paso],
			[1.68*paso, 0.68*paso],
			[0.32*paso, 1.32*paso],
			[0.68*paso, 1.68*paso],
			[1.32*paso, 1.68*paso],
			[1.68*paso, 1.32*paso]
		],
		'CO':[
			[0.32*paso, 0.32*paso],
			[0.68*paso, 0.68*paso],
			[1.32*paso, 0.68*paso],
			[1.68*paso, 0.32*paso],
			[0.32*paso, 1.68*paso],
			[0.68*paso, 1.32*paso],
			[1.32*paso, 1.32*paso],
			[1.68*paso, 1.68*paso]
		],
		'DD':[
			[0.32*paso, 0.68*paso],
			[0.68*paso, 0.32*paso],
			[1.32*paso, 0.68*paso],
			[1.68*paso, 0.32*paso],
			[0.32*paso, 1.68*paso],
			[0.68*paso, 1.32*paso],
			[1.32*paso, 1.68*paso],
			[1.68*paso, 1.32*paso]
		],
		'DI':[
			[0.32*paso, 0.32*paso],
			[0.68*paso, 0.68*paso],
			[1.32*paso, 0.32*paso],
			[1.68*paso, 0.68*paso],
			[0.32*paso, 1.32*paso],
			[0.68*paso, 1.68*paso],
			[1.32*paso, 1.32*paso],
			[1.68*paso, 1.68*paso]
		],
		'CR':[
			[0.32*paso, 0.68*paso],
			[0.68*paso, 0.32*paso],
			[1.32*paso, 0.68*paso],
			[1.68*paso, 0.32*paso],
			[0.32*paso, 1.32*paso],
			[0.68*paso, 1.68*paso],
			[1.32*paso, 1.32*paso],
			[1.68*paso, 1.68*paso]
		],
		'CL':[
			[0.32*paso, 0.32*paso],
			[0.68*paso, 0.68*paso],
			[1.32*paso, 0.32*paso],
			[1.68*paso, 0.68*paso],
			[0.32*paso, 1.68*paso],
			[0.68*paso, 1.32*paso],
			[1.32*paso, 1.68*paso],
			[1.68*paso, 1.32*paso]
		],
	};


function start() {
	nPagActual = getNroPag();			//	leer nro problema actual
	document.getElementById("numero").value = nPagActual;
	if (DEBUG) { DibujaGrillaA4() }
	dibujaPag();
};


	function dibujaPag() {
		leeJuegosPagina();

		//<canvas id="canvas1" width="560" height="794" class="img-responsive" style="border:1px solid #000000;"></canvas>
		ctx.fillStyle = '#f0d0b0ff';			//	#f2e8cfff;
		ctx.fillRect(1, 1, 560, 794);

		//	detectar si se pidio con solucion
		var checkBox = document.getElementById("conSolucion");
		lConSoluc = checkBox.checked;

		//	console.log( 'lConSoluc: ', lConSoluc );
		presentaGrilla("RA", 080, 060);
		presentaGrilla("CO", 320, 060);

		presentaGrilla("DD", 080, 300);
		presentaGrilla("DI", 320, 300);

		presentaGrilla("CR", 080, 540);
		presentaGrilla("CL", 320, 540);
		//DibujaGrillaA4();
	}

function presentaGrilla( modGrilla, posX, posY)			//
{
	
	//	estilo de trazado
	ctx.lineWidth = "4";
	ctx.strokeStyle = "#222";  // Green path
	ctx.beginPath();

	// ctx.arc(x, y, radius, startAngle, endAngle [, anticlockwise]); -->
	//	hace el trazado de un juego en la pagina 
	//	trazado lineas rectas comunes a todas las variantes/grillas
	ctx.rect(posX,posY, paso*2, paso*2);
	//	vertical
	ctx.moveTo( posX+paso, posY );
	ctx.lineTo( posX + paso, posY + 2*paso);
	//	horizontal
	ctx.moveTo( posX, posY + paso );
	ctx.lineTo( posX + 2*paso, posY + paso );
	ctx.stroke();

	//	identificacion de diagonales segun vértices. 8 diags posibles.
	//	cada variante usa 4 diags
	//	00 --- 10 --- 20
	//	01 --- 11 --- 21
	//	02 --- 12 --- 22
	//	\ 0011		\ 1021		/ 1001		/	2011
	//	\	0112		\	1122		/	1102		/	2112

	switch(modGrilla) {
		case "RA":
			aSuma = aRAsuma;
			aVert = aRAvert;
			console.log(aSuma);

			//	trazado diagonales de la variante
			ctx.moveTo( posX, posY );
			ctx.lineTo( posX + 2*paso, posY + 2*paso );
			ctx.moveTo( posX + 2*paso, posY );
			ctx.lineTo( posX, posY + 2*paso );
			ctx.stroke();
			dibujaVertices(posX,posY);
			poneSumas(posX,posY,aPosSumas.RA)
			break;

		case "CO":
			aSuma = aCOsuma;
			aVert = aCOvert;
			//	trazado diagonales de la variante
			ctx.moveTo( posX+  paso,	posY );
			ctx.lineTo( posX+2*paso,	posY + paso );
			ctx.lineTo( posX+  paso,	posY + 2*paso );
			ctx.lineTo( posX			 ,	posY + paso );
			ctx.lineTo( posX + paso,  posY );
			ctx.stroke();
			dibujaVertices(posX,posY);
			poneSumas(posX,posY,aPosSumas.CO)
			break;

		case "DD":
			aSuma = aDDsuma;
			aVert = aDDvert;
			//	trazado diagonales de la variante
			ctx.moveTo( posX      ,	posY );
			ctx.lineTo( posX+ paso,	posY + paso );			
			ctx.moveTo( posX      ,	posY + paso);
			ctx.lineTo( posX+ paso,	posY + 2*paso );
			ctx.moveTo( posX+ paso,	posY );
			ctx.lineTo( posX+2*paso,	posY + paso );			
			ctx.moveTo( posX+ paso,	posY + paso);
			ctx.lineTo( posX+ 2*paso,	posY + 2*paso );
			ctx.stroke();
			dibujaVertices(posX,posY);
			poneSumas(posX,posY,aPosSumas.DD)
			break;

		case "DI":
			aSuma = aDIsuma;
			aVert = aDIvert;
			//	trazado diagonales de la variante
			ctx.moveTo( posX+ paso      ,	posY );
			ctx.lineTo( posX,	posY + paso );			
			ctx.moveTo( posX+2*paso, posY );
			ctx.lineTo( posX+ paso,	posY + paso );
			ctx.moveTo( posX + paso,	posY+paso );
			ctx.lineTo( posX,	posY + 2*paso );
			ctx.moveTo( posX+ 2*paso,	posY + paso);
			ctx.lineTo( posX+ paso,	posY + 2*paso );
			ctx.stroke();
			dibujaVertices(posX,posY);
			poneSumas(posX,posY,aPosSumas.DI)
			break;

		case "CR":
			aSuma = aCRsuma;
			aVert = aCRvert;
			//	trazado diagonales de la variante
			ctx.moveTo( posX      ,	posY );
			ctx.lineTo( posX+ paso,	posY + paso );
			ctx.moveTo( posX+paso      ,	posY);
			ctx.lineTo( posX+ 2*paso,	posY + paso );
			ctx.moveTo( posX+ paso,	posY +paso);
			ctx.lineTo( posX,	posY + 2*paso );
			ctx.moveTo( posX+ 2*paso,	posY + paso);
			ctx.lineTo( posX+ paso,	posY + 2*paso );
			ctx.stroke();
			dibujaVertices(posX,posY);
			poneSumas(posX,posY,aPosSumas.CR)
			break;

		case "CL":
			aSuma = aCLsuma;
			aVert = aCLvert;
			//	trazado diagonales de la variante
			ctx.moveTo( posX+ paso   ,	posY );
			ctx.lineTo( posX,	posY + paso );			
			ctx.moveTo( posX+2*paso, posY );
			ctx.lineTo( posX+ paso,	posY + paso );
			ctx.moveTo( posX,	posY + paso );
			ctx.lineTo( posX + paso,	posY + 2*paso );			
			ctx.moveTo( posX+ paso,	posY + paso);
			ctx.lineTo( posX+ 2*paso,	posY + 2*paso );
			ctx.stroke();
			dibujaVertices(posX,posY);
			poneSumas(posX,posY,aPosSumas.CL)
			break;
	}
}

//***********************************
	//	funcion para el trazado de diagonales
		//	\ 0011		\ 1021		/ 1001		/	2011
		//	\	0112		\	1122		/	1102		/	2112


	function dibujaVertices(posX,posY) {
		ctx.beginPath();
		ctx.fillStyle = '#f1f2f3';
		//	ctx.fill = 'rgb(200, 0, 0)';
		for ( var x=0; x<=2; x++ )
		{
			for ( var y=0; y<=2; y++ )
			{
				ctx.moveTo( posX + x * paso, posY + y * paso );
				//	ctx.arc( posX - radio + x * paso, posY + y * paso, radio, 0, 2 * Math.PI);
				ctx.arc( posX + x * paso, posY + y * paso, radio, 0, 2 * Math.PI);
				ctx.stroke();
				ctx.fill();		// = 'rgb(200, 0, 0)';
			}
		}
	}

	function poneSumas(posX,posY,aPosis) {
		//	colocar las sumas en poligonos
		ctx.font = '1.4em Arial black';
		ctx.fillStyle = '#111';
		ctx.textAlign = "center";
		for ( var i=0; i<8 ;i++ )
		{		
			//	en aPosSumas colocar RAsuma
			ctx.fillText(aSuma[i], posX+aPosis[i][0], 8+posY+aPosis[i][1] );
		}
		//	valores en los vértices
		//	ctx.fillText(aVert[0], posX, 8 + posY );
		for ( var x=0; x<=2; x++ )
		{
			for ( var y=0; y<=2; y++ )
			{
				var i = x + ( 3*y );
				if (lConSoluc || i==0) {
					ctx.fillText(aVert[i], posX+x*paso, 8 + posY + y * paso );
				}
			}
		}
	}


	//	colocar sumas en poligonos RAsuma[i];
	//	for ( var i=0;i<RAsuma.length ;i++ )
	//	no puedo pasar el tipo de grila como parámetro pero todos los casos tienen 8 polígonos (triang)

//***********************************

//	function original leeJuegoSerie() {		// recupera datos de un juego de serie
//	tomado de presenta suma oculta
function leeJuegosPagina() {		// recupera datos de un juegos para una página
	if (DEBUG){	console.log('--- inmediatemente antes de leer nPagActual: ', nPagActual )	}
	aRAvert = problemas[nPagActual-1].RAvert;
	aRAsuma = problemas[nPagActual-1].RAsuma;
	aCOvert = problemas[nPagActual-1].COvert;
	aCOsuma = problemas[nPagActual-1].COsuma;
	aDDvert = problemas[nPagActual-1].DDvert;
	aDDsuma = problemas[nPagActual-1].DDsuma;
	aDIvert = problemas[nPagActual-1].DIvert;
	aDIsuma = problemas[nPagActual-1].DIsuma;
	aCRvert = problemas[nPagActual-1].CRvert;
	aCRsuma = problemas[nPagActual-1].CRsuma;
	aCLvert = problemas[nPagActual-1].CLvert;
	aCLsuma = problemas[nPagActual-1].CLsuma;

	if (DEBUG){
		console.log("aRAvert: ", aRAvert);
		console.log("aRAsuma: ", aRAsuma);
		console.log("aCOvert: ", aCOvert);
		console.log("aCOsuma: ", aCOsuma);
		console.log("aDDvert: ", aDDvert);
		console.log("aDDsuma: ", aDDsuma);
		console.log("aDIvert: ", aDIvert);
		console.log("aDIsuma: ", aDIsuma);
		console.log("aCRvert: ", aCRvert);
		console.log("aCRsuma: ", aCRsuma);
		console.log("aCLvert: ", aCLvert);
		console.log("aCLsuma: ", aCLsuma);
	}
}


function ajustaNumPag() {
	let input = document.getElementById("numero")
	//	variablename = (condition) ? value1:value2
	nPagActual = input.value >= problemas.length ? problemas.length : input.value;
	//	nPagActual =
	input.max = problemas.length;

	setNroPagina();
	if (DEBUG) { console.log('ajustando nPagActual: ', nPagActual )};
	dibujaPag();
}



	//	manejo del nro de problema
	//----------------------------------
	// save nro problema to localstorage
	//----------------------------------
	function setNroPagina() {
		if (DEBUG)	{	console.log('en setNroPagina(): ', nPagActual );	}
		setStorage("nroPagina", nPagActual);
		if (DEBUG)	{	console.log('nro de pagina fijado: ' + nPagActual);	}
		//	console.trace();
	}

	//-------------------------------------------
	// get nro problema from localstorage
	//-------------------------------------------
	function getNroPag()
	{
		let nCual = getStorage("nroPagina");
		if (DEBUG) { 	console.log('nCual: ' + nCual ); 	};
		if(isNaN(nCual) || nCual < nroPagina )
		{
			nCual = nroPagina;
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




	//	function printDiv( lConSolucion ) {
	function printDiv() {
		var objeto = document.getElementById('imprimir');
		//	console.log( "lConSolucion: " + lConSolucion );
		//	console.log(objeto);

		//	document.body.className = (lConSolucion ? "resuelto" : "noresuelto");
		//obtenemos el objeto a imprimir
		var ventana=window.open('','_blank');  //abrimos una ventana vacía nueva
		ventana.document.write(objeto.innerHTML);  //imprimimos el HTML del objeto en la nueva ventana
		ventana.document.close();  //cerramos el documento
		ventana.print();  //imprimimos la ventana
		ventana.close();  //cerramos la ventana
	}



	function myFunction() {
		var checkBox = document.getElementById("conSolucion");
		lConSolucion = checkBox.checked;
		//	if (checkBox.checked == true){
		//	  text.style.display = "block";
		//	} else {
		//	   text.style.display = "none";
		//	}
	}

