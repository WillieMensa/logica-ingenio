/*	=============================================================================
	Pentomino Puzzle

	#### version     = "0.8.5"	- 4/12/2019
	Cambio fonts, tipo y tamaño
	Separacion botones
	Ajuste de textos en ayudas

	#### version     = "0.8.3"	- 3/12/2019
	Intento corregir observaciones de google
		Webviews
		We don’t allow apps whose primary purpose is to provide a webview of a website, 
		regardless of ownership, or to aggregate content that does not belong to the developer.



	#### version     = "0.8.2"	- 2/12/2019
	modificacion de boton proximo; funcionalidad y ubicacion
	tamaño de letras en seleccion de problema
	tamaño de letras en ayuda y acercade



	#### version     = "0.8.1"	- 30/10/2019
	Correcciones sugeridas por Mensanos rosarinos
	Mejora en la seleccion del nro de problema
	Correccion boton proximo en pantallas touch
	Ajuste para que nro problema avance correctamente
	Posición inicial de pentominos


	#### version     = "0.7.0 / 0.7.2"	- 4/10/2019
	Multilanguage y correcciones


	#### version     = "0.6.8"	- 22/9/2019
	Completando pantallas ayuda y acerca de

	#### version     = "0.6.70"	- 16/9/2019
	Depuracion archivo. Eliminar codigo innecesario

	#### version     = "0.6.66"	- 15/9/2019
	Ajusto para la version de API 28

	#### version     = "0.6.65"	- 23/8/2019
	Retomo la determinacion de variables para pantalla original (que permitia mover en pantallas chicas)
	Abandono el uso de escalas Css

	#### version     = "0.6.64"	- 23/8/2019
	Esta version no funciona en pantallas chicas. 
	Podria ser poor el uso de escalas segun tamaño de pantalla

	#### version     = "0.6.63"	- 22/8/2019
	tratando de corregir no desplazamiento de pentominos en Android

	#### version     = "0.6.62"	- 21/8/2019
	Detecte error en Android.
	Corrigiendo proporciones

	#### version     = "0.6.61"	- 18/8/2019
	Cambio estrategia. Ahora medidas fijas presentadas segun la escala detectada.


	#### version     = "0.6.6"	- 18/8/2019
	antes de subir a github

	#### version     = "0.6.42"	- 18/8/2019
	Tratamiento de adaptacion a pantallas de diferente tamaño mediante CSS
	transform: scale(escalax, escala y) 

	#### version     = "0.6.41"	- 16/8/2019
	Reinicio a partir de esta version para intentar otra 
	tecnica de ajuste a diferentes medidas de pantalla.


	#### version     = "0.6.4"	-	19/7/2019
	El uso de escala para los layers no me funciona.
	Reintento con tres o cuatro medidas alternativas de pantallas.


	#### version     = "0.6.3"	-	19/7/2019
	cuidar las proporciones en todo tamaño de pantalla
	Pruebo una tecnica diferente para mantener proporciones; presento para 
	una pantalla base determinada y segun las medidas reales aplico escala.


	#### version     = "0.6.2"	-	8/7/2019
	agrupar la preparacion de botones en una funcion: haceBotones()
	incorporacion de seleccion de diferentes problemas


	#### version     = "0.6.1"	-	7/7/2019
	Separacion de funcionalidades en archivos individuales

	ajustes.js

	include files: polyomino5.js, polySolution.js, animate.js, polyDemo.js

	=============================================================================

	Ejemplos de botones creados en javascript:
		file:///E:/Dropbox/GitHub/aca_pruebas/javascript-create-button/dist/index.html


	OBSERVACIONES

	Se utilizan dos tipos de coordenadas:
		a/ unidades de pantalla: las coordenadas de la pantalla o canvas y
		b/ unidades de tablero: donde cada cuadrado unitario que compone un poliomino es una particula unitaria.

*/

//Aliases
"use strict";

//=========
// define
//=========
const versionString="0.8.51"			//	lleva el numero de version actual

//-------------------------------------
//	https://www.w3schools.com/colors/colors_picker.asp
//	http://www.colorhexa.com/
//-------------------------------------
var BACKGROUND_COLOR = '#113322';	// "#446622";	//	"#ddff99";
var BACKGROUND_BOARD_COLOR = "white";

var BORDER_COLOR = "#666600";
var BORDER_STROKE_COLOR = "#ffff66";			//	"yellow";

var BOARD_COLOR = "#B7F7DE"; //light green
var FIXED_BLOCK_COLOR = "#555";  //light gray
var FIXED_BORDER_COLOR = BOARD_COLOR;

var FOCUS_BORDER_COLOR = "red";
var BLOCK_BORDER_COLOR = "yellow";

var OPERATOR_COLOR = "#3344FF";  //blue
var OPERATOR_CIRCLE_COLOR = "white";

var FLASH_BORDER_COLOR = "red";

var TEXT_FINISH_COLOR = "#FF88EE";
var NEXT_BUTTON_TEXT_COLOR = "#FF8800";
var NEXT_BUTTON_FILL_COLOR = "white";
var NEXT_BUTTON_BORDER_COLOR = "green";

const	TITLE_COLOR = '#8a2';

//-----------------------------------------------------
//	fonts para textos
const
	FONT_NIVEL1 = "titanone_regular",
	FONT_NIVEL2 = "baloo_regular",
	FONT_NIVEL3 = "baloo_regular"

//-------------------------------------------------------------------------
// block colors:
// from : http://en.wikipedia.org/wiki/File:Pentomino_Puzzle_Solutions.svg
//-------------------------------------------------------------------------
//	BLOCK_COLOR vector contiene los colores asignados a cada pentomino

var BLOCK_COLOR = [ "#FF0000", "#660000", "#EE9944", "#666600",
					"#00FF00", "#006600", "#00FFFF", "#006666",
					"#0000FF", "#000044", "#FF00FF", "#660066" ];


var	COLOR_BLOCK_FIJO	= '#112222';	//	gris bastante oscuro

//===========================
// values based on screen size
//===========================
var BLOCK_CELL_SIZE;	//	medida de las celdas en px. Tratare de usarla como unidad de mediada (referencia)
var STAGE_X;					//	ancho adoptado para area de juego (stage o canvas)
var STAGE_Y;					//	alto adoptado para area de juego (stage o canvas)
var STAGE_OFFSET_X;		//	vertice izquierdo de la pantalla
var STAGE_OFFSET_Y;		//	vertice superior de la pantalla
var SCREEN_X;			//	ancho de pantalla en px
var SCREEN_Y;			//	alto de pantalla en px


//==================
// global variable
//==================
var SCREEN_BOARD_X;		//	ancho del tablero en celdas. En nuestro caso: 8
var SCREEN_BOARD_Y;		//	alto del tablero en celdas. En nuestro caso: 8 (igual al anterior
var BOARD_WIDTH;			//	ancho del tablero en unidades de pantalla. Este es el que vamos a calcular para usar de base de calculo.
var BOARD_HIGH;				//	alto del tablero en unidades de pantalla
var boardStartX;			//	coordenadas para ubicar tablero.
var boardStartY;

var gBoardSizeId = 0;	//	board size. Identifica la opcion elegida para tamaño de tablero
											//	nuestro tablero es siempre el único, de 8 X 8
var gLevelId = 1;			//	play level. Nivel de dificultad; seleccionable con el levelButton
											//	en nuestro caso va a ser unico. (por ahora)


//	preparacion de layers
var gStage;           //kinetic stage
var gBackgroundLayer; //kinetic layer
var gBoardLayer;      //kinetic layer
var gMessageLayer;    //kinetic layer

var gInitLayer;				//kinetic layer
var gHelpLayer;				//kinetic layer
var gConfigLayer;			//kinetic layer
var gAboutLayer;			//kinetic layer
//	var gStatusLayer;			//kinetic layer


var gBlockGroup;		//este array contiene datos de los poliominos / poligonos a tratar (pentominos)
var gPolyGroup;			//for output on screen

//	------------------------------------------------
//	Preparacion de tetromino a posicion fija
//	------------------------------------------------
var wTetromGroup;		//	vector con datos de tetrominos. Uno va en posición fija
var	wPolyTetrom;			//	datos para colocacion en pantalla
var	nTetromId	= 3;	//	identificador del tetromino fijo a colocar en el tablero

//	var wtetromino;		//	datos de tetromino a colocar en posición fija
var wTetromPos = {x:0,y:0};	//	posicion del tetromino fijo
var gCeldasOcupadas;

//	variables globales

var nProblema = 1;						//	problema actual. Lleva la cuenta del problema a resolver / en resolucion.
var selectList = undefined;		//	la lista poara seleccionar

//---------------------------
// For calculate board state
//---------------------------
var gBoardState;		//	current board status, ([1..SCREEN_BOARD_X] , [1..SCREEN_BOARD_Y])
var gTotalBlockCell;	//	total block cells
var gBlockCellUsed = 0; //	how many block cell used. Leva la cuenta de las celditas de tablero ocupadas
						//	Este velor se emplea para verificar si el problema ha sido resuelto.
var gBlockUsed = 0;		//	how many block used



const	
	CANTPROBLEMAS = 103,
	//	DEBUG = true,	//		
	DEBUG = false,
	DEBUG2 = false;

//====================================
//	botones
//====================================
var
	aboutBtn,			//	about button
	checkBtn,			//	check button
	configBtn,		//	config button
	getOutBtn,		//	salir
	helpBtn,			//	help button
	hintBtn,			//	hint button
	menuBtn,			//	menu ppal
	//	nroProbBtn,		//	aceptar nro problema
	playBtn,			//	jugar
	//	nroProblema,	//	el input
	problemaActual,	
	giraPieza,		//	rotate button
	volteaPieza,
	//	txtVerifica,	//	texto indicar verificacion
	fakeBtn				//	este boton no existe



//==================
// BEGIN
//==================
window.onload = function(){
	
	//	if (DEBUG) { alert('Iniciando funcion init()') };

	init();
};


//--------------------
// Initial
//--------------------
function init()
{
	//just for fixed: chrome sets cursor to text while dragging, why?
	//http://stackoverflow.com/questions/2745028/chrome-sets-cursor-to-text-while-dragging-why
	//This will disable any text selection on the page and it seems that browser starts to show custom cursors.
	document.onselectstart = function(){ return false; } ;

	//initial input

	document.getElementById('container').innerHTML = "";		//	vacia la pantalla

	//	document.getElementById('checkButton').checked=false;
	//	document.getElementById('levelButton').options[gLevelId-1].selected  = true;

	//	initLanguage();					//	adaptación a diferentes idiomas
	initScreenVariable();
	initScreenPosColor();	
	
	gBlockGroup = polyomino5.blockGroup;
	createBlockStyle(gBlockGroup);			//external function. creacion de todos los estilos de bloque a partir del block inicial
	bindBlockColor(gBlockGroup);

	//	---------------------------------------------
	//	Preparacion de el/los tetrominos
	//------------------------------
	//	wtetromino = polyomino4.blockGroup[nTetromId];	//	esta linea o la que sigue, vuelan
	wTetromGroup = polyomino4.blockGroup;
	gCeldasOcupadas = CalcCeldasOcupadas();
	if (DEBUG2)	{
		for (var j=0; j < gCeldasOcupadas.length ; j++)		{
			console.log('gCeldasOcupadas['+ j + '] : ' + gCeldasOcupadas[j].x + ' : ' + gCeldasOcupadas[j].y );
		}
	}

	createBlockStyle(wTetromGroup);			//external function. creacion de todos los estilos de bloque a partir del block inicial
	//	asignamos color a los tetrominos
	for(var id=0; id < wTetromGroup.length; id++) {
		wTetromGroup[id].color = COLOR_BLOCK_FIJO;	// '#000000';
	}

	createStageLayer();

	//	if (DEBUG) { alert('Antes de initLanguage()') };
	if (DEBUG) { writeMessage('Antes de initLanguage()'); };
	

	initLanguage('en');					//	prepara el diccionario para textos

	if (DEBUG) { writeMessage('Antes de HaceBotones()') };

	//	prepara los botones de la aplicacion
	HaceBotones()

	nProblema = getNroProbl();	//	inicializa el nro de problema

	checkBtn.checked = false;		//	inicializo en false

	if (DEBUG) { writeMessage('Antes de DibujaGrilla()') };
	if (DEBUG) { DibujaGrilla()	}

	//debug
	if (DEBUG2) {
		console.log("cell " +BLOCK_CELL_SIZE + " X,Y " + STAGE_X + "," + STAGE_Y + " offX: " + STAGE_OFFSET_X + " offY: " + STAGE_OFFSET_Y);
	}

	if (DEBUG) { writeMessage('Ingresando a MenuInicial()') };

	MenuInicial();

}





