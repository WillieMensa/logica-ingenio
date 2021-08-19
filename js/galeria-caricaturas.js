/*
	galeria-caricaturas.js
	2021.08.17 
*/

	let 
		nCaric = 0,		//	nro de caricatura definido en el .JSON
		nPagina = 1,	//	nro de pagina actual. Comenzamos en 1
		xfake = null;

	const
		CARPETA = "./galeria/",		//	carpeta donde estan caricaturas y thumbnails
		THUMBPP = 7,											//	thumbnails por pagina		
		FAKE = null;


	window.onload = function(){
		poneMenuPpal();							// porque hay superposicion con la misma funcion de carga
		loadThumbnails();
		muestraImagen(0);
	}


function loadThumbnails(){
	let 
		n = 0;								//	nro de thumbnail

	var destino ;		//	identificar el thumbnail a usar

	nCaric = (nPagina - 1 ) * THUMBPP
	

	destino = document.getElementById("thumb00");
	destino.src = (CARPETA + caricaturas[nCaric].thumbnail);
	nCaric++;

	destino = document.getElementById("thumb01");
	destino.src = CARPETA + caricaturas[nCaric].thumbnail;
	nCaric++;

	destino = document.getElementById("thumb02");
	destino.src = CARPETA + caricaturas[nCaric].thumbnail;
	nCaric++;

	destino = document.getElementById("thumb03");
	destino.src = CARPETA + caricaturas[nCaric].thumbnail;
	nCaric++;

	destino = document.getElementById("thumb04");
	destino.src = CARPETA + caricaturas[nCaric].thumbnail;
	nCaric++;

	destino = document.getElementById("thumb05");
	destino.src = CARPETA + caricaturas[nCaric].thumbnail;
	nCaric++;

	destino = document.getElementById("thumb06");
	destino.src = CARPETA + caricaturas[nCaric].thumbnail;
	nCaric++;

}

function muestraImagen(nIndx ) {
	// muestra la imagen seleccionada. nIndx: trae el nro de thumbnail
	//	resolver vinculación nro thumbnail --> nro de caricatura

	nCaric = (nPagina - 1 ) * THUMBPP + nIndx;

	var destino = document.getElementById("personaje");

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
	muestraImagen(0);

}