/*	
	sumado.js
	26/10/2018	vers 1.7.6
	25/10/2018	vers 1.7.5
	8/8/2017	vers 1.2.0
	11/7/2017	vers 1.0
*/

//Aliases
"use strict";

//	Algunas constantes
var	LIMITE_TABLERO = 560,
	LINEA_BOTONES = 470,
	BOTONES_CHAU_X = 520,
	LINEA_BOTONES_OFF = 700,
	RENDERER_W = 1000,
	RENDERER_H = 600,
	FONDO_AYUDA = 0x008cff,
	FONDO_JUEGO = "0xffffff",
	VERSION	= "1.7.6",
	nESCALA = 1.23,
	TABLERO_OFF_X = 58,		//	Vertice sup izq del tablero
	TABLERO_OFF_Y = 58,
	DEBUG = false;
	//	DEBUG = true;

var							//	Container = PIXI.Container,
							//	autoDetectRenderer = PIXI.autoDetectRenderer,
							//	Sprite = PIXI.Sprite,
							//	loader = PIXI.loader,
							//	resources = PIXI.loader.resources,
    Text = PIXI.Text;

var rendererOptions = {
	antialiasing: false,
	transparent: false,
	resolution: window.devicePixelRatio,
	autoResize: true,
}

//Create the renderer
//	750 de alto solo para visualizar los botones cuando son desplazados
var renderer = PIXI.autoDetectRenderer( RENDERER_W, RENDERER_H, rendererOptions );
//	var renderer = new PIXI.Application( RENDERER_W, RENDERER_H, { backgroundColor: 0x1099bb } );
//	var renderer = new PIXI.Application( 700, 550, rendererOptions );
//	var app = new PIXI.Application(800, 600, { backgroundColor: 0x1099bb });

//	-----------------------------------------------
// Put the renderer on screen in the corner
renderer.view.style.position = "absolute";
renderer.view.style.top = "0px";
renderer.view.style.left = "0px";


//	--------------------------------------------	

//Add the canvas to the HTML document
	document.body.appendChild(renderer.view);


//	Set the canvas's border style and background color
renderer.view.style.border = "0px solid #0f0";
renderer.backgroundColor = FONDO_JUEGO;


//Define any variables that are used in more than one function
var aNumeros = [],		//	array con los numeros
	aSumaPolig  = [],	//	array con la suma de los poligonos
	aVertices = [],		//	array con datos de vertices
	aVPos = [ [96,96], [299,96], [502,96], [96,299], [299,299], [502,299], [96,502], [299,502], [502,502] ],	//	aVPos contiene las posición de los vértices
	BotonAtras = undefined,
	BotonAbandona = undefined,
	BotonAyuda = undefined,
	BotonJugar = undefined,
	BotonSobre = undefined,
	Crono = undefined,
	start = undefined,
	elapsed = undefined,
	EscenaDeAyudas = undefined,			//	container ayudas
	EscenaDeJuego = undefined,			//	container juego
	EscenaSobre = undefined,			//	container de estadisticas
	EscenaFinJuego = undefined,			//	container aviso de fin del juego
	EscenaMenuInic = undefined,			//	container pantalla de inicio
	EscenarioGral = undefined,			//	container del total (1er nivel)
	id = undefined,
	numTexture = undefined,
	nVertice = undefined,
	pointer = undefined,
	state = undefined, 
    gridstep = 185;
    //	resuelto = false;

//	estructura del vector aVertices
//	aVertices[i] = [ 
//		numero de vértice, 
//		valor asignado en inicio
//		número colocado (o vacio)
//		indicador de fijo o movil]


//load resources; a JSON file and run the `setup` function when it's done 
PIXI.loader.add("images/sumadotileset.json")	.load(setup);


