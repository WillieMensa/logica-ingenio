/*	=============================================================================
	Pentomino Puzzle
	archivo: ayuda.js
	21/9/2019

*/

//-------------------------------------------------------------------
function HelpLayer(){
	//	if (DEBUG){console.log(' en HaceConfigLayer() ');}

	var titleText = new Kinetic.Text({
		x: BLOCK_CELL_SIZE,
		y: BLOCK_CELL_SIZE,
		text: dict.txtTituloAyuda,
		fontSize: 1.0 * BLOCK_CELL_SIZE,			//	130,
		fontFamily: FONT_NIVEL1,	//	'Calibri',
		fill: TITLE_COLOR,
		shadowColor: 'black',
		shadowBlur: 5,
		shadowOffset: [6,6],			//	2, 2],
		shadowOpacity:0.7
	});

	var simpleText = new Kinetic.Text({
		x: BLOCK_CELL_SIZE,
		y: 3.0 * BLOCK_CELL_SIZE,
		text: dict.txtDescAyuda,
		fontSize: 0.6 * BLOCK_CELL_SIZE,			//	130,
		fontFamily: FONT_NIVEL3,	//	'Calibri',
		align: 'left',
		fill: TITLE_COLOR
	});
	//	simpleText.setOffset({
	//		x: simpleText.getWidth() / 2
	//	});


	gHelpLayer.add(titleText);
	gHelpLayer.add(simpleText);
	//	gHelpLayer.add(labelBtn);

	gStage.add(gHelpLayer);

};



function Help() {	

	console.log('--------- Ayuda ------------');

	hiddenAllButton();	//	oculta todos los botones
	delLangButt();				//	esconde botones de idiomas


	//	gStage
	gBoardLayer.destroy();
	gBackgroundLayer.destroy();
	gMessageLayer.destroy();
	gInitLayer.destroy();
	//	gHelpLayer.destroy();
	gAboutLayer.destroy();

	HelpLayer();

	menuBtn.style.visibility='visible';			//	menu ppal

}


