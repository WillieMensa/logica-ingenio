/*
		index.js
		para funcionar con pixi

		Mensa Timer

		15/5/2019 - version 0.9.8
		27/5/2019 - version 0.9.8b
		28/5/2019 - version 0.9.8c
		31/5/2019 - version 0.9.9
		31/5/2019 - version 0.9.91
		3/6/2019	-	version 0.9.94	continua correccion botones ajuste tiempo
		7/6/2019	-	version 0.9.99	continua correccion botones ajuste tiempo
		8/6/2019  - version 0.10.01 reparacion defectos touch en botones de ajuste de tiempo
		8/6/2019  - version 0.10.02 reparacion (definitiva) defectos touch en botones de ajuste de tiempo

		15/1/2020	-	version 1.0.1	apaisado y vertical.
								Sigo buscando no se apague display

	*/

"use strict";

//	-------------------------
//	Constantes
//	-------------------------
const	APLICACION = "M-TIMER",
	COLU_BOTONES = 100,			//	X POS
	FILA_1_CTRL	=	180,
	FILA_DIGITOS	=	300,
	FILA_2_CTRL	=	440,
	FILA_BOTONES = 550,			//	Y POS
	RENDERER_W = 1000,			//	1000,
	RENDERER_H = 600,
	FONDO_JUEGO = 0x002222,	//	0xcccccc,		//	 "#ffc",
	VERSION	= "1.1.4",			//	version prueba beta abierta inicial
	FONDO_AYUDA = 0x004488,
	FONDO_AJUSTE = 0x002244,
	FONT_NIVEL1 = "balooregular",		//	Titulos:	"luckiest_guyregular",	"Bangers",	"Luckiest Guy",	"Titan One", "Sigmar One"
	FONT_NIVEL2 = "balooregular",		//	"bangersregular",	//	botones: "Bangers",	//	"Sigmar One",
	FONT_NIVEL3 = "balooregular",		//	textos:	"sriracharegular",		//
	COLOR_BOTON = 0x66ddee,				//	COLOR_BOTON = 0x006600,
	TIEMPO_AVISO = 5000,
	FLAG_ESC = 0.8,								//	escala tamaño banderitas de idioma
	DEBUG = false;
	//	DEBUG = true;



//	Create a Pixi (stage and) renderer
//	let	stage = new Container(),
let rendererOptions = {
	antialiasing: false,
	transparent: false,
	resolution: window.devicePixelRatio,
	autoResize: true,
	backgroundColor: FONDO_JUEGO,
	//	backgroundColor: linear-gradient( to bottom right, #eeff88, #33bb22 ),
}

//	Create the renderer
let renderer = PIXI.autoDetectRenderer( RENDERER_W, RENDERER_H, rendererOptions );

// Put the renderer on screen in the corner
renderer.view.style.position = "absolute";
renderer.view.style.top = "0px";
renderer.view.style.left = "0px";

document.body.appendChild(renderer.view);


//	Scale the canvas to the maximum window size
//	let scale = scaleToWindow(renderer.view);

//Set the initial game state
let state = Menu;
let myReq = undefined;


//	-------------------------
//	variables globales varias. might be used in more than one function
//	-------------------------
let	BotonAcercaDe = undefined,
	BotonAtras = undefined,
	BotonAyuda = undefined,
	BotonJugar = undefined,
	//	BotonAjustes = undefined,
	//	BotonMenu = undefined,
	Crono = undefined,
	start = undefined,
	elapsed = undefined,
	ctrlIncMin = undefined,
	ctrlDecMin = undefined,
	ctrlIniciar = undefined,
	ctrlIncSeg = undefined,
	ctrlDecSeg = undefined,
	ctrlDetener = undefined,
	CtrlDetener = undefined,				//	detiene temporizador
	OpcAleman = undefined,					//	botones seleccion idioma
	OpcEspanol = undefined,
	OpcIngles = undefined,
	//	EscenaDificultad = undefined,		//	container seleccion nivel de dificultad
	//	EscenaFinJuego = undefined,			//	container aviso de fin del juego
	EscenaAcercaDe = undefined,			//	container de estadisticas
	//	EscenaAjustes = undefined,			//	container de ajustes
	EscenaDeAyudas = undefined,			//	container ayudas
	//	EscenaDeJuego = undefined,			//	container juego
	EscenaMenuInic = undefined,			//	container pantalla de inicio
	EscenarioGral = undefined,
	idTexturas = undefined,
	foo;			//	container del total (1er nivel)


//	-----------------------------------------------------
//	definicion de contenedores de texto para multi idioma
//	-----------------------------------------------------
let	
		txtAcerca = undefined,
		txtAyuda	= undefined,
		txtConfig	= undefined,
		txtFin = undefined,
		txtIdioma = undefined,
		txtJugar = undefined,
		txtNoSol = undefined,
		txtOtro = undefined,
		txtTiempo = undefined,
		txtVolver = undefined,
		txtEspanol = undefined,
		txtIngles = undefined,
		txtAleman = undefined,
		txtDescAcerca = undefined,
		txtDescAyuda = undefined;



//	==========================================================================
//	variables especificas de esta aplicacion
let 
	txtMinu = undefined,			//	array con los numeros de las piezas
	txtSegu = undefined,			//	array con los numeros de las piezas
	noSleep = undefined,			//	Create a new NoSleep object and then enable or disable it when needed.
	xfoo;


let
	sysLang = undefined,	//	identificacion idioma a utilizar, se almacena como "elIdioma"
	nDist = undefined,		//	tiempo fijado en el timer en milisegundos
	cMin = (DEBUG) ? "00" : "20",
	cSeg = "00",					//	minutos y segundos en formato texto
	stopTime = undefined,	//	el horario de finalizacion
	detener = false,			//	variable indica solicitud detener temporizador
	audioElement = document.createElement('audio');	//	contiene el elemento de audio para avisar finalizacion de tiempo




