/*
	new-galeria-caricaturas.js
	2021.08.17 
*/

	let 
		nCaric = 0,		//	nro de caricatura definido en el .JSON
		nPagina = 1,	//	nro de pagina actual. Comenzamos en 1
		xfake = null;
		claseAct = undefined;

	const
		CARPETA = "./galeria/",		//	carpeta donde estan caricaturas y thumbnails
		THUMBPP = 7,											//	thumbnails por pagina		
		FAKE = null;


	window.onload = function(){
		poneMenuPpal();							// porque hay superposicion con la misma funcion de carga
		processUser();
		poneTitulo();
		loadCaricaturas(claseAct);
		loadThumbnails();
		muestraImagen(0);
	}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
	// calculo de la cantidad de paginas
	let nCantX = caricaturas.length / THUMBPP;
	let nCantPag = ( Math.floor(nCantX) == Math.ceil(nCantX) ) ? Math.floor(nCantX) : Math.ceil(nCantX) ;
	//	console.log( "cantidad paginas = " , nCantPag );


	//	nPagina = (n>0) ? nPagina++ : nPagina -- ;
	nPagina = nPagina + n;
	//	console.log( "n, Pagina actual = " , n, nPagina );

	nPagina = (nPagina < 1) ? 1 : nPagina ;
	nPagina = (nPagina > nCantPag ) ? nCantPag : nPagina ;
	//	console.log( "Pagina actual = " , nPagina );

  //	if (n >= THUMBPP) {nPagina++};
	loadThumbnails();
	muestraImagen(0);
  //	showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");

	// corregir aqui para desplazar imagenes 
  if (n >= THUMBPP) {nPagina++}
  if (n < 1) {nPagina--}

	//	for (i = 0; i < slides.length; i++) {
  //	    slides[i].style.display = "none";
  //	}
  //	for (i = 0; i < dots.length; i++) {
  //	    dots[i].className = dots[i].className.replace(" active", "");
  //	}
  //	slides[slideIndex-1].style.display = "block";
  //	dots[slideIndex-1].className += " active";
  //	captionText.innerHTML = dots[slideIndex-1].alt;
}

function loadThumbnails(){
	let 
		n = 0;								//	nro de thumbnail

	var destino ;		//	identificar el thumbnail a usar

	nCaric = (nPagina - 1 ) * THUMBPP
	
	for (let i=0;i < THUMBPP ; i++)
	{
		destino = document.getElementById("thumb0" + i );
		//	console.log(nPagina, nCaric);
		//	console.log(caricaturas[nCaric]);
		destino.src = (CARPETA + caricaturas[nCaric].thumbnail);
		nCaric++;

	}

}

function muestraImagen(nIndx ) {
	// muestra la imagen seleccionada. nIndx: trae el nro de thumbnail
	//	resolver vinculación nro thumbnail --> nro de caricatura

	nCaric = (nPagina - 1 ) * THUMBPP + nIndx;

	var destino = document.getElementById("personaje");

	destino.src = CARPETA + caricaturas[nCaric].image;

	//	console.log(destino.src);
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

function loadCaricaturas(claseAct){
	//caricaturas = [];
	cClase = claseAct;
	let x = 0;
	caricaturas = [];

	for (let i=0;i<lasCaricaturas.length ;i++ )
	{
		if ( cClase.includes(lasCaricaturas[i].clase ))
		{
			//	console.log( x++);
			caricaturas.push(lasCaricaturas[i]);

		}
	}

	while (( caricaturas.length % THUMBPP ) != 0)
	{
	  caricaturas.push( {"thumbnail":"blanco.webp",	"image":"blanco.webp",	"alt":"??","clase":"O"} );
	}

	//caricaturas = 
	//	lasCaricaturas.forEach(checkClass);

}


function checkClass() {

	//	console.log(cClase);
	//	console.log( clase.includes(cClase) );

	if ( lasCaricaturas.clase.includes(cClase) )
	{
		//	caricaturas 
	}
}



function processUser()
/* funcion generica para procesar parametros recibidos en pagina web */
{
	var parameters = location.search.substring(1).split("&");

	var temp = parameters[0].split("=");
	claseAct = unescape(temp[1]);
}



function poneTitulo() {
	var text;
	//	console.log(claseAct);

	if (claseAct.includes("C")) {
		// block of code to be executed if condition1 is true
			text = "Conocidos";
	} else 	if (claseAct.includes("AD")) {
			text = "Artistas y deportistas";
	} else 	if (claseAct.includes("E")) {
	//} else 	if (claseAct == "E") {
			text = "Periodistas";
	} else 	if (claseAct.includes("M")) {
			text = "Mensanos";
	} else 	if (claseAct.includes("P")) {
			text = "Políticos";
	} else {
		text = "???";
	}

	//	console.log(claseAct);
	//	console.log(text);

	document.getElementById("titulo").innerHTML = "Galería " + text ;
}