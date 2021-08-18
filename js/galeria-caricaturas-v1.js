/*
	galeria-caricaturas.js
	2021.08.17 
*/

	let 
		nCaric = 0,		//	nro de caricatura definido en el .JSON
		xfake = null;

	const
		CARPETA = "./_trabajosNuevos/",
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

		console.log( CARPETA ) ;
		console.log( CARPETA + caricaturas[0].thumbnail ) ;

		destino = document.getElementById("thumb00");
		console.log(destino);
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

	}

	function muestraImagen(src, nIndx ) {
		var destino = document.getElementById("personaje");
		destino.src = src;

		var captionText = document.getElementById("caption");
		captionText.innerHTML = caricaturas[nIndx].alt;
	}