//-----------------------------------------------------
function HaceBotones() {		//	Preparar los botones

const btnHeight = 0.5 * BLOCK_CELL_SIZE;
var dist_X = Math.floor(STAGE_X / 5 )


	//	---------------------------------
	//	botones de la pantalla inicial
	//	esta tecnica permite incorporar al body (no a los layers)
	//	---------------------------------
	//playBtn	; button in javascript code
	playBtn = document.createElement("button");
	playBtn.innerHTML = dict.txtJugar;
	document.body.appendChild(playBtn);
	playBtn.addEventListener ("click", function() {	playPuzzle(); });
	playBtn.style.position	= "absolute";     	
	playBtn.style.left		=	STAGE_OFFSET_X + 1 * dist_X - BLOCK_CELL_SIZE;
	playBtn.style.top			= STAGE_OFFSET_Y + STAGE_Y - BLOCK_CELL_SIZE;	
	playBtn.style.visibility='hidden';
	

	//helpBtn,	// Help button in javascript code
	helpBtn = document.createElement("button");
	helpBtn.innerHTML = dict.txtAyuda;
	document.body.appendChild(helpBtn);               // Append <button> to <body>
	helpBtn.addEventListener ("click", function() {Help()});
	helpBtn.style.left			=	"050px";
	helpBtn.style.position	= "absolute";     
	//	helpBtn.style.left			=	STAGE_OFFSET_X + 4.0 * BLOCK_CELL_SIZE;
	helpBtn.style.left			=	STAGE_OFFSET_X + 2 * dist_X - BLOCK_CELL_SIZE;
	helpBtn.style.top				= STAGE_OFFSET_Y + STAGE_Y - BLOCK_CELL_SIZE;	
	helpBtn.style.visibility='hidden';

	//aboutBtn	// About button in javascript code
	aboutBtn = document.createElement("button");
	aboutBtn.innerHTML = dict.txtAcerca;
	document.body.appendChild(aboutBtn);               // Append <button> to <body>
	aboutBtn.addEventListener ("click", function() {AcercaDe()});
	aboutBtn.style.position	= "absolute";     
	aboutBtn.style.left			=	STAGE_OFFSET_X + 3 * dist_X - BLOCK_CELL_SIZE;
	aboutBtn.style.top			= STAGE_OFFSET_Y + STAGE_Y - BLOCK_CELL_SIZE;	
	aboutBtn.style.visibility='hidden';


	configBtn = document.createElement("button");
	configBtn.innerHTML = dict.txtConfig;
	document.body.appendChild(configBtn);
	configBtn.addEventListener ("click", function() {  haceAjustes() } );// 3. Add event handler
	//	configBtn.style.cssText = "top:" + (450) + "px; left:" + (050) + "px; position: absolute;";// 4. Position in screen
	configBtn.style.left = "50px";	
	configBtn.style.position = "absolute";
	//	configBtn.style.left		=	STAGE_OFFSET_X + 13.0 * BLOCK_CELL_SIZE;
	configBtn.style.left			=	STAGE_OFFSET_X + 4 * dist_X - BLOCK_CELL_SIZE;
	configBtn.style.top 		= STAGE_OFFSET_Y + STAGE_Y - BLOCK_CELL_SIZE;	
	configBtn.style.visibility='hidden';


	
	//	---------------------------------
	//	botones de la pantalla de juego
	//	---------------------------------
	//menuBtn	//	boton menu inicio in javascript code
	menuBtn = document.createElement("button");
	menuBtn.innerHTML = dict.txtVolver;
	document.body.appendChild(menuBtn);
	menuBtn.addEventListener ("click", function() {  MenuInicial() } );// 3. Add event handler
	menuBtn.style.position = "absolute";
	menuBtn.style.left	=	STAGE_OFFSET_X + 3.6 * dist_X - BLOCK_CELL_SIZE;
	menuBtn.style.top		= STAGE_OFFSET_Y + STAGE_Y - BLOCK_CELL_SIZE;	
	menuBtn.style.visibility='hidden';


	//	giraPieza: boton para rotar piezzas
	giraPieza = document.createElement("button");
	giraPieza.innerHTML = dict.txtGirar;
	document.body.appendChild(giraPieza);
	giraPieza.addEventListener ("click", function() { girarPieza() } );// 3. Add event handler
	giraPieza.style.position = "absolute";
	giraPieza.style.left	=	STAGE_OFFSET_X + 0.4 * dist_X - BLOCK_CELL_SIZE;	//	STAGE_OFFSET_X + 1.0 * BLOCK_CELL_SIZE;
	giraPieza.style.top		= STAGE_OFFSET_Y + STAGE_Y - BLOCK_CELL_SIZE;	
	giraPieza.style.visibility='hidden';


	//	volteaPieza: boton para rotar piezzas
	volteaPieza = document.createElement("button");
	volteaPieza.innerHTML = dict.txtVoltear;
	document.body.appendChild(volteaPieza);
	volteaPieza.addEventListener ("click", function() { voltearPieza() } );
	volteaPieza.style.position = "absolute";
	volteaPieza.style.left	=	STAGE_OFFSET_X + 1.3 * dist_X - BLOCK_CELL_SIZE;	//	STAGE_OFFSET_X + 4.0 * BLOCK_CELL_SIZE;
	volteaPieza.style.top		= STAGE_OFFSET_Y + STAGE_Y - BLOCK_CELL_SIZE;	
	volteaPieza.style.visibility='hidden';



	//	hintBtn: boton ayuditas in javascript code
	hintBtn = document.createElement("button");
	hintBtn.innerHTML = dict.txtHint;
	document.body.appendChild(hintBtn);
	hintBtn.addEventListener ("click", function() {  hintsButton() } );
	//	hintBtn.style.cssText = "top:" + (SCREEN_Y-80) + "px; left:" + (500) + "px; position: absolute;";
	hintBtn.style.position = "absolute";
	hintBtn.style.left			=	STAGE_OFFSET_X + 2.2 * dist_X - BLOCK_CELL_SIZE;	//	STAGE_OFFSET_X + 7.0 * BLOCK_CELL_SIZE;
	hintBtn.style.top				= STAGE_OFFSET_Y + STAGE_Y - BLOCK_CELL_SIZE;	
	hintBtn.style.visibility='hidden';


	checkBtn = document.createElement("INPUT");
  checkBtn.setAttribute("type", "checkbox");
	document.body.appendChild(checkBtn);
	checkBtn.addEventListener ("click", function() {  checkButton(this.checked) } );// 3. Add event handler
	checkBtn.style.left = STAGE_OFFSET_X + 3.1 * dist_X - BLOCK_CELL_SIZE;	//	10 * BLOCK_CELL_SIZE;
	checkBtn.style.top	= (STAGE_OFFSET_Y + STAGE_Y - BLOCK_CELL_SIZE) +"px";
	checkBtn.style.position = "absolute";
	checkBtn.style.font = "16px";
	checkBtn.style.width = BLOCK_CELL_SIZE;
	checkBtn.style.visibility='hidden';


	//	prepara elem,ento select para elegir problema
	selectNroProbl();
	BotonAceptar();

}


//-----------------------------------------------------
//	menu de inicio
//-----------------------------------------------------
function MenuInicial() {
		
	if (DEBUG){console.log( '*'.repeat(16) + ' Menu inicial')}

	clearStageLayer();

	hiddenAllButton();
	gBoardLayer.destroy();
	gBackgroundLayer.destroy();
	gHelpLayer.destroy();
	//	gMessageLayer.destroy();
	gAboutLayer.destroy();
	gConfigLayer.destroy();

	
	HaceInitLayer();

	writeMessage("");

	aboutBtn.style.visibility='visible';
	helpBtn.style.visibility='visible';			//	help button
	configBtn.style.visibility='visible';		//	config button
	//	statusBtn.style.visibility='visible';		//	status button

	playBtn.style.visibility='visible';			//	jugar
	menuBtn.style.visibility='hidden';			//	menu ppal
	hintBtn.style.visibility='hidden';			//	menu ppal


	ocultaSelect();

	//	gInitLayer.batchDraw();
	gInitLayer.draw();


}



//-----------------------------------------------------
// start a play puzzle
// newPuzzle: 1: create new puzzle, 0: back from demo
//-----------------------------------------------------
function playPuzzle()
{
	//	waitIdleDemo();
	hiddenAllButton();

	//	hiddenStartButton();

	initBoardSize(gBoardSizeId, gLevelId); //back from demo

	if (DEBUG2) { console.log('playPuzzle, gPolyGroup: ' + gPolyGroup);	};

	createPuzzle(1, true);
	enableAllButton();

	//-------------------------------------------------
	//	botones de inicio invisibles
	playBtn.style.visibility='hidden';			//	jugar
	aboutBtn.style.visibility='hidden';
	configBtn.style.visibility='hidden';		//	config button
	helpBtn.style.visibility='hidden';			//	help button

	ocultaSelect();

	document.getElementById('espButt').style.visibility='hidden';
	document.getElementById('engButt').style.visibility='hidden';
	document.getElementById('deuButt').style.visibility='hidden';

	gInitLayer.destroy();

	hintBtn.style.visibility='visible';			//	hint button
	menuBtn.style.visibility='visible';			//	menu ppal

	giraPieza.style.visibility='visible';
	volteaPieza.style.visibility='visible';

	//checkbox
	checkBtn.style.visibility='visible';

}



function initBoardSize(boardSize, level)
{
	gBoardSizeId=boardSize;
	gLevelId = level;

}




//----------------------------------------------
//	asignacion de valores a variables basados en medidas de pantalla
//----------------------------------------------
function initScreenVariable()
{
	var screenWidth = 0, screenHeight = 0;	// ancho y alto de pantallla

	var maxStageX = 1080;
	var maxStageY = 720;
	var maxCellSize = 54;

	var midStageX = 810;
	var midStageY = 540;
	var midCellSize = 40;		//	var midCellSize = 32;

	var miniStageX = 612;
	var miniStageY = 408;
	var miniCellSize = 30;	// 24;

	var microStageX = 450;
	var microStageY = 300;
	var microCellSize = 22;	// 20;

	//----------------------------------------------------------------------
	// Window size and scrolling:
	// URL: http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
	//----------------------------------------------------------------------
	if( typeof( window.innerWidth ) == 'number' ) {
		//Non-IE
		screenWidth = window.innerWidth;
		screenHeight = window.innerHeight;
	} else if((document.documentElement) &&
		      (document.documentElement.clientWidth || document.documentElement.clientHeight ) )
	{
		//IE 6+ in 'standards compliant mode'
		screenWidth = document.documentElement.clientWidth;
		screenHeight = document.documentElement.clientHeight;
	} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
		//IE 4 compatible
		screenWidth = document.body.clientWidth;
		screenHeight = document.body.clientHeight;
	}

	SCREEN_X = screenWidth;
	SCREEN_Y = screenHeight;

	//	STAGE_X = ((screenWidth%2)? (screenWidth-1):screenWidth) - microCellSize*2;
	STAGE_X = Math.floor(screenWidth*0.95);


	//	if(STAGE_X > maxStageX) STAGE_X = maxStageX;
	//	if(STAGE_X < microStageX) STAGE_X = microStageX;
	STAGE_OFFSET_X = Math.floor((screenWidth - STAGE_X)/2);
	if(STAGE_OFFSET_X < microCellSize) STAGE_OFFSET_X = microCellSize;

	//	STAGE_Y = ((screenHeight%2)?(screenHeight-1):screenHeight) - microCellSize*2;
	STAGE_Y = Math.floor(screenHeight*0.90);

	if(STAGE_Y > maxStageY) STAGE_Y = maxStageY;
	if(STAGE_Y < microStageY) STAGE_Y = microStageY;
	STAGE_OFFSET_Y = Math.floor((screenHeight - STAGE_Y)/2);
	if(STAGE_OFFSET_Y < microCellSize) STAGE_OFFSET_Y = microCellSize;


	//	if (DEBUG)	{	writeMessage("cell " +BLOCK_CELL_SIZE + " X,Y " + STAGE_X + "," + STAGE_Y + " offX: " + STAGE_OFFSET_X + " offY: " + STAGE_OFFSET_Y);	}
	if (DEBUG)	{	console.log("SCREEN_X: " + SCREEN_X + ' SCREEN_Y: ' + SCREEN_Y ); }


	BLOCK_CELL_SIZE = maxCellSize;
	switch(true) {
	case (STAGE_X <= microStageX || STAGE_Y <= microStageY):
		BLOCK_CELL_SIZE = microCellSize;
		break;
	case (STAGE_X <= miniStageX || STAGE_Y <= miniStageY):
		BLOCK_CELL_SIZE = miniCellSize;
		break;
	case (STAGE_X <= midStageX || STAGE_Y <= midStageY):
		BLOCK_CELL_SIZE = midCellSize;
		break;
	}

}


