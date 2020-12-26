/*	=============================================================================
	Pentomino Puzzle
	archivo: acercade.js
	21/9/2019

*/

//-------------------------------------------------------------------
function AcercaDeLayer(){
	//	if (DEBUG){console.log(' en HaceConfigLayer() ');}

	var titleText = new Kinetic.Text({
		x: (gStage.getWidth() * 0.5),
		y: (gStage.getHeight() * 0.12),
		text: dict.txtAcercaTit,
		fontSize: 1.0 * BLOCK_CELL_SIZE,			//	130,
		fontFamily: FONT_NIVEL1,	//	'Calibri',
		fill: TITLE_COLOR,
		shadowColor: 'black',
		shadowBlur: 5,
		shadowOffset: [6,6],
		shadowOpacity:0.7
	});
	titleText.setOffset({
		x: titleText.getWidth() / 2
	});



	var simpleText = new Kinetic.Text({
		x: (gStage.getWidth() * 0.5),
		y: (gStage.getHeight() * 0.2),
		text: 'version ' + versionString + '\n\n' + dict.txtDescAcerca,		
		fontSize: 0.6 * BLOCK_CELL_SIZE,
		fontFamily: FONT_NIVEL3,
		align: 'center',
		fill: TITLE_COLOR
	});
	simpleText.setOffset({
		x: simpleText.getWidth() / 2
	});


	gAboutLayer.add(titleText);
	gAboutLayer.add(simpleText);

	gStage.add(gAboutLayer);

};



function AcercaDe() {
//-----------------------------------------------------
//menu de status
//-----------------------------------------------------

	//	console.clear();
	console.log('--------- AcercaDe ------------');

	hiddenAllButton();	//	oculta todos los botones
	delLangButt();				//	esconde botones de idiomas


	//	gStage
	gBoardLayer.destroy();
	gBackgroundLayer.destroy();
	gMessageLayer.destroy();
	gInitLayer.destroy();
	gHelpLayer.destroy();
	gAboutLayer.destroy();
	//	gStatusLayer.destroy();

	AcercaDeLayer();

	menuBtn.style.visibility='visible';			//	menu ppal

}


