/*
	galeria_load.js
	2022.10.11 
*/

let 
	nCaric = 0,		//	nro de caricatura definido en el .JSON
	nPagina = 1,	//	nro de pagina actual. Comenzamos en 1
	loadString = "";
	xfake = null;
	claseAct = undefined;

const
	CARPETA = "./galeria/",		//	carpeta donde estan caricaturas y thumbnails
	FAKE = null;


window.onload = function(){
	poneMenuPpal();							// porque hay superposicion con la misma funcion de carga
	processUser();
  poneTitulo();

	loadString = "";
	loadCaricaturas(claseAct);
	makeLoadString();

};


function processUser()
/* funcion generica para procesar parametros recibidos en pagina web */
{
	var parameters = location.search.substring(1).split("&");

	var temp = parameters[0].split("=");
	claseAct = unescape(temp[1]);
}


function loadCaricaturas(claseAct){		//	cargar las caricaturas que me interesan
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

}



function makeLoadString() {
	loadString = "";

	cClase = claseAct;
	let x = 0,
		titulo = " ",
		caricaturas = [];

	for (let i=0;i<lasCaricaturas.length ;i++ )
	{
		if ( cClase.includes(lasCaricaturas[i].clase ))
		{
			//	console.log( x++);
			//	caricaturas.push(lasCaricaturas[i]);
			//	console.log( i, lasCaricaturas[i] );
			//	console.log( lasCaricaturas[i].image);
			//	console.log( lasCaricaturas[i].datatitle );

			titulo = lasCaricaturas[i].datatitle;

			loadString += 
				'<a class="example-image-link" href="galeria/' + lasCaricaturas[i].image +
				'" data-lightbox="example-set" data-title="' + titulo + 
				'"><img class="example-image" src="Thumbs/' + lasCaricaturas[i].thumbnail +
				'" alt=""/></a>'

			//		<a class="example-image-link" href="galeria/MabelRodriguez.webp" data-lightbox="example-set" data-title="Click the right half of the image to move forward.">
			//			<img class="example-image" src="Thumbs/thumbMabelRodriguez.webp" alt=""/></a>
			
			

		}
	}

	//	console.log( loadString);


	// estan cargadas las caricaturas que interesan
	document.getElementById('galeria_ppal').innerHTML = loadString;

}



    function poneTitulo() {
        var text;
				// A : Artistas
				// C : Conocidos
				// D : Deportistas
				// E : pEriodistas
				// M : Mensa
				// O : Otros
				// P : Politicos / Públicos
				// V : Varios

        if (claseAct.includes("C")) {
            // block of code to be executed if condition1 is true
            text = "Conocidos";
        } else if (claseAct.includes("A")) {
            text = "Artistas";
        } else if (claseAct.includes("D")) {
            text = "Deportistas";
        } else if (claseAct.includes("E")) {
            text = "Periodistas";
        } else if (claseAct.includes("M")) {
            text = "Mensanos";
        } else if (claseAct.includes("P")) {
            text = "Públicos";
        } else if (claseAct.includes("V")) {
            text = "Varios";
        } else {
            text = "???";
        }

        //	console.log(claseAct);
        //	console.log(text);

        document.getElementById("titulo").innerHTML = " " + text;
    }
