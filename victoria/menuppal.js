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
		'	<li class="dropdown">' +
		'		<a href="javascript:void(0)" class="dropbtn">Enlaces</a>' +
		'		<div class="dropdown-content">' +
		'			<a href="gastronomia.html">Gastronomía</a>' +
		'			<a href="termas.html">Termas</a>' +
		'			<a href="enConstruccion.html">Servicios</a>' +
		'			<a href="enConstruccion.html">Recreaciones</a>' +
		'		</div>' +
		'	<li><a href="./eventos.html">Eventos</a></li>' +
		'	<li><a href="./sitemap.html">Mapa del sitio </a></li>' +
		'	</li>' +
		'</ul>' ;

}