//----------------------------------------------
// initial screen position and background color 
//----------------------------------------------
function initScreenPosColor()
{
	document.getElementById('container').style.cssText = "top:" + (STAGE_OFFSET_Y) + "px; left:" + (STAGE_OFFSET_X) + "px; position: absolute;";

	document.body.style.background = BACKGROUND_COLOR; //body background color
	
}



//------------------------------
// bind block with fixed color
//------------------------------
function bindBlockColor(blockGroup)
{
	for(var id=0; id < blockGroup.length; id++) {
		blockGroup[id].color = BLOCK_COLOR[id];
	}
}

//----------------------------------
// create stage & layer (KineticJS)
//----------------------------------
function createStageLayer()
{
	//create stage object
	gStage = new Kinetic.Stage({
		container: 'container',
		width: STAGE_X,
		height: STAGE_Y
	});

	//create layer object
	gBackgroundLayer = new Kinetic.Layer();
	gBoardLayer		= new Kinetic.Layer();
	gMessageLayer = new Kinetic.Layer();

	gInitLayer		= new Kinetic.Layer();
	gHelpLayer		= new Kinetic.Layer();
	gConfigLayer	= new Kinetic.Layer();
	gAboutLayer		= new Kinetic.Layer();
	//	gStatusLayer	= new Kinetic.Layer();

	if (DEBUG)
	{
		var simpleText = new Kinetic.Text({
			x: gStage.getWidth() / 2,
			y: (gStage.getHeight() * 0.3),
			text: 'PREPARANDO JUEGO',
			fontSize: BLOCK_CELL_SIZE,
			fontFamily: FONT_NIVEL1,//'Calibri',
			fill: TITLE_COLOR
		});

		// to align text in the middle of the screen, we can set the
		// shape offset to the center of the text shape after instantiating it
		simpleText.setOffset({
			x: simpleText.getWidth() / 2
		});

		// add the shapes to the layer
		gInitLayer.add(simpleText);
		gInitLayer.draw();

	}
}

//------------------------------------------------
// Remove child node of stage & layer (KineticJS)
//------------------------------------------------
function clearStageLayer()
{
	gBackgroundLayer.removeChildren();
	gBoardLayer.removeChildren();
	gMessageLayer.removeChildren();

	gInitLayer.removeChildren();	
	gHelpLayer.removeChildren();
	//	gConfigLayer.removeChildren();
	gConfigLayer.remove();
	gAboutLayer.removeChildren();
	//	gStatusLayer.remove();

}





//----------------------------------------------
// create a puzzle
//
// newPuzzle= 0: restore info from demo back
//            1: create new puzzle
// activePoly: active block draggiable or not
//----------------------------------------------
function createPuzzle(newPuzzle, activePoly)
{

	if (DEBUG) {console.log( '*'.repeat(16) + ' createPuzzle')}

	//	var fixedBlock = boardSizeInfo[gBoardSizeId].x * boardSizeInfo[gBoardSizeId].y / 5 - 1; //for debug only
	var fixedBlock = 0;	//	(boardSizeInfo[gBoardSizeId].numOfLevel - gLevelId)* 2;

	//	entre otras cosas initBoardState genera el polygroup
	//	initBoardState(boardSizeInfo[gBoardSizeId].x,boardSizeInfo[gBoardSizeId].y, fixedBlock, NewPuzzle);
	initBoardState( 8, 8, fixedBlock, 1);

	if (DEBUG2) {		console.log('gPolyGroup: ' + gPolyGroup)	};

	//	if(activePoly) activePolygon();		//	original pero siempre verdadero
	activePolygon();
	
	//	writeFinishMsg(); //for test only

}


//---------------------
// initial board state (game board)
//---------------------
function initBoardState(boardX, boardY, numOfFixedBlocks, newPuzzle)
{
	var nFilaProblema;		//	identifica elemento en la tabla de problemas

	if (DEBUG) {console.log( '*'.repeat(16) + ' initBoardState' )}

	//initial global variable
	SCREEN_BOARD_X = boardX;
	SCREEN_BOARD_Y = boardY;
	BOARD_WIDTH = (SCREEN_BOARD_X * BLOCK_CELL_SIZE);
	BOARD_HIGH  = (SCREEN_BOARD_Y * BLOCK_CELL_SIZE);

	boardStartX = BLOCK_CELL_SIZE;
	boardStartY = BLOCK_CELL_SIZE;		//	Math.floor((SCREEN_Y-BOARD_HIGH)/2);

	gTotalBlockCell = (SCREEN_BOARD_X * SCREEN_BOARD_Y);
	gBlockUsed = 0
	gBlockCellUsed = 0;
	
	//clear stage & create layer
	clearStageLayer();
	addBackgroundLayer();	
	addBoard2Layer();
	
	
	gBoardState = createBoard(SCREEN_BOARD_X, SCREEN_BOARD_Y); //external function
	clearPolyInsertOrder(); //for hints 
	randomBlock(gBlockGroup); //external function; random the block order
	randomBlockStyle(gBlockGroup); //external function; //	reordena aleatoriamente los estilos de bloque

	// Random the initial position of polygon
	randomPolyInitPos(gBlockGroup.length - numOfFixedBlocks);

	clearFixedBlock();

	nFilaProblema = nProblema - 1;
	//	en este punto ya debe estar seleccionado el tetromino a colocar y su posicion
	wTetromPos = { x:problemas[nFilaProblema].posX, y:problemas[nFilaProblema].posY };	//	posicion del tetromino fijo
	var str = "LSIOT";
	nTetromId	= str.indexOf(problemas[nFilaProblema].pieza);

	//	-------------------------------------------------------------------------------------
	//	Atencion: antes de buscar una solución y colocar bloques fijos se debería colocar el cuadrómino.
	//	Intento incorporar el tetromino como fijo
	//	procedimiento deberia ser similar a addFixedBlock2Layer(result.op, numOfFixedBlocks);
	wAgregatetrominoFijo( wTetromPos );


	//	la que sigue genera el gPolyGroup
	addBlock2Layer(0);		//	numOfFixedBlocks == 0;


	gStage.add(gBackgroundLayer);
	gStage.add(gBoardLayer);
	gStage.add(gMessageLayer);

	if(!newPuzzle && checkSolution)checkButton(1); //restore check solution message
	
}



//-----------------------------------------
// Random the initial position of polygon
//-----------------------------------------
var polyInitPos;
function randomPolyInitPos(availablePoly)
{
	//	midId: vendria a ser la cantidad de piezas a colocar en una linea
	//	en nuestro caso siempre seran 12
	//	var midId = (availablePoly > 5)?Math.floor((availablePoly+1)/2): availablePoly;
	var ppl = 3;	//	Piezas Por Linea; primera prueba: 4 filas de 3 piezas c/u


	//	reparto el espacio desde el tablero al borde derecho
	//	var distance =  Math.floor((STAGE_X - BLOCK_CELL_SIZE*2) / ppl);

	//	distance: distancia horizontal entre las piezas
	if (DEBUG) {	console.log( 'BLOCK_CELL_SIZE, (ppl + 1): ' + BLOCK_CELL_SIZE  + ', ' + (ppl + 1) +
					'\n9 * BLOCK_CELL_SIZE / (ppl + 1): ' + 9 * BLOCK_CELL_SIZE / (ppl + 1) )}

	//	var distance_X =  10 * BLOCK_CELL_SIZE / (ppl + 1);
	var distance_X =  Math.floor((STAGE_X - 10 * BLOCK_CELL_SIZE) / (ppl + 1));
	var distance_Y =  Math.floor(0.7 * (STAGE_Y - BLOCK_CELL_SIZE) / ((availablePoly/ppl) + 1));

	polyInitPos=[];
	for(var id=0; id < availablePoly; id++) {
		polyInitPos[id] = id;
	}

	//random position of id
	for(var id=0; id < availablePoly; id++) {
		var swapId =  Math.floor(Math.random()*(availablePoly));
		var tmpId = polyInitPos[id];

		polyInitPos[id] = polyInitPos[swapId];
		polyInitPos[swapId] = tmpId;
	}

	//----------------------------------
	// set the position by random index
	//----------------------------------
	for(var id=0; id < availablePoly; id++) {
		var index = polyInitPos[id];

		if (DEBUG){ var dbgTxt = '\ncoordenadas pos pentos ' };

		polyInitPos[id] = {
			//	x: 10 * BLOCK_CELL_SIZE + (distance_X * (0.9 + (index % ppl)) ),
			x: 9 * BLOCK_CELL_SIZE + (distance_X * (0.9 + (index % ppl) + 0.1 * index)),
			y:Math.floor( distance_Y * (1.6 + (index % (( availablePoly / ppl ) + 1 ))))
		};

		if (DEBUG){ console.log( ': ' + polyInitPos[id].x + ',' + polyInitPos[id].y ) };

	}
	//	if (DEBUG){ console.log (dbgTxt ) };


}

//-----------------------------------
// get polygon position by index id
//-----------------------------------
function getPolyInitPos(id)
{
	return polyInitPos[id];
}

//-------------------------
// clear fixed block group
//-------------------------
var gFixedPolyGroup= [];
function clearFixedBlock()
{
	gFixedPolyGroup= [];
}



//--------------------------------------------
// restore fixed block (from demo saved info)
//--------------------------------------------
function restoreFixedBlock2Layer()
{
	for(var id=0; id < gFixedPolyGroup.length; id++) {
		gBoardLayer.add(gFixedPolyGroup[id].poly);

		//	lo que sigue debieran agregarse cuatro celdillas porque el bloque fijo es un tetromino

		if (DEBUG)
		{
			throw new Error("Error forzado para detectar los llamados!");
		}

		gBlockCellUsed += gFixedPolyGroup[id].block.length;

		gBlockUsed++;
	}
}

//--------------------------------------------
// duplicate a block base on operator method
// normalize: block need normalize or not
//--------------------------------------------
function dupOpBlock(srcBlock, op, normalize)
{
	var dstBlock;

	//duplicate block
	dstBlock = [];
	for(var i = 0; i < srcBlock.length; i++) {
		dstBlock[i] = {};
		dstBlock[i].x = srcBlock[i].x;
		dstBlock[i].y = srcBlock[i].y;
	}

	if(op.leftRightFlip) {
		//(X, Y) ==> (-X, Y)
		for(var i = 0 ; i < dstBlock.length; i++) {
			dstBlock[i].x = -dstBlock[i].x;
		}
	}

	if(op.upDownFlip) {
		//(X, Y) ==> (X, -Y)
		for(var i = 0 ; i < dstBlock.length; i++) {
			dstBlock[i].y = -dstBlock[i].y;
		}
	}

	if(op.rotate) {
		//(X, Y) ==> (Y, X)
		for(var i = 0 ; i < dstBlock.length; i++) {
			var tmpX = dstBlock[i].x;
			dstBlock[i].x = dstBlock[i].y;
			dstBlock[i].y = tmpX;
		}
	}

	if(normalize) blockNormalization(dstBlock);

	return dstBlock
}

//--------------------------------------------------------
// convert solved board position to board state position
// for (gBoardState)
//--------------------------------------------------------
function SolvedPos2BoardPos(op, pos)
{
	var boardPos = { x:pos.x, y:pos.y };

	if(op.leftRightFlip) {
		boardPos.x = SCREEN_BOARD_X - boardPos.x - 1;
	}
	if(op.upDownFlip) {
		boardPos.y = SCREEN_BOARD_Y - boardPos.y - 1;
	}
	if(op.rotate) {
		var tmpX = boardPos.x;
		boardPos.x = boardPos.y;
		boardPos.y = tmpX;
	}

	return boardPos;
}

