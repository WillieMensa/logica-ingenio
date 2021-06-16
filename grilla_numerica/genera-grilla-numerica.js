/*
	generar vertices y sumas para sumado20
	mecanismos tomados de GrillaSumado11.html

	Hay que generar un objeto similar a este para que sea leido por la app que presenta el juego
	{ 'nroProb':1,
		'RAvert':[6,9,5,7,2,3,4,8,1],'RAsuma':[15,17,16,10,13,14,11,6],
		'COvert':[5,6,4,3,1,8,2,7,9],'COsuma':[14,10,15,18,12,11,16,24],
		'DDvert':[9,4,3,6,5,7,8,1,2],'DDsuma':[20,18,16,14,15,12,8,14],
		'DIvert':[2,9,8,5,7,1,6,3,4],'DIsuma':[16,21,24,16,18,16,11,8],
		'CRvert':[7,1,8,2,3,6,4,9,5],'CRsuma':[12,11,10,15,9,16,18,20],
		'CLvert':[6,2,3,7,1,8,4,9,5],'CLsuma':[15,10,6,12,20,17,15,14]
	}

	Se presenta en pantalla, copia y pegado en el archivo .JSON

*/


const
	NCUANTOS=10,
	NCOL = 3,
	NFIL = 3,
	//	NPOLIG = 8,
	//	NVERT=9,
	//	paso = 80,		//	separacion entre vertices
	//	radio = 16,
	//	DEBUG = false;
	DEBUG = true;


let 
	aVertices,					//	para ubicar numeros aleatoriamente
	nroPagina = 1,
	lConSoluc,				//	indicador esta mostrando solución
	nPagActual,				//	nro problema actual (el valor)
	aSuma,
	salida='';						// la salida a pantalla para copiar y pegar en archivo json


function init() {
	for (var i=0;i<NCUANTOS ;i++ ){
		salida += '{<br>'
		salida += "'nroProb':" + i +",<br>" ;
		GenJuego("RA");
		GenJuego("CO");
		GenJuego("DD");
		GenJuego("DI");
		GenJuego("CR");
		GenJuego("CL");

		salida += '},'
	}
	document.getElementById("salida").innerHTML += salida + "<br>";

};



