//---------------------
function createBoard(boardX, boardY)		// genera / crea un tablero nuevo con sus celdas inicializadas a cero
{
	var board = [];

	for(var x = 0; x < (boardX+2) ; x++) {
		board[x] = [];
		for(var y = 0; y < (boardY+2) ; y++) {
			board[x][y] = 0;
		}
	}
	
	if (DEBUG2)	{	dumpBoard(board);	};

	return board;
}

//=============================================================================
// BEGIN for create block style
//	Comienzo de creacion de estilos de bloques
//=============================================================================

//-----------------------------------------------
// for put the block to board by row major order 
// (1) sort the block by y then x
// (2) set the first cell as (0,0)	
//-----------------------------------------------
function blockNormalization(block)		//	Normalizacion de bloques
{
	var blockSize = block.length;
	var i,j;
	var tmpBlockCell;
	var shiftX, shiftY;

	//sort by y then x
	for(i = 0 ; i < (blockSize-1); i++) {
		for(j = i+1; j < blockSize; j++) {
			if( (block[i].y > block[j].y) ||
				(block[i].y == block[j].y  && block[i].x > block[j].x) )
			{
				//swap
				tmpBlockCell = block[j];
				block[j] = block[i];
				block[i] = tmpBlockCell;
			}
		}
	}

	//Set first cell as (0,0)
	shiftX = -block[0].x;
	shiftY = -block[0].y;
	for(i = 0; i < blockSize; i++) {
		block[i].x +=  shiftX;
		block[i].y +=  shiftY;
	}
}	

//--------------------------------------
// rotate 90 degree clockwise 3 times, 
// then insert to block-style
//--------------------------------------
function rotate3Times(blockStyle, block)	//	rota 3 veces e inserta en estilos de bloque
{
	for(var i = 0 ; i < 3; i++) {
		//rotate 90 degree clockwise, (X, Y) ==> (-Y, X)  
		for(var j = 0 ; j < block.length; j++) {
			var tmpX = block[j].x;
			block[j].x = -block[j].y;
			block[j].y = tmpX;
		}
		blockNormalization(block);
		if(!addBlock2BlockStyle(blockStyle,block)) break;
	}
}	


//------------------------------------------------
// add block to block style if not same as exist
//------------------------------------------------
function addBlock2BlockStyle(blockStyle, block)
{
	var i, j;
	var numberOfBlock = blockStyle.length;

	outlooper:
	for(i = 0 ; i < numberOfBlock ; i++) {
		for(j = 0 ; j < blockStyle[i].length; j++) {
			if( blockStyle[i][j].x != block[j].x ||
			    blockStyle[i][j].y != block[j].y)
			{
				//different block cell, check next
				continue outlooper; 
			}
		}
		//same block style
		return false;
	}

	//add to block style
	blockStyle[numberOfBlock] = [];
	for(i = 0 ; i < block.length; i++) {
		blockStyle[numberOfBlock][i] = {};
		blockStyle[numberOfBlock][i].x = block[i].x;
		blockStyle[numberOfBlock][i].y = block[i].y;
	}
	
	return true;
}

//------------------------------------------------------------------
// create all block style from initial block 	
// (1) rotate 90 degree clockwise 3 times
// (2) left-right flip , than rotate it 90 degree clockwise 3 times
//------------------------------------------------------------------
function createBlockStyle(blockGroup)	//	creacion de todos los estilos de bloque a partir del block inicial
{
	var g, i;
	var firstBlock, curBlock;

	for(g = 0 ; g < blockGroup.length; g++) {
		firstBlock = blockGroup[g].blockStyle[0];

		//(1) duplicate first block	
		curBlock = [];
		for(i = 0; i < firstBlock.length; i++) {
			curBlock[i] = {};
			curBlock[i].x = firstBlock[i].x;
			curBlock[i].y = firstBlock[i].y;
		}
		
		//(2) rotate first block 3 times (rotate 90 degree clockwise)
		rotate3Times(blockGroup[g].blockStyle, curBlock);

		//(3) create left right flip block from first block, (X , Y) ==> (-X , Y)
		curBlock = [];
		for(i = 0 ; i < firstBlock.length; i++) {
			curBlock[i] = {};
			curBlock[i].x = -firstBlock[i].x
			curBlock[i].y = firstBlock[i].y
		}
		blockNormalization(curBlock);
		
		//(4) insert flip block to block style
		blockGroup[g].hasFlip = 0; //for UI mode only
		if(addBlock2BlockStyle(blockGroup[g].blockStyle,curBlock)) {
			blockGroup[g].hasFlip = 1;
			//(5) if insert success, rotate it 3 times and insert it to block style
			rotate3Times(blockGroup[g].blockStyle, curBlock);
		}
	}	
}

