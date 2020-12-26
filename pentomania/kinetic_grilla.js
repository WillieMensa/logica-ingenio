//	kinetic_grilla.js
//	grilla para depurar con kinetic.js
//	solo para depurar
//	20/7/2019

////////////////////////////////////////////////////////////////////////////////////////

var debugLayer = new Kinetic.Layer();	//kinetic layer

function DibujaGrilla() {

	//	const delta = BLOCK_CELL_SIZE;
	var posX= BLOCK_CELL_SIZE, posY=BLOCK_CELL_SIZE;

	//lineas horizontales
	while (posY<= STAGE_Y ) {
		var horizLine = new Kinetic.Line({
			points: [0, 0, STAGE_X, 0],
			stroke: '#888',
			strokeWidth: 1
		});
		horizLine.move(0, posY);
		debugLayer.add(horizLine);

		var nTxt = new Kinetic.Text({				
			x: 25,
			y: posY,
			text: posY,
			fontSize: 16,
			fontFamily: FONT_NIVEL3,
			fill: '#bcd'
		});
		debugLayer.add(nTxt);

		posY = posY+ BLOCK_CELL_SIZE;
	}

	//lineas verticales
	while (posX<= STAGE_X ) {
		var vertLine = new Kinetic.Line({
			points: [0, 0, 0, STAGE_Y],
			stroke: '#888',
			strokeWidth: 1
		});
		vertLine.move(posX, 0);
		debugLayer.add(vertLine);

		var nTxt = new Kinetic.Text({				
			x: posX,
			y: 25,
			text: posX,
			fontSize: 16,
			fontFamily: FONT_NIVEL3,
			fill: '#bcd'
		});
		debugLayer.add(nTxt);

		posX = posX + BLOCK_CELL_SIZE;
	}


	var rect = new Kinetic.Rect({
		x: 0,
		y: 0,
		width: STAGE_X,
		height: STAGE_Y,	//		fill: 'green',
		stroke: 'white',
		strokeWidth: 2
	});
	debugLayer.add(rect);


	//	debugLayer.setScale( STAGE_SCALE );	
	gStage.add(debugLayer);			// add the layer to the stage

}

