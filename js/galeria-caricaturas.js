/*
	galeria-caricaturas.js
	2021.08.17 
*/

	let 
		nCaric = 0,		//	nro de caricatura definido en el .JSON
		nPagina = 1,	//	nro de pagina actual. Comenzamos en 1
		xfake = null;

	const
		CARPETA = "./_trabajosNuevos/",		//	carpeta donde estan caricaturas y thumbnails
		THUMBPP = 7,											//	thumbnails por pagina		
		FAKE = null;


	window.onload = function(){
		loadThumbnails();
	}


function loadThumbnails(){
	let 
		n = 0;								//	nro de thumbnail

	var destino ;		//	identificar el thumbnail a usar

	// document.getElementById("thumb01").innerHTML = 
	// <img class="demo cursor" src=".\_trabajosNuevos\" + caricaturas[i].thumbnail style="width:100%" onclick="currentSlide(1)" alt=caricaturas[i].alt >

	nCaric = (nPagina - 1 ) * THUMBPP
	
	// console.log(nCaric);
	//	console.log( CARPETA ) ;
	//	console.log( caricaturas[nCaric].thumbnail ) ;
	//	console.log( CARPETA + caricaturas[nCaric].thumbnail ) ;

	destino = document.getElementById("thumb00");
	//	console.log(destino);
	destino.src = (CARPETA + caricaturas[nCaric].thumbnail);
	nCaric++;

	// console.log(nCaric);
	destino = document.getElementById("thumb01");
	destino.src = CARPETA + caricaturas[nCaric].thumbnail;
	nCaric++;

	// console.log(nCaric);
	destino = document.getElementById("thumb02");
	destino.src = CARPETA + caricaturas[nCaric].thumbnail;
	nCaric++;

	// console.log(nCaric);
	destino = document.getElementById("thumb03");
	destino.src = CARPETA + caricaturas[nCaric].thumbnail;
	nCaric++;

	// console.log(nCaric);
	destino = document.getElementById("thumb04");
	destino.src = CARPETA + caricaturas[nCaric].thumbnail;
	nCaric++;

	// console.log(nCaric);
	destino = document.getElementById("thumb05");
	destino.src = CARPETA + caricaturas[nCaric].thumbnail;
	nCaric++;

	destino = document.getElementById("thumb06");
	//	console.log(destino);
	destino.src = CARPETA + caricaturas[nCaric].thumbnail;
	nCaric++;

	//	destino = document.getElementById("thumb07");	
	//	destino.src = CARPETA + caricaturas[nCaric].thumbnail;
	//	nCaric++;

}

function muestraImagen(nIndx ) {
	// muestra la imagen seleccionada. nIndx: trae el nro de thumbnail
	//	resolver vinculación nro thumbnail --> nro de caricatura

	nCaric = (nPagina - 1 ) * THUMBPP + nIndx;
	// console.log(nCaric);

	var destino = document.getElementById("personaje");
	console.log(destino);

	destino.src = CARPETA + caricaturas[nCaric].image;

	var captionText = document.getElementById("caption");
	captionText.innerHTML = caricaturas[nCaric].alt;
}


function caricaturaThumb(nThumb){
	// Sincronizar los thumbnails con las caricaturas en grupos segun cantidad de thumbs  por pagina
	// nThumb trae el nro de boton que comienza en uno

	nPagina = nThumb;

	// hay que presentar nuevos thumbnails
	loadThumbnails();

	//	alt="imagen 00" style="width:15%" class="img-responsive" onclick="muestraImagen( 0 )" >


	//	THUMBPP

}