//--------------------------
// add background to layer
//--------------------------
function addBackgroundLayer()
{
	var borderWidth = Math.round(BLOCK_CELL_SIZE/4);
	var textOffset = Math.round(BLOCK_CELL_SIZE/8);
	var titleFontSize = Math.round(BLOCK_CELL_SIZE*0.5);

	var titleText1 = new Kinetic.Text({
		x: BLOCK_CELL_SIZE,			//textOffset,
		y: textOffset,
		text: dict.txtProblema + nProblema,
		fill: TITLE_COLOR,
		fontSize: titleFontSize,
		fontFamily: FONT_NIVEL1
		//	fontStyle:"bold",
		//	shadowColor: 'black',
		//	shadowBlur: 0.5,
		//	shadowOffset: [4,4],			//	2, 2],
		//	shadowOpacity:0.7
	});


	var txtVerifica = new Kinetic.Text({
		x: 11 * BLOCK_CELL_SIZE,
		y: STAGE_Y - BLOCK_CELL_SIZE,
		id: 'verifica',
		text: dict.txtVerifica,		//	'Verifica solucion',
		fontSize: titleFontSize,
		fontFamily: 'baloo_regular',
		fontStyle:"bold",
		padding: 6,
		fill: TITLE_COLOR
	});


	//	var background = new Kinetic.Rect({
	//		x: 0,
	//		y: 0,
	//		width: STAGE_X,
	//		height: STAGE_Y,
	//		stroke: '#ddeeff',
	//		strokeWidth: 2,
	//		fill: BACKGROUND_COLOR
	//	});

	if (DEBUG) {console.log('boardStartX, boardStartY: ' + boardStartX + ', ' + boardStartY )}

	var boardBackground = new Kinetic.Rect({
		x: boardStartX,
		y: boardStartY,
		width: SCREEN_BOARD_X*BLOCK_CELL_SIZE,
		height: SCREEN_BOARD_Y*BLOCK_CELL_SIZE,
		fill: BACKGROUND_BOARD_COLOR
	});

	var borderUp = new Kinetic.Rect({
		x: boardStartX-borderWidth,
		y: boardStartY-borderWidth,
		width: SCREEN_BOARD_X*BLOCK_CELL_SIZE+borderWidth*2,
		height: borderWidth,
		fill: BORDER_COLOR
	});
	var borderLeft = new Kinetic.Rect({
		x: boardStartX-borderWidth,
		y: boardStartY,
		width: borderWidth,
		height: SCREEN_BOARD_Y*BLOCK_CELL_SIZE+borderWidth,
		fill:  BORDER_COLOR
	});

	var borderRight = new Kinetic.Rect({
		x: boardStartX+SCREEN_BOARD_X*BLOCK_CELL_SIZE,
		y: boardStartY,
		width: borderWidth,
		height: SCREEN_BOARD_Y*BLOCK_CELL_SIZE+borderWidth,
		fill: BORDER_COLOR
	});

	var borderDown = new Kinetic.Rect({
		x: boardStartX-borderWidth,
		y: boardStartY+SCREEN_BOARD_Y*BLOCK_CELL_SIZE,
		width: SCREEN_BOARD_X*BLOCK_CELL_SIZE+borderWidth*2,
		height: borderWidth,
		fill: BORDER_COLOR
	});

	var borderborder = new Kinetic.Rect({
		x: boardStartX-borderWidth,
		y: boardStartY-borderWidth,
		width: SCREEN_BOARD_X*BLOCK_CELL_SIZE+borderWidth*2,
		height: SCREEN_BOARD_Y*BLOCK_CELL_SIZE+borderWidth*2,
		stroke: BORDER_STROKE_COLOR,
		strokeWidth: 2
	});


	//	gBackgroundLayer.add(background);
	gBackgroundLayer.add(titleText1);
	gBackgroundLayer.add(boardBackground);
	gBackgroundLayer.add(borderUp);
	gBackgroundLayer.add(borderLeft);
	gBackgroundLayer.add(borderRight);
	gBackgroundLayer.add(borderDown);
	gBackgroundLayer.add(borderborder);

	//	gBackgroundLayer.add(verifRect);
	gBackgroundLayer.add(txtVerifica);

}

//--------------------------------
// Draw a board and add to layer
//--------------------------------
function addBoard2Layer()
{
	var board = new Kinetic.Shape({
		x: boardStartX,
		y: boardStartY,

		drawFunc: function(canvas) {
			//draw vertical line
			var context = canvas.getContext();
			for(var x = 0; x <= SCREEN_BOARD_X ; x++) {
				context.beginPath();
				context.moveTo(x*BLOCK_CELL_SIZE, 0);
				context.lineTo(x*BLOCK_CELL_SIZE, BLOCK_CELL_SIZE*SCREEN_BOARD_Y);
				context.closePath();
				canvas.fillStroke(this);
			}

			//draw horizontal line
			for(var y = 0; y <= SCREEN_BOARD_Y ; y++) {
				context.beginPath();
				context.moveTo(0, y*BLOCK_CELL_SIZE);
				context.lineTo(BLOCK_CELL_SIZE*SCREEN_BOARD_X,  y*BLOCK_CELL_SIZE);
				context.closePath();
				canvas.fillStroke(this);
			}
		},
		stroke: BOARD_COLOR,
		strokeWidth: 2
	});
	gBoardLayer.add(board);
}

//-----------------------------------------
// create polygon blocks and add to layer
//-----------------------------------------
function addBlock2Layer(fixedBlock)
{
	createPolygon(gBlockGroup, 0);					//	fixedBlock);

	for(var g = 0; g < gPolyGroup.length; g++) {
		gBoardLayer.add(gPolyGroup[g].poly);
	}
}



//======================================
// BEGIN for create polygon
//======================================

//-----------------------------------------------------------------------------
// sort point for draw Polygon:
// Each point connect to two point, one on horizontal the other on vertical.
//
// (1) Set begin point as current point
//
// (2) from current point to find next horizontal point:
//     (2.1) find nearest right point; if not found, find the nearest left point
//     (2.2) set this point as current point and find next vertical point
//
// (3) from current point to find the next vertical point:
//     (3.1) find nearest down point; if not found, find the nearest up point
//     (3.2) set this point as current point and find next horizontal point
//
// (4) repeat (2) ~ (3) until all point found
//-----------------------------------------------------------------------------
function polyRegular(poly)
{
	var size = poly.length;
	var tmpIndex;
	var mode= 0, hMode = 0, vMode = 2;

	//console.log(poly);

	for(var i = 0; i < size-1; i++) {
		tmpIndex = -1;
		do {
			for(var j = i+1; j < size; j++) {
				switch(mode) {
				case 0: //right point (H - right)
					if(poly[i].y == poly[j].y && poly[i].x < poly[j].x) {
						if (tmpIndex < 0 || poly[tmpIndex].x > poly[j].x) {
							tmpIndex = j;
						}
					}
					break;
				case 1: //left point (H - left)
					if(poly[i].y == poly[j].y && poly[i].x > poly[j].x) {
						if (tmpIndex < 0 || poly[tmpIndex].x < poly[j].x) {
							tmpIndex = j;
						}
					}
					break;
				case 2: //up point (V - up)
					if(poly[i].x == poly[j].x && poly[i].y > poly[j].y) {
						if (tmpIndex < 0 || poly[tmpIndex].y < poly[j].y) {
							tmpIndex = j;
						}
					}
					break;
				case 3: //down point (V - down)
					if(poly[i].x == poly[j].x && poly[i].y < poly[j].y) {
						if (tmpIndex < 0 || poly[tmpIndex].y > poly[j].y) {
							tmpIndex = j;
						}
					}
					break;
				}
			}
			if(tmpIndex < 0) { //not found
				switch(mode) {
				case 0:
					hMode = ++mode;
					break;
				case 1:
					hMode = --mode;
					break;
				case 2:
					vMode = ++mode;
					break;
				case 3:
					vMode = --mode;
					break;
				}
			}
		} while( tmpIndex < 0);

		if(tmpIndex != i+1) {
			//swap
			var tmp = poly[tmpIndex];
			poly[tmpIndex] = poly[i+1];
			poly[i+1] = tmp;
		}
		//next search mode
		switch(mode) {
		case 0:
		case 1:
			mode=vMode;
			break;
		case 2:
		case 3:
			mode=hMode;
			break;
		}
	}
	//console.log(poly);
}

//-------------------------------------------------------------------
// extend one block cell as a rectangle point,
// and insert to poly-point, if this point already exit, remove it
//-------------------------------------------------------------------
function insert2Poly(polyPoint, blockCell)
{
	var pointExtend = [ {x:blockCell.x,   y:blockCell.y},
	                    {x:blockCell.x+1, y:blockCell.y},
						{x:blockCell.x,   y:blockCell.y+1},
						{x:blockCell.x+1, y:blockCell.y+1}
					  ];
	outerloop:
	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < polyPoint.length; j++) {
			if(pointExtend[i].x == polyPoint[j].x && pointExtend[i].y == polyPoint[j].y) {
				polyPoint.splice(j, 1); //remove it, if exist
				continue outerloop;
			}
		}
		polyPoint.push({x:pointExtend[i].x, y:pointExtend[i].y}); //insert it, if without exist
	}
}

//-----------------------------------------------------------------
// convert block coordinate system to polygon coordinate (kinetic)
//-----------------------------------------------------------------
function block2Polygon(block)
{
	var polyPoint = [];
	var poly = [];

	for(var i = 0; i < block.length; i++) {
		insert2Poly(polyPoint, block[i]);
	}
	polyRegular(polyPoint);
	for(var i = 0; i < polyPoint.length; i++) {
		poly.push(polyPoint[i].x * BLOCK_CELL_SIZE);
		poly.push(polyPoint[i].y * BLOCK_CELL_SIZE);
	}

	return poly;
}



var lastFocusPolyId = -1; //focus polygon block

function getLastFocusPoly()
{

	if (DEBUG2)	{		console.log('lastFocusPolyId: ' + lastFocusPolyId );	}

	if(lastFocusPolyId < 0) return; //return "undefined"

	return gPolyGroup[lastFocusPolyId].poly;
}

//-------------------------
// Set focus polygon style
//-------------------------
function setFocusPoly(poly)
{
	if(typeof poly == "undefined") return;

	poly.setStroke(FOCUS_BORDER_COLOR);
	poly.setStrokeWidth(2);
	poly.moveToTop();
	lastFocusPolyId = poly.polyId;
}

//----------------------------
// Set un-focus polygon style
//----------------------------
function clearFocusPoly(poly)
{
	if(typeof poly == "undefined") return;

	poly.setStroke(BLOCK_BORDER_COLOR);
	poly.setStrokeWidth(2);
	lastFocusPolyId = -1;
}

//----------------------------
// Set shadow
//----------------------------
function setShadow(poly)
{
	//poly.enableShadow();
	poly.setShadowColor('black');
	poly.setShadowBlur(5);
	poly.setShadowOffset([4, 4]);
	poly.setShadowOpacity(0.8);
}

//----------------------------
// clear shadow
//----------------------------
function clearShadow(poly)
{
	//poly.disableShadow();
	poly.setShadowColor('white');
	poly.setShadowBlur(0);
	poly.setShadowOffset([0, 0]);
	poly.setShadowOpacity(0);
}

//----------------------------------
// convert a block to outline shape
//----------------------------------
function block2OutlineShape(block, x, y, color, lineWidth)
{
	var poly = block2Polygon(block);

	var outlineShape = new Kinetic.Shape({
		x: x,
		y: y,
		drawFunc: function(canvas) {
			var context = canvas.getContext();
			//draw vertical line
			context.beginPath();
			context.moveTo(poly[0], poly[1]);
			for(var x = 2; x < poly.length; x+=2) {
				context.lineTo(poly[x], poly[x+1]);
			}
			context.lineTo(poly[0], poly[1]);
			context.closePath();
			//context.stroke(context);
			canvas.fillStroke(this);
		},
		stroke: color,
		strokeWidth: lineWidth
	});

	return outlineShape;
}

//------------------------------------------------------------
// convert polygon position (left-up cell) to board (X, Y)
//
// input:
// (polyX, polyY) = polygen (0,0) position on screen
// (offsetX, offsetY) = from (0,0) to center position
//
// output:
// (x, y) = block (0,0) position for try put into gBoardState
// (boardX, boardY) = center position of polygen on screen
//
// x= -1 : position out of board or over precision
// notes: (x,y) range = [1..SCREEN_BOARD_X], [1..SCREEN_BOARD_Y]
//------------------------------------------------------------
function getPositionOfPoly(polyX, polyY, offsetX, offsetY)
{
	var boardX, boardY;
	var precision = 10;		//	(Precision)
	var rx = -1,	ry = -1;

	for(var x = 0; x < SCREEN_BOARD_X; x++) {
		boardX = boardStartX + x * BLOCK_CELL_SIZE;
		if(polyX < boardX-precision || polyX > boardX+precision) continue;
		break;
	}
	if(x >= SCREEN_BOARD_X) return {x:-1, y:-1};

	for(var y = 0; y < SCREEN_BOARD_Y; y++) {
		boardY = boardStartY + y * BLOCK_CELL_SIZE;
		if(polyY < boardY-precision || polyY > boardY+precision) continue;

		return {x:x+1, y:y+1, boardX:boardX+offsetX, boardY:boardY+offsetY};
	}

	return { x:-1, y:-1};
}