//	======================================================================

	function init() {
	};


	//load resources; a JSON file and run the `setup` function when it's done 
	PIXI.loader
		.add("images/tilesetmtimer.json")		//	PIXI.loader.add("assets/tileset.json").load(setup);
		.load(setup);



	//	======================================================================
	function setup() {

		console.log( {APLICACION, VERSION });
		if (DEBUG) {console.log( "window.innerWidth, innerHeight: " + window.innerWidth + ", " + window.innerHeight );}

		//Get a reference to the texture atlas id's
		//	Create an alias for the texture atlas frame ids
		idTexturas = PIXI.loader.resources["images/tilesetmtimer.json"].textures;

		/* Create the sprites */

		//	Make the game scene and add it to the EscenarioGral
		EscenarioGral = new PIXI.Container();

		// Size the renderer to fill the screen
		resize(); 
		// Listen for and adapt to changes to the screen size, e.g.,
		// user changing the window or rotating their device
		window.addEventListener("resize", resize);
		

		//	Create a new NoSleep object and then enable or disable it when needed.
		noSleep = new NoSleep();
		//	To enable wake lock:
		//	NOTE: This function call must be wrapped in a user input event handler e.g. a mouse or touch handler
		// Enable wake lock.
		// (must be wrapped in a user input event handler e.g. a mouse or touch handler)
		document.addEventListener('click', function enableNoSleep() {
			document.removeEventListener('click', enableNoSleep, false);
			noSleep.enable();
		}, false);

		//	Escenario menu inicial
		EscenaMenuInic = new PIXI.Container();
		EscenarioGral.addChild(EscenaMenuInic);

		//	Escenario menu juego
		//	EscenaDeJuego = new PIXI.Container();
		//	EscenarioGral.addChild(EscenaDeJuego);

		//	Create the EscenaFinJuego
		//	EscenaFinJuego = new PIXI.Container();
		//	EscenarioGral.addChild(EscenaFinJuego);

		//	Crear escenario de ayudas
		EscenaDeAyudas = new PIXI.Container();
		EscenarioGral.addChild(EscenaDeAyudas);

		//	Crear escenario de estadisticas
		EscenaAcercaDe = new PIXI.Container();
		EscenarioGral.addChild(EscenaAcercaDe);

		//	EscenaAjustes = new PIXI.Container();
		//	EscenarioGral.addChild(EscenaAjustes);

		//	Crear escenario seleccion dificultad
		//	EscenaDificultad = new PIXI.Container();
		//	EscenarioGral.addChild(EscenaDificultad);

		//	antes de dibujar verificamos carga de fonts
		//	let fontFaceSet = document.fonts;
		//	document.fonts.ready.then(function() {
		//		  // Any operation that needs to be done only after all the fonts
		//		  // have finished loading can go here.
		//	});


		initLanguage();					//	adaptación a diferentes idiomas

		//	prepara los botones de la aplicacion
		HaceBotones()

		//	Prepara las diferentes pantallas / escenas.
		PantallaInicio();		//	pantalla principal donde se muestra el temporizador
		PantallaAyuda();
		//	PantallaJugar();
		PantallaAcercaDe();
		//	PantallaAjustes();
		//	PantallaFinJuego();
		//	PantallaDificultad();

		//	Set the initial game state
		state = Menu;

		//	Una grilla para ubicarnos en el canvas
		if (DEBUG) {
			DibujaGrilla()
		}

		resize();		//	para refresca la pagina

		//Start the game loop
		gameLoop();
	}



	function gameLoop(){

		//Loop this function 60 times per second
		myReq = requestAnimationFrame(gameLoop);

		//Run the current state
		state();

		//Render the EscenarioGral
		renderer.render(EscenarioGral);

	}




	function resize() {

		// Determine which screen dimension is most constrained
		var ratio = Math.min(window.innerWidth/RENDERER_W,
					   window.innerHeight/RENDERER_H);

		// Scale the view appropriately to fill that dimension
		//	EscenarioGral.scale.x = EscenarioGral.scale.y = ratio;
		EscenarioGral.scale.x = EscenarioGral.scale.y = ratio;

		// Update the renderer dimensions
		renderer.resize(Math.ceil(RENDERER_W * ratio),
						Math.ceil(RENDERER_H * ratio));
	}





	function HaceBotones() {
		//	-------------------------------------------------------------	
		//	prepara botones y controles;
		//	-------------------------------------------------------------	
		//	ESTILO COMUN A TODOS LOS BOTONES-TEXTO
		const ctrlStyle = new PIXI.TextStyle({
			//	fillGradientStops: [ 0,100 ],
			fill: COLOR_BOTON,
			fontFamily: FONT_NIVEL2,		//	fontFamily: "Sigmar One",
			fontSize: 36,
			//	fontStyle: "italic",
			//	fontWeight: "normal",
			padding: 8,
		});

		//	-------------------------------------------------------------	
		//	//	Preparacion del boton jugar
		//	BotonJugar = new PIXI.Text( txtJugar, ctrlStyle);
		//	BotonJugar.anchor.set(0.5);
		//	BotonJugar.x = COLU_BOTONES;						// Set the initial position
		//	BotonJugar.y = FILA_BOTONES;
		//	// Opt-in to interactivity
		//	BotonJugar.interactive = true;				
		//	BotonJugar.buttonMode = true;			// Shows hand cursor
		//	// Pointers normalize touch and mouse
		//	BotonJugar.on('pointerdown', Jugar );
		//	BotonJugar.on('click', Jugar ); // mouse-only
		//	BotonJugar.on('tap', Jugar ); // touch-only

		//	-------------------------------------------------------------
		//	Preparacion del boton AcercaDe
		BotonAcercaDe = new PIXI.Text( txtAcerca, ctrlStyle);
		// Set the initial position
		BotonAcercaDe.anchor.set(0.5);
		BotonAcercaDe.x = 100;									//	RENDERER_W / 2;							// Set the initial position
		BotonAcercaDe.y = FILA_BOTONES;
		// Opt-in to interactivity
		BotonAcercaDe.interactive = true;
		BotonAcercaDe.buttonMode = true;				// Shows hand cursor
		// Pointers normalize touch and mouse
		BotonAcercaDe.on('pointerdown', AcercaDe );
		BotonAcercaDe.on('click',	AcercaDe ); // mouse-only
		BotonAcercaDe.on('tap',		AcercaDe ); // touch-only

		//	-------------------------------------------------------------
		//	Preparacion boton de ayudas
		BotonAyuda = new PIXI.Text( txtAyuda, ctrlStyle);
		BotonAyuda.anchor.set(0.5);
		BotonAyuda.x = RENDERER_W - 100;					// Set the initial position
		BotonAyuda.y = FILA_BOTONES;
		// Opt-in to interactivity
		BotonAyuda.interactive = true;
		BotonAyuda.buttonMode = true;				// Shows hand cursor
		// Pointers normalize touch and mouse
		BotonAyuda.on('pointerdown', Ayuda );
		BotonAyuda.on('click', Ayuda ); // mouse-only
		BotonAyuda.on('tap', Ayuda ); // touch-only
		
		//	txtConfig, BotonAjustes
		//	-------------------------------------------------------------
		//	Preparacion boton de configuracion
		//	BotonAjustes = new PIXI.Text( txtConfig, ctrlStyle);
		//	BotonAjustes.anchor.set(0.5);
		//	BotonAjustes.x = RENDERER_W / 2;					// Set the initial position
		//	BotonAjustes.y = FILA_BOTONES;
		//	// Opt-in to interactivity
		//	BotonAjustes.interactive = true;
		//	BotonAjustes.buttonMode = true;				// Shows hand cursor
		//	// Pointers normalize touch and mouse
		//	BotonAjustes.on('pointerdown', Ajustes );
		//	BotonAjustes.on('click', Ajustes ); // mouse-only
		//	BotonAjustes.on('tap', Ajustes ); // touch-only
		

		//	-------------------------------------------------------------
		//	Preparacion boton volver a inicio	
		BotonAtras = new PIXI.Text( txtVolver , ctrlStyle);
		BotonAtras.anchor.set(0.5);
		BotonAtras.x = RENDERER_W / 2;					// Set the initial position	
		BotonAtras.y = FILA_BOTONES;								// Set the initial position
		BotonAtras.interactive = true;					// Opt-in to interactivity
		BotonAtras.buttonMode = true;					// Shows hand cursor
		// Pointers normalize touch and mouse
		BotonAtras.on('pointerdown', Menu );
		BotonAtras.on('click', Menu );
		BotonAtras.on('tap', Menu );
		
		EscenarioGral.addChild(BotonAtras);
		BotonAtras.visible = false;

		
		/*
		//	-------------------------------------------------------------
		//	Preparacion otro botonMenu
		BotonMenu = new PIXI.Text( txtMenu, ctrlStyle);
		BotonMenu.anchor.set(0.5);
		BotonMenu.x = FILA_BOTONES;								// Set the initial position
		BotonMenu.y = 450;	
		BotonMenu.interactive = true;					// Opt-in to interactivity
		BotonMenu.buttonMode = true;					// Shows hand cursor
		// Pointers normalize touch and mouse
		BotonMenu.on('pointerdown', Menu );
		BotonMenu.on('click', Menu );
		BotonMenu.on('tap', Menu );
		*/


		//	----------------------------------------
		//	botones especificos de esta aplicacion
		//	----------------------------------------
		//	Preparacion control incrementa Minutos
		//	----------------------------------------
		//	draw polygon / triangulo // pixi polygon
		//	----------------------------------------
		//	triang incremental a clonar
		ctrlIncMin = new PIXI.Graphics();
		const path0 = [
			220, FILA_1_CTRL, 
			300, FILA_1_CTRL, 
			260, FILA_1_CTRL - 70];
		ctrlIncMin.beginFill(COLOR_BOTON, 1);
		ctrlIncMin.drawPolygon(path0);
		ctrlIncMin.endFill();
		ctrlIncMin.interactive = true;
		ctrlIncMin.buttonMode = true;
		//	ctrlIncMin.on('pointerdown', subeMinutos );				//	no actua en phone
		//	la combinacion que sigue: click y tap parece funcionar bien.
		ctrlIncMin.on('click'      , subeMinutos );		// mouse-only.	Funciona OK en PC. 
		ctrlIncMin.on('tap'        , subeMinutos );		// touch-only. Actua en phone, no actua en PC (mouse)
		EscenaMenuInic.addChild(ctrlIncMin);

		
		//	boton incrementar segundos
		ctrlIncSeg = ctrlIncMin.clone();
		ctrlIncSeg.position.set(480,0);
		ctrlIncSeg.interactive = true;
		ctrlIncSeg.buttonMode = true;
		//	ctrlIncSeg.on('pointerdown', subeSegundos );
		ctrlIncSeg.on('click'      , subeSegundos );
		ctrlIncSeg.on('tap'        , subeSegundos );
		EscenaMenuInic.addChild(ctrlIncSeg);


		//	triang decremental a clonar
		ctrlDecMin = new PIXI.Graphics();
		const path10 = [
			220, FILA_2_CTRL, 
			300, FILA_2_CTRL, 
			260, FILA_2_CTRL + 70];
		ctrlDecMin.beginFill(COLOR_BOTON, 1);
		ctrlDecMin.drawPolygon(path10);
		ctrlDecMin.endFill();
		ctrlDecMin.interactive = true;						// Opt-in to interactivity
		ctrlDecMin.buttonMode = true;							// Shows hand cursor
		//	ctrlDecMin.on('pointerdown', bajaMinutos );
		ctrlDecMin.on('click'      , bajaMinutos );
		ctrlDecMin.on('tap'        , bajaMinutos );
		EscenaMenuInic.addChild(ctrlDecMin);


		ctrlDecSeg = ctrlDecMin.clone();
		ctrlDecSeg.position.set(480,0);
		ctrlDecSeg.interactive = true;					// Opt-in to interactivity
		ctrlDecSeg.buttonMode = true;					// Shows hand cursor
		//	ctrlDecSeg.on('pointerdown',	bajaSegundos );
		ctrlDecSeg.on('click'      ,	bajaSegundos );
		ctrlDecSeg.on('tap'        ,	bajaSegundos );
		EscenaMenuInic.addChild(ctrlDecSeg);



		//	----------------------------------------
		//	boton iniciar timer
		ctrlIniciar = new PIXI.Graphics();
		const path20 = [
			465, FILA_1_CTRL-70,
			465, FILA_1_CTRL+10, 
			535, FILA_1_CTRL-30];
		ctrlIniciar.beginFill(COLOR_BOTON, 1);
		ctrlIniciar.drawPolygon(path20);
		ctrlIniciar.endFill();
		ctrlIniciar.interactive = true;					// Opt-in to interactivity
		ctrlIniciar.buttonMode = true;					// Shows hand cursor
		ctrlIniciar.on('pointerdown',		startButton	);
		ctrlIniciar.on('click'      ,	startButton	 );
		ctrlIniciar.on('tap'        , startButton	 );
		EscenaMenuInic.addChild(ctrlIniciar);


		//	----------------------------------------
		//	boton detención
		ctrlDetener = new PIXI.Graphics();
		ctrlDetener.beginFill(FONDO_JUEGO, 1);
		ctrlDetener.drawRect(470, FILA_2_CTRL, 50, 80);
		//	ctrlDetener.endFill();

		ctrlDetener.beginFill(COLOR_BOTON, 1);
		ctrlDetener.drawRect(470, FILA_2_CTRL, 20, 80);
		ctrlDetener.drawRect(500, FILA_2_CTRL, 20, 80);
		ctrlDetener.endFill();
		ctrlDetener.interactive = true;					// Opt-in to interactivity
		ctrlDetener.buttonMode = true;					// Shows hand cursor
		ctrlDetener.on('pointerdown',		detiene	);
		ctrlDetener.on('click'      ,	detiene	 );
		ctrlDetener.on('tap'        , detiene	 );
		EscenaMenuInic.addChild(ctrlDetener);

	

		//	------------------------------------------
		//	botones para seleccionar idioma
		//	aleman
		var flagAleman = idTexturas["aleman.png"];
		OpcAleman = new PIXI.Sprite(flagAleman);
		OpcAleman.x = RENDERER_W - 100;
		OpcAleman.y = 20;
		// make it a bit bigger, so it's easier to grab
		//	OpcAleman.scale.set(1.34);
		OpcAleman.scale.set(FLAG_ESC);
		OpcAleman.interactive = true;					// Opt-in to interactivity
		OpcAleman.buttonMode = true;					// Shows hand cursor
		OpcAleman.on('pointerdown', IdiomaAleman	);
		OpcAleman.on('click'      , IdiomaAleman	 );
		OpcAleman.on('tap'        , IdiomaAleman );
		EscenaMenuInic.addChild(OpcAleman);

		//	espanol
		var flagEspanol = idTexturas["espanol.png"];
		OpcEspanol = new PIXI.Sprite(flagEspanol);
		OpcEspanol.x = RENDERER_W - 300;
		OpcEspanol.y = 20;
		OpcEspanol.scale.set(FLAG_ESC);
		OpcEspanol.interactive = true;					// Opt-in to interactivity
		OpcEspanol.buttonMode = true;					// Shows hand cursor
		OpcEspanol.on('pointerdown',	IdiomaEspanol	);
		OpcEspanol.on('click'      ,	IdiomaEspanol	 );
		OpcEspanol.on('tap'        ,	IdiomaEspanol );
		EscenaMenuInic.addChild(OpcEspanol);

		//	ingles
		var flagIngles = idTexturas["ingles.png"];
		OpcIngles = new PIXI.Sprite(flagIngles);
		OpcIngles.x = RENDERER_W - 200;
		OpcIngles.y = 20;
		OpcIngles.scale.set(FLAG_ESC);
		OpcIngles.interactive = true;					// Opt-in to interactivity
		OpcIngles.buttonMode = true;					// Shows hand cursor
		OpcIngles.on('pointerdown',	 IdiomaIngles	);
		OpcIngles.on('click'      , IdiomaIngles	 );
		OpcIngles.on('tap'        , IdiomaIngles );
		EscenaMenuInic.addChild(OpcIngles);

	}




	//	-----------------------------------------------------------
	function PantallaInicio() {
		EscenaMenuInic.visible = true;

		// create a new Sprite/image from an image path
		//	const mlogo = PIXI.Sprite.from('logomensa.png');	

		var textura = idTexturas["logomensa.png"];
		const mlogo = new PIXI.Sprite(textura);
		mlogo.anchor.set(0.5);			// sprite's anchor point
		mlogo.scale.set(0.5);
		mlogo.x = 60;
		mlogo.y = 60;
		EscenaMenuInic.addChild(mlogo);


		const style = new PIXI.TextStyle({
			fill: 0x992222,						//	"#040",					    //	
			fontFamily: FONT_NIVEL1,			//	fontFamily: 'Titan One',
			fontSize: 80,
			fontWeight: "bold",
			padding: 8,
			dropShadow: true,
			dropShadowColor: '#111111',
			dropShadowBlur: 4,
			dropShadowAngle: Math.PI / 6,
			dropShadowDistance: 6,
		});

		//	titulo del menu y juego
		var	txtTitulo = new PIXI.Text( APLICACION, style );
		txtTitulo.x = 420;		//	RENDERER_W / 2;
		txtTitulo.y = 50;			//	(RENDERER_H / 2);
		txtTitulo.anchor.set(0.5);
		//	txtTitulo.rotation = -0.2;

		EscenaMenuInic.addChild(txtTitulo);



		const buttonStyle = new PIXI.TextStyle({
			fill: 0x9900cc,						//	"#040",					    //	
			fontFamily: FONT_NIVEL1,			//	fontFamily: 'Titan One',
			fontSize: 96,
			fontWeight: "bold",
			padding: 8,
			dropShadow: true,
			dropShadowColor: '#111111',
			dropShadowBlur: 4,
			dropShadowAngle: Math.PI / 6,
			dropShadowDistance: 6,
		});


		//	BotonAcercaDe
		//	EscenaMenuInic.addChild(BotonAcercaDe);
		//	BotonAcercaDe.visible = true;


		//	digitos del timer en pantalla de inicio (principal)
		const digitStyle = new PIXI.TextStyle({
			fill: 0x99bbcc,						//	"#040",					    //	
			fontFamily: FONT_NIVEL1,			//	fontFamily: 'Titan One',
			fontSize: 320,
			fontWeight: "bold",
			padding: 8,
			dropShadow: false
		});


		//	minutos
		txtMinu = new PIXI.Text( cMin, digitStyle );
		txtMinu.x = 260;
		txtMinu.y = FILA_DIGITOS;
		txtMinu.anchor.set(0.5);
		EscenaMenuInic.addChild(txtMinu);

		//	separador
		var	txtSepa = new PIXI.Text( ':', digitStyle );
		txtSepa.x = 500;
		txtSepa.y = FILA_DIGITOS;
		txtSepa.anchor.set(0.5);
		EscenaMenuInic.addChild(txtSepa);

		//	segundos
		txtSegu = new PIXI.Text( cSeg, digitStyle );
		txtSegu.x = 740;
		txtSegu.y = FILA_DIGITOS;
		txtSegu.anchor.set(0.5);
		EscenaMenuInic.addChild(txtSegu);

		ctrlDetener.visible = false;




	}


	function fondoPantalla() {
		var graphics = new PIXI.Graphics();
		// draw a rounded rectangle
		//	graphics.lineStyle(4, 0x332211, 0.95)
		graphics.beginFill( FONDO_AYUDA, 0.95);
		graphics.drawRoundedRect(90, 80, RENDERER_W-180, RENDERER_H-200 );
		graphics.endFill();

		return graphics
	}



	//	---------------------------------------------------
	function PantallaAyuda() {

		//	var graphics = new PIXI.Graphics();
		//	// draw a rounded rectangle
		//	//	graphics.lineStyle(4, 0x332211, 0.95)
		//	graphics.beginFill( FONDO_AYUDA, 0.95);
		//	graphics.drawRoundedRect(90, 80, RENDERER_W-180, RENDERER_H-200 );
		//	graphics.endFill();
		var fondo = fondoPantalla();
		EscenaDeAyudas.addChild(fondo);

		const style = new PIXI.TextStyle({
			fill: "#ddffff",
			fontFamily: FONT_NIVEL3,		//	fontFamily: "Sriracha",
			fontSize: 24,
			//	fontStyle: "normal",
			//	fontWeight: "200"
		});
		const richText = new PIXI.Text( txtDescAyuda, style );

		richText.x = 150;
		richText.y = 120;

		EscenaDeAyudas.addChild(richText);
		EscenaDeAyudas.visible = true;

		//	Botones que se deben visualizar en pantalla de ayuda
		//	unicamente el de volver, entonces, remueve borones del padre y muestra el de ayuda

		//	BotonAcercaDe.visible = false;

	}



	function Menu() {
		//	EscenaAjustes.visible = false;
		//	EscenaDeJuego.visible = false;
		//	EscenaDificultad.visible = false;	//	seleccion nivel dificultad
		//	EscenaFinJuego.visible = false;		//	container aviso de fin del juego
		//	definir cuales son las escenas visibles y cuales invisibles
		EscenaAcercaDe.visible = false;		//	container estadisticas
		EscenaDeAyudas.visible = false;		//	container ayudas
		EscenaMenuInic.visible = true;		//	container pantalla de inicio
		EscenarioGral.visible = true;		//	container del juego

		//	BotonAyuda
		EscenaMenuInic.addChild(BotonAyuda);
		//	BotonAyuda.visible = true;
		//	BotonAyuda.alpha=1;

		//	BotonMenu.visible = true;

		//	BotonAcercaDe
		EscenaMenuInic.addChild(BotonAcercaDe);
		//	BotonAcercaDe.visible =true;

		BotonAtras.visible = false;

		//	BotonJugar
		//	EscenaMenuInic.addChild(BotonJugar);
		//	BotonJugar.visible =true;
		//	BotonJugar.alpha=1;

		//	BotonAjustes
		//	EscenaMenuInic.addChild(BotonAjustes);
		//	BotonAjustes.visible = true;
		//	BotonAjustes.alpha=1;


		state = Menu;

	}




	function AcercaDe() {
	//	definir cuales son las escenas visibles y cuales invisibles
		EscenaAcercaDe.visible = true;
		EscenaDeAyudas.visible = false;
		EscenaMenuInic.visible = false;
	//		EscenarioGral.visible = true;
	//	EscenaAjustes.visible = false;
	//	EscenaDeJuego.visible = false;
	//	EscenaDificultad.visible = false;	//	seleccion nivel dificultad
	//	EscenaFinJuego.visible = false;

		BotonAtras.visible = true;

		//	console.log( BotonAtras.visible );

		state = AcercaDe;

	}




	function Ayuda() {
	//	definir cuales son las escenas visibles y cuales invisibles

		EscenaAcercaDe.visible = false;
		EscenaDeAyudas.visible = true;
		EscenaMenuInic.visible = false;
	//		EscenarioGral.visible = true;
	//	EscenaAjustes.visible = false;
	//	EscenaDeJuego.visible = false;
	//	EscenaDificultad.visible = false;	//	seleccion nivel dificultad
	//	EscenaFinJuego.visible = false;

		//	EscenaDeAyudas.addChild(BotonAtras);
		BotonAtras.visible = true;

		state = Ayuda;

	}




	function Ajustes() {
	//	definir cuales son las escenas visibles y cuales invisibles
		EscenaDeAyudas.visible = false;
		//	EscenaDeJuego.visible = false;
		EscenaAcercaDe.visible = false;
		//	EscenaFinJuego.visible = false;
		EscenaMenuInic.visible = false;
		//	EscenaAjustes.visible = true;
		//	EscenarioGral.visible = true;

		/*
		<select id="idioma" name="idioma" class="input-lg dropbtn" onchange="languageButton(this.value);">
			<!-- <select id="idioma" name="idioma" class="dropdown-content" onchange="languageButton(this.value);"> -->
			<option value="es">Espa&#241ol</option>
			<option value="en">English </option>
			<option value="de">Deutsch </option>
		</select>
		*/

		//	EscenaAjustes.addChild(BotonAtras);
		//	BotonAtras.visible = true;

		//	SelectLanguage();

		state = Ajustes;

	}



	////////////////////////////////////////////////////////////////////////////////////////
	//	solamente para depurar
	function DibujaGrilla() {

		const style = new PIXI.TextStyle({
			fontFamily: FONT_NIVEL3,		//	fontFamily: "Sriracha",
			fontSize: 12,
			fill: "white",
			//	fontStyle: "normal",
			//	fontWeight: "400"
		});

		const delta = 60;
		var	posX=60, posY=60;
		var line = new PIXI.Graphics();

		line.lineStyle(1, "#bbbbbbb", 0.5 )

		//	lineas horizontales
		//	while (posY<=RENDERER_H)
		while (posY<= RENDERER_H )
		{
			line.moveTo(0, posY);
			line.lineTo(RENDERER_W+200, posY);
			//	line.x = 0;
			//	line.y = ( 50 * i ) + 25 ;
			EscenarioGral.addChild(line);

			var numText = new PIXI.Text(posY, style );
			numText.x = 25;
			numText.y = posY;
			EscenarioGral.addChild(numText);

			posY = posY+delta;
		}

		//	lineas verticales
		while (posX<= RENDERER_W )
		{
			line.moveTo(posX, 0);
			line.lineTo(posX, RENDERER_H+200);
			//	line.x = ( 50 * i ) + 25;
			//	line.y = 0;
			EscenarioGral.addChild(line);

			var numText = new PIXI.Text(posX, style );
			//	numText.text = posX;
			numText.x = posX;
			numText.y = 50;
			EscenarioGral.addChild(numText);

			posX = posX+delta;
		}

	}




	//	-------------------------------------------------------
	//	Funciones comunes a todas las aplicaciones con codigo especifico para la app
	//	el codigo anterior no debiera modificarse salvo definiciones
	//	-------------------------------------------------------

	function PantallaAcercaDe() {

		var fondo = fondoPantalla();
		EscenaAcercaDe.addChild(fondo);

		const style = new PIXI.TextStyle({
			fill: "white",
			fontStyle: "normal",
			fontFamily: FONT_NIVEL3,		//	fontFamily: "Sriracha",
			fontSize: 24,
			fontStyle: "normal",
			fontWeight: "400"
		});
		const richText = new PIXI.Text( txtDescAcerca, style);
		richText.x = 180;
		richText.y = 180;
		EscenaAcercaDe.addChild(richText);
		EscenaAcercaDe.visible = true;

	}





	//=======================================
	// BEGIN for set|get|clear localstorage
	//=======================================
	function setStorage(key, value) {
		if(typeof(window.localStorage) != 'undefined'){ 
			window.localStorage.setItem(key,value); 
		} 
	}

	function getStorage(key) {
		var value = null;
		if(typeof(window.localStorage) != 'undefined'){ 
			value = window.localStorage.getItem(key); 
		} 
		return value;
	}

	function clearStorage(key) {
		if(typeof(window.localStorage) != 'undefined'){ 
			window.localStorage.removeItem(key); 
		} 
	}


	//	function SelectElement(id, valueToSelect) {
	//		console.log("id, valueToSelect: " +  =  + ", " + valueToSelect );
	//		var element = document.getElementById(id);
	//		element.value = valueToSelect;
	//	}




	//-------------------------------------------------------------------
	// adaptacion idiomas
	//-------------------------------------------------------------------
	function initLanguage() //	para adaptar a diferentes idiomas
	{
		//	console.log("sysLang: " + sysLang + ", " + typeof(sysLang));

		sysLang = getStorage("elIdioma")

		//	if(typeof(sysLang) == 'undefined'){
		if (sysLang == null) {
			sysLang = "en";
		}
		

		//	SelectElement("elIdioma", sysLang);
		if (DEBUG)	{	console.log("sysLang: " + sysLang);		
			//	sysLang = "en";
		}

		if (sysLang == "es" || sysLang == "es") { //	español

			txtAcerca = "Acerca de";
			txtAyuda	= "Ayuda";
			txtConfig = "Ajustes";
			//	txtDificu = "Dificultad";
			txtFin = "Bien resuelto!\nFelicitaciones! ";
			txtIdioma = "Idioma";
			txtEspanol = "Espanol";
			txtIngles = "Ingles";
			txtAleman = "Aleman";
			txtJugar = "Jugar";
			txtNoSol = " Sin solución ";
			txtOtro = "OTRO";
			txtTiempo = "Tiempo: ";
			txtVolver = "Volver";
			txtDescAcerca =		//	español
				'Acerca de MENSA Timer version ' + VERSION + '\n' +
				'Es un timer \n' +
				'desarrollado por \n' +
				'Willie Verger Juegos de Ingenio\n\n' +
				'Soporte: info@ingverger.com.ar\n' +
				'Web: ingverger.com.ar\n' +
				'\n';
			txtDescAyuda =	//	español
				'M-Timer permite controlar un tiempo, que se establece \n' +
				'previamente, y avisa cuando se ha cumplido.\n' +
				'El tiempo fijado por defecto se modifica con las flechas que \n' +
				'apuntan hacia arriba para incrementar y hacia abajo para  \n' +
				'decrementar.  Una vez establecido el tiempo disponible se esta \n' +
				'en condiciones de iniciar la cuenta regresiva.  Esto se hace  \n' +
				'picando en el boton inicio. \n' +
				'En pantalla se presenta el tiempo restante.  Cuando se ha  \n' +
				'completado el tiempo comienza un sonido audible para \n' +
				'alertar sobre esta situación. \n' +
				'Se puede interrumpir el conteo de tiempo en cualquier \n' +
				'instante pulsando el boton detener y reanudar luego.  \n'

		}	else if (sysLang == "en" || sysLang == "en") { //	ingles

			txtAcerca = "About",
			txtAyuda = "Help";
			txtConfig = "Settings";
			//	txtDificu = "Difficulty",
			txtFin = "Congratulation",
			txtIdioma = "Language";
			txtEspanol = "Spanish";
			txtIngles = "English";
			txtAleman = "German";
			txtJugar = "Play",
			txtVolver = "Back",
			txtDescAcerca =		//	ingles
				'About M-Timer version ' + VERSION + ' \n' +
				"It's a countdown timer developed by   \n" +
				'Willie Verger Clever Games  \n \n' +
				'Support: info@ingverger.com.ar \n' +
				'Web: ingverger.com.ar',
			txtDescAyuda =
				APLICACION + ' allows you to specify the time to be controlled by \n' +
				'buttons to increase and decrease minutes and seconds. \n' +
				'Once the time is established, you are in a position to \n' +
				'Start the countdown by pressing the start button. \n' +
				'The timer can be stopped at any time with the button \n' +
				'and resume later. \n' + 
				'\n' +
				'At the end of the set time there will be a warning sound. \n' ;

		} else if (sysLang == "de" || sysLang == "de") { //	aleman

			txtAcerca = "Über",
			txtAyuda = "Hilfe";
			txtConfig = "Einstellung";
			//	txtDificu = "Schwierigkeit";
			txtFin = "Gut gelöst!\nGlückwunsch! ",
			txtIdioma = "Sprache";
			txtEspanol = "Spanisch";
			txtIngles = "Englisch";
			txtAleman = "Deutsch";
			txtJugar = "Spielen",
			txtTiempo = "Verstrichene Zeit: ";
			txtVolver = "Umkehren",
			txtDescAcerca =
				APLICACION + ' Version ' + VERSION  + '\n' +
				'Es ist ein app von Willie Verger Clever Games \n \n' +
				'Unterstützung: info@ingverger.com.ar\n' +
				'Web: ingverger.com.ar\n' +
				'\n',
			txtDescAyuda =
				'Mit ' + APLICACION + ' können Sie die Zeit kontrollieren.\n' +
				'Mit den Tasten zum Erhöhen und Verringern der Minuten und \n' +
				'Sekunden können Sie die Zeit einstellen.\n' +
				'Nach dem Einstellen der Uhrzeit können Sie den Countdown durch \n' +
				'Drücken der Starttaste starten.\n' +
				'Der Timer kann jederzeit mit der Taste gestoppt werden.\n' +
				'und später fortfahren.\n' +
				'Nach Ablauf der eingestellten Zeit ertönt ein Warnton.\n' 

		}
	}




	//	=========================================
	//	Codigo especifico para este juego
	//	=========================================
	//	function GenJuego(){			//	genera un nuevo juego
	//	}



