/*
	menuppal.js
	2020.10.31 
*/

window.onload = function(){
	poneMenuPpal();
};


function poneMenuPpal() {

	document.getElementById('menuppal').innerHTML = 
		'	<ul class="ul.nav" id="mainMenu">' +
		'	<li><a href="./index.html">Inicio </a></li> ' +
		'	<li class="dropdown">' +
		'		<a href="javascript:void(0)" class="dropbtn">Enlaces</a>' +
		'		<div class="dropdown-content">' +
		'			<a href="comercios.html">Comercios</a>' +
		'			<a href="servicios.html">Servicios</a>' +
		'			<a href="gastronomia.html">Gastronomia</a>' +
		'			<a href="recreaciones.html">Recreaciones</a>' +
		'		</div>' +
		'	<li><a href="./eventos.html">Eventos</a></li>' +
		'	<li><a href="./sitemap.html">Mapa del sitio </a></li>' +
		'	</li>' +
		'</ul>' ;

}