//=============================================================================
//	BEGIN for board operator function
//	Comienzo de operaciones en el tablero
//=============================================================================

//------------------------
// insert block to board 
//------------------------
function insertBlockToBoard(board, boardX, boardY, block, curPos, value)	//	insert block to board 
//	verifica que el bloque con la posición asignada caiga dentro del tablero y
//	verifica que las celditas esten desocupadas.
//	board	:	estado del tablero; celdas ocupadas / vacias
//	boardX	:	dimension X del tablero en celdillas
//	boardy	:	dimension y del tablero en celdillas
//	block	:	el bloque-poliomino a insertar; trae las coordenadas de los cuadrados componentes
//	curPos	:	posicion en coordenadas de tablero de la pieza a insertar
//	value	:	valor a asignar a la celdilla ocupada
{
	var x, y, i, j;
	var cx, cy;
	var blockSize = block.length;
	var lCeldaOcupada;

	if (DEBUG2) {
		console.log( '*'.repeat(16) + ' insertBlockToBoard' );	
	//		console.log('Parametros recibidos en insertBlockToBoard(...)');
		console.log('block.length: ' + block.length);
	//		dumpBoard(gBoardState);
	//		console.log('boardX : ' + boardX );
	//		console.log('boardY : ' + boardY );
		console.log( "mostrarPropiedades( block ): " + mostrarPropiedades( block, 'block' ));
		console.log( "mostrarPropiedades( block.0 ): " + mostrarPropiedades( block[0], 'block.0' ));
	//		console.log('value  : ' + value );
	//		console.log('blockSize : ' + blockSize );
	//		console.log('curPos : ' + curPos.x + ',' + curPos.y );
	}

	//empty position 
	x = curPos.x;
	y = curPos.y;

	if (DEBUG2) {		console.log( 'x, y: ' + x +', '+ y );	};

	//try to insert the block
	for(i = 0 ; i < blockSize; i++) {

		cx = block[i].x + x;
		cy = block[i].y + y; 

		if (DEBUG2) {
			console.log( 'block[i].x, x: ' + block[i].x + ', ' + x );
			console.log( 'block[i].y, y: ' + block[i].y + ', ' + y );
			console.log( 'cx: ' + cx );
			console.log( 'cy: ' + cy );
		}

		//block cell need fit into x:[1..boardX], y:[1..boardY]	
		if(cx > boardX || cx < 1) break;
		if(cy > boardY || cy < 1) break;
		if(board[cx][cy] != 0) break;

/*
		//	veamos los valores indicados
		if (DEBUG2)
		{
			console.log(' i				: ' + i		);
			console.log(' block[i].x	: ' + block[i].x   );
			console.log(' x = curPos.x	: ' + x   );
			console.log(' block[i].x+x	: ' + block[i].x+x   );
			console.log(' block[i].y	: ' + block[i].y  );
			console.log(' y = curPos.y	: ' + y   );
			console.log(' block[i].y+y	: ' + block[i].y+y  );
			console.log(' cx : cy : ' + cx  + ' : ' + cy );

			console.log('linea 215, board[cx][cy]: ' + board[cx][cy] );
			//	console.log(' boardX		: ' + boardX );
			//	console.log(' boardY		: ' + boardY );
		}

		//	verifico que la celda no esté ocupada por el cuadromino:
		console.log('[cx] - [cy]: ' + [cx] + ' - ' + [cy] );
		lCeldaOcupada = false;
		for (j = 0 ; j < gCeldasOcupadas.length; j++) 
		{
			lCeldaOcupada = lCeldaOcupada || ( gCeldasOcupadas[j].x == [cx] || gCeldasOcupadas[j].y == [cy] );
			//	lCeldaOcupada = lCeldaOcupada && ( gCeldasOcupadas[j].x == [cx] || gCeldasOcupadas[j].y == [cy] );
			//	console.log('gCeldasOcupadas[j].x - gCeldasOcupadas[j].y : ' + gCeldasOcupadas[j].x + ' - ' + gCeldasOcupadas[j].y );
			//	console.log('( gCeldasOcupadas[j].x == [cx] || gCeldasOcupadas[j].y == [cy] ): ' + ( gCeldasOcupadas[j].x == [cx] || gCeldasOcupadas[j].y == [cy] ));
			//	console.log('lCeldaOcupada || : ' + lCeldaOcupada);
		}
		
		if (DEBUG)
		{
			if (lCeldaOcupada)
			{
				console.log('Celda ocupada [cx]:' + [cx] + ' [cy]:' + [cy] + ' ---> '	+ lCeldaOcupada );
				//	console.log('wCuadromGroup[nCuadromId].blockStyle[0].includes(board[cx][cy]): ' + wCuadromGroup[nCuadromId].blockStyle[0].includes(board[cx][cy]) );
			}
		}
		
		if(lCeldaOcupada) break;
*/
	}
	
	if(i < blockSize) return (0); //can not insert it 
	
	//insert block  (set value != 0)
	for(i = 0 ; i < blockSize; i++) {
		cx = block[i].x+x;
		cy = block[i].y+y; 	
		board[cx][cy] = value;
	}

	return (1);
}