//----------------
// Remove Block
//----------------
function removeBlock(board, poly)
{
	//this poly must in the board;
	//remove block from board
	removeBlockFromBoard(board, gPolyGroup[poly.polyId].block, poly.pos); //external function
	setShadow(poly);
	//clearOutline(poly.outline); //clear the outline from screen
	setColor(poly, 0.8); //set softer color

	poly.pos.x = -1; //means not in the board
	gBlockCellUsed -= gPolyGroup[poly.polyId].block.length;
	gBlockUsed--;
}

//--------------------------------
// remove polygon from gBoardState
//--------------------------------
function removeFromBoard(poly)
{
	if(poly.pos.x > 0) {
		removeBlock(gBoardState, poly);
		removePolyIdFromInsertOrder(poly.polyId); //for hints button
		removeCheck(); //check board state has solution or not
		return (1);
	}
	return (0);
}

//-------------------------------
// get block center point
// return: {x:width/2, y:high/2}
//-------------------------------
function getCenterPos(block)
{
	var leftUpX, leftUpY, rightDnX, rightDnY;

	leftUpX = rightDnX = block[0].x;
	leftUpY = rightDnY = block[0].y;

	for(var i =1; i < block.length; i++) {
		if(block[i].x < leftUpX) leftUpX = block[i].x;
		if(block[i].y < leftUpY) leftUpY = block[i].y;

		if(block[i].x > rightDnX) rightDnX = block[i].x;
		if(block[i].y > rightDnY) rightDnY = block[i].y;
	}

	return { x:(1+rightDnX-leftUpX)/2, y:(1+rightDnY-leftUpY)/2 };
}

//--------------------------------
// get left-top position of block
//--------------------------------
function getLeftUpPos(block)
{
	var
		left = block[0].x,
		up = block[0].y;

	for(var i =1; i < block.length; i++) {
		if(left > block[i].x) left = block[i].x;
		if(up > block[i].y) up = block[i].y;
	}
	return {x:left, y:up };
}

//--------------------------------
// try insert block to gBoardState
//--------------------------------
//
//       (0,0)  (0,1)
//   (x)   +-----+
// (-1,1)  |     |
//    +----+     |
//    |      (+) |
//    +----+     +-----+ (2,2)
// (-1,2)  |           |
//         +-----------+ (2,3)
//    |<-1.5->|
//
//  leftUpPos (x) = (-1, 0)
//  centerPos (+) = (1.5, 1.5)  <== (width/2, high/2)
// (unit: block cell)
//
// goal: want to get screen position of (0,0)
//
// assume:
// (1) block cell size = 40
// (2) rotate degree = 0
// (3) screen center pos = (100, 200)
//
//  offsetPos = (centerPos + leftUpPos) = (1.5,1.5) + (-1,0) = (0.5, 1.5)
//
// screen position of (0,0)
// = screenCenterPos - offsetPos X blockCellSize
// = (100, 200) - (0.5, 1.5) X 40
// = (100, 200) - (20, 40)
// = ( 80, 160)
//
// ----------------------------------------------------------------------------
//
// why center Point of block need swap ?
//
//   0, 180 degree                       90, 270 degree
//   +---+
//   |   |                             +---------+
//   | + |   center point = (0.5, 1)   |    +    |  center point = (1, 0.5)
//   |   |                             +---------+
//   +---+
//

function tryInsert2Board(poly)
{
	var polyX, polyY;
	var offsetX, offsetY; //offset of (0,0) to center point

	var centerPointSwap = (poly.getRotationDeg() / 90) & 1; //0, 90, 180, 270  ==> 0, 1, 0, 1
	var curLeftUpPos = getLeftUpPos(gPolyGroup[poly.polyId].block);

	var polyPos;

	//offset = from (0,0) to center position
	if(centerPointSwap) { //swap if rotate 90 or 270 degree
		offsetX = (poly.centerPos.y + curLeftUpPos.x) * BLOCK_CELL_SIZE;
		offsetY = (poly.centerPos.x + curLeftUpPos.y) * BLOCK_CELL_SIZE;
	} else {
		offsetX = (poly.centerPos.x + curLeftUpPos.x) * BLOCK_CELL_SIZE;
		offsetY = (poly.centerPos.y + curLeftUpPos.y) * BLOCK_CELL_SIZE;
	}

	//(poly.getPosition().x ,poly.getPosition()y ) = center position of the polygon on screen,
	//polygon position of (0,0) = centerPos - offset
	polyX = poly.getPosition().x - offsetX;
	polyY = poly.getPosition().y - offsetY;

	polyPos = getPositionOfPoly(polyX, polyY, offsetX, offsetY);

	if(polyPos.x > 0) { //poly in board
		//try insert to board
		if (DEBUG2)	{ console.log('llamamos a insertBlockToBoard() desde tryInsert2Board'); };

		if(insertBlockToBoard(gBoardState, SCREEN_BOARD_X, SCREEN_BOARD_Y, gPolyGroup[poly.polyId].block, polyPos, poly.blockId+1)) {
			//insert success
			poly.pos = polyPos;
			gBlockCellUsed += gPolyGroup[poly.polyId].block.length;
			gBlockUsed++;
			addPolyId2InsertOrder(poly.polyId); //block order for hints button
			return (1);
		}
	}
	return (0);
}

//----------------------------------------
// create polygon group from block group
//----------------------------------------
function createPolygon(blockGroup, fixedBlock)
{
	var id, i, polyId=0;
	var firstStyle;
	var poly, centerPos, leftUpPos;
	var pos;
	var poly;

	gPolyGroup = [];
	for(id = 0 ; id < blockGroup.length; id++) {
		if(blockGroup[id].order >= 0 && blockGroup[id].order < fixedBlock) {
			gBlockCellUsed += blockGroup[id].blockStyle[0].length;
			gBlockUsed++;

		//remarked, polyId < 0 for fixed block
		////blockGroup[id].polyId = -1; //fixed block without polygen
			continue; //fixed block
		} else {
			blockGroup[id].polyId = polyId; //blockGroup link to polyGroup
		}

		let firstBlock = blockGroup[id].blockStyle[0]; //get the first block

		//conver block to polygon
		poly = block2Polygon(firstBlock);

		gPolyGroup[polyId] = {};

		//duplicate first block
		gPolyGroup[polyId].block = [];
		for(i = 0; i < firstBlock.length; i++) {
			gPolyGroup[polyId].block[i] = {};
			gPolyGroup[polyId].block[i].x = firstBlock[i].x;
			gPolyGroup[polyId].block[i].y = firstBlock[i].y;
		}

		leftUpPos = getLeftUpPos(gPolyGroup[polyId].block);
		centerPos = getCenterPos(gPolyGroup[polyId].block);

		pos = getPolyInitPos(polyId);

		gPolyGroup[polyId].poly = new Kinetic.Polygon({
			x: pos.x,
			y: pos.y,
			points: poly,
			fill: colorSofter(blockGroup[id].color, 0.8),
			stroke: BLOCK_BORDER_COLOR,
			strokeWidth: 2,
			//offset = center position of polygon (relative to left-up position)
			offset: [ (centerPos.x+leftUpPos.x) * BLOCK_CELL_SIZE, (centerPos.y+leftUpPos.y) *  BLOCK_CELL_SIZE ],
			dragBoundFunc: function(pos) {
				return checkPolyBound(this, pos);
			}
		});

		poly = gPolyGroup[polyId].poly;
		poly.blockId = id; //index for reference to gBlockGroup
		poly.polyId = polyId; //index for reference to gPolyGroup
		poly.pos = { x:-1, y:-1 }; //current polygen position in board
		poly.centerPos = centerPos;

		setShadow(poly);

		//hasRotate and hasFlip for display filp & rotate operator
		//	poly.hasRotate = (blockGroup[id].blockStyle.length != 1);
		//	poly.hasFlip   = blockGroup[id].hasFlip;

		polyId++;
	}
}

function checkPolyBound(poly, pos)
{
	var x = pos.x;
	var y = pos.y;
	var degree = poly.getRotationDeg();
	var centerX = poly.centerPos.x * BLOCK_CELL_SIZE;
	var centerY = poly.centerPos.y * BLOCK_CELL_SIZE;

	if(degree%180 == 0) {
		if(pos.x < centerX+1) x = centerX+1;
		if(pos.x > STAGE_X - centerX-5) x = STAGE_X - centerX-5;

		if(pos.y < centerY+1) y = centerY+1;
		if(pos.y > STAGE_Y - centerY-5) y = STAGE_Y - centerY-5;
	} else {
		//X Y swap
		if(pos.x < centerY+1) x = centerY+1;
		if(pos.x > STAGE_X - centerY-5) x = STAGE_X - centerY-5;

		if(pos.y < centerX+1) y = centerX+1;
		if(pos.y > STAGE_Y - centerX-5) y = STAGE_Y - centerX-5;
	}

	return {x:x,y:y};
}

//-------------------------------------------------------------------
// clone polygon group from backup polygon
//
// if restore from backup it can not drag again with kineticJS 4.4.0
// so re-create object and copy attr from backup - 04/04/2013
//-------------------------------------------------------------------
function clonePolygon(savePolyGroup, fixedBlock)
{
	var id, i;
	var firstStyle;
	var poly;
	var pos;
	var poly;

	gPolyGroup = [];
	for(id = 0 ; id < savePolyGroup.length; id++) {

		gPolyGroup[id] = {};
		gPolyGroup[id].block = [];

		for(i = 0; i < savePolyGroup[id].block.length; i++) {
			gPolyGroup[id].block[i] = {};
			gPolyGroup[id].block[i].x = savePolyGroup[id].block[i].x;
			gPolyGroup[id].block[i].y = savePolyGroup[id].block[i].y;
		}

		gPolyGroup[id].poly = new Kinetic.Polygon({
			x: savePolyGroup[id].poly.getX(),
			y: savePolyGroup[id].poly.getY(),
			points: savePolyGroup[id].poly.getPoints(),
			fill: savePolyGroup[id].poly.getFill(),
			stroke: savePolyGroup[id].poly.getStroke(),
			strokeWidth: savePolyGroup[id].poly.getStrokeWidth(),
			offset: savePolyGroup[id].poly.getOffset(),
			dragBoundFunc: function(pos) {
				return checkPolyBound(this, pos);
			}

		});

		poly = gPolyGroup[id].poly;
		poly.blockId = savePolyGroup[id].poly.blockId; //index for reference to gBlockGroup
		poly.polyId = id; //index for reference to gPolyGroup
		poly.pos = savePolyGroup[id].poly.pos; //current polygen position in board
		poly.centerPos = savePolyGroup[id].poly.centerPos;

		var scale = savePolyGroup[id].poly.getScale();
		poly.setScale(scale.x, scale.y);
		poly.setRotationDeg(savePolyGroup[id].poly.getRotationDeg());

		setShadow(poly);
		//setPolyBound(poly);

		//hasRotate and hasFlip for display filp & rotate operator
		poly.hasRotate = savePolyGroup[id].poly.hasRotate;
		poly.hasFlip   = savePolyGroup[id].poly.hasFlip;

	}
}


function activePolygon()
{
	if (DEBUG2) {		console.log('gPolyGroup: ' + gPolyGroup);
		console.log('gPolyGroup.length: ' + gPolyGroup.length);
	}
	//inactivePolygon();
	for(var g = 0; g < gPolyGroup.length; g++) {
		var poly = gPolyGroup[g].poly;

		poly.setDraggable(true);

		//	--------------------------------------------
		//	prueba metodos adiconales para mover con touch
		//	necesario en pantallas chicas
    // TOUCH
    //	document.addEventListener("touchstart", touchHandler);
    //	document.addEventListener("touchmove", touchHandler);


		// add cursor style
		poly.on('pointerover', function() {
			//	writeMessage( "*** pointerover ***" );
			document.body.style.cursor = 'move';
		});

		poly.on('pointerout', function() {
			document.body.style.cursor = 'default';
			//	console.log( "inicio Dragstart ----------------------------" );
			//	writeMessage( "*** pointerout ***" );
		});

		//	dragging, desplazamiento
		//	poly.on('touchmove', function() {
		poly.on('pointermove', function() {
			//	writeMessage( "*** pointermove ***" );
			removeFromBoard(this);
			clearFocusPoly(getLastFocusPoly());
			setFocusPoly(this);
			setShadow(this);
			gBoardLayer.draw();
		});

		//	este lo agrego yo para probar
		poly.on('pointerdown click', function() {
			//	writeMessage( "*** pointerdown ***" );
			//	alert('activo pointerdown');
			removeFromBoard(this);
			clearFocusPoly(getLastFocusPoly());
			setFocusPoly(this);
			setShadow(this);
			gBoardLayer.draw();
		});

		poly.on('dragstart', function() {

			//	writeMessage( "*** dragstart ***" );
			removeFromBoard(this);
			clearFocusPoly(getLastFocusPoly());
			//	hideOperatorObject(); //disable operator before drag

			//	boton operador
			//	ocultaBotonOperador();

			setFocusPoly(this);
			setShadow(this);
			gBoardLayer.draw();
		});

		poly.on('dragend', function() {
			//	writeMessage( "*** dragend ***" );
			if(tryInsert2Board(this)) {
				//insert success

				//set to precise location
				this.setX(this.pos.boardX);
				this.setY(this.pos.boardY);

				//this.moveToBottom(); //move to bottom of board
				this.setZIndex(gBlockUsed+1); //after (board + blockUsed)

				clearFocusPoly(this);
				//	hideOperatorObject();

				//	boton operador
				//	ocultaBotonOperador();

				clearShadow(this);
				//drawOutline(this);
				setColor(this, 1); //set normal color
				gBoardLayer.draw();
				insertCheck();
			} else {
				//	showOperatorObject(this); //enable operator if insert failed
				//	y habilito el boton equivalente
				muestraBotonOperador(this);		//	para vincular al boton operador
			}

			//dumpBoard(gBoardState); //for debug only
		});

	}
}