//	=====================================================================
//	lo que sigue son particularidades para la pantalla de esta aplicacion


function subeMinutos() {
	ajustaMinu(1);
}

function bajaMinutos() {
	ajustaMinu(-1)
}

function ajustaMinu( nDir ) {
	//	ajustar valores iniciales del timer
	//	nDir indica si sumamos o restamos minutos
	
	var nMin = undefined;
	nMin = parseInt( cMin ) + nDir;
	nMin = ((nMin < 0) ? 0 : ((nMin > 60) ? 60 : nMin ) );	
	cMin = ("00" + nMin).slice(-2);

	// Output the result
	txtMinu.text = cMin;

	//	if (DEBUG)	{	console.log ("nMin, cMin: " + nMin + ", " + cMin);	}

}



function subeSegundos() {
	ajustaSegu(1);
}

function bajaSegundos() {
	ajustaSegu(-1)
}

function ajustaSegu( nDir ) {
	//	ajustar valores iniciales del timer
	var nSeg = undefined;
	nSeg = parseInt( cSeg ) + nDir;
	nSeg = ((nSeg < 0) ? 0 : ((nSeg > 60) ? 60 : nSeg ) );
	cSeg = ("00" + nSeg).slice(-2);

	// Output the result
	txtSegu.text = cSeg;

}



