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
		'	<li><a href="./problemas_ingenio_2020.html">Problemas de Ingenio </a></li>' +
		'	<li><a href="./ingenio.html">Juegos </a></li>' +
		'	<li><a href="./aplicaciones.html">Aplicaciones </a></li>' +
		'	<li class="dropdown">' +
		'		<a href="javascript:void(0)" class="dropbtn">Publicaciones</a>' +
		'		<div class="dropdown-content">' +
		'			<a href="matematica-recreativa.html">Matemática recreativa</a>' +
		'			<a href="publicaciones-varias.html">Publicaciones varias</a>' +
		'			<a href="calendarios.html">Impresion calendarios y otros</a>' +
		'			<a href="galeria-conocidos-1.html">Personajes conocidos</a>' +
		'			<a href="galeria-conocidos-2.html">+ Personajes conocidos</a>' +
		'			<a href="galeria-ArtistasPeriodistas.html">Artistas y Periodistas</a>' +
		'			<a href="galeria-publicos.html">Personajes Públicos</a>' +
		'			<a href="./repgrafsincorbata.html">Representación gráfica sin corbata</a>' +
		'			<a href="revista-enigma.html">&Uacute;ltimo n&uacute;mero de la revista Enigma.</a>' +
		'		</div>' +
		'	<li><a href="./sitemap.html">Mapa del sitio </a></li>' +
		'	</li>' +
		'</ul>' ;

}