function inactivePolygon()
{
	for(var g = 0; g < gPolyGroup.length; g++) {
		var poly = gPolyGroup[g].poly;
		poly.setDraggable(false);
		poly.off('pointerover pointerout dragstart dragend click');
	}
	document.body.style.cursor = 'default';
}

//===========================================
// BEGIN for rotate & flip polygon block
//===========================================

//-------------------------------------
// 90 degree clockwise a polygon block
//-------------------------------------
var animateRotate90Object = new animateRotate90();
function rotate90(poly, time)
{
	var block = gPolyGroup[poly.polyId].block;


	if(animateRotate90Object.isRunning()) return;
	//console.log(poly.getRotationDeg());
	if(typeof time == "undefined") time = 150;
	animateRotate90Object.init(poly, time);
	animateRotate90Object.start();

	//block rotate 90 degree clockwise, (X, Y) ==> (-Y, X)
	for(var i = 0 ; i < block.length; i++) {
		var tmpX = block[i].x;
		block[i].x = -block[i].y;
		block[i].y = tmpX;
	}
	blockNormalization(block); //external function
}

function rotate90Running()
{
	return animateRotate90Object.isRunning();
}

//---------------------------------
// left-right flip a polygon block
//---------------------------------
var animateFlipObject = new animateLeftRightFlip();
function leftRightFlip(poly, time)
{
	if (DEBUG)	{	console.log('gPolyGroup[poly.polyId]: ' + Object.values(gPolyGroup[poly.polyId]) );	};

	var block = gPolyGroup[poly.polyId].block;

	if(animateFlipObject.isRunning()) return;
	if(typeof time == "undefined") time = 150;
	animateFlipObject.init(poly, time);
	animateFlipObject.start();

	//block left right flip, (X , Y) ==> (-X , Y)
	for(var i = 0 ; i < block.length; i++) {
		block[i].x = -block[i].x
	}
	blockNormalization(block); //external function
}

function leftRightFlipRunning()
{
	return animateFlipObject.isRunning();
}

//---------------------------------------
// 90 degree clockwise the focus polygon
//---------------------------------------
function rotateFocusPoly()
{
	//----------------------------------------------------------------------------------------
	// For (kineticJS 4.4.0)
	// previous version will reset degree to 0 if degree >= 360 in animateRotate90 function
	// but it can not work for kineticJS 4.4.0, so set here
	//----------------------------------------------------------------------------------------
	if(getLastFocusPoly().getRotationDeg() >= 360) { // >= 360 degree
		getLastFocusPoly().setRotation(0);
	}
	rotate90(getLastFocusPoly());

	//gBoardLayer.draw();
}

//-----------------------------------
// left-right flip the focus polygon
//-----------------------------------
function flipFocusPoly()
{
	leftRightFlip(getLastFocusPoly());
	////gBoardLayer.draw();
}




var rotateOperatorStatus = 0; //0: remove, 1:add
var flipOperatorStatus = 0; //0: remove, 1:add




//==========================
// BEGIN for search answer
//==========================

//---------------------------------------------
// find board answer
// inUsedFromPoly: need set used block or not
//---------------------------------------------
function findAnswer(board, inUsedFromPoly)
{
	var op = { rotate:0, leftRightFlip:0, upDownFlip:0 };
	var answerBoard = screenBoard2AnswerBoard(board, op);
	var answer = new polySolution(); //external function
	var result;
	var boardX, boardY;

	if(inUsedFromPoly) setBlockInUsed();
	else clearBlockInUsed();

	if(op.rotate) {
		boardX = SCREEN_BOARD_Y;
		boardY = SCREEN_BOARD_X;
	} else {
		boardX = SCREEN_BOARD_X;
		boardY = SCREEN_BOARD_Y;
	}
	answer.init(answerBoard, boardX, boardY, 1, gBlockGroup, 1);
	result = answer.find();

	if(result.totalAnswer > 0) {
		//notes: copy back to solvedBoard not solvedBoard[0]
		result.solvedBoard = dupAnswerBoard2ScreenBoard(result.solvedBoard[0], op);
		result.op = op;
	}
	return result;
}

//-----------------------------------------------
// duplicate screen board state to answer board
// for speed up search answer,
// (1) let boardX <= boardY
// (2) let up cell count >= down cell count
// (3) let left cell count >= right cell count
//-----------------------------------------------
function screenBoard2AnswerBoard(srcBoard, op)
{
	var dstBoard;
	var boardX = srcBoard.length;
	var boardY = srcBoard[0].length;
	var leftCellCount = 0,
		rightCellCount = 0,
		upCellCount = 0,
		downCellCount = 0;

	//(1) let boardX <= boardY
	if(boardX > boardY) {
		op.rotate = 1;
		dstBoard = rotateBoard(srcBoard);
		boardX = dstBoard.length;
		boardY = dstBoard[0].length;
	} else {
		dstBoard = dupBoard(srcBoard);
	}
	//dumpBoard(dstBoard);

	var halfX = boardX/2;
	var halfY = boardY/2;

	//(2) let up cell count >= down cell count
	for(var x=1; x < boardX; x++) {
		for(var y=1; y <= boardY; y++) {
			if(!dstBoard[x][y]) continue;

			if(x < halfX) leftCellCount++;
			else rightCellCount++;

			if(y < halfY) upCellCount++;
			else downCellCount++;
		}
	}

	if(upCellCount < downCellCount) {
		op.upDownFlip = 1;
		dstBoard = upDownFlipBoard(dstBoard);
	}
	//dumpBoard(dstBoard);

	//(3) let left cell count >= right cell count
	if(leftCellCount < rightCellCount) {
		op.leftRightFlip = 1;
		dstBoard = leftRightFlipBoard(dstBoard);
	}
	//dumpBoard(dstBoard);

	return dstBoard;
}

//---------------------
// create a new board
//---------------------
function dupBoard(srcBoard)
{
	var boardX = srcBoard.length;
	var boardY = srcBoard[0].length;
	var dstBoard = [];

	for(var x = 0; x < boardX ; x++) {
		dstBoard[x] = [];
		for(var y = 0; y < boardY ; y++) {
			dstBoard[x][y] = srcBoard[x][y];
		}
	}
	return dstBoard;
}

//-----------------------------
// create a rotate board
// (x, y) ==> (y, x)
//-----------------------------
function rotateBoard(srcBoard)
{
	var boardX = srcBoard.length;
	var boardY = srcBoard[0].length;
	var dstBoard = [];

	for(var y = 0; y < boardY ; y++) {
		dstBoard[y] = [];
		for(var x = 0; x < boardX ; x++) {
			dstBoard[y][x] = srcBoard[x][y];
		}
	}
	return dstBoard;
}

//-----------------------------
// create a up down flip board
//-----------------------------
function upDownFlipBoard(srcBoard)
{
	var boardX = srcBoard.length;
	var boardY = srcBoard[0].length;
	var dstBoard = [];

	for(var x=0; x < boardX; x++) {
		dstBoard[x] = [];
		for(var y=0; y < boardY; y++) {
			dstBoard[x][y] = srcBoard[x][boardY-y-1];
		}
	}
	return dstBoard;
}

//--------------------------------
// create a left right flip board
//--------------------------------
function leftRightFlipBoard(srcBoard)
{
	var boardX = srcBoard.length;
	var boardY = srcBoard[0].length;
	var dstBoard = [];

	for(var x=0; x < boardX; x++) {
		dstBoard[x] = [];
		for(var y=0; y < boardY; y++) {
			dstBoard[x][y] = srcBoard[boardX-x-1][y];
		}
	}
	return dstBoard;
}

//-----------------------------------------------
// duplicate answer board to screen board
// base on screenBoard2AnswerBoard operator
// inverse the order to create screen board
// (1) left right flip
// (2) up down flip
// (3) rotate
//-----------------------------------------------
function dupAnswerBoard2ScreenBoard(srcBoard, op)
{
	if(op.leftRightFlip) srcBoard = leftRightFlipBoard(srcBoard);
	if(op.upDownFlip) srcBoard = upDownFlipBoard(srcBoard);
	if(op.rotate) srcBoard = rotateBoard(srcBoard);
	//dumpBoard(srcBoard);

	return (srcBoard);

}

//----------------------
// clear block in used
//----------------------
function clearBlockInUsed()
{
	for(var g = 0; g < gBlockGroup.length; g++) {
		gBlockGroup[g].blockUsed = 0;
	}
}

//--------------------
// set block in used
//--------------------
function setBlockInUsed()
{
	//(1) fixed block
	for(var g = 0; g < gBlockGroup.length; g++) {
		if(gBlockGroup[g].polyId <0) { //block without polygon means fixed
			gBlockGroup[g].blockUsed = 1;
		} else {
			gBlockGroup[g].blockUsed = 0;
		}
	}

	//(2) exist poly, insert by user
	for(var g = 0; g < gPolyGroup.length; g++) {
		var poly = gPolyGroup[g].poly;

		if(poly.pos.x > 0) {
			gBlockGroup[poly.blockId].blockUsed = 1;
		} else {
			gBlockGroup[poly.blockId].blockUsed = 0;
		}
	}
}

//==========================================
// BEGIN for check solution & checkbox
//==========================================

var checkSolution = false;
//--------------------------------------
// check solution after insert a block
//--------------------------------------
function insertCheck()
{
	if (DEBUG)	{
		console.log('gBlockCellUsed: ' + gBlockCellUsed + ' / ' + gTotalBlockCell);
		console.log('nProblema: ' + nProblema )
	};

	if(gBlockCellUsed >= gTotalBlockCell) {
		inactivePolygon();
		disableAllButton();
		setTimeout(function() {writeFinishMsg();}, 500); //wait 500 ms
		var	sloveState = 1;
		//	resolvio, incremento nro problema

		//	aqui se incrementa el nro de problema cuando se resolvió correctamente
		setNextProblem()
		//	nProblema = (nProblema < CANTPROBLEMAS) ? (parseInt(nProblema)+1.0) : nProblema
		//	habria que guardar nProblema
		//	setNroProbl(nProblema)
	
		//	writeMessage('Ahora viene el problema ' + nProblema);
		if (DEBUG) { console.log('nProblema: ' + nProblema ) };

		return;
	}

	if (DEBUG)	{	console.log('*** checkSolution: ' + checkSolution)	};


	if(checkSolution) check();
}

//--------------------------------------
// check solution after remove a block
//--------------------------------------
function removeCheck()
{
	writeMessage("");
	if(checkSolution) check();
}

//----------------
// check solution
//----------------
function check()
{
	var result = findAnswer(gBoardState, 1);

	if(result.totalAnswer <= 0) {
		writeMessage(dict.txtNoSol);
		//console.log("No solution, " + "(" + result.elapsedTime + ")");
	} else {
		writeMessage("");
		//dumpBoard(result.solvedBoard[0]);
		//console.log("Elapsed Time : " + result.elapsedTime + "s");
	}
	return result.totalAnswer;
}

//--------------------------
// on checkbox changed
//--------------------------
function checkButton(checked)
{
	checkSolution = checked;

	writeMessage("");
	if(gBlockCellUsed >= gTotalBlockCell) return; //solved
	if(checkSolution) check();
}



//===============================================================
// BEGIN for Hints
//===============================================================

var polyIdOrder;		//	guarda el orden de insercion de poliominos / poligonos utilizado en las ayuditas
//----------------------------------
// clear polygon insert-order stack
//----------------------------------
function clearPolyInsertOrder()
{
	polyIdOrder = [];
}