function setup() {
	//	Preparacion general
	//	Create an alias for the texture atlas frame ids
	id = PIXI.loader.resources["images/sumadotileset.json"].textures;

	//	Make the game scene and add it to the EscenarioGral
	EscenarioGral = new PIXI.Container();

	// Size the renderer to fill the screen
	resize(); 
	// Listen for and adapt to changes to the screen size, e.g.,
	// user changing the window or rotating their device
	window.addEventListener("resize", resize);
	
	//	Escenario menu inicial
	EscenaMenuInic = new PIXI.Container();
	EscenarioGral.addChild(EscenaMenuInic);

	//	Escenario menu juego
	EscenaDeJuego = new PIXI.Container();
	EscenarioGral.addChild(EscenaDeJuego);

	//Create the EscenaFinJuego
	EscenaFinJuego = new PIXI.Container();
	EscenarioGral.addChild(EscenaFinJuego);

	//	Crear escenario de ayudas
	EscenaDeAyudas = new PIXI.Container();
	EscenarioGral.addChild(EscenaDeAyudas);

	//	Crear escenario de estadisticas
	EscenaSobre = new PIXI.Container();
	EscenarioGral.addChild(EscenaSobre);

	//	Prepara los botones necesarios
	HaceBotones();

	//	Prepara las diferentes pantallas / escenas.
	PantallaInicio();
	PantallaAyuda();
	PantallaJugar();
	PantallaSobre();

	//	Set the initial game state
	//	state = play;
	state = Menu;

	//	Una grilla para ubicarnos en el canvas
	if (DEBUG) 
	{
		DibujaGrilla()
	}

	//	definir cuales son las escenas visibles y cuales invisibles
	EscenaMenuInic.visible = true;			//	container pantalla de inicio
	EscenaFinJuego.visible = false;		//	container aviso de fin del juego
	EscenarioGral.visible = true;			//	container del juego
	EscenaDeAyudas.visible = true;
	EscenaSobre.visible = false;

	var	MessageFin = new PIXI.Text( "Solución correcta.\nFelicitaciones!", 
		{ fontFamily: "Sriracha",	fontSize: "32px", fill: "#600" });	
		MessageFin.x = 600;
		MessageFin.y = 440;
		EscenaFinJuego.addChild(MessageFin);

	//	detectar y procesar teclas pulsadas mediante 'keydown' event listener en el document
	document.addEventListener('keydown', onKeyDown);
	//Start the game loop
	gameLoop();
}


function PantallaInicio() {
	EscenaMenuInic.visible = true;

	//	titulo del menu y juego
	var spritesumado = PIXI.utils.TextureCache["sumado-titulo.png"];
	spritesumado = new PIXI.Sprite(spritesumado);
	spritesumado.x = 150 ;
	spritesumado.y = 120 ;
	// make it a bit bigger, so it's easier to grab
	spritesumado.scale.set(nESCALA);
	EscenaMenuInic.addChild(spritesumado);

}



function gameLoop() {
	//Loop this function 60 times per second
	requestAnimationFrame(gameLoop);
	//	Run the current state
	state();
	//Render the EscenarioGral
	renderer.render(EscenarioGral);
}




//	--------------------------------------
function play() {
	if ( VerificaSuma() ) {
		state = end;
	} else {
		elapsed = Math.floor(( new Date().getTime() - start ) / 100 ) / 10;
	}
	Crono.text = "Tiempo: " + elapsed + " seg.";
}

////////////////////////////////////////////////////////////////////////////////////////
//	solamente para depurar
function DibujaGrilla() {

	var posX=50, posY=50;
	var line = new PIXI.Graphics();
	var rectang = new PIXI.Graphics();

	line.lineStyle(1, "#bbbbbbb", 0.5 )

	//	lineas horizontales
	while (posY<RENDERER_H)
	{
		line.moveTo(0, posY);
		line.lineTo(RENDERER_W, posY);
		//	line.x = 0;
		//	line.y = ( 50 * i ) + 25 ;
		EscenarioGral.addChild(line);

		posY = posY+50;
	}

	//	lineas verticales
	while (posX<RENDERER_W)
	{
		line.moveTo(posX, 0);
		line.lineTo(posX, RENDERER_H);
		//	line.x = ( 50 * i ) + 25;
		//	line.y = 0;
		EscenarioGral.addChild(line);

		posX = posX+50;
	}

	rectang.lineStyle(2, 0x0000ff, 0.7 );
	rectang.drawRect(TABLERO_OFF_X, TABLERO_OFF_Y, 480, 480);
	EscenaDeJuego.addChild(rectang);


/*
	for (var i = 0; i < 18; i++)
	{
		//	lineas horizontales
		var line = new PIXI.Graphics();
		line.lineStyle(1, "#bbbbbbb", 0.5 )
		line.moveTo(0, 0);
		line.lineTo(900, 0);
		line.x = 0;
		line.y = ( 50 * i ) + 25 ;
		EscenarioGral.addChild(line);
		//	lineas verticales
		line = new PIXI.Graphics();
		line.lineStyle(1, "#ace", 0.5);
		line.moveTo(0, 0);
		line.lineTo(0, 600);
		line.x = ( 50 * i ) + 25;
		line.y = 0;
		EscenarioGral.addChild(line);
	}
*/

}


