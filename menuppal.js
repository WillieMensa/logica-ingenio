/*
	menuppal.js
	2020.10.31 
*/

window.onload = function(){
	poneMenuPpal();
};


function poneMenuPpal() {

	document.getElementById('menuppal').innerHTML = 
		'	<ul id="mainMenu">' +
		'	<li><a href="./index.html">Inicio </a></li> ' +
		'	<li><a href="./ingenio.html">Ingenio   </a></li>' +
		'	<li><a href="./aplicaciones.html">Aplicaciones </a></li>' +
		'	<li class="dropdown">' +
		'		<a href="javascript:void(0)" class="dropbtn">Representac. Gráfica</a>' +
		'		<div class="dropdown-content">' +
		'			<a href="./guias-de-clase.html">Guías de Clase</a>' +
		'			<a href="./rg-material-estudio.html">Material adicional</a>' +
		'			<a href="./representacion-con-cad.html">Representación asistida con CAD</a>' +
		'			<a href="./caligrafia-croquis.html">Caligrafía y croquis</a>' +
		'			<a href="./repgrafsincorbata.html">Representación gráfica sin corbata</a>' +
		'		</div>' +
		'	</li>' +
		'	<li class="dropdown">' +
		'		<a href="javascript:void(0)" class="dropbtn">Publicaciones</a>' +
		'		<div class="dropdown-content">' +
		'			<a href="matematica-recreativa.html">Matemática recreativa</a>' +
		'			<a href="publicaciones-varias.html">Publicaciones varias</a>' +
		'			<a href="calendarios.html">Impresion calendarios y otros</a>' +
		'			<a href="galeria-personajes.html">Galería de personajes</a>' +
		'		</div>' +
		'	<li><a href="./sitemap.html">Mapa del sitio </a></li>' +
		'	</li>' +
		'</ul>' ;

}