//---------------------------------------
// add polygon id to insert-order stack
//---------------------------------------
function addPolyId2InsertOrder(id)
{
	polyIdOrder.push(id);
}

//-------------------------------------------------
// remove exist polygon id from insert-order stack
//-------------------------------------------------
function removePolyIdFromInsertOrder(id)
{
	for(var i=0; i< polyIdOrder.length; i++) {
		if(polyIdOrder[i] == id) {
			polyIdOrder.splice(i, 1);
			break;
		}
	}
}

//----------------------------------------
// get polygon id from insert-order stack
//----------------------------------------
function getPolyIdFromInsertOrder()
{
	return polyIdOrder.pop();
}

//---------------------
// Press hints button
//---------------------
function hintsButton()
{
	var result;
	var moveTime = 350;
	var flashObject;
	var poly, polyId;

	if(gBlockCellUsed >= gTotalBlockCell) return; //solved

	//dumpBoard(gBoardState);
	result = findAnswer(gBoardState, 1);
	while(result.totalAnswer <= 0) {
		//-------------------------------------------------------------
		// Current board state has no solution,
		// try remove one block (base on block order) step by step
		// until find the answer
		//-------------------------------------------------------------
		//get the last inserted block
		polyId = getPolyIdFromInsertOrder();	//	es la identificacion del ultimo poligono insertado

		//remove it from gBoardState
		poly = gPolyGroup[polyId].poly;
		removeBlock(gBoardState, poly)

		//try find answer
		result = findAnswer(gBoardState, 1);
	}
	writeMessage("");

	clearFocusPoly(getLastFocusPoly());
	//	hideOperatorObject();

	//	boton operador
	//	ocultaBotonOperador();

	disableAllButton();
	if(!animateBlockBack(moveTime)) moveTime = 0;
	flashObject = animateHintsBlock(result.solvedBoard, result.op, moveTime);

	enableButtonAfterStopRunning(flashObject);
}

//---------------------------
// disable all input button
//---------------------------
function disableAllButton()
{
	giraPieza.disabled=true;
	volteaPieza.disabled=true;

	//	document.getElementById('checkButton').disabled=true;
	checkBtn.disabled=true;

}



//--------------------------
// enable all input button
//--------------------------
function enableAllButton()
{
	//	document.getElementById('levelButton').disabled=false;

	hintBtn.disabled=false;
	giraPieza.disabled=false;
	volteaPieza.disabled=false;


	//checkbox
	//	document.getElementById('checkButton').disabled=false;
	checkBtn.disabled=false;

}



//--------------------
// hidden all button
//--------------------
function hiddenAllButton()
{
	//	botones para giro y volteo
	giraPieza.style.visibility='hidden';
	volteaPieza.style.visibility='hidden';

	helpBtn.style.visibility='hidden';
	hintBtn.style.visibility='hidden';
	aboutBtn.style.visibility='hidden';
	playBtn.style.visibility='hidden';
	configBtn.style.visibility='hidden';
	nroProbBtn.style.visibility='hidden';
	//	nroProblema.style.visibility='hidden';
	//	labelBtn.style.visibility='hidden';
	checkBtn.style.visibility='hidden';

	ocultaSelect();
	
}

//-----------------------------------------------
// Move un-fixed block back to initial position
//-----------------------------------------------
function animateBlockBack(moveTime)
{
	var id;
	var poly;
	var endPos;
	var movedPoly;
	var count=0;

	for(var id = 0; id < gPolyGroup.length; id++) {
		poly = gPolyGroup[id].poly;
		if(poly.pos.x > 0) continue; //already in board (fixed)

		endPos = getPolyInitPos(id);

		//don't move the poly if the position same as initial position
		if(Math.round(poly.getX()) == endPos.x && Math.round(poly.getY()) == endPos.y) continue;

		//move poly back to initial position
		poly.moveToTop()
		poly.transitionTo({
			x: endPos.x,
			y: endPos.y,
			duration: moveTime/1000
		});

		count++;
	}
	return count;
}

//---------------------------------
// random flash a available block
//---------------------------------
function animateHintsBlock(solvedBoard, op, startFlashTime)
{
	var	flashOutline;

	if (DEBUG2)
	{
		for (var j=0; j < gBlockGroup.length ; j++)
		{
			console.log('gBlockGroup [' + j + '] polyId	 : ' + gBlockGroup[j].polyId );
		}
	}
	var result = findAvailableBlock(solvedBoard);

	var startX = boardStartX + result.x * BLOCK_CELL_SIZE;
	var startY = boardStartY + result.y * BLOCK_CELL_SIZE;
	var id = result.id;

	if (DEBUG) {
		console.log('result.id: ' + result.id );
		console.log('result: x * y * id : ' + result.x + ' * ' + result.y + ' * ' + result.id );
	}

	//	faltarian definir los blockStyle para el cuadrómino. No es nesario
	var hintsBlock = dupOpBlock(gBlockGroup[id].blockStyle[gBlockGroup[id].usedStyle], op, 1);
	var outlineShape = block2OutlineShape(hintsBlock, startX, startY, FLASH_BORDER_COLOR, 4)

	flashOutline = new animateFlash();

	flashOutline.init(outlineShape, gBoardLayer, startFlashTime, 3);
	flashOutline.start();

	return flashOutline;

}

//-----------------------------------------------
// random find a available block
// (next to the exist one)
//------------------------------------------------
function findAvailableBlock(solvedBoard)			//	busca aleatoriamente un bloque proximo al existente
{
	var fromVertical = Math.floor(Math.random()*2); //0: search from horizon, 1: search from vertical
	var boardX = solvedBoard.length-1;
	var boardY = solvedBoard[0].length-1;
	var blockId, polyId;

	if (DEBUG2)	{		console.log('findAvailableBlock(solvedBoard)')	}

	if(fromVertical) {
		//search available block from Y than X
		outloopV0:
		for(var x= 1; x < boardX; x++) {
			for(var y= 1; y < boardY; y++) {
				blockId = solvedBoard[x][y]-1;

				if (DEBUG2) { console.log('blockId : ' + blockId ) };

				//	solamente si no se trata de un tetromino
				if (blockId < 90){

					polyId = gBlockGroup[blockId].polyId;		//convert block id to poly id
					if(polyId >= 0 && gPolyGroup[polyId].poly.pos.x < 0) {
						//block is not in gBoardState, found it !
						break outloopV0;
					}
				}
			}
		}

		//find the (0,0) position from X than Y
		outloopV1:
		for(var y= 1; y < boardY; y++) {
			for(var x= 1; x < boardX; x++) {
				if (solvedBoard[x][y]-1 == blockId) {
					break outloopV1;
				}
			}
		}
	} else {
		//from horizon
		//search available block from X than Y
		outloopH:
		for(var y= 1; y < boardY; y++) {
			for(var x= 1; x < boardX; x++) {
				blockId = solvedBoard[x][y]-1;

				if (DEBUG2) { console.log('x, y : ' + x + ' - ' + y );
					console.log('blockId : ' + blockId );
				}

				//	solamente si no se trata de un tetromino
				if (blockId < 90){

					polyId = gBlockGroup[blockId].polyId; //convert block id to poly id

					if(polyId >= 0 && gPolyGroup[polyId].poly.pos.x < 0) {
						//ploy is not in gBoardState, found it !
						break outloopH;
					}
				}
			}
		}
	}

	//	if (!DEBUG)	{	console.log('x-1, y-1, blockId: ' + x-1 + ' - ' + y-1 + ' - ' + blockId )	}

	return {x:x-1, y:y-1, id:blockId};
}

//------------------------------------------
// enable all button after stop flash block
//------------------------------------------
function enableButtonAfterStopRunning(object, button )
{
	if(object.isRunning()) {
		setTimeout(function() {
			enableButtonAfterStopRunning(object, button);
		}, 200)
	} else {
		//	delete object;
		enableAllButton();
	}
}



//============================================
// BEGIN for board size and level selection
//============================================

//---------------------------
// Input Selection info
//---------------------------
//	lo dejo preparado para incorporar niveles de dificultad en cada problema
var boardSizeInfo = [
	{x:6, y:5,  numOfLevel:3 },
	{x:8, y:5,  numOfLevel:3 },
	{x:8, y:8,  numOfLevel:3 },
	{x:10, y:5, numOfLevel:4 },
	{x:10, y:6, numOfLevel:4 }
];





//=============================
// BEGIN for finished message
//=============================

//-------------------------
// display finish message
//-------------------------
function writeFinishMsg()
{
	var textHigh=26;
	var textWidth = 12;																//	14;
	var finishText = dict.txtFin;

	var scaleX = Math.floor((STAGE_X-11) / (2 * (finishText.length * textWidth)));
	var scaleY = Math.floor((STAGE_Y/3)/ (2 * textHigh)) ;

	var finishMsg = new Kinetic.Text({

		x: 8 * BLOCK_CELL_SIZE,		// - finishText.length * textWidth/2,
		y: 0.1 * STAGE_Y - textHigh/2,
		text: finishText,
		fontSize: textHigh,
		fontStyle:"bold",
		fill: TEXT_FINISH_COLOR,
		shadowColor: 'black',
		shadowBlur: 1,
		shadowOffset: [8, 8],
		shadowOpacity:0.5
	});

	gBoardLayer.add(finishMsg);

	finishMsg.transitionTo({
		x: 0.7 * STAGE_X - finishText.length * textWidth*scaleX /2,
		y: 0.3 * STAGE_Y - textHigh* scaleY /2 ,
		scale: {x:scaleX, y:scaleY},
		duration: 1, // 1 sec
		easing: "elastic-ease-in-out"
	});
	setTimeout("nextButton();",600); //after 600ms, display next button

}

//----------------------
// display next button
//----------------------
function nextButton()
{
	var textHigh= 16;
	var textWidth = 16;
	var padSize =8;

	//	var nextText = 'Próximo';

	var textAllWidth = dict.txtProx.length * textWidth+ padSize*1.5;	//	antes *2
	var textAllHigh  = textHigh+padSize*2;
	var scaleX = Math.floor(STAGE_X/textAllWidth/3);
	var scaleY = Math.floor(STAGE_Y/textHigh/8) ;

	//	var centerX = STAGE_X * 3/4;
	//	var centerY = STAGE_Y * 4/5;
	var centerX = 14 * BLOCK_CELL_SIZE;
	var centerY = STAGE_Y * 0.6;

	var nextMsg = new Kinetic.Text({
		x: centerX - textAllWidth/2,
		y: centerY - textAllHigh/2,
		text: dict.txtProx,
		fill: NEXT_BUTTON_TEXT_COLOR,
		fontSize: textHigh,
		//fontFamily: "sans-serif",
		//fontStyle:"bold",
		align: 'center',
		width: textAllWidth,
		padding: padSize,
		stroke: NEXT_BUTTON_TEXT_COLOR,
		strokeWidth: 1
	});

	var nextRect = new Kinetic.Rect({
		x: centerX - textAllWidth/2,
		y: centerY - textAllHigh/2,
		stroke: NEXT_BUTTON_BORDER_COLOR,
		strokeWidth: 7,
		fill: NEXT_BUTTON_FILL_COLOR,
		width: textAllWidth,
		height: nextMsg.getHeight(),
		shadowColor: 'black',
		shadowBlur: 10,
		shadowOffset: [30, 30],
		shadowOpacity: 0.5,
		cornerRadius: 5
	});

	var nextGroup = new Kinetic.Group();
	nextGroup.add(nextRect);
	nextGroup.add(nextMsg);
	gBoardLayer.add(nextGroup);

	nextRect.transitionTo({
		x: centerX-textAllWidth*scaleX/2,
		y: centerY-textAllHigh*scaleY/2 ,
		scale: {x:scaleX, y:scaleY},
		duration: 1.5,
		easing: "elastic-ease-out"
	});

	nextMsg.transitionTo({
		x: centerX-textAllWidth*scaleX/2,
		y: centerY-textAllHigh*scaleY/2 ,
		scale: {x:scaleX, y:scaleY},
		duration: 1.5,
		easing: "elastic-ease-out"
	});

	nextGroup.on('pointerover', function() {
		document.body.style.cursor = 'pointer';
	});

	nextGroup.on('pointerout', function() {
			document.body.style.cursor = 'default';
	});

	nextGroup.on('pointerdown pointermove touchend click', function() {
		if (DEBUG) { console.log('problema actual antes : ' + nProblema)}

		//	setNextProblem();			//	fija el numerop del proximo problema
		//	waitIdleDemo();
		
		if (DEBUG) { console.log('problema actual despues : ' + nProblema)}

		createPuzzle(1, true);
		enableAllButton();

		if (DEBUG)		{ console.log('despues de pointerdown, etc.')		}

	});

}