function PantallaAyuda() {
	var graphics = new PIXI.Graphics();
	// draw a rounded rectangle
	graphics.lineStyle(4, 0x332211, 0.95)
	graphics.beginFill( FONDO_AYUDA, 0.95);
	graphics.drawRoundedRect(40, 40, RENDERER_W-240, 400 );
	graphics.endFill();

	EscenaDeAyudas.addChild(graphics);

	var style = {
		fontSize: "32px",
		fontFamily: 'Sriracha',
		fontStyle: 'italic',
		fontWeight: 'light',
		fill: '#ffffff',
		stroke: '#4a1850',
		strokeThickness: 1,
		dropShadow: false,
		dropShadowColor: '#000000',
		dropShadowBlur: 4,
		dropShadowAngle: Math.PI / 6,
		dropShadowDistance: 6,
		wordWrap: true,
		wordWrapWidth: 570
	};
	var richText = new PIXI.Text('¿Qué es?\n' +
		'SU-MA-DO es un desafío de lógica que requiere un \n' + 
		'mínimo conocimiento de aritmética para ser resuelto.\n' + 
		'¿En que consiste?\n' + 
		'Hay nueve círculos unidos de forma tal que se forman \n' + 
		'cuadrados y triángulos. En los círculos o vértices de \n' + 
		'cada figura se ha asignado un número diferente entre \n' + 
		'uno y nueve. En cada figura se muestra la suma \n' + 
		'resultante de los correspondientes vértices. \n' + 
		'El objeto del juego es deducir los valores asignados \n' + 
		'a cada círculo.\n' + 
		'Se dan como ayuda los valores de dos vértices.', { fontFamily: "Sriracha",	fontSize: "24px", fill: "0xffffcc"  } );

	//	'Se dan como ayuda los valores de dos vértices.', style);
	richText.x = 60;
	richText.y = 60;
	EscenaDeAyudas.addChild(richText);

	EscenaDeAyudas.visible = true;

	BotonJugar.disabled=true;
	BotonAyuda.disabled=true;
	BotonSobre.disabled=true;
	BotonAtras.disabled=false;

	BotonJugar.visible = false;
	BotonAyuda.visible = false;
	BotonSobre.visible = false;
	BotonAtras.visible = true;

}



