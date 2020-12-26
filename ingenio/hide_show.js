/*
	hide_show.js
	2020 .09.09 
	esconder y mostrar la solución de los problemas presentados
	La solucion debe estar encerrada en:	
		<div id="solucion">
		</div>

*/
window.onload = function(){
	var x = document.getElementById("solucion");
	x.style.display = "none";
};

function hideShow() {
	var x = document.getElementById("solucion");
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}