//	---------------------------------
function startButton() {
	nDist = cMin * 60000 + cSeg * 1000;
	console.log( "nDist: " + nDist );

	if (nDist > 0) {

		detener = false;

		stopTime = new Date().getTime() + nDist + 10;		//	devuelve la hora de finalizacion
			//	agrego 2 milisegundos para compensar tiempo de calculo previo
			//	caso contrario no muestra el primer momento correctamente

		if (DEBUG) { console.log("Tiempo inicial, stopTime: " + cMin + ":" + cSeg + ", " + stopTime);	}

		ocultaBotones();
		//	ctrlDetener.visible = true;
		iniciaReloj();

	} else {
		if (DEBUG){	console.log("nDist es <= 0");}
		nDist = 0;
		cMin = "00";
		cSeg = "00";
		detener = true;

	}

	if (DEBUG){	console.log("despues de iniciaReloj()");}
	//	muestraBotones();

}




//	boton para iniciar timer
function iniciaReloj() {

	ctrlDetener.visible = true;


	//	setInterval() Ejecuta una función o un fragmento de código de forma repetitiva cada vez
	//	que termina el periodo de tiempo determinado. Devuelve un ID de proceso.
	//	en este caso actualiza la cuenta regresiva cada segundo
	var x = setInterval(function() {

		// Get todays date and time
		var now = new Date().getTime();

		//	console.log( "stopTime, now, cDist antes: " + stopTime +", " + now +", " + cDist )

		// Find the distance between now and the count down date
		nDist = stopTime - now;
		//	console.log( "nDist, stopTime, now: " + nDist +", "+ stopTime +", "+ now );

		actualizaReloj();


		// If the count down is over, write some text
		if (nDist < 10 ) {
			clearInterval(x);
			//	aqui poner aviso: una alarma de sonido, parpadeo y/o similar

			// creamos el objeto audio
			//	var audioElement = document.createElement('audio');
			// indicamos el archivo de audio a cargar
			audioElement.setAttribute('src', 'psicosis.ogg');
			//	Si deseamos que una vez cargado empieze a sonar...
			//	audioElement.setAttribute('autoplay', 'autoplay');
			//	iniciamos el audio
			sonarAviso() 
			//	audioElement.play();
			

			//	document.getElementById("alert").play();
			//	detener = true;


		} else if (detener) {
			//	sin alarma porque fue detencion solicitada
			clearInterval(x);

			detiene();

			//	audioElement.pause();
			//	audioElement.currentTime = 0;

		}

	}, 1000);		//	fin de la funcion pasada a setInterval

	//	liberar la pantalla de quedar encendida
	// Disable wake lock at some point in the future.
	// (does not need to be wrapped in any user input event handler)
	noSleep.disable();
	 
}