function PantallaJugar() {
	var tablero,
		i = undefined,			//	para conteo usos varios
		aPosPolig = undefined,
		num, cImagen;

	var tableroTexture = id["tablero.png"];
	tablero = new PIXI.Sprite(tableroTexture);
	//	tablero = id["sumado-tablero.png"];

	tablero.x = TABLERO_OFF_X;
	tablero.y = TABLERO_OFF_Y;
	// make it a bit bigger, so it's easier to grab
	//	tablero.scale.set(1.34);
	tablero.scale.set(nESCALA);
	EscenaDeJuego.addChild(tablero);

	Crono = new PIXI.Text( "Tiempo: ", { fontFamily: "Sriracha", fontSize: "16px", fill: "#a00"  } );	
	Crono.position.set(400, 10 );
	EscenaDeJuego.addChild(Crono);

	// creacion de los sprites draggables para cada nro
	for ( i = 1; i < 10; i++)
	{
		cImagen = "num0" + i + ".png";
		numTexture = PIXI.utils.TextureCache[cImagen];
		num = new PIXI.Sprite(numTexture);

		num.interactive = true;
		//	draggableObjects.addChild(num);    

		// this button mode will mean the hand cursor appears when you roll over the num with your mouse
		num.buttonMode = true;

		// center the num's anchor point
		//	num.anchor.set(0.5);
		num.anchor.set(0.4);

		// make it a bit bigger, so it's easier to grab
		//	num.scale.set(1.0);
		num.scale.set(nESCALA);

		// setup events
		num
		// events for drag start
		.on('mousedown', onDragStart)
		.on('touchstart', onDragStart)
		// events for drag end
		.on('mouseup', onDragEnd)
		.on('mouseupoutside', onDragEnd)
		.on('touchend', onDragEnd)
		.on('touchendoutside', onDragEnd)
		// events for drag move
		.on('mousemove', onDragMove)
		.on('touchmove', onDragMove);

		//	add draggable objects to container
		EscenaDeJuego.addChild(num);

		// add it to the EscenarioGral
		//	EscenarioGral.addChild(num);
		
		//	para hacerlo draggable (con la libreria)
		//	num.draggable();

		aNumeros[i] = num;
		aNumeros[i].val = i;
		
		//	Make the sprites draggable
		//	t.makeDraggable(aNumeros[i]);
		//	aNumeros[i].draggable = true;
	}

	//	colocamos las sumas de los poligonos en posición
	//	aPosPolig da la posición del texto indicador de la suma.
	//	aPosPolig = [[145, 95],[90, 146],[270, 120],[120, 270],[300, 246],[240, 296] ];
	aPosPolig = [[220,155],[155,218],[375,182], [185,377],[410,342],[340,407] ];

	for ( i = 0; i < 6; i++)
	{
		//	aSumaPolig[i] = new PIXI.Text("999", {font:"50px Sigmar One", fill:"red"});
		aSumaPolig[i] = new PIXI.Text("999", { fontFamily: "Sriracha",	fontSize: "52px",  fill:"#08e"} ) ;
		//	aSumaPolig[i] = new Text("999", { fontFamily: "Luckiest Guy",	fontSize: "48px",  fill:"#09f"} ) ;

		//	aSumaPolig[0].text = "XXX" ;
		//	aSumaPolig[i].style = {font:"50px Sigmar One", fill:"red"} ;
		//	MessExtra = new Text( "Vamos a sumar...!", { fontFamily: 'Sriracha', fontSize: "24px" } );

		aSumaPolig[i].position.set(aPosPolig [i][0], aPosPolig [i][1]);
		EscenaDeJuego.addChild( aSumaPolig[i] );
	}

}



function Jugar() {
	var i = undefined;
//	definir cuales son las escenas visibles y cuales invisibles
	EscenaDeAyudas.visible = false;
	EscenaDeJuego.visible = true;
	EscenaSobre.visible = false;
	EscenaFinJuego.visible = false;
	EscenaMenuInic.visible = false;
	EscenarioGral.visible = true;

	EscenaDeJuego.alpha = 0.99 ;

	//	pruebo quitar al boton del area visible (para no destuirlo y crearlo nuevmante)
	//	...y esto funciona. Asi es que...
	BotonJugar.y = LINEA_BOTONES_OFF;
	BotonAyuda.y = LINEA_BOTONES_OFF;	
	BotonSobre.y = LINEA_BOTONES_OFF;
	BotonAtras.y = LINEA_BOTONES_OFF;

	BotonJugar.disabled=true;
	BotonAyuda.disabled=true;
	BotonSobre.disabled=true;
	BotonAtras.disabled=true;
	BotonAbandona.disabled=false;

	BotonJugar.visible = false;
	BotonAyuda.visible = false;
	BotonSobre.visible = false;
	BotonAtras.visible = false;
	BotonAbandona.visible = true;

	//	posicionar los sprites de numeros
	// creacion de los sprites draggables para cada nro
	for ( i = 1; i < 10; i++)
	{
		//	formula para calcular posicion de estacionamiento
		aNumeros[i].x = LIMITE_TABLERO + 120 + ( 2 - ( 2 + i )  % 3 ) * 100 ;
		aNumeros[i].y = i * 45 + 65 ;
		
	}

	GenJuego()		//	genera un nuevo juego

	start = new Date().getTime();
	elapsed = 0;

	state = play;

}

function Menu() {
	//	definir cuales son las escenas visibles y cuales invisibles
	EscenaDeAyudas.visible = false;		//	container ayudas
	EscenaDeJuego.visible = false;
	EscenaSobre.visible = false;		//	container estadisticas
	EscenaFinJuego.visible = false;		//	container aviso de fin del juego
	EscenaMenuInic.visible = true;		//	container pantalla de inicio
	EscenarioGral.visible = true;		//	container del juego

	BotonJugar.y = LINEA_BOTONES;
	BotonAyuda.y = LINEA_BOTONES;		//	durante el juego mantenemos el boton de ayuda
	BotonSobre.y = LINEA_BOTONES;
	BotonAtras.y = LINEA_BOTONES;
	BotonJugar.visible = true;
	BotonAyuda.visible = true;
	BotonSobre.visible = true;
	BotonAtras.visible = true;

	BotonAbandona.disabled=true;
	BotonAbandona.visible =false;

	state = Menu;
}

