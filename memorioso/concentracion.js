	/*
		concentracion.js
		9/1/2020
		23/1/2019

	*/

	//	-------------------------
	//	equivalencias - Aliases
	//	-------------------------
	let Container = PIXI.Container,
		autoDetectRenderer = PIXI.autoDetectRenderer,
		Graphics = PIXI.Graphics,
		Sprite = PIXI.Sprite,
		AnimatedSprite = PIXI.extras.AnimatedSprite,
		TilingSprite = PIXI.extras.TilingSprite,
		loader = PIXI.loader,
		resources = PIXI.loader.resources;

	//	let	Text = PIXI.Text,

	//	-------------------------
	//	Constantes
	//	-------------------------
		let	FILA_BOTONES = 50,
		LINEA_BOTONES = 470,
		//	RENDERER_W = 1200,			//	850,			//	1000,
		//	RENDERER_H = 700,			//	450,			//	600,
		RENDERER_W = 1000,				//	1000,
		RENDERER_H = 600,
		FONDO_JUEGO = 0xecffb3,		//	 "#ffc",
		VERSION	= "2.2.2",				//	21/12/2019
		FONDO_AYUDA = 0x008cff,
		FONT_NIVEL1 = "luckiest_guyregular"	//	titulo:	"Bangers",	"Titan One", "Sigmar One"
		FONT_NIVEL2 = "luckiest_guyregular"	//	"bangersregular",	botones: "Bangers",	//	"Sigmar One",
		FONT_NIVEL3 = "sriracharegular",
		COLOR_BOTON = 0x0033cc,				//	COLOR_BOTON = 0x006600,
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
	let renderer = autoDetectRenderer( RENDERER_W, RENDERER_H, rendererOptions );
	//	let renderer = autoDetectRenderer( rendererOptions );

	// Put the renderer on screen in the corner
	renderer.view.style.position = "absolute";
	renderer.view.style.top = "0px";
	renderer.view.style.left = "0px";

	document.body.appendChild(renderer.view);

	//Scale the canvas to the maximum window size
	//	let scale = scaleToWindow(renderer.view);

	//Set the initial game state
	let state = Menu;
	let myReq = undefined;


	//	-------------------------
	//	variables globales varias. might be used in more than one function
	//	-------------------------
	let	BotonAtras = undefined,
		BotonAyuda = undefined,
		BotonJugar = undefined,
		BotonAcercaDe = undefined,
		BotonMenu = undefined,
		//	BotonDificultad = undefined,
		BotonDificilMas = undefined,
		BotonDificilMenos = undefined,
		Crono = undefined,
		start = undefined,
		elapsed = undefined,
		EscenaDeAyudas = undefined,			//	container ayudas
		EscenaDeJuego = undefined,			//	container juego
		EscenaAcercaDe = undefined,			//	container de estadisticas
		EscenaFinJuego = undefined,			//	container aviso de fin del juego
		EscenaMenuInic = undefined,			//	container pantalla de inicio
		//	EscenaDificultad = undefined,		//	container seleccion nivel de dificultad
		EscenarioGral = undefined			//	container del total (1er nivel)


	//	variables especificas de esta aplicacion
	let nCol = undefined,					//	cantidad de columnas de baldositas en tablero
		nFil = undefined,					//	cantidad de filas de baldositas en tablero
		nivJuego = 1,						//	nivel de juego; debe ser un valor entre 1 y 12.
		txtNivDif = undefined,
		tilesOnBoard = undefined, 
		chosenTiles = undefined;			//	array con los numeros de las piezas


	//	variasbles para manejar texto en diferentes idiomas
	let	
		txtAcerca = "Acerca de",
		txtAyuda	= "Ayuda",
		txtJugar = "Jugar",
		txtMenu = "Menu",
		txtVolver = "Volver",
		txtDificu = "Dificultad",
		txtDescAcerca =
			'Acerca de MEMORIOSO version ' + VERSION + '\n' +
			'Es un juego para ejercitar concentracion \n' +
			'y memoria desarrollado por \n' +
			'Willie Verger Juegos de Ingenio\n\n' +
			'Soporte: info@ingverger.com.ar\n' +
			'Web: ingverger.com.ar\n' +
			'\n',
		txtDescAyuda = 'Que es?\n' +
			'MEMORIOSO es un juego de concentracion y memoria.\n' + 
			'En que consiste?\n' + 
			'Hay un conjunto de fichas o cartas, cada una con una imagen, \n' + 
			'colocadas de forma tal que no se ve su anverso.\n' + 
			'Hay dos fichas de cada imagen. El juego consiste en encontrar\n' +
			'las parejas de imagenes iguales.\n' + 
			'Al pulsar sobre una imagen, esta se da vuelta.\n' + 
			'Se eligen dos fichas consecutivas. Si resultan ser iguales se\n' +
			'retiran del tablero. Si son diferentes vuelven a la posicion\n' +
			'original.\n' + 
			'El juego finaliza cuando se han encontrado todas las parejas.',
			txtFin = "Bien resuelto!\nFelicitaciones! ",
			txtTiempo = "Tiempo: ";

	const	estiloTxtBoton = new PIXI.TextStyle({	//	estilo comun a los botones con texto
			fontFamily: FONT_NIVEL2,		//	fontFamily: "Sigmar One",
			fontStyle: 'italic',
			fontWeight: 'bold',
			fill: ['#ffffff', '#008800'], // gradient
			fontSize: 24,
			padding: 4,
			stroke: '#4a1850',
			strokeThickness: 5,
			dropShadow: true,
			dropShadowColor: '#000000',
			dropShadowBlur: 4,
			dropShadowAngle: Math.PI / 6,
			dropShadowDistance: 6
		});



	const	aNivDif = [
			{ niv:0, nCol:4, nFil:2 },			//	8
			{ niv:1, nCol:4, nFil:3 },			//	12
			{ niv:2, nCol:4, nFil:4 },			//	16
			{ niv:3, nCol:5, nFil:4 },			//	20
			{ niv:4, nCol:8, nFil:3 },			//	24
			{ niv:5, nCol:7, nFil:4 },			//	28
			{ niv:6, nCol:6, nFil:5 },			//	30
			{ niv:7, nCol:8, nFil:4 },			//	32
			{ niv:8, nCol:6, nFil:6 },			//	36
			{ niv:9, nCol:8, nFil:5 },			//	40
			{ niv:10, nCol:8, nFil:6 },			//	48
			{ niv:11, nCol:9, nFil:6 }			//	54
		]


	//	======================================================================
	//	Seccion experimental para cargar fonts con webfontloader
	//	var fonts_ready = false;
	//	var assets_ready = false;


	/*
	setTimeout(function()
	{
		init();
	}, 10);
	*/

	//load resources; a JSON file and run the `setup` function when it's done 
	PIXI.loader
		.add("memorioso2.json")		//	PIXI.loader.add("assets/spritesheet.json").load(setup);
		.load(setup);



	//	======================================================================
	function setup() {

		console.log("Memorioso version: " + VERSION );
		if (DEBUG) {console.log("window.innerWidth,innerHeigh: " + window.innerWidth + ", " + window.innerHeight );}

		//Get a reference to the texture atlas id's
		//	Create an alias for the texture atlas frame ids
		id = resources["memorioso2.json"].textures;

		/* Create the sprites */

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
		EscenaAcercaDe = new PIXI.Container();
		EscenarioGral.addChild(EscenaAcercaDe);

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
		PantallaInicio();
		PantallaAyuda();
		PantallaJugar();
		PantallaAcercaDe();
		PantallaFinJuego();
		//	PantallaDificultad();

		//	Set the initial game state
		//	state = play;
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



	function PantallaInicio() {
		EscenaMenuInic.visible = true;

		const style = new PIXI.TextStyle({
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

		//	titulo del menu y juego
		var	txtTitulo = new PIXI.Text( "MEMORIOSO", style );

		//	txtTitulo.x = 600;
		txtTitulo.x = 200+ ( RENDERER_W - 200 ) / 2;
		//	txtTitulo.x = window.innerWidth / 2 ;
		txtTitulo.y = 250;			//	(RENDERER_H / 2);
		txtTitulo.anchor.set(0.5);
		//	txtTitulo.rotation = -0.2;

		EscenaMenuInic.addChild(txtTitulo);

		var count = 0;
		PIXI.ticker.shared.add(function() {
			count += 0.03;
			txtTitulo.rotation = ( -0.0 + Math.cos(count) * 0.2);
			//	txtTitulo.y = ( 200 + Math.cos(count) * 100.2);
		});


		//	BotonAcercaDe
		EscenaMenuInic.addChild(BotonAcercaDe);
		BotonAcercaDe.visible = true;

		//	aqui habria que agregar el boton para eventual cambio de nivel
		//	EscenaMenuInic.addChild(BotonDificultad);

		//	selector dificultad con lista desplazable
		SelectorDifi = haceSelectorDifi();
		//	EscenaMenuInic.addChild( SelectorDifi);


	}



	function HaceBotones() {
		//	prepara los botones; que en realidad son textos botonizados

		//	es realmeente necesaria la variable que sigue???
		var BotonTexture;

		//	-------------------------------------------------------------	
		//	ESTILO COMUN A TODOS LOS BOTONES-TEXTO
		const style = new PIXI.TextStyle({
			//	fillGradientStops: [ 0,100 ],
			fill: COLOR_BOTON,
			fontFamily: FONT_NIVEL2,		//	fontFamily: "Sigmar One",
			fontSize: 40,
			//	fontStyle: "italic",
			fontWeight: "bold",
			padding: 8,
		});

		//	-------------------------------------------------------------	
		//	Preparacion del boton jugar
		BotonJugar = new PIXI.Text( txtJugar, style);
		BotonJugar.anchor.set(0.0);
		BotonJugar.x = FILA_BOTONES;						// Set the initial position
		BotonJugar.y = 100;
		// Opt-in to interactivity
		BotonJugar.interactive = true;				
		BotonJugar.buttonMode = true;			// Shows hand cursor
		// Pointers normalize touch and mouse
		BotonJugar.on('pointerdown', Jugar );
		BotonJugar.on('click', Jugar ); // mouse-only
		BotonJugar.on('tap', Jugar ); // touch-only

		//	-------------------------------------------------------------
		//	Preparacion del boton AcercaDe
		BotonAcercaDe = new PIXI.Text( txtAcerca, style);
		// Set the initial position
		BotonAcercaDe.anchor.set(0.0);
		BotonAcercaDe.x = FILA_BOTONES;							// Set the initial position
		BotonAcercaDe.y = 300;
		// Opt-in to interactivity
		BotonAcercaDe.interactive = true;
		BotonAcercaDe.buttonMode = true;				// Shows hand cursor
		// Pointers normalize touch and mouse
		BotonAcercaDe.on('pointerdown', AcercaDe );
		BotonAcercaDe.on('click',	AcercaDe ); // mouse-only
		BotonAcercaDe.on('tap',		AcercaDe ); // touch-only

		//	-------------------------------------------------------------
		//	Preparacion boton de ayudas
		BotonAyuda = new PIXI.Text( txtAyuda, style);
		BotonAyuda.anchor.set(0.0);
		BotonAyuda.x = FILA_BOTONES;					// Set the initial position
		BotonAyuda.y = 375;
		// Opt-in to interactivity
		BotonAyuda.interactive = true;
		BotonAyuda.buttonMode = true;				// Shows hand cursor
		// Pointers normalize touch and mouse
		BotonAyuda.on('pointerdown', Ayuda );
		BotonAyuda.on('click', Ayuda ); // mouse-only
		BotonAyuda.on('tap', Ayuda ); // touch-only
		
		//	-------------------------------------------------------------
		//	Preparacion boton volver a inicio
		
		BotonAtras = new PIXI.Text( txtVolver , style);
		BotonAtras.anchor.set(0.0);
		BotonAtras.x = FILA_BOTONES;								// Set the initial position
		BotonAtras.y = 450;	
		BotonAtras.interactive = true;					// Opt-in to interactivity
		BotonAtras.buttonMode = true;					// Shows hand cursor
		// Pointers normalize touch and mouse
		BotonAtras.on('pointerdown', Menu );
		BotonAtras.on('click', Menu );
		BotonAtras.on('tap', Menu );
		
		
		//	-------------------------------------------------------------
		//	Preparacion otro botonMenu
		BotonMenu = new PIXI.Text( txtMenu, style);
		BotonMenu.anchor.set(0.0);
		BotonMenu.x = FILA_BOTONES;								// Set the initial position
		BotonMenu.y = 450;	
		BotonMenu.interactive = true;					// Opt-in to interactivity
		BotonMenu.buttonMode = true;					// Shows hand cursor
		// Pointers normalize touch and mouse
		BotonMenu.on('pointerdown', Menu );
		BotonMenu.on('click', Menu );
		BotonMenu.on('tap', Menu );
		
		//	-------------------------------------------------------------
				
	}




	function PantallaAyuda() {
		var graphics = new PIXI.Graphics();
		// draw a rounded rectangle
		graphics.lineStyle(4, 0x332211, 0.95)
		graphics.beginFill( FONDO_AYUDA, 0.95);
		graphics.drawRoundedRect(40, 40, RENDERER_W-200, RENDERER_H-200 );
		graphics.endFill();

		EscenaDeAyudas.addChild(graphics);

		const style = new PIXI.TextStyle({
			fill: "#ffffff",
			fontFamily: FONT_NIVEL3,		//	fontFamily: "Sriracha",
			fontSize: 24,
			fontStyle: "normal",
			fontWeight: "400"
		});
		const richText = new PIXI.Text( txtDescAyuda, style );

		richText.x = 60;
		richText.y = 60;

		EscenaDeAyudas.addChild(richText);
		EscenaDeAyudas.visible = true;

		//	Botones que se deben visualizar en pantalla de ayuda
		//	unicamente el de volver, entonces, remueve borones del padre y muestra el de ayuda

		//	BotonAcercaDe.visible = false;

		//	EscenaDeAyudas.addChild(BotonMenu);
		//	BotonMenu.visible = true;

	}



	function Menu() {
		//	definir cuales son las escenas visibles y cuales invisibles
		EscenaDeAyudas.visible = false;		//	container ayudas
		EscenaDeJuego.visible = false;
		EscenaAcercaDe.visible = false;		//	container estadisticas
		EscenaFinJuego.visible = false;		//	container aviso de fin del juego
		EscenaMenuInic.visible = true;		//	container pantalla de inicio
		EscenarioGral.visible = true;		//	container del juego
		//	EscenaDificultad.visible = false;	//	seleccion nivel dificultad

		//	BotonAyuda
		EscenaMenuInic.addChild(BotonAyuda);
		BotonAyuda.visible = true;
		BotonAyuda.alpha=1;

		//	BotonMenu.visible = true;

		//	BotonAcercaDe
		EscenaMenuInic.addChild(BotonAcercaDe);
		BotonAcercaDe.visible =true;

		//	BotonJugar
		EscenaMenuInic.addChild(BotonJugar);
		BotonJugar.visible =true;
		BotonJugar.alpha=1;

		txtNivDif.text = nivJuego;
		//		"Tiempo: " + elapsed + " seg.";	
		//	= nivJuego;

		state = Menu;

	}




	function AcercaDe() {

	//	definir cuales son las escenas visibles y cuales invisibles
		EscenaDeAyudas.visible = false;
		EscenaDeJuego.visible = false;
		EscenaAcercaDe.visible = true;
		EscenaFinJuego.visible = false;
		EscenaMenuInic.visible = false;
		EscenarioGral.visible = true;
		//	EscenaDificultad.visible = false;	//	seleccion nivel dificultad

		EscenaAcercaDe.addChild(BotonMenu);
		BotonMenu.visible = true;

		state = AcercaDe;

	}




	function Ayuda() {
	//	definir cuales son las escenas visibles y cuales invisibles
		EscenaDeAyudas.visible = true;
		EscenaDeJuego.visible = false;
		EscenaAcercaDe.visible = false;
		EscenaFinJuego.visible = false;
		EscenaMenuInic.visible = false;
		EscenarioGral.visible = true;
		//	EscenaDificultad.visible = false;	//	seleccion nivel dificultad

		EscenaDeAyudas.addChild(BotonAtras);
		BotonAtras.visible = true;

		state = Ayuda;

	}



	////////////////////////////////////////////////////////////////////////////////////////
	//	solamente para depurar
	function DibujaGrilla() {

		const style = new PIXI.TextStyle({
			fontFamily: FONT_NIVEL3,		//	fontFamily: "Sriracha",
			fontSize: 10,
			//	fontStyle: "normal",
			//	fontWeight: "400"
		});

		var posX=50, posY=50;
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

			posY = posY+50;
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

			posX = posX+50;
		}

	}




	function end() {
		//	definir cuales son las escenas visibles y cuales invisibles

		if (DEBUG) { console.log("=== function end ===" ); }

		EscenaDeAyudas.visible = false;		//	container ayudas
		EscenaDeJuego.visible = true;
		EscenaAcercaDe.visible = false;		//	container estadisticas
		EscenaFinJuego.visible = true;		//	container aviso de fin del juego
		EscenaMenuInic.visible = false;		//	container pantalla de inicio
		EscenarioGral.visible = true;		//	container del juego
		//	EscenaDificultad.visible = false;	//	seleccion nivel dificultad

		EscenaDeJuego.alpha = 0.8 ;

		//	BotonJugar
		EscenaFinJuego.addChild(BotonJugar);
		BotonJugar.visible =true;
		BotonJugar.alpha=1;

		EscenaFinJuego.addChild(BotonMenu);

		//	BotonAyuda.visible = true;
		//	BotonAcercaDe.visible = true;

		state = end;
		
	}



	//	-------------------------------------------------------
	//	Funciones comunes a todas las aplicaciones con codigo especifico para la app
	//	el codigo anterior no debiera modificarse salvo definiciones
	//	-------------------------------------------------------

	function PantallaAcercaDe() {
		var graphics = new PIXI.Graphics();
		// draw a rounded rectangle
		graphics.lineStyle(4, 0x332211, 0.95)
		graphics.beginFill( FONDO_AYUDA, 0.95);
		graphics.drawRoundedRect(40, 40, RENDERER_W-200, RENDERER_H-200 );
		graphics.endFill();

		EscenaAcercaDe.addChild(graphics);

		const style = new PIXI.TextStyle({
			fill: "white",
			fontStyle: "normal",
			fontFamily: FONT_NIVEL3,		//	fontFamily: "Sriracha",
			fontSize: 32,
			fontWeight: "bold"
		});
		const richText = new PIXI.Text( txtDescAcerca, style);
		richText.x = 60;
		richText.y = 60;
		EscenaAcercaDe.addChild(richText);

		EscenaAcercaDe.visible = true;

		BotonAyuda.visible = false;
		BotonAcercaDe.visible = false;

		EscenaAcercaDe.addChild(BotonMenu);
		BotonMenu.visible = true;
		//	BotonSalir.visible =false;

	}




	function haceSelectorDifi(){
		const	x0 = FILA_BOTONES;
		const	y0 = 160;
		const	anchoCaja = 200,
			altoCaja = 100,
			COLOR_CAJA = 0x9966ff,				//	0x99bbff,
			COLOR_FLECHA = 0x990033;

		//	Texto grande; numeros indicadores del nivel actual
		var styleL = new PIXI.TextStyle({
			fill: COLOR_BOTON,					    //	
			fontFamily: FONT_NIVEL2,			//	fontFamily: 'Titan One',			//	cursive;
			fontSize: 64,
			fontWeight: "bold",
			padding: 12,
		});

		//	---------------------------------------------------------------
		//	Texto pequeño; Titulo del selector, texto de la caja e indicador de nivel
		styleS = new PIXI.TextStyle({
			fill: COLOR_BOTON,					    //	
			fontFamily: FONT_NIVEL2,			//	fontFamily: 'Titan One',			//	cursive;
			fontSize: 28,
			fontWeight: "normal",
			padding: 4,
		});

		// draw a rounded rectangle
		var graphics = new PIXI.Graphics();
		graphics.beginFill(COLOR_CAJA, 0.3);
		graphics.drawRoundedRect(x0, y0, anchoCaja, altoCaja, 10);
		graphics.endFill();
		EscenaMenuInic.addChild(graphics);


		//	--------------------------------------------------------
		//	a titulo experimental pruebo botones con simbolos mas y menos
		//	boton incrementa dificultad
		BotonDificilMas = new PIXI.Text( "+", styleL );
		BotonDificilMas.x = x0 + (0.8 * anchoCaja);
		BotonDificilMas.y = y0 + (0.56 * altoCaja);
		BotonDificilMas.anchor.set(0.5);
		BotonDificilMas.interactive = true;				
		BotonDificilMas.buttonMode = true;			// Shows hand cursor
		BotonDificilMas.on('pointerdown', MasDificil );

		EscenaMenuInic.addChild(BotonDificilMas);

		//	boton decrementa dificultad
		BotonDificilMenos = new PIXI.Text( "-", styleL );
		BotonDificilMenos.x = x0 + (0.2 * anchoCaja);
		BotonDificilMenos.y = y0 + (0.56 * altoCaja);
		BotonDificilMenos.anchor.set(0.5);
		BotonDificilMenos.interactive = true;				
		BotonDificilMenos.buttonMode = true;			// Shows hand cursor
		BotonDificilMenos.on('pointerdown', MenosDificil );

		EscenaMenuInic.addChild(BotonDificilMenos);

		//	numero indicador de nivel de dificultad
		//	la variable debe definirse entre las globales para ser luego actualizada 
		//	mediante los botones que tambien deben ser reconocidos global
		txtNivDif = new PIXI.Text( "8", styleL );
		txtNivDif.x = x0+(anchoCaja/2);
		txtNivDif.y = y0 + (0.56 * altoCaja);
		txtNivDif.anchor.set(0.5);

		var txtTitulo = new PIXI.Text( txtDificu, styleS );
		txtTitulo.x = x0+(anchoCaja/2);
		txtTitulo.y = y0 + 16 ;
		txtTitulo.anchor.set(0.5);

		EscenaMenuInic.addChild(txtNivDif);
		EscenaMenuInic.addChild(txtTitulo);
		
	}


	function MasDificil() {
		if (nivJuego < aNivDif.length) { nivJuego++ }
		if (DEBUG)	{
			//	console.log("nivJuego: " + nivJuego);
		}
	}

	function MenosDificil() {
		if (nivJuego > 1 ) { nivJuego-- }
		if (DEBUG)	{ console.log("nivJuego: " + nivJuego); }
	}

	function PantallaJugar() {
		var tablero,
			i = undefined,			//	para conteo usos varios
			aPosPolig = undefined,
			num, cImagen;

		/*
			ejemplo de usos

		var tableroTexture = id["tablero.png"];
		tablero = new PIXI.Sprite(tableroTexture);
		//	tablero = id["sumado-tablero.png"];

		tablero.x = TABLERO_OFF_X;
		tablero.y = TABLERO_OFF_Y;
		// make it a bit bigger, so it's easier to grab
		//	tablero.scale.set(1.34);
		tablero.scale.set(nESCALA);
		EscenaDeJuego.addChild(tablero);

		*/

		//	control del tiempo
		Crono = new PIXI.Text( txtTiempo, { fontFamily: FONT_NIVEL3, fontSize: "16px", fill: "#a00"  } );	
		Crono.position.set(400, 10 );
		EscenaDeJuego.addChild(Crono);

		//	creacion de los sprites draggables para cada nro
		//	modelo en sumado.js


	}


	//	--------------------------------------
	function play() {

		//	if (DEBUG) { console.log("*** function play - chosenTiles.length: " + chosenTiles.length );	}

		//	if ( VerificaSuma() ) {
		if ( chosenTiles.length == 0 ) {

			//	if (DEBUG) { console.log("chosenTiles.length == 0 " ); }

			EscenaFinJuego.visible = true;		//	container aviso de fin del juego
			EscenaDeJuego.visible = false;
			EscenaDeJuego.alpha = 0.8 ;

			BotonJugar.visible = true;
			BotonMenu.visible = true;

			//	cancelAnimationFrame(myReq);

			state = end;

		} else {
			elapsed = Math.floor(( new Date().getTime() - start ) / 100 ) / 10;
		}
		Crono.text = txtTiempo + elapsed + " seg.";

	}



	function PantallaFinJuego() {

		const style = new PIXI.TextStyle({
			fill: "#880000",
			fontFamily: FONT_NIVEL2,
			fontSize: 48,
			fontWeight: "bold"
		});

		const	MessageFin = new PIXI.Text( txtFin, style);
		MessageFin.x = ( RENDERER_W - MessageFin.width ) / 2;
		MessageFin.y = ( RENDERER_H - MessageFin.height ) / 2;
		EscenaFinJuego.addChild(MessageFin);
		EscenaFinJuego.addChild(BotonJugar);
		EscenaFinJuego.addChild(BotonMenu);

	}



	function Dificultad() {

	//	definir cuales son las escenas visibles y cuales invisibles
		EscenaDeAyudas.visible = false;
		EscenaDeJuego.visible = false;
		EscenaAcercaDe.visible = false;
		EscenaFinJuego.visible = false;
		EscenaMenuInic.visible = false;
		//	EscenarioGral.visible = true;
		EscenaDificultad.visible = true;	//	seleccion nivel dificultad


		EscenaDificultad.addChild(BotonMenu);
		EscenaDificultad.addChild(BotonAtras);
		BotonMenu.visible = true;

		state = Dificultad;

	}


	//	=========================================
	//	Codigo especifico para este juego
	//	=========================================
	function GenJuego(){			//	genera un nuevo juego
		let firstTile=null,			// primera pieza elegida por el jugador			
			secondTile=null,			// segunda pieza elegida por el jugador			
			canPick=true					// puede el jugador elegir una pieza?

		// choose 24 random tile images
		chosenTiles=new Array();

		const aImages=[
			"img-100.png",
			"img-101.png",
			"img-102.png",
			"img-103.png",
			"img-104.png",
			"img-105.png",
			"img-106.png",
			"img-107.png",
			"img-108.png",
			"img-109.png",
			"img-110.png",
			"img-111.png",
			"img-112.png",
			"img-113.png",
			"img-114.png",
			"img-115.png",
			"img-116.png",
			"img-117.png",
			"img-118.png",
			"img-119.png",
			"img-120.png",
			"img-121.png",
			"img-122.png",
			"img-123.png",
			"img-124.png",
			"img-125.png",
			"img-126.png",
			"img-127.png",
			"img-128.png",
			"img-129.png",
			"img-130.png",
			"img-131.png",
			"img-132.png",
			"img-133.png",
			"img-134.png",
			"img-135.png",
			"img-136.png",
			"img-137.png",
			"img-138.png",
			"img-139.png",
			"img-140.png",
			"img-141.png",
			"img-142.png",
			"img-143.png",
			"img-144.png",
			"img-145.png",
			"img-146.png",
			"img-147.png"
			];

		//	const offset_X = 50 + 45*(9-nCol),
		const offset_X = (RENDERER_W - (90*nCol))/2 ,
			offset_Y = (RENDERER_H - (90*nFil))/2 ;		//	30 + 45*(6-nFil);
			//	offset_Y = 30 + 45*(6-nFil);

		if (DEBUG)	{ console.log( "nCol, nFil: " + nCol + ", " + nFil ) }
		if (DEBUG)	{ console.log( "offset_X, offset_Y: " + offset_X + ", " + offset_Y ) }

		//	cambiar orden de los tiles/ baldosas
		while(chosenTiles.length< nFil * nCol ){
			var candidate=Math.floor(Math.random()*48);
			if(chosenTiles.indexOf(candidate)==-1){
				chosenTiles.push(candidate,candidate)
			}			
		}


		// shuffle the chosen tiles
		for(i=0;i<96;i++){
			var from = Math.floor(Math.random()* nFil * nCol);
			var to = Math.floor(Math.random()* nFil * nCol);
			var tmp = chosenTiles[from];
			chosenTiles[from]=chosenTiles[to];
			chosenTiles[to]=tmp;
		}


		//	estructura actual fija para 8 filas y 6 columnas
		//	place down tiles
		for(i=0;i<nCol;i++){

			for(j=0;j<nFil;j++){

				var tile = new PIXI.Sprite(id[aImages[chosenTiles[i*nFil+j]]]);

				tile.buttonMode=true;
				tile.interactive = true;
				tile.scale.set(0.3);
				// is the tile selected?
				tile.isSelected=false;
				// set a tile value
				tile.theVal=chosenTiles[i*nFil+j]
				// place the tile
				//	tile.position.x = 7+i*100;
				tile.position.x = offset_X + i*90;
				//	tile.position.y = 7+  j*100;
				tile.position.y = offset_Y +  j*90;

				// paint tile black
				tile.tint = 0x000000;
				// set it a bit transparent (it will look grey)
				tile.alpha=0.7;

				//	modifico tratando detectar error
				// add the tile
				//	EscenarioGral.addChild(tile);
				EscenaDeJuego.addChild(tile);


				//	console.log( tile.theVal + ", " + tile.tint);
				//	console.log( "EscenaDeJuego.children: " + EscenaDeJuego.children.length + ", " + EscenaDeJuego.children );

				// mouse-touch listener
				tile.mousedown = tile.touchstart = function(data){
					// can I pick a tile?
					if(canPick) {

						

						 // is the tile already selected?
						if(!this.isSelected){

							//	if (DEBUG) { console.log(this) };

							// set the tile to selected
							this.isSelected = true;
							// show the tile
							this.tint = 0xffffff;
							this.alpha = 1;
							// is it the first tile we uncover?
							if(firstTile==null){
								firstTile=this
							}
							// this is the second tile
							else{

								//	if (DEBUG) {	console.log(" 1er. tile firstTile.tint: " + firstTile.tint + ", " + firstTile.theVal ) }
	
								secondTile=this
								// can't pick anymore
								canPick=false;

								// did we pick the same tiles?
								if(firstTile.theVal==secondTile.theVal){
									//	llevar la cuenta de las baldositas que quedan sobre el tablero	
									var pos = chosenTiles.indexOf(firstTile.theVal);
									chosenTiles.splice(pos, 1 );
									pos = chosenTiles.indexOf(secondTile.theVal);
									chosenTiles.splice(pos, 1 );
							
									// wait a second then remove the tiles and make the player able to pick again
									setTimeout(function(){
										EscenaDeJuego.removeChild(firstTile);
										EscenaDeJuego.removeChild(secondTile);
										firstTile=null;
										secondTile=null;
										canPick=true;
									},1000);
								}
								// we picked different tiles
								else{
									// wait a second then cover the tiles and make the player able to pick again
									setTimeout(function(){
										firstTile.isSelected=false
										secondTile.isSelected=false
										firstTile.tint = 0x000000;
										secondTile.tint = 0x000000;
										firstTile.alpha=0.7;		//	0.5;
										secondTile.alpha=0.7;		//	0.5;
										firstTile=null;
										secondTile=null;
										canPick=true	
									},1000);
								}
							}	
						}
					}
				}
				if (DEBUG) {	console.log("i, j, tile.tint: " + i + ", " + j + ", " + tile.tint + ", " + tile.theVal ) }
			}
		} 
	}






	function Jugar() {
		//	acciones a realizar durante el juego

		if (DEBUG) { console.log("=== function Jugar ===" ); }

		//	var i = undefined;
		
		//	definir cuales son las escenas visibles y cuales invisibles
		EscenaDeAyudas.visible = false;
		EscenaDeJuego.visible = true;
		EscenaAcercaDe.visible = false;
		EscenaFinJuego.visible = false;
		EscenaMenuInic.visible = false;
		//	EscenarioGral.visible = true;

		EscenaDeJuego.alpha = 0.99 ;

		if (DEBUG) { console.log("juego con nivel " + nivJuego ); }

		//	vamos a restar 1 a nivJuego porque el array se numera de 0 a 13
		nFil = aNivDif[nivJuego - 1].nFil;
		nCol = aNivDif[nivJuego - 1].nCol;


		GenJuego()		//	genera un nuevo juego
		
		start = new Date().getTime();
		elapsed = 0;

		state = play;
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


//-------------------------------------------------------------------
// adaptacion idiomas
//-------------------------------------------------------------------
//	var	txtAyuda	= "Ayuda";

var levelText = "Nivel";
var noSolutionText = " Sin solución ";
var nextText = "OTRO";
var finishText = "Felicitaciones";
var checkSolutionShift = 90;

function initLanguage()		//	para adaptar a diferentes idiomas
{
	//	var sysLang = "de";
	var sysLang = getSystemLanguage();

	if(sysLang == "en" || sysLang == "en") { //	ingles
		txtAyuda	= "Help";
		txtJugar = "Play",
		txtAcerca = "About",
		txtDificu = "Difficulty";
		txtDescAcerca =
			'About MEMORIOSO version ' + VERSION  + '\n' +
			'It is a game to exercise concentration and memory \n' + 
			'developed by Willie Verger Ingenuity Games \n' + 
			'Support: info@ingverger.com.ar\n' +
			'Web: ingverger.com.ar\n' +
			'\n';
		txtDescAyuda = 
			'What is it? \n' +
			'MEMORIOSO is a game of concentration and memory. \n' +
			'What does it consist of? \n' +
			'There is a set of cards, each with an image, placed in such a way \n' +
			'that images can not be seen. \n' +
			'There are two cards of each image. The object of the game is to find \n' +
			'the pairs of equal images. \n' +
			'When you click on an image, it is turned over. \n' +
			'Two consecutive cards are chosen. If they turn out to be the same, \n' +
			'they are removed from the board. If they are different, they return \n' +
			'to the original position \n' +
			'The game ends when all pairs have been found. \n',
			txtFin = "Well resolved!\nCongratulations! ",
			txtTiempo = "Elapsed time: ";


		noSolutionText = "No solution ";
		nextText = "NEXT";
		finishText = "Congratulation";
		levelText = "Level";

		//	document.getElementById('hintsButton').value = "Hint";
		//	document.getElementById('resetButton').value = "Reset";
		//	document.getElementById('startButton').value = "Start";

		//	checkSolutionShift = 90;
		//	document.getElementById('checkboxtext').innerHTML = "CHECK";

	} else if(sysLang == "de" || sysLang == "de") { //	aleman
		txtAyuda	= "Hilfe";
		txtJugar = "Spielen",
		txtAcerca = "Über",
		txtDificu = "Schwierigkeit";
		txtDescAcerca =
			'Über MEMORIOSO Version ' + VERSION  + '\n' +
			'Es ist ein von Willie Verger Ingenuity Games \n' + 
			'entwickeltes Spiel, um Konzentration und \n' +
			'Gedächtnis zu trainieren. \n' +
			'Unterstützung: info@ingverger.com.ar\n' +
			'Web: ingverger.com.ar\n' +
			'\n';
		txtDescAyuda = 
			'Was ist es?\n' +
			'MEMORIOSO ist ein Spiel der Konzentration und des Gedächtnisses.\n' +
			'Es gibt eine Reihe von Karten mit jeweils einem Bild so platziert,\n' +
			'dass seine Vorderseite nicht sichtbar ist.\n' +
			'Es gibt zwei Registerkarten für jedes Bild. Das Spiel ist zu finden\n' +
			'die Paare gleicher Bilder.\n' +
			'Wenn Sie auf ein Bild klicken, wird es umgedreht.\n' +
			'Es werden zwei aufeinander folgende Karten ausgewählt. Wenn sie \n' +
			'sich als gleich herausstellen, werden sie vom Board entfernt. \n' +
			'Wenn sie unterschiedlich sind, kehren sie zur ursprünglichen \n' +
			'Position zurück.\n' +
			'Das Spiel endet, wenn alle Paare gefunden wurden.\n',
		txtFin = "Gut gelöst!\nGlückwunsch! ",
		txtTiempo = "Verstrichene Zeit: ";




		noSolutionText = "keine losung ";
		nextText = "Nächste";
		finishText = "Glückwunsch!";
		levelText = "Niveau";
		
		//	document.getElementById('hintsButton').value = "Hilfe";
		//	document.getElementById('resetButton').value = "Zurücksetzen";
		//	document.getElementById('startButton').value = "Beginnen";
//	
//			checkSolutionShift = 90;
//			document.getElementById('checkboxtext').innerHTML = "Überprüfen";

	}
}


//======================
// get system language
//======================
function getSystemLanguage()
{
	var lang = window.navigator.userLanguage || window.navigator.language;
	return lang.toLowerCase();
}