//-----------------------
// change problem to next
//-----------------------
function setNextProblem()
{
	//	incrementar nro de problema
	if(++nProblema > CANTPROBLEMAS ) {
		//	reset nProblema 
		nProblema = 1;
	}
	setStorage("nroProblemaStored", nProblema);
}



//=================================
// BEGIN for change polygen color
//=================================

//----------------------------
// color = "#RRGGBB"
// softerValue = [0.1 .. 2.0]
//----------------------------
function colorSofter(color, softerValue)
{
	var whiteValue = 255 * (1-softerValue);

	var colorR = ("0"+Math.round(parseInt(color.substr(1,2), 16)*softerValue+whiteValue).toString(16)).slice(-2);
	var colorG = ("0"+Math.round(parseInt(color.substr(3,2), 16)*softerValue+whiteValue).toString(16)).slice(-2);
	var colorB = ("0"+Math.round(parseInt(color.substr(5,2), 16)*softerValue+whiteValue).toString(16)).slice(-2);

	return ("#" + colorR + colorG + colorB);
}
//-----------------------------
// softerValue = [0.1 .. 2.0]
//-----------------------------
function setColor(poly, softerValue)
{
	var color = colorSofter(gBlockGroup[poly.blockId].color, softerValue);
	poly.setFill(color);
}

//==========================================================
// BEGIN for Save|Restore boardSize & Level (localstorage)
//==========================================================


//----------------------------------
// save board size to localstorage
//----------------------------------
function saveBoardSize(boardSize, level)
{
	setStorage("polyBoardSize", boardSize);
	setStorage("polyLevel", level);
}

//-------------------------------------------
// get board size & level from localstorage
//-------------------------------------------
function restoreBoardSize()
{
	var boardSize=parseInt(getStorage("polyBoardSize"));
	var level=parseInt(getStorage("polyLevel"));

	if(isNaN(boardSize) || isNaN(level) ||
	   boardSize < 0 || boardSize >= boardSizeInfo.length ||
	   level < 0 || level > boardSizeInfo[boardSize].numOfLevel )
	{
		boardSize = 0;
		level = 1;
	}

	initBoardSize(boardSize, level); //minimum board
}

//=======================================
// BEGIN for set|get|clear localstorage
//=======================================
function setStorage(key, value)
{
	if(typeof(window.localStorage) != 'undefined'){
		window.localStorage.setItem(key,value);
	}
}

function getStorage(key)
{
	var value = null;
	if(typeof(window.localStorage) != 'undefined'){
		value = window.localStorage.getItem(key);
	}
	return value;
}

function clearStorage(key)
{
	if(typeof(window.localStorage) != 'undefined'){
		window.localStorage.removeItem(key);
	}
}



//===============================================
// Text message to screen (for debug only)
//===============================================
function writeMessage(message) {
	
	var context = gMessageLayer.getContext();

	gMessageLayer.clear();
	//	context.font = '24pt baloo_regular';
	context.font = '20pt baloo_regular';
	//	context.style.font = '20pt baloo_regular bold';

	context.fillStyle = '#ff2';
	//	context.fillText(message, STAGE_X/2-message.length*9.5, STAGE_Y * 0.7 +BLOCK_CELL_SIZE * (SCREEN_BOARD_Y/2));
	context.fillText(message, STAGE_X/2-message.length*9.5, STAGE_Y * 0.9 );
	gBoardLayer.draw(); //FOR: firefox first time will not display 10/21/2012

}

//==============================================
// dump board value to console (for debug only)
//==============================================
function dumpBoard(board) {
	var buf = "";
	var boardX = board.length;
	var boardY = board[0].length;

	for(var y = 0; y < boardY; y++) {
		buf = "";
		for(var x = 0; x < boardX; x++) {
			if(board[x][y] > 9) {
				buf += board[x][y] + " ";
			} else {
				buf += "0" + board[x][y] + " ";
			}
		}
		console.log(buf);
	}
	console.log("");
}


//=======================================================================
//	funciones w
//=======================================================================
function wAgregatetrominoFijo(pos)	// coloca tetromino fijo
//	id: identifica el tetromino fijo. No es necesario porque cargo un único tetromino
//	pos: posición del tetromino en el tablero.
//	esta funcion debe tomar cuadrómino de una tabla que vincule
//	nro de problema con cuadrómino a colocar y posición
{
	if (DEBUG2)	{		console.log("Ingresando a wAgregatetrominoFijo(pos)" +
		"\npos.x: " + pos.x +
		"\npos.y: " + pos.y +
		"\nwTetromGroup[nTetromId].blockStyle[0]: " + wTetromGroup[nTetromId].blockStyle[0][0] );
	}

	var fixedPoly;
	var polyId =0;

		//	block recibirá la posición relativa de cada cuadradito
		//	usamos blockStyle[0] porque es el único definido. Diferencia con pentominos
		var block = dupOpBlock(wTetromGroup[nTetromId].blockStyle[0], 0, 0);

		var poly = block2Polygon(block);	//	convierte sistema de coordenadas de bloque a coordenadas de poligono

		if (DEBUG2) { console.log('linea 2865, wAgregatetromino fijo, poly: ' + poly ); };

		//	pos viene como parametro
		//	var pos = solvedPos2BoardPos(op, gBlockGroup[id].pos)

		var leftUpPos = getLeftUpPos(block);
		var centerPos = getCenterPos(block);

		var offsetX = centerPos.x+leftUpPos.x;
		var offsetY = centerPos.y+leftUpPos.y;

		var startX = boardStartX + (pos.x-1 + offsetX) * BLOCK_CELL_SIZE;
		var startY = boardStartY + (pos.y-1 + offsetY) * BLOCK_CELL_SIZE;

		/*
			el tramo que sigue no debiera ser necesario por no tomo elementos del grupo de pentominos

		gBlockGroup[id].polyId = -polyId - 1; //for link to fixed poly (fixed polyId  = -polyId+1)
		*/

		gFixedPolyGroup[polyId] = {};
		gFixedPolyGroup[polyId].block = block;


		fixedPoly = new Kinetic.Polygon({
			x: startX,
			y: startY,
			offset: [ offsetX * BLOCK_CELL_SIZE, offsetY *  BLOCK_CELL_SIZE ],
			points: poly,
			fill: FIXED_BLOCK_COLOR,
			stroke: FIXED_BORDER_COLOR,
			strokeWidth: 2
		});

		gFixedPolyGroup[polyId].poly = fixedPoly;


		//	gBlockCellUsed += wTetromGroup[nTetromId].block.length;
		gBlockCellUsed += gFixedPolyGroup[polyId].block.length;
		gBlockUsed++;


		gBoardLayer.add(fixedPoly);

		//	veamos cuales son los parametros que se van a pasar
		if (DEBUG2)		{
			dumpBoard(gBoardState);
			console.log( 'pos : ' + pos.x + ' , ' + pos.y            );
			console.log('llamamos a insertBlockToBoard() desde wAgregatetrominoFijo(pos)	'); 
		}


		if(!insertBlockToBoard(gBoardState, SCREEN_BOARD_X, SCREEN_BOARD_Y, block, pos, 99)) {
			dumpBoard(gBoardState);
			throw new Error("Design error");
		}

		polyId++;

}





//----------------------------------------
// create polygon group from block group
//----------------------------------------
function wCreateCuadrado(blockGroup, fixedBlock)
{
	var i, polyId=0;
	var firstStyle;
	var poly, centerPos, leftUpPos;
	var pos;
	var poly;


	gBlockCellUsed += blockGroup[id].blockStyle[0].length;
	gBlockUsed++;
 	if (DEBUG)	{
		console.log('blockGroup    : ' + blockGroup);
		console.log('blockGroup[0]: ' + blockGroup[0]);
		console.log('blockGroup[0].blockStyle.x: ' + blockGroup[0].blockStyle.x );
		//	console.log('linea 3184, blockGroup[0].blockStyle: ' + blockGroup[0].blockStyle);
	}

	var BlockFijo = blockGroup[0].blockStyle; //get the first block

	//conver block to polygon
	poly = block2Polygon(BlockFijo);

	leftUpPos = getLeftUpPos(gPolyGroup[polyId].block);
	centerPos = getCenterPos(gPolyGroup[polyId].block);

	pos = getPolyInitPos(polyId);

	gPolyGroup[polyId].poly = new Kinetic.Polygon({
		x: pos.x,
		y: pos.y,
		points: poly,
		fill: colorSofter(blockGroup.color, 0.8),
		stroke: BLOCK_BORDER_COLOR,
		strokeWidth: 2,
		//offset = center position of polygon (relative to left-up position)
		offset: [ (centerPos.x+leftUpPos.x) * BLOCK_CELL_SIZE, (centerPos.y+leftUpPos.y) *  BLOCK_CELL_SIZE ],
		dragBoundFunc: function(pos) {
			return checkPolyBound(this, pos);
		}
	});

	poly = gPolyGroup[polyId].poly;
	poly.blockId = 0; //index for reference to gBlockGroup
	poly.polyId = polyId; //index for reference to gPolyGroup
	poly.pos = { x:-1, y:-1 }; //current polygen position in board
	poly.centerPos = centerPos;

	setShadow(poly);

	//hasRotate and hasFlip for display filp & rotate operator
	poly.hasRotate = (blockGroup.blockStyle.length != 1);
	poly.hasFlip   = blockGroup.hasFlip;

	polyId++;

}



//	--------------------------------
function CalcCeldasOcupadas()		//	arma un vector con los datos de las celdas ocupadas en el tablero
{
	var aCeldas = [];

	for (var i = 0; i < wTetromGroup[nTetromId].blockStyle[0].length; i++ )
	{
		aCeldas[i] = {};
		aCeldas[i].x = wTetromGroup[nTetromId].blockStyle[0][i].x + wTetromPos.x;
		aCeldas[i].y = wTetromGroup[nTetromId].blockStyle[0][i].y + wTetromPos.y;
	};

	return aCeldas;

}


function muestraBotonOperador(poly) {
	var cx = poly.getPosition().x;
	var cy = poly.getPosition().y;

	if(poly.hasRotate) {
		giraPieza.disabled=false;
		giraPieza.style.visibility='visible';
	}

	if(poly.hasFlip) {
		volteaPieza.disabled=false;
		volteaPieza.style.visibility='visible';
	}
	gBoardLayer.draw();

};



//---------------------------------------
//	con el boton
// 90 degree clockwise the focus polygon
//---------------------------------------
function girarPieza()
{
	//	por las dudas no haya pieza seleccionada
	//	if (DEBUG)	{	console.log('lastFocusPolyId: ' + lastFocusPolyId );	};
	if(lastFocusPolyId < 0) return; //return "undefined"

	//----------------------------------------------------------------------------------------
	// For (kineticJS 4.4.0)
	// previous version will reset degree to 0 if degree >= 360 in animateRotate90 function
	// but it can not work for kineticJS 4.4.0, so set here
	//----------------------------------------------------------------------------------------
	if(getLastFocusPoly().getRotationDeg() >= 360) { // >= 360 degree
		getLastFocusPoly().setRotation(0);
	}
	rotate90(getLastFocusPoly());

	//gBoardLayer.draw();
}


//-----------------------------------
//	con el boton
// left-right flip the focus polygon
//-----------------------------------
function voltearPieza()
{
	//	por las dudas no haya pieza seleccionada
	if (DEBUG)	{	console.log('lastFocusPolyId: ' + lastFocusPolyId );	};
	if(lastFocusPolyId < 0) return; //return "undefined"


	leftRightFlip(getLastFocusPoly());
	////gBoardLayer.draw();
}




//------------------------------------------
//rectangulo para visualizar area de trabajo
//------------------------------------------
function addContorno2Layer()
{
	var background = new Kinetic.Rect({
		x: 0,
		y: 0,
		width: STAGE_X,
		height: STAGE_Y,
		fill: "#FF0000"
	});

	gBackgroundLayer.add(background);

}



//-----------------
// on level change
//-----------------
function levelButton(id)
{
	gLevelId = parseInt(id);
	createPuzzle(1, true);
}





//-------------------------------------------------------------------
function HaceInitLayer()  {//pantalla de inicio

	var simpleText = new Kinetic.Text({
		x: gStage.getWidth() / 2,
		y: (gStage.getHeight() * 0.3),
		text: 'PENTO\nMANÍA',
		fontSize: 2 * BLOCK_CELL_SIZE,
		fontFamily: FONT_NIVEL1,//'Calibri',
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

	// add the shapes to the layer
	gInitLayer.add(simpleText);

	languageButtons();
	//	initLanguage();		//		selectIdioma();

	gStage.add(gInitLayer);

};