function Ayuda() {
//	definir cuales son las escenas visibles y cuales invisibles
	EscenaDeAyudas.visible = true;
	EscenaDeJuego.visible = false;
	EscenaSobre.visible = false;
	EscenaFinJuego.visible = false;
	EscenaMenuInic.visible = false;
	EscenarioGral.visible = true;

	BotonJugar.y = LINEA_BOTONES_OFF;
	BotonAyuda.y = LINEA_BOTONES_OFF;		//	durante el juego mantenemos el boton de ayuda
	BotonSobre.y = LINEA_BOTONES_OFF;
	BotonAtras.y = LINEA_BOTONES;

	BotonAtras.visible = true;
	BotonAtras.disabled=false;
	BotonAbandona.disabled=true;
	BotonAbandona.visible =false;

	state = Ayuda;

}


function HaceBotones() {
	var BotonTexture;

	//	-------------------------------------------------------------	//	Preparacion del boton jugar
	BotonTexture = PIXI.utils.TextureCache["botonjugar.png"];
	BotonJugar = new PIXI.Sprite(BotonTexture);
	// Set the initial position
	BotonJugar.anchor.set(0.5);
	BotonJugar.x = 260;
	BotonJugar.y =  LINEA_BOTONES;
	// Opt-in to interactivity
	BotonJugar.interactive = true;
	// Shows hand cursor
	BotonJugar.buttonMode = true;
	// Pointers normalize touch and mouse
	BotonJugar.on('pointerdown', Jugar );
	BotonJugar.on('click', Jugar ); // mouse-only
	BotonJugar.on('tap', Jugar ); // touch-only
	BotonJugar.scale.set(0.7);
	//	Add the button to the EscenarioGral
	EscenarioGral.addChild(BotonJugar);

	//	-------------------------------------------------------------
	//	Preparacion del boton sobre
	BotonTexture = PIXI.utils.TextureCache["botonsobre.png"];
	BotonSobre = new PIXI.Sprite(BotonTexture);
	// Set the initial position
	BotonSobre.anchor.set(0.5);
	BotonSobre.x = 440;
	BotonSobre.y =  LINEA_BOTONES;
	// Opt-in to interactivity
	BotonSobre.interactive = true;
	// Shows hand cursor
	BotonSobre.buttonMode = true;
	// Pointers normalize touch and mouse
	BotonSobre.on('pointerdown', Sobre );
	BotonSobre.on('click',		 Sobre ); // mouse-only
	BotonSobre.on('tap',		 Sobre ); // touch-only
	BotonSobre.scale.set(0.7);
	//	Add the button to the EscenarioGral
	EscenarioGral.addChild(BotonSobre);

	//	-------------------------------------------------------------
	//	Preparacion boton de ayudas
	BotonTexture = PIXI.utils.TextureCache["botonayuda.png"];
	BotonAyuda = new PIXI.Sprite(BotonTexture);
	// Set the initial position
	BotonAyuda.anchor.set(0.5);
	BotonAyuda.x = 620;
	BotonAyuda.y =  LINEA_BOTONES;
	// Opt-in to interactivity
	BotonAyuda.interactive = true;
	// Shows hand cursor
	BotonAyuda.buttonMode = true;
	// Pointers normalize touch and mouse
	BotonAyuda.on('pointerdown', Ayuda );
	BotonAyuda.on('click', Ayuda ); // mouse-only
	BotonAyuda.on('tap', Ayuda ); // touch-only
	BotonAyuda.scale.set(0.7);
	//	Add the button to the EscenarioGral
	EscenarioGral.addChild(BotonAyuda);

	//	Preparacion boton volver a inicio
	BotonTexture = PIXI.utils.TextureCache["botonatras.png"];
	BotonAtras = new PIXI.Sprite(BotonTexture);
	// Set the initial position
	BotonAtras.anchor.set(0.5);
	BotonAtras.x = 760;
	BotonAtras.y =  LINEA_BOTONES;
	// Opt-in to interactivity
	BotonAtras.interactive = true;
	// Shows hand cursor
	BotonAtras.buttonMode = true;
	// Pointers normalize touch and mouse
	BotonAtras.on('pointerdown', Menu );
	BotonAtras.on('click', Menu );
	BotonAtras.on('tap', Menu );
	BotonAtras.scale.set(0.7);
	//	Add the button to the EscenarioGral
	EscenarioGral.addChild(BotonAtras);

	//	boton abandonar juego
	BotonAbandona = new PIXI.Sprite(BotonTexture);
	// Set the initial position
	BotonAbandona.anchor.set(0.5);
	BotonAbandona.x = 900;
	BotonAbandona.y =  BOTONES_CHAU_X;
	// Opt-in to interactivity
	BotonAbandona.interactive = true;
	// Shows hand cursor
	BotonAbandona.buttonMode = true;
	// Pointers normalize touch and mouse
	BotonAbandona.on('pointerdown', Menu );
	BotonAbandona.on('click', Menu );
	BotonAbandona.on('tap', Menu );
	BotonAbandona.scale.set(0.7);
	//	Add the button to the EscenarioGral
	EscenaDeJuego.addChild(BotonAbandona);


}

