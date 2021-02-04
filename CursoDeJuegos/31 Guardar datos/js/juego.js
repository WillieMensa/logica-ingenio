

function guardar(valor){
	localStorage.setItem("puntuacion", valor);
}

function recuperar(){
	return(localStorage.getItem("puntuacion"));
}


function inicializa(){
	var puntuacion = recuperar();
	
	if(puntuacion!=null){
		console.log(puntuacion);
	}
	
	else{
		console.log("No hay datos");
		guardar(3);
	}
	
}

