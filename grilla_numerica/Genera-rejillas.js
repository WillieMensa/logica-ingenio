/*
	sumado20-canvas.js
	2020.12.11 

	objeto: generar datos para rejillas numéricas (ex sumado 2.0)

	iniciar proceso

	generar valores para vértices (aleatorio)
	calcular polígonos (triangulos)
	preparar una cadena con formato tipo		
		{
			'RAvert':[6,9,5,7,2,3,4,8,1],'RAsuma':[15,17,16,10,13,14,11,6],
			'COvert':[5,6,4,3,1,8,2,7,9],'COsuma':[14,10,15,18,12,11,16,24],
			'DDvert':[9,4,3,6,5,7,8,1,2],'DDsuma':[20,18,16,14,15,12,8,14],
			'DIvert':[2,9,8,5,7,1,6,3,4],'DIsuma':[16,21,24,16,18,16,11,8],
			'CRvert':[7,1,8,2,3,6,4,9,5],'CRsuma':[12,11,10,15,9,16,18,20],
			'CLvert':[6,2,3,7,1,8,4,9,5],'CLsuma':[15,10,6,12,20,17,15,14],
		}

*/


const
	NCOL = 3,
	NFIL = 3,
	NPOLIG = 8,
	NVERT=9,
	paso = 80,		//	separacion entre vertices
	radio = 16,
	//	DEBUG = false;
	DEBUG = true;

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