//--------------------------------
	

function onDragStart(event)
{
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
	if ( this.val != aVertices[2][1] && this.val != aVertices[6][1]  )
	{
	    this.dragging = true;
	}

	var newPosition = this.data.getLocalPosition(this.parent);

	if (this.data)
	{
	}
	//	si estamos tomando una ficha numero que ocupa un vertice, hay que desocupar el vertice
    if (this.dragging)
	{
		if (newPosition.x > 0 && newPosition.x < LIMITE_TABLERO && newPosition.y > 0 && newPosition.y < LIMITE_TABLERO )
		{
			var newPosition = this.data.getLocalPosition(this.parent);
			nVertice = Math.floor( newPosition.x / gridstep ) + 3 * Math.floor( newPosition.y / gridstep ) 
			aVertices[nVertice][2] = ''
		}
	}
}


function onDragEnd()
{
	//	no usado ???	var nLineaOffset = 100;
	//	this sería el sprite con numero a posicionar
	var lNumOK = false,
	i = undefined;		//	indica numero bien ubicado
    if (this.dragging)
    {
        var newPosition = this.data.getLocalPosition(this.parent);
		//	Estamos en el tablero o afuera?
		if ( newPosition.x < 0 || newPosition.x > LIMITE_TABLERO || newPosition.y < 0 || newPosition.y > LIMITE_TABLERO )
		{
			//	estamos afuera del tablero. va al estacionamiento.
			//	console.log( "afuera del tablero!.  ficha-numero va al estacionamiento")	
			lNumOK = false;
		} else { 
			nVertice = Math.floor( newPosition.x / gridstep ) + 3 * Math.floor( newPosition.y / gridstep ) 
			//	Ahora distinguir si nVertice está libre u ocupado
			if (aVertices[nVertice][2] === "" )	{            
				lNumOK = true;
				//	voy a ustilizar la posición del vertice 'almacenada' en el mismo
				newPosition.x = aVPos[nVertice][0];
				newPosition.y = aVPos[nVertice][1];	
				//	y marco al vertice como ocupado
				aVertices[nVertice][2] = this.val;
			} else {
				lNumOK = false;
			}
		}

		if ( !lNumOK )
		{
			//	formula para calcular posicion de estacionamiento
			newPosition.x = LIMITE_TABLERO + 50 + ( 2 - ( 2 + this.val )  % 3 ) * 60 ;
			newPosition.y = this.val * 50 ;
		}
		this.position.x = newPosition.x;
        this.position.y = newPosition.y;
    }
	this.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
}


function onDragMove()
{
    if (this.dragging)
    {
        var newPosition = this.data.getLocalPosition(this.parent);
		/////////////////////////////////////////////////////

        this.position.x = newPosition.x;
        this.position.y = newPosition.y;
 
    }
}