function actualizaReloj() {
		// Time calculations for minutes and seconds
		cMin = ("00" + Math.floor((nDist % (3600000)) / 60000 )).slice(-2);
		cSeg = ("00" + Math.floor((nDist % 60000 ) / 1000)).slice(-2);

		// Output the result
		txtMinu.text = cMin;
		txtSegu.text = cSeg;

}



//--------------------
// hidden all button
//--------------------
function ocultaBotones() {
	//	oculta botones innecesarios mientras funciona el timer
	ctrlIncMin.visible = false;
	ctrlDecMin.visible = false;
	ctrlIniciar.visible = false;
	ctrlIncSeg.visible = false;
	ctrlDecSeg.visible = false;
	ctrlDetener.visible = false;

	OpcAleman.visible = false;
	OpcEspanol.visible = false;
	OpcIngles.visible = false;

	BotonAcercaDe.visible = false;
	BotonAyuda.visible = false;
}



//--------------------
// muestra todos los botones
//--------------------
function muestraBotones() {
	//	muestra botones
	ctrlIncMin.visible = true;
	ctrlDecMin.visible = true;
	ctrlIniciar.visible = true;
	ctrlIncSeg.visible = true;
	ctrlDecSeg.visible = true;
	ctrlDetener.visible = true;

	OpcAleman.visible = true;
	OpcEspanol.visible = true;
	OpcIngles.visible = true;

	BotonAyuda.visible = true;
	BotonAcercaDe.visible = true;
}



