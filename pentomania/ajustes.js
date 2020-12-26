/*	=============================================================================
	Pentomino Puzzle
	archivo: ajustes.js
	6/7/2019

*/

//-------------------------------------------------------------------
function HaceConfigLayer(){
	//	if (DEBUG){console.log(' en HaceConfigLayer() ');}

	var simpleText = new Kinetic.Text({
		x: (gStage.getWidth() * 0.6),
		y: (gStage.getHeight() * 0.1),
		text: dict.txtAjustesPento,					//	'  AJUSTES DE \nPENTOMANIA',
		fontSize: 1.5 * BLOCK_CELL_SIZE,	
		fontFamily: FONT_NIVEL1,					
		fill: TITLE_COLOR,
		shadowColor: 'black',
		shadowBlur: 5,
		shadowOffset: [6,6],			//	2, 2],
		shadowOpacity:0.7

	});

	// to align text in the middle of the screen, we can set the
	// shape offset to the center of the text shape after instantiating it
	simpleText.setOffset({
		x: simpleText.getWidth() / 2
	});

	gConfigLayer.add(simpleText);
	//	gConfigLayer.add(labelBtn);

	muestraSelect() ;

	//	document.getElementById("mySelect").value = getNroProbl();
	selectList.value = getNroProbl();

	gStage.add(gConfigLayer);

	gConfigLayer.draw();


};



function haceAjustes() {
//-----------------------------------------------------
//menu de status
//-----------------------------------------------------

//	console.clear();
console.log('--------- haciendo Ajustes ------------');

//	hiddenAllButton();	//	oculta todos los botones
	giraPieza.style.visibility='hidden';
	volteaPieza.style.visibility='hidden';
	helpBtn.style.visibility='hidden';
	hintBtn.style.visibility='hidden';
	aboutBtn.style.visibility='hidden';
	playBtn.style.visibility='hidden';
	checkBtn.style.visibility='hidden';
	configBtn.style.visibility='hidden';

	delLangButt();				//	esconde botones de idiomas

//	gStage
gBoardLayer.destroy();
gBackgroundLayer.destroy();
gMessageLayer.destroy();
gInitLayer.destroy();
gHelpLayer.destroy();
gAboutLayer.destroy();
gConfigLayer.destroy();

if (DEBUG){console.log(' haciendo ConfigLayer ')}

HaceConfigLayer();

nProblema = getNroProbl();

menuBtn.style.visibility='visible';			//	menu ppal
nroProbBtn.style.visibility='visible';

}




//----------------------------------
// save nro problema to localstorage
//----------------------------------
function setNroProbl(n) {

//	var n = nroProblema.value;

	if (DEBUG)	{	console.log('en setNroProbl()\nnro de problema antes: ' + nProblema + ', ' + n );	}
	nProblema = n;			//	parseInt( nroProblema.value);	

	setStorage("nroProblemaStored", nProblema);
	if (DEBUG)	{	console.log('nro de problema fijado: ' + nProblema);	}
}

//-------------------------------------------
// get nro problema from localstorage
//-------------------------------------------
function getNroProbl()
{
	let nCual = getStorage("nroProblemaStored");

	if(isNaN(nCual) || nCual < 1 || nCual > CANTPROBLEMAS )
	{
		nCual = 1;
	}

	if (DEBUG) { 	console.log('nCual: ' + nCual ); 	};

	return nCual

	
}


//-------------------------------------------
// funciones para preparar, mostrar y ocultar elemento select
//-------------------------------------------
	function selectNroProbl() {
		//Create and append select list
		selectList = document.createElement("select");
		selectList.id = "selectList";
		selectList.style.left	= STAGE_OFFSET_X + BLOCK_CELL_SIZE;  //	"100px";	
		selectList.style.top	= STAGE_OFFSET_Y + BLOCK_CELL_SIZE;  //	"50px";
		selectList.style.position = "absolute";
		selectList.style.width = "160px";
		//	selectList.style.height = "30px";
		selectList.size = "8";
		selectList.style.textAlign = 'right';
		selectList.style.background = '#99cc00';
		
		//Create and append the options
		for (var i = 1; i <= CANTPROBLEMAS; i++) {
				var option = document.createElement("option");
				option.value = i;
				option.style.textAlign = 'right';
				option.text = 'Problema ' + i;
				selectList.appendChild(option);
		}
		//	selectList.size = "10";		//	esto no anda

		document.getElementById("seleccion").appendChild(selectList);

	};

	//	function myFunction() {
	//		//	obtener y mostrar el valor elegido	
	//		var x = document.getElementById("selectList").selectedIndex;
	//		alert(document.getElementsByTagName("option")[x].value + ", " + x);
	//	};


	function ocultaSelect() {	//	ocultar el objeto select
		var x = document.getElementById("seleccion");
		x.style.visibility='hidden';
	};

	function muestraSelect() {	//	mostrar el objeto select
		var x = document.getElementById("seleccion");
		x.style.visibility='visible';
	};

	function fijaNroProbl() {
		var x = document.getElementById("selectList").selectedIndex;
		//	alert(document.getElementsByTagName("option")[x].value + ", " + x);
		var n = document.getElementsByTagName("option")[x].value;
		setNroProbl(n);

	}

function BotonAceptar() {
	//	nroProbBtn boton aceptar numero de problema
	nroProbBtn = document.createElement("button");
	nroProbBtn.innerHTML = dict.txtAceptar;
	document.body.appendChild(nroProbBtn);
	nroProbBtn.addEventListener ("click", function() {  fijaNroProbl(), MenuInicial() } );// 3. Add event handler
	nroProbBtn.style.left = STAGE_OFFSET_X + BLOCK_CELL_SIZE;
	nroProbBtn.style.top	= STAGE_OFFSET_Y + STAGE_Y - BLOCK_CELL_SIZE;	
	nroProbBtn.style.position = "absolute";
	nroProbBtn.style.visibility='hidden';
}