function GenJuego()			//	genera un nuevo juego
{
	//	la funciones para el ordenamiento
	var aTemp = undefined,
		//	aPosPolig = [],		//	array con posición de datos poligonos
		i = undefined,
		n = undefined,
		aVertex = [];		//	para ubicar numeros aleatoriamente

	for ( i = 0; i < 9; i++)
	{
		aVertex.push( [i + 1, Math.random() ] );
	}

	aVertex = bubbleSort(aVertex, 0, aVertex.length - 1);

	////////////////////////////////////////////////////
	//	Preparo un vector con la data de los vértices:
	//		id del vértice (codificado adecuadamente para identificarlo facil)
	//		valor objetivo
	//		id.num colocado: codigo del número colocado en el vértice o señal de estar vacio
	//		indicador de vértice-dato (fijo)
	for ( i = 0; i < 9; i++)
	{
		aVertices[i] = [i, aVertex[i][0], "", false]
	}


	//	asignamos los vértices datos. Por ahora un solo modelo. Datos son los vertices 2 y 6
	aVertices[2][3] = true;
	aVertices[2][2] = aVertices[2][1];
	//	asigno la posición fija a los datos. 
	//	nVertice = Math.floor( newPosition.x / gridstep ) + 3 * Math.floor( newPosition.y / gridstep ) 
	//	aNumeros[aVertices[2][2]].position.x = ( aVertices[2][0] % 3 ) * 175 + 75;
	aNumeros[aVertices[2][2]].position.x =  aVPos[2][0];
	aNumeros[aVertices[2][2]].position.y =  aVPos[2][1];
	//	aNumeros[aVertices[2][2]].position.y = Math.floor( aVertices[2][0] / 3 ) * 125 + 75 ;
	aNumeros[2].draggable = false;

	aVertices[6][3] = true;
	aVertices[6][2] = aVertices[6][1];
	//	asigno la posición fija a los datos
	//	aNumeros[aVertices[6][2]].position.x = ( aVertices[6][0] % 3 ) * 125 + 75;
	//	aNumeros[aVertices[6][2]].position.y = Math.floor( aVertices[6][0] / 3 ) * 125 + 75 ;
	aNumeros[aVertices[6][2]].position.x =  aVPos[6][0];
	aNumeros[aVertices[6][2]].position.y =  aVPos[6][1];
	aNumeros[6].draggable = false;


	////////////////////////////////////////////////////
	//	Actualizamos la suma de los poligonos
	aSumaPolig[0].text = aVertices[0][1]+ aVertices[1][1]+ aVertices[4][1] ;
	aSumaPolig[1].text = aVertices[0][1]+ aVertices[3][1]+ aVertices[4][1] ;
	aSumaPolig[2].text = aVertices[1][1]+ aVertices[2][1]+ aVertices[4][1]+ aVertices[5][1] ;
	aSumaPolig[3].text = aVertices[3][1]+ aVertices[4][1]+ aVertices[6][1]+ aVertices[7][1] ;
	aSumaPolig[4].text = aVertices[4][1]+ aVertices[5][1]+ aVertices[8][1] ;
	aSumaPolig[5].text = aVertices[4][1]+ aVertices[7][1]+ aVertices[8][1] ;

}


function bubbleSort(inputArray, start, rest) {
	for (var i = rest - 1; i >= start;  i--) {
		for (var j = start; j <= i; j++) {
			if (inputArray[j+1][1] < inputArray[j][1] ) {
				var tempValue = inputArray[j];
				inputArray[j] = inputArray[j+1];
				inputArray[j+1] = tempValue;
			}
		}
	}
	return inputArray;
}



function end() {
	//	definir cuales son las escenas visibles y cuales invisibles
	EscenaDeAyudas.visible = false;		//	container ayudas
	EscenaDeJuego.visible = true;
	EscenaSobre.visible = false;		//	container estadisticas
	EscenaFinJuego.visible = true;		//	container aviso de fin del juego
	EscenaMenuInic.visible = false;		//	container pantalla de inicio
	EscenarioGral.visible = true;		//	container del juego

	EscenaDeJuego.alpha = 0.8 ;

	//	BotonJugar.y = LINEA_BOTONES_OFF ;
	//	BotonAyuda.y = LINEA_BOTONES_OFF ;		//	durante el juego mantenemos el boton de ayuda
	//	BotonSobre.y = LINEA_BOTONES_OFF ;
	//	BotonAtras.y = LINEA_BOTONES;
	//	BotonAbandona.y = LINEA_BOTONES;

	BotonJugar.visible = true;
	BotonAyuda.visible = true;
	BotonSobre.visible = true;
	BotonAtras.visible = false;
	BotonAbandona.visible =true;
	
}