//-------------------------
// remove block from board 
//-------------------------
function removeBlockFromBoard(board, block, insPos)		// remove block from board 
{
	for(var i = 0 ; i < block.length; i++) {
		board[block[i].x+insPos.x][block[i].y+insPos.y] = 0;
	}
}


//-------------------------
function randomBlock(blockGroup)		// random the block order
{
	for(var g=0; g < blockGroup.length; g++) {
		blockGroup[g].blockUsed = 0;
		var swapId =  Math.floor(Math.random()*(blockGroup.length));
			
		var tmpBlock = blockGroup[g];
		blockGroup[g] = blockGroup[swapId];
		blockGroup[swapId] = tmpBlock;
	}
}

//----------------------------------
// random the order of block style 
//----------------------------------	
function randomBlockStyle(blockGroup)		//	reordena aleatoriamente los bloques
{
	for(var g=0; g < blockGroup.length; g++) {
		if(blockGroup[g].blockUsed) continue;
		var blockStyle = blockGroup[g].blockStyle;
		
		for(var i=0; i < blockStyle.length; i++) {
			var swapId =  Math.floor(Math.random()*(blockStyle.length));
			var tmpBlockStyle = blockStyle[i];
			
			blockStyle[i] = blockStyle[swapId];
			blockStyle[swapId] = tmpBlockStyle;
		}
	}
}

//=============================================================================
// BEGIN for find solution
//=============================================================================