function sonarAviso() {
	audioElement.play();

	//	var	tpoAviso = TIEMPO_AVISO;
	
	var now = new Date().getTime();			// actual date and time

	//	console.log( "stopTime, now, cDist antes: " + stopTime +", " + now +", " + cDist )
	// Find the distance between now and the count down time
	stopTime = now + TIEMPO_AVISO;
	//	console.log( "nDist, stopTime, now: " + nDist +", "+ stopTime +", "+ now );


	var y = setInterval(function(){ 
		//	var transcurrido = audioElement.currentTime;
		//	console.log("audioElement.currentTime: " + audioElement.currentTime )
		
		var now = new Date().getTime();

		//	nDist = stopTime - now;


		// If the count down is over, write some text
		if (now > stopTime ) {

			detiene();
			clearInterval(y);

		}
	}, 1000);
	
}
//	fin de sonarAviso ---------------------------




function detiene() {
	detener=true;
	muestraBotones();
	ctrlDetener.visible= false;

	if (DEBUG)	{ console.log("audioElement.currentTime (detenido): " + audioElement.currentTime )	}

	audioElement.pause();
	audioElement.currentTime = 0;
	//	audioElement.muted = true;

}




	//	function ElegirIdioma() {
	//		//	muestra y permite seleccionar un idioma
	//		BotonOpc1.visible = true;		//	opcion 1
	//		BotonOpc2.visible = true;		//	opcion 2
	//		BotonOpc3.visible = true;		//	opcion 3
	//	}

	function IdiomaEspanol() {
		sysLang = 'es';
		setStorage('elIdioma', 'es');
		//	initLanguage();
		setup();
	}

	function IdiomaIngles() {
		sysLang = 'en';
		setStorage('elIdioma', 'en');
		setup();
	}

	function IdiomaAleman() {
		sysLang = 'de';
		setStorage('elIdioma', 'de');
		setup();
	}