//	procesar teclas pulsadas
function onKeyDown(key) {

	var	cualTecla = key.key;
    if (key.key === "*" ) {
		state = Menu;
    }
    // W Key is 87
    // Up arrow is 38
    if (key.keyCode === 87 || key.keyCode === 38) {
    }
    // S Key is 83
    // Down arrow is 40
    if (key.keyCode === 83 || key.keyCode === 40) {
    }
    // A Key is 65
    // Left arrow is 37
    if (key.keyCode === 65 || key.keyCode === 37) {
    }
    // D Key is 68
    // Right arrow is 39
    if (key.keyCode === 68 || key.keyCode === 39) {
    }

}


function PantallaSobre() {
	var graphics = new PIXI.Graphics();
	// draw a rounded rectangle
	graphics.lineStyle(4, 0x332211, 0.95)
	graphics.beginFill( FONDO_AYUDA, 0.95);
	graphics.drawRoundedRect(40, 40, RENDERER_W-240, 400 );
	graphics.endFill();

	EscenaSobre.addChild(graphics);

	var richText = new PIXI.Text('Sobre SUMADO version ' + VERSION + '\n' +
		'Es un juego desafio desarrollado por \n' +
		'Willie Verger Juegos de Ingenio\n\n' +
		'Soporte: ingverger@gmail.com\n' +
		'Web: ingverger.com.ar\n' +
		'\n' , { fontFamily: "Sriracha",	fontSize: "32px", fill: "0xffffcc"  } );

	richText.x = 60;
	richText.y = 60;
	EscenaSobre.addChild(richText);

	EscenaSobre.visible = true;

	BotonJugar.disabled=true;
	BotonAyuda.disabled=true;
	BotonSobre.disabled=true;
	BotonAtras.disabled=false;
	BotonAbandona.disabled=true;

	BotonJugar.visible = false;
	BotonAyuda.visible = false;
	BotonSobre.visible = false;
	BotonAtras.visible = true;
	BotonAbandona.visible =false;

}

function Sobre() {

//	definir cuales son las escenas visibles y cuales invisibles
	EscenaDeAyudas.visible = false;
	EscenaDeJuego.visible = false;
	EscenaSobre.visible = true;
	EscenaFinJuego.visible = false;
	EscenaMenuInic.visible = false;
	EscenarioGral.visible = true;

	BotonJugar.y = LINEA_BOTONES_OFF;
	BotonAyuda.y = LINEA_BOTONES_OFF;		//	durante el juego mantenemos el boton de ayuda
	BotonSobre.y = LINEA_BOTONES_OFF;
	BotonAtras.y = LINEA_BOTONES;

	BotonAbandona.disabled=true;
	BotonAbandona.visible =false;
	BotonAtras.disabled=false;
	BotonAtras.visible = true;

	state = Sobre;

}


function resize() {
   // Determine which screen dimension is most constrained
  var ratio = Math.min(window.innerWidth/RENDERER_W,
                   window.innerHeight/RENDERER_H);
  // Scale the view appropriately to fill that dimension
  EscenarioGral.scale.x = EscenarioGral.scale.y = ratio;
  // Update the renderer dimensions
  renderer.resize(Math.ceil(RENDERER_W * ratio),
                  Math.ceil(RENDERER_H * ratio));
}

function VerificaSuma() {
//	var	resuelto = 
	return	aSumaPolig[0].text == aVertices[0][2]+ aVertices[1][2]+ aVertices[4][2] &&
		aSumaPolig[1].text == aVertices[0][2]+ aVertices[3][2]+ aVertices[4][2] &&
		aSumaPolig[2].text == aVertices[1][2]+ aVertices[2][2]+ aVertices[4][2]+ aVertices[5][2] &&
		aSumaPolig[3].text == aVertices[3][2]+ aVertices[4][2]+ aVertices[6][2]+ aVertices[7][2] &&
		aSumaPolig[4].text == aVertices[4][2]+ aVertices[5][2]+ aVertices[8][2] &&
		aSumaPolig[5].text == aVertices[4][2]+ aVertices[7][2]+ aVertices[8][2] ;
}