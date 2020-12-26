/*	=============================================================================
	Multi language development

	#### version     = "0.1.0"	- 2/10/2019
	Desarrollo de la idea para utilizar en app (y eventualmente sitio web)

	=============================================================================
*/

let sysLang = undefined,
		dict = undefined;


//	botones seleccionar idioma
function languageButtons() {
	document.getElementById('espButt').style.cssText = "top:" + (STAGE_OFFSET_Y + 0.8 * BLOCK_CELL_SIZE) + "px; left:" + (STAGE_X -3*BLOCK_CELL_SIZE) + "px; position: absolute;";
	document.getElementById('engButt').style.cssText = "top:" + (STAGE_OFFSET_Y + 1.8 * BLOCK_CELL_SIZE) + "px; left:" + (STAGE_X -3*BLOCK_CELL_SIZE) + "px; position: absolute;";
	document.getElementById('deuButt').style.cssText = "top:" + (STAGE_OFFSET_Y + 2.8 * BLOCK_CELL_SIZE) + "px; left:" + (STAGE_X -3*BLOCK_CELL_SIZE) + "px; position: absolute;";
}

function delLangButt() {			//	esconde botones de idiomas
	document.getElementById('espButt').style.visibility = 'hidden';
	document.getElementById('engButt').style.visibility = 'hidden';
	document.getElementById('deuButt').style.visibility = 'hidden';
}



//-------------------------------------------------------------------
function initLanguage(langId)			//	para adaptar a diferentes idiomas
{
	if (DEBUG2)	{	console.log('initLanguage con codigo: ' + langId )	}
	if (DEBUG) { writeMessage('Iniciando initLanguage()' + sysLang) };
	//	console.log('Iniciando initLanguage()' + sysLang);
	//	console.log('getStorage("elIdioma")	' + getStorage("elIdioma")	);

	sysLang = ((langId==undefined )? ( getStorage("elIdioma")	): langId);	
	sysLang = ((sysLang==null)? ( getSystemLanguage() ): sysLang);
	sysLang = ((sysLang==null)? ( "en" ): sysLang);

	if (DEBUG)	{			console.log("sysLang: " + sysLang )	}


	if (sysLang=='sp')	{
		if (DEBUG)	{	console.log( 'caso: sp' )};
		dict = dictSp;
	} else if (sysLang=='en')	{
		//  block of code to be executed if the condition1 is false and condition2 is true
		dict = dictEn;
	} else if (sysLang=='de')	{
		//  block of code to be executed if the condition1 is false and condition2 is true
		dict = dictDe;
	} else {
		console.log( 'sysLang no detectado');
	}

	//		console.log( dict );
}




//======================
// get system language
//======================
function getSystemLanguage()
{
	var lang = window.navigator.userLanguage || window.navigator.language;
	return lang.toLowerCase();
}


//-----------------
// on level change
//-----------------
function selectLanguage(id)
{
	if (DEBUG){	console.log( 'en selectLanguage, id: ' + id ) };

	//	sysLang = id;
	setStorage('elIdioma', id);
	//	init();
	initLanguage(id);

	playBtn.innerHTML = dict.txtJugar;
	helpBtn.innerHTML = dict.txtAyuda;
	aboutBtn.innerHTML = dict.txtAcerca;
	configBtn.innerHTML = dict.txtConfig;
	menuBtn.innerHTML = dict.txtVolver;
	giraPieza.innerHTML = dict.txtGirar;
	volteaPieza.innerHTML = dict.txtVoltear;
	hintBtn.innerHTML = dict.txtHint;
	nroProbBtn.innerHTML = dict.txtAceptar;

}
