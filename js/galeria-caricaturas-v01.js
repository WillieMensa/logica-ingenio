/*
	new-galeria-caricaturas.js
	2021.08.17 
*/

let
    nCaric = 0, //	nro de caricatura definido en el .JSON
    //	nPagina = 1,	//	nro de pagina actual. Comenzamos en 1
    caricaturas = undefined,
    claseAct = undefined,
    xfake = null;

const
    CARPETA = "./galeria/", //	carpeta donde estan caricaturas y thumbnails
    THUMBPP = 16, //	thumbnails por pagina		
    FAKE = null;


window.onload = function() {
    poneMenuPpal(); // porque hay superposicion con la misma funcion de carga
    processUser(); // procesa parametros recibidos en pagina web
    poneTitulo();

    //	console.log( claseAct )
    //	claseAct = ( claseAct == undefined ) ? "C": claseAct
    //	console.log(claseAct)

    loadCaricaturas(claseAct);
    loadThumbnails();
    //	muestraImagen(0);
}

var slideIndex = 1;
showSlides(slideIndex);



function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");

    // corregir aqui para desplazar imagenes 
    //	if (n >= THUMBPP) {nPagina++}
    //	if (n < 1) {nPagina--}

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

function loadThumbnails() {
    let
        n = 0; //	nro de thumbnail

    var destino; //	identificar el thumbnail a usar

    nCaric = 0; // (nPagina - 1 ) * THUMBPP

    for (let i = 0; i < THUMBPP; i++) {
        destino = document.getElementById("image" + i);
        //	console.log( "image" + i );

        //	console.log( i, destino);

        //	console.log( destino.src);

        //	console.log(nPagina, nCaric);

        //	console.log(caricaturas[nCaric]);

        destino.src = (CARPETA + caricaturas[nCaric].thumbnail);



        //	console.log(destino.src);

        //	var captionText = document.getElementById("caption0" + i );

        //	captionText.innerHTML = caricaturas[nCaric].alt;



        nCaric++;



    }



}


function muestraImagen(nIndx) {
	// muestra la imagen seleccionada. nIndx: trae el nro de thumbnail
	//	resolver vinculación nro thumbnail --> nro de caricatura
	//	console.log(nIndx);
	//	console.log(caricaturas[nIndx].thumbnail);

	// llamar a muestraFoto.html con parámetro
	//	window.open("https://ingverger.ar/muestraFoto.html","_self");
	//	galeria.html?clase=%22P%22

	let CaricNom = caricaturas[nIndx].thumbnail;
	
	window.open("muestraFoto.html?" + CaricNom,"_self");

	//	nCaric = (nPagina - 1 ) * THUMBPP + nIndx;
	//	console.log( nCaric);
	//	
	//	var destino = document.getElementById("personaje");
	//	
	//	destino.src = CARPETA + caricaturas[nCaric].image;
	//	
	//	//	console.log(destino.src);
	//	var captionText = document.getElementById("caption");
	//	captionText.innerHTML = caricaturas[nCaric].alt;
}


    function caricaturaThumb(nThumb) {
        // Sincronizar los thumbnails con las caricaturas en grupos segun cantidad de thumbs  por pagina
        // nThumb trae el nro de boton que comienza en uno

        nPagina = nThumb;

        // hay que presentar nuevos thumbnails
        loadThumbnails();
        //	muestraImagen(0);

    }

    function loadCaricaturas(claseAct) {

        cClase = claseAct;
        let x = 0;
        caricaturas = [];

        for (let i = 0; i < lasCaricaturas.length; i++) {
            if (cClase.includes(lasCaricaturas[i].clase)) {
                console.log(x, i);
                console.log(lasCaricaturas[i]);
                //	console.log( Caricaturas[x]);
                caricaturas.push(lasCaricaturas[i]);

								//console.log( caricaturas[caricaturas.length();

            }
        }

								//	console.log( caricaturas);
								//console.log( caricaturas[caricaturas.length]);

				//	console.log( caricaturas );

        while ((caricaturas.length % THUMBPP) != 0) {
            caricaturas.push({
                "thumbnail": "blanco.webp",
                "image": "blanco.webp",
                "alt": "??",
                "clase": "Z"
            });
        }

        //caricaturas = 
        //	lasCaricaturas.forEach(checkClass);

    }


    /*
    function checkClass() {

    	//	console.log(cClase);
    	//	console.log( clase.includes(cClase) );

    	if ( lasCaricaturas.clase.includes(cClase) )
    	{
    		//	caricaturas 
    	}
    }
    */


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
        // A : Artistas
        // C : Conocidos / Parientes
        // O : otros Conocidos
        // D : Deportistas
        // E : pEriodistas
        // M : Mensanos
        // P : Politicos
        // Z : otros

        if (claseAct.includes("C")) {
            // block of code to be executed if condition1 is true
            text = "Conocidos";
        } else if (claseAct.includes("O")) {
            text = "más conocidos";
        } else if (claseAct.includes("A")) {
            text = "Artistas";
        } else if (claseAct.includes("D")) {
            text = "Deportistas";
        } else if (claseAct.includes("E")) {
            //} else 	if (claseAct == "E") {
            text = "Periodistas";
        } else if (claseAct.includes("M")) {
            text = "Mensanos";
        } else if (claseAct.includes("N")) {
            text = "Mensanos 2";
        } else if (claseAct.includes("P")) {
            text = "Políticos Nacionales";
        } else if (claseAct.includes("Q")) {
            text = "Otros Políticos";
        } else {
            text = "???";
        }

        //	console.log(claseAct);
        //	console.log(text);

        document.getElementById("titulo").innerHTML = "Galería de " + text;
    }