//----------------------------
// polySolution is a class
//----------------------------
function polySolution()		//	esto es una clase que busca y almacena las soluciones (si las hay)
{
	var board;				//board state
	var boardX, boardY;		//maximum board X, Y
	var maxSolution;		//how many answer want to find 
	var blockGroup;			//block group

	var totalAnswer;		//total answer find
	var totalBlockUsed;		//total block already used 
	var solvedBoard = [];	//solution board
	var searchEnd;			//end of search

	//---------------------------------
	// public function : initial value 
	//---------------------------------
	this.init = function(initBoard, maxBoardX, maxBoardY, maxAnswer, block, random )
	{
		board = initBoard;   
		boardX = maxBoardX; 
		boardY = maxBoardY; 
		maxSolution = maxAnswer; 
		blockGroup = block;  
		
		searchEnd = 0;
		totalAnswer = 0;
		totalBlockUsed = 0;
		getTotalBlockUsed();
		if(random) {
			randomBlockStyle(blockGroup);
		}
	}
	
	//------------------------------------------
	// public function : find answer
	// output: {
	//    totalAnswer: how many answer find 
	//    elapsedTime: elapsed time
	//    solvedBoard: array for answer board, 
	//                 length = totalAnswer
	// } 
	//------------------------------------------
	this.find = function()
	{
		var startTime, endTime;
		var emptyPos = findEmptyPos({x:1, y:1});
		var blockStart = Math.floor(Math.random()*(blockGroup.length))-1; //[-1 .. blockGroup.length-2]
		var blockIndex = findNextAvailableBlock(blockStart);
		
		if(emptyPos.x < 0 || blockIndex < 0) {
			//all blocks are used or board full
			return { totalAnswer: 0,
					elapsedTime: 0,
					solvedBoard: null
			};
		}
		
		startTime = new Date();
		findSolution(blockIndex, emptyPos, 0);
		endTime = new Date();
		
		return { totalAnswer: totalAnswer,
			     elapsedTime: (endTime-startTime)/1000,
				 solvedBoard: solvedBoard
		};
	}
	

	
	//-------------------------------
	function getTotalBlockUsed()		// get block used before search
	{
		for(var g =0; g < blockGroup.length; g++) {
			if(blockGroup[g].blockUsed) totalBlockUsed++;
			
			//clear block order
			blockGroup[g].order = -1; //insert order for UI only
		}
	}



	//---------------------
	function findEmptyPos(startPos)		//find empty position
	{
		var y = startPos.y;
		var x = startPos.x;
		
		for(; y <= boardY; y++) {
			for(; x <= boardX; x++) {
				if(board[x][y] == 0) {
					return {x:x, y:y};
				}
			}
			x = 1;
		}
		return {x:-1, y:-1};
	}	
	
	//---------------------------

	//--------------------------- 
	function findNextAvailableBlock(curIndex)		// find next available block
	{
		for(var i = 0 ; i < blockGroup.length; i++) {
			if(++curIndex >= blockGroup.length) curIndex = 0;
			if(!blockGroup[curIndex].blockUsed) return (curIndex);
		}
		return -1;
	}


 
	//-------------
	function savesolvedBoard()				// save answer
	{
		solvedBoard[totalAnswer] = [];
		for(var x = 0; x < (boardX+2) ; x++) {
			solvedBoard[totalAnswer][x] = [];
			for(var y = 0; y < (boardY+2) ; y++) {
				solvedBoard[totalAnswer][x][y] = board[x][y];
			}
		}
		totalAnswer++;
	}
	


	//-------------
	function findSolution(headIndex, curPos, deep)			// find answer. encuentra una solucion
	{
		var nextPos = {};
		var numberOfBlockStyle; 
		var curIndex;

		curIndex = headIndex;
		do {
			numberOfBlockStyle = blockGroup[curIndex].blockStyle.length; 
			for(var i = 0 ; i < numberOfBlockStyle && !searchEnd; i++) {
				if(insertBlockToBoard(board, boardX, boardY, blockGroup[curIndex].blockStyle[i], curPos, curIndex+1)) {
					blockGroup[curIndex].blockUsed = 1;  
					
					//for UI only
					blockGroup[curIndex].usedStyle = i; //keep blockStyle
					blockGroup[curIndex].pos = curPos;  //keep position
					blockGroup[curIndex].order = deep;  //keep order (deep)
					
					nextPos = findEmptyPos(curPos); 
					if((++totalBlockUsed >= blockGroup.length) || (nextPos.x == -1 && nextPos.y == -1)) {
						//(1) all blocks have put into board
						//(2) board is filled with blocks
						savesolvedBoard();
						if(maxSolution >= 0 && totalAnswer >= maxSolution) {
							searchEnd = 1;
						}
					} else {
						findSolution(findNextAvailableBlock(curIndex), nextPos, deep+1);
					}
					if(!searchEnd) { //keep last solution in board for UI demo
						removeBlockFromBoard(board, blockGroup[curIndex].blockStyle[i], curPos);
						blockGroup[curIndex].blockUsed = 0;
						blockGroup[curIndex].order = -1; 
						totalBlockUsed--;
					}
				}
			}
			curIndex = findNextAvailableBlock(curIndex);
		} while (curIndex != headIndex && !searchEnd);
	}
}