function GenJuego( modGrilla)			//	genera un nuevo juego
{ /*
	la funciones para preparacion de nuevo juego
	modGrilla: es el modelo de grila, filas columnas y variante
	Identificacion de los modelos de grilla
		RA : Radial
		CO : Concemtrica
		DD : Diagonal derecha (cuando baja
		DI : Diagonal izquierda (cuando baja
		CR : Chevron a derecha
		CL : Chevron a izquierda
		podríamos agregar 
		CU : Chevron up
		CD : Chevron down

	'RAvert':[6,9,5,7,2,3,4,8,1],'RAsuma':[15,17,16,10,13,14,11,6],
	'COvert':[5,6,4,3,1,8,2,7,9],'COsuma':[14,10,15,18,12,11,16,24],
	'DDvert':[9,4,3,6,5,7,8,1,2],'DDsuma':[20,18,16,14,15,12,8,14],
	'DIvert':[2,9,8,5,7,1,6,3,4],'DIsuma':[16,21,24,16,18,16,11,8],
	'CRvert':[7,1,8,2,3,6,4,9,5],'CRsuma':[12,11,10,15,9,16,18,20],
	'CLvert':[6,2,3,7,1,8,4,9,5],'CLsuma':[15,10,6,12,20,17,15,14]
	*/

	var aTemp = undefined,
		i = undefined,
		j = undefined,
		aSumaPolig = [],	//	array con suma de los poligonos
		nNum = undefined, //	
		NFIL = 3, //	cantidad de filas
		NCOL = 3,	//	cantidad de columnas
		aVertices = generaVertices();		//	para ubicar numeros aleatoriamente


	////////////////////////////////////////////////////
	//	Actualizamos la suma de los poligonos
	//	dependiente del modelo de grilla
	//	Grilla  3x3 modelo A
	switch(modGrilla) {
		case 'RA' : // Radial
			aSumaPolig.push( aVertices[0]+ aVertices[3]+ aVertices[4] );
			aSumaPolig.push( aVertices[0]+ aVertices[1]+ aVertices[4] );
			aSumaPolig.push( aVertices[1]+ aVertices[2]+ aVertices[4] );
			aSumaPolig.push( aVertices[2]+ aVertices[4]+ aVertices[5] );
			aSumaPolig.push( aVertices[3]+ aVertices[4]+ aVertices[6] );
			aSumaPolig.push( aVertices[4]+ aVertices[6]+ aVertices[7] );
			aSumaPolig.push( aVertices[4]+ aVertices[7]+ aVertices[8] );
			aSumaPolig.push( aVertices[4]+ aVertices[5]+ aVertices[8] );
			salida += "'RAvert':[" +aVertices+"], 'RAsuma': ["+aSumaPolig+"],<br>" ;
			break;

		case 'CO' : // Concemtrica
			aSumaPolig.push( aVertices[0]+ aVertices[1]+ aVertices[3] );
			aSumaPolig.push( aVertices[1]+ aVertices[3]+ aVertices[4] );
			aSumaPolig.push( aVertices[1]+ aVertices[4]+ aVertices[5] );
			aSumaPolig.push( aVertices[1]+ aVertices[2]+ aVertices[5] );
			aSumaPolig.push( aVertices[3]+ aVertices[6]+ aVertices[7] );
			aSumaPolig.push( aVertices[3]+ aVertices[4]+ aVertices[7] );
			aSumaPolig.push( aVertices[4]+ aVertices[5]+ aVertices[7] );
			aSumaPolig.push( aVertices[5]+ aVertices[7]+ aVertices[8] );
			salida += "'COvert':[" +aVertices+"], 'COsuma': ["+aSumaPolig+"],<br>" ;
			break;

		case 'DD' : // Diagonal derecha (cuando baja
			aSumaPolig.push( aVertices[0]+ aVertices[3]+ aVertices[4] );
			aSumaPolig.push( aVertices[0]+ aVertices[1]+ aVertices[4] );
			aSumaPolig.push( aVertices[1]+ aVertices[4]+ aVertices[5] );
			aSumaPolig.push( aVertices[1]+ aVertices[2]+ aVertices[5] );
			aSumaPolig.push( aVertices[3]+ aVertices[6]+ aVertices[7] );
			aSumaPolig.push( aVertices[3]+ aVertices[4]+ aVertices[7] );
			aSumaPolig.push( aVertices[4]+ aVertices[7]+ aVertices[8] );
			aSumaPolig.push( aVertices[4]+ aVertices[5]+ aVertices[8] );
			salida += "'DDvert':[" +aVertices+"], 'DDsuma': ["+aSumaPolig+"],<br>" ;
			break;

		case 'DI' : // Diagonal izquierda (cuando baja
			aSumaPolig.push( aVertices[0]+ aVertices[1]+ aVertices[3] );
			aSumaPolig.push( aVertices[1]+ aVertices[3]+ aVertices[4] );
			aSumaPolig.push( aVertices[1]+ aVertices[2]+ aVertices[4] );
			aSumaPolig.push( aVertices[2]+ aVertices[4]+ aVertices[5] );
			aSumaPolig.push( aVertices[3]+ aVertices[4]+ aVertices[6] );
			aSumaPolig.push( aVertices[4]+ aVertices[6]+ aVertices[7] );
			aSumaPolig.push( aVertices[4]+ aVertices[5]+ aVertices[7] );
			aSumaPolig.push( aVertices[5]+ aVertices[7]+ aVertices[8] );
			salida += "'DIvert':[" +aVertices+"], 'DIsuma': ["+aSumaPolig+"],<br>" ;
			break;

		case 'CR' : // Chevron a derecha
			aSumaPolig.push( aVertices[0]+ aVertices[3]+ aVertices[4] );
			aSumaPolig.push( aVertices[0]+ aVertices[1]+ aVertices[4] );
			aSumaPolig.push( aVertices[1]+ aVertices[4]+ aVertices[5] );
			aSumaPolig.push( aVertices[1]+ aVertices[2]+ aVertices[5] );
			aSumaPolig.push( aVertices[3]+ aVertices[4]+ aVertices[6] );
			aSumaPolig.push( aVertices[4]+ aVertices[6]+ aVertices[7] );
			aSumaPolig.push( aVertices[4]+ aVertices[5]+ aVertices[7] );
			aSumaPolig.push( aVertices[5]+ aVertices[7]+ aVertices[8] );
			salida += "'CRvert':[" +aVertices+"], 'CRsuma': ["+aSumaPolig+"],<br>" ;
			break;

		case 'CL' : // Chevron a izquierda
			aSumaPolig.push( aVertices[0]+ aVertices[1]+ aVertices[3] );
			aSumaPolig.push( aVertices[1]+ aVertices[3]+ aVertices[4] );
			aSumaPolig.push( aVertices[1]+ aVertices[2]+ aVertices[4] );
			aSumaPolig.push( aVertices[2]+ aVertices[4]+ aVertices[5] );
			aSumaPolig.push( aVertices[3]+ aVertices[6]+ aVertices[7] );
			aSumaPolig.push( aVertices[3]+ aVertices[4]+ aVertices[7] );
			aSumaPolig.push( aVertices[4]+ aVertices[7]+ aVertices[8] );
			aSumaPolig.push( aVertices[4]+ aVertices[5]+ aVertices[8] );
			salida += "'CLvert':[" +aVertices+"], 'CLsuma': ["+aSumaPolig+"]<br>" ;
			break;


	

		default:
			// code block
	}

	//	console.log('aVertices: ', aVertices );
	//	console.log('aSumaPolig: ', aSumaPolig );



//	{ 
//	 'RAvert':[6,9,5,7,2,3,4,8,1],'RAsuma':[15,17,16,10,13,14,11,6],
//	 'COvert':[5,6,4,3,1,8,2,7,9],'COsuma':[14,10,15,18,12,11,16,24],
//	 'DDvert':[9,4,3,6,5,7,8,1,2],'DDsuma':[20,18,16,14,15,12,8,14],
//	 'DIvert':[2,9,8,5,7,1,6,3,4],'DIsuma':[16,21,24,16,18,16,11,8],
//	 'CRvert':[7,1,8,2,3,6,4,9,5],'CRsuma':[12,11,10,15,9,16,18,20],
//	 'CLvert':[6,2,3,7,1,8,4,9,5],'CLsuma':[15,10,6,12,20,17,15,14],
//	},


}


function generaVertices() {
	// genera valores a colocar en los vertices
	let aVert = [];
	for ( let i = 0; i < NCOL; i++){
		for ( let j = 0; j < NFIL; j++)
		{
			nNum = 1 + i + ( j * NCOL );
			aVert.push(nNum);
		}
	}

	//	shuffle the vertex
	//	Scheitelpunkte vermischen
	for(i=0; i< (NFIL * NCOL * 6); i++){
		var from = Math.floor(Math.random()* NFIL * NCOL);
		var to = Math.floor(Math.random()* NFIL * NCOL);
		var tmp = aVert[from];

		//	console.log(aVert);

		aVert[from] = aVert[to];
		aVert[to] = tmp;
		//	console.log( "from, to: " + from + ", " + to );
	}

	//	console.log("aVert:" + aVert );
	return aVert;

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