function init() {

};


	function dibujaPag() {
		leeJuegosPagina();

		//<canvas id="canvas1" width="560" height="794" class="img-responsive" style="border:1px solid #000000;"></canvas>
		//	ctx.fillStyle = '#f0d0b0ff';			//	#f2e8cfff;
		ctx.fillStyle = '#ffffffff';
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













		

		function GenJuego( modGrilla)			//	genera un nuevo juego
		{
			//	la funciones para preparacion de nuevo juego
			//	modGrilla: es el modelo de grila, filas columnas y variante
			//	Identificacion de los modelos de grilla
			//	sum3x3A
			//	sum4*3A
			//	sum4x4A

			var aTemp = undefined,
				i = undefined,
				j = undefined,
				aSumaPolig = [],	//	array con suma de los poligonos
				aVertex = [],			//	para ubicar numeros aleatoriamente
				nNum = undefined, //	
				nFil = undefined, //	cantidad de filas
				nCol = undefined	//	cantidad de columnas
				//	aNumeros = [],	//	array con los numeros
				//	aVertices = []		//	array con datos de vertices

			switch(modGrilla) {
				case "sum3x3A":
					// code block
					nFil = 3;
					nCol = 3;
					break;

				case "sum4x3A":
					// code block
					nFil = 3;
					nCol = 4;
					break;

				case "sum4x4A":
					// code block
					nFil = 4;
					nCol = 4;
					break;

				default:
					// code block
			}

			//	console.log( "nFil, nCol: " + nFil + ", " + nCol );

			for ( i = 0; i < nCol; i++){
				for ( j = 0; j < nFil; j++)
				{
					nNum = 1 + i + ( j * nCol );
					aVertex.push(nNum);
					//	console.log( "nNum, aVertex[i]: " + nNum + ", " + aVertex[i] );
				}
			}

			//	shuffle the vertex
			//	Scheitelpunkte vermischen
			for(i=0; i< (nFil * nCol * 5); i++){
				var from = Math.floor(Math.random()* nFil * nCol);
				var to = Math.floor(Math.random()* nFil * nCol);
				var tmp = aVertex[from];
				aVertex[from] = aVertex[to];
				aVertex[to] = tmp;
				//	console.log( "from, to: " + from + ", " + to );
			}

			//	console.log("aVertex:" + aVertex );



			////////////////////////////////////////////////////
			//	Actualizamos la suma de los poligonos
			//	dependiente del modelo de grilla
			//	Grilla  3x3 modelo A
			switch(modGrilla) {
				case "sum3x3A":
					// code block
					aSumaPolig.push( aVertex[0]+ aVertex[3]+ aVertex[4] );
					aSumaPolig.push( aVertex[0]+ aVertex[1]+ aVertex[4] );
					aSumaPolig.push( aVertex[1]+ aVertex[2]+ aVertex[4]+ aVertex[5] );
					aSumaPolig.push( aVertex[3]+ aVertex[4]+ aVertex[6]+ aVertex[7] );
					aSumaPolig.push( aVertex[4]+ aVertex[7]+ aVertex[8] );
					aSumaPolig.push( aVertex[4]+ aVertex[5]+ aVertex[8] );

					break;

				case "sum4x3A":
					// code block
					aSumaPolig.push( aVertex[0]+ aVertex[4]+ aVertex[5] );
					aSumaPolig.push( aVertex[0]+ aVertex[1]+ aVertex[5] );
					aSumaPolig.push( aVertex[1]+ aVertex[2]+ aVertex[5]+ aVertex[6] );
					aSumaPolig.push( aVertex[2]+ aVertex[3]+ aVertex[6] );
					aSumaPolig.push( aVertex[3]+ aVertex[6]+ aVertex[7] );

					aSumaPolig.push( aVertex[4]+ aVertex[8]+ aVertex[9] );
					aSumaPolig.push( aVertex[4]+ aVertex[5]+ aVertex[9] );
					aSumaPolig.push( aVertex[5]+ aVertex[6]+ aVertex[9]+ aVertex[10] );
					aSumaPolig.push( aVertex[6]+ aVertex[7]+ aVertex[10] );
					aSumaPolig.push( aVertex[7]+ aVertex[10]+ aVertex[11] );
					break;

				case "sum4x4A":
					// code block
					aSumaPolig.push( aVertex[0]+ aVertex[1]+ aVertex[4] );
					aSumaPolig.push( aVertex[1]+ aVertex[4]+ aVertex[5] );
					aSumaPolig.push( aVertex[1]+ aVertex[2]+ aVertex[5]+ aVertex[6] );
					aSumaPolig.push( aVertex[2]+ aVertex[6]+ aVertex[7] );
					aSumaPolig.push( aVertex[2]+ aVertex[3]+ aVertex[7] );

					aSumaPolig.push( aVertex[4]+ aVertex[5]+ aVertex[8]+ aVertex[9] );
					aSumaPolig.push( aVertex[5]+ aVertex[6]+ aVertex[9]+ aVertex[10] );
					aSumaPolig.push( aVertex[6]+ aVertex[7]+ aVertex[10]+ aVertex[11] );

					aSumaPolig.push( aVertex[8]+ aVertex[12]+ aVertex[13] );
					aSumaPolig.push( aVertex[8]+ aVertex[9]+ aVertex[13] );
					aSumaPolig.push( aVertex[9]+ aVertex[10]+ aVertex[13]+ aVertex[14] );
					aSumaPolig.push( aVertex[10]+ aVertex[11]+ aVertex[14] );
					aSumaPolig.push( aVertex[11]+ aVertex[14]+ aVertex[15] );
					break;


				default:
					// code block
			}

			//	console.log(aSumaPolig);


			//	colocar sumas en poligonos
			for ( var i=0;i<aSumaPolig.length ;i++ )
			{
				var str = "00" + i;
				var res = str.substr(-2);
				var textNode = undefined;

				//	console.log( modGrilla + "pos" + res  );
				svgTextElement = document.getElementById( modGrilla + "pos" + res );
				//	console.log("sum3x3pos0"+i + "  -  " + "sum3x3pos0"+i)
				//	console.log(svgTextElement)
				textNode = svgTextElement.childNodes[0];
				textNode.nodeValue = aSumaPolig[i] ;

			}


			//	colocar valores en vertices
			for ( var i=0;i<aVertex.length ;i++ )
			{
				var str = "00" + i;
				var res = str.substr(-2);

				svgTextElement = document.getElementById( modGrilla + "ver" + res );		//	"sum3x3ver0"+i);

				//	console.log( "svgTextElement: " + recorrerObjeto(svgTextElement.childNodes[0]) );

				var c = svgTextElement.childNodes;
				var txt = c.length + " - ";
				var j;
				for (j = 0; j < c.length; j++) {
					txt = txt + " * " + j + " * " + c[j].nodeName + " * ";
				}
				console.log( "svgTextElement.childNodes: " + txt );
				//	console.log( "svgTextElement: " + c[0].nodeValue + ", " + recorrerObjeto(c) );

				textNode = svgTextElement.childNodes[0];
				textNode.nodeValue = aVertex[i] ;
			}

		}


    function recorrerObjeto(objeto)
    {
        var respuesta="";
        for (var i in objeto)
        {
            respuesta+=i+": "+objeto[i]+"<br>";
        }
        return respuesta
    }


//---------------------------------

"E:\Dropbox\GitHub\logica-ingenio\rejillas\Genera-rejillas.js"(94,1):function start() {
"E:\Dropbox\GitHub\logica-ingenio\rejillas\Genera-rejillas.js"(102,2):	function dibujaPag() {
"E:\Dropbox\GitHub\logica-ingenio\rejillas\Genera-rejillas.js"(126,1):function presentaGrilla( modGrilla, posX, posY)			//
"E:\Dropbox\GitHub\logica-ingenio\rejillas\Genera-rejillas.js"(260,2):	function dibujaVertices(posX,posY) {
"E:\Dropbox\GitHub\logica-ingenio\rejillas\Genera-rejillas.js"(277,2):	function poneSumas(posX,posY,aPosis) {
"E:\Dropbox\GitHub\logica-ingenio\rejillas\Genera-rejillas.js"(308,4)://	function original leeJuegoSerie() {		// recupera datos de un juego de serie
"E:\Dropbox\GitHub\logica-ingenio\rejillas\Genera-rejillas.js"(310,1):function leeJuegosPagina() {		// recupera datos de un juegos para una página
"E:\Dropbox\GitHub\logica-ingenio\rejillas\Genera-rejillas.js"(342,1):function ajustaNumPag() {
"E:\Dropbox\GitHub\logica-ingenio\rejillas\Genera-rejillas.js"(360,2):	function setNroPagina() {
"E:\Dropbox\GitHub\logica-ingenio\rejillas\Genera-rejillas.js"(370,2):	function getNroPag()
"E:\Dropbox\GitHub\logica-ingenio\rejillas\Genera-rejillas.js"(384,2):	function setStorage(key, value)
"E:\Dropbox\GitHub\logica-ingenio\rejillas\Genera-rejillas.js"(391,2):	function getStorage(key)
"E:\Dropbox\GitHub\logica-ingenio\rejillas\Genera-rejillas.js"(400,2):	function clearStorage(key)
"E:\Dropbox\GitHub\logica-ingenio\rejillas\Genera-rejillas.js"(410,5):	//	function printDiv( lConSolucion ) {
"E:\Dropbox\GitHub\logica-ingenio\rejillas\Genera-rejillas.js"(411,2):	function printDiv() {
"E:\Dropbox\GitHub\logica-ingenio\rejillas\Genera-rejillas.js"(427,2):	function myFunction() {

"E:\Dropbox\GitHub\logica-ingenio\rejillas\Genera-rejillas.js"(449,30):			if (DEBUG) { console.log("function init() beginnen Version 11");}
"E:\Dropbox\GitHub\logica-ingenio\rejillas\Genera-rejillas.js"(459,3):		function GenJuego( modGrilla)			//	genera un nuevo juego
"E:\Dropbox\GitHub\logica-ingenio\rejillas\Genera-rejillas.js"(629,5):    function recorrerObjeto(objeto)
