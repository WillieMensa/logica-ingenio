/*
  galeria.js
  2021.1.24
*/

function inicializar(){

}


function posicionRaton(e){
	var x = e.pageX;
	var y = e.pageY;
	console.log('x: ' + x + ' - y: ' + y)

}


function muestraImagen(src) {
  var destino = document.getElementById("personaje");
  destino.src = src;
}

/*
  function show_image(src, width, height, alt) {
    var img = document.createElement("img");

    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;

    // This next line will just add it to the <body> tag
    document.body.appendChild(img);
  }
*/
